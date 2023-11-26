
let loaded_data = {};
function get_data() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../data', false);  // The third parameter 'false' makes the request synchronous
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                loaded_data = JSON.parse(xhr.responseText);
                console.log(loaded_data);
            } else {
                console.error('Error:', xhr.statusText);
            }
        }
    };
    xhr.send();
}


//updating money
let cur_money = 0;
let all_time_money = 0;
let totalPassiveIncome = 0;
let money_per_click = 1;
let click_counter = 0;
let skills = [];// skill list composes of many skill objects.
let powers = [];
let powerInShop = [];

get_data();

document.addEventListener('DOMContentLoaded', fetchSkills);
document.addEventListener('DOMContentLoaded', fetchPowers);

function updateMoney() {
    totalPassiveIncome = 0;
    skills.forEach(skill => {
        totalPassiveIncome += skill.passive;
    }); 
    cur_money += totalPassiveIncome;
    all_time_money += totalPassiveIncome
    document.getElementById('money').textContent = cur_money.toFixed(1);
}
setInterval(updateMoney, 1000); // Update score every second


//switching tab
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tabContent');
    tabs.forEach(tab => (tab.style.display = 'none'));

    const selectedTab = document.getElementById(tabId);
    if (tabId === 'skills'){
    selectedTab.style.display = 'block';}
    else{
        selectedTab.style.display = 'flex';
    }
    if (tabId === 'statistics') {
        updateStatistics();
    }
    if (tabId === 'powerups') {
        updatePower();
    }
}

function fetchSkills() {
    // Make an API request to your server to get the skills
    // Example using Fetch API:
    loaded_data['skill'].forEach(
        skill => {
            n = {...skill,
                passive: calculatePassiveIncome(skill.level,skill.base_income,skill.growth_rate),
                image: "../../static/game/"+skill.skill_name+".png",
                cost: calculateNewCost(skill.level,skill.base_cost),//calculate from level + base cost
                upgrade1: "../../static/game/black.png",
                upgrade2: "../../static/game/black.png",
                upgrade3: "../../static/game/black.png",
                upgrade4: "../../static/game/black.png",
                upgrade5: "../../static/game/black.png",
            };
            skills.push(n);
        }
    );
    updateSkillsUI();

}

fetchPowers();// should move into get data method and then just run get data method once.
fetchSkills();


// Function to update the HTML with the new skills
function updateSkillsUI() {
    const skillsContainer = document.getElementById('skills');

    // Clear existing content in the container
    //skillsContainer.innerHTML = '';

    // Loop through the skills and create HTML elements for each skill
    skills.forEach(skill => {
        const skillRow = document.createElement('div');
        skillRow.classList.add('SkillRow');

        const skillInfo = document.createElement('div');
        skillInfo.classList.add('SkillInfo');
        skillRow.appendChild(skillInfo);
        // Create and append HTML elements for skill details (image, skill_name, level, etc.)
        // Adjust this based on your skill data structure
        const skillImage = document.createElement('img');
        skillImage.src = skill.image; // Replace with your image URL
        skillImage.classList.add('SkillImage');
        skillInfo.appendChild(skillImage);

        const skillDetails = document.createElement('div');
        skillDetails.classList.add('SkillDetails');
        skillInfo.appendChild(skillDetails);

        // Create other elements (skill_name, level, buy button, upgrade images, etc.) and append them to skillRow
        const skillName = document.createElement('h3');
        skillName.textContent = skill.skill_name; // Replace with your skill skill_name property
        skillDetails.appendChild(skillName);

        const skillLevel = document.createElement('p');
        skillLevel.textContent = 'Level: ' + skill.level; // Replace with your skill level property
        skillDetails.appendChild(skillLevel);

        const skillCost = document.createElement('p');
        skillCost.textContent = 'Cost: ' + skill.cost; // Replace with your skill level property
        skillDetails.appendChild(skillCost);

        const skillPassive = document.createElement('p');
        skillPassive.textContent = 'Passive: ' + skill.passive; // Replace with your skill level property
        skillDetails.appendChild(skillPassive);

        const skillButton = document.createElement('button');
        skillButton.textContent = 'Buy'; // Replace with your skill level property
        skillButton.classList.add('BuyButton');

        skillButton.addEventListener('click', () => {
            
            // Check if the player has enough money to buy the skill
            if (cur_money >= skill.cost) {
                // Subtract the cost from the player's money
                if (skill.unlocked == false) {
                    skill.unlocked = true;
                }
                cur_money -= skill.cost;

                // Increase the skill level
                skill.level++;
                console.log(skill.base_income)
                console.log(skill.growth_rate)
                skill.passive = calculatePassiveIncome(skill.level,skill.base_income);
                console.log(skill.passive)
                console.log(totalPassiveIncome)
                // Update the skill cost (modify this based on your logic)
                skill.cost = calculateNewCost(skill.level,skill.base_cost);
    
                // Update the displayed information
                skillLevel.textContent = 'Level: ' + skill.level;
                skillCost.textContent = 'Cost: ' + skill.cost;
                skillPassive.textContent = 'Passive: ' + skill.passive.toFixed(1);
                updateMoney();
            } else {
                // Display a message or take some action if the player doesn't have enough money
                alert("Not enough cur_money to buy this skill!");
            }
            
        });

        skillRow.appendChild(skillButton);

        const UpgradeImages = document.createElement('div');
        UpgradeImages.classList.add('UpgradeImages');
        skillRow.appendChild(UpgradeImages);

        const Upgrade1 = document.createElement('img');
        Upgrade1.src = skill.upgrade1; // Replace with your image URL
        UpgradeImages.appendChild(Upgrade1);

        const Upgrade2 = document.createElement('img');
        Upgrade2.src = skill.upgrade2; // Replace with your image URL
        UpgradeImages.appendChild(Upgrade2);

        const Upgrade3 = document.createElement('img');
        Upgrade3.src = skill.upgrade3; // Replace with your image URL
        UpgradeImages.appendChild(Upgrade3);

        const Upgrade4 = document.createElement('img');
        Upgrade4.src = skill.upgrade4; // Replace with your image URL
        UpgradeImages.appendChild(Upgrade4);

        const Upgrade5 = document.createElement('img');
        Upgrade5.src = skill.upgrade5; // Replace with your image URL
        UpgradeImages.appendChild(Upgrade5);

        // Finally, append the skillRow to the skillsContainer
        skillsContainer.appendChild(skillRow);
    });
}

function calculateNewCost(level,base_cost) {
    // Cost increases exponentially
    return Math.floor(base_cost * Math.pow(1.15, level));
}
function calculatePassiveIncome(level,base_income) {

    // Use the skill's level to calculate passive income
    return base_income * level;
}

function fetchPowers() {
    loaded_data["powerup"].forEach( 
        powerup =>{
            n = {
                ...powerup,
                image: "../../static/game/"+powerup.skill_name+".png"
            };
            powers.push(n);
        }
    );
    // powers = [{
    //     powerupID: "Oil",
    //     skill_name: "Fire",
    //     multiplier: 2,
    //     cost: 1000,
    //     purchased: false,
    //     image: "Oil.png"
    // },
    // {
    //     powerupID: "Cock",
    //     skillID: "Skill2",
    //     multiplier: 2,
    //     cost: 2000,
    //     purchased: false,
    //     image: "Grinder.png"
    // }]
    updatePower();
}

function updatePower() {
        const powerUpsStoreContainer = document.getElementById('powerups');
        powerUpsStoreContainer.innerHTML = ''; // Clear existing content
        const purchasablePowerUps = powers.filter(powerUp => {
            const skill = skills.find(skill => skill.skill_name === powerUp.skill_name);
            console.log(skill);
            return skill && skill.unlocked && !powerUp.purchased;
        }).sort((a, b) => a.powerupID.localeCompare(b.powerupID)).slice(0, 4);
        console.log(purchasablePowerUps);
        purchasablePowerUps.forEach(powerUp => {
        const skill = skills.find(skill => skill.skillID === powerUp.skillID);

        const powerUpRow = document.createElement('div');
        powerUpRow.classList.add('PowContain');

        // Create and append HTML elements for power-up details
        const powerUpImageContainer = document.createElement('div');
        powerUpImageContainer.classList.add('picPowContain');
        powerUpRow.appendChild(powerUpImageContainer);

        const powerUpImage = document.createElement('img');
        powerUpImage.src = powerUp.image; // Replace with your image URL
        powerUpImage.classList.add('picPow');
        powerUpImageContainer.appendChild(powerUpImage);

        const powerUpName = document.createElement('div');
        powerUpName.textContent = powerUp.powerupID; // Replace with your power-up name property
        powerUpName.classList.add('PowDesc');
        powerUpRow.appendChild(powerUpName);

        const powerUpButton = document.createElement('button');
        powerUpButton.textContent = 'BUY'; // Replace with your purchase button text
        powerUpButton.classList.add('PowButton');

        const powerUpCoinImage = document.createElement('img');
        powerUpCoinImage.src = 'Coin.png'; // Replace with your coin image URL
        powerUpCoinImage.classList.add('PowCoin');
        powerUpButton.appendChild(powerUpCoinImage);

        const powerUpPrice = document.createElement('span');
        powerUpPrice.textContent = powerUp.cost; // Replace with your power-up cost calculation
        powerUpPrice.id = powerUp.powerupID + 'Price'; // Set a unique ID for the price span
        powerUpButton.appendChild(powerUpPrice);

        // Add a click event listener to buy the power-up
        powerUpButton.addEventListener('click', () => {
            buyPowerUp(powerUp);
        });
        powerUpRow.appendChild(powerUpButton);

        // Finally, append the powerUpRow to the powerUpsStoreContainer
        powerUpsStoreContainer.appendChild(powerUpRow);
    });
}

function buyPowerUp(powerUp) {
    const skill = skills.find(skill => skill.skillID === powerUp.skillID);

    if (skill && money >= calculatePowerUpCost(powerUp)) {
        money -= calculatePowerUpCost(powerUp);

        // Apply the power-up effects
        skill.passive *= powerUp.multiplier;

        // Mark the power-up as purchased
        powerUp.purchased = true;

        // Update the UI
        updateMoney();
        updatePowerUpsStore();
    } else {
        alert("Not enough money to buy this power-up!");
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

//Clicking
const swordman = document.getElementById('swordman');

hitbox.addEventListener('click', () => {
    swordman.classList.add('SwingAnim');
    cur_money+= money_per_click;
    all_time_money += money_per_click;
    click_counter++;
    document.getElementById('money').textContent = cur_money.toFixed(1);
    setTimeout(() => {
        swordman.classList.remove('SwingAnim');
    }, 700); // Adjust based on your swing animation duration
});

test = {name:"test",level:"1"}
function saveManually() {
    stat = {"all_time_money":all_time_money,"passiveincome":totalPassiveIncome,"current_money":cur_money,"money_per_click":money_per_click,"click_counter":click_counter}
    fetch('http://127.0.0.1:8000/game/save-data/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken') // Include CSRF token
        },
        body: JSON.stringify({User_Skill:skills,Stat:stat,User_PowerUp:powers})
    });
}

setInterval(saveManually, 60000); // Auto save every 1 min
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