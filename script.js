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

generateGrid(); // Initial grid setup

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
// function animateWave() {
//   for (let dot of dots) {
//     const x = parseInt(dot.dataset.x);
//     const y = parseInt(dot.dataset.y);
//     if (x + y === wave) {
//       dot.classList.add("glow");
//       setTimeout(() => dot.classList.remove("glow"), 400);
//     }
//   }
//   wave >= cols + rows ? (wave = 0) : wave++;
//   requestAnimationFrame(animateWave);
// }

// animateWave(); // Start loop once

// Rebuild grid and reset wave on resize

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

container.addEventListener("mousemove", mousehoverEffect);

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

// window.addEventListener("load", () => {
//   crissCrossWave(); // Start the vertical wave on page load
// });

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

// setInterval(twinkleEffect, 100); // Twinkle every second

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

// waterWave(); // Start the wave effect on page load

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
glowCenterDot(); // Start the glow effect on page load

function getEyeCoordsShut() {
  return {
    // Left
    coord1: [centerX - 7, centerY],
    coord2: [centerX - 8, centerY + 1],
    coord3: [centerX - 9, centerY + 1],
    coord4: [centerX - 10, centerY + 2],
    coord5: [centerX - 11, centerY + 2],
    coord6: [centerX - 12, centerY + 2],
    coord7: [centerX - 13, centerY + 2],
    coord8: [centerX - 14, centerY + 2],
    coord9: [centerX - 15, centerY + 2],
    coord10: [centerX - 16, centerY + 2],
    coord11: [centerX - 17, centerY + 1],
    coord12: [centerX - 18, centerY + 1],
    coord13: [centerX - 19, centerY],

    // Left brows
    coord14: [centerX - 10, centerY + 3],
    coord15: [centerX - 12, centerY + 3],
    coord16: [centerX - 14, centerY + 3],
    coord17: [centerX - 16, centerY + 3],
    coord18: [centerX - 9, centerY + 4],
    coord19: [centerX - 12, centerY + 4],
    coord20: [centerX - 14, centerY + 4],
    coord21: [centerX - 17, centerY + 4],

    // Right
    coord22: [centerX + 7, centerY],
    coord23: [centerX + 8, centerY + 1],
    coord24: [centerX + 9, centerY + 1],
    coord25: [centerX + 10, centerY + 2],
    coord26: [centerX + 11, centerY + 2],
    coord27: [centerX + 12, centerY + 2],
    coord28: [centerX + 13, centerY + 2],
    coord29: [centerX + 14, centerY + 2],
    coord30: [centerX + 15, centerY + 2],
    coord31: [centerX + 16, centerY + 2],
    coord32: [centerX + 17, centerY + 1],
    coord33: [centerX + 18, centerY + 1],
    coord34: [centerX + 19, centerY],

    // Right brows
    coord35: [centerX + 10, centerY + 3],
    coord36: [centerX + 12, centerY + 3],
    coord37: [centerX + 14, centerY + 3],
    coord38: [centerX + 16, centerY + 3],
    coord39: [centerX + 9, centerY + 4],
    coord40: [centerX + 12, centerY + 4],
    coord41: [centerX + 14, centerY + 4],
    coord42: [centerX + 17, centerY + 4],
  };
}

function getEyeCoordsSemiShut() {
  return {
    // Left
    coord1: [centerX - 7, centerY],
    coord2: [centerX - 8, centerY - 1],
    coord3: [centerX - 9, centerY - 1],
    coord4: [centerX - 10, centerY - 1],
    coord5: [centerX - 11, centerY - 1],
    coord6: [centerX - 12, centerY - 1],
    coord7: [centerX - 13, centerY - 1],
    coord8: [centerX - 14, centerY - 1],
    coord9: [centerX - 15, centerY - 1],
    coord10: [centerX - 16, centerY - 1],
    coord11: [centerX - 17, centerY - 1],
    coord12: [centerX - 18, centerY - 1],
    coord13: [centerX - 19, centerY],
    coord14: [centerX - 8, centerY + 1],
    coord15: [centerX - 9, centerY + 1],
    coord16: [centerX - 10, centerY + 1],
    coord17: [centerX - 12, centerY + 1],
    coord18: [centerX - 11, centerY + 1],
    coord19: [centerX - 13, centerY + 1],
    coord20: [centerX - 14, centerY + 1],
    coord21: [centerX - 15, centerY + 1],
    coord22: [centerX - 16, centerY + 1],
    coord23: [centerX - 17, centerY + 1],
    coord24: [centerX - 18, centerY + 1],

    // Right
    coord25: [centerX + 7, centerY],
    coord26: [centerX + 8, centerY - 1],
    coord27: [centerX + 9, centerY - 1],
    coord28: [centerX + 10, centerY - 1],
    coord29: [centerX + 11, centerY - 1],
    coord30: [centerX + 12, centerY - 1],
    coord31: [centerX + 13, centerY - 1],
    coord32: [centerX + 14, centerY - 1],
    coord33: [centerX + 15, centerY - 1],
    coord34: [centerX + 16, centerY - 1],
    coord35: [centerX + 17, centerY - 1],
    coord36: [centerX + 18, centerY - 1],
    coord37: [centerX + 19, centerY],
    coord38: [centerX + 8, centerY + 1],
    coord39: [centerX + 9, centerY + 1],
    coord40: [centerX + 10, centerY + 1],
    coord41: [centerX + 12, centerY + 1],
    coord42: [centerX + 11, centerY + 1],
    coord43: [centerX + 13, centerY + 1],
    coord44: [centerX + 14, centerY + 1],
    coord45: [centerX + 15, centerY + 1],
    coord46: [centerX + 16, centerY + 1],
    coord47: [centerX + 17, centerY + 1],
    coord48: [centerX + 18, centerY + 1],
  };
}

function getEyeCoordsOpening() {
  return {
    // Left
    coord1: [centerX - 7, centerY],
    coord2: [centerX - 8, centerY - 1],
    coord3: [centerX - 9, centerY - 1],
    coord4: [centerX - 10, centerY - 2],
    coord5: [centerX - 11, centerY - 2],
    coord6: [centerX - 12, centerY - 2],
    coord7: [centerX - 13, centerY - 2],
    coord8: [centerX - 14, centerY - 2],
    coord9: [centerX - 15, centerY - 2],
    coord10: [centerX - 16, centerY - 2],
    coord11: [centerX - 17, centerY - 1],
    coord12: [centerX - 18, centerY - 1],
    coord13: [centerX - 19, centerY],
    coord14: [centerX - 8, centerY + 1],
    coord15: [centerX - 9, centerY + 1],
    coord16: [centerX - 10, centerY + 2],
    coord17: [centerX - 12, centerY + 2],
    coord18: [centerX - 11, centerY + 2],
    coord19: [centerX - 13, centerY + 2],
    coord20: [centerX - 14, centerY + 2],
    coord21: [centerX - 15, centerY + 2],
    coord22: [centerX - 16, centerY + 2],
    coord23: [centerX - 17, centerY + 1],
    coord24: [centerX - 18, centerY + 1],

    // Right
    coord25: [centerX + 7, centerY],
    coord26: [centerX + 8, centerY - 1],
    coord27: [centerX + 9, centerY - 1],
    coord28: [centerX + 10, centerY - 2],
    coord29: [centerX + 11, centerY - 2],
    coord30: [centerX + 12, centerY - 2],
    coord31: [centerX + 13, centerY - 2],
    coord32: [centerX + 14, centerY - 2],
    coord33: [centerX + 15, centerY - 2],
    coord34: [centerX + 16, centerY - 2],
    coord35: [centerX + 17, centerY - 1],
    coord36: [centerX + 18, centerY - 1],
    coord37: [centerX + 19, centerY],
    coord38: [centerX + 8, centerY + 1],
    coord39: [centerX + 9, centerY + 1],
    coord40: [centerX + 10, centerY + 2],
    coord41: [centerX + 12, centerY + 2],
    coord42: [centerX + 11, centerY + 2],
    coord43: [centerX + 13, centerY + 2],
    coord44: [centerX + 14, centerY + 2],
    coord45: [centerX + 15, centerY + 2],
    coord46: [centerX + 16, centerY + 2],
    coord47: [centerX + 17, centerY + 1],
    coord48: [centerX + 18, centerY + 1],
  };
}

function getEyeCoordsOpened(movX, movY) {
  return {
    // Left
    coord1: [centerX - 7, centerY],
    coord2: [centerX - 8, centerY - 1],
    coord3: [centerX - 9, centerY - 2],
    coord5: [centerX - 10, centerY - 2],
    coord6: [centerX - 11, centerY - 3],
    coord7: [centerX - 12, centerY - 3],
    coord8: [centerX - 13, centerY - 3],
    coord9: [centerX - 14, centerY - 3],
    coord10: [centerX - 15, centerY - 3],
    coord12: [centerX - 16, centerY - 2],
    coord13: [centerX - 17, centerY - 2],
    coord14: [centerX - 18, centerY - 1],
    coord15: [centerX - 19, centerY],
    coord16: [centerX - 8, centerY + 1],
    coord17: [centerX - 9, centerY + 2],
    coord18: [centerX - 10, centerY + 2],
    coord19: [centerX - 12, centerY + 3],
    coord20: [centerX - 11, centerY + 3],
    coord21: [centerX - 13, centerY + 3],
    coord22: [centerX - 14, centerY + 3],
    coord23: [centerX - 15, centerY + 3],
    coord24: [centerX - 16, centerY + 2],
    coord25: [centerX - 17, centerY + 2],
    coord26: [centerX - 18, centerY + 1],

    // Left brows
    coord27: [centerX - 8, centerY - 5],
    coord28: [centerX - 10, centerY - 5],
    coord29: [centerX - 12, centerY - 5],
    coord30: [centerX - 14, centerY - 5],
    coord31: [centerX - 16, centerY - 5],
    coord32: [centerX - 18, centerY - 5],
    coord33: [centerX - 7, centerY - 6],
    coord34: [centerX - 9, centerY - 6],
    coord35: [centerX - 12, centerY - 6],
    coord36: [centerX - 14, centerY - 6],
    coord37: [centerX - 17, centerY - 6],
    coord38: [centerX - 19, centerY - 6],

    // Left pupil
    pupilLeft: [
      [centerX + movX - 12, centerY - movY],
      [centerX + movX - 12, centerY - movY - 1],
      [centerX + movX - 13, centerY - movY - 1],
      [centerX + movX - 14, centerY - movY - 1],
      [centerX + movX - 14, centerY - movY],
      [centerX + movX - 12, centerY - movY + 1],
      [centerX + movX - 13, centerY - movY + 1],
      [centerX + movX - 14, centerY - movY + 1],
    ],
    // Right
    coord39: [centerX + 7, centerY],
    coord40: [centerX + 8, centerY - 1],
    coord41: [centerX + 9, centerY - 2],
    coord42: [centerX + 10, centerY - 2],
    coord43: [centerX + 11, centerY - 3],
    coord44: [centerX + 12, centerY - 3],
    coord45: [centerX + 13, centerY - 3],
    coord46: [centerX + 14, centerY - 3],
    coord47: [centerX + 15, centerY - 3],
    coord48: [centerX + 16, centerY - 2],
    coord49: [centerX + 17, centerY - 2],
    coord50: [centerX + 18, centerY - 1],
    coord51: [centerX + 19, centerY],
    coord52: [centerX + 8, centerY + 1],
    coord53: [centerX + 9, centerY + 2],
    coord54: [centerX + 10, centerY + 2],
    coord55: [centerX + 12, centerY + 3],
    coord56: [centerX + 11, centerY + 3],
    coord57: [centerX + 13, centerY + 3],
    coord58: [centerX + 14, centerY + 3],
    coord59: [centerX + 15, centerY + 3],
    coord60: [centerX + 16, centerY + 2],
    coord61: [centerX + 17, centerY + 2],
    coord62: [centerX + 18, centerY + 1],

    // Right brows
    coord63: [centerX + 8, centerY - 5],
    coord64: [centerX + 10, centerY - 5],
    coord65: [centerX + 12, centerY - 5],
    coord66: [centerX + 14, centerY - 5],
    coord67: [centerX + 16, centerY - 5],
    coord68: [centerX + 18, centerY - 5],
    coord69: [centerX + 7, centerY - 6],
    coord70: [centerX + 9, centerY - 6],
    coord71: [centerX + 12, centerY - 6],
    coord72: [centerX + 14, centerY - 6],
    coord73: [centerX + 17, centerY - 6],
    coord74: [centerX + 19, centerY - 6],

    // Right pupil
    pupilRight: [
      [centerX + movX + 12, centerY - movY],
      [centerX + movX + 12, centerY - movY - 1],
      [centerX + movX + 13, centerY - movY - 1],
      [centerX + movX + 14, centerY - movY - 1],
      [centerX + movX + 14, centerY - movY],
      [centerX + movX + 12, centerY - movY + 1],
      [centerX + movX + 13, centerY - movY + 1],
      [centerX + movX + 14, centerY - movY + 1],
    ],
  };
}

// --- Pupil position state must be set before using it in
let movX = 0; // Pupil movement in X direction
let movY = 0; // Pupil movement in Y direction
let prevX = 0; // Previous X position
let prevY = 0; // Previous Y position

// now build your eye‐frame lookup tables
const EyeCoordsShut = getEyeCoordsShut();
const EyeCoordsSemiShut = getEyeCoordsSemiShut();
const EyeCoordsOpening = getEyeCoordsOpening();
let EyeCoordsOpened = getEyeCoordsOpened(movX, movY);

// --- Pupil movement ---
function getPupilMovement(callback) {
  let prevX = movX;
  let prevY = movY;

  function getNextMove(currentX, currentY) {
    const r = Math.random();
    let deltaX =
      r < 0.7
        ? Math.floor(Math.random() * 3) - 1
        : Math.floor(Math.random() * 5) - 2;
    let deltaY =
      r < 0.7
        ? Math.floor(Math.random() * 3) - 1
        : Math.floor(Math.random() * 5) - 2;
    return [
      Math.max(-3, Math.min(3, currentX + deltaX)),
      Math.max(-2, Math.min(2, currentY + deltaY)),
    ];
  }

  const steps = 20,
    stepDelay = 150;
  for (let mov = 0; mov < steps; mov++) {
    setTimeout(() => {
      // clear last pupil
      const prevCoords = getEyeCoordsOpened(prevX, prevY);
      for (let dot of dots) {
        let x = +dot.dataset.x,
          y = +dot.dataset.y;
        if (prevCoords[`${x},${y}`]) dot.classList.remove("glow");
      }

      // compute & draw new pupil
      [movX, movY] = getNextMove(prevX, prevY);
      EyeCoordsOpened = getEyeCoordsOpened(movX, movY);
      for (let dot of dots) {
        let x = +dot.dataset.x,
          y = +dot.dataset.y;
        if (EyeCoordsOpened[`${x},${y}`]) dot.classList.add("glow");
      }

      prevX = movX;
      prevY = movY;

      // after last step, clear and callback
      if (mov === steps - 1) {
        setTimeout(() => {
          const last = getEyeCoordsOpened(movX, movY);
          for (let dot of dots) {
            let x = +dot.dataset.x,
              y = +dot.dataset.y;
            if (last[`${x},${y}`]) dot.classList.remove("glow");
          }
          callback && callback();
        }, 300);
      }
    }, mov * stepDelay);
  }
}

// --- Eye drawing stages ---
function drawMatrixEyes() {
  const cD = 200,
    sD = 200,
    oD = 200,
    hD = 400,
    bD = 1000;

  function applyEyeGlow(dot, coords, cls, start, end) {
    let x = +dot.dataset.x,
      y = +dot.dataset.y;
    if (coords[`${x},${y}`]) {
      setTimeout(() => dot.classList.add(cls), start);
      if (end != null) setTimeout(() => dot.classList.remove(cls), end);
    }
  }

  function animateEyesOpening() {
    for (let dot of dots) {
      applyEyeGlow(dot, EyeCoordsShut, "glow-soft", 0, cD);
      applyEyeGlow(dot, EyeCoordsSemiShut, "glow-soft", cD, cD + sD);
      applyEyeGlow(dot, EyeCoordsOpening, "glow-medium", cD + sD, cD + sD + oD);
      applyEyeGlow(dot, EyeCoordsOpened, "glow", cD + sD + oD, null);
    }
  }

  function animateEyesBlinking(cb) {
    for (let dot of dots) {
      applyEyeGlow(dot, EyeCoordsOpened, "glow", 0, 100);
      applyEyeGlow(dot, EyeCoordsOpening, "glow-medium", 100, 200);
      applyEyeGlow(dot, EyeCoordsSemiShut, "glow-soft", 200, 300);
      applyEyeGlow(dot, EyeCoordsShut, "glow-soft", 300, 400);
      applyEyeGlow(dot, EyeCoordsSemiShut, "glow-soft", 400, 500);
      applyEyeGlow(dot, EyeCoordsOpening, "glow-medium", 500, 600);
      applyEyeGlow(dot, EyeCoordsOpened, "glow", 600, null);
    }
    setTimeout(() => cb && cb(), 700);
  }

  function clearOnlyPupilGlow(x, y) {
    const pup = getEyeCoordsOpened(x, y);
    for (let dot of dots) {
      let dx = +dot.dataset.x,
        dy = +dot.dataset.y;
      if (pup[`${dx},${dy}`]) dot.classList.remove("glow");
    }
  }

  function showCenteredPupil() {
    movX = 0;
    movY = 0;
    EyeCoordsOpened = getEyeCoordsOpened(0, 0);
    for (let dot of dots) {
      let x = +dot.dataset.x,
        y = +dot.dataset.y;
      if (EyeCoordsOpened[`${x},${y}`]) dot.classList.add("glow");
    }
  }

  animateEyesOpening();
  let fullOpen = cD + sD + oD + hD;
  setTimeout(() => {
    getPupilMovement(() => {
      clearOnlyPupilGlow(movX, movY);
      setTimeout(() => {
        animateEyesBlinking(() => showCenteredPupil());
      }, 200);
    });
  }, fullOpen + bD);
}

drawMatrixEyes();
