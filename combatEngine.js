import { Fighter } from "./fighter.js";
import { UIManager } from "./uimanager.js";

export class CombatEngine {
    /** An object used to manage the game combat.
     * @param {Fighter} userFighter user--controlled fighter.
     * @param {Fighter} comFighter computer--controlled fighter. */ 
    constructor (userFighter, comFighter) {
        this.userFighter = userFighter;
        this.comFighter = comFighter;
        this.fighters = [this.userFighter, this.comFighter];
        this.currentIndex = 0;
        this.isRunning = true;
        this.winner = null;
    }
    
    /** Start the combat. */ 
    start () {
        this.currentIndex = 0;
        this.isRunning = true;
        this.winner = null;
        this.loop();
    }

    /** Combat loop. */ 
    loop () {
        if (!this.isRunning) return;

        const currentFighter = this.fighters[this.currentIndex];
        const opponentFighter = this.fighters[(this.currentIndex + 1) % 2];

        currentFighter.isGuard = false;

        console.log(`Current turn: ${currentFighter.name}`);
        this.fightersLog();

        if (currentFighter === this.userFighter) {
            document.getElementById("attack-button").onclick = () => {
                UIManager.disableButtons();
                const result = currentFighter.doAttack(opponentFighter);
                if (result.isCrit) {
                    console.log(`${currentFighter.name} dealt (critical) ${result.damage} damage to ${opponentFighter.name}.`);
                    UIManager.writeActionInfo(`You have dealt (critical) ${result.damage} damage to ${opponentFighter.name}.`);
                } else if (!result.isMiss) {
                    console.log(`${currentFighter.name} dealt ${result.damage} damage to ${opponentFighter.name}.`);
                    UIManager.writeActionInfo(`You have dealt ${result.damage} damage to ${opponentFighter.name}.`);
                } else {
                    console.log(`${currentFighter.name} missed an attack to ${opponentFighter.name}.`);
                    UIManager.writeActionInfo(`You have missed an attack to ${opponentFighter.name}.`)
                } 

                document.getElementById("next-button").style.display = "block";

                if (!opponentFighter.isAlive()) {
                    this.winner = currentFighter;
                    this.isRunning = false;
                }

                if (this.isRunning) {
                    this.currentIndex = (this.currentIndex + 1) % 2;
                    document.getElementById("next-button").onclick = () => {
                        UIManager.enableButtons();
                        document.getElementById("next-button").style.display = "none";
                        this.loop();
                    };
                } else {
                    UIManager.disableButtons();
                    console.log(`${this.winner.name} wins!`);
                    UIManager.writeActionInfo("You win!");
                }
            };

            document.getElementById("defend-button").onclick = () => {
                UIManager.disableButtons();
                currentFighter.isGuard = true;

                console.log("You increased your guard.");
                UIManager.writeActionInfo("You increased your guard.");

                document.getElementById("next-button").style.display = "block";

                if (this.isRunning) {
                    this.currentIndex = (this.currentIndex + 1) % 2;
                    document.getElementById("next-button").onclick = () => {
                        UIManager.enableButtons();
                        document.getElementById("next-button").style.display = "none";
                        this.loop();
                    };
                } else {
                    UIManager.disableButtons();
                    console.log(`${this.winner.name} wins!`);
                    UIManager.writeActionInfo("You win!");
                }
            };
        } else {
            UIManager.disableButtons();
            const result = currentFighter.doAttack(opponentFighter);
            if (result.isCrit) {
                console.log(`${currentFighter.name} dealt (critical) ${result.damage} damage to ${opponentFighter.name}`);
            } else if (!result.isMiss) {
                console.log(`${currentFighter.name} dealt ${result.damage} damage to ${opponentFighter.name}`);
            } else {
                console.log(`${currentFighter.name} missed an attack to ${opponentFighter.name}`);
            }

            if (!opponentFighter.isAlive()) {
                this.winner = currentFighter;
                this.isRunning = false;
            }

            if (this.isRunning) {
                this.currentIndex = (this.currentIndex + 1) % 2;
                setTimeout(() => {
                    UIManager.enableButtons();
                    this.loop();
                }, 1000);
            } else {
                console.log(`${this.winner.name} wins!`);
            }
        }
    }

    /** Get each fighter's status data log */ 
    fightersLog () {
        this.fighters.forEach(fighter => {
            console.log(fighter.getStr());
        });
    }
}