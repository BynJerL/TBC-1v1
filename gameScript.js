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
        return this.health <= 0;
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

    init () {
        this.isRunning = true;
        for (const player of players) {
            console.log(player.getStr());
        }
    },
    run () {
        // 
    }
}

GameManager.init()