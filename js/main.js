//var myRequest = new XMLHttpRequest();
var apiurl = "https://opendata.epa.gov.tw/ws/Data/AQI/?$format=json";
var src = apiurl + "&callback=processedData"
var script =  "<script src=" + src + "></script>";
var i=0;
var northS = new Set(["臺北市","新北市","基隆市","宜蘭縣","桃園市","新竹縣","新竹市"]);
var westS = new Set(["苗栗縣","臺中市","彰化縣","南投縣","雲林縣"]);
var eastS = new Set(["花蓮縣","臺東縣"]);
var southS = new Set(["嘉義縣","嘉義市","臺南市","高雄市","屏東縣"]);
var outerS = new Set(["澎湖縣","金門縣","連江縣"]);
//var $content = $('#content');
var north = document.getElementById("north");
getAPI();
function getAPI()
{
	$(document).ready(function()
	{
		$('body').append(script);   //透過<script>繞過CORS policy
	})  

	$.ajax({
	    url: apiurl,
	    dataType: 'json',
	    type: 'GET',
	    success: function (responseText)
	    {
	    	processedData(responseText);
	        //console.log(responseText);
	    }
	})
}
	

function processedData (data)  
{
	//console.log("callback some data~");
	console.log(data);  
	$('#content').append("發布時間：" + data[0].PublishTime + "<p>");
	locate(data);
	Rdata = data;
	// for (i=0;i<data.length;i++)
	// {	
		
	// 	if (data[i].Pollutant == "" )
	// 		data[i].Pollutant = "(未標示)";
	// 	$('#content').append("地點：" + data[i].County + " " + data[i].SiteName + "<br>" + " 		空氣品質指標：" + data[i].AQI + " 風速：" 
	// 		+ data[i].WindSpeed + " 空氣污染指標物：" + data[i].Pollutant + " 狀態：" + data[i].Status + "<p>");
	// }

}

function locate (data)
{

	$('#content').append("-------------北部-------------" + "<p>");
		for (i=0;i<data.length;i++)
		{	
			if (northS.has(data[i].County))  
			{
				if (data[i].Pollutant == "" )
				{
					data[i].Pollutant = "(未標示)";
				}
				else if (data[i].WindSpeed == "")
				{
					data[i].WindSpeed = "(未標示)";
				}
				$('#content').append("地點：" + data[i].County + " " + data[i].SiteName + "<br>" + " 		空氣品質指標：" + data[i].AQI + " 風速：" 
					+ data[i].WindSpeed + " 空氣污染指標物：" + data[i].Pollutant + " 狀態：" + data[i].Status + "<p>");
				
			}
	 	}

	$('#content').append("-------------中部-------------" + "<p>");
	
		for (i=0;i<data.length;i++)
		{	
			if (westS.has(data[i].County)) 
			{
				if (data[i].Pollutant == "" )
				{
					data[i].Pollutant = "(未標示)";
				}
				else if (data[i].WindSpeed == "")
				{
					data[i].WindSpeed = "(未標示)";
				}
				$('#content').append("地點：" + data[i].County + " " + data[i].SiteName + "<br>" + " 		空氣品質指標：" + data[i].AQI + " 風速：" 
					+ data[i].WindSpeed + " 空氣污染指標物：" + data[i].Pollutant + " 狀態：" + data[i].Status + "<p>");
				
			}
	 	}
	$('#content').append("-------------東部-------------" + "<p>");

	// 	$('#content').val("");
		for (var i=0;i<data.length;i++)
		{	
			if (eastS.has(data[i].County))  
			{
				if (data[i].Pollutant == "" )
				{
					data[i].Pollutant = "(未標示)";
				}
				else if (data[i].WindSpeed == "")
				{
					data[i].WindSpeed = "(未標示)";
				}
				$('#content').append("地點：" + data[i].County + " " + data[i].SiteName + "<br>" + " 		空氣品質指標：" + data[i].AQI + " 風速：" 
					+ data[i].WindSpeed + " 空氣污染指標物：" + data[i].Pollutant + " 狀態：" + data[i].Status + "<p>");
				
			}
	 	}
	$('#content').append("-------------南部-------------" + "<p>");
		for (var i=0;i<data.length;i++)
		{	
			if (southS.has(data[i].County))  
			{
				if (data[i].Pollutant == "" )
				{
					data[i].Pollutant = "(未標示)";
				}
				else if (data[i].WindSpeed == "")
				{
					data[i].WindSpeed = "(未標示)";
				}
				$('#content').append("地點：" + data[i].County + " " + data[i].SiteName + "<br>" + " 		空氣品質指標：" + data[i].AQI + " 風速：" 
					+ data[i].WindSpeed + " 空氣污染指標物：" + data[i].Pollutant + " 狀態：" + data[i].Status + "<p>");
				
			}
		}
	$('#content').append("-------------外島-------------" + "<p>");
	for (var i=0;i<data.length;i++)
	{	
		if (outerS.has(data[i].County))  
		{
			if (data[i].Pollutant == "" )
			{
				data[i].Pollutant = "(未標示)";
			}
			else if (data[i].WindSpeed == "")
				{
					data[i].WindSpeed = "(未標示)";
				}
			$('#content').append("地點：" + data[i].County + " " + data[i].SiteName + "<br>" + " 		空氣品質指標：" + data[i].AQI + " 風速：" 
				+ data[i].WindSpeed + " 空氣污染指標物：" + data[i].Pollutant + " 狀態：" + data[i].Status + "<p>");
			
		}
	}

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
