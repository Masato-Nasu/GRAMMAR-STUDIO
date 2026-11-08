const installButton = document.getElementById('installApp');
const installHelp = document.getElementById('installHelp');
const offlineStatus = document.getElementById('offlineStatus');
const installed = window.matchMedia('(display-mode: standalone)');
let deferredPrompt;
let ready = false;
let failed = false;

function updateStatus() {
  const online = navigator.onLine !== false;
  offlineStatus.textContent = online
    ? ready ? 'オフライン学習の準備完了' : failed ? 'オフライン用の保存ができませんでした。再読み込みしてお試しください。' : 'オフライン学習の準備中…'
    : 'オフライン · 授業と練習を利用できます。AIへの相談には通信が必要です。';
  installButton.hidden = installed.matches || navigator.standalone === true;
}
window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  deferredPrompt = event;
});
window.addEventListener('appinstalled', () => {
  deferredPrompt = undefined;
  installButton.hidden = true;
});
installed.addEventListener?.('change', updateStatus);
installButton.addEventListener('click', async () => {
  const prompt = deferredPrompt;
  if (prompt) {
    deferredPrompt = undefined;
    try {
      const result = await prompt.prompt();
      if (result.outcome === 'accepted') installButton.hidden = true;
      return;
    } catch { /* The browser menu is available as a fallback. */ }
  }
  installHelp.showModal();
});
document.getElementById('closeInstallHelp').addEventListener('click', () => installHelp.close());
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {updateViaCache:'none'}).then(registration => {
    const worker = registration.installing;
    worker?.addEventListener('statechange', () => {
      if (worker.state === 'redundant' && !ready) {failed = true; updateStatus();}
    });
    return navigator.serviceWorker.ready;
  }).then(() => {ready = true; updateStatus();}).catch(() => {failed = true; updateStatus();});
} else {
  offlineStatus.hidden = true;
}
updateStatus();
