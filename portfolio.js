window.onload = function() {
    drawParticle();
};

window.onresize = function() {
    drawParticle();
};

function drawParticle() {
    if (!window.HTMLCanvasElement) return;

    var canvas = document.querySelector('#canvas');
    var context = canvas.getContext('2d');

    var Particle = function(color, speed) {
        this.color = color;
        this.speed = speed;
        this.scale = speed*11;
        this.position = {
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height
        };
    };

    Particle.prototype.draw = function() {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.scale, 0, 2*Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
    };

    $('#canvas').get(0).width = $(window).width();
    $('#canvas').get(0).height = $(window).height();

    var density = 11;
    var particles = [];
    for (var i=0; i<density; i++) {
        particles[i] = new Particle(randomColor(), randomSpeed());
        particles[i].draw();
    }

    loop();

    function loop() {
        requestAnimFrame(loop);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        for (var i=0; i<density; i++) {
            particles[i].position.y -= particles[i].speed;
            particles[i].speed += particles[i].scale*0.001;
            particles[i].draw();
            if (particles[i].position.y < 0) {
                var speed = randomSpeed();
                particles[i].scale = speed*11;
                particles[i].speed = speed;
                particles[i].color = randomColor();
                particles[i].position.x = Math.random()*canvas.width;
                particles[i].position.y = canvas.height;
            }
        }
    }

    function randomColor() {
        var colors = [
            "rgba(242, 150, 137, 0.3)",
            "rgba(164, 160, 244, 0.3)",
            "rgba(235, 237, 119, 0.3)"
        ];
        return colors[~~(Math.random()*3)];
    }

    function randomSpeed() {
        return (~~(Math.random()*11)+1)*0.1;
    }
};

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
