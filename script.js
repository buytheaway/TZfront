const dialog = document.querySelector('.request-dialog');
const languageToggle = document.querySelector('[data-language-toggle]');
const languageList = document.querySelector('#language-list');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('#mobile-menu');
mobileMenu.style.display = 'none';

const translations = {
  ru: {
    nav: ['О компании', 'Этапы работы', 'Отзывы', 'Контакты'], menu: 'Меню', consult: 'Получить консультацию',
    heroTag: 'СКЛАД ВРЕМЕННОГО ХРАНЕНИЯ', heroTitle: 'БЫСТРОЕ ОФОРМЛЕНИЕ<br>БЕЗОПАСНОЕ ХРАНЕНИЕ',
    heroText: 'AKA — склад временного хранения в Алматы.<br>Помогаем оформить груз без лишних задержек.', dialogTitle: 'Получить консультацию', dialogText: 'Оставьте контакты, и мы перезвоним вам.', name: 'Ваше имя', phone: 'Ваш телефон', send: 'Отправить заявку'
  },
  en: {
    nav: ['About us', 'How it works', 'Reviews', 'Contacts'], menu: 'Menu', consult: 'Get a consultation',
    heroTag: 'TEMPORARY STORAGE WAREHOUSE', heroTitle: 'FAST CLEARANCE<br>SECURE STORAGE',
    heroText: 'AKA is a temporary storage warehouse in Almaty.<br>We clear your cargo without unnecessary delays.', dialogTitle: 'Get a consultation', dialogText: 'Leave your contact details and we will call you back.', name: 'Your name', phone: 'Your phone', send: 'Send request'
  },
  kk: {
    nav: ['Компания туралы', 'Жұмыс кезеңдері', 'Пікірлер', 'Байланыстар'], menu: 'Мәзір', consult: 'Кеңес алу',
    heroTag: 'УАҚЫТША САҚТАУ ҚОЙМАСЫ', heroTitle: 'ЖЕДЕЛ РӘСІМДЕУ<br>ҚАУІПСІЗ САҚТАУ',
    heroText: 'AKA — Алматыдағы уақытша сақтау қоймасы.<br>Жүкті артық кідіріссіз рәсімдеуге көмектесеміз.', dialogTitle: 'Кеңес алу', dialogText: 'Байланыс деректеріңізді қалдырыңыз, біз сізге хабарласамыз.', name: 'Аты-жөніңіз', phone: 'Телефоныңыз', send: 'Өтінім жіберу'
  }
};

function applyLanguage(language) {
  const copy = translations[language];
  document.documentElement.lang = language;
  document.title = language === 'en' ? 'AKA — temporary storage warehouse' : language === 'kk' ? 'AKA — уақытша сақтау қоймасы' : 'AKA — склад временного хранения';
  document.querySelectorAll('.main-nav a, .mobile-menu a').forEach((link, index) => { link.textContent = copy.nav[index % 4]; });
  menuToggle.childNodes[0].textContent = `${copy.menu} `;
  document.querySelectorAll('[data-open-form]').forEach((button) => { if (!button.closest('.mobile-menu')) button.childNodes[0].textContent = `${copy.consult} `; });
  document.querySelector('.mobile-menu [data-open-form]').childNodes[0].textContent = `${copy.consult} `;
  document.querySelector('.hero .kicker').textContent = copy.heroTag;
  document.querySelector('.hero h1').innerHTML = copy.heroTitle;
  document.querySelector('.hero-copy').innerHTML = copy.heroText;
  document.querySelector('#dialog-title').textContent = copy.dialogTitle;
  document.querySelector('.request-dialog > p:not(.kicker):not(.form-status)').textContent = copy.dialogText;
  const labels = document.querySelectorAll('#dialog-form label');
  labels[0].childNodes[0].textContent = copy.name;
  labels[1].childNodes[0].textContent = copy.phone;
  document.querySelector('#dialog-form button').childNodes[0].textContent = `${copy.send} `;
}

function submitForm(form) {
  const status = form.parentElement.querySelector('.form-status');
  if (status) status.textContent = 'Спасибо! Заявка принята, мы скоро свяжемся с вами.';
  form.reset();
}

document.querySelectorAll('[data-open-form]').forEach((button) => button.addEventListener('click', () => {
  mobileMenu.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  dialog.showModal();
  dialog.querySelector('input').focus();
}));

languageToggle.addEventListener('click', () => {
  const open = languageList.hidden;
  languageList.hidden = !open;
  languageToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => {
  const language = button.dataset.language;
  const labels = { ru: 'RU', en: 'EN', kk: 'KZ' };
  applyLanguage(language);
  languageToggle.firstChild.textContent = `${labels[language]} `;
  languageList.hidden = true;
  languageToggle.setAttribute('aria-expanded', 'false');
}));

menuToggle.addEventListener('click', () => {
  const open = mobileMenu.style.display === 'none';
  mobileMenu.hidden = !open;
  mobileMenu.style.display = open ? 'grid' : 'none';
  menuToggle.setAttribute('aria-expanded', String(open));
});

mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileMenu.hidden = true;
  mobileMenu.style.display = 'none';
  menuToggle.setAttribute('aria-expanded', 'false');
}));

document.querySelector('[data-close-form]').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
document.querySelectorAll('form').forEach((form) => form.addEventListener('submit', (event) => {
  event.preventDefault();
  submitForm(form);
}));
