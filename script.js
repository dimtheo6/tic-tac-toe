function gameboard() {

    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    return board

}

let game = gameboard();

(function gameStart() {
    const start = document.querySelector('.gameStart');
    const reset = document.getElementById('reset');

    start.addEventListener('click', () => {

        reset.style.display = 'block';
        gameController(game);

    })

})();






function gameController(board) {
    const container = document.getElementsByClassName('board')[0];
    let activePlayer = 0;

    const Player = [{
        name: 'Player 1',
        token: 'x'
    }, {
        name: 'Player 2',
        token: 'o'
    }];


    (function display() {

        container.innerHTML = '';

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                let cell = document.createElement('div');
                cell.classList.add('cell')
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.innerHTML = board[i][j];
                container.appendChild(cell);
            }

        }

    })();


    function playerSelection() {

        let endgame = false;
        let turn = document.querySelector('.playerTurn');
        const cells = document.querySelectorAll(`.cell`);

        turn.textContent = `${Player[activePlayer].name} turn `;

        if (endgame === false) {
            cells.forEach(cell => {
                cell.addEventListener('click', () => {
                    const row = cell.dataset.row;
                    const col = cell.dataset.col;
                    if (board[row][col] === '' && endgame === false) { // Check if the cell is already filled
                        board[row][col] = Player[activePlayer].token;
                        cell.textContent = Player[activePlayer].token;

                        if (checkWin(parseInt(row), parseInt(col), Player[activePlayer].token)) {
                            turn.textContent = `${Player[activePlayer].name} wins!`;
                            endgame = true;

                        } else if (isBoardFull()) {
                            turn.textContent = `DRAW`
                            endgame = true;

                        } else {
                            changePlayer();
                            turn.textContent = `${Player[activePlayer].name} turn `;
                        }

                    }

                });
            })
        }

    };


    function checkWin(row, col, token) {

        if (board[row].every(cell => cell === token)) {
            return true;
        }

        if (board.every(row => row[col] === token)) {
            return true;
        }

        if (row === col && board.every((row, index) => row[index] === token)) {
            return true;
        }

        if (row + col === 2 && board.every((row, index) => board[index][2 - index] === token)) {
            return true;
        }

        return false;
    }

    function isBoardFull() {
        return board.every(row => row.every(cell => cell !== ''));
    }

    function changePlayer() {
        activePlayer = activePlayer === 0 ? 1 : 0;

    }


    document.querySelector('.reset').addEventListener('click', () => {
        boardReset();
    })


    function boardReset() {
        const cells = document.querySelectorAll('.cell');
        activePlayer = 0;



        document.querySelector('.playerTurn').textContent = `${Player[activePlayer].name} turn `;

        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];

        cells.forEach(cell => {
            cell.innerHTML = '';
        });

        playerSelection();

    }
    playerSelection()
};
