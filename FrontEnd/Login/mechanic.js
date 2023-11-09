let score = 0;
        let passiveScore = 0;
        let upgrade1Level = 0;
        let upgrade2Level = 0;

        function updateScore() {
            score += passiveScore;
            document.getElementById('scoreValue').textContent = score;
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

        setInterval(updateScore, 1000); // Update score every second

        // Add event listener to the cookie for manual clicking
        document.getElementById('cookie').addEventListener('click', function() {
            score++;
            document.getElementById('scoreValue').textContent = score;
        });