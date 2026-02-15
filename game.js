// Состояние игры
let game = {
    goals: 0,
    shots: 0,
    keeperPosition: 'center'
};

// Элементы DOM
const goalkeeper = document.getElementById('goalkeeper');
const ball = document.getElementById('ball');
const resultDiv = document.getElementById('result');
const statsDiv = document.getElementById('stats');

// Позиции вратаря
const positions = {
    left: '20%',
    center: '50%',
    right: '80%'
};

// Обновление статистики
function updateStats() {
    statsDiv.textContent = `Голы: ${game.goals} | Удары: ${game.shots}`;
}

// Случайная позиция вратаря
function randomKeeperPosition() {
    const posKeys = ['left', 'center', 'right'];
    const randomPos = posKeys[Math.floor(Math.random() * 3)];
    game.keeperPosition = randomPos;
    goalkeeper.style.left = positions[randomPos];
    goalkeeper.style.transform = 'translateX(-50%)';
}

// Удар по воротам
function shoot(playerShot) {
    // Добавляем анимацию мяча
    ball.classList.add('shot');
    
    // Показываем куда полетел мяч
    let shotText = '';
    switch(playerShot) {
        case 'left': shotText = 'Левый угол'; break;
        case 'center': shotText = 'Центр'; break;
        case 'right': shotText = 'Правый угол'; break;
    }
    
    // Проверяем результат
    setTimeout(() => {
        let result = '';
        
        if (playerShot === game.keeperPosition) {
            result = `🧤 Сейв! (${shotText})`;
            resultDiv.className = 'result save';
        } else {
            result = `⚽ ГОЛ! (${shotText})`;
            resultDiv.className = 'result goal';
            game.goals++;
        }
        
        resultDiv.textContent = result;
        game.shots++;
        updateStats();
        
        // Убираем анимацию мяча
        ball.classList.remove('shot');
        
        // Вратарь двигается на новую позицию
        randomKeeperPosition();
        
    }, 500);
}

// Начало игры
randomKeeperPosition();
updateStats();
