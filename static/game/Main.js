
//updating money
let loaded_data = JSON.parse("{{loaded_data|escapejs}}"); //loaded_data = {money:'money', skills:'skills',powerups:'powerups'}
let money = 0;
let skills = [];// skill list composes of many skill objects.
let totalPassiveIncome = 0;
function updateMoney() {
    totalPassiveIncome = 0;
    skills.forEach(skill => {
        totalPassiveIncome += skill.passive;
    }); 
    money += totalPassiveIncome;
    document.getElementById('money').textContent = money;
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
    skills = [{
        skillID: "Skill1",//use the same value as skillname('Fire')
        baseIncome: 0.1,//skill
        growthRate: 2,//skill
        baseCost: 4,//skill
        passive: 0,//calculate from baseIncome + level + growth rate
        image: "../../static/game/Fire.png",
        name: "Fire",//skill
        level: 1,//user skill
        cost: 4,//calculate from level + base cost
        upgrade1: "../../static/game/black.png",
        upgrade2: "../../static/game/black.png",
        upgrade3: "../../static/game/black.png",
        upgrade4: "../../static/game/black.png",
        upgrade5: "../../static/game/black.png",
      },{
        skillID: "Skill2",
        baseIncome: 0.5,
        growthRate: 1.5,
        baseCost: 10,
        passive: 0,
        image: "../../static/game/Dummy.png",
        name: "Cum",
        level: 1,
        cost: 40,
        upgrade1: "../../static/game/black.png",
        upgrade2: "../../static/game/black.png",
        upgrade3: "../../static/game/black.png",
        upgrade4: "../../static/game/black.png",
        upgrade5: "../../static/game/black.png",
      }]
    updateSkillsUI(skills);

}

// Function to update the HTML with the new skills
function updateSkillsUI(skills) {
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
                money -= skill.cost;

                // Increase the skill level
                skill.level++;
                skill.passive = calculatePassiveIncome(skill.level,skill.baseIncome,skill.growthRate);
                console.log(skill.passive)
                console.log(totalPassiveIncome)
                // Update the skill cost (modify this based on your logic)
                skill.cost = calculateNewCost(skill.level,skill.baseCost);
    
                // Update the displayed information
                skillLevel.textContent = 'Level: ' + skill.level;
                skillCost.textContent = 'Cost: ' + skill.cost;
                skillPassive.textContent = 'Passive: ' + skill.passive;
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

function calculateNewCost(baseCost,level) {
    // Cost increases exponentially
    return Math.floor(baseCost * Math.pow(1.1, level));
}
function calculatePassiveIncome(level,baseIncome,growthRate) {
    // Passive income increases exponentially
    //baseIncome = baseIncome || 2;
    //growthRate = growthRate || 1.2;

    // Use the skill's level to calculate passive income
    return Math.floor(baseIncome * Math.pow(growthRate,level));
}

// Fetch skills when the page loads
fetchSkills();

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