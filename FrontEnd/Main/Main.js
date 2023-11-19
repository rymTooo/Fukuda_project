
//updating money
let money = 0;
let passiveMoney = 0;

function updateMoney() {
    money += passiveMoney;
    document.getElementById('money').textContent = money;
}
setInterval(updateMoney, 1000); // Update score every second


//switching tab
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tabContent');
    tabs.forEach(tab => (tab.style.display = 'none'));

    const selectedTab = document.getElementById(tabId);
    selectedTab.style.display = 'flex';
    if (tabId === 'statistics') {
        updateStatistics();
    }
    if (tabId === 'powerups') {
        updatePower();
    }
}

function updatePower() {
    // Example variables, replace them with your actual variables
    let pow1Price = 10;
    let pow2Price = 50;
    let pow3Price = 100;
    let pow4Price = 500;
    let pow1Name = "Oil";
    let pow2Name = "Titanium";
    let pow3Name = "Grinder";
    let pow4Name = "Cloud";

    // Update the content of each statistic element
    document.getElementById('pow1Name').textContent = pow1Name;
    document.getElementById('pow2Name').textContent = pow2Name;
    document.getElementById('pow3Name').textContent = pow3Name;
    document.getElementById('pow4Name').textContent = pow4Name;
    document.getElementById('pow1Price').textContent = pow1Price;
    document.getElementById('pow2Price').textContent = pow2Price;
    document.getElementById('pow3Price').textContent = pow3Price;
    document.getElementById('pow4Price').textContent = pow4Price;
}

function updateStatistics() {
    // Example variables, replace them with your actual variables
    const currentMoney = 1000;
    const allTimeClicks = 500;
    const allTimeMoney = 1500;
    const passiveIncome = 200;
    const moneyPerClick = 2;

    // Update the content of each statistic element
    document.getElementById('CurMoneyStat').textContent = currentMoney;
    document.getElementById('AllClickStat').textContent = allTimeClicks;
    document.getElementById('AllMoneyStat').textContent = allTimeMoney;
    document.getElementById('PassiveStat').textContent = passiveIncome;
    document.getElementById('PerClickStat').textContent = moneyPerClick;
}

//Clicking
const swordman = document.getElementById('swordman');

hitbox.addEventListener('click', () => {
    swordman.classList.add('SwingAnim');
    money++;
    document.getElementById('money').textContent = money;
    setTimeout(() => {
        swordman.classList.remove('SwingAnim');
    }, 700); // Adjust based on your swing animation duration
});