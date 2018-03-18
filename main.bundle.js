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

	var _meals = __webpack_require__(1);

	var _foods = __webpack_require__(2);

	$('.new-food').click(function () {
	  window.location.href = 'http://localhost:8080/foods.html';
	  return false;
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.showMeals = exports.addSelected = exports.MealFoodTable = exports.getMealFood = exports.getCalories = exports.totals = exports.getMeals = undefined;
	exports.handleMealClick = handleMealClick;
	exports.updateMealFood = updateMealFood;
	exports.handleMealDelete = handleMealDelete;

	var _foods = __webpack_require__(2);

	$('.add-selected').on('click', '.meal-button', function () {
	    handleMealClick.call(this);
	});

	$(window).on('load', function () {
	    getMeals();
	    addSelected();
	    getMealFood();
	});

	$('.meal-container').on('click', '.meal-table .meal-row .food-delete', function () {
	    handleMealDelete.call(this);
	});

	function handleMealClick() {
	    var _this = this;

	    var checked = $("input:checked").get();

	    checked.forEach(function (box) {
	        var rowId = box.closest('tr').id;
	        var foodName = $('#' + rowId + '.food-row .food-name').text();
	        var foodCal = $('#' + rowId + '.food-row .food-cal').text();
	        updateMealFood(_this.id, box.closest('tr').id, foodName, foodCal);
	    });
	}

	function updateMealFood(mealId, foodId, foodName, foodCal) {
	    var body = JSON.stringify({
	        name: foodName,
	        calories: foodCal
	    });
	    fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/meals/' + mealId + '/foods/' + foodId, {
	        method: 'post',
	        headers: { 'Content-Type': 'application/json' },
	        body: body
	    }).then(function (response) {
	        return console.log(response);
	    }).catch(function (error) {
	        return console.error(error);
	    });
	}

	function handleMealDelete() {
	    var foodId = event.target.id;
	    console.log(foodId.to_s);
	    (0, _foods.delFood)(foodId);
	    this.closest('.meal-row').remove();
	}

	var getMeals = exports.getMeals = function getMeals() {
	    fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/meals').then(function (response) {
	        return response.json();
	    }).then(function (myJson) {
	        var meals = Object.keys(myJson).map(function (thing) {
	            return myJson[thing];
	        });
	        fillMeals(meals);
	    });
	};

	var remainingCalories = function remainingCalories(meals, total) {
	    var meal = meals.name.toLowerCase();

	    if (meal === 'breakfast') {
	        return calorieAdder(meals, 400, total);
	    } else if (meal === 'lunch') {
	        return calorieAdder(meals, 600, total);
	    } else if (meal === 'dinner') {
	        return calorieAdder(meals, 800, total);
	    } else if (meal === 'snack') {
	        return calorieAdder(meals, 200, total);
	    } else {
	        return 0;
	    }
	};

	var calorieAdder = function calorieAdder(meals, goal, total) {
	    var remaining = goal - total;
	    if (remaining < 0) {
	        return remaining;
	    } else colorRed(meals);
	    return remaining;
	};

	var totalCals = [];

	var fillMeals = function fillMeals(meals) {
	    meals.forEach(function (meal) {
	        $('.meal-container').append('\n        <table class=\'meal-table\' id=\'meal' + meal.id + '\'>\n        <h2>' + meal.name + '</h2>\n        <tr>\n            <th>Name</th>\n            <th>Calories</th>\n        </tr>\n        </table>\n        ');
	        meal.foods.forEach(function (food) {
	            $('#meal' + meal.id).append('\n            <tr class=\'meal-row\' id=' + meal.id + '>\n                <td class=\'food-name\' id=\'meal' + food.id + '\'>' + food.name + '</td>\n                <td class=\'food-cal\' id=\'foodCal' + food.id + '\'>' + food.calories + '</td>\n                <td><button id = ' + food.id + ' class=\'food' + food.id + ' food-delete\'>Delete</button></td>\n            </tr>\n            ');
	        });
	        totalCals.push(getCalories(meal));
	        totals(meal);
	    });
	    var fillTotals = function fillTotals() {
	        var totalCalories = totalCals.reduce(function (a, b) {
	            return a + b;
	        }, 0);
	        $('.goal-calories').append('<td>2000</td>');
	        $('.calories-consumed').append('<td>' + totalCalories + '</td>');
	        $('.calories-remaining').append('<td>' + (2000 - totalCalories) + '</td>');
	    };
	    fillTotals();
	};

	var totals = exports.totals = function totals(meal) {
	    $('#meal' + meal.id).append('\n         <h4 class=\'total-calories\'>Total Calories : ' + getCalories(meal) + '</h4>\n         <h4 class = \'remaining-calories\' id=\'remaining' + meal.id + '\'>Remaining Calories : ' + remainingCalories(meal, getCalories(meal)) + '</h4>\n        ');
	};

	var getCalories = exports.getCalories = function getCalories(meal) {
	    if (meal.foods.length > 0) {
	        return meal.foods.reduce(function (acc, food) {
	            return acc += food.calories;
	        }, 0);
	    } else return 0;
	};

	var colorRed = function colorRed(meal) {
	    $('.meal-table').children('#remaining' + meal.id).css('color', 'red');
	};

	var getMealFood = exports.getMealFood = function getMealFood() {
	    fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/foods').then(function (response) {
	        return response.json();
	    }).then(function (myJson) {
	        var foods = Object.keys(myJson).map(function (thing) {
	            return myJson[thing];
	        });
	        var sorted = (0, _foods.sortFood)(foods);
	        MealFoodTable(sorted);
	    });
	};

	var MealFoodTable = exports.MealFoodTable = function MealFoodTable(food) {
	    food.forEach(function (food) {
	        $('.meal-food-table').append('\n        <tr class=\'food-row\' id=' + food.id + '>\n            <td contenteditable=true class=\'food-name\' id=\'food' + food.id + '\'>' + food.name + '</td>\n            <td contenteditable=true class=\'food-cal\' id=\'foodCal' + food.id + '\'>' + food.calories + '</td>\n           <td> <input id="checkBox" type="checkbox"> </td>\n        </tr>\n        ');
	    });
	};

	var addSelected = exports.addSelected = function addSelected(meals) {
	    fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/meals').then(function (response) {
	        return response.json();
	    }).then(function (myJson) {
	        var meals = Object.keys(myJson).map(function (thing) {
	            return myJson[thing];
	        });
	        showMeals(meals);
	    });
	    $("input:checked");
	};

	var showMeals = exports.showMeals = function showMeals(meals) {
	    meals.forEach(function (meal) {
	        $('.add-selected').append('\n    <button class= \'meal-button\' id=' + meal.id + '>' + meal.name + '</button>\n    ');
	    });
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.handleFoodDelete = handleFoodDelete;
	$(window).on('load', function () {
	    getFood();
	});

	$('.food-rows').on('blur', '.food-row .food-name', function () {
	    handleFoodClick.call(this, 'name');
	});
	$('.food-rows').on('blur', '.food-row .food-cal', function () {
	    handleFoodClick.call(this, 'cal');
	});

	$('.food-table').on('click', '.food-row .food-delete', function () {
	    handleFoodDelete.call(this);
	});

	$('.food-button').click(function () {
	    return validateForm(event);
	});

	function handleFoodDelete() {
	    var foodRowId = this.closest('.food-row').id;
	    delFood(foodRowId);
	    this.closest('.food-row').remove();
	}

	function handleFoodClick(attribute) {
	    var childId = '';
	    var inputId = '';
	    var foodRowId = this.closest('.food-row').id;

	    if (attribute === 'name') {
	        childId = $('#' + foodRowId + ' .food-cal').text();
	        inputId = this.innerText;
	        putFood(inputId, childId, foodRowId);
	    } else {
	        childId = $('#' + foodRowId + ' .food-name').text();
	        inputId = this.innerText;
	        putFood(childId, inputId, foodRowId);
	    }
	}

	var putFood = exports.putFood = function putFood(foodName, foodCal, foodId) {
	    var body = JSON.stringify({
	        name: foodName,
	        calories: foodCal
	    });
	    fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/foods/' + foodId, {
	        method: 'put',
	        headers: { 'Content-Type': 'application/json' },
	        body: body
	    }).then(function (response) {
	        return location.reload();
	    });
	};

	var getFood = exports.getFood = function getFood() {
	    fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/foods').then(function (response) {
	        return response.json();
	    }).then(function (myJson) {
	        var foods = Object.keys(myJson).map(function (thing) {
	            return myJson[thing];
	        });
	        var sorted = sortFood(foods);
	        fillTable(sorted);
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
	        $('.food-table').append('\n        <tr class=\'food-row\' id=' + food.id + '>\n            <td contenteditable=true class=\'food-name\' id=\'food' + food.id + '\'>' + food.name + '</td>\n            <td contenteditable=true class=\'food-cal\' id=\'foodCal' + food.id + '\'>' + food.calories + '</td>\n            <td><button class=\'food' + food.id + ' food-delete\'>Delete</button></td>\n        </tr>\n        ');
	    });
	};

	var delFood = exports.delFood = function delFood(id) {
	    fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/foods/' + id, {
	        method: 'DELETE'
	    }).then(function (response) {
	        return response.json;
	    }).catch(function (response) {
	        return console.error(response);
	    });
	};

	var validateForm = exports.validateForm = function validateForm(event) {
	    event.preventDefault();
	    var foodName = $('.name-input').val();
	    var foodCal = $('.cal-input').val();
	    console.log('name', foodName, 'cal', foodCal);
	    if (foodName === "") {
	        $('.food-form').append('<div>Please enter a food name </div>');
	    } else if (foodCal === "") {
	        $('.food-form').append('<div>Please enter a calorie amount</div>');
	    } else createFood(foodName, foodCal);
	};

	var createFood = exports.createFood = function createFood(foodName, cal, event) {
	    var food = { name: foodName,
	        calories: cal };

	    fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/foods', {
	        headers: { 'Accept': 'application/json',
	            'Content-Type': 'application/json' },
	        method: 'post',
	        body: JSON.stringify(food)
	    }).then(function (response) {
	        return location.reload();
	    }).catch(function (error) {
	        return console.error(error);
	    });
	};

	$('#search-food').on('keyup', function () {
	    var input, filter, table, tr, td, i;
	    input = document.getElementById("search-food");
	    filter = input.value.toUpperCase();
	    table = document.getElementById('food-table');
	    tr = table.getElementsByTagName("tr");

	    for (i = 1; i < tr.length; i++) {
	        td = tr[i].getElementsByTagName("td")[0];
	        if (td) {
	            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
	                tr[i].style.display = "";
	            } else {
	                tr[i].style.display = "none";
	            }
	        }
	    }
	});

/***/ })
/******/ ]);