export default (sourceUrl, targetUrl) => {
  const urlObj = new URL(sourceUrl);
  const params = new URLSearchParams(urlObj.search);
  const paramString = params.toString();

  // Добавляем параметры в конец targetUrl
  return targetUrl + paramString;
};
