//watch file api

'use strict';

var fs = require('fs');
var common = require('./common.js');
var compiler = require('./compiler.js');

//add watch files
exports.add = function(files) {
	if(common.isArray(files)){
		files.forEach(function(item) {
			watchFile(item);
		});
	}else{
		watchFile(files);
	}
}

//remove watch files
exports.remove = function(files) {
	if(common.isArray(files)){
		files.forEach(function(item) {
			fs.unWatchFile(item.src);
		});
	}else{
		fs.unWatchFile(files.src);
	}
}

//watch file
function watchFile(file) {
	fs.watchFile(file.src, {interval: 1000}, function(){
		//文件改变，编译
		console.log(file.src + ' is change');
		compiler.runCompile(file);
	});
}