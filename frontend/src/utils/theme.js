// Theme Management Utility

export const getInitialTheme = () => {
  return 'light';
};

export const applyTheme = (theme) => {
  const root = window.document.documentElement;
  root.classList.remove('dark');
  root.classList.add('light');
  localStorage.setItem('color-theme', 'light');
};
