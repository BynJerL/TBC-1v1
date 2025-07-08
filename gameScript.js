class Character {
    /** @param {string} name @param {number} health @param {number} attackPower  */ 
    constructor(name, health, attackPower) {
        this.name = name;
        this.health = health;
        this.attackPower = attackPower;
    }
}

const players = [
    new Character("Hero", 100, 20),
    new Character("Villain", 80, 15)
];