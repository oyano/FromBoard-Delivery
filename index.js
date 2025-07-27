"use string";
function useSlider(action) {
  if (isThatComputer()) {
    desktopSlider(action);
    return;
  }
  action = parseInt(action);

  let current = document
    .getElementById("limiter-for-display")
    .getAttribute("data-current-pos");
  current = parseInt(current);

  let countItems =
    document.querySelector("#containerReviews").childElementCount;

  // проверка можно ли листать в ту сторону которую нажали
  if (isLastOrFirstEl(current, action, countItems)) return;

  // перемещаю слайдер
  current += action;
  const review = document.getElementById("containerReviews");
  review.style.transform = `translateX(-${(current - 1) * 100}%)`;

  document
    .getElementById("limiter-for-display")
    .setAttribute("data-current-pos", current);
  // меняю значение в тегах

  // меняю цвета кнопок если надо
  changeButtons(current, countItems);
}

function isLastOrFirstEl(current, action, countItems) {
  if (current === 1 && action === -1) return true;
  if (current === countItems && action === 1) return true;
}

function isThatComputer() {
  const clientWidth = window.innerWidth;

  if (clientWidth >= 1536) return true;

  return false;
}

function desktopSlider(action) {
  action = parseInt(action);

  let current = document
    .getElementById("limiter-for-display")
    .getAttribute("data-current-pos");
  current = parseInt(current);

  let countItems =
    document.querySelector("#containerReviews").childElementCount - 1;

  // проверка можно ли листать в ту сторону которую нажали
  if (isLastOrFirstEl(current, action, countItems)) return;

  // перемещаю слайдер
  const widthWindow =
    document.getElementById("limiter-for-display").offsetWidth / 2 + 12;
  current += action;
  const review = document.getElementById("containerReviews");
  review.style.transform = `translateX(-${(current - 1) * widthWindow}px)`;

  document
    .getElementById("limiter-for-display")
    .setAttribute("data-current-pos", current);
  // меняю значение в тегах

  // меняю цвета кнопок если надо
  changeButtons(current, countItems);
}

function changeButtons(current, countItems) {
  if (current === 1) {
    document.getElementById("prev").classList.add("opacity-50");
    document.getElementById("prev").classList.remove("cursor-pointer");
  } else {
    document.getElementById("prev").classList.remove("opacity-50");
    document.getElementById("prev").classList.add("cursor-pointer");
  }

  if (current === countItems) {
    document.getElementById("next").classList.add("opacity-50");
    document.getElementById("next").classList.remove("cursor-pointer");
  } else {
    document.getElementById("next").classList.remove("opacity-50");
    document.getElementById("next").classList.add("cursor-pointer");
  }

  // То же самое но для мобильных кнопок

  if (current === 1) {
    document.getElementById("prev-m").classList.add("opacity-50");
  } else document.getElementById("prev-m").classList.remove("opacity-50");

  if (current === countItems) {
    document.getElementById("next-m").classList.add("opacity-50");
  } else document.getElementById("next-m").classList.remove("opacity-50");
}

// добавляем тот же слайдер но на свайп
document
  .querySelector("#containerReviews")
  .addEventListener("touchstart", handleTouchStart, false);
document
  .querySelector("#containerReviews")
  .addEventListener("touchmove", handleTouchMove, false);

let xDown = null;
// Фиксируем изначальные координаты прикосновения
function handleTouchStart(evt) {
  const clientX = evt.touches[0]["clientX"];
  xDown = clientX;
}

// Отслеживаем движение пальца и определяем направление свайпа
function handleTouchMove(evt) {
  if (!xDown) {
    return; // Если изначальные координаты не зафиксированы, прекращаем выполнение
  }

  const clientX = evt.touches[0]["clientX"];

  const xDiff = xDown - clientX;

  // Вычисляем, был ли свайп выполнен по горизонтали или вертикали
  xDiff > 0 ? useSlider(+1) : useSlider(-1);

  // Обнуляем координаты после распознавания свайпа
  xDown = null;
}

function useBurger() {
  if (isThereBurger()) return;
  linesBurger();
  showBurgerWall();

  const burger = document.getElementById("burger");
  burger.classList.toggle("transform-[translateY(-200vh)]");

  document.body.classList.toggle("overflow-hidden");
}

function linesBurger() {
  const first = document.getElementById("burgerOne");
  const second = document.getElementById("burgerTwo");
  const third = document.getElementById("burgerThree");
  const fourth = document.getElementById("burgerFour");

  first.classList.toggle("opacity-0");
  fourth.classList.toggle("opacity-0");

  second.classList.toggle("rotate-45");
  third.classList.toggle("rotate-[-45deg]");
}

function showBurgerWall() {
  setTimeout(() => {
    document.getElementById("burger-wall").classList.toggle("hidden");
  }, "300");
}

function isThereBurger() {
  const clientWidth = window.innerWidth;

  if (clientWidth < 1024) return false;

  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sliderBtn").addEventListener("click", useAccordion);
});
function useAccordion() {
  const container = document.querySelector("#slider");
  const maxHeight = container.scrollHeight;
  const height = container.clientHeight;

  if (maxHeight === height) {
    container.style.maxHeight = `0px`;
    const button = event.target;
    editButton(button, "Показать больше документов");
    return;
  }

  container.style.maxHeight = `${maxHeight}px`;
  const button = event.target;
  editButton(button, "Скрыть документы");
  return;
}

function editButton(button, text) {
  button.innerHTML = text;
}
