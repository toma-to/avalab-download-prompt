export const setupMaterialIcon = (): void => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
  link.rel = 'stylesheet';
  const head = document.getElementsByTagName('head')[0];
  head.append(link);
};
