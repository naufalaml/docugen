// ============================================
// DocuGen - Simple Hash-based SPA Router
// ============================================

const routes = {};
let currentRoute = null;

export function registerRoute(path, handler) {
  routes[path] = handler;
}

export function navigateTo(path) {
  window.location.hash = path;
}

export function getCurrentRoute() {
  return currentRoute;
}

function parseHash() {
  const hash = window.location.hash.slice(1) || '/';
  const parts = hash.split('/').filter(Boolean);
  
  if (parts.length === 0) return { path: '/', params: {} };
  
  // Match /generator/:type
  if (parts[0] === 'generator' && parts[1]) {
    return { path: '/generator/:type', params: { type: parts[1] } };
  }
  
  return { path: '/' + parts.join('/'), params: {} };
}

function handleRouteChange() {
  const { path, params } = parseHash();
  
  // Find matching route
  const handler = routes[path] || routes['/'];
  
  if (handler) {
    // Page transition animation
    const main = document.getElementById('main-content');
    if (main) {
      main.classList.add('page-exit');
      setTimeout(() => {
        currentRoute = { path, params };
        handler(params);
        main.classList.remove('page-exit');
        main.classList.add('page-enter');
        setTimeout(() => main.classList.remove('page-enter'), 500);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 200);
    } else {
      currentRoute = { path, params };
      handler(params);
    }
  }
}

export function initRouter() {
  window.addEventListener('hashchange', handleRouteChange);
  // Initial route
  handleRouteChange();
}
