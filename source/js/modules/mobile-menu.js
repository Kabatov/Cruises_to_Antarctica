import {FocusLock} from '../utils/focus-lock.js';
import {ScrollLock} from '../utils/scroll-lock.js';

const focusLock = new FocusLock();
const scrollLock = new ScrollLock();

export const mobileMenu = function () {
  const menu = document.querySelector('[data-menu]');
  const menuBtn = document.querySelector('[data-menu-button]');
  const menuClose = document.querySelectorAll('.header__nav-link[href^="#"]');

  const onMenuEscKeydown = (evt) => {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      closeMenu();
    }
  };

  const onClickOutsideMenu = (evt) => {
    const target = evt.target;
    if (!target.closest('.header__nav--opened .header__nav-container')) {
      closeMenu();
    }
  };

  function openMenu() {
    menu.classList.add('header__nav--opened');
    focusLock.lock('.header');
    scrollLock.disableScrolling();
    document.addEventListener('keydown', onMenuEscKeydown);
    document.addEventListener('click', onClickOutsideMenu);
  }

  function closeMenu() {
    menu.classList.remove('header__nav--opened');
    focusLock.unlock();
    scrollLock.enableScrolling();
    document.removeEventListener('keydown', onMenuEscKeydown);
    document.removeEventListener('click', onClickOutsideMenu);
  }

  function initmenu() {
    if (menu.classList.contains('header__nav--opened')) {
      closeMenu();
    } else {
      openMenu();
    }
  }


  menuBtn.addEventListener('click', initmenu);
  menuClose.forEach((closer) => closer.addEventListener('click', closeMenu));
};
