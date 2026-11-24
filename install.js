(() => {
  const btn = document.getElementById('installApp');
  const status = document.getElementById('installStatus');
  let promptEvent = null;
  const standalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  function installed() { btn.hidden = true; status.textContent = 'التطبيق مثبّت على جهازك.'; }
  if (standalone()) installed();
  addEventListener('beforeinstallprompt', event => {
    event.preventDefault(); promptEvent = event;
  });
  addEventListener('appinstalled', () => { promptEvent = null; installed(); });
  btn.addEventListener('click', async () => {
    if (standalone()) return installed();
    if (!promptEvent) {
      status.textContent = 'افتح الموقع مباشرة في Chrome أو Edge، ثم من قائمة المتصفح اختر تثبيت التطبيق أو إضافة إلى الشاشة الرئيسية.';
      return;
    }
    const event = promptEvent; promptEvent = null;
    try { await event.prompt(); const result = await event.userChoice;
      status.textContent = result.outcome === 'accepted' ? 'تم قبول طلب التثبيت.' : 'يمكنك تثبيت التطبيق لاحقًا من قائمة المتصفح.';
    } catch { status.textContent = 'استخدم خيار التثبيت من قائمة المتصفح.'; }
  });
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    navigator.serviceWorker.register('./sw.js').then(() => navigator.serviceWorker.ready).then(() => {
      if (!standalone()) status.textContent = 'التطبيق جاهز للعمل دون اتصال. ثبّته من هذا الزر أو قائمة المتصفح.';
    }).catch(() => { status.textContent = 'تعذّر إعداد العمل دون اتصال؛ يمكنك استخدام التطبيق عبر الإنترنت.'; });
  }
})();
