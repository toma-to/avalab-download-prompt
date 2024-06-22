export const getRoot = (current: HTMLElement): HTMLElement | null => {
  return current.parentElement?.parentElement ?? null;
};
