import './css/style.css';

const canvas = document.getElementById('canvas');
canvas.width = (localStorage.getItem('canvas-width')) ? localStorage.getItem('canvas-width') : 128;
canvas.height = canvas.width;
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
const colorActive = document.getElementById('color-active');
let color = (localStorage.getItem('color')) ? localStorage.getItem('color') : colorActive.value;
colorActive.parentElement.style.backgroundColor = color;
const colorPrev = document.getElementById('color-prev');
colorPrev.style.backgroundColor = (localStorage.getItem('color-previous')) ? localStorage.getItem('color-previous') : color;
const tools = Array.from(document.querySelectorAll('.tools__tool'));
const clear = tools.pop();
const colors = Array.from(document.querySelectorAll('.colors__color'));
colors.shift();
let pixelSize = 512 / canvas.width;
let size = canvas.width;
const searchInput = document.getElementById('search-input');
const loadBtn = document.getElementById('load-btn');
const sizeSwitcher = document.getElementById('size-switcher');
sizeSwitcher.value = (localStorage.getItem('size-switcher-value')) ? localStorage.getItem('size-switcher-value') : 10;
const sizeSwitcherLabel = document.getElementById('size-switcher-label');
switch (sizeSwitcher.value) {
  case '10':
    sizeSwitcherLabel.innerHTML = '128&times;128';
    break;
  case '20':
    sizeSwitcherLabel.innerHTML = '256&times;256';
    break;
  case '30':
    sizeSwitcherLabel.innerHTML = '512&times;512';
    break;
  default: break;
}
const blackAndWhiteBtn = document.getElementById('b&w-btn');
const baseUrl = 'https://api.unsplash.com/photos/random?query=town,';
const accessKey = '&client_id=7a3d99c5f600e86bde4732a3fa580fa3353b56c7ffe03cd92ee6a9b3da45deec';
let firstSizeData = (localStorage.getItem('pixel-picture')) ? localStorage.getItem('pixel-picture') : null;
let currentImg = null;

let activeTool = (localStorage.getItem('active-tool')) ? tools[localStorage.getItem('active-tool')] : tools[2];
activeTool.classList.add('tools__tool_active');

const anchorTag = document.getElementById('login');
let userName = (localStorage.getItem('user-name')) ? localStorage.getItem('user-name') : null;
anchorTag.innerText = (userName) ? `Logged in as ${userName}` : 'Log in';

function auth() {
  const authenticator = new netlify.default({});
  authenticator.authenticate({ provider: 'github', scope: 'user' }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      fetch('https://api.github.com/user', { headers: { Authorization: `token ${data.token}` } })
        .then((userData) => userData.json()
          .then((user) => {
            anchorTag.innerText = `Logged in as ${user.login}`;
            localStorage.setItem('user-name', user.login);
            userName = user.login;
          }));
    }
  });
}

anchorTag.addEventListener('click', (e) => {
  e.preventDefault();
  if (userName == null) {
    auth();
  } else {
    userName = null;
    localStorage.removeItem('user-name');
    anchorTag.innerText = 'Log in';
  }
});

function clearCanvas() {
  ctx.fillStyle = 'rgb(128, 128, 128)';
  ctx.fillRect(0, 0, canvas.width, canvas.width);
}

if (firstSizeData) {
  const pixelPicture = new Image();
  pixelPicture.src = firstSizeData;
  pixelPicture.onload = () => {
    ctx.drawImage(pixelPicture, 0, 0, canvas.width, canvas.height);
  };
} else {
  clearCanvas();
}

function colorChanger(newColor) {
  const temp = color;
  color = newColor;
  colorPrev.style.backgroundColor = temp;
  colorActive.parentElement.style.backgroundColor = color;
}

function toolChanger(toolNumber) {
  activeTool.classList.remove('tools__tool_active');
  activeTool = tools[toolNumber];
  activeTool.classList.add('tools__tool_active');
}

function coordinateСounter() {
  const widthRatio = canvas.width / currentImg.width;
  const heightRatio = canvas.width / currentImg.height;
  const ratio = Math.min(widthRatio, heightRatio);
  const centerX = (canvas.width - currentImg.width * ratio) / 2;
  const centerY = (canvas.height - currentImg.height * ratio) / 2;

  return [centerX, centerY, ratio];
}


function sizeChanger(newSize) {
  firstSizeData = (!firstSizeData) ? canvas.toDataURL() : firstSizeData;
  currentImg = new Image();
  currentImg.src = firstSizeData;
  canvas.width = newSize;
  canvas.height = newSize;
  pixelSize = 512 / canvas.width;
  size = newSize;
  sizeSwitcherLabel.innerHTML = `${newSize}&times;${newSize}`;
  ctx.imageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  currentImg.onload = () => {
    ctx.drawImage(currentImg, 0, 0, canvas.width, canvas.width);
  };
}

function pixelFill(newColor, y, x) {
  ctx.fillStyle = newColor;
  ctx.fillRect(x, y, 1, 1);
}

async function searchByQuery(url) {
  const response = await fetch(url);
  const data = await response.json();
  clearCanvas();
  currentImg = new Image();
  currentImg.crossOrigin = 'Anonymous';
  currentImg.src = data.urls.small;
  currentImg.onload = () => {
    const [centerX, centerY, ratio] = coordinateСounter();
    ctx.drawImage(currentImg, centerX, centerY, currentImg.width * ratio, currentImg.height * ratio);
    firstSizeData = canvas.toDataURL();
  };
}

sizeSwitcher.addEventListener('input', () => {
  switch (sizeSwitcher.value) {
    case '10':
      sizeChanger(128);
      break;
    case '20':
      sizeChanger(256);
      break;
    case '30':
      sizeChanger(512);
      break;
    default: break;
  }
});

loadBtn.addEventListener('click', () => {
  const queryString = `${searchInput.value}`;
  const url = baseUrl + queryString + accessKey;
  firstSizeData = null;
  clearCanvas();
  searchByQuery(url);
});

blackAndWhiteBtn.addEventListener('click', () => {
  if (!firstSizeData) {
    alert('upload image first');
    return;
  }
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data } = imageData;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }
  ctx.putImageData(imageData, 0, 0);
  firstSizeData = canvas.toDataURL();
});

colorActive.addEventListener('input', () => {
  colorChanger(colorActive.value);
});

tools.forEach((el, index) => {
  el.addEventListener('click', () => {
    toolChanger(index);
  });
});

clear.addEventListener('click', () => {
  clearCanvas();
  firstSizeData = null;
});

colors.forEach((el) => {
  el.addEventListener('click', () => {
    colorChanger(window.getComputedStyle(el.firstElementChild).backgroundColor);
  });
});


document.addEventListener('keypress', (e) => {
  switch (e.code) {
    case 'KeyB':
      toolChanger(0);
      break;
    case 'KeyC':
      toolChanger(1);
      break;
    case 'KeyP':
      toolChanger(2);
      break;
    default: break;
  }
});

let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(e) {
  if (!isDrawing) return;
  const x = Math.floor(e.offsetX / pixelSize);
  const y = Math.floor(e.offsetY / pixelSize);

  const dx = Math.abs(x - lastX);
  const dy = Math.abs(y - lastY);
  const sx = (lastX < x) ? 1 : -1;
  const sy = (lastY < y) ? 1 : -1;
  let err = dx - dy;

  while (true && lastX >= 0 && lastX < size && lastY >= 0 && lastY < size) {
    pixelFill(color, lastY, lastX);

    if ((lastX === x) && (lastY === y)) break;
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; lastX += sx; }
    if (e2 < dx) { err += dx; lastY += sy; }
  }
}

function getRgba(x, y) {
  const pixelData = ctx.getImageData(x, y, 1, 1).data;

  return `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
}

document.addEventListener('click', (e) => {
  if (activeTool === tools[1] && e.target.id === 'canvas') {
    const x = Math.floor(e.offsetX / pixelSize);
    const y = Math.floor(e.offsetY / pixelSize);
    colorChanger(getRgba(x, y));
  }
});

function fill(x, y) {
  const stack = [[x, y]];
  let pixel;
  const pixelColor = getRgba(x, y);

  if (pixelColor === color) return;

  while (stack.length > 0) {
    pixel = stack.pop();
    if (pixel[0] < 0 || pixel[0] > canvas.width) continue;
    if (pixel[1] < 0 || pixel[1] > canvas.width) continue;

    if (getRgba(pixel[0], pixel[1]) === pixelColor) {
      pixelFill(color, pixel[1], pixel[0]);
      stack.push([
        pixel[0] - 1,
        pixel[1],
      ]);
      stack.push([
        pixel[0] + 1,
        pixel[1],
      ]);
      stack.push([
        pixel[0],
        pixel[1] - 1,
      ]);
      stack.push([
        pixel[0],
        pixel[1] + 1,
      ]);
    }
  }
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
  if (activeTool === tools[2]) {
    isDrawing = true;
    lastX = Math.floor(e.offsetX / pixelSize);
    lastY = Math.floor(e.offsetY / pixelSize);
  } else if (activeTool === tools[0]) {
    fill(Math.floor(e.offsetX / pixelSize), Math.floor(e.offsetY / pixelSize));
  }
});
canvas.addEventListener('mouseup', () => {
  firstSizeData = canvas.toDataURL();
  isDrawing = false;
});
canvas.addEventListener('mouseout', (e) => {
  if (isDrawing) {
    draw(e);
    firstSizeData = canvas.toDataURL();
  }
  isDrawing = false;
});

window.addEventListener('beforeunload', () => {
  const num = tools.indexOf(activeTool);
  const colorPrevValue = getComputedStyle(colorPrev).backgroundColor;
  if (firstSizeData) localStorage.setItem('pixel-picture', firstSizeData);
  localStorage.setItem('canvas-width', canvas.width);
  localStorage.setItem('active-tool', num);
  localStorage.setItem('color', color);
  localStorage.setItem('size-switcher-value', sizeSwitcher.value);
  localStorage.setItem('color-previous', colorPrevValue);
});
