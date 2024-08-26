if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/sw.js', { scope: '/' })})}
if (/*@cc_on!@*/ false || (!!window.MSInputMethodContext && !!document.documentMode)){window.location.href = 'https://ssle.cn/check-browser-ie.html';}
if (!localStorage.getItem('token')) {
  document.onkeydown = function () {
    if (window.event && window.event.keyCode == 123) {
        event.keyCode = 0;
        event.returnValue = false;
    }
  }
  ConsoleBan.init();
}