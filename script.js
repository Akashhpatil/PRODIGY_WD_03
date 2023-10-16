document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    const optionsContainer = document.getElementById('options-container');
    const gameContainer = document.getElementById('game-container');
    const playWithFriendButton = document.getElementById('playWithFriend');
    const playWithAIButton = document.getElementById('playWithAI');

    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let playWithAI = false;

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                document.getElementById(a).classList.add('win');
                document.getElementById(b).classList.add('win');
                document.getElementById(c).classList.add('win');
                setTimeout(() => alert(`${currentPlayer} wins!`), 100);
                return;
            }
        }

        if (!board.includes('')) {
            gameActive = false;
            setTimeout(() => alert('It\'s a draw!'), 100);
            return;
        }
    };

    const makeAIMove = () => {
        if (currentPlayer === 'O' && gameActive && playWithAI) {
            let availableMoves = board.reduce((acc, val, index) => (val === '' ? acc.concat(index) : acc), []);
            let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            handleClick(randomMove);
        }
    };

    const handleClick = (index) => {
        if (board[index] || !gameActive) return;
    
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        checkWinner();
    
        if (gameActive) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
    
            if (currentPlayer === 'O' && playWithAI) {
                setTimeout(() => makeAIMove(), 500); // AI makes a move after a short delay
            }
        }
    };
    

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleClick(index));
    });

    playWithFriendButton.addEventListener('click', () => {
        playWithAI = false;
        status.textContent = `Player X's turn`;
        optionsContainer.style.display = 'none';
        gameContainer.style.display = 'block';
    });

    playWithAIButton.addEventListener('click', () => {
        playWithAI = true;
        status.textContent = `Player X's turn`;
        currentPlayer = 'X';
        makeAIMove();
        optionsContainer.style.display = 'none';
        gameContainer.style.display = 'block';
    });

    resetButton.addEventListener('click', () => {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('win');
        });
        currentPlayer = 'X';
        gameActive = true;
        status.textContent = `Player ${currentPlayer}'s turn`;
        optionsContainer.style.display = 'block';
        gameContainer.style.display = 'none';
    });
});
