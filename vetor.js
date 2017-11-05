function Vetor (x, y){
    this.x = x;
    this.y = y;

    this.add = function(v){
        this.x += v.x;
        this.y += v.y;
    }

    this.subtract = function(v){
        this.x -= v.x;
        this.y -= v.y;
    }

    this.mult = function(n){
        this.x *= n;
        this.y *= n;
    }

    this.normalize = function(){
        var m = this.module();
        this.x = this.x/m;
        this.y = this.y/m;
    }

    this.module = function(){
        var res = this.x*this.x + this.y*this.y;
        return sqrt(res);
    }

    this.rPos = function(v){
        var w = new Vetor(v.x - this.x, v.y - this.y);
        return w;
    }

    this.limit = function(l){
        this.normalize();
        this.mult(l);
    }

}