// Theme Management Utility

export const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs;
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return 'dark';
    }
  }

  // Default theme is light for warm cream-beige aesthetic
  return 'light';
};

export const applyTheme = (theme) => {
  const root = window.document.documentElement;
  const isDark = theme === 'dark';

  root.classList.remove(isDark ? 'light' : 'dark');
  root.classList.add(theme);

  localStorage.setItem('color-theme', theme);
};
