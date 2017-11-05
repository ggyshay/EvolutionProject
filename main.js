var bacterias;
var foods;
var predators;
var check;

function setup (){
    createCanvas(windowWidth*0.75, windowHeight*0.75);

    bacterias = [];
    foods = [];
    predators = [];

    p = new Predator(0, 0);
    p.init();

    for(var i = 0; i < 40; i++){
        var b = new Bacteria(0, 0);
        b.init();
        bacterias.push(b);
    }

    for(var i = 0; i < 4; i++){
        var p = new Predator(0, 0);
        p.init();
        predators.push(p);
    }

    for(var i = 0; i < 300; i++){
        foods.push(new Food(random(width), random(height)));
    }

    check = createCheckbox();
}

function draw(){
    background(51);

    for(var i = 0; i < bacterias.length; i++){
        if(bacterias[i].isAlive()){
            bacterias[i].render();
            bacterias[i].update(foods, bacterias, predators);
        }
    }

    for(var i = 0; i < predators.length; i++){
        if(predators[i].isAlive()){
            predators[i].render();
            predators[i].update(bacterias, predators);
        }
    }


    if (random() < 0.17) foods.push(new Food(random(width), random(height)));

    if(random() < 0.05) cleanV(foods);
    if(random() < 0.05) cleanV(bacterias);
    if(random() < 0.006) cleanV(predators);

    for(var i = 0; i < foods.length; i++){
        foods[i].render();
    }
    if(random() < 0.01){
        var b = new Bacteria(0, 0);
        b.init();
        bacterias.push(b);
        console.log("new random");
    }
}

function cleanV(v){
        for(var i = v.length - 1; i >= 0; i--){
            if(!v[i].isAlive()) v.splice(i, 1);
    }
}