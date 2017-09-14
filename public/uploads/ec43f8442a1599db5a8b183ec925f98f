var CHAR_IMAGE_PATH = ["img/characterimages/"];
var CHAR_IMAGE_URLS = [CHAR_IMAGE_PATH + "northerner.jpg",
                       CHAR_IMAGE_PATH + "lannister.jpg",
                       CHAR_IMAGE_PATH + "toughfemale.jpg",
                       CHAR_IMAGE_PATH + "swordwoman.jpg",
                       CHAR_IMAGE_PATH + "femalemacer.jpg",
                       CHAR_IMAGE_PATH + "spearknight.jpg"];

var DEFAULT_COOLDOWN = 7000;
var DEFAULT_ATTACK = 20;
var DEFAULT_HEALTH = 100;
var DEFAULT_DEFENCE = 10;
var DEFAULT_SPECIAL = 30;
var HEALTH_MULTIPLIER = 5;

var enemiesDefeated = 0;
var battlesWon = 0;
var timesTrained = 0;

var battleOpen = false;

var playerOneTimer = 0;
var playerOneAbilityOne = true;
var playerOneAbilityTwo = true;
var playerOneAbilityThree = true;
var playerOneAbilityFour = true;

var EVENT_TEXTS = {"Winterfell": "Qyburn has resurrected the wicked Ramsey Bolton outside the gates of Winterfell. Bolton has made a cloak out of the Maester's skin and kidnapped the Master-at-Arms. Slay this vile beast.",
                  "Casterley Rock": "Qyburn has resurrected the dastardly Tywin Lannister inside Casterley Rock. Lannister has summoned an army of zombie soliders and plans to conquer the 7 Kingdoms. Kill him before it is too late.",
                  "Riverlands": "Qyburn has resurrected the Mountain-That-Rides (again). Gregor Clegane is slaying the peasants in the streets, burning houses down and wreaking chaos. Can you defeat this monster?",
                  "Dragonstone": "Qyburn has resurrected Stannis Baratheon. Baratheon is convinced he is the true ruler of Westeros and working alongside Melisandre, has cursed all his rivals. Stop him, now!",
                  "Beyond The Wall": "Qyburn has resurrected the Night King, the greatest ever threat to Westeros. Before he leads his army of undead south, you must stop him in his tracks and secure peace, forever.",
                  "King's Landing": "To defeat your enemies you need to get stronger. Fortunately, Qyburn has resurrected a pathetic monster, the despised King Joffrey, to help you train and improve.",
                  "Old Town": "To defeat the very strongest monsters and the Night King, you will need to improve the strength of your special ability. The Maesters in Old Town may know some secrets to help you improve."};




function Character(name, surname, affiliation, image, strength, cunning, stamina, charisma,
                    abilityOne, abilityTwo, abilityThree, specialAbilityOne, specialAbilityTwo) {
    this.name = name;
    this.surname = surname;
    this.affiliation = affiliation;
    this.image = image;
    this.strength = strength;
    this.cunning = cunning;
    this.stamina = stamina;
    this.charisma = charisma;

    this.health = DEFAULT_HEALTH + this.stamina * HEALTH_MULTIPLIER;
    this.currentHealth = this.health;

    this.attack = DEFAULT_ATTACK + strength;
    this.special = DEFAULT_SPECIAL + cunning;
    this.defence = DEFAULT_DEFENCE + stamina;
    this.cooldownTime = DEFAULT_COOLDOWN - 200 * this.charisma;

    this.abilityOne = abilityOne;
    this.abilityTwo = abilityTwo;
    this.abilityThree = abilityThree;
    this.specialAttack = specialAbilityOne;
    this.specialAttackUpgrade = specialAbilityTwo;

    this.specialsUsed = 0;
    this.enemiesDefeated = 0;
    this.battlesWon = 0;
    this.timesTrained = 0;

    this.abilityUpgraded = false;
    this.battleInstructionsRead = false;
}

var ramseyBolton = new Character("Ramsey",
                                "Bolton",
                                "Zombie",
                                CHAR_IMAGE_PATH + "ramseybolton.jpg",
                                4, 11, 5, 2,
                                swordAttack,
                                shieldDefence,
                                prayer,
                                releaseTheHounds,
                                releaseTheHounds

);

var gregorClegane = new Character("Gregor",
                                  "Clegane",
                                  "Zombie",
                                CHAR_IMAGE_PATH + "gregorclegane.jpg",
                                 14, 1, 11, 1,
                                 swordAttack,
                                 shieldDefence,
                                 prayer,
                                 faceCrusher,
                                 faceCrusher
);

var tywinLannister = new Character("Tywin",
                                   "Lannister",
                                   "Zombie",
                                CHAR_IMAGE_PATH + "tywinlannister.jpg",
                                  5, 10, 3, 7,
                                  swordAttack,
                                  shieldDefence,
                                  prayer,
                                  goldenThrow,
                                  goldenThrow
);

var stannisBaratheon = new Character("Stannis",
                                     "Baratheon",
                                     "Zombie",
                                CHAR_IMAGE_PATH + "stannisbaratheon.jpg",
                                    8, 4, 10, 2,
                                    swordAttack,
                                    shieldDefence,
                                    prayer,
                                    sacrificeChild,
                                    sacrificeChild
);

var nightKing = new Character("Night",
                              "King",
                              "Zombie",
                                CHAR_IMAGE_PATH + "nightking.jpg",
                                    10, 10, 10, 10,
                                    swordAttack,
                                    shieldDefence,
                                    prayer,
                                    zombieDragonAttack,
                                    zombieDragonAttack);

