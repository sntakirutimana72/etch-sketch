const onReady = () => {
  CanvasJob.render('nav');
};

window.addEventListener('resize', onReady);
document.addEventListener('DOMContentLoaded', onReady);
document.addEventListener('click', ({ target }) => {
  if (target.classList.contains('grid-cell')) {
    CanvasJob.paint(target);
  } else {
    return true;
  }
})
Selectors.query('#rescale').addEventListener('click', () => { CanvasJob.setGridSize() });
Selectors.query('#erase').addEventListener('click', eraseAll);
Selectors.query('#toggle-nav').addEventListener('click', toggleNavigation)
