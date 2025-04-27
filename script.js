const container = document.getElementById("grid-container");

let cols = Math.floor(window.innerWidth / 20);
let rows = Math.floor(window.innerHeight / 20);
let dots = [];
let wave = 0;

// Generate grid dots
function generateGrid() {
  container.innerHTML = ""; // Clear DOM
  dots = []; // Clear array

  cols = Math.floor(window.innerWidth / 20);
  rows = Math.floor(window.innerHeight / 20);
  console.log("init Cols:", cols, "Init Rows:", rows);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      dot.dataset.x = x;
      dot.dataset.y = y;
      container.appendChild(dot);
      dots.push(dot);
    }
  }
}

// Diagonal wave animation

/****chatGPT's version (more ambient and fluid)****/
// function animateWave() {
//   for (let dot of dots) {
//     const x = parseInt(dot.dataset.x);
//     const y = parseInt(dot.dataset.y);
//     if ((x + y) % cols === wave % cols) {
//       console.log(dot.dataset.x, dot.dataset.y, (x + y) % cols, wave % cols);
//       dot.classList.add("glow");
//       setTimeout(() => dot.classList.remove("glow"), 300);
//     }
//   }
//   wave++;
//   requestAnimationFrame(animateWave);
// }

/****My version more intentional and controlled****/
function animateWave() {
  for (let dot of dots) {
    const x = parseInt(dot.dataset.x);
    const y = parseInt(dot.dataset.y);
    if (x + y === wave) {
      dot.classList.add("glow");
      setTimeout(() => dot.classList.remove("glow"), 400);
    }
  }
  wave >= cols + rows ? (wave = 0) : wave++;
  requestAnimationFrame(animateWave);
}

/*****Mouse hover effect on the matrix*****/
function mousehoverEffect(e) {
  const rect = container.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  const xIndex = Math.floor(mouseX / 20);
  const yIndex = Math.floor(mouseY / 20);

  for (let dot of dots) {
    const x = parseInt(dot.dataset.x);
    const y = parseInt(dot.dataset.y);
    const distance = Math.hypot(x - xIndex, y - yIndex);

    if (distance < 1) {
      // You can tweak this radius
      dot.classList.add("glow");
      setTimeout(() => dot.classList.remove("glow"), 300);
    }
  }
}

/*****Wave on Reload*****/
function crissCrossWave() {
  for (let col = 0; col < cols; col++) {
    setTimeout(() => {
      for (let dot of dots) {
        const x = parseInt(dot.dataset.x);
        if (x === col) {
          dot.classList.add("glow");
          setTimeout(() => dot.classList.remove("glow"), 300);
        }
      }
    }, col * 100); // delay increases per column
  }

  for (let row = 0; row < rows; row++) {
    setTimeout(() => {
      for (let dot of dots) {
        const y = parseInt(dot.dataset.y);
        if (y === row) {
          dot.classList.add("glow");
          setTimeout(() => dot.classList.remove("glow"), 300);
        }
      }
    }, row * 100); // delay increases per row
  }
}

/*****Twinkling effect*****/
function twinkleEffect() {
  for (let dot of dots) {
    const randomCol = Math.trunc(Math.random() * cols);
    const randomRow = Math.trunc(Math.random() * rows);
    if (
      randomCol === parseInt(dot.dataset.x) &&
      randomRow === parseInt(dot.dataset.y)
    ) {
      dot.classList.add("glow");
      setTimeout(() => dot.classList.remove("glow"), 400);
    }
  }
}

function handleHover(e) {
  const target = e.target;
  if (!target.classList.contains("dot")) return;

  const xCenter = parseInt(target.dataset.x);
  const yCenter = parseInt(target.dataset.y);

  const maxDistance = Math.hypot(cols, rows); // Max radius

  for (let dot of dots) {
    const x = parseInt(dot.dataset.x);
    const y = parseInt(dot.dataset.y);

    const distance = Math.hypot(x - xCenter, y - yCenter);
    const delay = distance * 30; // Adjust ripple speed here

    setTimeout(() => {
      dot.classList.add("glow");
      setTimeout(() => dot.classList.remove("glow"), 300); // glow duration
    }, delay);
  }
}

// Water effect feature
function waterWave() {
  const centerX = Math.floor(cols / 2);
  const centerY = Math.floor(rows / 2);
  for (let dot of dots) {
    const dotX = parseInt(dot.dataset.x);
    const dotY = parseInt(dot.dataset.y);
    const distance = Math.hypot(dotX - centerX, dotY - centerY);

    if (distance > 10) {
      // Only glow dots outside this radius
      const waveDelay = distance * 50 + Math.sin(distance * 0.3) * 100;
      setTimeout(() => {
        dot.classList.add("glow");
        setTimeout(() => dot.classList.remove("glow"), 600);
      }, waveDelay);
    }
  }
}

// Find center dot and glow
const centerX = Math.floor(cols / 2);
const centerY = Math.floor(rows / 2);
function glowCenterDot() {
  for (let dot of dots) {
    if (
      parseInt(dot.dataset.x) === centerX &&
      parseInt(dot.dataset.y) === centerY
    ) {
      dot.classList.add("glow");
    }
  }
}

// --- Eye drawing functions ---
let eyeSpacing = 5; // Space between eyes
// let leftPupilPositioningX = 5;
// let leftPupilPositioningY = 0;
// let rightPupilPositioningX = 5;
// let rightPupilPositioningY= 0;

function getEyeCoordsShut() {
  return {
    // Left
    coords1: [centerX - eyeSpacing, centerY],
    coords2: [centerX - eyeSpacing - 1, centerY + 1],
    coords3: [centerX - eyeSpacing - 2, centerY + 1],
    coords4: [centerX - eyeSpacing - 3, centerY + 2],
    coords5: [centerX - eyeSpacing - 4, centerY + 2],
    coords6: [centerX - eyeSpacing - 5, centerY + 2],
    coords7: [centerX - eyeSpacing - 6, centerY + 2],
    coords8: [centerX - eyeSpacing - 7, centerY + 2],
    coords9: [centerX - eyeSpacing - 8, centerY + 2],
    coords10: [centerX - eyeSpacing - 9, centerY + 2],
    coords11: [centerX - eyeSpacing - 10, centerY + 1],
    coords12: [centerX - eyeSpacing - 11, centerY + 1],
    coords13: [centerX - eyeSpacing - 12, centerY],

    // Left brows
    coords14: [centerX - eyeSpacing - 3, centerY + 3],
    coords15: [centerX - eyeSpacing - 5, centerY + 3],
    coords16: [centerX - eyeSpacing - 7, centerY + 3],
    coords17: [centerX - eyeSpacing - 9, centerY + 3],
    coords18: [centerX - eyeSpacing - 2, centerY + 4],
    coords19: [centerX - eyeSpacing - 5, centerY + 4],
    coords20: [centerX - eyeSpacing - 7, centerY + 4],
    coords21: [centerX - eyeSpacing - 10, centerY + 4],

    // Right
    coords22: [centerX + eyeSpacing, centerY],
    coords23: [centerX + eyeSpacing + 1, centerY + 1],
    coords24: [centerX + eyeSpacing + 2, centerY + 1],
    coords25: [centerX + eyeSpacing + 3, centerY + 2],
    coords26: [centerX + eyeSpacing + 4, centerY + 2],
    coords27: [centerX + eyeSpacing + 5, centerY + 2],
    coords28: [centerX + eyeSpacing + 6, centerY + 2],
    coords29: [centerX + eyeSpacing + 7, centerY + 2],
    coords30: [centerX + eyeSpacing + 8, centerY + 2],
    coords31: [centerX + eyeSpacing + 9, centerY + 2],
    coords32: [centerX + eyeSpacing + 10, centerY + 1],
    coords33: [centerX + eyeSpacing + 11, centerY + 1],
    coords34: [centerX + eyeSpacing + 12, centerY],

    // Right brows
    coords35: [centerX + eyeSpacing + 3, centerY + 3],
    coords36: [centerX + eyeSpacing + 5, centerY + 3],
    coords37: [centerX + eyeSpacing + 7, centerY + 3],
    coords38: [centerX + eyeSpacing + 9, centerY + 3],
    coords39: [centerX + eyeSpacing + 2, centerY + 4],
    coords40: [centerX + eyeSpacing + 5, centerY + 4],
    coords41: [centerX + eyeSpacing + 7, centerY + 4],
    coords42: [centerX + eyeSpacing + 10, centerY + 4],
  };
}

function getEyeCoordsSemiShut() {
  return {
    // Left
    coords1: [centerX - eyeSpacing, centerY],
    coords2: [centerX - eyeSpacing - 1, centerY - 1],
    coords3: [centerX - eyeSpacing - 2, centerY - 1],
    coords4: [centerX - eyeSpacing - 3, centerY - 1],
    coords5: [centerX - eyeSpacing - 4, centerY - 1],
    coords6: [centerX - eyeSpacing - 5, centerY - 1],
    coords7: [centerX - eyeSpacing - 6, centerY - 1],
    coords8: [centerX - eyeSpacing - 7, centerY - 1],
    coords9: [centerX - eyeSpacing - 8, centerY - 1],
    coords10: [centerX - eyeSpacing - 9, centerY - 1],
    coords11: [centerX - eyeSpacing - 10, centerY - 1],
    coords12: [centerX - eyeSpacing - 11, centerY - 1],
    coords13: [centerX - eyeSpacing - 12, centerY],
    coords14: [centerX - eyeSpacing - 1, centerY + 1],
    coords15: [centerX - eyeSpacing - 2, centerY + 1],
    coords16: [centerX - eyeSpacing - 3, centerY + 1],
    coords17: [centerX - eyeSpacing - 5, centerY + 1],
    coords18: [centerX - eyeSpacing - 4, centerY + 1],
    coords19: [centerX - eyeSpacing - 6, centerY + 1],
    coords20: [centerX - eyeSpacing - 7, centerY + 1],
    coords21: [centerX - eyeSpacing - 8, centerY + 1],
    coords22: [centerX - eyeSpacing - 9, centerY + 1],
    coords23: [centerX - eyeSpacing - 10, centerY + 1],
    coords24: [centerX - eyeSpacing - 11, centerY + 1],

    // Right
    coords25: [centerX + eyeSpacing, centerY],
    coords26: [centerX + eyeSpacing + 1, centerY - 1],
    coords27: [centerX + eyeSpacing + 2, centerY - 1],
    coords28: [centerX + eyeSpacing + 3, centerY - 1],
    coords29: [centerX + eyeSpacing + 4, centerY - 1],
    coords30: [centerX + eyeSpacing + 5, centerY - 1],
    coords31: [centerX + eyeSpacing + 6, centerY - 1],
    coords32: [centerX + eyeSpacing + 7, centerY - 1],
    coords33: [centerX + eyeSpacing + 8, centerY - 1],
    coords34: [centerX + eyeSpacing + 9, centerY - 1],
    coords35: [centerX + eyeSpacing + 10, centerY - 1],
    coords36: [centerX + eyeSpacing + 11, centerY - 1],
    coords37: [centerX + eyeSpacing + 12, centerY],
    coords38: [centerX + eyeSpacing + 1, centerY + 1],
    coords39: [centerX + eyeSpacing + 2, centerY + 1],
    coords40: [centerX + eyeSpacing + 3, centerY + 1],
    coords41: [centerX + eyeSpacing + 5, centerY + 1],
    coords42: [centerX + eyeSpacing + 4, centerY + 1],
    coords43: [centerX + eyeSpacing + 6, centerY + 1],
    coords44: [centerX + eyeSpacing + 7, centerY + 1],
    coords45: [centerX + eyeSpacing + 8, centerY + 1],
    coords46: [centerX + eyeSpacing + 9, centerY + 1],
    coords47: [centerX + eyeSpacing + 10, centerY + 1],
    coords48: [centerX + eyeSpacing + 11, centerY + 1],
  };
}

function getEyeCoordsOpening() {
  return {
    // Left
    coords1: [centerX - eyeSpacing, centerY],
    coords2: [centerX - eyeSpacing - 1, centerY - 1],
    coords3: [centerX - eyeSpacing - 2, centerY - 1],
    coords4: [centerX - eyeSpacing - 3, centerY - 2],
    coords5: [centerX - eyeSpacing - 4, centerY - 2],
    coords6: [centerX - eyeSpacing - 5, centerY - 2],
    coords7: [centerX - eyeSpacing - 6, centerY - 2],
    coords8: [centerX - eyeSpacing - 7, centerY - 2],
    coords9: [centerX - eyeSpacing - 8, centerY - 2],
    coords10: [centerX - eyeSpacing - 9, centerY - 2],
    coords11: [centerX - eyeSpacing - 10, centerY - 1],
    coords12: [centerX - eyeSpacing - 12, centerY - 1],
    coords13: [centerX - eyeSpacing - 12, centerY],
    coords14: [centerX - eyeSpacing - 1, centerY + 1],
    coords15: [centerX - eyeSpacing - 2, centerY + 1],
    coords16: [centerX - eyeSpacing - 3, centerY + 2],
    coords17: [centerX - eyeSpacing - 5, centerY + 2],
    coords18: [centerX - eyeSpacing - 4, centerY + 2],
    coords19: [centerX - eyeSpacing - 6, centerY + 2],
    coords20: [centerX - eyeSpacing - 7, centerY + 2],
    coords21: [centerX - eyeSpacing - 8, centerY + 2],
    coords22: [centerX - eyeSpacing - 9, centerY + 2],
    coords23: [centerX - eyeSpacing - 10, centerY + 1],
    coords24: [centerX - eyeSpacing - 11, centerY + 1],

    // Right
    coords25: [centerX + eyeSpacing, centerY],
    coords26: [centerX + eyeSpacing + 1, centerY - 1],
    coords27: [centerX + eyeSpacing + 2, centerY - 1],
    coords28: [centerX + eyeSpacing + 3, centerY - 2],
    coords29: [centerX + eyeSpacing + 4, centerY - 2],
    coords30: [centerX + eyeSpacing + 5, centerY - 2],
    coords31: [centerX + eyeSpacing + 6, centerY - 2],
    coords32: [centerX + eyeSpacing + 7, centerY - 2],
    coords33: [centerX + eyeSpacing + 8, centerY - 2],
    coords34: [centerX + eyeSpacing + 9, centerY - 2],
    coords35: [centerX + eyeSpacing + 10, centerY - 1],
    coords36: [centerX + eyeSpacing + 11, centerY - 1],
    coords37: [centerX + eyeSpacing + 12, centerY],
    coords38: [centerX + eyeSpacing + 1, centerY + 1],
    coords39: [centerX + eyeSpacing + 2, centerY + 1],
    coords40: [centerX + eyeSpacing + 3, centerY + 2],
    coords41: [centerX + eyeSpacing + 5, centerY + 2],
    coords42: [centerX + eyeSpacing + 4, centerY + 2],
    coords43: [centerX + eyeSpacing + 6, centerY + 2],
    coords44: [centerX + eyeSpacing + 7, centerY + 2],
    coords45: [centerX + eyeSpacing + 8, centerY + 2],
    coords46: [centerX + eyeSpacing + 9, centerY + 2],
    coords47: [centerX + eyeSpacing + 10, centerY + 1],
    coords48: [centerX + eyeSpacing + 11, centerY + 1],
  };
}

function getEyeCoordsOpened(movX, movY) {
  return {
    // Left
    coords1: [centerX - eyeSpacing, centerY],
    coords2: [centerX - eyeSpacing - 1, centerY - 1],
    coords3: [centerX - eyeSpacing - 2, centerY - 2],
    coords4: [centerX - eyeSpacing - 3, centerY - 2],
    coords5: [centerX - eyeSpacing - 4, centerY - 3],
    coords6: [centerX - eyeSpacing - 5, centerY - 3],
    coords7: [centerX - eyeSpacing - 6, centerY - 3],
    coords8: [centerX - eyeSpacing - 7, centerY - 3],
    coords9: [centerX - eyeSpacing - 8, centerY - 3],
    coords10: [centerX - eyeSpacing - 9, centerY - 2],
    coords11: [centerX - eyeSpacing - 10, centerY - 2],
    coords12: [centerX - eyeSpacing - 11, centerY - 1],
    coords13: [centerX - eyeSpacing - 12, centerY],
    coords14: [centerX - eyeSpacing - 1, centerY + 1],
    coords15: [centerX - eyeSpacing - 2, centerY + 2],
    coords16: [centerX - eyeSpacing - 3, centerY + 2],
    coords17: [centerX - eyeSpacing - 5, centerY + 3],
    coords18: [centerX - eyeSpacing - 4, centerY + 3],
    coords19: [centerX - eyeSpacing - 6, centerY + 3],
    coords20: [centerX - eyeSpacing - 7, centerY + 3],
    coords21: [centerX - eyeSpacing - 8, centerY + 3],
    coords22: [centerX - eyeSpacing - 9, centerY + 2],
    coords23: [centerX - eyeSpacing - 10, centerY + 2],
    coords24: [centerX - eyeSpacing - 11, centerY + 1],

    // Right
    coords25: [centerX + eyeSpacing, centerY],
    coords26: [centerX + eyeSpacing + 1, centerY - 1],
    coords27: [centerX + eyeSpacing + 2, centerY - 2],
    coords28: [centerX + eyeSpacing + 3, centerY - 2],
    coords29: [centerX + eyeSpacing + 4, centerY - 3],
    coords30: [centerX + eyeSpacing + 5, centerY - 3],
    coords31: [centerX + eyeSpacing + 6, centerY - 3],
    coords32: [centerX + eyeSpacing + 7, centerY - 3],
    coords33: [centerX + eyeSpacing + 8, centerY - 3],
    coords34: [centerX + eyeSpacing + 9, centerY - 2],
    coords35: [centerX + eyeSpacing + 10, centerY - 2],
    coords36: [centerX + eyeSpacing + 11, centerY - 1],
    coords37: [centerX + eyeSpacing + 12, centerY],
    coords38: [centerX + eyeSpacing + 1, centerY + 1],
    coords39: [centerX + eyeSpacing + 2, centerY + 2],
    coords40: [centerX + eyeSpacing + 3, centerY + 2],
    coords41: [centerX + eyeSpacing + 5, centerY + 3],
    coords42: [centerX + eyeSpacing + 4, centerY + 3],
    coords43: [centerX + eyeSpacing + 6, centerY + 3],
    coords44: [centerX + eyeSpacing + 7, centerY + 3],
    coords45: [centerX + eyeSpacing + 8, centerY + 3],
    coords46: [centerX + eyeSpacing + 9, centerY + 2],
    coords47: [centerX + eyeSpacing + 10, centerY + 2],
    coords48: [centerX + eyeSpacing + 11, centerY + 1],

    // Left brows
    leftBrow: [
      [centerX - eyeSpacing - 1, centerY - 5],
      [centerX - eyeSpacing - 3, centerY - 5],
      [centerX - eyeSpacing - 5, centerY - 5],
      [centerX - eyeSpacing - 7, centerY - 5],
      [centerX - eyeSpacing - 9, centerY - 5],
      [centerX - eyeSpacing - 11, centerY - 5],
      [centerX - eyeSpacing, centerY - 6],
      [centerX - eyeSpacing - 2, centerY - 6],
      [centerX - eyeSpacing - 5, centerY - 6],
      [centerX - eyeSpacing - 7, centerY - 6],
      [centerX - eyeSpacing - 10, centerY - 6],
      [centerX - eyeSpacing - 12, centerY - 6],
    ],

    // Left pupil
    leftPupil: [
      [centerX - eyeSpacing + movX - 5, centerY - movY],
      [centerX - eyeSpacing + movX - 5, centerY - movY - 1],
      [centerX - eyeSpacing + movX - 6, centerY - movY - 1],
      [centerX - eyeSpacing + movX - 7, centerY - movY - 1],
      [centerX - eyeSpacing + movX - 7, centerY - movY],
      [centerX - eyeSpacing + movX - 5, centerY - movY + 1],
      [centerX - eyeSpacing + movX - 6, centerY - movY + 1],
      [centerX - eyeSpacing + movX - 7, centerY - movY + 1],
    ],

    // Right brows
    rightBrow: [
      [centerX + eyeSpacing + 1, centerY - 5],
      [centerX + eyeSpacing + 3, centerY - 5],
      [centerX + eyeSpacing + 5, centerY - 5],
      [centerX + eyeSpacing + 7, centerY - 5],
      [centerX + eyeSpacing + 9, centerY - 5],
      [centerX + eyeSpacing + 11, centerY - 5],
      [centerX + eyeSpacing, centerY - 6],
      [centerX + eyeSpacing + 2, centerY - 6],
      [centerX + eyeSpacing + 4, centerY - 6],
      [centerX + eyeSpacing + 6, centerY - 6],
      [centerX + eyeSpacing + 10, centerY - 6],
      [centerX + eyeSpacing + 12, centerY - 6],
    ],

    // Right pupil
    rightPupil: [
      [centerX + eyeSpacing + movX + 5, centerY - movY],
      [centerX + eyeSpacing + movX + 5, centerY - movY - 1],
      [centerX + eyeSpacing + movX + 6, centerY - movY - 1],
      [centerX + eyeSpacing + movX + 7, centerY - movY - 1],
      [centerX + eyeSpacing + movX + 7, centerY - movY],
      [centerX + eyeSpacing + movX + 5, centerY - movY + 1],
      [centerX + eyeSpacing + movX + 6, centerY - movY + 1],
      [centerX + eyeSpacing + movX + 7, centerY - movY + 1],
    ],
  };
}

// --- Pupil position state must be set before using it in
let movX = 0; // Pupil movement in X direction
let movY = 0; // Pupil movement in Y direction

// now build your eye‐frame lookup tables
const EyeCoordsShut = Object.values(getEyeCoordsShut());
const EyeCoordsSemiShut = Object.values(getEyeCoordsSemiShut());
const EyeCoordsOpening = Object.values(getEyeCoordsOpening());
// get all values on EyeCoordsOpened except the left and right pupils and brows
function EyeKeysOpened() {
  return Object.keys(getEyeCoordsOpened(movX, movY)).filter(
    (key) =>
      key !== "leftBrow" &&
      key !== "rightBrow" &&
      key !== "leftPupil" &&
      key !== "rightPupil"
  );
}
const EyeCoordsLeftBrows = Object.values(
  getEyeCoordsOpened(movX, movY).leftBrow
);
const EyeCoordsRightBrows = Object.values(
  getEyeCoordsOpened(movX, movY).rightBrow
);
const EyeCoordsLeftPupil = Object.values(
  getEyeCoordsOpened(movX, movY).leftPupil
);
const EyeCoordsRightPupil = Object.values(
  getEyeCoordsOpened(movX, movY).rightPupil
);
let pupilCoords = [...EyeCoordsLeftPupil, ...EyeCoordsRightPupil];
let EyeCoordsBrows = [...EyeCoordsLeftBrows, ...EyeCoordsRightBrows];
let EyeCoordsOpenedNoPupils = [];
for (let coord of EyeKeysOpened()) {
  EyeCoordsOpenedNoPupils.push(getEyeCoordsOpened(movX, movY)[coord]);
}
let EyeCoordsOpened = [
  ...EyeCoordsOpenedNoPupils,
  ...pupilCoords,
  ...EyeCoordsBrows,
]; // Initialize with pupil and brow coordinates

console.log(EyeKeysOpened()); // Log the keys of opened eye coordinates

console.log(EyeCoordsOpened); // Log the opened eye coordinates

let randomPupilMov = false;

// --- Pupil movement ---
function getPupilMovement(callback) {
  randomPupilMov = true;
  let prevX = movX;
  let prevY = movY;

  function getNextMove(currentX, currentY) {
    const randomness = Math.random();
    let deltaX =
      randomness < 0.7
        ? Math.floor(Math.random() * 3) - 1
        : Math.floor(Math.random() * 5) - 2;
    let deltaY =
      randomness < 0.7
        ? Math.floor(Math.random() * 3) - 1
        : Math.floor(Math.random() * 5) - 2;

    let newX = Math.max(-3, Math.min(3, currentX + deltaX));
    let newY = Math.max(-2, Math.min(2, currentY + deltaY));

    return [newX, newY];
  }

  const steps = 20;
  const stepDelay = 150; // Faster but smooth movement

  for (let mov = 0; mov < steps; mov++) {
    setTimeout(() => {
      // Remove previous pupil glow
      const EyeCoordsPrev = pupilCoords;

      for (let dot of dots) {
        const x = parseInt(dot.dataset.x);
        const y = parseInt(dot.dataset.y);
        for (let [fx, fy] of EyeCoordsPrev) {
          if (x === fx && y === fy) {
            dot.classList.remove("glow");
            break;
          }
        }
      }

      // Move pupil
      const [newX, newY] = getNextMove(prevX, prevY);
      movX = newX;
      movY = newY;

      pupilCoords = [
        ...getEyeCoordsOpened(movX, movY).leftPupil,
        ...getEyeCoordsOpened(movX, movY).rightPupil,
      ];

      // Add new pupil glow
      for (let dot of dots) {
        const x = parseInt(dot.dataset.x);
        const y = parseInt(dot.dataset.y);
        for (let [fx, fy] of pupilCoords) {
          if (x === fx && y === fy) {
            dot.classList.add("glow");
            break;
          }
        }

        for (let [fx, fy] of EyeCoordsOpenedNoPupils) {
          if (x === fx && y === fy) {
            dot.classList.add("glow");
            break;
          }
        }

        for (let [fx, fy] of EyeCoordsBrows) {
          if (x === fx && y === fy) {
            dot.classList.add("glow");
            break;
          }
        }
      }

      prevX = movX;
      prevY = movY;

      // After last move, clean up and callback
      if (mov === steps - 1) {
        for (let dot of dots) {
          pupilCoords = [
            ...getEyeCoordsOpened(prevX, prevY).leftPupil,
            ...getEyeCoordsOpened(prevX, prevY).rightPupil,
          ];
          const x = parseInt(dot.dataset.x);
          const y = parseInt(dot.dataset.y);
          for (let [fx, fy] of pupilCoords) {
            if (x === fx && y === fy) {
              dot.classList.remove("glow");
              break;
            }
          }

          for (let [fx, fy] of EyeCoordsOpenedNoPupils) {
            if (x === fx && y === fy) {
              dot.classList.add("glow");
              break;
            }
          }

          pupilCoords = [
            ...getEyeCoordsOpened(0, 0).leftPupil,
            ...getEyeCoordsOpened(0, 0).rightPupil,
          ];

          for (let [fx, fy] of pupilCoords) {
            if (x === fx && y === fy) {
              dot.classList.add("glow");
              break;
            }
          }
        }

        if (callback) callback(); // Trigger blinking
      }
    }, mov * stepDelay);
  }
}

// --- Eye drawing stages ---
function drawMatrixEyes() {
  const closed = 200;
  const semiClosed = 2000;
  const opening = 2100;
  const opened = 2200;

  console.log(); // 42

  function getEyesClosed(start, end, dot) {
    for (let [fx, fy] of EyeCoordsShut) {
      if (parseInt(dot.dataset.x) === fx && parseInt(dot.dataset.y) === fy) {
        setTimeout(() => dot.classList.add("glow-soft"), start);
        setTimeout(() => dot.classList.remove("glow-soft"), end);
        break;
      }
    }
  }

  function getEyesSemiShut(start, end, dot) {
    for (let [fx, fy] of EyeCoordsSemiShut) {
      if (parseInt(dot.dataset.x) === fx && parseInt(dot.dataset.y) === fy) {
        setTimeout(() => dot.classList.add("glow-soft"), start);
        setTimeout(() => dot.classList.remove("glow-soft"), end);
        break;
      }
    }
  }

  function getEyesOpening(start, end, dot) {
    for (let [fx, fy] of EyeCoordsOpening) {
      if (parseInt(dot.dataset.x) === fx && parseInt(dot.dataset.y) === fy) {
        setTimeout(() => dot.classList.add("glow-medium"), start);
        setTimeout(() => dot.classList.remove("glow-medium"), end);
        break;
      }
    }
  }

  function getEyesOpened(start, dot) {
    const x = parseInt(dot.dataset.x);
    const y = parseInt(dot.dataset.y);

    for (let [fx, fy] of EyeCoordsOpened) {
      if (x === fx && y === fy) {
        setTimeout(() => dot.classList.add("glow"), start);
        break;
      }
    }
  }

  function animateEyesOpening() {
    for (let dot of dots) {
      getEyesClosed(0, semiClosed, dot);
      getEyesSemiShut(semiClosed, opening, dot);
      getEyesOpening(opening, opened, dot);
      getEyesOpened(opened, dot);
    }
  }

  function animateEyesBlinking() {
    for (let dot of dots) {
      // --- CLEAR ALL GLOWS before starting blink animation ---
      const x = parseInt(dot.dataset.x);
      const y = parseInt(dot.dataset.y);
      for (let [fx, fy] of EyeCoordsOpened) {
        if (x === fx && y === fy) {
          dot.classList.remove("glow");
          break;
        }
      }

      // START CLOSING IMMEDIATELY
      getEyesOpening(200, 400, dot);
      getEyesSemiShut(400, 600, dot);
      getEyesClosed(600, 800, dot);
      getEyesSemiShut(800, 1000, dot);
      getEyesOpening(1000, 1200, dot);
      getEyesOpened(1200, dot); // Finally open again
    }
  }

  // Start the sequence
  animateEyesOpening();

  // After fully open, start pupil movement, THEN blink once
  setTimeout(() => {
    getPupilMovement(() => {
      setTimeout(() => {
        animateEyesBlinking();
      }, 500);
    });
  }, opened + 500);
}

/*****Calling of features*****/
generateGrid(); // Initial grid setup

// animateWave(); // Start loop once// Rebuild grid and reset wave on resize

window.addEventListener("resize", () => {
  generateGrid();
  wave = 0;
});

container.addEventListener("mousemove", mousehoverEffect);

window.addEventListener("load", () => {
  crissCrossWave(); // Start the vertical wave on page load
});

setInterval(twinkleEffect, 100); // Twinkle every second

waterWave(); // Start the wave effect on page load

glowCenterDot(); // Start the glow effect on page load

drawMatrixEyes(); // Start the eye animation
