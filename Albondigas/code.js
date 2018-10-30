var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', {preload: preload, create: create, update: update});

var platforms;
var hamburgers;

var character;

var music;
var sound;

function preload() {
    game.load.image('background', 'assets/background.png');
    game.load.image('hamburger', 'assets/hamburger.png');
    game.load.spritesheet('personaje', 'assets/personaje.png', 184,325,8);
    game.load.image('plataforma', 'assets/plataforma.png');
    
    game.load.audio('numkey', 'assets/audio/numkey.wav');
    game.load.audio('shampoo', 'assets/audio/shampoo.mp3');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0,0,'background');
    music = game.add.audio('shampoo');
    sound = game.add.audio('numkey');

    music.play();

    platforms = game.add.group();
    platforms.enableBody = true;

    var suelo = platforms.create(0, game.world.height - 64, 'plataforma');
    suelo.scale.setTo(2,2);
    suelo.body.immovable = true;

    hamburgers = game.add.group();
    hamburgers.enableBody = true;

    var HAMBURGER = [];
    HAMBURGER[0] = hamburgers.create(50, 50, 'hamburger');
    HAMBURGER[0].scale.setTo(0.1, 0.1);

    hamburgers.body.immovable = true;
    
    character = game.add.sprite(300, 300, 'personaje');
    game.physics.enable(character, Phaser.Physics.ARCADE);
    character.body.collideWorldBounds = true;
    character.scale.setTo(0.4,0.4);

    character.animations.add('andar');
    character.animations.play('andar', 25, true);
}

function update() {

}