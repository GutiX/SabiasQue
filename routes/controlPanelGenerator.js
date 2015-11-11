//JS muestra
var path = require('path');
var fs = require('fs');
var DBOperations = require('../db/dbOperations');

var appDir = path.dirname(require.main.filename);


function ControlPanelGenerator() {
    if(false === (this instanceof ControlPanelGenerator)) {
        return new ControlPanelGenerator();
    }
};
 
ControlPanelGenerator.prototype.getControlPanel = function(clientDoc, callback){
	var result = {};
	
	callback(result);
};

module.exports = ControlPanelGenerator;
