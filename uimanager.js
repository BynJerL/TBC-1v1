export const UIManager = {
    selectedAction: null,
    actionTimeoutId: null,

    init () {
        this.actionText = document.getElementById("action-text");
        this.nextButton = document.getElementById("next-button");
        this.actionButtons = document.querySelectorAll("#action-bar button");

        this._setupListeners();
    },

    _setupListeners () {
        document.getElementById("attack-button").onclick = () => {this.handleClick("action")};
        document.getElementById("defend-button").onclick = () => {this.handleClick("defend")};
        document.getElementById("special-button").onclick = () => {this.handleClick("special")};
        document.querySelector(".check-stats-button").onclick = () => {this.handleClick("stats")};
        this.nextButton.onclick = () => {
            this.enableButtons();
            this.nextButton.style.display = 'none';
            this.writeText("Choose your action.");
        };
    }
}