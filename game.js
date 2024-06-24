// 初始化玩家资金
let money = 1000;
// 当前下注金额
let currentBet = 0;
// 游戏状态提示
let gameStatus = '';

// 下注函数
function placeBet() {
    const betAmount = document.getElementById('bet-amount').value;
    if (betAmount) {
        currentBet = parseInt(betAmount);
        if (currentBet > money) {
            alert('下注金额不能超过你的资金！');
            return;
        }
        document.getElementById('game-status').textContent = `下注成功，金额：${currentBet}元`;
    } else {
        alert('请输入下注金额！');
    }
}

// 掷色子函数
function rollDice() {
    if (currentBet === 0) {
        alert('请先下注！');
        return;
    }
    
    // 检查玩家资金是否充足
    if (money < currentBet) {
        alert('你的资金不足以支持这次下注。');
        return;
    }

    // 掷两个色子，返回2到12的随机数
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const total = dice1 + dice2;
    document.getElementById('dice-result').textContent = `掷出的点数是：${dice1} + ${dice2} = ${total}`;

    // 根据点数判断游戏结果
    if (total === 7 || total === 11) {
        money += currentBet;
        document.getElementById('money-amount').textContent = money;
        gameStatus = '你赢了!';
    } else if (total === 2 || total === 3 || total === 12) {
        money -= currentBet;
        document.getElementById('money-amount').textContent = money;
        gameStatus = '庄家赢了!';
    } else {
        gameStatus = `点数为${total}，继续掷色子...`;
        // 这里可以添加额外的逻辑来处理非获胜/输掉游戏的情况
    }

    document.getElementById('game-status').textContent = gameStatus;
}

// 确保游戏结束后重置状态
document.getElementById('bet-amount').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        placeBet();
    }
});