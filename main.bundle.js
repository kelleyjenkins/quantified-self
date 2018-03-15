/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _foods = __webpack_require__(1);

	console.log(_foods.getfood);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var getfood = exports.getfood = function getfood() {
	    fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/foods').then(function (response) {
	        return response.json();
	    }).then(function (myJson) {
	        var foods = Object.keys(myJson).map(function (thing) {
	            return myJson[thing];
	        });
	        sortFood(foods);
	        fillTable(foods);
	    });
	};

	var sortFood = exports.sortFood = function sortFood(food) {
	    var result = food.sort(function (a, b) {
	        if (a.id > b.id) {
	            return -1;
	        } else {
	            return 1;
	        }
	    });
	    return result;
	};

	var fillTable = exports.fillTable = function fillTable(food) {
	    food.forEach(function (food) {
	        var row = document.createElement('tr');
	        var name = document.createElement('td');
	        var cal = document.createElement('td');
	        var del = document.createElement('button');
	        del.className = 'food' + food.id;
	        del.innerHTML = 'x';
	        $('.food-table').append(row);
	        row.append(name);
	        name.append(food.name);
	        row.append(cal);
	        cal.append(food.calories);
	        row.append(del);
	        delFood(food);
	    });
	};

	var delFood = exports.delFood = function delFood(food) {
	    $('.food' + food.id).on('click', function (e) {
	        e.preventDefault();
	        fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/foods/' + food.id, {
	            method: 'DELETE'
	        }).then(function (response) {
	            return location.reload();
	        });
	    });
	};

	var createFood = exports.createFood = function createFood(event) {
	    event.preventDefault();
	    var $foodName = $('.name-input').val();
	    var $foodCal = $('.cal-input').val();
	    var food = { name: $foodName,
	        calories: $foodCal };

	    fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/foods', {
	        headers: { 'Accept': 'application/json',
	            'Content-Type': 'application/json' },
	        method: 'post',
	        body: JSON.stringify(food)
	    }).then(function (response) {
	        return response;
	    }).then(function (response) {
	        return location.reload();
	    });
	};

	$('.food-form').click(createFood);

	getfood();

/***/ })
/******/ ]);