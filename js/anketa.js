	//window.body.css("backgroundColor","Gainsboro");
    $("#logo").mouseover (function () {
		"use strict";
        $("#logo").css("color","rgb(187,187,187)");
    });
    $("#logo").mouseout (function () {
		"use strict";
        $("#logo").css("color","white");
    });
    $("#destination").mouseover (function () {
		"use strict";
        $("#destination").css("color","rgb(187,187,187)");
    });
    $("#destination").mouseout (function () {
		"use strict";
        $("#destination").css("color","white");
    });
    $("#anketa").mouseover (function () {
		"use strict";
        $("#anketa").css("color","rgb(187,187,187)");
    });
    $("#anketa").mouseout (function () {
		"use strict";
        $("#anketa").css("color","white");
    });
    $("#destination").click (function () {
		"use strict";
        window.location.href = "./destin.html";
    });
    $("#logo").click (function () {
		"use strict";
        window.location.href = "./main.html";
    });
    $("#anketa").click (function () {
		"use strict";
        window.location.href = "./anketa.html";
    });
	$("#tour_creation").mouseover (function () {
    "use strict";
	$("#tour_creation").css("color", "rgb(187,187,187)");
});
$("#tour_creation").mouseout (function () {
    "use strict";
	$("#tour_creation").css("color","white");
});
$("#tour_creation").click (function () {
		"use strict";
        window.location.href = "./canvas.html";
    });
       function fun() {
	   "use strict";
        var a;
        var cost;
        $("#fill_form").html ("Спасибо, что заполнили форму");
        localStorage.setItem("name", $("#name").val());
        localStorage.setItem("surname", $("#surname").val());
        localStorage.setItem("email", $("#email").val());
        localStorage.setItem("tel", $("#usrtel").val());
        console.log(localStorage.getItem("date"));
        localStorage.setItem("office", $("#office").val());
        if (localStorage.getItem("office") === "lva") {
            a = "г.Киев,пл.Льва Толстого,11";
        }
        if (localStorage.getItem("office") === "vas") {
            a = "г.Киев,ул.Васильковская, 25";
        }
        localStorage.setItem("country", $("#countrylist").val());
        localStorage.setItem("number", $("#number").val());
        console.log(localStorage.getItem("number"));
        if (localStorage.getItem("country") === "Монако") {
            cost = 300 * localStorage.getItem("number");
        }
        else if (localStorage.getItem("country") === "Италия") {
            cost = 200 * localStorage.getItem("number");
        }
        else if (localStorage.getItem("country") === "Испания") {
            cost = 150 * localStorage.getItem("number");
        }
        else if (localStorage.getItem("country") === "Франция") {
            cost = 130 * localStorage.getItem("number");
        }
        else {
            cost = 100 * localStorage.getItem("number");
        }
        $("#person_inf").html(localStorage.getItem("name") + ", ждем Вас у нас в оффисе по адресу: " + a +
            "<br>" + "средняя цена тура по направлению " +
            localStorage.getItem("country") + " для группы из " + localStorage.getItem("number") + " человек - " + cost + " $");
        //console.log($("#officelist").val());
        var xml_city = [];
		var xml_day = [];
		var xml_month = [];
		var xml_year = [];
		var xml_hour = [];
		var xml_minute=[];
		var xml_temperature=[];
		var xml_wind =[];
		$.ajax({
			type:"GET",
			url:"weather.xml",
			dataType:"xml",
			success:function(xml){
				$(xml).find("weather").each(function(idx,v){
					xml_city[idx] = [];
					xml_day [idx] = [];
		             xml_month [idx] = [];
		             xml_year [idx] = [];
		             xml_hour[idx] = [];
		            xml_minute[idx] = [];
		            xml_temperature[idx] = [];
		             xml_wind [idx] = [];
					$(v).find("city").each(function(vi)
					{
					xml_city[idx].push($(vi).text());
					});
					$(v).find("day").each(function(vi)
					{
					xml_day[idx].push($(vi).text());
					});
					$(v).find("month").each(function(vi)
					{
					xml_month[idx].push($(vi).text());
					});
					$(v).find("year").each(function(vi)
					{
					xml_year[idx].push($(vi).text());
					});
					$(v).find("hour").each(function(vi)
					{
					xml_hour[idx].push($(vi).text());
					});
					$(v).find("minute").each(function(vi)
					{
					xml_minute[idx].push($(vi).text());
					});
					$(v).find("temperature").each(function(vi)
					{
					xml_temperature[idx].push($(vi).text());
					});
					$(v).find("wind").each(function(vi)
					{
					xml_wind[idx].push($(vi).text());
					});
			
			var m;
			if (localStorage.getItem("country") === "Монако"){
			m=0;}
			if (localStorage.getItem("country") === "Испания"){
			m=1;}
			if (localStorage.getItem("country") === "Италия"){
			m=2;}
			if (localStorage.getItem("country") === "Франция"){
			m=3;}
			    $("#fill_weather").html("Прогноз погоды для " + xml_city[m]);
               $("#person_weather").html("Состоянием на " + xml_day[m] + "/" +
                xml_month[m] + "/" + xml_year[m] + "  " + xml_hour[m] + ":"
                + xml_minute[m] + " температура воздуха составляет - " +
               xml_temperature[m]+ " °C <br>" + "скорость ветра - " + xml_wind[m]+ " м/с");
			});
			}
			});
}
    $(document).ready(function ()  {
		"use strict";
		   $("#form1").on("submit",fun);
        $("#name").val(localStorage.getItem("name"));
        $("#surname").val(localStorage.getItem("surname"));
        $("#email").val(localStorage.getItem("email"));
        $("#usrtel").val(localStorage.getItem("tel"));
    });
    $("#files").onchange = function previewFile() {
		"use strict";
        var preview = document.querySelector("img");
        var file = document.querySelector("input[type=file]").files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            preview.src = reader.result;
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
    };
    /*function muzplay() {
        var files = this.files;
        var file = URL.createObjectURL(files[0]);
        audio_player.src = file;
        audio_player.play();
    }*/