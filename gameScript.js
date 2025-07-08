class Character {
    /** @param {string} name @param {number} health @param {number} attackPower @param {number} defensePower  */ 
    constructor(name, health, attackPower, defensePower, critChance = 0.1, critDamage = 0.5) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.attackPower = attackPower;
        this.defensePower = defensePower;
        this.critChance = critChance;
        this.critDamage = critDamage;
    }

    /** @param {number} amount*/ 
    modifyHealth (amount) {
        this.health = Math.max(0, Math.min(this.health + amount, this.maxHealth));
    }

    /** @param {number} amount */
    takeDamage (amount) {
        this.modifyHealth(-amount);
    }

    /** @param {Character} target @returns {number} */
    attack (target) {
        const isCrit = Math.random() < 0.1;
        const damage = Math.max(0, Math.floor(this.attackPower * (1 + isCrit * this.critDamage) - target.defensePower * 0.5));
        target.takeDamage(damage);
        return damage;
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
            const damage = currentPlayer.attack(opponent);
            console.log(`${currentPlayer.name} dealt ${damage} damage to ${opponent.name}!`);
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