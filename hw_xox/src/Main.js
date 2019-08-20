window.addEventListener('load', function() {
    const game = new Game();
    const board = new Board();
    const status = new Status();

    board.init(game, status);
    game.init(status, board);

    board.render_map();
    board.init_event_handlers();
});