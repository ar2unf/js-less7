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