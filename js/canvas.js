/*jslint browser: true*/
/*jslint devel : true*/
/*jslint for : true*/
/*jslint this : true*/
/*global $, jQuery*/
$("#destination").click = function () {
    "use strict";
    document.location.href = "./destin.html";
};
$("#logo").mouseover = function () {
    "use strict";
    $("#logo").css("color", "rgb(187,187,187)");
};
$("#logo").mouseout = function () {
    "use strict";
    $("#logo").css("color", "white");
};
$("#destination").mouseover = function () {
    "use strict";
    $("#destination").css("color", "rgb(187,187,187)");
};
$("#destination").mouseout = function () {
    "use strict";
    $("#destination").css("color", "white");
};
$("#anketa").mouseover = function () {
    "use strict";
    $("#anketa").css("color", "rgb(187,187,187)");
};
$("#anketa").mouseout = function () {
    "use strict";
    $("#anketa").css("color", "white");
};
$("#anketa").click = function () {
    "use strict";
    document.location.href = "./anketa.html";
};

$("#tour_creation").mouseover = function () {
    "use strict";
    $("#tour_creation").css("color", "rgb(187,187,187)");
};
$("#tour_creation").mouseout = function () {
    "use strict";
    $("#tour_creation").css("color", "white");
};
/*для виводимо назви малюнкыв*/
function showDetails(participant) {
    "use strict";
    var picturename = participant.getAttribute("data-picture");
    alert(participant.innerHTML + "  нарисовал(-а) картину -  " + "'" + picturename + "'");
}
/*document.getelementbyid("draw_picture").click = function(){
  var c =  document.getelementbyid("picture");
  var ctx1 = c.getcontext("2d");
  var img = new image();
  img.onload = function(){
  ctx1.drawimage(img,10,10);
  };
  img.src = "https://images.pexels.com/photos/394887/pexels-photo-394887.jpeg?w=940&h=650&auto=compress&cs=tinysrgb";
}*/
var canvas1;
var ctx;
var flag = false;
var prevX = 0;
var currX = 0;
var prevY = 0;
var currY = 0;
var dot_flag = false;

var x = "black";
var y = 2;

function draw() {
    "use strict";
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}
function findxy(res, e) {
    "use strict";
    if (res === "down") {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas1.get(0).offsetLeft;
        currY = e.clientY - canvas1.get(0).offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res === "up" || res === "out") {
        flag = false;
    }
    if (res === "move") {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas1.get(0).offsetLeft;
            currY = e.clientY - canvas1.get(0).offsetTop;
            draw();
        }
    }
}
canvas1 = $("#can");
var w = canvas1.get(0).width;
var h = canvas1.get(0).height;
function init() {
    "use strict";
    canvas1 = $("#can");
    ctx = canvas1.get(0).getContext("2d");
    w = canvas1.width;
    h = canvas1.height;

    canvas1.on("mousemove", function (e) {
        findxy("move", e);
    });
    canvas1.on("mousedown", function (e) {
        findxy("down", e);
    });
    canvas1.on("mouseup", function (e) {
        findxy("up", e);
    });
    canvas1.on("mouseout", function (e) {
        findxy("out", e);
    });
}

function color(obj) {
    "use strict";
    switch (obj.id) {
    case "green":
        x = "green";
        break;
    case "blue":
        x = "blue";
        break;
    case "red":
        x = "red";
        break;
    case "yellow":
        x = "yellow";
        break;
    case "orange":
        x = "orange";
        break;
    case "black":
        x = "black";
        break;
    case "white":
        x = "white";
        break;
    }
    if (x === "white") {
        y = 14;
    } else {
        y = 2;
    }

}


function erase() {
    "use strict";
    var m = confirm("Want to clear");
    if (m) {
        $("#name").value = "";
        ctx.clearRect(0, 0, 400, 400);
    }
}
function shownewdetails() {
    "use strict";
    alert(localStorage.getItem("painter") + " нарисовал(-а) картину" + "'" + localStorage.getItem("picture") + "'");
}
function save() {
    "use strict";
    var str = $("#name").get(0).value;
    var patt = /[а-яА-ЯёЁa-zA-Z\s]{2,64}/;
    if (patt.test(str)) {
        alert("Ваш рисунок получен, смотрите результаты ниже");
        localStorage.setItem("painter", $("#name").get(0).value);
        localStorage.setItem("picture", $("#picture_name").get(0).value);
        var e = $("<li></li>");
        e.html(localStorage.getItem("painter"));
        $("#gallery").append(e);
        e.attr("id", "node");
        e.attr("id", "new_painter");
        e.attr("data-type", "3");
        e.on("click", function () {
            shownewdetails();
        });
        ctx.clearRect(0, 0, w, h);
        $("#name").value = "";
    } else {
        alert("В имени могут быть только буквы, как минимум - 2");
        $("#name").value = "";
    }
}
/*===========================*/
function drag(ev) {
    "use strict";
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    "use strict";


    /*document.getelementbyid("draw_picture").onclick = function(){
      var c =  document.getelementbyid("picture");
      var ctx1 = c.getcontext("2d");
      var img = new image();
      img.onload = function(){
      ctx1.drawimage(img,10,10);
      };
      img.src = "https://images.pexels.com/photos/394887/pexels-photo-394887.jpeg?w=940&h=650&auto=compress&cs=tinysrgb";
    }*/

    /*===========================*/



    /*function drop(ev) {
        "use strict";
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }*/
    /*===================================
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }*/


    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
/*===================================*/
function allowDrop(ev) {
    "use strict";
    ev.preventDefault();
}

function dropcopy(ev) {
    "use strict";
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var nodeCopy = document.getElementById(data).cloneNode(true);
    //nodeCopy.id = "id" + randomInt(100, 100000);
    ev.target.append(nodeCopy);
}

/*тепер викликаємо*/
$("#div1").ondrop = drop(event);
$("#div1").ondragover = allowDrop(event);
$("#div").ondragover = allowDrop(event);
$("#div1").ondragover = allowDrop(event);
$("#div1").ondragover = allowDrop(event);
$("#li").onclick = showDetails(this);
$("#body").onload = init();
$("#b").onclick = color();
$("#c").onclick = erase();
$("#d").onclick = save();
$("#e").onclick = drag();
$("#body").onclick = dropcopy(event);
