function showTab(tabId) {
    const tabs = document.querySelectorAll('.tabContent');
    tabs.forEach(tab => tab.classList.remove('active'));
    const selectedTab = document.getElementById(tabId);
    selectedTab.classList.add('active');
}

const swordman = document.getElementById('swordman');

swordman.addEventListener('click', () => {
    swordman.classList.add('SwingAnim');
    setTimeout(() => {
        swordman.classList.remove('SwingAnim');
    }, 700); // Adjust based on your swing animation duration
});