//var myRequest = new XMLHttpRequest();
var apiurl = "https://opendata.epa.gov.tw/ws/Data/AQI/?$format=json";
var src = apiurl + "&callback=processedData"
var script =  "<script src=" + src + "></script>";
var $content = $('#content');

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
	for (i=0;i<data.length;i++)
	{
		$content.append("地點：" + data[i].County + data[i].SiteName + "<br>" + " 		空氣品質指標：" + data[i].AQI + " 狀態：" + 
		data[i].Status + " 風速：" + data[i].WindSpeed + " 空氣污染指標物：" + data[i].Pollutant + " 發布時間：" + 
		data[i].PublishTime + "<p>");
	}
	

}

// var btn = document.getElementById("btn");
// btn.addEventListener("click", function()
// {
	
// });

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
