class Character {
    /** 
     * @param {string} name @param {number} health 
     * @param {number} attackPower @param {number} defensePower  
     * */ 
    constructor(name, health, attackPower, defensePower, critChance = 0.1, critDamage = 0.5, evasion = 0.05) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.attackPower = attackPower;
        this.defensePower = defensePower;
        this.fireResistance = null;
        this.waterResistance = null;
        this.earthResistance = null;
        this.windResistance = null;
        this.lightningResistance = null;
        this.critChance = critChance;
        this.critDamage = critDamage;
        this.evasion = evasion;
        this.isGuard = false;
    }

    /** @param {number} amount*/ 
    modifyHealth (amount) {
        this.health = Math.max(0, Math.min(this.health + amount, this.maxHealth));
    }

    /** @param {number} amount */
    takeDamage (amount) {
        this.modifyHealth(-amount);
    }

    /** @param {Character} target @returns {number, null} */
    attack (target) {
        const isCrit = Math.random() < this.critChance;
        const isMiss = Math.random() < target.evasion;
        const damage = (!isMiss)? Math.max(0, Math.floor(this.attackPower * (1 + isCrit * this.critDamage) - (target.defensePower * 0.2 + target.isGuard * target.defensePower * 0.6))) : null;
        target.takeDamage((damage !== null)? damage: 0);
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
    new Character("Hero", 500, 30, 120),
    new Character("Villain", 1000, 50, 0)
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
            if (damage !== null) {
                console.log(`${currentPlayer.name} dealt ${damage} damage to ${opponent.name}!`);
            } else {
                console.log(`${currentPlayer.name} missed attack on ${opponent.name}`);
            }
            
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