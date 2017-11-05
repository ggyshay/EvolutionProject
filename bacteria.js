// this is the bacteria file

function Bacteria(x, y){
    this.pos = new Vetor(x, y);
    this.vel = new Vetor(0, 0);
    this.acc = new Vetor(0, 0);
    this.maxV = 3;
    this.minV = 0.8;
    this.maxA = 1;
    this.r = 20;
    this.alive = true;

    this.foodR = 0;
    this.predR = 0;
    this.stamina = 0;
    this.health = 0;
    this.resistence = 1;
    this.age = 0;

    this.react = function(target){
        var r = this.pos.rPos(target.pos);
        var m = r.module();
        if(target.isPredator() && m < this.predR){
            if(m > this.r){
                r.normalize();
                r.mult((-1.2) *this.maxA * this.stamina);
                this.acc.add(r);
            }
            else{
                this.eat();
            }

        }
        if(!target.isPredator() && m < this.foodR){
            if(m > this.r){
                r.normalize();
                r.mult(this.maxA * this.stamina);
                this.acc.add(r);
            }
            else{
                target.eat();
                this.stamina = 1;
                this.health += 0.3;
            }
        }
    }

    this.init = function(){
        this.pos.x = random(this.r, width - this.r);
        this.pos.y = random(this.r, height - this.r);

        this.vel.x = random(-2, 2);
        this.vel.y = random(-2, 2);

        this.foodR = random(5, 200);
        this.predR = random(5, 150);
        this.stamina = random(0.7, 1.7);
        this.health = 1;
        this.resistence = random(0.99, 0.999);

    }

    this.update = function(targets, bacterias, predators){
        this.bounce();//bate nas paredes

        var d = width*height;//achando a comida mais proxima
        var index = 0;
        for(var i = 0; i < targets.length; i++){
            if(targets[i].isAlive() && this.distance(targets[i]) < d) {index = i; d = this.distance(targets[i]);}
        }
        if(targets.length != 0){
            if(targets[index].isAlive()) this.react(targets[index]);
        }
        
        for(var i = 0; i < predators.length; i++){
            if(predators[i].isAlive()){
                this.react(predators[i]);
            }
        }


        this.vel.add(this.acc);

        if(this.stamina > 0.2){
            this.vel.limit(this.maxV * this.stamina);//limita a velocidade a maxV*stamina
            this.stamina *= this.resistence;
        }
        else{
            this.vel.limit(this.minV);
            this.stamina *= 1.02;
        }

        this.pos.add(this.vel);
        
        this.acc.mult(0);

        this.health *= 0.995;
        if(this.health <= 0.05) this.eat();
        this.age++;
        if(this.age % 250 == 0 && this.health > 0.25 && random() < 0.9) bacterias.push(this.reproduce());
    }

    this.render = function(){
        if(this.isAlive()){   
            //(20, 150, 80) é saudavel
            //(200, 40, 20) é doente
            noStroke();
            fill((-180) * this.health + 200, 110 * this.health + 40, 60 * this.health + 20);

            ellipse(this.pos.x, this.pos.y, this.r, this.r);

            if(check.checked()){//display advanced data
                noFill();
                stroke(0, 100, 200);
                ellipse(this.pos.x, this.pos.y, this.foodR*2, this.foodR*2);

                noFill();
                stroke(200, 100, 0);
                ellipse(this.pos.x, this.pos.y, this.predR*2, this.predR*2);
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

    this.reproduce = function(){
        var b = new Bacteria(0, 0);
        b.init();
        b.pos.x = this.pos.x;
        b.pos.y = this.pos.y;
        this.alive = true;

        b.foodR = this.foodR * random(0.95, 1.05);//caracteristicas hereditarias
        b.predR = this.predR * random(0.95, 1.05);
        b.resistence = this.resistence;
        
        return b;
    }
}