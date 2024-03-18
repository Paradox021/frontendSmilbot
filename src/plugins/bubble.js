'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bubbles = function () {
    function Bubbles(_settings) {
        _classCallCheck(this, Bubbles);

        this.bRuning = false;
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.canvasbg = document.getElementById('canvasbg');
        this.ctxbg = this.canvasbg.getContext('2d');
        this.canvasbg.height = window.innerHeight;
        this.canvasbg.width = window.innerWidth;
        this.aBubbles = [];
        this.aBgBubbles = [];

        this.lastUpdateTime = Date.now(); // Initialize the last update time for delta calculation

    }

    Bubbles.prototype.addBubble = function addBubble() {
        this.aBubbles.push(new Bubble());
    };

    Bubbles.prototype.addBgBubble = function addBgBubble() {
        this.aBgBubbles.push(new Bubble('rgba(255,169,99,0.73)', 3.5)); // Color for the bubbles in the back
    };

    Bubbles.prototype.update = function update() {
        var now = Date.now();
        var dt = (now - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = now;

        for (var i = this.aBubbles.length - 1; i >= 0; i--) {
            this.aBubbles[i].update(dt);

            if (!this.aBubbles[i].life) this.aBubbles.splice(i, 1);
        }

        for (var i = this.aBgBubbles.length - 1; i >= 0; i--) {
            this.aBgBubbles[i].update(dt);

            if (!this.aBgBubbles[i].life) this.aBgBubbles.splice(i, 1);
        }

        if (this.aBubbles.length < window.innerWidth / 80) this.addBubble();

        if (this.aBgBubbles.length < window.innerWidth / 240) this.addBgBubble();
    };

    Bubbles.prototype.draw = function draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctxbg.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (var i = this.aBgBubbles.length - 1; i >= 0; i--) {
            this.aBgBubbles[i].draw(this.ctxbg);
        }

        for (var i = this.aBubbles.length - 1; i >= 0; i--) {
            this.aBubbles[i].draw(this.ctx);
        }
    };

    Bubbles.prototype.run = function run() {

        this.update();
        this.draw();

        if (this.bRuning) requestAnimationFrame(this.run.bind(this));
    };

    Bubbles.prototype.start = function start() {
        this.bRuning = true;
        this.run();
    };

    Bubbles.prototype.stop = function stop() {
        this.bRuning = false;
    };

    return Bubbles;
}();

var Bubble = function () {
    function Bubble() {
        var _c = arguments.length <= 0 || arguments[0] === undefined ? 'rgba(44,44,44,0.8)' : arguments[0]; // Color for the bubbles on the front

        var _y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

        _classCallCheck(this, Bubble);

        this.speedModifier = 2;

        // Set the target radius
        this.targetR = rand(20, 120) *0.1;

        // Start with a very small radius to make the bubble "grow"
        this.r = 0.1;
        this.growing = true;

        this.life = true;
        // Set initial x anywhere within the canvas width
        this.x = rand(0, window.innerWidth);

        // Set initial y to be anywhere within the canvas height
        this.y = rand(0, window.innerHeight);
        this.vy = this.speedModifier * rand(.1, .5) + 5;
        this.vr = 0;
        this.vx = this.speedModifier * rand(-3, 3);
        this.c = _c;


    }

    Bubble.prototype.update = function update(dt) {
        this.vy += .07 * this.speedModifier;
        this.vr += .012;
        this.y -= this.vy * dt;
        this.x += this.vx * dt;

        if (this.r < this.targetR && this.growing) {
            this.r += this.vr * dt;
        } else if (this.r >= this.targetR) {
            this.growing = false;
        }

        if (this.y < 0 || this.x < 0 || this.x > window.innerWidth || this.y > window.innerHeight) {
            this.life = false;
        }
    };


    Bubble.prototype.draw = function draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.strokeStyle = this.c; // change fillStyle to strokeStyle
        ctx.lineWidth = 3; // set the line width for the ring
        ctx.stroke(); // change fill() to stroke()
    };

    return Bubble;
}();

var rand = function rand(min, max) {
    return Math.random() * (max - min) + min;
};
var onresize = function onresize() {
    oBubbles.canvasbg.width = window.innerWidth;oBubbles.canvasbg.height = window.innerHeight;oBubbles.canvas.width = window.innerWidth;oBubbles.canvas.height = window.innerHeight;
};
var oBubbles = undefined;
var init = function init() {
    oBubbles = new Bubbles();
    oBubbles.start();
};
window.onresize = onresize;
window.onload = init;