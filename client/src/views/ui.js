var ajax = require('../helpers/ajax');
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