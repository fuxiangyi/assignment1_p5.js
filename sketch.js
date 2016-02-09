 var particleSystem = [];
//var  song;
var attractors = [];
var attractorsV = [];


//function preload(){
//    song = loadSound('explosion.m4a')
//};

function setup() {
    var canvas = createCanvas(windowWidth,windowHeight);
    background(0);
    //background(200);
    frameRate(30);
//    var pos = createVector(width/2,0);
//    var vel = createVector(0,5);
//    oneParticle = new Particles(pos,vel);
    
    colorMode(HSB,360,100,100,100);
    
      
        for (var i=0; i<5; i++){
            for(var c=0; c<5;c++){
          var at = new Attractor(createVector((i+1)*(width/6),(c+1)*(height/6)),5);
        
        attractors.push(at);
      
            }
    };
      for (var j=0; j<4; j++){
          for(var d=0; d<4;d++){
          var atv = new Attractor(createVector((j+1.5)*(width/6),(d+1.5)*(height/6)),5);
        
        attractorsV.push(atv);
        
          }
    };
    
//      for (var j=0; j<5; i++){
//          var atv = new Attractor(createVector((j+1)*(width/6),2*(height/3)),5);
//        //var atv = new Attractor(createVector((i+1)*(width/5),(height/3)*2),5);
//        attractorsV.push(atv);
//        //attractors.push(atv);
//    };
    
}


function draw() {
    blendMode(SCREEN);
   
    //background(0);
   fill(240, 100, 1, 1);
    rect(0, 0, width, height);
    
//    select('canvas').rotate(0,30,0);
    
    //createMightyParticles();
       for(var i=particleSystem.length-1;i>=0;i--){
        var p = particleSystem[i];
//        var gravity = createVector(0,0.1*p.mass);
//        p.applyForce(gravity);
       if(p.areYouDeadYet()){
            //removes the particle from the array.
           particleSystem.splice(i,1); 
            //createMightyParticles();
           /*if(particleSystem.length<=300){
               createMightyParticles(p.getPos());
           }*/
        }else{
            p.update();
            p.draw();
            p.checkEdges();
    
        }
      
    }
    if (mouseIsPressed){
        //clear();
        createMightyParticles();
    }
    
   // if(keyIsPressed)  { 
      
        attractors.forEach(function(at){
        at.draw();
        });
    //if(keyIsPressed){
    attractorsV.forEach(function(atv){
        atv.draw();
        });
    //}
//}    
//       attractorsV.forEach(function(atv){
//       atv.draw();
//        });
  
}



function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
    
    
    
}


//create a single particle.
var Particles = function(position,velocity,acceleration,hue){
    var position = position.copy();
    var velocity = velocity.copy();
    var acceleration = acceleration.copy();
    var psize = 5;
    var initialLifeSpan = random(1000,3000);
    this.lifeSpan = initialLifeSpan;
    
    this.hue = random(hue-15,hue+15);
    
    this.update = function(){
        this.lifeSpan --;
        
        attractors.forEach(function(A){
          var att = p5.Vector.sub(A.getPos(),position);  
          var distanceSq = att.magSq();
            if(distanceSq > 1){
                att.div(distanceSq);
                att.mult(2*A.getStrength());
                acceleration.add(att);
            }
        });
        attractorsV.forEach(function(B){
          var attv = p5.Vector.sub(position,B.getPos());  
          var distanceSqv = attv.magSq();
            if(distanceSqv >1){
                attv.div(distanceSqv);
                attv.mult(2*B.getStrength());
                acceleration.add(attv);
            }
        });
       
        velocity.add(acceleration);//should add this.acceleration here! if use this.velocity here, the same with velocity
        position.add(velocity);
        acceleration.mult(0);
        velocity.limit(15);
        
    }
    
    this.getPos = function(){
        return position.copy();
        }
    this.getVel = function(){
        return velocity.copy();
    }
    this.getAcc = function(){
        return acceleration.copy();
    }
/*    attractors.forEach(function(A)){
//          var
                     }*/
    
   this.draw = function(){
       var transparence = map(this.lifeSpan,0,initialLifeSpan,0,100);
        /*strokeWeight(0.5);
        stroke(0,100,100,transparence);
        line(position.x,position.y,position.x-5*velocity.x,position.y-5*velocity.y);*/
       
        noStroke();
       
        fill(this.hue,58,73,transparence/10);
      
        ellipse(position.x, position.y,psize*this.lifeSpan/1000, psize*this.lifeSpan/1000);
       
       
   }
   this.areYouDeadYet = function(){
//       if(this.lifeSpan <= 0) return ture;
//       else return false;
       return this.lifeSpan <=0 ;
       
   }
     this.checkEdges = function(){
       if ((position.y > (height - psize))||(position.y< 0)) {
    // A little dampening when hitting the bottom
    velocity.mult (-0.5);
    
    
  }
       if((position.x< 0)||(position.x>width)){
     velocity.mult (-1);
    
  }
       }
}

//create a mightparticle system.
function createMightyParticles(initialPos){
    
    
    //song.play();
    var hue = random(20,300);
      for(var m=0; m<10; m++){
          var pos;
    if(!initialPos){// if we don't have initialPos aggrement
        pos =createVector(mouseX,mouseY);
    }else{pos = initialPos.copy();}
        
        var vel = createVector(random(-1,0),random(-2,1));
        var acc = createVector(0,1);
        vel.rotate(random(TWO_PI,2*TWO_PI));
        vel.mult(random(1,3));
        var newBorn = new Particles(pos,vel,acc,hue);
        particleSystem.push(newBorn);
           
    }   
    
}

var Attractor = function(position, s){
var pos = position.copy();
var strength = s;

this.draw = function(){
    noStroke();
    fill(30,78,94,1);
    ellipse(pos.x, pos.y,
    strength, strength);
} 

this.getStrength = function(){
    return strength; //strength here is a variable.
}

this.getPos = function(){
    return pos.copy();
}
};
//mouse interaction function
/*function  mouseClicked(){
//    // we will create a mighty system of particles here
  createMightyParticles();
//    
//    
}*/


/* var particles = new Particels (myPosition, myVelocity) */