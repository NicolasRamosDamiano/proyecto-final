// Seleccionamos elementos importantes
const botonTema = document.getElementById('boton-tema');
const raiz = document.documentElement; // <html>

// Revisar si hay un tema guardado en localStorage
const temaGuardado = localStorage.getItem('tema');

// Detectar preferencia del sistema (oscuro o claro)
const temaPreferidoSistema = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'oscuro'
  : 'claro';

// Función para aplicar el tema
function aplicarTema(tema) {
  raiz.setAttribute('data-tema', tema);
  localStorage.setItem('tema', tema);
  botonTema.textContent = tema === 'oscuro' ? '🌙' : '☀️';
}

// Tema inicial: guardado > sistema > claro
if (temaGuardado) {
  aplicarTema(temaGuardado);
} else {
  aplicarTema(temaPreferidoSistema);
}

// Evento al hacer clic en el botón
botonTema.addEventListener('click', () => {
  const temaActual = raiz.getAttribute('data-tema');
  const nuevoTema = temaActual === 'oscuro' ? 'claro' : 'oscuro';
  aplicarTema(nuevoTema);
});
