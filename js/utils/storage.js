// ============================================
// DocuGen - localStorage Draft Management
// ============================================

const PREFIX = 'docugen_draft_';

export function saveDraft(documentType, data) {
  try {
    localStorage.setItem(PREFIX + documentType, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save draft:', e);
  }
}

export function loadDraft(documentType) {
  try {
    const raw = localStorage.getItem(PREFIX + documentType);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('Failed to load draft:', e);
    return null;
  }
}

export function clearDraft(documentType) {
  localStorage.removeItem(PREFIX + documentType);
}

export function getAllDrafts() {
  const drafts = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(PREFIX)) {
      const type = key.slice(PREFIX.length);
      drafts[type] = JSON.parse(localStorage.getItem(key));
    }
  }
  return drafts;
}
