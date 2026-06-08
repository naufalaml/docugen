// ============================================
// DocuGen - Authentication & Database Module
// Support Firebase real-backend with local fallback
// ============================================

import { firebaseConfig } from './firebase-config.js';

// Global variables
let app = null;
let auth = null;
let db = null;
let googleProvider = null;

// Checking if Firebase is configured
export function isFirebaseConfigured() {
  return firebaseConfig && 
         firebaseConfig.apiKey && 
         !firebaseConfig.apiKey.startsWith('PLACEHOLDER_');
}

// Lazy load Firebase libraries from CDN
let firebasePromise = null;
async function loadFirebase() {
  if (!isFirebaseConfigured()) return null;
  if (firebasePromise) return firebasePromise;

  firebasePromise = (async () => {
    try {
      const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
      const { getAuth, GoogleAuthProvider } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
      const { getFirestore } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

      app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      db = getFirestore(app);
      googleProvider = new GoogleAuthProvider();
      console.log("🔥 Firebase Backend Initialized Successfully!");
      return { auth, db, googleProvider };
    } catch (err) {
      console.error("⚠️ Failed to initialize Firebase. Falling back to local/mock mode.", err);
      return null;
    }
  })();

  return firebasePromise;
}

// Current local user state for mock fallback
let currentMockUser = null;
const MOCK_USER_KEY = 'docugen_mock_user';
const MOCK_ACCOUNTS_KEY = 'docugen_mock_accounts';

// Initialize Auth
export async function initAuth(onUserChanged) {
  const firebaseInstance = await loadFirebase();

  if (firebaseInstance && auth) {
    const { onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
    const { doc, getDoc, setDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch or create user profile in Firestore
        const userDocRef = doc(db, "users", user.uid);
        let userData = {
          uid: user.uid,
          displayName: user.displayName || user.email.split('@')[0],
          email: user.email,
          photoURL: user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`,
          accountType: 'free',
          createdAt: new Date().toISOString()
        };

        try {
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            userData = { ...userData, ...userSnap.data() };
          } else {
            await setDoc(userDocRef, userData);
          }
        } catch (e) {
          console.error("Firestore user fetch error:", e);
        }
        
        onUserChanged(userData);
      } else {
        onUserChanged(null);
      }
    });
  } else {
    // Local / Mock Mode Initializer
    const saved = localStorage.getItem(MOCK_USER_KEY);
    if (saved) {
      try {
        currentMockUser = JSON.parse(saved);
      } catch (e) {
        currentMockUser = null;
      }
    }
    onUserChanged(currentMockUser);
  }
}

// Get current logged in user
export function getCurrentUser() {
  if (isFirebaseConfigured() && auth) {
    return auth.currentUser;
  }
  return currentMockUser;
}

// Google Sign-In
export async function signInWithGoogle() {
  const firebaseInstance = await loadFirebase();
  
  if (firebaseInstance && auth && googleProvider) {
    const { signInWithPopup } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error("Google login failed:", error);
      throw error;
    }
  } else {
    // Mock Google Login simulation
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          uid: 'google-mock-123',
          displayName: 'Budi Santoso',
          email: 'budi.santoso@gmail.com',
          photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=budi',
          accountType: 'free',
          providerId: 'google.com'
        };
        currentMockUser = mockUser;
        localStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));
        window.location.reload(); // Reload to apply auth state change
        resolve(mockUser);
      }, 800);
    });
  }
}

// Email Register
export async function signUpWithEmail(name, email, password) {
  const firebaseInstance = await loadFirebase();

  if (firebaseInstance && auth) {
    const { createUserWithEmailAndPassword, updateProfile } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      return cred.user;
    } catch (error) {
      console.error("Register failed:", error);
      throw error;
    }
  } else {
    // Mock Register
    const accounts = JSON.parse(localStorage.getItem(MOCK_ACCOUNTS_KEY) || '[]');
    if (accounts.some(acc => acc.email === email)) {
      throw new Error("Email sudah terdaftar!");
    }

    const newUser = {
      uid: 'mock-user-' + Math.random().toString(36).substr(2, 9),
      displayName: name,
      email: email,
      photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
      accountType: 'free',
      providerId: 'password'
    };

    accounts.push({ ...newUser, password });
    localStorage.setItem(MOCK_ACCOUNTS_KEY, JSON.stringify(accounts));
    
    currentMockUser = newUser;
    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(newUser));
    return newUser;
  }
}

// Email Login
export async function loginWithEmail(email, password) {
  const firebaseInstance = await loadFirebase();

  if (firebaseInstance && auth) {
    const { signInWithEmailAndPassword } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      return cred.user;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  } else {
    // Mock Login
    const accounts = JSON.parse(localStorage.getItem(MOCK_ACCOUNTS_KEY) || '[]');
    const user = accounts.find(acc => acc.email === email && acc.password === password);
    if (!user) {
      throw new Error("Email atau password salah!");
    }

    const loggedUser = { ...user };
    delete loggedUser.password;

    currentMockUser = loggedUser;
    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(loggedUser));
    return loggedUser;
  }
}

// Sign Out
export async function signOutUser() {
  const firebaseInstance = await loadFirebase();

  if (firebaseInstance && auth) {
    const { signOut } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
    await signOut(auth);
  } else {
    // Mock Logout
    currentMockUser = null;
    localStorage.removeItem(MOCK_USER_KEY);
    window.location.reload();
  }
}

// Upgrade to Premium
export async function upgradeToPremium() {
  const firebaseInstance = await loadFirebase();
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error("Anda harus masuk terlebih dahulu!");

  if (firebaseInstance && db && auth.currentUser) {
    const { doc, updateDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, { accountType: 'premium' });
      return true;
    } catch (error) {
      console.error("Upgrade failed:", error);
      throw error;
    }
  } else {
    // Mock Upgrade
    if (currentMockUser) {
      currentMockUser.accountType = 'premium';
      localStorage.setItem(MOCK_USER_KEY, JSON.stringify(currentMockUser));
      
      // Update mock database accounts if password based
      const accounts = JSON.parse(localStorage.getItem(MOCK_ACCOUNTS_KEY) || '[]');
      const index = accounts.findIndex(acc => acc.uid === currentMockUser.uid);
      if (index !== -1) {
        accounts[index].accountType = 'premium';
        localStorage.setItem(MOCK_ACCOUNTS_KEY, JSON.stringify(accounts));
      }
      return true;
    }
    return false;
  }
}

// Save Draft to Cloud/Local
export async function saveDraftCloud(docType, data) {
  const firebaseInstance = await loadFirebase();
  const currentUser = getCurrentUser();

  if (!currentUser) return;

  if (firebaseInstance && db && auth.currentUser) {
    const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
    try {
      const draftRef = doc(db, "users", auth.currentUser.uid, "drafts", docType);
      await setDoc(draftRef, {
        docType,
        data,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error saving draft to cloud:", error);
    }
  } else {
    // LocalStorage draft fallback is already managed by storage.js, but let's keep a history log
    const history = JSON.parse(localStorage.getItem(`docugen_history_${currentUser.uid}`) || '[]');
    const index = history.findIndex(h => h.docType === docType);
    const item = { docType, updatedAt: new Date().toISOString() };
    if (index !== -1) {
      history[index] = item;
    } else {
      history.push(item);
    }
    localStorage.setItem(`docugen_history_${currentUser.uid}`, JSON.stringify(history));
  }
}

// Get All Drafts from Cloud/Local
export async function getDraftsCloud() {
  const firebaseInstance = await loadFirebase();
  const currentUser = getCurrentUser();

  if (!currentUser) return [];

  if (firebaseInstance && db && auth.currentUser) {
    const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
    try {
      const colRef = collection(db, "users", auth.currentUser.uid, "drafts");
      const snapshot = await getDocs(colRef);
      return snapshot.docs.map(doc => ({
        docType: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error loading drafts from cloud:", error);
      return [];
    }
  } else {
    // Load from local storage history for current user
    const history = JSON.parse(localStorage.getItem(`docugen_history_${currentUser.uid}`) || '[]');
    return history.map(item => {
      // Fetch data draft from storage key prefix 'docugen_draft_' + documentType
      const rawData = localStorage.getItem(`docugen_draft_${item.docType}`);
      let data = {};
      try {
        if (rawData) data = JSON.parse(rawData);
      } catch (e) {}
      return {
        docType: item.docType,
        updatedAt: item.updatedAt,
        data
      };
    });
  }
}

// Delete Draft
export async function deleteDraftCloud(docType) {
  const firebaseInstance = await loadFirebase();
  const currentUser = getCurrentUser();

  if (!currentUser) return;

  if (firebaseInstance && db && auth.currentUser) {
    const { doc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
    try {
      const draftRef = doc(db, "users", auth.currentUser.uid, "drafts", docType);
      await deleteDoc(draftRef);
    } catch (error) {
      console.error("Error deleting draft from cloud:", error);
    }
  } else {
    const history = JSON.parse(localStorage.getItem(`docugen_history_${currentUser.uid}`) || '[]');
    const updated = history.filter(h => h.docType !== docType);
    localStorage.setItem(`docugen_history_${currentUser.uid}`, JSON.stringify(updated));
    localStorage.removeItem(`docugen_draft_${docType}`);
  }
}
