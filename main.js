import { Fighter } from "./fighter.js";
import { CombatEngine } from "./combatEngine.js";

const player = new Fighter({name: "Hero", Hp: 100, Sp: 20, attack: 20, defense: 20, speed: 100});
const enemy = new Fighter({name: "Enemy", Hp: 80, Sp: 20, attack: 25, defense: 15, speed: 100});

const engine = new CombatEngine(player, enemy);
engine.start();