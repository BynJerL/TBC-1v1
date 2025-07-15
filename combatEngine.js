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
        this.userFighter.currSp = Math.floor(this.userFighter.maxSp / 2);
        this.comFighter.currSp = Math.floor(this.comFighter.maxSp / 2);
        UIManager.initHPBars(this.userFighter, this.comFighter);
        UIManager.initSPBars(this.userFighter, this.comFighter);
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
            UIManager.highlightPlayer();
            UIManager.setAttackButtonListener(() => {
                UIManager.disableButtons();
                const result = currentFighter.doAttack(opponentFighter);
                if (result.isCrit) {
                    UIManager.flickerEnemySprite();
                    console.log(`${currentFighter.name} dealt (critical) ${result.damage} damage to ${opponentFighter.name}.`);
                    UIManager.typeWriterActionInfo(`You have dealt (critical) ${result.damage} damage to ${opponentFighter.name}.`);
                } else if (!result.isMiss) {
                    UIManager.flickerEnemySprite();
                    console.log(`${currentFighter.name} dealt ${result.damage} damage to ${opponentFighter.name}.`);
                    UIManager.typeWriterActionInfo(`You have dealt ${result.damage} damage to ${opponentFighter.name}.`);
                } else {
                    console.log(`${currentFighter.name} missed an attack to ${opponentFighter.name}.`);
                    UIManager.typeWriterActionInfo(`You have missed an attack to ${opponentFighter.name}.`)
                }

                UIManager.updateEnemyHPBar(opponentFighter);

                setTimeout(() => {
                    UIManager.showNextButton();

                    if (!opponentFighter.isAlive()) {
                        this.winner = currentFighter;
                        this.isRunning = false;
                    }

                    this.checkGameState();
                }, 400);
            });
            UIManager.setDefendButtonListener(() => {
                UIManager.disableButtons();
                currentFighter.isGuard = true;
                currentFighter.gainSp(currentFighter.spGain);

                console.log("You have increased your defense.");
                UIManager.updatePlayerSPBar(currentFighter);
                UIManager.writeActionInfo("You have increased your defense.");

                setTimeout(() => {
                    UIManager.showNextButton();
                    this.checkGameState();
                }, 400);
            });
        } else {
            UIManager.highlightEnemy();
            UIManager.disableButtons();
            const result = currentFighter.doAttack(opponentFighter);
            if (result.isCrit) {
                UIManager.flickerPlayerSprite();
                console.log(`${currentFighter.name} has dealt (critical) ${result.damage} damage to ${opponentFighter.name}`);
                UIManager.typeWriterActionInfo(`${currentFighter.name} has dealt (critical) ${result.damage} damage to ${opponentFighter.name}`);
            } else if (!result.isMiss) {
                UIManager.flickerPlayerSprite();
                console.log(`${currentFighter.name} has dealt ${result.damage} damage to ${opponentFighter.name}`);
                UIManager.typeWriterActionInfo(`${currentFighter.name} has dealt ${result.damage} damage to ${opponentFighter.name}`);
            } else {
                console.log(`${currentFighter.name} has missed an attack to ${opponentFighter.name}`);
                UIManager.typeWriterActionInfo(`${currentFighter.name} has missed an attack to ${opponentFighter.name}`);
            }

            UIManager.updatePlayerHPBar(opponentFighter);
            setTimeout(() => {
                UIManager.showNextButton();

                if (!opponentFighter.isAlive()) {
                    this.winner = currentFighter;
                    this.isRunning = false;
                }

                this.checkGameState();
            }, 400);
        }
    }

    checkGameState () {
        if (this.isRunning) {
            this.currentIndex = ++this.currentIndex % 2;
            UIManager.setNextButtonListener(() => {
                UIManager.enableButtons();
                UIManager.hideNextButton();
                UIManager.writeActionInfo("Choose your action.");
                this.loop();
            });
        } else {
            UIManager.setNextButtonListener(() => {
                UIManager.disableButtons();
                UIManager.hideNextButton();
                console.log(`${this.winner.name} wins!`);
                if (this.winner === this.userFighter) {
                    UIManager.blurEnemy();
                    UIManager.writeActionInfo("You win!"); 
                } else {
                    UIManager.blurPlayer();
                    UIManager.writeActionInfo("You lose!"); 
                }
            });
        }
    }

    /** Get each fighter's status data log */ 
    fightersLog () {
        this.fighters.forEach(fighter => {
            console.log(fighter.getStr());
        });
    }
}