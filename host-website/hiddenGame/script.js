class Player{
    constructor(game){
        this.game = game;
        this.width = 60;
        this.height = 60;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.speed = 5;
        this.lives = 3;
        this.image = document.getElementById('player');
        this.jets_img = document.getElementById('player_jet');
        this.jets_destroyed = document.getElementById('player_destroyed');
        this.frameX = 0;
    }

    draw(context){
        //context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.jets_img, this.x, this.y, this.width, this.height);
        if(this.game.gameover){
            context.drawImage(this.jets_destroyed, this.x, this.y, this.width, this.height);
        }
    }
    update(){
        if(this.game.keys.indexOf('ArrowLeft') > -1){
            this.x -= this.speed;
        }
        if(this.game.keys.indexOf('ArrowRight') > -1){
            this.x += this.speed;
        }

        if(this.x < -this.width * 0.5){
            this.x = -this.width * 0.5;
        }
        else if(this.x > this.game.width - this.width * 0.5){
            this.x = this.game.width - this.width * 0.5;
        }
    }
    shoot(){
        const projectile = this.game.getProjectile();
        if(projectile){
            projectile.start(this.x + this.width * 0.5, this.y);
        }
    }
    restart(){
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.lives = 3;
    }
}

class Projectile{
    constructor(){
        this.width = 7;
        this.height = 20;
        this.x = 0;
        this.y = 0;
        this.speed = 25;
        this.free = true;
        this.img = document.getElementById('bullet');
    }
    draw(context){
        if(!this.free){
            //context.save();
            //context.fillStyle = 'orange';
            //context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.img, this.x, this.y, this.width, this.height);
            //context.restore();
        }
    }
    update(){
        if(!this.free){
            this.y -= this.speed;
            if(this.y < -this.height){
                this.reset();
            }
        }
    }
    start(x, y){
        this.x = x - this.width * 0.5;
        this.y = y;
        this.free = false;
    }
    reset(){
        this.free = true;
    }
}

class Enemy{
    constructor(game, positionX, positionY){
        this.game = game;
        this.width = this.game.sizeEnemy;
        this.height = this.game.sizeEnemy;
        this.x = 0;
        this.y = 0;
        this.positionX = positionX;
        this.positionY = positionY;
        this.toDelete = false;
        this.explosion = new Audio("./assets/xplosion_fx.mp3");
    }
    draw(context){
        //context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update(x, y){
        this.x = x + this.positionX;
        this.y = y + this.positionY;
        this.game.projectilePool.forEach(proj => {
            if(!proj.free && this.game.isCollide(this, proj) && this.lives > 0){
                //this.toDelete = true;
                this.hit(1);
                proj.reset();
            }
        });
        if(this.lives < 1){
            if(this.game.spriteUpdate) this.frameX++;
            var sound_checkbox = document.getElementById('sound');
            if(this.frameX > this.maxFrame){
                this.toDelete = true;
                if(sound_checkbox.checked){
                    this.explosion.play();
                }
                if(!this.game.gameover){
                    this.game.score += this.maxLives;
                }
            }
        }
        // ütközés a játékossal
        if(this.game.isCollide(this, this.game.player)){
            this.toDelete = true;
            if(!this.game.gameover && this.game.score > 0){
                this.game.score--;
                this.game.player.lives--;
                if(this.game.player.lives < 1){
                    this.game.gameover = true;
                }
            }
        }
        // mikor van vége
        if(this.y + this.height > this.game.height){
            this.game.gameover = true;
            this.toDelete = true;
            //this.restart();
        }
    }
    hit(damage){
        this.lives -= damage;
    }
    restart(){
        this.game = game;
        this.width = this.game.sizeEnemy;
        this.height = this.game.sizeEnemy;
        this.x = 0;
        this.y = 0;
        this.positionX = positionX;
        this.positionY = positionY;
        this.toDelete = false;
    }
}

class RedBomber extends Enemy{
    constructor(game, positionX, positionY){
        super(game, positionX, positionY);
        this.image = document.getElementById('redbomber');
        this.frameX = 0;    // kép sora
        this.frameY = 0;    // kép oszlopa
        this.maxFrame = 10;
        this.lives = 1;
        this.maxLives = this.lives;
    }
}

class RedScout extends Enemy{
    constructor(game, positionX, positionY){
        super(game, positionX, positionY);
        this.image = document.getElementById('redscout');
        this.frameX = 0;    // kép sora
        this.frameY = 0;    // kép oszlopa
        this.maxFrame = 10;
        this.lives = 1;
        this.maxLives = this.lives;
    }
}

class RedTorpedo extends Enemy{
    constructor(game, positionX, positionY){
        super(game, positionX, positionY);
        this.image = document.getElementById('redtorpedo');
        this.frameX = 0;    // kép sora
        this.frameY = 0;    // kép oszlopa
        this.maxFrame = 10;
        this.lives = 1;
        this.maxLives = this.lives;
    }
}

class GreenBoss extends Enemy{
    constructor(game, positionX, positionY){
        super(game, positionX, positionY);
        this.image = document.getElementById('greenboss');
        this.frameX = 0;    // kép sora
        this.frameY = 0;    // kép oszlopa
        this.maxFrame = 13;
        this.lives = 6;
        this.maxLives = this.lives;
        super.width = this.game.sizeEnemy + 50;
        super.height = this.game.sizeEnemy + 50;
    }
    hit(damage){
        this.lives -= damage;
        this.frameX = this.maxLives - this.lives;
    }
}

class Wave{
    constructor(game){
        this.game = game;
        this.width = this.game.cols * this.game.sizeEnemy;
        this.height = this.game.rows * this.game.sizeEnemy;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = -this.height;
        this.speedX = Math.random() < 0.5 ? -3 : 3;
        this.speedY = 0;
        this.enemies = [];
        this.create();
        //this.big_time();
    }
    render(context){
        if(this.y < 0){
            this.y += 5;
        }
        this.speedY = 0;
        //context.strokeRect(this.x, this.y, this.width, this.height);
        if(this.x < 0 || this.x > this.game.width - this.width){
            this.speedX *= -1;
            this.speedY = this.game.sizeEnemy;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.enemies.forEach(enemy => {
            enemy.update(this.x, this.y);
            enemy.draw(context);
        });
        this.enemies = this.enemies.filter(obj => !obj.toDelete);
    }
    create(){
        for(let y = 0; y < this.game.rows; y++){
            for(let x = 0; x < this.game.cols; x++){
                let enemyx = x * this.game.sizeEnemy;
                let enemyy = y * this.game.sizeEnemy;
                if(Math.random() < 0.3){
                    this.enemies.push(new RedBomber(this.game, enemyx, enemyy));
                }else if(Math.random() < 0.6){
                    this.enemies.push(new RedScout(this.game, enemyx, enemyy));
                }else{
                    this.enemies.push(new RedTorpedo(this.game, enemyx, enemyy));
                }
            }
        }
    }
    big_time(){
        for(let y = 0; y < this.game.rows; y++){
            for(let x = 0; x < this.game.cols; x++){
                let enemyx = x * this.game.sizeEnemy;
                let enemyy = y * this.game.sizeEnemy;
                this.enemies.push(new GreenBoss(this.game, enemyx, enemyy));
            }
        }
    }
}

class Game{
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Player(this);
        this.keys = [];
        this.projectilePool = [];
        this.projectilePoolNo = 10;
        this.createProjectiles();
        //console.log(this.projectilePool);

        this.cols = 3;
        this.rows = 2;
        this.sizeEnemy = 60;
        this.waves = [];
        this.waves.push(new Wave(this));

        this.score = 0;
        this.gameover = false;
        this.waveCount = 1;
        this.fired = false;

        this.spriteUpdate = false;
        this.spritTimer = 0;
        this.spriteInterval = 90;
        this.fx = new Audio("./assets/shot_fx.mp3");

        window.addEventListener('keydown', e => {
            if(this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
            var sound_checkbox = document.getElementById('sound');
            //console.log(this.keys);
            if(e.key === '1' && !this.fired){
                this.player.shoot();
                if(sound_checkbox.checked){
                    this.fx.play();
                }
            }
            this.fired = true;
            if(e.key === 'r' && this.gameover){
                location.reload();
            }
        });
        window.addEventListener('keyup', e => {
            this.fired = false;
            const index = this.keys.indexOf(e.key);
            if(index > -1){
                this.keys.splice(index, 1);
            }
            //console.log(this.keys);
        });
    }

    render(context, deltaTime){
        // sprite timing
        if(this.spritTimer > this.spriteInterval){
            this.spriteUpdate = true;
            this.spritTimer = 0;
        }else{
            this.spriteUpdate = false;
            this.spritTimer += deltaTime;
        }

        this.drawStatus(context);
        this.player.draw(context);
        this.player.update();
        this.projectilePool.forEach(projectile => {
            projectile.update();
            projectile.draw(context);
        })
        this.waves.forEach(wave => {
            wave.render(context);
            if(wave.enemies.length < 1 && !wave.nextWavetrigger && !this.gameover){
                this.newWave();
                this.waveCount++;
                wave.nextWavetrigger = true;
                this.player.lives++;
            }
        })
    }
    createProjectiles(){
        for (let i = 0; i < this.projectilePoolNo; i++) {
            this.projectilePool.push(new Projectile());
        }
    }
    getProjectile(){
        for(let i = 0; i < this.projectilePoolNo; i++){
            if(this.projectilePool[i].free === true){
                return this.projectilePool[i];
            }
        }
    }
    // collision
    isCollide(a, b){
        return(a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y);
    }
    drawStatus(context){
        context.save();
        context.fillText('Score: ' + this.score, 20, 40);
        context.fillText('Wave: ' + this.waveCount, 20, 70);
        context.fillText('❤️ ', 10, 105);
        for(let i = 0; i < this.player.lives; i++){
            context.fillRect(55 + 10 * i, 85, 10, 10);
        }
        if(this.gameover){
            context.textAlign = 'center';
            context.font = '100px Consolas';
            context.fillText("GAME OVER!", this.width * 0.5, this.height * 0.5);
            context.font = '20px Consolas';
            context.fillText("Press R to restart", this.width * 0.5, this.height * 0.5 + 25);
        }
        context.restore();
    }
    newWave(){
        if(Math.random() < 0.5 && this.cols * this.sizeEnemy < this.width * 0.8){
            this.cols++;
        }else if(this.cols * this.sizeEnemy < this.width * 0.6){
            this.rows++;
        }
        this.waves.push(new Wave(this));
    }
    restartGame(){
        this.player.restart();
        this.cols = 3;
        this.rows = 2;
        this.sizeEnemy = 40;
        this.waves = [];
        this.waves.push(new Wave(this));
        this.score = 0;
        this.gameover = false;
        this.waveCount = 1;
    }
}
// -----------------------------------------------------------------------------
window.addEventListener('load', function(){
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    var info = canvas.getBoundingClientRect();
    canvas.width = info.width;
    canvas.height = info.height;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.font = '30px Consolas';
    
    const game = new Game(canvas);
    
    let lastTime = 0;
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(ctx, deltaTime);
        requestAnimationFrame(animate);
    }
    animate(0);
});
