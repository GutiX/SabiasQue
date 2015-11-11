var urlServer = "http://localhost:3000/api/";

jQuery(function($) {
	var pwHidden = true;
	$(document).ready(function(){
		//alert("Welcome to Ilunion Personalisation Web....");
		$("body").css("display", "none");
		loadControlPanel();
	});
	
	function loadControlPanel()
	{
		//var buttonPanel = sessionStorage.getItem("buttonPanel");
		var buttonPanel = null;
		if(buttonPanel == null)
		{
			$.ajax({
				url: urlServer + 'controlPanel',
				type: 'GET',//tipo de petici?n
				dataType: 'jsonp',//tipo de datos
				jsonp: 'callback',//nombre de la variable get para reconocer la petici?n
				error: function(xhr, status, error) {
					alert("error");
				},
				success: function(jsonp) { 
					//console.log("Llega algo: " + JSON.stringify(jsonp) + " - " + jsonp.length);
					if(jsonp.valid)
					{
						console.log("distinto de {}: " + JSON.stringify(jsonp) + " - " + jsonp.length);						
						var buttonPanel = jsonp.html;
						var pwCss = jsonp.css;
						var pwJs = jsonp.js;
						sessionStorage.setItem("buttonPanel", buttonPanel);
						sessionStorage.setItem("pwCss", pwCss);
						sessionStorage.setItem("pwJs", pwJs);
						buildControlPanel(buttonPanel, pwCss, pwJs);
					}
					else
					{		
						console.log("Igual a {}: " + JSON.stringify(jsonp) + " - " + jsonp.length);				
						$("body").css("display", "inherit");
					}
				}
		   });
		}
		else
		{
			var buttonPanel = sessionStorage.getItem("buttonPanel");
			var pwCss = sessionStorage.getItem("pwCss");
			var pwJs = sessionStorage.getItem("pwJs");
			buildControlPanel(buttonPanel, pwCss, pwJs);
		}
	}
	
	function buildControlPanel(buttonPanel, pwCss, pwJs)
	{
		$('#pw').append(buttonPanel);
		$('head').append(pwCss);
		loadJS(pwJs);
		/*var colorFilter = "<div id='pwColorFilter' class='pwColorFilter'></div>";
		$('body').append(colorFilter);*/
	}
	
	function loadJS(jsUrls)
	{
		for(var i = 0; i < jsUrls.length; i++)
		{
			var script = document.createElement('script');
			script.src = jsUrls[i];
			var body = document.head;
			body.appendChild(script);
		}
	}
	
	
});