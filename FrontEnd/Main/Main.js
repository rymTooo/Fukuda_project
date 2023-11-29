
//updating money
let money_per_click = 10;
let money = 0;
let skills = [];
let powers = [];
let powerInShop = [];
let totalPassiveIncome = 0;
let purchasedPowerUps = [];
let theme = "Background.png"
const Swordsounds = [
    "Sword1.mp3",
    "Sword2.mp3",
    "Sword3.mp3",
    "Sword4.mp3"
];
let SwordSound = "Sword1.mp3"
fetchPowers();
fetchSkills();

// Get the audio element
const backgroundAudio = document.getElementById('backgroundAudio');

// Play the audio automatically
backgroundAudio.play();


document.addEventListener('DOMContentLoaded', fetchSkills);
document.addEventListener('DOMContentLoaded', fetchPowers);



//Clicking
const swordman = document.getElementById('swordman');

let clicking = false;

hitbox.addEventListener('mousedown', () => {
    clicking = true;
});

hitbox.addEventListener('mouseup', () => {
    clicking = false;
});

hitbox.addEventListener('click', () => {

    swordman.classList.add('SwingAnim');
    money = money + money_per_click * EventMult;
    document.getElementById('passive').textContent = (totalPassiveIncome * EventMult + money_per_click * EventMult).toFixed(1);
    document.getElementById('money').textContent = money.toFixed(1);

    playRandomSound();
    gaugeValue += 5;
    setTimeout(() => {
        swordman.classList.remove('SwingAnim');

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
        document.getElementById('passive').textContent = (totalPassiveIncome * EventMult + money_per_click * EventMult).toFixed(1);
    } else {
        document.getElementById('passive').textContent = (totalPassiveIncome * EventMult).toFixed(1);
    }
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
        skillName.textContent = skill.name; // Replace with your skill name property
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

// JavaScript functions for Settings tab
function changeUsername() {
    const newUsername = document.getElementById('usernameInput').value;
    // Implement logic to update the username in the game

}

function saveGame() {
    // Implement logic to save the game state

    alert('Game saved I NA HEE');
}

function logOut() {
    // Implement logic to save the game state

    alert('Logged Out I NA HEE');
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
eventProb = 10000;

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
                    clickGaugeEvent();
                    break;
                case 1:
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
let EventMult = 1;
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
            setTimeout(function () {
                EventOngoing = false;
                EventMult = 1;
                Event.innerHTML = "";
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
        setTimeout(function () {
            EventOngoing = false;
            EventMult = 1;
            flyingTextContainer.innerHTML= "";
            Event.innerHTML = "";
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