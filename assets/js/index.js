window.onload = () => {
  const game = new Game("game-canvas");

  document.addEventListener("keypress", () => {
    if (!game.hasStarted()) {
      game.start();
    }
  });

  document.addEventListener('keydown', () => {
    game.onKeyEvent(event)
  })
  
  document.addEventListener('keyup', () => {
    game.onKeyEvent(event)
  })
};
