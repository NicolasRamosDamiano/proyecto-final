const botonTema = document.getElementById('boton-tema');
const raiz = document.documentElement; 
const temaGuardado = localStorage.getItem('tema');
const temaPreferidoSistema = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'oscuro'
  : 'claro';

function aplicarTema(tema) {
  raiz.setAttribute('data-tema', tema);
  localStorage.setItem('tema', tema);
  botonTema.textContent = tema === 'oscuro' ? '🌙' : '☀️';
}

if (temaGuardado) {
  aplicarTema(temaGuardado);
} else {
  aplicarTema(temaPreferidoSistema);
}

botonTema.addEventListener('click', () => {
  const temaActual = raiz.getAttribute('data-tema');
  const nuevoTema = temaActual === 'oscuro' ? 'claro' : 'oscuro';
  aplicarTema(nuevoTema);
});
