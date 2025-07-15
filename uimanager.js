import { Fighter } from "./fighter.js";

export const UIManager = {
    selectedAction: null,
    actionTimeoutId: null,

    enableButtons () {
        document.querySelectorAll("#action-bar button").forEach(button => {
            const isDisabled = button.getAttribute("data-disabled");
            if (isDisabled === "true") return;

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
     * @param {string} content */ 
    typeWriterActionInfo (content) {
        const el = document.getElementById('action-text');
        el.innerHTML = "";

        let i = 0;
        const speed = 5;
        function type () {
            if (i < content.length) {
                el.textContent += content.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    },

    /**
     * @param {Fighter} enemy */ 
    updateEnemyHPBar (enemy) {
        const hpPercentage = Math.floor(enemy.currHp * 100 / enemy.maxHp);
        document.querySelector("#enemy-sprite .hp-fill").style.width = `${hpPercentage}%`;
        document.querySelector("#enemy-sprite .hp-value").textContent = `${enemy.currHp}/${enemy.maxHp}`;
    },

    /**
     * @param {Fighter} player */ 
    updatePlayerHPBar (player) {
        const hpPercentage = Math.floor(player.currHp * 100 / player.maxHp);
        document.querySelector("#player-sprite .hp-fill").style.width = `${hpPercentage}%`;
        document.querySelector("#player-sprite .hp-value").textContent = `${player.currHp}/${player.maxHp}`;
    },

    /**
     * @param {Fighter} player */ 
    updatePlayerSPBar (player) {
        const spPercentage = Math.floor(player.currSp * 100 / player.maxSp);
        document.querySelector("#player-sprite .sp-fill").style.width = `${spPercentage}%`;
        document.querySelector("#player-sprite .sp-value").textContent = `${player.currSp}/${player.maxSp}`;
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
    },

    /**
     * @param {Fighter} userFighter
     * @param {Fighter} comFighter */ 
    initSPBars (userFighter, comFighter) {
        const playerSpPercentage = Math.floor(userFighter.currSp * 100 / userFighter.maxSp);
        const enemySpPercentage = Math.floor(comFighter.currSp * 100 / comFighter.maxSp);
        document.querySelector("#player-sprite .sp-fill").style.width = `${playerSpPercentage}%`;
        document.querySelector("#enemy-sprite .sp-fill").style.width = `${enemySpPercentage}%`;
        document.querySelector("#player-sprite .sp-value").textContent = `${userFighter.currSp}/${userFighter.maxSp}`;
        document.querySelector("#enemy-sprite .sp-value").textContent = `${comFighter.currSp}/${comFighter.maxSp}`;
    },

    highlightPlayer () {
        document.querySelector("#player-sprite .sprite-image").style.filter = "";
        document.querySelector("#enemy-sprite .sprite-image").style.filter = "brightness(40%)";
    },

    highlightEnemy () {
        document.querySelector("#player-sprite .sprite-image").style.filter = "brightness(40%)";
        document.querySelector("#enemy-sprite .sprite-image").style.filter = "";
    },

    blurPlayer () {
        document.querySelector("#player-sprite .sprite-image").classList.add("beaten");
    },

    blurEnemy () {
        document.querySelector("#enemy-sprite .sprite-image").classList.add("beaten");
    },

    flickerPlayerSprite () {
        const sprite = document.querySelector("#player-sprite .sprite-image");
        sprite.classList.add("sprite-hit");
        setTimeout(() => {
            sprite.classList.remove("sprite-hit");
        }, 400);
    },

    flickerEnemySprite () {
        const sprite = document.querySelector("#enemy-sprite .sprite-image");
        sprite.classList.add("sprite-hit");
        setTimeout(() => {
            sprite.classList.remove("sprite-hit");
        }, 400);
    }
}