class Character {
    /** @param {string} name @param {number} health @param {number} attackPower @param {number} defensePower  */ 
    constructor(name, health, attackPower, defensePower) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.attackPower = attackPower;
        this.defensePower = defensePower;
    }

    /** @param {number} amount*/ 
    modifyHealth (amount) {
        this.health = Math.max(0, Math.min(this.health + amount, this.maxHealth));
    }

    /** @param {number} amount */
    takeDamage (amount) {
        this.modifyHealth(Math.min(0, -amount));
    }

    /** @param {Character} target */
    attack (target) {
        target.takeDamage(Math.floor(this.attackPower - target.defensePower * 0.5));
    } 

    isAlive () {
        return this.health > 0;
    }

    getStr () {
        return `${this.name} [HP: ${this.health}/${this.maxHealth}] [ATK: ${this.attackPower}]`;
    }
}

const players = [
    new Character("Hero", 300, 30, 100),
    new Character("Villain", 150, 15, 5)
];

const GameManager = {
    isRunning : true,
    winner: null,
    currentIndex: 0,

    init () {
        this.isRunning = true;
        this.currentIndex = 0;
        this.winner = null;
        for (const player of players) {
            console.log(player.getStr());
        }
        this.run();
    },
    run () {
        const currentPlayer = players[this.currentIndex];
        const opponentIndex = (this.currentIndex + 1) % players.length;
        const opponent = players[opponentIndex];

        if (currentPlayer.isAlive() && opponent.isAlive()) {
            currentPlayer.attack(opponent);
            console.log(`${currentPlayer.name} attacks ${opponent.name}!`);
            console.log(opponent.getStr());
        }

        if (!opponent.isAlive()) {
            this.isRunning = false;
        }

        if (players.filter(player => player.isAlive()).length === 1) {
            this.winner = players.find(player => player.isAlive());
            this.isRunning = false;
        }

        this.checkState();
    },
    checkState () {
        if (this.isRunning) {
            this.currentIndex = (this.currentIndex + 1) % players.length;
            this.run();
        } else {
            if (this.winner) {
                console.log(`${this.winner.name} wins!`);
            } else {
                console.log("It's a draw!");
            }
        }
    }
}

GameManager.init();