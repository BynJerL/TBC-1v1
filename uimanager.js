export const UIManager = {
    selectedAction: null,
    actionTimeoutId: null,

    enableButtons () {
        document.querySelectorAll("#action-bar button").forEach(button => {
            button.disabled = false;
        });
    },

    disableButtons () {
        document.querySelectorAll("#action-bar button").forEach(button => {
            button.disabled = true;
        });
    }
}