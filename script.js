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

window.addEventListener("resize", () => {
  generateGrid();
  wave = 0;
});

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
function centerOutwardWave() {
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

// -------------------- Eye animation --------------------
let eyeSpacing = 6; // Space between eyes

function getEyeCoordsShut() {
  return {
    // Left
    leftEye: [
      [centerX - eyeSpacing, centerY],
      [centerX - eyeSpacing - 1, centerY + 1],
      [centerX - eyeSpacing - 2, centerY + 1],
      [centerX - eyeSpacing - 3, centerY + 2],
      [centerX - eyeSpacing - 4, centerY + 2],
      [centerX - eyeSpacing - 5, centerY + 2],
      [centerX - eyeSpacing - 6, centerY + 2],
      [centerX - eyeSpacing - 7, centerY + 2],
      [centerX - eyeSpacing - 8, centerY + 2],
      [centerX - eyeSpacing - 9, centerY + 2],
      [centerX - eyeSpacing - 10, centerY + 1],
      [centerX - eyeSpacing - 11, centerY + 1],
      [centerX - eyeSpacing - 12, centerY],
    ],

    // Left brows
    leftBrow: [
      [centerX - eyeSpacing - 3, centerY + 3],
      [centerX - eyeSpacing - 5, centerY + 3],
      [centerX - eyeSpacing - 7, centerY + 3],
      [centerX - eyeSpacing - 9, centerY + 3],
      [centerX - eyeSpacing - 2, centerY + 4],
      [centerX - eyeSpacing - 5, centerY + 4],
      [centerX - eyeSpacing - 7, centerY + 4],
      [centerX - eyeSpacing - 10, centerY + 4],
    ],

    // Right
    rightEye: [
      [centerX + eyeSpacing, centerY],
      [centerX + eyeSpacing + 1, centerY + 1],
      [centerX + eyeSpacing + 2, centerY + 1],
      [centerX + eyeSpacing + 3, centerY + 2],
      [centerX + eyeSpacing + 4, centerY + 2],
      [centerX + eyeSpacing + 5, centerY + 2],
      [centerX + eyeSpacing + 6, centerY + 2],
      [centerX + eyeSpacing + 7, centerY + 2],
      [centerX + eyeSpacing + 8, centerY + 2],
      [centerX + eyeSpacing + 9, centerY + 2],
      [centerX + eyeSpacing + 10, centerY + 1],
      [centerX + eyeSpacing + 11, centerY + 1],
      [centerX + eyeSpacing + 12, centerY],
    ],

    // Right brows
    rightBrow: [
      [centerX + eyeSpacing + 3, centerY + 3],
      [centerX + eyeSpacing + 5, centerY + 3],
      [centerX + eyeSpacing + 7, centerY + 3],
      [centerX + eyeSpacing + 9, centerY + 3],
      [centerX + eyeSpacing + 2, centerY + 4],
      [centerX + eyeSpacing + 5, centerY + 4],
      [centerX + eyeSpacing + 7, centerY + 4],
      [centerX + eyeSpacing + 10, centerY + 4],
    ],
  };
}

function getEyeCoordsSemiShut() {
  return {
    // Left
    leftEye: [
      [centerX - eyeSpacing, centerY],
      [centerX - eyeSpacing - 1, centerY - 1],
      [centerX - eyeSpacing - 2, centerY - 1],
      [centerX - eyeSpacing - 3, centerY - 1],
      [centerX - eyeSpacing - 4, centerY - 1],
      [centerX - eyeSpacing - 5, centerY - 1],
      [centerX - eyeSpacing - 6, centerY - 1],
      [centerX - eyeSpacing - 7, centerY - 1],
      [centerX - eyeSpacing - 8, centerY - 1],
      [centerX - eyeSpacing - 9, centerY - 1],
      [centerX - eyeSpacing - 10, centerY - 1],
      [centerX - eyeSpacing - 11, centerY - 1],
      [centerX - eyeSpacing - 12, centerY],
      [centerX - eyeSpacing - 1, centerY + 1],
      [centerX - eyeSpacing - 2, centerY + 1],
      [centerX - eyeSpacing - 3, centerY + 1],
      [centerX - eyeSpacing - 5, centerY + 1],
      [centerX - eyeSpacing - 4, centerY + 1],
      [centerX - eyeSpacing - 6, centerY + 1],
      [centerX - eyeSpacing - 7, centerY + 1],
      [centerX - eyeSpacing - 8, centerY + 1],
      [centerX - eyeSpacing - 9, centerY + 1],
      [centerX - eyeSpacing - 10, centerY + 1],
      [centerX - eyeSpacing - 11, centerY + 1],
    ],

    // Right
    rightEye: [
      [centerX + eyeSpacing, centerY],
      [centerX + eyeSpacing + 1, centerY - 1],
      [centerX + eyeSpacing + 2, centerY - 1],
      [centerX + eyeSpacing + 3, centerY - 1],
      [centerX + eyeSpacing + 4, centerY - 1],
      [centerX + eyeSpacing + 5, centerY - 1],
      [centerX + eyeSpacing + 6, centerY - 1],
      [centerX + eyeSpacing + 7, centerY - 1],
      [centerX + eyeSpacing + 8, centerY - 1],
      [centerX + eyeSpacing + 9, centerY - 1],
      [centerX + eyeSpacing + 10, centerY - 1],
      [centerX + eyeSpacing + 11, centerY - 1],
      [centerX + eyeSpacing + 12, centerY],
      [centerX + eyeSpacing + 1, centerY + 1],
      [centerX + eyeSpacing + 2, centerY + 1],
      [centerX + eyeSpacing + 3, centerY + 1],
      [centerX + eyeSpacing + 5, centerY + 1],
      [centerX + eyeSpacing + 4, centerY + 1],
      [centerX + eyeSpacing + 6, centerY + 1],
      [centerX + eyeSpacing + 7, centerY + 1],
      [centerX + eyeSpacing + 8, centerY + 1],
      [centerX + eyeSpacing + 9, centerY + 1],
      [centerX + eyeSpacing + 10, centerY + 1],
      [centerX + eyeSpacing + 11, centerY + 1],
    ],
  };
}

function getEyeCoordsOpening() {
  return {
    // Left
    leftEye: [
      [centerX - eyeSpacing, centerY],
      [centerX - eyeSpacing - 1, centerY - 1],
      [centerX - eyeSpacing - 2, centerY - 1],
      [centerX - eyeSpacing - 3, centerY - 2],
      [centerX - eyeSpacing - 4, centerY - 2],
      [centerX - eyeSpacing - 5, centerY - 2],
      [centerX - eyeSpacing - 6, centerY - 2],
      [centerX - eyeSpacing - 7, centerY - 2],
      [centerX - eyeSpacing - 8, centerY - 2],
      [centerX - eyeSpacing - 9, centerY - 2],
      [centerX - eyeSpacing - 10, centerY - 1],
      [centerX - eyeSpacing - 12, centerY - 1],
      [centerX - eyeSpacing - 12, centerY],
      [centerX - eyeSpacing - 1, centerY + 1],
      [centerX - eyeSpacing - 2, centerY + 1],
      [centerX - eyeSpacing - 3, centerY + 2],
      [centerX - eyeSpacing - 5, centerY + 2],
      [centerX - eyeSpacing - 4, centerY + 2],
      [centerX - eyeSpacing - 6, centerY + 2],
      [centerX - eyeSpacing - 7, centerY + 2],
      [centerX - eyeSpacing - 8, centerY + 2],
      [centerX - eyeSpacing - 9, centerY + 2],
      [centerX - eyeSpacing - 10, centerY + 1],
      [centerX - eyeSpacing - 11, centerY + 1],
    ],

    // Right
    rightEye: [
      [centerX + eyeSpacing, centerY],
      [centerX + eyeSpacing + 1, centerY - 1],
      [centerX + eyeSpacing + 2, centerY - 1],
      [centerX + eyeSpacing + 3, centerY - 2],
      [centerX + eyeSpacing + 4, centerY - 2],
      [centerX + eyeSpacing + 5, centerY - 2],
      [centerX + eyeSpacing + 6, centerY - 2],
      [centerX + eyeSpacing + 7, centerY - 2],
      [centerX + eyeSpacing + 8, centerY - 2],
      [centerX + eyeSpacing + 9, centerY - 2],
      [centerX + eyeSpacing + 10, centerY - 1],
      [centerX + eyeSpacing + 11, centerY - 1],
      [centerX + eyeSpacing + 12, centerY],
      [centerX + eyeSpacing + 1, centerY + 1],
      [centerX + eyeSpacing + 2, centerY + 1],
      [centerX + eyeSpacing + 3, centerY + 2],
      [centerX + eyeSpacing + 5, centerY + 2],
      [centerX + eyeSpacing + 4, centerY + 2],
      [centerX + eyeSpacing + 6, centerY + 2],
      [centerX + eyeSpacing + 7, centerY + 2],
      [centerX + eyeSpacing + 8, centerY + 2],
      [centerX + eyeSpacing + 9, centerY + 2],
      [centerX + eyeSpacing + 10, centerY + 1],
      [centerX + eyeSpacing + 11, centerY + 1],
    ],
  };
}

function getEyeCoordsOpened(movX, movY) {
  return {
    // Left
    leftEye: [
      [centerX - eyeSpacing, centerY],
      [centerX - eyeSpacing - 1, centerY - 1],
      [centerX - eyeSpacing - 2, centerY - 2],
      [centerX - eyeSpacing - 3, centerY - 2],
      [centerX - eyeSpacing - 4, centerY - 3],
      [centerX - eyeSpacing - 5, centerY - 3],
      [centerX - eyeSpacing - 6, centerY - 3],
      [centerX - eyeSpacing - 7, centerY - 3],
      [centerX - eyeSpacing - 8, centerY - 3],
      [centerX - eyeSpacing - 9, centerY - 2],
      [centerX - eyeSpacing - 10, centerY - 2],
      [centerX - eyeSpacing - 11, centerY - 1],
      [centerX - eyeSpacing - 12, centerY],
      [centerX - eyeSpacing - 1, centerY + 1],
      [centerX - eyeSpacing - 2, centerY + 2],
      [centerX - eyeSpacing - 3, centerY + 2],
      [centerX - eyeSpacing - 5, centerY + 3],
      [centerX - eyeSpacing - 4, centerY + 3],
      [centerX - eyeSpacing - 6, centerY + 3],
      [centerX - eyeSpacing - 7, centerY + 3],
      [centerX - eyeSpacing - 8, centerY + 3],
      [centerX - eyeSpacing - 9, centerY + 2],
      [centerX - eyeSpacing - 10, centerY + 2],
      [centerX - eyeSpacing - 11, centerY + 1],
    ],

    // Right
    rightEye: [
      [centerX + eyeSpacing, centerY],
      [centerX + eyeSpacing + 1, centerY - 1],
      [centerX + eyeSpacing + 2, centerY - 2],
      [centerX + eyeSpacing + 3, centerY - 2],
      [centerX + eyeSpacing + 4, centerY - 3],
      [centerX + eyeSpacing + 5, centerY - 3],
      [centerX + eyeSpacing + 6, centerY - 3],
      [centerX + eyeSpacing + 7, centerY - 3],
      [centerX + eyeSpacing + 8, centerY - 3],
      [centerX + eyeSpacing + 9, centerY - 2],
      [centerX + eyeSpacing + 10, centerY - 2],
      [centerX + eyeSpacing + 11, centerY - 1],
      [centerX + eyeSpacing + 12, centerY],
      [centerX + eyeSpacing + 1, centerY + 1],
      [centerX + eyeSpacing + 2, centerY + 2],
      [centerX + eyeSpacing + 3, centerY + 2],
      [centerX + eyeSpacing + 5, centerY + 3],
      [centerX + eyeSpacing + 4, centerY + 3],
      [centerX + eyeSpacing + 6, centerY + 3],
      [centerX + eyeSpacing + 7, centerY + 3],
      [centerX + eyeSpacing + 8, centerY + 3],
      [centerX + eyeSpacing + 9, centerY + 2],
      [centerX + eyeSpacing + 10, centerY + 2],
      [centerX + eyeSpacing + 11, centerY + 1],
    ],

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

let movX = 0; // Pupil movement in X direction
let movY = 0; // Pupil movement in Y direction

// now build your eye‐frame lookup tables
const EyeCoordsShut = [
  ...getEyeCoordsShut().leftEye,
  ...getEyeCoordsShut().leftBrow,
  ...getEyeCoordsShut().rightEye,
  ...getEyeCoordsShut().rightBrow,
];
const EyeCoordsSemiShut = [
  ...getEyeCoordsSemiShut().leftEye,
  ...getEyeCoordsSemiShut().rightEye,
];
const EyeCoordsOpening = [
  ...getEyeCoordsOpening().leftEye,
  ...getEyeCoordsOpening().rightEye,
];
const EyeCoordsOpenedLeft = [
  ...getEyeCoordsOpened(movX, movY).leftEye,
  ...getEyeCoordsOpened(movX, movY).leftBrow,
  ...getEyeCoordsOpened(movX, movY).leftPupil,
];
const EyeCoordsOpenedRight = [
  ...getEyeCoordsOpened(movX, movY).rightEye,
  ...getEyeCoordsOpened(movX, movY).rightBrow,
  ...getEyeCoordsOpened(movX, movY).rightPupil,
];
const EyeOpenedLeftBrows = Object.values(
  getEyeCoordsOpened(movX, movY).leftBrow
);
const EyeOpenedRightBrows = Object.values(
  getEyeCoordsOpened(movX, movY).rightBrow
);
const EyeOpenedLeftPupil = Object.values(
  getEyeCoordsOpened(movX, movY).leftPupil
);
const EyeOpenedRightPupil = Object.values(
  getEyeCoordsOpened(movX, movY).rightPupil
);
let pupilCoords = [...EyeOpenedLeftPupil, ...EyeOpenedRightPupil];
let EyeCoordsBrows = [...EyeOpenedLeftBrows, ...EyeOpenedRightBrows];
let EyeCoordsOpenedNoPupils = [
  ...getEyeCoordsOpened(movX, movY).leftEye,
  ...getEyeCoordsOpened(movX, movY).rightEye,
  ...getEyeCoordsOpened(movX, movY).leftBrow,
  ...getEyeCoordsOpened(movX, movY).rightBrow,
]; // Initialize with pupil and brow coordinates
let EyeCoordsOpened = [
  ...EyeCoordsOpenedNoPupils,
  ...pupilCoords,
  ...EyeCoordsBrows,
];

// --- Pupil movement ---
function getPupilMovement(callback) {
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
  const semiClosed = 2000;
  const opening = 2100;
  const opened = 2200;

  // Light frame glow
  function renderImage(array, glowType, start, end, dot) {
    for (let [fx, fy] of array) {
      if (parseInt(dot.dataset.x) === fx && parseInt(dot.dataset.y) === fy) {
        if (start || start == 0)
          setTimeout(() => dot.classList.add(glowType), start);
        if (end) setTimeout(() => dot.classList.remove(glowType), end);
        if (start === undefined) dot.classList.remove(glowType);
        break;
      }
    }
  }

  console.log(); // 42

  function getEyesClosed(start, end, dot, eye) {
    if (eye === "left") {
      renderImage(EyeCoordsOpenedLeft, "glow", 0, start, dot); // 0 is the default value for start
      renderImage(EyeCoordsOpenedRight, "glow", start, undefined, dot);
      renderImage(
        [...getEyeCoordsShut().leftEye, ...getEyeCoordsShut().leftBrow],
        "glow",
        start,
        end,
        dot
      );
    } else if (eye === "right") {
      renderImage(EyeCoordsOpenedRight, "glow", 0, start, dot); // remove right side glow
      renderImage(EyeCoordsOpenedLeft, "glow", start, undefined, dot);
      renderImage(
        [...getEyeCoordsShut().rightEye, ...getEyeCoordsShut().rightBrow],
        "glow-soft",
        start,
        end,
        dot
      );
    } else {
      renderImage(EyeCoordsShut, "glow-soft", start, end, dot);
    }
  }

  function getEyesSemiShut(start, end, dot, eye) {
    if (eye === "left") {
      renderImage(EyeCoordsOpenedLeft, "glow", 0, start, dot); // 0 is the default value for start
      renderImage(EyeCoordsOpenedRight, "glow", start, undefined, dot);
      renderImage([...getEyeCoordsSemiShut().leftEye], "glow", start, end, dot);
    } else if (eye === "right") {
      renderImage(EyeCoordsOpenedRight, "glow", 0, start, dot); // remove right side glow
      renderImage(EyeCoordsOpenedLeft, "glow", start, undefined, dot);
      renderImage(
        [...getEyeCoordsSemiShut().rightEye],
        "glow-soft",
        start,
        end,
        dot
      );
    } else {
      renderImage(EyeCoordsSemiShut, "glow-soft", start, end, dot);
    }
  }

  function getEyesOpening(start, end, dot, eye) {
    if (eye === "left") {
      renderImage(EyeCoordsOpenedLeft, "glow", 0, start, dot); // 0 is the default value for start
      renderImage(EyeCoordsOpenedRight, "glow", start, undefined, dot);
      renderImage([...getEyeCoordsOpening().leftEye], "glow", start, end, dot);
    } else if (eye === "right") {
      renderImage(EyeCoordsOpenedRight, "glow", 0, start, dot); // remove right side glow
      renderImage(EyeCoordsOpenedLeft, "glow", start, undefined, dot);
      renderImage(
        [...getEyeCoordsOpening().rightEye],
        "glow-soft",
        start,
        end,
        dot
      );
    } else {
      renderImage(EyeCoordsOpening, "glow-medium", start, end, dot);
    }
  }

  function getEyesOpened(start, dot) {
    renderImage(EyeCoordsOpened, "glow", start, undefined, dot);
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
      renderImage(EyeCoordsOpened, "glow", undefined, undefined, dot); // If start and stop are undefined, remove glow

      // START CLOSING IMMEDIATELY
      getEyesOpening(200, 400, dot);
      getEyesSemiShut(400, 600, dot);
      getEyesClosed(600, 800, dot);
      getEyesSemiShut(800, 1000, dot);
      getEyesOpening(1000, 1200, dot);
      getEyesOpened(1200, dot); // Finally open again
    }
  }

  function animateEyeWinking(eye, duration) {
    for (let dot of dots) {
      renderImage(EyeCoordsOpened, "glow", undefined, undefined, dot); // If start and stop are undefined, remove glow

      // START CLOSING IMMEDIATELY
      getEyesOpening(200 + duration, 400 + duration, dot, eye);
      getEyesSemiShut(400 + duration, 600 + duration, dot, eye);
      getEyesClosed(600 + duration, 800 + duration, dot, eye);
      getEyesSemiShut(800 + duration, 1000 + duration, dot, eye);
      getEyesOpening(1000 + duration, 1200 + duration, dot, eye);
      getEyesOpened(1200 + duration, dot); // Finally open again
    }
  }

  // Start the sequence
  animateEyesOpening();

  // After fully open, start pupil movement, THEN blink once
  setTimeout(() => {
    getPupilMovement(() => {
      setTimeout(() => {
        animateEyesBlinking();
        animateEyeWinking("left", 1200); // Winking left eye
        animateEyeWinking("right", 2200); // Winking right eye
      }, 500);
    });
  }, opened + 500);
}

/*****Calling of features*****/
generateGrid(); // Initial grid setup

// animateWave(); // Start loop once// Rebuild grid and reset wave on resize

container.addEventListener("mousemove", mousehoverEffect);

// window.addEventListener("load", () => {
//   crissCrossWave(); // Start the vertical wave on page load
// });

// setInterval(twinkleEffect, 100); // Twinkle every second

// centerOutwardWave(); // Start the wave effect on page load

// glowCenterDot(); // Start the glow effect on page load

drawMatrixEyes(); // Start the eye animation
