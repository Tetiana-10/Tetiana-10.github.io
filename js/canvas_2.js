/*===========================*/
/*відображення графіка*/
var kaleidoscope;
var params;

var x1;
var y1;
var i;
var a;
var j;
var stats = $("#myCanvas").get(0);
var canvas1 = $("#myCanvas").get(0).getContext("2d");
/*малюємо вертикальні лінії через кожні 50пкс */



// =========================================================
// Functons
// =========================================================
function drawFace(canvas, opts) {
    "use strict";
    var ctx = canvas.getContext("2d");
    ctx.save();
    ctx.lineWidth = opts.radius * 0.075;//для чорної лінії навколо
    ctx.strokeStyle = opts.lineColor;
    ctx.beginPath();
    ctx.arc(opts.x, opts.y, opts.radius, opts.startAngle, opts.endAngle);
    ctx.stroke();
    ctx.fillStyle = opts.fill;
    ctx.fill();
    ctx.restore();
}
//document.getElementById("smile").onclick = ;
function drawSmile(canvas, opts) {
    "use strict";
    var ctx = canvas.getContext("2d");
    var radius = 40 * opts.radius * 0.0125;
    var x = opts.x;
    var y;
    var startAngle;
    var endAngle;
    if (a === 1) {
        y = opts.y + opts.radius * 0.3;//чим більше коеф, тим нижче посмішка
        startAngle = Math.PI * 0.1;
        endAngle = -Math.PI * 1.1;
    }
    if (a === 2) {
        y = opts.y + opts.radius * 0.7;
        startAngle = -Math.PI * 0.85; //Math.PI * 0.1;
        endAngle = -0.5; //-Math.PI * 1.1;
    }
    if (a === 3) {
        y = opts.y + opts.radius * 0.7;

    }
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.lineWidth = opts.radius * 0.1;

    ctx.strokeStyle = opts.lineColor;
    ctx.stroke();
    ctx.restore();
}



function drawEye(canvas, opts, centerX, centerY, radius) {
    "use strict";
    var ctx = canvas.getContext("2d");

    // Save state
    ctx.save();

    // Translate context so height is 1/3"rd from top of enclosing circle
    ctx.translate(opts.x, opts.y - (opts.radius / 3));

    // щоб видовжені були
    ctx.scale(0.5, 1);

    // Draw circle which will be stretched into an oval
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);

    // Apply styling
    ctx.fillStyle = opts.lineColor;
    ctx.fill();
    ctx.lineWidth = radius * 0.5;
    ctx.strokeStyle = opts.lineColor;
    ctx.stroke();

    // Restore to original state
    ctx.restore();
}
function drawEyes(canvas, opts) {
    "use strict";
    var xOffset = opts.radius * 0.5;//відстань між очима
    var radius = opts.radius * 0.15;//розмір очей

    drawEye(canvas, opts, xOffset, 0, radius); // ліве
    drawEye(canvas, opts, -xOffset, 0, radius); // праве
}
function drawHappyFace(canvas, opts, flipSmile) {
    "use strict";
    opts = opts || {};

    var defaultRadius = 48;
    var options = {
        x: opts.x || (defaultRadius / 0.9),
        y: opts.y || (defaultRadius / 0.9),
        radius: opts.radius || defaultRadius,
        startAngle: 0,
        endAngle: 2 * Math.PI,
        fill: opts.fill || "yellow",
        lineColor: opts.lineColor || "black"
    };

    $("#smile").click(function () {
        a = 1;
        drawFace(canvas, options);
        drawEyes(canvas, options);
        drawSmile(canvas, options, flipSmile);
    });
    $("#notsmile").click(function () {
        a = 2;
        drawFace(canvas, options);
        drawEyes(canvas, options);
        drawSmile(canvas, options, flipSmile);
    });
    $("#melancholy").click(function () {
        a = 3;
        drawFace(canvas, options);
        drawEyes(canvas, options);
        drawSmile(canvas, options, flipSmile);
    });

}
/*===========================*/
/* малюємо смайлики */
var canvasA = $("#myDrawing").get(0);
drawHappyFace(canvasA, {
    fill: "#FFFF00",
    x: canvasA.width / 2,
    y: canvasA.height / 2,
    radius: 60
});
/*===========================*/
var dx;
var dy;
//var v = true;
params = {
    image_url: "https://s-media-cache-ak0.pinimg.com/originals/c9/de/0e/c9de0e2db27817f08d80bf48c1becae5.jpg",
    triangle_size: 600,
    easing_ratio: 0.01,
    auto_rotate_speed: 0.00002
};
var ImageUtils = function () {
    "use strict";
};
function setImage(image) {
    "use strict";
    kaleidoscope.setImage(image);
}
function loadImageAsync(source, callback) {
    "use strict";
    var img = new Image();
    img.onload = function (e) {
        callback(e.target);
    };
    img.src = source;
    //v=false;
}
function openImageFileAsync(file, callback) {
    "use strict";
    if (file.type.lastIndexOf("image") !== 0) {
        alert("Not supported format.");
        return;
    }
    alert("Информация про этот файл:\n дата измения - " + file.lastModifiedDate + "\n" + "size - " + file.size + "kbts" + "\n" + "type - " + file.type);
    loadImageAsync(URL.createObjectURL(file), callback);
}
ImageUtils.downscale = function (dst, src, scale) {
    "use strict";
    var work0 = document.createElement("canvas");
    var work1 = document.createElement("canvas");
    var w = src.naturalWidth || src.width;
    //var w = work0.width;
    work0.width = src.naturalWidth || src.width;
    work1.width = src.naturalWidth || src.width;

    var h = src.naturalHeight || src.height;
    work0.height = src.naturalHeight || src.height;
    work1.height = src.naturalHeight || src.height;
    var ctx0 = work0.getContext("2d");
    var ctx1 = work1.getContext("2d");
    ctx0.drawImage(src, 0, 0);

    // Resize by half recursively for better quality.
    var tmpCanvas;
    var tmpContext;
    while (scale < 0.5) {
        ctx1.clearRect(0, 0, w / 2, h / 2);
        ctx1.drawImage(work0, 0, 0, w, h, 0, 0, w / 2, h / 2);
        w /= 2;
        h /= 2;
        scale *= 2;

        tmpCanvas = work0;
        work0 = work1;
        work1 = tmpCanvas;
        tmpContext = ctx0;
        ctx0 = ctx1;
        ctx1 = tmpContext;
    }

    dst.width = w * scale;
    dst.height = h * scale;
    dst.getContext("2d").drawImage(work0, 0, 0, w, h, 0, 0, w * scale, h * scale);
};

var Kaleidoscope = function (canvas, triangleSide) {
    "use strict";
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.triangleWidth = triangleSide;
    this.triangleHeight = triangleSide * Math.sqrt(3) / 2;

    this.fillStyle = "#000000";
    this.offsetX = 0;
    this.offsetY = 0;
    this.rotation = 0;

    this.cache = document.createElement("canvas");
    this.cache.width = triangleSide * 7 / 2;
    this.cache.height = triangleSide;
    this.cacheContext = this.cache.getContext("2d");
};

Kaleidoscope.prototype = {
    draw: function () {
        "use strict";
        // First, crop the image into a triangle,
        // and draw a parallelogram composed from six triangular images.
        var c = this.cacheContext;
        var w = this.triangleWidth;
        var h = this.triangleHeight;
        c.fillStyle = this.fillStyle;
        c.strokeStyle = this.fillStyle;
        c.lineWidth = 1.5;
        c.clearRect(0, 0, this.cache.width, this.cache.height);

        this.drawTriangle(c, 0, 0, 0, false);
        this.drawTriangle(c, w, 0, Math.PI / 3, true);
        this.drawTriangle(c, w * 3 / 2, h, Math.PI * 4 / 3, false);
        this.drawTriangle(c, w * 5 / 2, h, Math.PI * 3 / 3, true);
        this.drawTriangle(c, w * 3, 0, Math.PI * 2 / 3, false);
        this.drawTriangle(c, w * 5 / 2, h, Math.PI * 5 / 3, true);

        // Then fill the canvas with the parallelogram.
        c = this.context;
        var offsetX = 0;
        var startH = -1;
        var startV = 0;
        var endH = Math.ceil(this.canvas.width / (w * 3));
        var endV = Math.ceil(this.canvas.height / h);

        //c.clearRect(0, 0, this._canvas.width, this._canvas.height);
        for (i = startV; i < endV; i += 1) {
            for (j = startH; j < endH; j += 1) {
                c.drawImage(this.cache, j * w * 3 + offsetX, i * h);
            }
            offsetX = w * 3 / 2 - offsetX;
        }
    },

    setSize: function (width, height) {
        "use strict";
        this.canvas.width = width;
        this.canvas.height = height;
    },

    setImage: function (image) {
        "use strict";
        var scale = Math.max(this.triangleWidth / image.naturalWidth, this.triangleHeight / image.naturalHeight);

        if (scale < 1.0) {
            var tmp = document.createElement("canvas");
            ImageUtils.downscale(tmp, image, scale);
            this.fillStyle = this.cacheContext.createPattern(tmp, "repeat");
        } else {
            this.fillStyle = this.cacheContext.createPattern(image, "repeat");
        }
    },

    drawTriangle: function (c, dx, dy, dt, flip) {
        "use strict";
        var w = this.triangleWidth;
        var h = this.triangleHeight;

        c.save();
        c.translate(dx, dy);
        c.rotate(dt);
        if (flip) {
            c.translate(w, 0);
            c.scale(-1, 1);
        }
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(w, 0);
        c.lineTo(w / 2, h);
        c.closePath();
        c.translate(this.offsetX, this.offsetY);
        c.rotate(this.rotation);
        c.fill();
        c.stroke();
        c.restore();
    }
};

function init() {
    "use strict";
    var canvas = $("#canvas").get(0);
    kaleidoscope = new Kaleidoscope(canvas, params.triangle_size);
    kaleidoscope.setSize(window.innerWidth, window.innerHeight);

    dx = 0;
    dy = 0;

    loadImageAsync(params.image_url, setImage);

    $(document).on("mousemove", function (e) {
        dx = (e.pageX / window.innerWidth - 0.5) * params.triangle_size;
        dy = (e.pageY / window.innerHeight - 0.5) * params.triangle_size;
    });

    $(document).on("deviceorientation", function (e) {
        dx = params.triangle_size * Math.sin(e.beta * Math.PI / 180);
        dy = params.triangle_size * Math.sin(e.gamma * Math.PI / 90);
    });

    $(document).on("dragover", function (e) {
        e.preventDefault();
    });

    $(document).on("drop", function (e) {
        e.preventDefault();
        e.dataTransfer = e.originalEvent.dataTransfer;
        if (e.dataTransfer.files.length < 1) {
            return;
        }
        openImageFileAsync(e.dataTransfer.files[0], setImage);
    });

    /*Add some delay not to bother generating thumbnail.
    setTimeout(function() {
        window.addEventListener("resize", function(e) {
            kaleidoscope.setSize(window.innerWidth, window.innerHeight);
        });
    }, 3000);*/
}


function draw() {
    "use strict";
    kaleidoscope.offsetX += (dx - kaleidoscope.offsetX) * params.easing_ratio;
    kaleidoscope.offsetY += (dy - kaleidoscope.offsetY) * params.easing_ratio;
    kaleidoscope.rotation += params.auto_rotate_speed;

    kaleidoscope.draw();

    requestAnimationFrame(draw);
}
$(document).ready(function () {
    "use strict";
    for (x1 = 50; x1 <= 480; x1 += 50) {
        canvas1.moveTo(x1, 50);
        canvas1.lineTo(x1, 480);
    }

    /*малюємо горизонтальні  лінії через кожні 30пкс */
    for (y1 = 50; y1 <= 480; y1 += 30) {
        canvas1.moveTo(0, y1);
        canvas1.lineTo(480, y1);
    }
    canvas1.strokeStyle = "#eee";
    canvas1.stroke();
    canvas1.font = "15px Verdana";
    // Create gradient
    var gradient = canvas1.createLinearGradient(0, 0, stats.width, 0);
    gradient.addColorStop("0", "white");
    //gradient.addColorStop("0.5","white");
    //gradient.addColorStop("1.0","white");
    // Fill with gradient
    canvas1.fillStyle = gradient;
    canvas1.fillText("2012", 25, 30);
    canvas1.fillText("2013", 80, 30);
    canvas1.fillText("2014", 135, 30);
    canvas1.fillText("2015", 190, 30);
    canvas1.fillText("2016", 245, 30);
    canvas1.fillText("2017", 300, 30);
    canvas1.fillText("1", 5, 235);
    canvas1.fillText("2", 5, 205);
    canvas1.fillText("3", 5, 175);
    canvas1.fillText("4", 5, 145);
    canvas1.fillText("5", 5, 115);
    canvas1.fillText("6", 5, 85);
    canvas1.beginPath();
    canvas1.moveTo(55, 235);
    canvas1.lineTo(80, 200);
    canvas1.lineTo(120, 176);
    canvas1.lineTo(150, 180);
    canvas1.lineTo(200, 160);
    canvas1.lineTo(250, 100);
    canvas1.lineTo(270, 80);
    canvas1.lineTo(300, 60);
    canvas1.lineTo(320, 60);
    canvas1.strokeStyle = "#f00";
    canvas1.stroke();
    init();
    draw();
});
