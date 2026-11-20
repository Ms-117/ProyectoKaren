/**
 * ============================================================================
 * NEON VECTOR RACE
 * Videojuego de carreras futurista en perspectiva pseudo-3D con sistema
 * interactivo de preguntas de Cálculo Vectorial.
 * Desarrollado en Vanilla JavaScript + HTML5 Canvas + Web Audio API.
 * ============================================================================
 */

"use strict";

/* ============================================================================
   1. BANCO DE PREGUNTAS DE CÁLCULO VECTORIAL (24 PREGUNTAS VERIFICADAS)
   ============================================================================ */
const VECTOR_CALCULUS_QUESTIONS = [
  {
    topic: "MAGNITUD DE UN VECTOR",
    question: "¿Cuál es la magnitud ||v|| del vector tridimensional v = (3, -4, 12)?",
    options: ["13", "11", "19"],
    correctIndex: 0,
    explanation: "La magnitud se calcula como √(3² + (-4)² + 12²) = √(9 + 16 + 144) = √169 = 13."
  },
  {
    topic: "PRODUCTO PUNTO",
    question: "Dados u = (2, -1, 4) y v = (3, 5, -2), ¿cuál es su producto punto u · v?",
    options: ["9", "-7", "-3"],
    correctIndex: 1,
    explanation: "u · v = (2)(3) + (-1)(5) + (4)(-2) = 6 - 5 - 8 = -7."
  },
  {
    topic: "VECTORES ORTOGONALES",
    question: "¿Para qué valor de k los vectores a = (k, 3, -2) y b = (4, -2, 1) son ortogonales?",
    options: ["k = -2", "k = 4", "k = 2"],
    correctIndex: 2,
    explanation: "Dos vectores son ortogonales cuando a · b = 0: 4k + 3(-2) + (-2)(1) = 4k - 8 = 0, por lo que k = 2."
  },
  {
    topic: "PRODUCTO CRUZ",
    question: "En el sistema dextrógiro estándar R³, ¿cuál es el resultado de i × j?",
    options: ["k", "-k", "0"],
    correctIndex: 0,
    explanation: "Por la regla de la mano derecha, el producto cruz de los vectores unitarios i × j produce el vector unitario k."
  },
  {
    topic: "PRODUCTO CRUZ",
    question: "Calcula el producto cruz u × v para u = (1, 0, 2) y v = (0, 3, 1).",
    options: ["(6, -1, -3)", "(-6, -1, 3)", "(-6, 1, 3)"],
    correctIndex: 1,
    explanation: "u × v = (0·1 - 2·3, 2·0 - 1·1, 1·3 - 0·0) = (-6, -1, 3)."
  },
  {
    topic: "DERIVADAS VECTORIALES",
    question: "Si la posición de una partícula es r(t) = (t³, sen(2t), e⁻ᵗ), ¿cuál es su vector velocidad r'(t)?",
    options: [
      "(3t², 2cos(2t), -e⁻ᵗ)",
      "(3t², cos(2t), e⁻ᵗ)",
      "(t², -2cos(2t), -e⁻ᵗ)"
    ],
    correctIndex: 0,
    explanation: "Derivando componente a componente respecto a t: d/dt(t³)=3t², d/dt(sen 2t)=2cos(2t) y d/dt(e⁻ᵗ)=-e⁻ᵗ."
  },
  {
    topic: "ACELERACIÓN VECTORIAL",
    question: "Dada la trayectoria r(t) = (4cos t, 4sen t, 3t), ¿cuál es la magnitud de su aceleración ||r''(t)||?",
    options: ["5", "4", "0"],
    correctIndex: 1,
    explanation: "r'(t) = (-4sen t, 4cos t, 3) y r''(t) = (-4cos t, -4sen t, 0). Su magnitud es √(16cos²t + 16sen²t) = 4."
  },
  {
    topic: "INTEGRALES VECTORIALES",
    question: "Evalúa la integral definida ∫₀¹ (2t, 3t², 4) dt.",
    options: ["(2, 6, 0)", "(1, 3, 4)", "(1, 1, 4)"],
    correctIndex: 2,
    explanation: "Integrando cada componente de 0 a 1 se obtiene [t², t³, 4t] evaluado entre 0 y 1, resultando en (1, 1, 4)."
  },
  {
    topic: "GRADIENTE",
    question: "¿Cuál es el gradiente ∇f(x, y) de la función escalar f(x, y) = x²y + 3y²?",
    options: [
      "(2xy, x² + 6y)",
      "(x², 2xy + 6y)",
      "(2x + y, x² + 6)"
    ],
    correctIndex: 0,
    explanation: "El gradiente reúne las derivadas parciales: ∂f/∂x = 2xy y ∂f/∂y = x² + 6y."
  },
  {
    topic: "GRADIENTE EVALUADO",
    question: "Calcula ∇f(1, -1, 2) para el campo escalar f(x, y, z) = x² + y²z - 3z.",
    options: ["(2, 4, -2)", "(2, -4, -2)", "(1, -4, 1)"],
    correctIndex: 1,
    explanation: "∇f = (2x, 2yz, y² - 3). Al sustituir (1, -1, 2) obtenemos (2(1), 2(-1)(2), (-1)² - 3) = (2, -4, -2)."
  },
  {
    topic: "INTERPRETACIÓN DEL GRADIENTE",
    question: "Geométricamente, ¿qué indica el vector gradiente ∇f(x₀, y₀) cuando es distinto de cero?",
    options: [
      "La dirección donde f permanece constante",
      "La dirección de máximo decremento de f",
      "La dirección de máximo crecimiento de f"
    ],
    correctIndex: 2,
    explanation: "El vector gradiente apunta siempre en la dirección en la que la función escalar aumenta con mayor rapidez."
  },
  {
    topic: "DIVERGENCIA",
    question: "Calcula la divergencia ∇ · F del campo vectorial F(x, y, z) = (3x², -2xy, 5z).",
    options: ["4x + 5", "6x - 2y + 5", "(6x, -2x, 5)"],
    correctIndex: 0,
    explanation: "∇ · F = ∂(3x²)/∂x + ∂(-2xy)/∂y + ∂(5z)/∂z = 6x - 2x + 5 = 4x + 5."
  },
  {
    topic: "CAMPOS VECTORIALES",
    question: "¿Cuál de los siguientes campos vectoriales tiene divergencia nula (solenoidal) en todo R³?",
    options: [
      "F(x, y, z) = (x, y, z)",
      "F(x, y, z) = (y, -x, 4)",
      "F(x, y, z) = (x², y², z²)"
    ],
    correctIndex: 1,
    explanation: "Para F = (y, -x, 4), ∂y/∂x + ∂(-x)/∂y + ∂(4)/∂z = 0 + 0 + 0 = 0."
  },
  {
    topic: "ROTACIONAL",
    question: "Calcula el rotacional ∇ × F para el campo F(x, y, z) = (0, 0, x²).",
    options: ["(0, 2x, 0)", "(2x, 0, 0)", "(0, -2x, 0)"],
    correctIndex: 2,
    explanation: "∇ × F = (∂(x²)/∂y - 0, 0 - ∂(x²)/∂x, 0 - 0) = (0, -2x, 0)."
  },
  {
    topic: "ROTACIONAL",
    question: "Si un campo vectorial continuo F cumple ∇ × F = 0 en todo su dominio, se denomina:",
    options: ["Irrotacional", "Solenoidal", "Normalizado"],
    correctIndex: 0,
    explanation: "Un campo con rotacional igual al vector cero no presenta tendencia a rotar localmente y se llama irrotacional."
  },
  {
    topic: "CURVAS PARAMÉTRICAS",
    question: "¿Qué curva plana describe r(t) = (5cos t, 5sen t) para 0 ≤ t ≤ 2π?",
    options: [
      "Una parábola con vértice en (5, 5)",
      "Una circunferencia de radio 5 centrada en el origen",
      "Una elipse de semiejes 5 y 1"
    ],
    correctIndex: 1,
    explanation: "Como x² + y² = 25cos²t + 25sen²t = 25, representa una circunferencia de radio 5 centrada en (0, 0)."
  },
  {
    topic: "LONGITUD DE ARCO",
    question: "Calcula la longitud de la curva paramétrica r(t) = (3t, 4t, 12t) en el intervalo 0 ≤ t ≤ 2.",
    options: ["13", "38", "26"],
    correctIndex: 2,
    explanation: "||r'(t)|| = ||(3, 4, 12)|| = 13. Integrando de t = 0 a t = 2: L = 13 × 2 = 26."
  },
  {
    topic: "VECTOR TANGENTE UNITARIO",
    question: "Para la recta paramétrica r(t) = (t, 2t, 2t), ¿cuál es su vector tangente unitario T(t)?",
    options: ["(1/3, 2/3, 2/3)", "(1, 2, 2)", "(1/5, 2/5, 2/5)"],
    correctIndex: 0,
    explanation: "r'(t) = (1, 2, 2) tiene magnitud √(1 + 4 + 4) = 3, por lo que T(t) = r'(t)/3 = (1/3, 2/3, 2/3)."
  },
  {
    topic: "VECTORES EN 2D",
    question: "¿Cuál es el vector unitario con la misma dirección y sentido que v = (6, -8)?",
    options: ["(0.8, -0.6)", "(0.6, -0.8)", "(6, -8)"],
    correctIndex: 1,
    explanation: "||v|| = √(6² + (-8)²) = 10. Dividiendo cada componente entre 10 obtenemos (0.6, -0.8)."
  },
  {
    topic: "APLICACIÓN PRODUCTO CRUZ",
    question: "Geométricamente, el área del paralelogramo generado por dos vectores u y v en R³ es igual a:",
    options: [
      "El valor absoluto de u · v",
      "La magnitud ||u × v||",
      "La suma ||u|| + ||v||"
    ],
    correctIndex: 1,
    explanation: "La magnitud del producto cruz ||u × v|| = ||u|| ||v|| sen(θ) equivale exactamente al área del paralelogramo."
  },
  {
    topic: "DERIVADA DIRECCIONAL",
    question: "Si ∇f(2, 1) = (4, -3), ¿cuál es la derivada direccional en dirección del vector unitario u = (3/5, 4/5)?",
    options: ["0", "24/5", "1"],
    correctIndex: 0,
    explanation: "D_u f = ∇f · u = 4(3/5) + (-3)(4/5) = 12/5 - 12/5 = 0."
  },
  {
    topic: "CURVAS EN EL ESPACIO",
    question: "La ecuación paramétrica r(t) = (cos t, sen t, 2t) describe geométricamente:",
    options: [
      "Un círculo en el plano xy",
      "Una hélice circular alrededor del eje z",
      "Una recta oblicua en el espacio"
    ],
    correctIndex: 1,
    explanation: "Mientras (cos t, sen t) gira circularmente en xy, la coordenada z = 2t asciende linealmente formando una hélice."
  },
  {
    topic: "PROPIEDADES VECTORIALES",
    question: "Para cualquier vector v en R³, ¿cuál es el resultado de calcular v × v?",
    options: ["El escalar 1", "El vector v", "El vector cero 0"],
    correctIndex: 2,
    explanation: "El ángulo entre un vector y sí mismo es 0°, y sen(0°) = 0, por lo que v × v = 0."
  },
  {
    topic: "OPERADORES DIFERENCIALES",
    question: "La divergencia del gradiente de un campo escalar, ∇ · (∇f), se conoce como:",
    options: ["El Laplaciano de f", "El rotacional de f", "La integral de línea de f"],
    correctIndex: 0,
    explanation: "El operador diferencial de segundo orden ∇ · (∇f) = ∇²f se denomina operador Laplaciano."
  }
];

/* ============================================================================
   2. SINTETIZADOR DE AUDIO FUTURISTA (WEB AUDIO API SIN ARCHIVOS EXTERNOS)
   ============================================================================ */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playTone(freqStart, freqEnd, duration, type = "sine", gainPeak = 0.14) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freqStart, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), now + duration);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(gainPeak, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  playBoost() {
    this.playTone(220, 880, 0.42, "sawtooth", 0.12);
    setTimeout(() => this.playTone(440, 1320, 0.35, "triangle", 0.1), 70);
  }

  playCrash() {
    this.playTone(150, 32, 0.38, "sawtooth", 0.22);
    this.playTone(95, 28, 0.45, "square", 0.14);
  }

  playQuizAlert() {
    this.playTone(523.25, 659.25, 0.16, "triangle", 0.12);
    setTimeout(() => this.playTone(659.25, 1046.5, 0.24, "triangle", 0.12), 110);
  }

  playCorrect() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playTone(n, n * 1.02, 0.18, "triangle", 0.12), idx * 65);
    });
  }

  playWrong() {
    this.playTone(210, 140, 0.25, "sawtooth", 0.14);
    setTimeout(() => this.playTone(155, 110, 0.3, "sawtooth", 0.14), 140);
  }
}

/* ============================================================================
   3. CONFIGURACIÓN PRINCIPAL Y ESTADO DEL JUEGO
   ============================================================================ */
const CONFIG = {
  minSpeed: 95,             // Velocidad inicial (KM/H)
  baseMaxSpeed: 280,        // Velocidad máxima inicial (KM/H)
  absoluteMaxSpeed: 420,    // Tope de velocidad con progresión y turbo
  baseAccel: 4.2,           // Aceleración automática por segundo
  lateralSpeed: 2.25,       // Velocidad de desplazamiento lateral
  roadLimit: 0.78,          // Límite lateral del vehículo en carretera [-0.78, 0.78]
  lanes: [-0.62, 0, 0.62],  // Tres carriles distribuidos en [-1, 1]
  nearZ: 10,                // Plano Z correspondiente al borde inferior de pantalla
  playerZ: 16,              // Posición Z del vehículo en tercera persona
  drawDistance: 260,        // Profundidad de renderizado hacia el horizonte
  segmentLength: 5,         // Longitud de cada segmento de pista
  cameraHeight: 2.6,        // Altura de cámara sobre el asfalto
  quizMinInterval: 21,      // Mínimo de segundos entre preguntas
  quizMaxInterval: 28,      // Máximo de segundos entre preguntas
  boostDuration: 4.5,       // Duración del potenciador en segundos
  boostBonusSpeed: 85       // Incremento de velocidad durante el turbo
};

const STATE = {
  mode: "START", // START | PLAYING | PAUSED | QUIZ | GAMEOVER
  speed: CONFIG.minSpeed,
  currentMaxSpeed: CONFIG.baseMaxSpeed,
  distance: 0,
  score: 0,
  shield: 100,
  playerX: 0,
  playerTilt: 0,
  trackZ: 0,
  elapsedTime: 0,
  boostTimer: 0,
  quizTimer: 23,
  correctCount: 0,
  incorrectCount: 0,
  usedQuestionIndices: new Set(),
  currentQuestion: null,
  questionAnswered: false,
  shakeTimer: 0,
  shakeIntensity: 0
};

// Entidades activas en pista
let entities = [];
let particles = [];
let speedLines = [];
let cityBuildings = [];
let stars = [];
let nextSpawnZ = 75;

// Controles de entrada
const keys = {
  left: false,
  right: false
};

const sound = new SoundEngine();

/* ============================================================================
   4. REFERENCIAS AL DOM
   ============================================================================ */
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const screenFlash = document.getElementById("screen-flash");

const hud = document.getElementById("hud");
const hudSpeed = document.getElementById("hud-speed");
const hudDistance = document.getElementById("hud-distance");
const hudScore = document.getElementById("hud-score");
const hudCorrect = document.getElementById("hud-correct");
const hudShieldText = document.getElementById("hud-shield-text");
const speedBar = document.getElementById("speed-bar");
const shieldBar = document.getElementById("shield-bar");
const boostBadge = document.getElementById("boost-badge");
const boostTimerTrack = document.getElementById("boost-timer-track");
const boostBar = document.getElementById("boost-bar");

const touchControls = document.getElementById("touch-controls");
const touchLeft = document.getElementById("touch-left");
const touchRight = document.getElementById("touch-right");

const startScreen = document.getElementById("start-screen");
const pauseScreen = document.getElementById("pause-screen");
const gameoverScreen = document.getElementById("gameover-screen");
const quizModal = document.getElementById("quiz-modal");

const quizTopic = document.getElementById("quiz-topic");
const quizQuestionEl = document.getElementById("quiz-question");
const quizOptionBtns = Array.from(document.querySelectorAll(".quiz-option-btn"));
const quizFeedback = document.getElementById("quiz-feedback");
const quizResultBanner = document.getElementById("quiz-result-banner");
const quizExplanation = document.getElementById("quiz-explanation");
const btnQuizContinue = document.getElementById("btn-quiz-continue");

const finalDistanceEl = document.getElementById("final-distance");
const finalScoreEl = document.getElementById("final-score");
const finalCorrectEl = document.getElementById("final-correct");
const finalIncorrectEl = document.getElementById("final-incorrect");

/* ============================================================================
   5. INICIALIZACIÓN DE ESCENARIO Y REDIMENSIONAMIENTO
   ============================================================================ */
let viewWidth = window.innerWidth;
let viewHeight = window.innerHeight;

function getRoadHalfWidthPxAtNear() {
  // Mantiene la carretera proporcionada tanto en monitores anchos como en móviles verticales
  return Math.min(viewWidth * 0.46, viewHeight * 0.78);
}

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  viewWidth = window.innerWidth;
  viewHeight = window.innerHeight;
  canvas.width = Math.floor(viewWidth * dpr);
  canvas.height = Math.floor(viewHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  generateSkyline();
}

function generateSkyline() {
  cityBuildings = [];
  const count = Math.ceil(viewWidth / 44) + 10;
  for (let i = 0; i < count; i++) {
    const w = 28 + Math.random() * 44;
    const h = 38 + Math.random() * 120;
    const neonColor =
      i % 3 === 0 ? "#00f3ff" : i % 3 === 1 ? "#ff007f" : "#9d00ff";
    cityBuildings.push({
      x: i * 44 - 160,
      w,
      h,
      neonColor,
      windowsSeed: Math.floor(Math.random() * 100)
    });
  }

  stars = [];
  for (let i = 0; i < 65; i++) {
    stars.push({
      x: Math.random() * viewWidth,
      y: Math.random() * (viewHeight * 0.42),
      size: 0.8 + Math.random() * 1.8,
      alpha: 0.3 + Math.random() * 0.7
    });
  }
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

/* ============================================================================
   6. CONTROL DE FLUJO DE PANTALLAS Y REINICIO
   ============================================================================ */
function showOnlyOverlay(overlayToShow) {
  [startScreen, pauseScreen, gameoverScreen, quizModal].forEach((el) => {
    el.classList.add("hidden");
  });
  if (overlayToShow) {
    overlayToShow.classList.remove("hidden");
  }
}

function resetGameState() {
  STATE.speed = CONFIG.minSpeed;
  STATE.currentMaxSpeed = CONFIG.baseMaxSpeed;
  STATE.distance = 0;
  STATE.score = 0;
  STATE.shield = 100;
  STATE.playerX = 0;
  STATE.playerTilt = 0;
  STATE.trackZ = 0;
  STATE.elapsedTime = 0;
  STATE.boostTimer = 0;
  STATE.quizTimer = randomRange(CONFIG.quizMinInterval, CONFIG.quizMaxInterval);
  STATE.correctCount = 0;
  STATE.incorrectCount = 0;
  STATE.usedQuestionIndices.clear();
  STATE.currentQuestion = null;
  STATE.questionAnswered = false;
  STATE.shakeTimer = 0;

  keys.left = false;
  keys.right = false;
  touchLeft.classList.remove("pressed");
  touchRight.classList.remove("pressed");

  entities = [];
  particles = [];
  speedLines = [];
  nextSpawnZ = 75;

  // Poblar obstáculos y potenciadores iniciales con distancia segura
  for (let z = 85; z <= CONFIG.drawDistance; z += 44) {
    spawnWaveAt(z);
    nextSpawnZ = z + 44;
  }

  updateHUD();
}

function startGame() {
  sound.init();
  resetGameState();
  STATE.mode = "PLAYING";
  showOnlyOverlay(null);
  hud.classList.remove("hidden");
  touchControls.classList.remove("hidden");
}

function togglePause() {
  if (STATE.mode === "PLAYING") {
    STATE.mode = "PAUSED";
    keys.left = false;
    keys.right = false;
    showOnlyOverlay(pauseScreen);
  } else if (STATE.mode === "PAUSED") {
    STATE.mode = "PLAYING";
    showOnlyOverlay(null);
  }
}

function triggerGameOver() {
  STATE.mode = "GAMEOVER";
  keys.left = false;
  keys.right = false;
  hud.classList.add("hidden");
  touchControls.classList.add("hidden");

  finalDistanceEl.textContent = `${Math.floor(STATE.distance)} m`;
  finalScoreEl.textContent = Math.floor(STATE.score).toLocaleString("es-MX");
  finalCorrectEl.textContent = STATE.correctCount;
  finalIncorrectEl.textContent = STATE.incorrectCount;

  showOnlyOverlay(gameoverScreen);
}

function triggerFlash(colorRgba) {
  screenFlash.style.background = colorRgba;
  screenFlash.style.opacity = "0.65";
  setTimeout(() => {
    screenFlash.style.opacity = "0";
  }, 130);
}

/* ============================================================================
   7. GENERACIÓN PROCEDURAL DE OBSTÁCULOS Y POTENCIADORES
   ============================================================================ */
function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

function spawnWaveAt(zPos) {
  // Dificultad progresiva: probabilidad de 2 obstáculos simultáneos sube con el tiempo
  const difficultyFactor = Math.min(1, STATE.elapsedTime / 120);
  const twoObstaclesChance = 0.22 + difficultyFactor * 0.42;
  const obstacleCount = Math.random() < twoObstaclesChance ? 2 : 1;

  // Mezclar carriles disponibles garantizando SIEMPRE al menos 1 carril libre
  const availableLanes = [0, 1, 2];
  shuffleArray(availableLanes);

  const obstacleTypes = ["rock", "cone", "barrier", "pylon"];

  for (let i = 0; i < obstacleCount; i++) {
    const laneIdx = availableLanes[i];
    const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    entities.push({
      kind: "obstacle",
      type,
      x: CONFIG.lanes[laneIdx],
      z: zPos + randomRange(-2.5, 2.5),
      width: type === "barrier" ? 0.44 : type === "rock" ? 0.38 : 0.3,
      hit: false,
      pulse: Math.random() * Math.PI * 2
    });
  }

  // En uno de los carriles libres puede aparecer un potenciador de velocidad
  const freeLaneIdx = availableLanes[obstacleCount];
  if (freeLaneIdx !== undefined && Math.random() < 0.34) {
    entities.push({
      kind: "booster",
      x: CONFIG.lanes[freeLaneIdx],
      z: zPos + randomRange(4, 12),
      width: 0.32,
      hit: false,
      pulse: Math.random() * Math.PI * 2
    });
  }
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/* ============================================================================
   8. SISTEMA INTERACTIVO DE PREGUNTAS DE CÁLCULO VECTORIAL
   ============================================================================ */
function openVectorQuiz() {
  STATE.mode = "QUIZ";
  STATE.questionAnswered = false;
  keys.left = false;
  keys.right = false;

  // Si ya se usaron todas las preguntas en la misma partida, reiniciar historial
  if (STATE.usedQuestionIndices.size >= VECTOR_CALCULUS_QUESTIONS.length) {
    STATE.usedQuestionIndices.clear();
  }

  let qIndex;
  do {
    qIndex = Math.floor(Math.random() * VECTOR_CALCULUS_QUESTIONS.length);
  } while (STATE.usedQuestionIndices.has(qIndex));

  STATE.usedQuestionIndices.add(qIndex);
  STATE.currentQuestion = VECTOR_CALCULUS_QUESTIONS[qIndex];

  // Rellenar modal
  quizTopic.textContent = STATE.currentQuestion.topic;
  quizQuestionEl.textContent = STATE.currentQuestion.question;
  quizFeedback.classList.add("hidden");

  quizOptionBtns.forEach((btn, idx) => {
    btn.disabled = false;
    btn.classList.remove("correct-choice", "wrong-choice");
    btn.querySelector(".option-text").textContent = STATE.currentQuestion.options[idx];
  });

  sound.playQuizAlert();
  showOnlyOverlay(quizModal);
}

function handleQuizAnswer(selectedIndex) {
  if (STATE.mode !== "QUIZ" || STATE.questionAnswered) return;
  STATE.questionAnswered = true;

  const correctIdx = STATE.currentQuestion.correctIndex;
  const isCorrect = selectedIndex === correctIdx;

  quizOptionBtns.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIdx) {
      btn.classList.add("correct-choice");
    } else if (idx === selectedIndex && !isCorrect) {
      btn.classList.add("wrong-choice");
    }
  });

  if (isCorrect) {
    STATE.correctCount += 1;
    STATE.score += 500;
    STATE.boostTimer = Math.max(STATE.boostTimer, 3.2);
    STATE.speed = Math.min(CONFIG.absoluteMaxSpeed, STATE.speed + 42);
    STATE.shield = Math.min(100, STATE.shield + 10);

    quizResultBanner.className = "result-banner success";
    quizResultBanner.textContent = "RESPUESTA CORRECTA // +42 KM/H DE IMPULSO Y +500 PTS";
    sound.playCorrect();
  } else {
    STATE.incorrectCount += 1;
    STATE.speed = Math.max(CONFIG.minSpeed, STATE.speed - 38);

    quizResultBanner.className = "result-banner penalty";
    quizResultBanner.textContent = "RESPUESTA INCORRECTA // PENALIZACIÓN DE -38 KM/H";
    sound.playWrong();
  }

  quizExplanation.textContent = STATE.currentQuestion.explanation;
  quizFeedback.classList.remove("hidden");
  updateHUD();
}

function resumeFromQuiz() {
  if (STATE.mode !== "QUIZ" || !STATE.questionAnswered) return;
  STATE.quizTimer = randomRange(CONFIG.quizMinInterval, CONFIG.quizMaxInterval);
  STATE.mode = "PLAYING";
  showOnlyOverlay(null);
}

/* ============================================================================
   9. PARTÍCULAS Y EFECTOS DE IMPACTO / TURBO
   ============================================================================ */
function spawnExplosion(screenX, screenY, colorMain, colorSecondary, count = 26) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 70 + Math.random() * 260;
    particles.push({
      x: screenX,
      y: screenY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 40,
      life: 0.35 + Math.random() * 0.35,
      maxLife: 0.7,
      size: 2.5 + Math.random() * 4.5,
      color: i % 2 === 0 ? colorMain : colorSecondary
    });
  }
}

function updateParticles(dt) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 240 * dt;
    p.life -= dt;
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }

  // Líneas de velocidad cuando el vehículo va rápido o con turbo activo
  const speedRatio = (STATE.speed - CONFIG.minSpeed) / (CONFIG.absoluteMaxSpeed - CONFIG.minSpeed);
  if (STATE.boostTimer > 0 || speedRatio > 0.55) {
    const spawnChance = STATE.boostTimer > 0 ? 0.85 : 0.35;
    if (Math.random() < spawnChance) {
      const side = Math.random() < 0.5 ? -1 : 1;
      speedLines.push({
        x: viewWidth * 0.5 + side * randomRange(viewWidth * 0.24, viewWidth * 0.5),
        y: randomRange(viewHeight * 0.25, viewHeight * 0.85),
        len: randomRange(35, 95),
        speed: randomRange(750, 1350),
        color: STATE.boostTimer > 0 ? "#00ff9d" : "#00f3ff",
        alpha: randomRange(0.25, 0.75)
      });
    }
  }

  for (let i = speedLines.length - 1; i >= 0; i--) {
    const line = speedLines[i];
    line.y += line.speed * dt;
    line.alpha -= dt * 1.4;
    if (line.y > viewHeight || line.alpha <= 0) {
      speedLines.splice(i, 1);
    }
  }
}

/* ============================================================================
   10. ACTUALIZACIÓN DE FÍSICA Y LÓGICA DE JUEGO
   ============================================================================ */
function updateSimulation(dt) {
  STATE.elapsedTime += dt;

  // Progresión gradual de velocidad máxima con el tiempo
  STATE.currentMaxSpeed = Math.min(
    365,
    CONFIG.baseMaxSpeed + STATE.elapsedTime * 0.65
  );

  // Gestión del potenciador de velocidad
  const isBoosting = STATE.boostTimer > 0;
  if (isBoosting) {
    STATE.boostTimer = Math.max(0, STATE.boostTimer - dt);
    const boostTarget = Math.min(CONFIG.absoluteMaxSpeed, STATE.currentMaxSpeed + CONFIG.boostBonusSpeed);
    STATE.speed += (boostTarget - STATE.speed) * Math.min(1, dt * 4.5);
  } else {
    // Aceleración progresiva natural o desaceleración suave tras terminar el turbo
    if (STATE.speed < STATE.currentMaxSpeed) {
      STATE.speed = Math.min(
        STATE.currentMaxSpeed,
        STATE.speed + CONFIG.baseAccel * dt
      );
    } else if (STATE.speed > STATE.currentMaxSpeed) {
      STATE.speed = Math.max(
        STATE.currentMaxSpeed,
        STATE.speed - 28 * dt
      );
    }
  }

  // Movimiento lateral del vehículo
  let moveDir = 0;
  if (keys.left) moveDir -= 1;
  if (keys.right) moveDir += 1;

  STATE.playerX += moveDir * CONFIG.lateralSpeed * dt;
  STATE.playerX = Math.max(-CONFIG.roadLimit, Math.min(CONFIG.roadLimit, STATE.playerX));

  // Inclinación visual suave al girar
  const targetTilt = moveDir * 0.14;
  STATE.playerTilt += (targetTilt - STATE.playerTilt) * Math.min(1, dt * 12);

  // Avance en pista (convertir KM/H a unidades de mundo por segundo)
  const worldUnitsPerSec = (STATE.speed / 3.6) * 1.45;
  const deltaZ = worldUnitsPerSec * dt;

  STATE.trackZ += deltaZ;
  STATE.distance += (STATE.speed / 3.6) * dt;
  STATE.score += deltaZ * (isBoosting ? 2.4 : 1.2);

  // Reducir vibración de cámara
  if (STATE.shakeTimer > 0) {
    STATE.shakeTimer = Math.max(0, STATE.shakeTimer - dt);
  }

  // Temporizador para preguntas de Cálculo Vectorial
  STATE.quizTimer -= dt;
  if (STATE.quizTimer <= 0) {
    openVectorQuiz();
    return;
  }

  // Generar nuevas oleadas de obstáculos/potenciadores dinámicamente
  const difficultyFactor = Math.min(1, STATE.elapsedTime / 110);
  const spawnSpacing = Math.max(26, 44 - difficultyFactor * 16);

  nextSpawnZ -= deltaZ;
  while (nextSpawnZ <= CONFIG.drawDistance) {
    spawnWaveAt(nextSpawnZ);
    nextSpawnZ += spawnSpacing;
  }

  // Actualizar entidades y verificar colisiones
  const playerHalfWidth = 0.18;

  for (let i = entities.length - 1; i >= 0; i--) {
    const ent = entities[i];
    ent.z -= deltaZ;
    ent.pulse += dt * 5;

    // Detección de colisión en ventana exacta alrededor de playerZ
    if (!ent.hit && ent.z <= CONFIG.playerZ + 2.2 && ent.z >= CONFIG.playerZ - 2.0) {
      const dx = Math.abs(ent.x - STATE.playerX);
      const combinedHalfWidth = playerHalfWidth + ent.width * 0.45;

      if (dx < combinedHalfWidth) {
        ent.hit = true;
        const proj = projectPoint(ent.x, 0.35, ent.z);

        if (ent.kind === "obstacle") {
          // Choque con obstáculo: reducción considerable de velocidad e integridad
          STATE.speed = Math.max(CONFIG.minSpeed, STATE.speed * 0.58);
          STATE.boostTimer = 0;
          STATE.shield = Math.max(0, STATE.shield - 25);
          STATE.shakeTimer = 0.35;
          STATE.shakeIntensity = 10;

          sound.playCrash();
          triggerFlash("rgba(255, 0, 95, 0.55)");
          spawnExplosion(proj.x, proj.y, "#ff007f", "#ffbe0b", 30);

          if (STATE.shield <= 0) {
            updateHUD();
            triggerGameOver();
            return;
          }
        } else if (ent.kind === "booster") {
          // Recogida de potenciador de velocidad
          STATE.boostTimer = CONFIG.boostDuration;
          STATE.speed = Math.min(CONFIG.absoluteMaxSpeed, STATE.speed + 55);
          STATE.score += 250;

          sound.playBoost();
          triggerFlash("rgba(0, 255, 157, 0.35)");
          spawnExplosion(proj.x, proj.y, "#00ff9d", "#00f3ff", 24);
        }
      }
    }

    // Eliminar entidades una vez que salen por el borde inferior de la pantalla
    if (ent.z < CONFIG.nearZ - 2) {
      entities.splice(i, 1);
    }
  }

  updateParticles(dt);
  updateHUD();
}

function updateHUD() {
  hudSpeed.textContent = Math.round(STATE.speed);
  hudDistance.textContent = `${Math.floor(STATE.distance)} m`;
  hudScore.textContent = Math.floor(STATE.score).toLocaleString("es-MX");
  hudCorrect.textContent = STATE.correctCount;
  hudShieldText.textContent = `${Math.round(STATE.shield)}%`;

  const speedPct = Math.min(
    100,
    Math.max(5, ((STATE.speed - CONFIG.minSpeed) / (CONFIG.absoluteMaxSpeed - CONFIG.minSpeed)) * 100)
  );
  speedBar.style.width = `${speedPct}%`;
  shieldBar.style.width = `${STATE.shield}%`;

  if (STATE.boostTimer > 0) {
    boostBadge.classList.add("active");
    boostTimerTrack.classList.remove("hidden");
    const boostPct = (STATE.boostTimer / CONFIG.boostDuration) * 100;
    boostBar.style.width = `${Math.min(100, boostPct)}%`;
  } else {
    boostBadge.classList.remove("active");
    boostTimerTrack.classList.add("hidden");
  }
}

/* ============================================================================
   11. MOTOR DE RENDERIZADO PSEUDO-3D NEON (CANVAS 2D)
   ============================================================================ */
function getCurveOffset(z) {
  // Curvatura nula en el plano del jugador y suave hacia el horizonte
  const distAhead = Math.max(0, z - CONFIG.playerZ);
  return Math.sin(STATE.trackZ * 0.0075) * Math.pow(distAhead / 140, 1.55) * 0.85;
}

function projectPoint(worldX, worldY, worldZ) {
  const safeZ = Math.max(4, worldZ);
  const depth = CONFIG.nearZ / safeZ; // 1.0 en el borde inferior de pantalla, -> 0 en el horizonte
  const horizonY = viewHeight * 0.42;
  const roadSpanY = viewHeight - horizonY;
  const halfRoadPx = getRoadHalfWidthPxAtNear();
  const curveX = getCurveOffset(safeZ);

  const screenX =
    viewWidth * 0.5 +
    (worldX - STATE.playerX * 0.72 + curveX) * halfRoadPx * depth;

  const screenY =
    horizonY +
    (1 - worldY / CONFIG.cameraHeight) * roadSpanY * depth;

  return { x: screenX, y: screenY, depth, halfRoadPx };
}

function renderScene() {
  ctx.save();

  // Vibración de cámara en colisiones
  if (STATE.shakeTimer > 0) {
    const sx = (Math.random() - 0.5) * STATE.shakeIntensity * 2;
    const sy = (Math.random() - 0.5) * STATE.shakeIntensity * 2;
    ctx.translate(sx, sy);
  }

  const horizonY = viewHeight * 0.42;

  // 1. Cielo Synthwave oscuro
  const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
  skyGrad.addColorStop(0, "#02030a");
  skyGrad.addColorStop(0.55, "#0b0826");
  skyGrad.addColorStop(1, "#220a42");
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, viewWidth, horizonY + 2);

  // Estrellas
  stars.forEach((st) => {
    ctx.fillStyle = `rgba(180, 240, 255, ${st.alpha})`;
    ctx.fillRect(st.x, st.y, st.size, st.size);
  });

  // 2. Sol / Núcleo energético Synthwave en el horizonte
  const sunX = viewWidth * 0.5 - STATE.playerX * 30;
  const sunY = horizonY - 14;
  const sunRadius = Math.min(viewWidth, viewHeight) * 0.135;

  const sunGlow = ctx.createRadialGradient(sunX, sunY, sunRadius * 0.2, sunX, sunY, sunRadius * 1.9);
  sunGlow.addColorStop(0, "rgba(255, 0, 127, 0.55)");
  sunGlow.addColorStop(0.5, "rgba(157, 0, 255, 0.22)");
  sunGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = sunGlow;
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunRadius * 1.9, 0, Math.PI * 2);
  ctx.fill();

  const sunBodyGrad = ctx.createLinearGradient(0, sunY - sunRadius, 0, sunY + sunRadius);
  sunBodyGrad.addColorStop(0, "#00f3ff");
  sunBodyGrad.addColorStop(0.5, "#ff007f");
  sunBodyGrad.addColorStop(1, "#9d00ff");
  ctx.fillStyle = sunBodyGrad;
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
  ctx.fill();

  // Cortes horizontales estilo retro-wave en el sol
  ctx.fillStyle = "#160830";
  for (let i = 0; i < 6; i++) {
    const cutY = sunY + i * (sunRadius * 0.15);
    const cutH = 2 + i * 1.1;
    ctx.fillRect(sunX - sunRadius, cutY, sunRadius * 2, cutH);
  }

  // 3. Horizonte urbano futurista (edificios con bordes de neón)
  renderCitySkyline(horizonY);

  // 4. Suelo exterior oscuro
  const groundGrad = ctx.createLinearGradient(0, horizonY, 0, viewHeight);
  groundGrad.addColorStop(0, "#09061c");
  groundGrad.addColorStop(1, "#03040c");
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, horizonY, viewWidth, viewHeight - horizonY);

  // Resplandor del horizonte
  ctx.strokeStyle = "#ff007f";
  ctx.lineWidth = 2;
  ctx.shadowColor = "#ff007f";
  ctx.shadowBlur = 14;
  ctx.beginPath();
  ctx.moveTo(0, horizonY);
  ctx.lineTo(viewWidth, horizonY);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // 5. Carretera en perspectiva segmento por segmento (de lejos a cerca)
  renderRoad();

  // 6. Entidades (Obstáculos y Potenciadores ordenados por profundidad)
  const sortedEntities = [...entities].sort((a, b) => b.z - a.z);
  for (const ent of sortedEntities) {
    if (ent.z >= CONFIG.nearZ - 1 && ent.z <= CONFIG.drawDistance) {
      if (ent.kind === "obstacle") {
        drawObstacle(ent);
      } else {
        drawBooster(ent);
      }
    }
  }

  // 7. Vehículo futurista del jugador en tercera persona
  drawPlayerVehicle();

  // 8. Partículas y líneas de velocidad
  renderEffects();

  ctx.restore();
}

function renderCitySkyline(horizonY) {
  const parallaxShift = -STATE.playerX * 48;
  ctx.save();
  cityBuildings.forEach((b) => {
    const bx = b.x + parallaxShift;
    const by = horizonY - b.h;

    ctx.fillStyle = "#060818";
    ctx.fillRect(bx, by, b.w, b.h);

    ctx.strokeStyle = b.neonColor;
    ctx.lineWidth = 1.2;
    ctx.strokeRect(bx, by, b.w, b.h);

    // Ventanas luminosas minimalistas
    ctx.fillStyle = b.neonColor;
    ctx.globalAlpha = 0.35;
    for (let wy = by + 10; wy < horizonY - 10; wy += 14) {
      if ((wy + b.windowsSeed) % 3 === 0) {
        ctx.fillRect(bx + 6, wy, b.w - 12, 3);
      }
    }
    ctx.globalAlpha = 1;
  });
  ctx.restore();
}

function renderRoad() {
  const segLen = CONFIG.segmentLength;
  const offsetZ = STATE.trackZ % segLen;
  const roadHalfWidth = 1.0;

  for (let z = CONFIG.drawDistance; z > CONFIG.nearZ; z -= segLen) {
    const z1 = z - offsetZ;
    const z2 = Math.max(CONFIG.nearZ, z1 - segLen);
    if (z1 <= CONFIG.nearZ) continue;

    const p1L = projectPoint(-roadHalfWidth, 0, z1);
    const p1R = projectPoint(roadHalfWidth, 0, z1);
    const p2L = projectPoint(-roadHalfWidth, 0, z2);
    const p2R = projectPoint(roadHalfWidth, 0, z2);

    const segIndex = Math.floor((STATE.trackZ + z1) / segLen);
    const isAlt = segIndex % 2 === 0;

    // Superficie de la carretera
    ctx.fillStyle = isAlt ? "#0a0e24" : "#0e1330";
    ctx.beginPath();
    ctx.moveTo(p1L.x, p1L.y);
    ctx.lineTo(p1R.x, p1R.y);
    ctx.lineTo(p2R.x, p2R.y);
    ctx.lineTo(p2L.x, p2L.y);
    ctx.closePath();
    ctx.fill();

    // Bordes luminosos exteriores (Neón cian y rosa alternados)
    const edgeColor = isAlt ? "#00f3ff" : "#ff007f";
    ctx.strokeStyle = edgeColor;
    ctx.lineWidth = Math.max(1.5, 5.5 * p2L.depth);
    ctx.beginPath();
    ctx.moveTo(p1L.x, p1L.y);
    ctx.lineTo(p2L.x, p2L.y);
    ctx.moveTo(p1R.x, p1R.y);
    ctx.lineTo(p2R.x, p2R.y);
    ctx.stroke();

    // Líneas divisorias de carriles (3 carriles)
    if (isAlt) {
      const laneDividers = [-0.33, 0.33];
      ctx.strokeStyle = "rgba(0, 243, 255, 0.65)";
      ctx.lineWidth = Math.max(1, 3.2 * p2L.depth);

      laneDividers.forEach((divX) => {
        const d1 = projectPoint(divX, 0, z1);
        const d2 = projectPoint(divX, 0, z2);
        ctx.beginPath();
        ctx.moveTo(d1.x, d1.y);
        ctx.lineTo(d2.x, d2.y);
        ctx.stroke();
      });
    }

    // Balizas laterales de neón cada 4 segmentos para reforzar la sensación de velocidad
    if (segIndex % 4 === 0) {
      const postLTop = projectPoint(-1.14, 0.65, z2);
      const postLBot = projectPoint(-1.14, 0, z2);
      const postRTop = projectPoint(1.14, 0.65, z2);
      const postRBot = projectPoint(1.14, 0, z2);

      ctx.strokeStyle = "rgba(157, 0, 255, 0.75)";
      ctx.lineWidth = Math.max(1.2, 3 * p2L.depth);
      ctx.beginPath();
      ctx.moveTo(postLBot.x, postLBot.y);
      ctx.lineTo(postLTop.x, postLTop.y);
      ctx.moveTo(postRBot.x, postRBot.y);
      ctx.lineTo(postRTop.x, postRTop.y);
      ctx.stroke();

      ctx.fillStyle = "#00f3ff";
      const beaconR = Math.max(1.5, 4 * p2L.depth);
      ctx.beginPath();
      ctx.arc(postLTop.x, postLTop.y, beaconR, 0, Math.PI * 2);
      ctx.arc(postRTop.x, postRTop.y, beaconR, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawObstacle(ent) {
  const base = projectPoint(ent.x, 0, ent.z);
  const unitW = ent.width * base.halfRoadPx * base.depth;
  const unitH = unitW * 1.1;

  ctx.save();
  ctx.translate(base.x, base.y);

  // Sombra proyectada en pista
  ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
  ctx.beginPath();
  ctx.ellipse(0, 0, unitW * 0.6, unitW * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();

  if (ent.type === "rock") {
    // Roca cristalina oscura con vetas de neón magenta
    ctx.fillStyle = "#16102b";
    ctx.strokeStyle = "#ff007f";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#ff007f";
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.moveTo(-unitW * 0.55, 0);
    ctx.lineTo(-unitW * 0.42, -unitH * 0.68);
    ctx.lineTo(0, -unitH * 0.95);
    ctx.lineTo(unitW * 0.48, -unitH * 0.6);
    ctx.lineTo(unitW * 0.55, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Veta interna
    ctx.beginPath();
    ctx.moveTo(-unitW * 0.15, -unitH * 0.15);
    ctx.lineTo(0, -unitH * 0.72);
    ctx.lineTo(unitW * 0.22, -unitH * 0.3);
    ctx.stroke();
  } else if (ent.type === "cone") {
    // Cono de tráfico holográfico con anillo de luz
    ctx.fillStyle = "#24112e";
    ctx.strokeStyle = "#ffbe0b";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#ffbe0b";
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.moveTo(-unitW * 0.42, 0);
    ctx.lineTo(0, -unitH * 0.92);
    ctx.lineTo(unitW * 0.42, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Franja luminosa central
    ctx.strokeStyle = "#ff007f";
    ctx.beginPath();
    ctx.moveTo(-unitW * 0.22, -unitH * 0.45);
    ctx.lineTo(unitW * 0.22, -unitH * 0.45);
    ctx.stroke();
  } else if (ent.type === "barrier") {
    // Barrera de carretera láser
    const postW = unitW * 0.14;
    const barH = unitH * 0.68;

    ctx.fillStyle = "#121a38";
    ctx.strokeStyle = "#00f3ff";
    ctx.lineWidth = 1.8;
    ctx.fillRect(-unitW * 0.55, -barH, postW, barH);
    ctx.strokeRect(-unitW * 0.55, -barH, postW, barH);
    ctx.fillRect(unitW * 0.55 - postW, -barH, postW, barH);
    ctx.strokeRect(unitW * 0.55 - postW, -barH, postW, barH);

    // Haz de energía rojo/rosa
    ctx.fillStyle = "rgba(255, 0, 127, 0.35)";
    ctx.strokeStyle = "#ff2a5f";
    ctx.shadowColor = "#ff2a5f";
    ctx.shadowBlur = 12;
    ctx.fillRect(-unitW * 0.42, -barH * 0.82, unitW * 0.84, barH * 0.48);
    ctx.strokeRect(-unitW * 0.42, -barH * 0.82, unitW * 0.84, barH * 0.48);
  } else {
    // Pilón de plasma vertical
    ctx.fillStyle = "#101633";
    ctx.strokeStyle = "#9d00ff";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#9d00ff";
    ctx.shadowBlur = 12;

    ctx.fillRect(-unitW * 0.22, -unitH * 1.05, unitW * 0.44, unitH * 1.05);
    ctx.strokeRect(-unitW * 0.22, -unitH * 1.05, unitW * 0.44, unitH * 1.05);

    ctx.fillStyle = "#00f3ff";
    ctx.beginPath();
    ctx.arc(0, -unitH * 1.12, unitW * 0.18, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawBooster(ent) {
  const hoverY = 0.28 + Math.sin(ent.pulse) * 0.08;
  const pos = projectPoint(ent.x, hoverY, ent.z);
  const radius = Math.max(5, ent.width * pos.halfRoadPx * pos.depth * 0.65);

  ctx.save();
  ctx.translate(pos.x, pos.y);

  // Halo exterior pulsante
  const glow = ctx.createRadialGradient(0, 0, radius * 0.1, 0, 0, radius * 1.6);
  glow.addColorStop(0, "rgba(0, 255, 157, 0.85)");
  glow.addColorStop(0.55, "rgba(0, 243, 255, 0.35)");
  glow.addColorStop(1, "rgba(0, 243, 255, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 1.6, 0, Math.PI * 2);
  ctx.fill();

  // Anillo orbital de neón
  ctx.strokeStyle = "#00ff9d";
  ctx.lineWidth = 2.4;
  ctx.shadowColor = "#00ff9d";
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.85, 0, Math.PI * 2);
  ctx.stroke();

  // Núcleo romboidal giratorio
  ctx.rotate(ent.pulse * 0.8);
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(0, -radius * 0.52);
  ctx.lineTo(radius * 0.52, 0);
  ctx.lineTo(0, radius * 0.52);
  ctx.lineTo(-radius * 0.52, 0);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawPlayerVehicle() {
  const pos = projectPoint(STATE.playerX, 0, CONFIG.playerZ);
  const roadWidthAtPlayer = pos.halfRoadPx * pos.depth * 2;
  const carW = Math.max(56, Math.min(132, roadWidthAtPlayer * 0.18));
  const carH = carW * 0.52;
  const isBoosting = STATE.boostTimer > 0;

  ctx.save();
  ctx.translate(pos.x, pos.y);
  ctx.rotate(STATE.playerTilt);

  // Luz inferior proyectada sobre el asfalto (underglow)
  const underglow = ctx.createRadialGradient(0, 4, 6, 0, 4, carW * 0.82);
  underglow.addColorStop(0, isBoosting ? "rgba(0, 255, 157, 0.65)" : "rgba(0, 243, 255, 0.55)");
  underglow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = underglow;
  ctx.beginPath();
  ctx.ellipse(0, 4, carW * 0.78, carH * 0.34, 0, 0, Math.PI * 2);
  ctx.fill();

  // Neumáticos traseros anchos estilo cyber-interceptor
  ctx.fillStyle = "#070914";
  ctx.strokeStyle = "#00f3ff";
  ctx.lineWidth = 1.6;
  ctx.fillRect(-carW * 0.54, -carH * 0.34, carW * 0.18, carH * 0.42);
  ctx.strokeRect(-carW * 0.54, -carH * 0.34, carW * 0.18, carH * 0.42);
  ctx.fillRect(carW * 0.36, -carH * 0.34, carW * 0.18, carH * 0.42);
  ctx.strokeRect(carW * 0.36, -carH * 0.34, carW * 0.18, carH * 0.42);

  // Carrocería principal aerodinámica
  const bodyGrad = ctx.createLinearGradient(0, -carH, 0, 4);
  bodyGrad.addColorStop(0, "#1d2754");
  bodyGrad.addColorStop(0.5, "#0d122b");
  bodyGrad.addColorStop(1, "#060814");

  ctx.fillStyle = bodyGrad;
  ctx.strokeStyle = isBoosting ? "#00ff9d" : "#00f3ff";
  ctx.lineWidth = 2.2;
  ctx.shadowColor = isBoosting ? "#00ff9d" : "#00f3ff";
  ctx.shadowBlur = 14;

  ctx.beginPath();
  ctx.moveTo(-carW * 0.48, 0);
  ctx.lineTo(-carW * 0.42, -carH * 0.52);
  ctx.lineTo(-carW * 0.24, -carH * 0.92);
  ctx.lineTo(carW * 0.24, -carH * 0.92);
  ctx.lineTo(carW * 0.42, -carH * 0.52);
  ctx.lineTo(carW * 0.48, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Cabina polarizada
  ctx.fillStyle = "#050712";
  ctx.strokeStyle = "#9d00ff";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-carW * 0.25, -carH * 0.54);
  ctx.lineTo(-carW * 0.17, -carH * 0.85);
  ctx.lineTo(carW * 0.17, -carH * 0.85);
  ctx.lineTo(carW * 0.25, -carH * 0.54);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Alerón trasero de neón rosa
  ctx.strokeStyle = "#ff007f";
  ctx.shadowColor = "#ff007f";
  ctx.shadowBlur = 12;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-carW * 0.48, -carH * 0.62);
  ctx.lineTo(carW * 0.48, -carH * 0.62);
  ctx.stroke();

  // Franja de luz trasera continua
  ctx.fillStyle = "#ff007f";
  ctx.fillRect(-carW * 0.36, -carH * 0.36, carW * 0.72, carH * 0.11);

  // Propulsores de plasma duales
  const flamePulse = 0.85 + Math.random() * 0.35;
  const flameLen = (isBoosting ? carH * 0.62 : carH * 0.32) * flamePulse;
  const thrusterOffsets = [-carW * 0.2, carW * 0.2];

  thrusterOffsets.forEach((tx) => {
    const flameGrad = ctx.createLinearGradient(tx, -carH * 0.16, tx, -carH * 0.16 + flameLen);
    flameGrad.addColorStop(0, "#ffffff");
    flameGrad.addColorStop(0.4, isBoosting ? "#00ff9d" : "#00f3ff");
    flameGrad.addColorStop(1, "rgba(0, 243, 255, 0)");

    ctx.fillStyle = flameGrad;
    ctx.beginPath();
    ctx.moveTo(tx - carW * 0.06, -carH * 0.16);
    ctx.lineTo(tx + carW * 0.06, -carH * 0.16);
    ctx.lineTo(tx, -carH * 0.16 + flameLen);
    ctx.closePath();
    ctx.fill();
  });

  ctx.restore();
}

function renderEffects() {
  // Líneas de velocidad laterales
  speedLines.forEach((line) => {
    ctx.strokeStyle = line.color;
    ctx.globalAlpha = Math.max(0, line.alpha);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(line.x, line.y);
    ctx.lineTo(line.x, line.y + line.len);
    ctx.stroke();
  });
  ctx.globalAlpha = 1;

  // Partículas de colisión y energía
  particles.forEach((p) => {
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 8;
    ctx.fillRect(p.x - p.size * 0.5, p.y - p.size * 0.5, p.size, p.size);
  });
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
}

/* ============================================================================
   12. BUCLE PRINCIPAL DE ANIMACIÓN (requestAnimationFrame)
   ============================================================================ */
let lastTimestamp = 0;

function gameLoop(timestamp) {
  if (!lastTimestamp) lastTimestamp = timestamp;
  const rawDt = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  // Limitar delta time para evitar saltos bruscos al cambiar de pestaña o modal
  const dt = Math.min(rawDt, 0.05);

  if (STATE.mode === "PLAYING") {
    updateSimulation(dt);
  } else if (STATE.mode === "START") {
    // Animación ambiental suave de la pista en la pantalla de inicio
    STATE.trackZ += 36 * dt;
  }

  renderScene();
  requestAnimationFrame(gameLoop);
}

/* ============================================================================
   13. EVENTOS DE TECLADO, RATÓN Y CONTROLES TÁCTILES
   ============================================================================ */
window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  if (key === "a" || e.key === "ArrowLeft") {
    keys.left = true;
  } else if (key === "d" || e.key === "ArrowRight") {
    keys.right = true;
  } else if (key === "p" || e.key === "Escape") {
    if (STATE.mode === "PLAYING" || STATE.mode === "PAUSED") {
      togglePause();
    }
  } else if (key === "r") {
    if (STATE.mode === "PLAYING" || STATE.mode === "PAUSED") {
      startGame();
    }
  } else if (STATE.mode === "QUIZ") {
    if (!STATE.questionAnswered) {
      if (key === "1" || key === "a") handleQuizAnswer(0);
      if (key === "2" || key === "b") handleQuizAnswer(1);
      if (key === "3" || key === "c") handleQuizAnswer(2);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      resumeFromQuiz();
    }
  }
});

window.addEventListener("keyup", (e) => {
  const key = e.key.toLowerCase();
  if (key === "a" || e.key === "ArrowLeft") {
    keys.left = false;
  } else if (key === "d" || e.key === "ArrowRight") {
    keys.right = false;
  }
});

// Controles táctiles y de puntero en botones laterales
function bindTouchButton(element, direction) {
  const press = (e) => {
    e.preventDefault();
    keys[direction] = true;
    element.classList.add("pressed");
  };
  const release = (e) => {
    e.preventDefault();
    keys[direction] = false;
    element.classList.remove("pressed");
  };

  element.addEventListener("touchstart", press, { passive: false });
  element.addEventListener("touchend", release, { passive: false });
  element.addEventListener("touchcancel", release, { passive: false });
  element.addEventListener("mousedown", press);
  element.addEventListener("mouseup", release);
  element.addEventListener("mouseleave", release);
}

bindTouchButton(touchLeft, "left");
bindTouchButton(touchRight, "right");

// Botones de interfaz
document.getElementById("btn-start").addEventListener("click", startGame);
document.getElementById("btn-play-again").addEventListener("click", startGame);
document.getElementById("btn-pause").addEventListener("click", togglePause);
document.getElementById("btn-resume").addEventListener("click", togglePause);
document.getElementById("btn-restart").addEventListener("click", startGame);
document.getElementById("btn-pause-restart").addEventListener("click", startGame);

const btnSound = document.getElementById("btn-sound");
btnSound.addEventListener("click", () => {
  const active = sound.toggle();
  btnSound.textContent = active ? "AUDIO: ON" : "AUDIO: OFF";
});

// Botones de opciones del cuestionario de Cálculo Vectorial
quizOptionBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const idx = Number(btn.dataset.index);
    handleQuizAnswer(idx);
  });
});

btnQuizContinue.addEventListener("click", resumeFromQuiz);

// Iniciar el ciclo de renderizado
requestAnimationFrame(gameLoop);