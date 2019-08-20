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