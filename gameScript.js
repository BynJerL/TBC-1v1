class Character {
    /** @param {string} name @param {number} health @param {number} attackPower  */ 
    constructor(name, health, attackPower) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.attackPower = attackPower;
    }

    /** @param {number} amount*/ 
    modifyHealth (amount) {
        this.health = Math.max(0, Math.min(this.health + amount, this.maxHealth));
    }

    /** @param {number} amount */
    takeDamage (amount) {
        this.modifyHealth(-amount);
    }

    /** @param {Character} target */
    attack (target) {
        target.takeDamage(this.attackPower);
    } 

    isAlive () {
        return this.health > 0;
    }

    getStr () {
        return `${this.name} [HP: ${this.health}/${this.maxHealth}] [ATK: ${this.attackPower}]`;
    }
}

const players = [
    new Character("Hero", 100, 20),
    new Character("Villain", 80, 15)
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
        if (this.isRunning === true) {
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