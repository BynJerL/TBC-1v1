export class Fighter {
    /** An object contains necessary data for the fighter.
     * @param {string} name name of the fighter.
     * @param {number} Hp initial value of health point of the fighter.
     * @param {number} Sp initial value of skill point of the fighter.
     * @param {number} attack initial value of attack point of the fighter.
     * @param {number} defense initial value of defense point of the fighter.
     * @param {number} evasion initial value of evasion point of the fighter.
     * @param {number} speed initial value of speed point of the fighter.
     * @param {number} critChance initial value of chance of critical hit.
     * @param {number} critDamage initial value of damage boost from critical hit. 
     * @param {number} spGain initial value of skill point gain from guarding.
     * */ 
    constructor ({name, Hp, Sp, attack, defense, speed, evasion = 0.05, critChance = 0.1, critDamage = 0.5, spGain = 3}) {
        this.name = name;
        this.currHp = Hp;
        this.maxHp = Hp;
        this.currSp = Sp;
        this.maxSp = Sp;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.evasion = evasion;
        this.critChance = critChance;
        this.critDamage = critDamage;
        this.spGain = spGain;
        this.isGuard = false;
    }

    /** Check if the player is alive or not. 
     * @returns {boolean}*/ 
    isAlive () {
        return this.currHp > 0;
    }

    /** Check if the player trigger critical hit or not.
     * @returns {boolean}*/ 
    isCrit () {
        return Math.random() < this.critChance;
    }

    /** Check if the skill point is enough for performing a skill.
     * @param {number} requiredSp cost of the skill.
     * @returns {boolean}*/
    isNotEnoughSp (requiredSp) {
        return this.currSp < requiredSp;
    }

    /** Modify health point by certain amount.
     * @param {number} amount amount of change.
     * @returns {void}*/ 
    modifyHpBy (amount) {
        this.currHp = Math.max(0, Math.min(this.currHp + amount, this.maxHp));
    }

    /** Modify skill point by certain amount.
     * @param {number} amount amount of change.
     * @returns {void}*/
    modifySpBy (amount) {
        this.currSp = Math.max(0, Math.min(this.currSp + amount, this.maxSp));
    }

    /** Decrease health point by certain amount.
     * @param {number} amount amount of change.
     * @returns {void}*/ 
    takeDamage (amount) {
        this.modifyHpBy(-amount);
    }

    /** Decrease skill point by certain amount.
     * @param {number} amount amount of change.
     * @returns {void}*/ 
    paySkill (amount) {
        this.modifySpBy(-amount);
    }

    /** Increase health point by certain amount.
     * @param {number} amount amount of change.
     * @returns {void}*/
    gainHp (amount) {
        this.modifyHpBy(amount);
    }

    /** Increase skill point by certain amount.
     * @param {number} amount amount of change.
     * @returns {null}*/
    gainSp (amount) {
        this.modifySpBy(amount);
    }

    /** Perform attack to a target.
     * @param {Fighter} target fighter that you attack.
     * @returns {{damage: number, isCrit: boolean, isMiss: boolean}}*/ 
    doAttack (target) {
        const isMiss = Math.random() < target.evasion;
        if (isMiss) return {damage: 0, isCrit: false, isMiss: true};

        const isCrit = this.isCrit();
        const rawDamage = this.attack * (1 + isCrit * this.critDamage);
        const actualDamage = Math.max(0, Math.floor(rawDamage - (0.2 + 0.6 * target.isGuard) * target.defense));

        target.takeDamage(actualDamage);
        return {
            damage: actualDamage,
            isCrit: isCrit,
            isMiss: false
        };
    }

    /** Get a string representation of the fighter's status.
     * @returns {string}*/
    getStr () {
        return `${this.name} [HP: ${this.currHp}/${this.maxHp}] [SP: ${this.currSp}/${this.maxSp}] [ATK: ${this.attack}] [DEF: ${this.defense}] [SPD: ${this.speed}]`;
    }
}