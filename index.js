function toggleMenu() {
    const menu = document.querySelector('.menu-items');
    menu.classList.toggle('show');
}

document.addEventListener('click', function(event) {
    const menu = document.querySelector('.menu-items');
    const toggle = document.querySelector('.nav-toggle');
    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
        menu.classList.remove('show');
    }
});

function toggleLanguage() {
    const trContent = document.getElementById('tr');
    const enContent = document.getElementById('en');
    
    if (trContent.classList.contains('active')) {
        trContent.classList.remove('active');
        enContent.classList.add('active');
    } else {
        enContent.classList.remove('active');
        trContent.classList.add('active');
    }
}

function toggleFullText(button) {
    const fullText = button.previousElementSibling;
    const isEnglish = button.textContent === 'Read More' || button.textContent === 'Show Less';
    
    if (fullText.classList.contains('hidden')) {
        fullText.classList.remove('hidden');
        button.textContent = isEnglish ? 'Show Less' : 'Daha Az Göster';
    } else {
        fullText.classList.add('hidden');
        button.textContent = isEnglish ? 'Read More' : 'Devamını Oku';
    }
}

function setLanguage(lang) {
  localStorage.setItem("lang", lang); 
  for (const key in translations[lang]) {
    const el = document.getElementById(key);
    if (el) el.innerHTML = translations[lang][key];
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "tr";
  setLanguage(savedLang);
});
