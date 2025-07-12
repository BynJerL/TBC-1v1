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

    writeActionInfo (content) {
        document.getElementById('action-text').innerHTML = content;
    }
}