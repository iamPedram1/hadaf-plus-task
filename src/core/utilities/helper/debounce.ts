export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: any;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
