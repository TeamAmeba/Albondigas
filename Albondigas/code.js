var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', {preload: preload, create: create, update: update});

var platforms;
var hamburgers;

var character;

var music;
var sound;

var speed = 12;

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
    game.physics.arcade.gravity.y = 1000;

    game.add.sprite(0,0,'background');
    music = game.add.audio('shampoo');
    sound = game.add.audio('numkey');

    music.play();

    platforms = game.add.group();
    platforms.enableBody = true;

    var suelo = platforms.create(0, game.world.height - 64, 'plataforma');
    suelo.scale.setTo(2.1,2);
    suelo.body.immovable = true;
    suelo.body.allowGravity = false;

    hamburgers = game.add.group();
    hamburgers.enableBody = true;

    var HAMBURGER = [];

    for(var i=0; i<3; i++) {
        HAMBURGER[i] = hamburgers.create(50, 50+60*i, 'hamburger');
        HAMBURGER[i].scale.setTo(0.1, 0.1);
        HAMBURGER[i].body.immovable = true;
        HAMBURGER[i].body.allowGravity = false;
    }
    
    character = game.add.sprite(300, 300, 'personaje');
    game.physics.enable(character, Phaser.Physics.ARCADE);
    character.body.collideWorldBounds = true;
    character.scale.setTo(0.4,0.4);
    character.anchor.setTo(0.5,0.5);

    character.animations.add('andar');
    character.animations.play('andar', 25, true);
}

function update() {
    game.physics.arcade.collide(platforms, character);

    if (checkOverlap(character, hamburgers))
    {
        //Sucede algo
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        character.scale.setTo(-0.4,0.4);
        character.x -= speed;
    }else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        character.scale.setTo(0.4,0.4);
        character.x += speed;
    }else if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        //personaje salta
    }
}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}