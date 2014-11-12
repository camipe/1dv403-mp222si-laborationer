"use strict";

var makePerson = function(persArr){

  // Declaring variables
  var result = {};
  var ages = [];
  var names = [];
  var sortedNames = "";

  // Returns an array of all the names form the array persArr
  names = persArr.map(function(obj) {
    return obj.name;
  });
  // Sorts the names alphabetically
  sortedNames = names.sort(function(a,b){return a.localeCompare(b)});

  ages = persArr.map(function(obj) {
    return obj.age;
  });

  // Add Names to result object as a string
  result.names = sortedNames.join(", ");

  return result;
};


 var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];

 var result = makePerson(data);

 console.log(result);

