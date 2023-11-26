
//updating money
let money = 0;
let skills = [];
let powers = [];
let powerInShop = [];
let totalPassiveIncome = 0;
let purchasedPowerUps = [];

document.addEventListener('DOMContentLoaded', fetchSkills);
document.addEventListener('DOMContentLoaded', fetchPowers);

function updateMoney() {
    totalPassiveIncome = 0;
    skills.forEach(skill => {
        totalPassiveIncome += skill.passive;
    });
    money += totalPassiveIncome;
    document.getElementById('money').textContent = money.toFixed(1);
}
setInterval(updateMoney, 1000); // Update score every second


//switching tab
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tabContent');
    tabs.forEach(tab => (tab.style.display = 'none'));

    const selectedTab = document.getElementById(tabId);
    if (tabId === 'skills') {
        selectedTab.style.display = 'block';
        updateSkillsUI();
    }
    else {
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
    skills = [{
        skillID: "Skill1",
        baseIncome: 0.1,
        baseCost: 15,
        passive: 0,
        image: "Fire.png",
        name: "Fire",
        level: 0,
        cost: 15,
        upgrades : [
            {upgradeID: "Oil",upgradeImage : "black.png",bought: false},
            {upgradeID: "Oil2",upgradeImage : "black.png",bought: false},
            {upgradeID: "Oil3",upgradeImage : "black.png",bought: false},
            {upgradeID: "Oil4",upgradeImage : "black.png",bought: false},
            {upgradeID: "Oil5",upgradeImage : "black.png",bought: false},
        ],
        unlocked: false
    }, {
        skillID: "Skill2",
        baseIncome: 1,
        baseCost: 100,
        passive: 0,
        image: "Dummy.png",
        name: "Cum",
        level: 0,
        cost: 100,
        unlocked: false,
        upgrades : [
            {upgradeID: "Cock",upgradeImage : "black.png",bought: false},
            {upgradeID: "Cock2",upgradeImage : "black.png",bought: false},
            {upgradeID: "Cock3",upgradeImage : "black.png",bought: false},
            {upgradeID: "Cock4",upgradeImage : "black.png",bought: false},
            {upgradeID: "COck5",upgradeImage : "black.png",bought: false},
        ]
    }]
    updateSkillsUI();

}
fetchPowers();
fetchSkills();
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
        // Create and append HTML elements for skill details (image, name, level, etc.)
        // Adjust this based on your skill data structure
        const skillImage = document.createElement('img');
        skillImage.src = skill.image; // Replace with your image URL
        skillImage.classList.add('SkillImage');
        skillInfo.appendChild(skillImage);

        const skillDetails = document.createElement('div');
        skillDetails.classList.add('SkillDetails');
        skillInfo.appendChild(skillDetails);

        // Create other elements (name, level, buy button, upgrade images, etc.) and append them to skillRow
        const skillName = document.createElement('h3');
        skillName.textContent = skill.name; // Replace with your skill name property
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
            if (money >= skill.cost) {
                // Subtract the cost from the player's money
                if (skill.unlocked == false) {
                    skill.unlocked = true;
                }
                money -= skill.cost;

                // Increase the skill level
                skill.level++;
                skill.passive = calculatePassiveIncome(skill.level, skill.baseIncome);

                //console.log(skill.passive)
                //console.log(totalPassiveIncome)
                // Update the skill cost (modify this based on your logic)
                skill.cost = calculateNewCost(skill.level, skill.baseCost);

                // Update the displayed information
                skillLevel.textContent = 'Level: ' + skill.level;
                skillCost.textContent = 'Cost: ' + skill.cost;
                skillPassive.textContent = 'Passive: ' + skill.passive.toFixed(1);
                updateMoney();
            } else {
                // Display a message or take some action if the player doesn't have enough money
                alert("Not enough money to buy this skill!");
            }

        });

        skillRow.appendChild(skillButton);

        const UpgradeImages = document.createElement('div');
        UpgradeImages.classList.add('UpgradeImages');
        skillRow.appendChild(UpgradeImages);
        let countUpgrade = 0;
        powers.forEach(powerUp =>{
            if(powerUp.purchased){
                skill.upgrades.forEach(upgrade =>{
                    console.log("upgradeID " + upgrade.upgradeID)
                    console.log("powerUpID " + powerUp.powerupID)
                    if(upgrade.upgradeID == powerUp.powerupID){
                        countUpgrade++;
                        const upgradeHTML = document.createElement('img');
                        upgradeHTML.src = powerUp.image; // Replace with your image URL
                        UpgradeImages.appendChild(upgradeHTML);
                    }
                })
            } else{
                if (countUpgrade < 5){
                    countUpgrade++;
                    const upgradeHTML = document.createElement('img');
                    upgradeHTML.src = "black.png"; // Replace with your image URL
                    UpgradeImages.appendChild(upgradeHTML);
                }
            }
            console.log("purchased at Skill " + powerUp.purchased +" "+ powerUp.powerupID)
            }
        )

        // Finally, append the skillRow to the skillsContainer
        skillsContainer.appendChild(skillRow);
    });
}

function calculateNewCost(level, baseCost) {
    // Cost increases exponentially
    return Math.floor(baseCost * Math.pow(1.15, level));
}
function calculatePassiveIncome(level, baseIncome) {
    // Passive income increases exponentially
    //baseIncome = baseIncome || 2;
    //growthRate = growthRate || 1.2;

    // Use the skill's level to calculate passive income
    return baseIncome * level;
}

// Fetch skills when the page loads

function fetchPowers() {
    powers = [{
        powerupID: "Oil",
        skillID: "Skill1",
        multiplier: 2,
        cost: 1000,
        purchased: false,
        image: "Oil.png"
    },
    {
        powerupID: "Oil2",
        skillID: "Skill1",
        multiplier: 2,
        cost: 1000,
        purchased: false,
        image: "Oil.png"
    },
    {
        powerupID: "Oil3",
        skillID: "Skill1",
        multiplier: 2,
        cost: 1000,
        purchased: false,
        image: "Oil.png"
    },
    {
        powerupID: "Oil4",
        skillID: "Skill1",
        multiplier: 2,
        cost: 1000,
        purchased: false,
        image: "Oil.png"
    },
    {
        powerupID: "Oil5",
        skillID: "Skill1",
        multiplier: 2,
        cost: 1000,
        purchased: false,
        image: "Oil.png"
    },
    {
        powerupID: "Cock",
        skillID: "Skill2",
        multiplier: 2,
        cost: 2000,
        purchased: false,
        image: "Grinder.png"
    }]
    updatePower();
}

function updatePower() {
    const powerUpsStoreContainer = document.getElementById('powerups');
    powerUpsStoreContainer.innerHTML = ''; // Clear existing content
    const purchasablePowerUps = powers.filter(powerUp => {
        const skill = skills.find(skill => skill.skillID === powerUp.skillID);
        //console.log(skill);
        console.log("purchased at Update Power " + powerUp.purchased +" "+ powerUp.powerupID)
        return skill && skill.unlocked && !powerUp.purchased;
    }).sort((a, b) => a.powerupID.localeCompare(b.powerupID)).slice(0, 4);
    //console.log(purchasablePowerUps);
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

    if (skill && money >= powerUp.cost) {
        money -= powerUp.cost;

        // Apply the power-up effects
        skill.passive *= powerUp.multiplier;

        // Mark the power-up as purchased
        powerUp.purchased = true;

        // Update the UI
        updateMoney();
        updatePower();
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
    money = money + 100;
    document.getElementById('money').textContent = money.toFixed(1);
    setTimeout(() => {
        swordman.classList.remove('SwingAnim');
    }, 700); // Adjust based on your swing animation duration
});