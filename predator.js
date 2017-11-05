function Predator(x, y){
    this.pos = new Vetor(x, y);
    this.vel = new Vetor(random(1), random(1));
    this.acc = new Vetor(0, 0);
    this.maxV = 2;
    this.maxA = 1;
    this.r = 50;
    this.alive = true;
    this.foodR = 0;
    this.health = 1;
    this.heading = new Vetor(1, 1);
    this.age = 0;

    this.react = function(target){
        var r = this.pos.rPos(target.pos);
        var m = r.module();
        if(m < this.foodR){
            if(m > this.r){
                r.normalize();
                r.mult(this.maxA);
                this.acc.add(r);
            }
            else{
                target.eat();
                this.health += 0.3;
            }
        }
    }

    this.init = function(){//random: pos, vel, foodr
        this.pos.x = random(this.r, width - this.r);
        this.pos.y = random(this.r, height - this.r);

        this.vel.x = random(-2, 2);
        this.vel.y = random(-2, 2);

        this.foodR = random(5, 150);
        this.health = 1;
    }

    this.update = function(targets, predators){
        this.bounce();//bate nas paredes

        var d = width*height;//achando a comida mais proxima
        var index = 0;
        for(var i = 0; i < targets.length; i++){
            if(targets[i].isAlive() && this.distance(targets[i]) < d) {index = i; d = this.distance(targets[i]);}
        }
        if(targets.length != 0){
            if(targets[index].isAlive()) this.react(targets[index]);
        }

        this.vel.add(this.acc);
        this.vel.limit(this.maxV);//limita a velocidade a maxV, não tem stamina

        this.pos.add(this.vel);
        
        this.acc.mult(0);

        this.health *= 0.995;
        if(this.health <= 0.05) this.eat();
        this.age++;
        if(this.age % 1100 == 0 && this.health > 0.15 && random() < 0.85) predators.push(this.reproduce());
    }

    this.render = function(){
        if(this.isAlive()){   
            //(50, 10, 10) é saudavel
            //(200, 200, 200) é doente
            noStroke();
            fill((-150) * this.health + 200, (-190) * this.health + 200, (-190) * this.health + 200);
            this.head();

            triangle(this.pos.x + this.heading.x, this.pos.y + this.heading.y,
                     this.pos.x - this.heading.y/2, this.pos.y + this.heading.x/2, this.pos.x + this.heading.y/2, this.pos.y - this.heading.x/2);

            if(check.checked()){
                noFill();
                stroke(0, 100, 200);
                ellipse(this.pos.x, this.pos.y, this.foodR*2, this.foodR*2);
            }
 
        }
    }

    this.bounce = function(){
        if(this.pos.x < this.r/2){
            this.vel.x *= -1;
            this.pos.x += 3;
        }
        else if(this.pos.x > width - this.r){
            this.vel.x *= -1;
            this.pos.x -= 3;
        }

        if(this.pos.y < this.r/2){
            this.vel.y *= -1;
            this.pos.y += 3;
        }

        else if(this.pos.y > height - this.r/2){
            this.vel.y *= -1;
            this.pos.y -= 3;
        }
    }

    this.eat = function(){
        this.alive = false;
        this.health = 0;
    }

    this.isAlive = function(){
        return this.alive;
    }

    this.distance = function(target){
        return this.pos.rPos(target.pos).module();
    }

    this.head = function(){
        this.heading.x = this.vel.x;
        this.heading.y = this.vel.y;

        this.heading.limit(this.r);
    }

    this.isPredator = function(){
        return true;
    }

    this.reproduce = function(){
        var p = new Predator(0, 0);
        p.init();
        p.pos.x = this.pos.x;
        p.pos.y = this.pos.y;

        p.foodR = this.foodR * random(0.9, 1.1);//caracteristicas hereditarias
        
        return p;
    }
}