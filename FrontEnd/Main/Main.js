
//updating money
let money_per_click = 1000000;
let money = 0;
let skills = [];
let powers = [];
let powerInShop = [];
let totalPassiveIncome = 0;
let purchasedPowerUps = [];
let customisationOptions={};
let allTimeClicks = 0;
let selectedCustomisation = {head : "head/headDefault.png", torso:"torso/torsoDefault.png",pants:"pants/pantsDefault.png",shoes:"shoes2/shoes2Default.png"};
let theme = "Background.png"
let notiOn = false;
let players = [
    { id: 1, name: 'Player1', allTimeMoney: 500 },
    { id: 2, name: 'Player2', allTimeMoney: 1000 },
    { id: 3, name: 'Player3', allTimeMoney: 1500 },
    { id: 4, name: 'Player4', allTimeMoney: 2000 },
    { id: 5, name: 'Player5', allTimeMoney: 2500 },
    { id: 6, name: 'Player6', allTimeMoney: 3500 },
    { id: 7, name: 'Player7', allTimeMoney: 5500 },
    { id: 8, name: 'Player8', allTimeMoney: 6500 },
    { id: 9, name: 'Player9', allTimeMoney: 7500 },
    // Add more players...
];
let monsters = [
    'Dummy.png',
    'Grinder.png',
    'Oil.png',
    'Fukuda.png'
]
let EventMult = 1;
let OurPlayerid = 1;
const Swordsounds = [
    "Sword1.mp3",
    "Sword2.mp3",
    "Sword3.mp3",
    "Sword4.mp3"
];
let SwordSound = "Sword1.mp3"
fetchPowers();
fetchSkills();
fetchCustomisation();
toggleCheck();
updateStatistics();
setInterval(updateMoney, 1000); // Update score every second
// Get the audio element
const backgroundAudio = document.getElementById('backgroundAudio');

// Play the audio automatically
backgroundAudio.play();


document.addEventListener('DOMContentLoaded', fetchSkills);
document.addEventListener('DOMContentLoaded', fetchPowers);
document.addEventListener('DOMContentLoaded', fetchCustomisation);
document.addEventListener('DOMContentLoaded', updateStatistics);


headIdle = document.getElementById('headIdle');
torsoIdle = document.getElementById('torsoIdle');
pantsIdle = document.getElementById('pantsIdle');
shoesIdle = document.getElementById('shoesIdle');

//Clicking
const swordman = document.getElementById('swordman');
const picture = document.getElementById('Picture');

let clicking = false;

hitbox.addEventListener('mousedown', () => {
    clicking = true;
});

hitbox.addEventListener('mouseup', () => {
    clicking = false;
});

hitbox.addEventListener('click', () => {
    allTimeClicks++;
    let anim = document.createElement('div');
    anim.classList.add('SwingAnim'); 
    changeMonster();
    picture.appendChild(anim);
    swordman.classList.add('SwingAnim');
    money = money + money_per_click * EventMult;
    document.getElementById('passive').textContent = (totalPassiveIncome * EventMult + money_per_click * EventMult).toLocaleString("en-US");
    document.getElementById('money').textContent = money.toLocaleString("en-US");

    playRandomSound();
    gaugeValue += 5;
    headIdle.style.visibility = 'hidden';
    torsoIdle.style.visibility = 'hidden';
    pantsIdle.style.visibility = 'hidden';
    shoesIdle.style.visibility = 'hidden';
    setTimeout(() => {
        anim.remove();
        swordman.classList.remove('SwingAnim');
        updateCustomisations();

    }, 700); // Adjust based on your swing animation duration
    
});

function playRandomSound() {
    // Randomly choose a sound effect from the array
    const randomIndex = Math.floor(Math.random() * Swordsounds.length);
    const randomSoundPath = Swordsounds[randomIndex];

    // Create an audio element and play the chosen sound
    SwordSound = new Audio(randomSoundPath);
    SwordSound.volume = volumeValue;
    SwordSound.play();
}

function updateMoney() {
    totalPassiveIncome = 0;
    skills.forEach(skill => {
        totalPassiveIncome += skill.passive;
    });
    money += totalPassiveIncome * EventMult;
    if (clicking) {
        document.getElementById('passive').textContent = (totalPassiveIncome * EventMult + money_per_click * EventMult).toLocaleString("en-US");
    } else {
        document.getElementById('passive').textContent = (totalPassiveIncome * EventMult).toLocaleString("en-US");
    }
    document.getElementById('money').textContent = money.toLocaleString("en-US");
}

function changeMonster(){
    let dummy = document.getElementById('dummy')
    if(allTimeClicks % 10 == 0){
        let randomIndex = Math.floor(Math.random() * monsters.length);
        // Get the picture at the random index
        let randomPicture = monsters[randomIndex];
        dummy.src = randomPicture;
    }
}

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
        upgrades: [
            { upgradeID: "Oil", upgradeImage: "black.png" },
            { upgradeID: "Oil2", upgradeImage: "black.png" },
            { upgradeID: "Oil3", upgradeImage: "black.png" },
            { upgradeID: "Oil4", upgradeImage: "black.png" },
            { upgradeID: "Oil5", upgradeImage: "black.png" },
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
        upgrades: [
            { upgradeID: "Cock", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock2", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock3", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock4", upgradeImage: "black.png", bought: false },
            { upgradeID: "COck5", upgradeImage: "black.png", bought: false },
        ]
    },{
        skillID: "Skill2",
        baseIncome: 1,
        baseCost: 100,
        passive: 0,
        image: "Dummy.png",
        name: "Cum",
        level: 0,
        cost: 100,
        unlocked: false,
        upgrades: [
            { upgradeID: "Cock", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock2", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock3", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock4", upgradeImage: "black.png", bought: false },
            { upgradeID: "COck5", upgradeImage: "black.png", bought: false },
        ]
    },{
        skillID: "Skill2",
        baseIncome: 1,
        baseCost: 100,
        passive: 0,
        image: "Dummy.png",
        name: "Cum",
        level: 0,
        cost: 100,
        unlocked: false,
        upgrades: [
            { upgradeID: "Cock", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock2", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock3", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock4", upgradeImage: "black.png", bought: false },
            { upgradeID: "COck5", upgradeImage: "black.png", bought: false },
        ]
    },{
        skillID: "Skill2",
        baseIncome: 1,
        baseCost: 100,
        passive: 0,
        image: "Dummy.png",
        name: "Cum",
        level: 0,
        cost: 100,
        unlocked: false,
        upgrades: [
            { upgradeID: "Cock", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock2", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock3", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock4", upgradeImage: "black.png", bought: false },
            { upgradeID: "COck5", upgradeImage: "black.png", bought: false },
        ]
    },{
        skillID: "Skill2",
        baseIncome: 1,
        baseCost: 100,
        passive: 0,
        image: "Dummy.png",
        name: "Cum",
        level: 0,
        cost: 100,
        unlocked: false,
        upgrades: [
            { upgradeID: "Cock", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock2", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock3", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock4", upgradeImage: "black.png", bought: false },
            { upgradeID: "COck5", upgradeImage: "black.png", bought: false },
        ]
    },{
        skillID: "Skill2",
        baseIncome: 1,
        baseCost: 100,
        passive: 0,
        image: "Dummy.png",
        name: "Cum",
        level: 0,
        cost: 100,
        unlocked: false,
        upgrades: [
            { upgradeID: "Cock", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock2", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock3", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock4", upgradeImage: "black.png", bought: false },
            { upgradeID: "COck5", upgradeImage: "black.png", bought: false },
        ]
    },{
        skillID: "Skill2",
        baseIncome: 1,
        baseCost: 100,
        passive: 0,
        image: "Dummy.png",
        name: "Cum",
        level: 0,
        cost: 100,
        unlocked: false,
        upgrades: [
            { upgradeID: "Cock", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock2", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock3", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock4", upgradeImage: "black.png", bought: false },
            { upgradeID: "COck5", upgradeImage: "black.png", bought: false },
        ]
    },{
        skillID: "Skill2",
        baseIncome: 1,
        baseCost: 100,
        passive: 0,
        image: "Dummy.png",
        name: "Cum",
        level: 0,
        cost: 100,
        unlocked: false,
        upgrades: [
            { upgradeID: "Cock", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock2", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock3", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock4", upgradeImage: "black.png", bought: false },
            { upgradeID: "COck5", upgradeImage: "black.png", bought: false },
        ]
    },{
        skillID: "Skill2",
        baseIncome: 1,
        baseCost: 100,
        passive: 0,
        image: "Dummy.png",
        name: "Cum",
        level: 0,
        cost: 100,
        unlocked: false,
        upgrades: [
            { upgradeID: "Cock", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock2", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock3", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock4", upgradeImage: "black.png", bought: false },
            { upgradeID: "COck5", upgradeImage: "black.png", bought: false },
        ]
    },{
        skillID: "Skill2",
        baseIncome: 1,
        baseCost: 100,
        passive: 0,
        image: "Dummy.png",
        name: "Cum",
        level: 0,
        cost: 100,
        unlocked: false,
        upgrades: [
            { upgradeID: "Cock", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock2", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock3", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock4", upgradeImage: "black.png", bought: false },
            { upgradeID: "COck5", upgradeImage: "black.png", bought: false },
        ]
    },{
        skillID: "Skill2",
        baseIncome: 1,
        baseCost: 100,
        passive: 0,
        image: "Dummy.png",
        name: "Cum",
        level: 0,
        cost: 100,
        unlocked: false,
        upgrades: [
            { upgradeID: "Cock", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock2", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock3", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock4", upgradeImage: "black.png", bought: false },
            { upgradeID: "COck5", upgradeImage: "black.png", bought: false },
        ]
    },{
        skillID: "Skill2",
        baseIncome: 1,
        baseCost: 100,
        passive: 0,
        image: "Dummy.png",
        name: "Cum",
        level: 0,
        cost: 100,
        unlocked: false,
        upgrades: [
            { upgradeID: "Cock", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock2", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock3", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock4", upgradeImage: "black.png", bought: false },
            { upgradeID: "COck5", upgradeImage: "black.png", bought: false },
        ]
    },{
        skillID: "Skill2",
        baseIncome: 1,
        baseCost: 100,
        passive: 0,
        image: "Dummy.png",
        name: "Cum",
        level: 0,
        cost: 100,
        unlocked: false,
        upgrades: [
            { upgradeID: "Cock", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock2", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock3", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock4", upgradeImage: "black.png", bought: false },
            { upgradeID: "COck5", upgradeImage: "black.png", bought: false },
        ]
    },{
        skillID: "Skill2",
        baseIncome: 1,
        baseCost: 100,
        passive: 0,
        image: "Dummy.png",
        name: "Cum",
        level: 0,
        cost: 100,
        unlocked: false,
        upgrades: [
            { upgradeID: "Cock", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock2", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock3", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock4", upgradeImage: "black.png", bought: false },
            { upgradeID: "COck5", upgradeImage: "black.png", bought: false },
        ]
    },{
        skillID: "Skill2",
        baseIncome: 1,
        baseCost: 100,
        passive: 0,
        image: "Dummy.png",
        name: "Cum2",
        level: 0,
        cost: 100,
        unlocked: false,
        upgrades: [
            { upgradeID: "Cock", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock2", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock3", upgradeImage: "black.png", bought: false },
            { upgradeID: "Cock4", upgradeImage: "black.png", bought: false },
            { upgradeID: "COck5", upgradeImage: "black.png", bought: false },
        ]
    }]
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
        skillName.classList.add('SkillName');
        skillName.textContent = skill.name; // Replace with your skill name property
        skillDetails.appendChild(skillName);

        const skillLevel = document.createElement('p');
        skillLevel.textContent = 'Level: ' + skill.level; // Replace with your skill level property
        skillDetails.appendChild(skillLevel);

        const skillCost = document.createElement('p');
        skillCost.textContent = 'Cost: ' + skill.cost.toLocaleString("en-US"); // Replace with your skill level property
        skillDetails.appendChild(skillCost);

        const skillPassive = document.createElement('p');
        skillPassive.textContent = 'Passive: ' + skill.passive.toLocaleString("en-US"); // Replace with your skill level property
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
                skill.passive = calculatePassiveIncome(skill.level, skill.baseIncome, boughtPower);

                //console.log(skill.passive)
                //console.log(totalPassiveIncome)
                // Update the skill cost (modify this based on your logic)
                skill.cost = calculateNewCost(skill.level, skill.baseCost);

                // Update the displayed information
                skillLevel.textContent = 'Level: ' + skill.level;
                skillCost.textContent = 'Cost: ' + skill.cost.toLocaleString("en-US");
                skillPassive.textContent = 'Passive: ' + skill.passive.toLocaleString("en-US");
                updateMoney();
            } else {
                // Display a message or take some action if the player doesn't have enough money
                if(notiOn){
                alert("Not enough money to buy this skill!");
                }
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

        for (let i = 0; i < 5 - countUpgrade; i++) {
            const upgradeHTML = document.createElement('img');
            upgradeHTML.src = "black.png"; // Replace with your image URL
            UpgradeImages.appendChild(upgradeHTML);
        }
        /*powers.forEach(powerUp =>{
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
        */
        // Finally, append the skillRow to the skillsContainer
        skillsContainer.appendChild(skillRow);
    });
}

function calculateNewCost(level, baseCost) {
    // Cost increases exponentially
    return Math.floor(baseCost * Math.pow(1.15, level));
}
function calculatePassiveIncome(level, baseIncome, boughtPowers) {
    // Passive income increases exponentially
    //baseIncome = baseIncome || 2;
    //growthRate = growthRate || 1.2;

    // Use the skill's level to calculate passive income
    let passive = baseIncome * level
    boughtPowers.forEach(power => {
        passive *= power.multiplier;
    })
    return passive;
}

// Fetch skills when the page loads

function fetchPowers() {
    powers = [{
        powerupID: "Oil",
        skillID: "Skill1",
        multiplier: 2,
        cost: 500,
        purchased: false,
        skillReq: 1,
        image: "Oil.png"
    },
    {
        powerupID: "Oil2",
        skillID: "Skill1",
        multiplier: 2,
        cost: 10000,
        purchased: false,
        skillReq: 10,
        image: "Oil.png"
    },
    {
        powerupID: "Oil3",
        skillID: "Skill1",
        multiplier: 2,
        cost: 100000,
        purchased: false,
        skillReq: 25,
        image: "Oil.png"
    },
    {
        powerupID: "Oil4",
        skillID: "Skill1",
        multiplier: 2,
        cost: 1.0e+8,
        skillReq: 100,
        purchased: false,
        image: "Oil.png"
    },
    {
        powerupID: "Oil5",
        skillID: "Skill1",
        multiplier: 2,
        cost: 1.0e+9,
        skillReq: 200,
        purchased: false,
        image: "Oil.png"
    },
    {
        powerupID: "Cock",
        skillID: "Skill2",
        multiplier: 2,
        cost: 1000,
        skillReq: 1,
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
        //console.log("purchased at Update Power " + powerUp.purchased + " " + powerUp.powerupID)
        return skill && skill.unlocked && !powerUp.purchased && (skill.level >= powerUp.skillReq);
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
        money_per_click *= powerUp.multiplier;

        // Mark the power-up as purchased
        powerUp.purchased = true;

        // Update the UI
        updateMoney();
        updatePower();
    } else {
        if(notiOn){
        alert("Not enough money to buy this power-up!");
        }
    }
}


function updateCustomisations(){
    if(selectedCustomisation["head"] == customisationOptions["head"][0]){
        headIdle.style.visibility = 'hidden';
    }else{
        console.log("show " + selectedCustomisation["head"])
        console.log("show " + customisationOptions["head"][0])
        headIdle.style.visibility = 'visible';
        headIdle.src = selectedCustomisation["head"];
    }
    if(selectedCustomisation["torso"] == customisationOptions["torso"][0]){
        torsoIdle.style.visibility = 'hidden';
    }else{
        torsoIdle.style.visibility = 'visible';
        torsoIdle.src = selectedCustomisation["torso"];
    }
    if(selectedCustomisation["pants"] == customisationOptions["pants"][0]){
        pantsIdle.style.visibility = 'hidden';
    }else{
        pantsIdle.style.visibility = 'visible';
        pantsIdle.src = selectedCustomisation["pants"];
    }
    if(selectedCustomisation["shoes"] == customisationOptions["shoes"][0]){
        shoesIdle.style.visibility = 'hidden';
    }else{
        shoesIdle.style.visibility = 'visible';
        shoesIdle.src = selectedCustomisation["shoes"];
    }

    console.log(selectedCustomisation["head"]);
};
function fetchCustomisation(){
    customisationOptions = {
    head: ['head/headDefault.png', 'head/headPink.png', 'head/headBlue.png', 'head/headGreen.png', 'head/headYellow.png', 'head/headPurple.png', 'head/headOrange.png'],
    torso: ['torso/torsoDefault.png', 'torso/torsoPink.png', 'torso/torsoBlue.png', 'torso/torsoGreen.png', 'torso/torsoYellow.png', 'torso/torsoPurple.png', 'torso/torsoOrange.png'],
    pants: ['pants/pantsDefault.png', 'pants/pantsPink.png', 'pants/pantsBlue.png', 'pants/pantsGreen.png', 'pants/pantsYellow.png', 'pants/pantsPurple.png', 'pants/pantsOrange.png'],
    shoes: ['shoes2/shoes2Default.png', 'shoes2/shoes2Pink.png', 'shoes2/shoes2Blue.png', 'shoes2/shoes2Green.png', 'shoes2/shoes2Yellow.png', 'shoes2/shoes2Purple.png', 'shoes2/shoes2Orange.png']
  };
  updateCustomisations();
}
  function changeCustomisation(part, direction) {
    const column = document.getElementById(`${part}Column`);
    const image = document.getElementById(`${part}Image`);
    const options = customisationOptions[part];
    console.log("Current Pic " + image.src);
    let currentIndex = options.indexOf(image.src.replace('http://127.0.0.1:5501/FrontEnd/Main/',''));
    console.log("Current" + currentIndex)
    if (direction === 'left') {
      currentIndex = (currentIndex - 1 + options.length) % options.length;
    } else if (direction === 'right') {
      currentIndex = (currentIndex + 1)% options.length;
    }
    console.log("After" + currentIndex)
    console.log(options[currentIndex]);
    console.log(options[5]);
    selectedCustomisation[part] = options[currentIndex];
    updateCustomisations();
    image.src = options[currentIndex];
  }



function updateStatistics() {
    // Example variables, replace them with your actual variables
    players.sort((a, b) => b.allTimeMoney - a.allTimeMoney);

    const leaderboardBody = document.getElementById('leaderboardBody');

    // Clear existing content
    leaderboardBody.innerHTML = '';
    let top5 =[];
    console.log(players);
    // Display players in the table
    for (let i = 0; i < Math.min(players.length, 5); i++) {
        const player = players[i];
        top5.push(player);
        const rowClass = player.id === OurPlayerid ? 'highlight' : '';
        const row = `<tr class="${rowClass}">
                      <td>${i + 1}</td>
                      <td>${player.name}</td>
                      <td>${player.allTimeMoney}</td>
                    </tr>`;
        leaderboardBody.innerHTML += row;
      }
    // Display your data in row 6 if you're not in the top 5
    if (top5.findIndex(player => player.id === OurPlayerid) === -1) {
        const rank = players.findIndex(player => player.id === OurPlayerid);
        const yourData = players.find(player => player.id === OurPlayerid);
        const yourDataRow = `<tr class="highlight">
                              <td>${rank+1}</td>
                              <td>${yourData.name}</td>
                              <td>${yourData.allTimeMoney}</td>
                            </tr>`;
        leaderboardBody.innerHTML += yourDataRow;
      }

    const allTimeClicks = 500;
    const allTimeMoney = 1500;
    const passiveIncome = (totalPassiveIncome * EventMult).toLocaleString("en-US");
    const moneyPerClick = money_per_click.toLocaleString("en-US");

    // Update the content of each statistic element

    document.getElementById('AllClickStat').textContent = allTimeClicks;
    document.getElementById('AllMoneyStat').textContent = allTimeMoney;
    document.getElementById('PassiveStat').textContent = passiveIncome;
    document.getElementById('PerClickStat').textContent = moneyPerClick;
}

// JavaScript functions for Settings tab
function changeUsername() {
    const newUsername = document.getElementById('usernameInput').value;
    // Implement logic to update the username in the game

}

function saveGame() {
    // Implement logic to save the game state
    if(notiOn){
    alert('Game saved I NA HEE');
    }
}

function logOut() {
    // Implement logic to save the game state
    if(notiOn){
    alert('Logged Out I NA HEE');
    }
}

function getComboA(selectObject) {
    var value = selectObject.value;
    console.log(value);
}
// Fetch themes, initialize settings, etc. based on your game structure
function changeTheme(teem) {
    console.log(teem)
    // Set the background variable or update the background style based on the selected theme
    switch (teem) {
        case 'Jungle':
            theme = "Background.png";
            break;
        case 'Volcano':
            theme = "Volcano.jpg";
            break;
        case 'Space':
            theme = "Space.jpg";
            break;
        // Add more cases for additional themes
        default:
            // Set a default background in case the theme is not recognized
            theme = "Background.png";
    }
    updateBackground();
}
function updateBackground() {
    document.getElementById('background').src = theme;
    console.log(theme)
}


const volumeSlider = document.getElementById('volumeSlider');
const audioBackground = document.getElementById('backgroundAudio');
//const audio2 = document.getElementById('audio2');

// Set initial volume
let volumeValue = volumeSlider.value
audioBackground.volume = volumeSlider.value;
SwordSound.volume = volumeSlider.value;

// Update volume when the slider changes
volumeSlider.addEventListener('input', function () {
    volumeValue = this.value;
    audioBackground.volume = volumeValue;
    SwordSound.volume = volumeValue;
    console.log(volumeValue)
});

function toggleCheck() {
    if(document.getElementById("notificationToggle").checked === true){
        notiOn = true;
    } else {
        notiOn = false;
    }
  }
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

//Event
// Set interval to check for events every second
setInterval(EventOccur, 1000);
eventProb = 1000;

function EventOccur() {
    if (!EventOngoing) {
        // Generate a random number between 0 and 9999 (representing 0.01% probability)
        const randomProbability = Math.floor(Math.random() * eventProb);

        // Check if the event should occur based on the probability
        if (randomProbability === 0) {
            
            const randomEvent = Math.floor(Math.random() * 2);
            console.log("Event Occur");

            switch (randomEvent) {
                case 0:
                    if(notiOn){
                    alert("Gauge Event Occur!")
                    }
                    clickGaugeEvent();
                    break;
                case 1:
                    if(notiOn){
                    alert("Flying Target Event Occur!")
                    }
                    startFlyingTargetEvent();
                    break;
            }
        } else {
            console.log("Event Not Occur");
        }
    }
}
// Set interval to check for events every second
let gaugeValue = 50;
let EventOngoing = false;

function clickGaugeEvent() {
    let finish = false;
    EventOngoing = true;
    //let Event = document.getElementById('Event');
    let gaugetext = document.createElement('p');
    Event.appendChild(gaugetext);
    let gaugeContainer = document.createElement('div');
    gaugeContainer.classList.add("gaugeContainer");
    Event.appendChild(gaugeContainer);
    let gauge = document.createElement('div');
    gauge.classList.add("gauge");
    gaugeContainer.appendChild(gauge);
    let filler = document.createElement('div');
    filler.classList.add("filler");
    gauge.appendChild(filler);
    gaugeValue = 50;
    filler.style.width = gaugeValue + '%';
    const gaugeInterval = setInterval(() => {
        gaugeValue -= 1;
        gaugetext.textContent = "Click before the gauge depletes"; // Replace with your skill level property
        filler.style.width = gaugeValue + '%';

        if (gaugeValue <= 0) {
            clearInterval(gaugeInterval);
            gaugetext.textContent = 'Gauge depleted! Event failed.';
            setTimeout(function () {
                EventOngoing = false;
                Event.innerHTML = "";
            }, 2000);

        }
        if (gaugeValue >= 100) {
            clearInterval(gaugeInterval);
            gaugetext.textContent = 'Gauge completed! 10 times Multiplier.';
            EventMult = 10;
            updateStatistics();
            setTimeout(function () {
                EventOngoing = false;
                EventMult = 1;
                Event.innerHTML = "";
                updateStatistics();
            }, 10000);
           

        }
    }, 50);

}
let score = 0;
let eventStartTime;
let flying = false;


function startFlyingTargetEvent() {
    EventOngoing = true;
    flying = true;
    eventStartTime = Date.now();
    let flyingTextContainer = document.getElementById('FlyingTextContainer');
    
    let textHolder = document.createElement('div');
    flyingText.textContent = "Click atleast 15 targets";
    flyingTextContainer.appendChild(flyingText);
    textHolder.classList.add('textHolder');
    textHolder.appendChild(scoreEl);
    textHolder.appendChild(timeEl);
    flyingTextContainer.appendChild(textHolder);
    
    timerInterval = setInterval(updateTimer, 1000);

    setTimeout(endFlyingTargetEvent, 20000);
}
setInterval(createTarget, 300);
let flyingTextContainer = document.getElementById('FlyingTextContainer');
let Event = document.getElementById('Event');
let flyingText = document.createElement('h2');
flyingText.classList.add('flyingtext');
let scoreEl = document.createElement('h3');
scoreEl.style.marginRight = "10px";
let timeEl = document.createElement('h3');
function createTarget() {
    if (flying) {
        const target = document.createElement('div');
        target.classList.add('target');
        target.style.left = `${Math.random() * (window.innerWidth - 250)}px`;
        target.style.top = `${Math.random() * (window.innerHeight - 500)}px`;
        updateScore();
        target.addEventListener('click', () => {
            score++;

            target.remove();
        });

        Event.appendChild(target);
        if (flying) {
            setTimeout(() => {
                target.remove();
            }, 900);
        }
        else {
            target.remove();
        }
    }
}

function endFlyingTargetEvent() {
    if (score >= 15) {
        flying = false;
        flyingText.textContent = `Success. 10 times multiplier`;
        EventMult = 10;
        updateStatistics();
        setTimeout(function () {
            EventOngoing = false;
            EventMult = 1;
            flyingTextContainer.innerHTML= "";
            Event.innerHTML = "";
            updateStatistics();
        }, 10000);
        
    }
    else {
        flying = false;
        flyingText.textContent = `Failed. No multiplier ;-;`;
        setTimeout(function () {
            EventOngoing = false;
            flyingTextContainer.innerHTML= "";
            Event.innerHTML = "";
        }, 2000);
    }
    score = 0;
    //updateScore();
}

function updateScore() {
    scoreEl.textContent = `Score: ${score}`;
}
function updateTimer() {
    const currentTime = Math.floor((Date.now() - eventStartTime) / 1000);
    const timeLeft = Math.max(0, 20 - currentTime);
    timeEl.textContent = ` Time Left: ${timeLeft}s`;
}
