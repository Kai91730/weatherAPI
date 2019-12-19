//var myRequest = new XMLHttpRequest();
var apiurl = "https://opendata.epa.gov.tw/ws/Data/AQI/?$format=json";
var src = apiurl + "&callback=dataObj"
var script =  "<script src=" + src + "></script>";

var northS = new Set(["臺北市","新北市","基隆市","宜蘭縣","桃園市","新竹縣","新竹市"]);
var westS = new Set(["苗栗縣","臺中市","彰化縣","南投縣","雲林縣"]);
var eastS = new Set(["花蓮縣","臺東縣"]);
var southS = new Set(["嘉義縣","嘉義市","臺南市","高雄市","屏東縣"]);
var outerS = new Set(["澎湖縣","金門縣","連江縣"]);
//var $content = $('#content');
getAPI();

function getAPI()
{
	$(document).ready(function()
	{
		$('body').append(script);   //透過<script>繞過CORS policy
	})  

	$.ajax({
	    url: apiurl,
	    dataType: 'jsonp', //json"p" for callback
	    type: 'GET',
	    success: function (responseText)
	    {
	    	console.log(responseText);
	    	// processedData(responseText);

	    	var Obj = new dataObj(responseText);
			Obj.time();
			Obj.show();
	    },
	    error: function(jqXHR, textStatus, errorThrown )
	    {
	    	console.log("failed to get data or timeout");
	    	alert("textStatus:" + textStatus);
	    	alert("errorThrown:" + errorThrown);
	    }
	})
}
	
function dataObj(data)
{
	this.time = function()
	{
		$('#time').append("發布時間：" + data[0].PublishTime + "<p>");
	}	

	this.show = function()
	{
		locate("<caption>"+"北部"+"</caption>",northS,data); //caption 跟隨table
		locate("<caption>"+"中部"+"</caption>",westS,data);
		locate("<caption>"+"東部"+"</caption>",eastS,data);
		locate("<caption>"+"南部"+"</caption>",southS,data);
		locate("<caption>"+"外島"+"</caption>",outerS,data);
	}
}

function locate (text,set,data)
{

	$('#content').append("<table>");  //現在有1+5個table
	$('#content').append(text);

	for (i=0;i<data.length;i++)
		{	
			if (set.has(data[i].County))  
			{
				if (data[i].Pollutant == "" )
				{
					data[i].Pollutant = "(未標示)";
				}
				else if (data[i].WindSpeed == "")
				{
					data[i].WindSpeed = "(未標示)";
				}
				$('#content').append("<tr>" + "<td>"  + data[i].County + " " + data[i].SiteName  + "<br>" 
					 + " 空氣品質指標：" + data[i].AQI + 
					 " 風速：" + data[i].WindSpeed 
					 + " 空氣污染指標物：" + data[i].Pollutant 
					 + " 狀態：" + data[i].Status + "</td>" +"</tr>" );
			}
	 	}

 	$('#content').append("</table>");
}



// var btn = document.getElementById("btn");
// myRequest.open('GET',apiurl);

	// if (myRequest.status >= 200 && myRequest.status < 400) 
	// {

	// 	myRequest.onload=function()
	// 	{
	// 		var Data = JSON.parse(myRequest.responseText);
	// 		console.log(Data);
	// 	};
	// }
	
// btn.addEventListener("click", function()
// {
// })



// myRequest.send();
