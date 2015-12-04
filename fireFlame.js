window.onload = function(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	canvas.style.cursor = "none";
	var W = window.innerWidth;
	var H= window.innerHeight;

	var particles = [];
	var mouse = {};

	canvas.width = W ;
	canvas.height = H;


    
    var cnt = 100;

    for(var x = 0; x < cnt; x++) {

    	particles.push( new particle());
    }

    canvas.addEventListener('mousemove',mousetracker,false);

    function mousetracker(){

    	mouse.x = event.x;
    	mouse.y = event.y;
    }

    function particle (){

    	this.speed = {x:-2.5 + Math.random()*5, y: -15 + Math.random()*10};
    	if(mouse.x && mouse.y){
    		this.location = {x: mouse.x,y: mouse.y};	
    	}else {
    	this.location = {x: W/2,y: H/2};
    }
    	this.radius = 10 + Math.random()*20;
    	this.life = 20 + Math.random()*10;
    	this.remaining_life = this.life;
    	this.r = Math.round(Math.random()*255);
    	this.b = Math.round(Math.random()*255);
    	this.g = Math.round(Math.random()*255);
    }


    function draw(){
    	ctx.globalCompositeOperation = "source-over";
    	ctx.fillStyle = "black"
	    ctx.fillRect(0,0,W,H);
    	//x,y,width,height
    	ctx.globalCompositeOperation = "lighter";

		for(var i = 0; i < particles.length; i++) {

    		var p = particles[i];
    		ctx.beginPath();
    		p.opacity = Math.round(p.remaining_life/p.life * 100)/100;// to get more opacity divide by life by 100 to get higher value in denominator
    		var gradient = ctx.createRadialGradient(p.location.x,p.location.y,0,p.location.x,p.location.y,p.radius);

    		gradient.addColorStop(0, "rgba(" + p.r +", " + p.g + "," +p.b + "," + p.opacity + ")");
    		gradient.addColorStop(0.5, "rgba(" + p.r +", " + p.g + "," +p.b + "," + p.opacity + ")");
    		gradient.addColorStop(1, "rgba(" + p.r +", " + p.g + "," +p.b + "," + 0 + ")"); // at 1 sec make opacity to 0

    		ctx.fillStyle = gradient;
    		ctx.arc(p.location.x,p.location.y,p.radius,Math.PI*2,false);
    		ctx.fill();

    		p.remaining_life--;
    		p.radius--;
    		p.location.x += p.speed.x;
    		p.location.y += p.speed.y;

    		if(p.remaining_life < 0 || p.radius  < 0 ){
    			particles[i] = new particle();
    		}
    	}

    }
    setInterval(draw,33);
}