class Player{
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.speed = 5;
    }

    draw(context){
        context.fillRect(this.x, this.y, this.width, this.height);
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
}

class Projectile{
    constructor(){
        this.width = 10;
        this.height = 20;
        this.x = 0;
        this.y = 0;
        this.speed = 25;
        this.free = true;
    }
    draw(context){
        if(!this.free){
            context.fillRect(this.x, this.y, this.width, this.height);
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
    }
    draw(context){
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
    update(x, y){
        this.x = x + this.positionX;
        this.y = y + this.positionY;
        this.game.projectilePool.forEach(proj => {
            if(!proj.free && this.game.isCollide(this, proj)){
                this.toDelete = true;
                proj.reset();
                this.game.score++;
            }
        });
        // lose
        if(this.y + this.height > this.game.height){
            this.game.gameover = true;
            this.toDelete = true;
        }
    }
}

class Wave{
    constructor(game){
        this.game = game;
        this.width = this.game.cols * this.game.sizeEnemy;
        this.height = this.game.rows * this.game.sizeEnemy;
        this.x = 0;
        this.y = -this.height;
        this.speedX = 3;
        this.speedY = 0;
        this.enemies = [];
        this.create();
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
                this.enemies.push(new Enemy(this.game, enemyx, enemyy));
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
        this.cols = 6;
        this.rows = 3;
        this.sizeEnemy = 40;
        this.waves = [];
        this.waves.push(new Wave(this));
        this.score = 0;
        this.gameover = false;
        this.waveCount = 1;

        window.addEventListener('keydown', e => {
            if(this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
            //console.log(this.keys);
            if(e.key === '1'){
                this.player.shoot();
            }
        });
        window.addEventListener('keyup', e => {
            const index = this.keys.indexOf(e.key);
            if(index > -1){
                this.keys.splice(index, 1);
            }
            //console.log(this.keys);
        });
    }

    render(context){
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
        if(this.gameover){
            context.textAlign = 'center';
            context.font = '100px Consolas';
            context.fillText("GAME OVER!", this.width * 0.5, this.height * 0.5);
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
    
    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});
