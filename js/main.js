document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
});

function initNavbar() {
  const navbarContainer = document.querySelector('.navbar .container');
  if(!navbarContainer) return;
  if(navbarContainer.querySelector('.menu-btn')) return;

  const menuBtn = document.createElement('button');
  menuBtn.innerHTML = '⋮';
  menuBtn.className = 'menu-btn neumorph';
  menuBtn.setAttribute('aria-label', 'Menu');
  navbarContainer.appendChild(menuBtn);

  const navLinks = navbarContainer.querySelector('.nav-links');
  if(!navLinks) return;

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('show');
    menuBtn.classList.toggle('neumorph-inset');
  });

  document.addEventListener('click', () => {
    navLinks.classList.remove('show');
    menuBtn.classList.remove('neumorph-inset');
  });

  navLinks.addEventListener('click', (e) => e.stopPropagation());

  window.addEventListener('resize', () => {
    if(window.innerWidth > 900) {
      navLinks.classList.remove('show');
      menuBtn.classList.remove('neumorph-inset');
    }
  });
}