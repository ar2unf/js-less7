class Board {
    constructor() {
        this.game_table_element = document.getElementById('game');
    }

    //инициализируем доску
    init(game, status) {
        this.game = game;
        this.status = status;
    }

    //рисуем поле
    render_map() {
        for (let row = 0; row < 3; row++) {
            const tr = document.createElement('tr');
            this.game_table_element.appendChild(tr);
            for (let col = 0; col < 3; col++) {
                let td = document.createElement('td');
                td.dataset.row = row.toString();
                td.dataset.col = col.toString();
                tr.appendChild(td);
            }
        }
    }

    // включаем обработку кликов
    init_event_handlers() {
        // Ставим обработчик, при клике на таблицу вызовется функция this_cell_click_handler.
        this.game_table_element.addEventListener('click', event => this.game.cell_click_handler(event));

    }

    // клик по ячейке?
    is_click_by_cell(event) {
        console.log(event.target.tagName);
        return event.target.tagName == 'TD';
    }

    // ячейка пустая?
    is_cell_empty(event) {
        // Получаем строку и колонку куда кликнули.
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;
        console.log(this.status.map_val[row][col]);

        return this.status.map_val[row][col] === '';
    }

    // запоним ячеку
    fill_cell(event) {
        // Получаем строку и колонку куда кликнули.
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;
        console.log(event);   

        // заполним ячейку и заполним массив координат
        this.status.map_val[row][col] = this.status.phase;
        event.target.textContent = this.status.phase;
    }
}
class Game {

    //класс игры инициализируем другие объекты
    init(status, board) {
        this.status = status;
        this.board = board;
    }

    // функция обработки клика
    cell_click_handler(event) {
        // Если клик не обрабатывать.
        if (!this.is_correct_click(event)) {

            return;
        }
        this.board.fill_cell(event);
        if (this.win()) {
            // Ставим статус в "остановлено".
            this.status.set_status_stopped();
            // Сообщаем о победе пользователя.
            this.say_win();
        }

        // Меняем фигуру (крестик или нолик).
        this.status.toggle_symb();
    }

    // проверям клик на пустоту ячейки, на активность игры и на то что клик был на ячейке таблицы
    is_correct_click(event) {
        console.log(this.board.is_cell_empty(event));
        return this.status.is_status_playing() && this.board.is_click_by_cell(event) && this.board.is_cell_empty(event);
    }

    // карта выйгрышей
    win() {
        return this.is_line_win({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }) ||
               this.is_line_win({ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }) ||
               this.is_line_win({ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }) ||

               this.is_line_win({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }) ||
               this.is_line_win({ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }) ||
               this.is_line_win({ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }) ||

               this.is_line_win({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }) ||
               this.is_line_win({ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 });
    }

    // выйграл?
    is_line_win(x, y, z) {
        let value = this.status.map_val[x.y][x.x] + this.status.map_val[y.y][y.x] + this.status.map_val[z.y][z.x];
        return value === 'XXX' || value === '000';
    }

    //победа
    say_win() {
        let figure = this.status.phase === 'X' ? 'Крестики' : 'Нолики';
        alert (figure+" выиграли!");
    }
}
window.addEventListener('load', function() {
    const game = new Game();
    const board = new Board();
    const status = new Status();

    board.init(game, status);
    game.init(status, board);

    board.render_map();
    board.init_event_handlers();
});
class Status {
    constructor() {
        this.status = 'playing'; // изначально играем
        this.map_val = [ // массив координат
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
        this.phase = 'X'; // за кресты
    }

    // играем?
    is_status_playing() {
        return this.status === 'playing';
    }

    // не играем
    set_status_stopped() {
        this.status = 'stopped';
    }

    // смена символа
    toggle_symb() {
        this.phase = this.phase === 'X' ? '0' : 'X';
    }
}
//# sourceMappingURL=maps/app.js.map
