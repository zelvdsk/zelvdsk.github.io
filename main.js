// Navbar
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () =>{
  const ul = window.getComputedStyle(menu);
  const display = ul.getPropertyValue('display');
  if(display === 'none'){
    menu.style.display = 'block';
  } else {
    menu.style.display = 'none';
  }
});

// Homepage 
const homepageId = document.getElementById('homepage');

function homepage() {
  // show honepage card
  homepageId.style.display = 'block';
};