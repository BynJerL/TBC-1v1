import { Fighter } from "./fighter";

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

        const currentPlayer = this.fighters[this.currentIndex];
        const opponent = this.fighters[(this.currentIndex + 1) % 2];

        const result = currentPlayer.doAttack(opponent);
        if (result.isCrit) {
            console.log(`${currentPlayer.name} dealt (critical) ${result.damage} damage to ${opponent.name}`);
        } else if (!result.isMiss) {
            console.log(`${currentPlayer.name} dealt ${result.damage} damage to ${opponent.name}`);
        } else {
            console.log(`${currentPlayer.name} missed an attack to ${opponent.name}`);
        }

        if (!opponent.isAlive()) {
            this.winner = currentPlayer;
            this.isRunning = false;
        }

        if (this.isRunning) {
            this.currentIndex = (this.currentIndex + 1) % 2
            this.loop();
        } else {
            console.log(`${this.winner} wins!`);
        }
    }
}