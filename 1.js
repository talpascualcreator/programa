// Lista de imágenes para el juego
const imagenesCartas = [
  'respiracion.jpg',
  'respiracion.jpg',
  'sonidos.jpg',
  'sonidos.jpg',
  'nota.jpg',
  'nota.jpg',
  'agil.jpg',
  'agil.jpg',
];

let cronometro; // Variable para almacenar el temporizador
let tiempoInicio; // Variable para almacenar el tiempo de inicio

function barajarCartas() {
  imagenesCartas.sort(() => Math.random() - 0.5);
  const cartas = document.querySelectorAll('.carta');
  cartas.forEach((carta, index) => {
    carta.style.order = index;
    carta.classList.remove('volteada', 'coincidencia');
    carta.dataset.imagen = imagenesCartas[index];
    carta.addEventListener('click', voltearCarta);
  });
  iniciarCronometro();
}

function iniciarCronometro() {
  tiempoInicio = new Date().getTime();
  cronometro = setInterval(actualizarCronometro, 1000); // Actualiza cada segundo
}

function detenerCronometro() {
  clearInterval(cronometro);
}

function actualizarCronometro() {
  const tiempoActual = new Date().getTime();
  const tiempoTranscurrido = tiempoActual - tiempoInicio;
  const segundos = Math.floor(tiempoTranscurrido / 1000);
  const minutos = Math.floor(segundos / 60);
  const segundosMostrar = segundos % 60;

  const cronometroElement = document.getElementById('cronometro');
  cronometroElement.textContent = `Tiempo: ${minutos}:${segundosMostrar}`;
}

function voltearCarta() {
  if (this.classList.contains('volteada')) return;
  this.classList.add('volteada');
  const cartasVolteadas = document.querySelectorAll('.volteada');
  if (cartasVolteadas.length === 2) {
    const [primeraCarta, segundaCarta] = cartasVolteadas;
    if (primeraCarta.dataset.imagen === segundaCarta.dataset.imagen) {
      primeraCarta.classList.add('coincidencia');
      segundaCarta.classList.add('coincidencia');
    }
    setTimeout(() => {
      cartasVolteadas.forEach(carta => carta.classList.remove('volteada'));
      verificarVictoria();
    }, 1000);
  }
}

function verificarVictoria() {
  const cartasCoincidentes = document.querySelectorAll('.coincidencia');
  if (cartasCoincidentes.length === imagenesCartas.length) {
    const mensajeVictoria = document.getElementById('mensaje-victoria');
    mensajeVictoria.classList.add('aparecer');
    detenerCronometro(); // Detiene el cronómetro al ganar
  }
}

barajarCartas();

const mensajeVictoria = document.getElementById('mensaje-victoria');
mensajeVictoria.addEventListener('click', () => {
  mensajeVictoria.style.display = 'none';
  mensajeVictoria.classList.remove('aparecer');
  barajarCartas();
  document.getElementById('cronometro').textContent = 'Tiempo: 0:0'; // Reinicia el cronómetro
});

