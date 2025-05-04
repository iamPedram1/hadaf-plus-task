export const isValidUrl = (url: string) => {
  const regex =
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/;
  return regex.test(url);
};
