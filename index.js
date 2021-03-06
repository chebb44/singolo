const burger = document.querySelector('#burger');
const sidebar = document.querySelector('#sidebar');
const navMenu = document.querySelector('.page-header_navigation');
let navItems  = navMenu.querySelectorAll('.navigation__button');
let navItemsSidebar  = sidebar.querySelectorAll('.navigation__button');
navMenu.addEventListener('click', function(event){
  navItems.forEach(element => {
    element.classList.remove('navigation__button_active');
  });
  event.target.classList.add('navigation__button_active');
});

// carousel

let items = document.querySelectorAll('.slider__item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n){
  currentItem = (n + items.length) % items.length;
}

document.querySelector('.slider__arrow-left').addEventListener('click', function(){
  if (isEnabled) {
    previousItem(currentItem);
  }
});
document.querySelector('.slider__arrow-right').addEventListener('click', function(){
  if (isEnabled){ 
    nextItem(currentItem);
  }
});

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

function hideItem(direction){
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function(){
    this.classList.remove('active', direction);
  })
}

function showItem(direction){
  items[currentItem].classList.add('next', direction);
  items[currentItem].addEventListener('animationend', function(){
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled = true;
  })
}
const swipedetect = (el) => {
  let surface = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;
  
  let startTime = 0;
  let elapsedTime = 0;

  let threshold = 100;
  let resrtaint = 70;
  let allowedTime = 300;

  surface.addEventListener('mousedown', function(e){
    dist = 0;
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });

  surface.addEventListener('mouseup', function(e){
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
    if(elapsedTime < allowedTime){
      if(Math.abs(distX) > threshold && Math.abs(distY) < resrtaint){
        if (distX > 0 && isEnabled) {
          previousItem(currentItem);
        }
        if (distX < 0 && isEnabled) {
          nextItem(currentItem);
        } 
      }
    }
    
    e.preventDefault();
  });

  surface.addEventListener('touchstart', function(e){
    if(e.target.classList.contains('arrow')){
      if(e.target.classList.contains('left') && isEnabled){
        previousItem(currentItem);
      }
      if(e.target.classList.contains('right') && isEnabled){
        nextItem(currentItem);
      } 
    }
    let touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
    // e.preventDefault();
  });

  surface.addEventListener('touchmove', function(e){
    // e.preventDefault();
  });

  surface.addEventListener('touchend', function(e){
    let touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;
    if(elapsedTime < allowedTime){
      if(Math.abs(distX) > threshold && Math.abs(distY) < resrtaint){
        if (distX > 0 && isEnabled) {
          previousItem(currentItem);
        }
        if (distX < 0 && isEnabled) {
          nextItem(currentItem);
        } 
      }
    }
    
    // e.preventDefault();
  });
}
let el = document.querySelector('.slider');
swipedetect(el);

//

document.querySelector('.slider__pic-1').addEventListener('click', event => {
  document.querySelector('.screen-phone-1').classList.toggle('hidden');
});
document.querySelector('.screen-phone-1').addEventListener('click', function(event) {
  this.classList.add('hidden');
});
document.querySelector('.slider__pic-2').addEventListener('click', event => {
  document.querySelector('.screen-phone-2').classList.toggle('hidden');
});
document.querySelector('.screen-phone-2').addEventListener('click', function(event) {
  this.classList.add('hidden');
});

const filter = document.querySelector('.portfolio__filters');
filterItems  = filter.querySelectorAll('.filter__button');
filter.addEventListener('click', function(event){
  changePortfolioOrder();
  filterItems.forEach(element => {
    element.classList.remove('filter__button_active');
  });
  event.target.classList.add('filter__button_active');
});

const portfolioContainer = document.querySelector('.portfolio__content-container');

function changePortfolioOrder() {
  const portfolioItems =  Array.from(portfolioContainer.querySelectorAll('.container-4x3__item'));
  const tempItem = portfolioItems.shift();
  portfolioItems[0] = portfolioItems[portfolioItems.length-1];
  portfolioItems.push(tempItem);
  for (let i = 0; i < portfolioItems.length; i++) {
    portfolioContainer.appendChild(portfolioItems[i]);
  }
  
}

portfolioContainer.addEventListener('click', function(event){
  const portfolioItems =  Array.from(portfolioContainer.querySelectorAll('.container-4x3__item'));
  portfolioItems.forEach(element => {
    element.classList.remove('active');
  });
  event.target.closest('.container-4x3__item').classList.add('active');
});

function shomModalWindow(){
  const modalWrapper = document.createElement('div');
  modalWrapper.id = 'modal-wrapper';
  const modalWindow = document.createElement('div');
  modalWindow.id = 'modal-window';
  modalWindow.style.top = `${window.pageYOffset + document.documentElement.clientHeight / 2 - 100}px`;  
  modalWindow.style.left = `calc (100% - 150px / 2)`;  
  
  modalWindow.insertAdjacentHTML("beforeend", `<p>Письмо отправлено</p>`);
  if (document.getElementById('subject-input').value){
    if (document.getElementById('subject-input').value.length > 50) {
      modalWindow.insertAdjacentHTML("beforeend", `<p>Тема: ${document.getElementById('subject-input').value.substring(0,50)}...</p>`);
    } else{
      modalWindow.insertAdjacentHTML("beforeend", `<p>Тема: ${document.getElementById('subject-input').value}</p>`);
    }
  } else {
    modalWindow.insertAdjacentHTML("beforeend", `<p>Без темы</p>`);
  }
  
  if (document.getElementById('textarea').value){
    if (document.getElementById('textarea').value.length > 50){
      modalWindow.insertAdjacentHTML("beforeend", `<p>Описание: ${document.getElementById('textarea').value.substring(0,50)}...</p>`);
    } else{
      modalWindow.insertAdjacentHTML("beforeend", `<p>Описание: ${document.getElementById('textarea').value}</p>`);
    }
  } else {
    modalWindow.insertAdjacentHTML("beforeend", `<p>Без описания</p>`);
  }
  
  const closeBtn = document.createElement('button');
  closeBtn.id = 'close-btn';
  closeBtn.innerText = 'Ok';
  modalWindow.appendChild(closeBtn);

  modalWrapper.appendChild(modalWindow);
  document.querySelector('.page-wrapper').appendChild(modalWrapper);
  closeBtn.addEventListener('click', function(){
    modalWrapper.remove();
  })
}

document.getElementById('form').addEventListener('submit', function(e){
  e.preventDefault();
  shomModalWindow();
  e.currentTarget.reset();
})

document.addEventListener('scroll', function(ev) {
  try{
    let targetClass = document.elementFromPoint(document.documentElement.clientWidth - 20, document.documentElement.clientHeight / 2).closest('section').classList.value;
    navItems.forEach(element => {
      element.classList.remove('navigation__button_active');
    });
    navItemsSidebar.forEach(element => {
      element.classList.remove('navigation__button_active');
    });
    
    let activeBtn = navMenu.querySelector(`.${targetClass}-btn`);
    activeBtn.classList.add('navigation__button_active');
    let activeBtnSide = sidebar.querySelector(`.${targetClass}-btn`);
    activeBtnSide.classList.add('navigation__button_active');
  }
  catch{
    return;
  }
  localStorage.setItem('scrollPosition', document.documentElement.scrollTop);
});



document.documentElement.scrollTop = localStorage.getItem('scrollPosition') || 0;

let sidebarActive = false;
let burgerEnable = true;
function hideSidebar(){
  document.querySelector('.page-wrapper').classList.remove('fixed');
  sidebar.classList.remove('to-left');
  sidebar.style.display = 'none';
  sidebarActive = false;
  document.querySelector('#head-logo').style.opacity = '1';
  burgerEnable = true;
}

burger.addEventListener('click', function(ev){
  if (burgerEnable){
    burgerEnable = false;
    sidebar.removeEventListener('animationend', hideSidebar);
    burger.classList.toggle('rotate-burger');
    if(!sidebarActive){
      document.querySelector('#head-logo').style.opacity = '0';
      sidebar.style.display = 'flex';
      sidebar.classList.add('from-left');
      sidebar.addEventListener('animationend', function(){
        sidebar.classList.remove('from-left');
        sidebarActive = true;
        burgerEnable = true;
      });
    } else{
      sidebar.classList.add('to-left');
      sidebar.addEventListener('animationend', hideSidebar);
    }
  }
});

document.querySelector('.sidebar__links-block').addEventListener('click', function(){
  burger.classList.toggle('rotate-burger');
  sidebarActive = false;
  sidebar.classList.add('to-left');
  sidebar.addEventListener('animationend', hideSidebar);
});