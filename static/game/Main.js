function showTab(tabId) {
    const tabs = document.querySelectorAll('.tabContent');
    tabs.forEach(tab => tab.classList.remove('active'));
    const selectedTab = document.getElementById(tabId);
    selectedTab.classList.add('active');
}

const swordman = document.getElementById('swordman');

let score = 0;
let passiveScore = 0;
let upgrade1Level = 0;
let upgrade2Level = 0;
hitbox.addEventListener('click', () => {
    score++;
    document.getElementById('scoreValue').textContent = score;
    swordman.classList.add('SwingAnim');
    setTimeout(() => {
        swordman.classList.remove('SwingAnim');
    }, 700); // Adjust based on your swing animation duration
});


function updateScore(){
    score += passiveScore;
    document.getElementById('scoreValue').textContent = score;
}
setInterval(updateScore, 1000); // Update score every second

function initiateSave(){ // this function suppose to run one time when the web is open. Still no idea how to do so.
    document.getElementById('scoreValue').textContent = score; // update score
    document.getElementById('upgrade1Level').textContent = upgrade1Level; // update upgrade level and their cost
    document.getElementById('cost1').textContent = 10 * (upgrade1Level + 1);
    document.getElementById('upgrade2Level').textContent = upgrade2Level;
    document.getElementById('cost2').textContent = 20 * (upgrade2Level + 1);
    // still doesn't update passive score, left for pon to deal with later
    

}

function buyUpgrade(upgradeId) {
    switch(upgradeId) {
        case 1:
            let cost1 = 10 * (upgrade1Level + 1);
            if (score >= cost1) {
                score -= cost1;
                upgrade1Level++;
                passiveScore += 1;
                document.getElementById('upgrade1Level').textContent = upgrade1Level;
                document.getElementById('cost1').textContent = cost1+10;
                document.getElementById('scoreValue').textContent = score;
            }
            break;
        case 2:
            let cost2 = 20 * (upgrade2Level + 1);
            if (score >= cost2) {
                score -= cost2;
                upgrade2Level++;
                passiveScore += 2;
                document.getElementById('upgrade2Level').textContent = upgrade2Level;
                document.getElementById('cost2').textContent = cost2+20;
                document.getElementById('scoreValue').textContent = score;
            }
            break;
    }
}


function saveManually() {
    fetch('http://127.0.0.1:8000/game/save-data/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken') // Include CSRF token
        },
        body: JSON.stringify({
            skill_name1 : "upgrade1",
            level_upgrade1 : upgrade1Level,
            skill_name2 : "upgrade2",
            level_upgrade2 : upgrade2Level,

            // Add other fields to send
        }),
    });
}

// setInterval(saveManually, 60000); // Auto save every 1 min


function getCookie(name) {
var cookieValue = null;
if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
        }
    }
}
return cookieValue;
}