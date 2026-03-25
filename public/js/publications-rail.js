document.addEventListener('DOMContentLoaded', function() {
  const rail = document.querySelector('.publications-rail');
  const leftBtn = document.querySelector('.rail-nav--left');
  const rightBtn = document.querySelector('.rail-nav--right');
  
  if (!rail || !leftBtn || !rightBtn) {
    console.log('Elementos no encontrados');
    return;
  }
  
  const scrollAmount = 400;
  
  // Navegación izquierda
  leftBtn.addEventListener('click', function(e) {
    e.preventDefault();
    rail.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });
  
  // Navegación derecha
  rightBtn.addEventListener('click', function(e) {
    e.preventDefault();
    rail.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });
  
  // Actualizar visibilidad de botones
  function updateButtons() {
    const scrollLeft = rail.scrollLeft;
    const maxScroll = rail.scrollWidth - rail.clientWidth;
    
    if (scrollLeft <= 0) {
      leftBtn.style.opacity = '0.3';
      leftBtn.style.pointerEvents = 'none';
    } else {
      leftBtn.style.opacity = '1';
      leftBtn.style.pointerEvents = 'auto';
    }
    
    if (scrollLeft >= maxScroll - 1) {
      rightBtn.style.opacity = '0.3';
      rightBtn.style.pointerEvents = 'none';
    } else {
      rightBtn.style.opacity = '1';
      rightBtn.style.pointerEvents = 'auto';
    }
  }
  
  rail.addEventListener('scroll', updateButtons);
  window.addEventListener('resize', updateButtons);
  
  // Inicializar
  setTimeout(updateButtons, 100);
  
  // Soporte para arrastrar con mouse
  let isDown = false;
  let startX;
  let scrollLeftStart;
  
  rail.addEventListener('mousedown', function(e) {
    isDown = true;
    rail.style.cursor = 'grabbing';
    startX = e.pageX - rail.offsetLeft;
    scrollLeftStart = rail.scrollLeft;
  });
  
  rail.addEventListener('mouseleave', function() {
    isDown = false;
    rail.style.cursor = 'grab';
  });
  
  rail.addEventListener('mouseup', function() {
    isDown = false;
    rail.style.cursor = 'grab';
  });
  
  rail.addEventListener('mousemove', function(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - rail.offsetLeft;
    const walk = (x - startX) * 2;
    rail.scrollLeft = scrollLeftStart - walk;
  });
});