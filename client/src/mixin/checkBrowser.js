export function checkBrowser() {
  let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  let isOpera = userAgent.indexOf("Opera") > -1;

  if (isOpera) {
    return "Opera"
  } //Opera
  if (userAgent.indexOf("Firefox") > -1) {
    return "FF";
  } //Firefox
  if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome";
  } //Chrome
  if (userAgent.indexOf("Safari") > -1) {
    return "Safari";
  } //Safari
  if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
    return "IE";
  } //IE
}
