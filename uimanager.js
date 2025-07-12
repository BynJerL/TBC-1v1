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
    }
}