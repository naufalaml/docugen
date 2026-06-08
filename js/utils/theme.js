// ============================================
// DocuGen - Theme (Dark/Light Mode) Manager
// ============================================

const STORAGE_KEY = 'docugen_theme';

export function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else {
    // Default to dark
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

export function toggleTheme() {
  const current = getCurrentTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(STORAGE_KEY, next);
}

export function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'dark';
}
