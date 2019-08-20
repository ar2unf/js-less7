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