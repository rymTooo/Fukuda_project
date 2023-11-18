function showTab(tabId) {
    const tabs = document.querySelectorAll('.tabContent');
    tabs.forEach(tab => (tab.style.display = 'none'));

    const selectedTab = document.getElementById(tabId);
    selectedTab.style.display = 'flex';
    if (tabId === 'statistics') {
        updateStatistics();
    }
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

//Swing Animation
const swordman = document.getElementById('swordman');

hitbox.addEventListener('click', () => {
    swordman.classList.add('SwingAnim');
    setTimeout(() => {
        swordman.classList.remove('SwingAnim');
    }, 700); // Adjust based on your swing animation duration
});