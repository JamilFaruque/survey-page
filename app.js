const startBtn = document.querySelector('.start-btn');
const allPages = document.querySelectorAll('.contents');
const allPointer = document.querySelectorAll('.pointer');
const nextButtons = document.querySelectorAll('.next-btn');
const previousTab = document.querySelectorAll('.back-icon');
const nextTabAll = document.querySelectorAll('.next-icon')
const restartBtn = document.querySelector('.restart-btn');

const loader = document.querySelector('.preloader')
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.style.display = 'none'
  }, 1000)
})

startBtn.addEventListener('click', showNextPage);

restartBtn.addEventListener('click', () => {
  location.reload()
})

let nextTab;
let doubleNext;
function showNextPage() {
  let currentPage;
  let nextPage;
  let currentPointer;
  let pointerIndex;
  let filteredPointer;

  for (let i = 0; i < allPages.length; i++) {
    let page = allPages[i];
    if (!page.classList.contains('hidden')) {
      currentPage = page;
      nextPage = allPages[i + 1];
      doubleNext = allPages[i + 2];
      currentPointer = nextPage.querySelectorAll('.pointer')
      pointerIndex = currentPointer[i]

      filteredPointer = Array.from(currentPointer).filter((val) => {
        return Array.from(currentPointer).indexOf(val) < i
      })
    }
  }
  for (let i = 0; i < filteredPointer.length; i++) {
    filteredPointer[i].style.background = '#0078B4'
    filteredPointer[i].style.opacity = '1'
  };

  currentPage.classList.add('hidden');
  nextPage.classList.remove('hidden');
  pointerIndex.style.height = '7px';
  pointerIndex.style.opacity = '1';

  let nxtBtn = nextPage.querySelector('.btn');
  let checkInputs = nextPage.querySelectorAll('.ripple-input');
  let isChecked;
  for (let i = 0; i < checkInputs.length; i++) {
    if (checkInputs[i].checked) {
      isChecked = true;
      break;
    } else {
      isChecked = false;
    }
  }
  if (isChecked) {
    nxtBtn.style.opacity = '1'
    nxtBtn.disabled = false;
  } else {
    nxtBtn.style.opacity = '.5';
    nxtBtn.disabled = true;

  }

  nextTab = nextPage.querySelector('.next-icon');

  nextTab.style.opacity = '.5'

  let inputs = nextPage.querySelectorAll('.ripple-input')
  inputs.forEach((input) => {
    if (input.checked) {
      nextTab.style.opacity = '1';
    }
    input.addEventListener('change', () => {
      pointerIndex.style.background = '#0078B4';
      nxtBtn.style.opacity = 1;
      nxtBtn.disabled = false;


      nextTab.style.opacity = '1';
      nextTab.addEventListener('click', goToNextTab)
    })
  });

  let myRipples = nextPage.querySelectorAll('.ripple');
  myRipples.forEach((r) => {
    r.addEventListener('change', () => {
      setTimeout(() => {
        r.classList.remove('checked')
      }, 500)
      r.classList.add('checked')
    })
  })
};

function showPreviousPage() {
  let currentPage;
  let previousPage;
  for (let i = 0; i < allPages.length; i++) {
    let page = allPages[i];
    if (!page.classList.contains('hidden')) {
      currentPage = page;
      previousPage = allPages[i - 1]
    }
  }
  currentPage.classList.add('hidden');
  previousPage.classList.remove('hidden');
}

nextButtons.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    btn.classList.add('hardAnimation')
    setTimeout(() => {
      showNextPage();
      btn.classList.remove('hardAnimation')
    }, 150)
  });
});

previousTab.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    allPages.forEach((page) => {
      page.classList.add('anim')
    })
    showPreviousPage();
  })
})


function goToNextTab() {
  let thisPage;
  let nxtPage;
  for (let i = 0; i < allPages.length; i++) {
    if (!allPages[i].classList.contains('hidden')) {
      thisPage = allPages[i];
      nxtPage = allPages[i + 1]
    }
  }
  thisPage.classList.add('anim')
  let radioInputs = nxtPage.querySelectorAll('.ripple-input');

  let isNextChecked;
  for (let i = 0; i < radioInputs.length; i++) {
    if (radioInputs[i].checked) {
      isNextChecked = true;
      break;
    }
  }
  if (isNextChecked) {
    showNextPage()
  }
}

