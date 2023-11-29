
let loaded_data = {};
function get_data() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../data', false);  // The third parameter 'false' makes the request synchronous
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                loaded_data = JSON.parse(xhr.responseText);
                console.log(loaded_data, "loaded data");
            } else {
                console.error('Error:', xhr.statusText);
            }
        }
    };
    xhr.send();//if this thing error then might be because of wrong query in views.py
}
//updating money

let skills = [];// skill list composes of many skill objects.
let powers = [];
let powerInShop = [];
let target_id = 0;
let customisationOptions={};
let selectedCustomisation = {head : "head/headDefault.png", torso:"torso/torsoDefault.png",pants:"pants/pantsDefault.png",shoes:"shoes2/shoes2Default.png"};//load from db

let theme = "../../static/game/Background.png"
get_data();

let cur_money = loaded_data["stat"]["current_money"];
let all_time_money = loaded_data["stat"]["all_time_money"];
let totalPassiveIncome = loaded_data["stat"]["passive_income"];
let money_per_click = loaded_data["stat"]["money_per_click"];
let click_counter = loaded_data["stat"]["click_counter"];
const Swordsounds = [
    "../../static/game/Sword1.mp3",
    "../../static/game/Sword2.mp3",
    "../../static/game/Sword3.mp3",
    "../../static/game/Sword4.mp3"
];
let SwordSound = "../../static/game/Sword1.mp3"

fetchPowers();// should move into get data method and then just run get data method once.
fetchSkills();
initializeSettings();
fetchCustomisation();

// Get the audio element
const backgroundAudio = document.getElementById('backgroundAudio');
// Play the audio automatically
backgroundAudio.play();



document.getElementById('money').textContent = Math.floor(cur_money);
document.addEventListener('DOMContentLoaded', fetchSkills);
document.addEventListener('DOMContentLoaded', fetchPowers);
document.addEventListener('DOMContentLoaded', fetchCustomisation);

headIdle = document.getElementById('headIdle');
torsoIdle = document.getElementById('torsoIdle');
pantsIdle = document.getElementById('pantsIdle');
shoesIdle = document.getElementById('shoesIdle');

//Clicking
const swordman = document.getElementById('swordman');
let clicking = false;


hitbox.addEventListener('mousedown', () => {
    clicking = true;
    console.log(clicking)
});

hitbox.addEventListener('mouseup', () => {
    clicking = false;
    console.log(clicking)
});

hitbox.addEventListener('click', () => {
 
    swordman.classList.add('SwingAnim');
    cur_money +=  money_per_click*EventMult;
    all_time_money += money_per_click*EventMult;
    click_counter++;
    if (click_counter%200 == 0){//chnage target every 200 clicks
        change_target();
    }
    document.getElementById('passive').textContent = (totalPassiveIncome*EventMult + money_per_click*EventMult).toFixed(1);
    document.getElementById('money').textContent = cur_money.toFixed(1);

    playRandomSound();
    gaugeValue+= 5;
    headIdle.style.visibility = 'hidden';
    torsoIdle.style.visibility = 'hidden';
    pantsIdle.style.visibility = 'hidden';
    shoesIdle.style.visibility = 'hidden';
    setTimeout(() => {
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
    console.log("\nSound Played!!!!\n")
}

function updateMoney() {
    totalPassiveIncome = 0;
    skills.forEach(skill => {
        totalPassiveIncome += skill.passive;
    }); 
    cur_money += totalPassiveIncome*EventMult;
    all_time_money += totalPassiveIncome*EventMult;
    if(clicking){
        document.getElementById('passive').textContent = (totalPassiveIncome*EventMult + money_per_click*EventMult).toFixed(1);
    }else{
    document.getElementById('passive').textContent = (totalPassiveIncome*EventMult).toFixed(1);
    }
    document.getElementById('money').textContent = (cur_money).toFixed(1);
}
setInterval(updateMoney, 1000); // Update score every second


//switching tab
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tabContent');
    tabs.forEach(tab => (tab.style.display = 'none'));

    const selectedTab = document.getElementById(tabId);
    if (tabId === 'skills'){
        selectedTab.style.display = 'block';
        updateSkillsUI();
    }
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
                    { upgradeID: powers[i+2]['powerupID'], upgradeImage: "../../static/game/black.png" },
                ],
            };
            //console.log(n);
            skills.push(n);
            i = i + 3;//must change to i = i + 5 later if add more upgrade
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

        //update skill.passive on display
        const skillPassive = document.createElement('p');
        skillPassive.textContent = 'Passive: ' + skill.passive.toFixed(1); 
        skillDetails.appendChild(skillPassive);


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
            //console.log(n);
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
        console.log(skill,skill.skill_name,powerUp.skill_name)

        // Apply the power-up effects
        skill.passive *= powerUp.multiplier;
        money_per_click *= powerUp.multiplier;
        console.log(skill.passive, "passive after update");

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
    players.sort((a, b) => b.all_time_money - a.all_time_money);

    //update this player all time money stat to show in table
    players.find(player => player.id === OurPlayerid).all_time_money = all_time_money;
    
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
                      <td>${player.all_time_money}</td>
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
                              <td>${yourData.all_time_money}</td>
                            </tr>`;
        leaderboardBody.innerHTML += yourDataRow;
      }
      // Update the content of each statistic element

    document.getElementById('AllClickStat').textContent = click_counter;
    document.getElementById('AllMoneyStat').textContent = Math.floor(all_time_money);
    document.getElementById('PassiveStat').textContent = Math.floor(totalPassiveIncome);
    document.getElementById('PerClickStat').textContent = Math.floor(money_per_click);
}

// JavaScript functions for Settings tab
function changeUsername() {
    event.preventDefault();

    const newUsername = document.getElementById('usernameInput').value;

    // Check if the input is not empty
    if (newUsername.trim() === "") {
        alert("Please enter a username.");
        return; // Don't proceed further if the input is empty
    }

    // Implement logic to update the username in the game
    else{
        fetch('http://127.0.0.1:8000/game/change-username/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') // Include CSRF token
            },
            body: JSON.stringify({ username: newUsername })
        });
        alert("Username is Changed!!");
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

// ต้องแก้ดึงจาก DB
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

let players = loaded_data["leaderboard"]
var  OurPlayerid = parseInt(current_user_id) ;


//Clicking


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
    volumeSlider.value = loaded_data["setting"]["sound_volumn"];
    themeSelect.value = loaded_data["setting"]["theme"];
    notificationToggle.checked = loaded_data["setting"]["notification"];
    // usernameInput.value = initialUsername;
    changeTheme(themeSelect.value)
}
//Event
// Set interval to check for events every second
setInterval(EventOccur, 10000);
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
function saveManually() {//save game function
    stat = {
        "all_time_money":all_time_money,
        "passiveincome":totalPassiveIncome,
        "current_money":cur_money,
        "money_per_click":money_per_click,
        "click_counter":click_counter
    }
    setting ={
        "theme": document.getElementById('themeSelect').value,
        "sound_volumn": document.getElementById('volumeSlider').value,
        "notification": document.getElementById('notificationToggle').checked
    }
    fetch('http://127.0.0.1:8000/game/save-data/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken') // Include CSRF token
        },
        body: JSON.stringify({
            User_Skill:skills,
            Stat:stat,
            User_PowerUp:powers,
            Setting:setting
        })
    });
    console.log("Game is SAVED!!");
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


function change_target(){
    while(true){
        random_target_id = parseInt(Math.random() * 10);
        console.log(random_target_id,"random target ID");
        if(random_target_id != target_id){
            target_id = random_target_id;
            break;
        }
    }
    document.getElementById('dummy').src = '../../static/game/monster' + target_id + '.png';
}