
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

let skills = [];// skill list composes of many skill objects.
let powers = [];
let powerInShop = [];

let theme = "../../static/game/Background.png"
get_data();

let cur_money = loaded_data["stat"]["current_money"];
let all_time_money = loaded_data["stat"]["all_time_money"];
let totalPassiveIncome = loaded_data["stat"]["passive_income"];
let money_per_click = loaded_data["stat"]["money_per_click"];
let click_counter = loaded_data["stat"]["click_counter"];
fetchPowers();// should move into get data method and then just run get data method once.
fetchSkills();
startAudio();
document.getElementById('money').textContent = Math.floor(cur_money);
document.addEventListener('DOMContentLoaded', fetchSkills);
document.addEventListener('DOMContentLoaded', fetchPowers);
document.addEventListener('DOMContentLoaded', startAudio);

//Clicking
const swordman = document.getElementById('swordman');

hitbox.addEventListener('click', () => {
    swordman.classList.add('SwingAnim');
    cur_money+= money_per_click;
    all_time_money += money_per_click;
    click_counter++;
    document.getElementById('money').textContent = Math.floor(cur_money);
    setTimeout(() => {
        swordman.classList.remove('SwingAnim');
    }, 700); // Adjust based on your swing animation duration
});


function updateMoney() {
    totalPassiveIncome = 0;
    skills.forEach(skill => {
        totalPassiveIncome += skill.passive;
    }); 
    cur_money += totalPassiveIncome;
    all_time_money += totalPassiveIncome
    document.getElementById('money').textContent = Math.floor(cur_money);
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
    //{'skill_name': 'Fire', 'base_income': 0.1, 'growth_rate': 1.0, 'base_cost': 15.0, 'level': 79, 'unlocked': True}
    var i = 0
    loaded_data['skill'].forEach(
        skill => {
            var power_name = 
            n = {...skill,
                passive: 0,
                image: "../../static/game/"+skill.skill_name+".png",
                cost: calculateNewCost(skill.level,skill.base_cost),//calculate from level + base cost
                upgrades: [
                    { upgradeID: powers[i]['powerupID'], upgradeImage: "../../static/game/black.png" },
                    { upgradeID: powers[i+1]['powerupID'], upgradeImage: "../../static/game/black.png" },
                    // { upgradeID: powers[i+2]['powerupID'], upgradeImage: "../../static/game/black.png" },
                    // { upgradeID: powers[i+3]['powerupID'], upgradeImage: "../../static/game/black.png" },
                    // { upgradeID: powers[i+4]['powerupID'], upgradeImage: "../../static/game/black.png" },
                ],
            };
            skills.push(n);
            i = i + 2;//must change to i = i + 5 later if add more upgrade
        }
    );
    updateSkillsUI();
}




// Function to update the HTML with the new skills
function updateSkillsUI() {
    const skillsContainer = document.getElementById('skills');

    // Clear existing content in the container
    skillsContainer.innerHTML = '';

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
        skillPassive.textContent = 'Passive: ' + skill.passive.toFixed(1); // Replace with your skill level property
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
                skill.passive = calculatePassiveIncome(skill.level,skill.base_income,boughtPower);
                // console.log(skill.passive)
                // console.log(totalPassiveIncome)
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
        let countUpgrade = 0;
        let boughtPower = [];
        skill.upgrades.forEach(upgrade => {

            powers.forEach(powerUp => {
                if (powerUp.purchased) {
                    //console.log("upgradeID " + upgrade.upgradeID)
                    //console.log("powerUpID " + powerUp.powerupID)
                    if (upgrade.upgradeID == powerUp.powerupID) {
                        boughtPower.push(powerUp);
                        countUpgrade++;
                        const upgradeHTML = document.createElement('img');
                        upgradeHTML.src = powerUp.image; // Replace with your image URL
                        UpgradeImages.appendChild(upgradeHTML);
                    }
                }
                //console.log("purchased at Skill " + powerUp.purchased + " " + powerUp.powerupID);
            }
            )
        })
        skill.passive = calculatePassiveIncome(skill.level,skill.base_income,boughtPower);

        for (let i = 0; i < 5 - countUpgrade; i++) {
            const upgradeHTML = document.createElement('img');
            upgradeHTML.src = "../../static/game/black.png"; // Replace with your image URL
            UpgradeImages.appendChild(upgradeHTML);
        }

        // Finally, append the skillRow to the skillsContainer
        skillsContainer.appendChild(skillRow);
    });
}

function calculateNewCost(level,base_cost) {
    // Cost increases exponentially
    return Math.floor(base_cost * Math.pow(1.15, level));
}
function calculatePassiveIncome(level,base_income,boughtPowers) {

    // Use the skill's level to calculate passive income
    let passive = base_income * level
    console.log(typeof boughtPowers + "boughtpowers type");
    boughtPowers.forEach(power => {
        passive *= power.multiplier;
    })
    return passive;
}

//load powerup data from loaded_data to powers variable
function fetchPowers() {
    
    //{'powerupID': 'BlueFlame', 'skill_name': 'Fire', 'multiplier': 2, 'cost': 100, 'purchased': False}
    loaded_data["powerup"].forEach( 
        powerup =>{
            n = {
                ...powerup,
                image: "../../static/game/"+powerup.skill_name+"_powerup.png"
            };
            powers.push(n);
        }
    );
    updatePower();
}

function updatePower() {
    const powerUpsStoreContainer = document.getElementById('powerups');
    powerUpsStoreContainer.innerHTML = ''; // Clear existing content
    const purchasablePowerUps = powers.filter(powerUp => {
        const skill = skills.find(skill => skill.skill_name === powerUp.skill_name);
        //console.log(skill);
        //console.log("purchased at Update Power " + powerUp.purchased + " " + powerUp.powerupID)
        return skill && skill.unlocked && !powerUp.purchased && (skill.level >= powerUp.skillReq);
    }).sort((a, b) => a.powerupID.localeCompare(b.powerupID)).slice(0, 4);
    //console.log(purchasablePowerUps);
    purchasablePowerUps.forEach(powerUp => {
        const skill = skills.find(skill => skill.skill_name === powerUp.skill_name);

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
        powerUpCoinImage.src = '../../static/game/Coin.png'; // Replace with your coin image URL
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
    const skill = skills.find(skill => skill.skill_name === powerUp.skill_name);

    if (skill && cur_money >= powerUp.cost) {
        cur_money -= powerUp.cost;

        // Apply the power-up effects
        skill.passive *= powerUp.multiplier;

        // Mark the power-up as purchased
        powerUp.purchased = true;

        // Update the UI
        updateMoney();
        // updatePowerUpsStore();
        updatePower();
        
    } else {
        alert("Not enough money to buy this power-up!");
    }
}

function updateStatistics() {
      // Update the content of each statistic element
    document.getElementById('CurMoneyStat').textContent = Math.floor(cur_money);
    document.getElementById('AllClickStat').textContent = click_counter;
    document.getElementById('AllMoneyStat').textContent = Math.floor(all_time_money);
    document.getElementById('PassiveStat').textContent = Math.floor(totalPassiveIncome);
    document.getElementById('PerClickStat').textContent = Math.floor(money_per_click);
}

// JavaScript functions for Settings tab
function changeUsername() {
    const newUsername = document.getElementById('usernameInput').value;
    // Implement logic to update the username in the game

}
//Clicking


test = {name:"test",level:"1"}
function saveManually() {//save game function
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

setInterval(saveManually, 30000); // Auto save every 30 seconds
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

function getComboA(selectObject) {
    var value = selectObject.value;  
    console.log(value);
  }
function changeTheme(teem) {
    console.log(teem)
    // Set the background variable or update the background style based on the selected theme
    switch (teem) {
        case 'Jungle':
            theme = "../../static/game/Background.png";
            break;
        case 'Volcano':
            theme = "../../static/game/Volcano.jpg";
            break;
        case 'Space':
            theme = "../../static/game/Space.jpg";
            break;
        // Add more cases for additional themes
        default:
            // Set a default background in case the theme is not recognized
            theme = "../../static/game/Background.png";
    }
    updateBackground();
}
function updateBackground(){
    document.getElementById('background').src = theme;
    console.log(theme)
}

function startAudio() {
    const backgroundAudio = document.getElementById('backgroundAudio');
    backgroundAudio.play();
    console.log("audio play")
}

const volumeSlider = document.getElementById('volumeSlider');
    const audio1 = document.getElementById('backgroundAudio');
    //const audio2 = document.getElementById('audio2');

    // Set initial volume
    audio1.volume = volumeSlider.value;
    //audio2.volume = volumeSlider.value;

    // Update volume when the slider changes
    volumeSlider.addEventListener('input', function() {
        const volumeValue = this.value;
        audio1.volume = volumeValue;
        //audio2.volume = volumeValue;
    });

// Example function to initialize settings
function initializeSettings() {
    // Fetch and set the initial values for settings (volume, theme, etc.)
    const volumeSlider = document.getElementById('volumeSlider');
    const themeSelect = document.getElementById('themeSelect');
    const notificationToggle = document.getElementById('notificationToggle');
    const usernameInput = document.getElementById('usernameInput');

    // Set initial values (replace with actual values from your game state)
    volumeSlider.value = initialVolumeValue;
    themeSelect.value = initialThemeValue;
    notificationToggle.checked = initialNotificationValue;
    usernameInput.value = initialUsername;
}