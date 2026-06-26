document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  initDashboard();
  initForms();
});

// ========== 1. MOBILE NAVBAR 3-DOT MENU ==========
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

// ========== 2. DASHBOARD AUTO LOAD ==========
function initDashboard() {
  const dashboardWrap = document.getElementById('buyer-dashboard') || 
                        document.getElementById('owner-dashboard') || 
                        document.getElementById('agent-dashboard');
  if(!dashboardWrap) return;

  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get('type') || 'buyer';

  // সব hide করে দাও
  document.getElementById('buyer-dashboard')?.classList.add('hidden');
  document.getElementById('owner-dashboard')?.classList.add('hidden');
  document.getElementById('agent-dashboard')?.classList.add('hidden');

  // শুধু 1টা show করো
  if(type === 'owner') {
    document.getElementById('owner-dashboard')?.classList.remove('hidden');
  } else if(type === 'agent') {
    document.getElementById('agent-dashboard')?.classList.remove('hidden');
  } else {
    document.getElementById('buyer-dashboard')?.classList.remove('hidden');
  }
}

// ========== 3. ALL FORM HANDLERS ==========
function initForms() {
  // Login Form
  const loginForm = document.querySelector('form[onsubmit*="handleLogin"]');
  if(loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Register Form  
  const registerForm = document.getElementById('registerForm');
  if(registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }

  // Contact Form
  const contactForm = document.querySelector('form[onsubmit*="handleContact"]');
  if(contactForm) {
    contactForm.addEventListener('submit', handleContact);
  }
}

// ========== 4. LOGIN FUNCTION ==========
function handleLogin(event) {
  event.preventDefault();
  
  const type = document.getElementById('userType')?.value || 'buyer';
  const email = event.target.querySelector('input[type="email"]').value;

  // TODO: Backend API Call এখানে হবে
  // fetch('/api/login', {method: 'POST', body: JSON.stringify({email, type})})

  alert('Login Success as: ' + type.toUpperCase());
  
  // Dashboard এ Redirect
  window.location.href = 'dashboard.html?type=' + type;
}

// ========== 5. REGISTER FUNCTION ==========
function handleRegister(event) {
  event.preventDefault();
  
  const pass = document.getElementById('password').value;
  const cpass = document.getElementById('confirmPassword').value;
  const type = document.getElementById('userType').value;
  
  // Password match check
  if(pass !== cpass) {
    document.getElementById('passError').style.display = 'block';
    return;
  } else {
    document.getElementById('passError').style.display = 'none';
  }

  // TODO: Backend API Call এখানে হবে
  // fetch('/api/register', {method: 'POST', body: JSON.stringify({type, ...})})

  alert('Registration Success as: ' + type.toUpperCase() + '\n\n' + 
        (type === 'agent' ? 'Admin verification pending...' : 'Login করে শুরু করুন'));
  
  // Login Page এ পাঠায় দাও
  window.location.href = 'login.html';
}

// ========== 6. CONTACT FUNCTION ==========
function handleContact(event) {
  event.preventDefault();
  alert('Message Sent স্যার! \n\nআমরা 24 ঘন্টার মধ্যে আপনার সাথে যোগাযোগ করবো।');
  event.target.reset();
}

// ========== 7. LOGOUT FUNCTION ==========
function logout() {
  // TODO: Backend এ token clear করতে হবে
  localStorage.clear();
  alert('Logout Success');
  window.location.href = 'index.html';
}

// ========== 8. USER TYPE TAB SELECT ==========
function selectType(type) {
  document.querySelectorAll('.type-tab').forEach(tab => tab.classList.remove('active'));
  document.querySelector(`[data-type="${type}"]`)?.classList.add('active');
  document.getElementById('userType').value = type;
  
  // Agent select করলে note show করো
  const agentNote = document.getElementById('agent-note');
  if(agentNote) {
    if(type === 'agent') {
      agentNote.classList.remove('hidden');
    } else {
      agentNote.classList.add('hidden');
    }
  }
}