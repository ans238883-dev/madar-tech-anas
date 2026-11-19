(() => {
  const key = 'madar-theme';
  const root = document.documentElement;
  let theme = 'light';

  try {
    const saved = localStorage.getItem(key);
    const previousSidebar = saved === null && localStorage.getItem('madar-dashboard-sidebar-tone');
    theme = saved === 'dark' || previousSidebar === 'navy' ? 'dark' : 'light';
  } catch {
    // The switch still works for the current page.
  }

  root.dataset.theme = theme;

  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme-toggle');

    function apply(next) {
      theme = next;
      root.dataset.theme = theme;
      button.setAttribute('aria-pressed', String(theme === 'dark'));
    }

    apply(theme);
    button.addEventListener('click', () => {
      apply(theme === 'dark' ? 'light' : 'dark');
      try {
        localStorage.setItem(key, theme);
      } catch {
        // Keep the current appearance if storage is unavailable.
      }
    });

    window.addEventListener('storage', event => {
      if (event.key === key) apply(event.newValue === 'dark' ? 'dark' : 'light');
    });
  });
})();
