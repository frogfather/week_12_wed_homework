/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var UI = __webpack_require__(1);
	
	var app = function() {
	  new UI();
	}
	
	window.onload = app;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var ajax = __webpack_require__(2);
	var countries = [];
	var bucket = [];
	var dragged;
	
	var UI = function(){
	  this.render();
	}
	
	UI.prototype = {
	  render: function(){
	  var url = "https://restcountries.eu/rest/v1/all"; 
	  ajax.get(url,function(data){
	    console.log(data);
	    var countryDiv = document.querySelector("#country-div");
	    var searchBar = document.createElement("div");
	    searchBar.setAttribute("id","search-bar");
	    countryDiv.appendChild(searchBar);
	    var searchBox = document.createElement("input");
	    searchBox.setAttribute("id","search-text");
	    searchBox.value = "Text"
	    searchBar.appendChild(searchBox);
	    var searchButton = document.createElement("button");
	    searchButton.setAttribute("id","search-button");
	    searchButton.innerText = "Search";
	    searchButton.onclick = this.buttonClick;
	
	    searchBar.appendChild(searchButton);
	    var bucketListDiv = document.querySelector("#bucket-list-div");
	    var ul = document.createElement("ul");
	    ul.setAttribute("id","ul");
	    countryDiv.appendChild(ul);
	    ul = document.createElement("ul");
	    ul.setAttribute("id","bucket-ul");
	    bucketListDiv.appendChild(ul);
	
	    for (country of data){
	      countries.push(country);
	    }
	    this.listCountries();
	  var image = document.querySelector("img");
	
	  image.ondrop = this.bucketDrop.bind(this);
	  image.ondragenter = this.bucketDragEnter;
	  image.ondragover = this.bucketDragOver;
	  countryDiv.onclick = this.countryClick;
	
	    }.bind(this));
	  },
	
	  countryClick: function(event){
	    console.log("You clicked "+event.path[0].textContent);
	
	  },
	
	  countryDrag: function(event){
	    event.preventDefault();
	    },
	
	  countryDragStart: function(event){
	 
	    dragged = event.path[0].textContent;
	  },
	
	  bucketDragOver: function(event){
	    event.preventDefault();
	 
	  },
	
	  bucketDrop: function(event){
	     bucket.push(dragged);
	     console.log(bucket);
	     var index = countries.findIndex(function(country){
	      return country.name ===dragged;
	     });
	     countries.splice(index,1);
	     this.listCountries();
	     this.listBucket();
	    },
	
	  bucketDragEnter: function(event){
	    event.preventDefault();
	    },
	
	  listCountries: function(){
	    var ul = document.querySelector("#ul");
	    ul.innerHTML = "";
	
	    for (var i=0; i< countries.length;i++){
	    var li = document.createElement("li");
	    li.innerText = countries[i].name;
	    li.setAttribute("draggable","true");
	    li.ondrag = this.countryDrag;
	    li.ondragstart = this.countryDragStart;
	    ul.appendChild(li); 
	    }
	  },
	
	  listBucket: function(){
	    console.log(bucket);
	    var bucketList = document.querySelector("#bucket-ul");
	    bucketList.innerHTML = "";
	
	    for (var i=0; i< bucket.length;i++){
	    var li = document.createElement("li");
	    li.innerText = bucket[i];
	    bucketList.appendChild(li); 
	    }
	  },
	  buttonClick: function(){
	
	  }
	
	}
	
	module.exports = UI;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var ajax = {
	  get: function(url,callback){
	  var request = new XMLHttpRequest();
	  request.open('GET', url);  
	  request.onload = function(){
	  if (this.status !== 200) {
	    console.error('Request status:', this.status);
	    return;
	    }
	  var jsonString = this.responseText;
	  var data = JSON.parse(jsonString);
	  callback(data);
	    }
	  request.send();  
	  }
	}
	
	
	module.exports = ajax;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map