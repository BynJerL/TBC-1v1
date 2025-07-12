import { Fighter } from "./fighter.js";

export const UIManager = {
    selectedAction: null,
    actionTimeoutId: null,

    enableButtons () {
        document.querySelectorAll("#action-bar button").forEach(button => {
            button.disabled = false;
            button.attributes['title'].value = "";
        });
    },

    disableButtons () {
        document.querySelectorAll("#action-bar button").forEach(button => {
            button.disabled = true;
            button.attributes['title'].value = `Cannot use "${button.querySelector(".action-name").textContent}" now.`;
        });
    },

    /** Set the attack button onclick listener.
     * @param {Function} callback 
     */ 
    setAttackButtonListener (callback) {
        document.getElementById("attack-button").onclick = () => {
            return callback();
        };
    },

    /** Set the defend button onclick listener.
     * @param {Function} callback 
     */
    setDefendButtonListener (callback) {
        document.getElementById("defend-button").onclick = () => {
            return callback();
        };
    },

    showNextButton () {
        document.getElementById("next-button").style.display = "block";
    },

    hideNextButton () {
        document.getElementById("next-button").style.display = "none";
    },

    /** Set the next button onclick listener.
     * @param {Function} callback 
     */ 
    setNextButtonListener (callback = () => {}) {
        document.getElementById("next-button").onclick = () => {
            return callback();
        };
    },

    writeActionInfo (content) {
        document.getElementById('action-text').innerHTML = content;
    },

    /**
     * @param {Fighter} enemy */ 
    changeEnemyHPBar (enemy) {
        const hpPercentage = Math.floor(enemy.currHp * 100 / enemy.maxHp);
        document.querySelector("#enemy-sprite .hp-fill").style.width = `${hpPercentage}%`;
        document.querySelector("#enemy-sprite .hp-value").textContent = `${enemy.currHp}/${enemy.maxHp}`;
    },

    /**
     * @param {Fighter} player */ 
    changePlayerHPBar (player) {
        const hpPercentage = Math.floor(player.currHp * 100 / player.maxHp);
        document.querySelector("#player-sprite .hp-fill").style.width = `${hpPercentage}%`;
        document.querySelector("#player-sprite .hp-value").textContent = `${player.currHp}/${player.maxHp}`;
    },

    /**
     * @param {Fighter} userFighter
     * @param {Fighter} comFighter  */ 
    initHPBars (userFighter, comFighter) {
        document.querySelectorAll(".hp-fill").forEach(hpFill => {
            hpFill.style.width = "100%";
        });
        document.querySelector("#player-sprite .hp-value").textContent = `${userFighter.currHp}/${userFighter.maxHp}`;
        document.querySelector("#enemy-sprite .hp-value").textContent = `${comFighter.currHp}/${comFighter.maxHp}`;
    }
}