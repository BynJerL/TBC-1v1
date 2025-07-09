class Fighter {
    /**
     * An object contains necessary data for the fighter.
     * @param {string} name used for naming the fighter.
     * @param {number} Hp initial value of health point of the fighter.
     * @param {number} Sp initial value of skill point of the fighter.
     * @param {number} attack initial value of attack point of the fighter.
     * @param {number} defense initial value of defense point of the fighter.
     * @param {number} evasion initial value of evasion point of the fighter.
     * @param {number} speed initial value of speed point of the fighter.
     * @param {number} critChance initial value of chance of critical hit.
     * @param {number} critDamage initial value of damage boost from critical hit. */ 
    constructor (name, Hp, Sp, attack, defense, speed, evasion, critChance, critDamage) {
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
        this.isGuard = false;
    }

    /** @returns {boolean}*/ 
    isAlive () {
        return this.currHp > 0;
    }

    /** @returns {boolean}*/ 
    isCrit () {
        return Math.random() < this.critChance;
    }

    /** @returns {boolean}*/
    isNotEnoughSp (requiredSp) {
        return this.currSp < requiredSp;
    }

    /** 
     * @param {number} amount 
     * @returns {void}*/ 
    modifyHpBy (amount) {
        this.currHp = Math.max(0, Math.min(this.currHp + amount, this.maxHp));
    }

    /** 
     * @param {number} amount 
     * @returns {void}*/
    modifySpBy (amount) {
        this.currSp = Math.max(0, Math.min(this.currSp + amount, this.maxSp));
    }

    /** 
     * @param {number} amount 
     * @returns {void}*/ 
    takeDamage (amount) {
        this.modifyHpBy(-amount);
    }

    /** 
     * @param {number} amount 
     * @returns {void}*/ 
    paySkill (amount) {
        this.modifySpBy(-amount);
    }

    /** 
     * @param {number} amount 
     * @returns {void}*/
    gainHp (amount) {
        this.modifyHpBy(amount);
    }

    /** 
     * @param {number} amount 
     * @returns {null}*/
    gainSp (amount) {
        this.modifySpBy(amount);
    }
}