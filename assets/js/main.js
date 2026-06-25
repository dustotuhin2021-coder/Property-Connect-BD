// ===== Property Connect BD - main.js =====
document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  if(document.querySelector('form[action="success.html"]')) initFormValidation();
  if(document.querySelector('.gallery')) initGallery();
  if(document.querySelector('input[type="file"][accept="image/*"]')) initPhotoPreview();
});

// ===== 1. Navbar 3-dot Menu Logic =====
function initNavbar() {
  const navbarContainer = document.querySelector('.navbar.container'); // FIX: space দিলাম
  if(!navbarContainer) {
    console.log('Navbar container not found');
    return;
  }

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

// ===== 2. Form Validation =====
function initFormValidation() {
  const forms = document.querySelectorAll('form[action="success.html"]');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const inputs = form.querySelectorAll('input[required], select[required]');
      let valid = true;
      inputs.forEach(input => {
        if(!input.value.trim()) {
          input.style.boxShadow = 'inset 0 0 0 2px #ff6b6b, inset 8px 8px 16px var(--shadow-dark)';
          valid = false;
        } else {
          input.style.boxShadow = 'inset 8px 8px 16px var(--shadow-dark), inset -8px -8px 16px var(--shadow-light)';
        }
      });
      const phone = form.querySelector('input[type="tel"]');
      if(phone && phone.value &&!/^01[3-9]\d{8}$/.test(phone.value)) {
        alert('সঠিক মোবাইল নম্বর দিন: 01XXXXXXXXX');
        phone.focus(); valid = false; e.preventDefault(); return;
      }
      const email = form.querySelector('input[type="email"]');
      if(email && email.value &&!email.value.includes('@')) {
        alert('সঠিক Email দিন'); email.focus(); valid = false; e.preventDefault(); return;
      }
      if(!valid) { e.preventDefault(); alert('সব required ফিল্ড পূরণ করুন স্যার'); }
      else { const btn = form.querySelector('.submit-btn'); if(btn) btn.classList.add('neumorph-inset'); }
    });
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('focus', () => {
        field.style.boxShadow = 'inset 4px 4px 8px var(--shadow-dark), inset -4px -4px 8px var(--shadow-light), 0 0 0 2px var(--primary)';
      });
      field.addEventListener('blur', () => {
        field.style.boxShadow = 'inset 8px 8px 16px var(--shadow-dark), inset -8px -8px 16px var(--shadow-light)';
      });
    });
  });
}

// ===== 3. Gallery =====
function initGallery() {
  document.querySelectorAll('.gallery img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
      const modal = document.createElement('div');
      modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); display:flex; align-items:center; justify-content:center; z-index:9999; cursor:pointer;';
      modal.innerHTML = `<img src="${this.src}" style="max-width:90%; max-height:90%; border-radius:20px; box-shadow:0 20px 60px rgba(0,0,0,0.5);">`;
      document.body.appendChild(modal);
      modal.addEventListener('click', () => modal.remove());
    });
  });
}

// ===== 4. Photo Preview =====
function initPhotoPreview() {
  document.querySelectorAll('input[type="file"][accept="image/*"]').forEach(input => {
    input.addEventListener('change', function() {
      const file = this.files[0];
      if(file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const oldPreview = input.parentElement.querySelector('.photo-preview');
          if(oldPreview) oldPreview.remove();
          const preview = document.createElement('img');
          preview.src = e.target.result;
          preview.className = 'photo-preview neumorph';
          preview.style.cssText = 'width:100px; height:100px; object-fit:cover; border-radius:15px; margin-top:10px;';
          input.parentElement.appendChild(preview);
        };
        reader.readAsDataURL(file);
      }
    });
  });
}

// ===== 5. Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) target.scrollIntoView({ behavior: 'smooth' });
  });
});