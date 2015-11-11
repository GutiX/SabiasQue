var url  = require('url');
var path = require('path');
var fs = require('fs');
var http = require('http');
var xml2js = require('xml2js');
//var host = 'http://10.201.176.155:3000';


var ControlPanelGenerator = require('./controlPanelGenerator');

var DBOperations = require('../db/dbOperations'); 

var ERROR = "error";

//Metodo de muestra
exports.getControlPanel = function(req, res)
{
	console.log(" --- start getControlPanel --- ");
	var result;
	
	var clientDomain = getDomain(req);
	var dbOperations = new DBOperations();
	dbOperations.getClientByDomain(clientDomain, function(err, data){
		
		if(err) console.log(err);
		if(data.valid)
		{
			checkIp(req.hostname);
			console.log("Local Address: " + global.hostname + ":" + global.port);
			
			res.status(200).jsonp(result);
			
		}
		else
		{
			
			res.status(200).jsonp(result);
			console.log(" --- end getControlPanel --- ");
		}
	});			

}

function checkIp(hostname)
{
	if(hostname != global.hostname) global.hostname = hostname;
}

function getDomain(req)
{
	var dom = req.headers.referer;
	var cads = dom.split("/");
	for(var i = 0; i < cads.length; i++)
	{
		console.log("req " + i + ": " + cads[i]);
	}
	return cads[2];
}