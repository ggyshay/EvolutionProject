function Food(x, y){
    this.pos = new Vetor(x, y);
    this.r = 5;
    this.alive = true;
    this.isPredator = function(){return false;}

    this.isAlive = function(){return this.alive;}

    this.eat = function(){
        this.alive = false;
    }

    this.render = function(){
        if(this.isAlive()){
            noStroke();
            fill(0, 100, 200);
            ellipse(this.pos.x, this.pos.y, this.r, this.r);
        }

    }
}