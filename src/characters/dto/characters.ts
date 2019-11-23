interface Perks {
    proficiency: string[];
    savingThrows: string[];
}

interface DeathSaves {
    death: number;
    live: number;
}

interface BaseCharacteristics {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}

interface Hitpoints {
    current: number;
    maximum: number;
    temporarly: number;
    dices: number;
}

type Alignments = 'LG' |
    'NG' |
    'CG' |
    'NG' |
    'NN' |
    'CN' |
    'LE' |
    'NE' |
    'CE';

interface Weapon {
    name: string;
    attackBonus: number;
    damage: string;
}

interface Money {
    gold: number;
    copper: number;
    silver: number;
    electrum: number;
    platinum: number;
}

interface Equipment {
    name: string;
    quantity: number;
}

interface Inventory {
    money: Money;
    other: Equipment[];
}

interface CharacterClass {
    type: string;
    level: number;
}

export class Character {
    id: number;
    level: number;
    fullName: string;
    classes: CharacterClass[];
    photo: string;
    race: string;
    perks: Perks;
    deathSaves: DeathSaves;
    speed: number;
    profiencyBonus: number;
    baseCharacteristics: BaseCharacteristics;
    hitpoints: Hitpoints;
    experience: number;
    alignment: Alignments;
    armor: number;
    weapons: Weapon[];
    languages: string[];
    otherProfiencies: string[];
    equipment: Inventory;
    personalityTraits: string;
    ideals: string;
    bonds: string;
    flaws: string;
    features: string[];
}
