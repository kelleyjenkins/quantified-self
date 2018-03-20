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

	var _meal_service = __webpack_require__(1);

	var _meal_view = __webpack_require__(4);

	var _food_service = __webpack_require__(2);

	var _food_view = __webpack_require__(3);

	var _meal_events = __webpack_require__(5);

	var _food_events = __webpack_require__(6);

	(0, _meal_events.eventListener)();
	(0, _food_events.foodEventListener)();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.addSelected = exports.getMealFood = exports.getMeals = exports.removeFoodAssociation = exports.getOneMeal = undefined;
	exports.updateMealFood = updateMealFood;

	var _food_service = __webpack_require__(2);

	var _food_view = __webpack_require__(3);

	var _meal_view = __webpack_require__(4);

	var getOneMeal = exports.getOneMeal = function getOneMeal() {
	    fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/meals').then(function (response) {
	        return response.json();
	    }).then(function (myJson) {
	        var meals = Object.keys(myJson).map(function (thing) {
	            return myJson[thing];
	        });
	    });
	};

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

	var removeFoodAssociation = exports.removeFoodAssociation = function removeFoodAssociation(mealId, foodId) {
	    fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/meals/' + mealId + '/foods/' + foodId, {
	        method: 'Delete'
	    }).then(function (response) {
	        return console.log(response);
	    }).catch(function (error) {
	        return console.error(error);
	    });
	};

	var getMeals = exports.getMeals = function getMeals() {
	    fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/meals').then(function (response) {
	        return response.json();
	    }).then(function (myJson) {
	        var meals = Object.keys(myJson).map(function (thing) {
	            return myJson[thing];
	        });
	        (0, _meal_view.fillMeals)(meals);
	    });
	};

	var getMealFood = exports.getMealFood = function getMealFood() {
	    fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/foods').then(function (response) {
	        return response.json();
	    }).then(function (myJson) {
	        var foods = Object.keys(myJson).map(function (thing) {
	            return myJson[thing];
	        });
	        var sorted = (0, _food_view.sortFood)(foods);
	        (0, _meal_view.MealFoodTable)(sorted);
	    });
	};

	var addSelected = exports.addSelected = function addSelected(meals) {
	    fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/meals').then(function (response) {
	        return response.json();
	    }).then(function (myJson) {
	        var meals = Object.keys(myJson).map(function (thing) {
	            return myJson[thing];
	        });
	        (0, _meal_view.showMeals)(meals);
	    });
	    $("input:checked");
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.createFood = exports.delFood = exports.getFood = exports.putFood = undefined;

	var _food_view = __webpack_require__(3);

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
	        var sorted = (0, _food_view.sortFood)(foods);
	        (0, _food_view.fillTable)(sorted);
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.validateForm = exports.fillTable = exports.sortFood = exports.searchFoods = undefined;
	exports.handleFoodDelete = handleFoodDelete;
	exports.handleFoodClick = handleFoodClick;

	var _food_service = __webpack_require__(2);

	var searchFoods = exports.searchFoods = function searchFoods() {
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
	};

	function handleFoodDelete() {
	    var foodRowId = this.closest('.food-row').id;
	    (0, _food_service.delFood)(foodRowId);
	    this.closest('.food-row').remove();
	}

	function handleFoodClick(attribute) {
	    var childId = '';
	    var inputId = '';
	    var foodRowId = this.closest('.food-row').id;

	    if (attribute === 'name') {
	        childId = $('#' + foodRowId + ' .food-cal').text();
	        inputId = this.innerText;
	        (0, _food_service.putFood)(inputId, childId, foodRowId);
	    } else {
	        childId = $('#' + foodRowId + ' .food-name').text();
	        inputId = this.innerText;
	        (0, _food_service.putFood)(childId, inputId, foodRowId);
	    }
	}

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
	        $('.food-table').append('\n         <tr class=\'food-row\' id=' + food.id + '>\n             <td contenteditable=true class=\'food-name\' id=\'food' + food.id + '\'>' + food.name + '</td>\n             <td contenteditable=true class=\'food-cal\' id=\'foodCal' + food.id + '\'>' + food.calories + '</td>\n             <td><button class=\'food' + food.id + ' food-delete\'>Delete</button></td>\n         </tr>\n         ');
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
	    } else (0, _food_service.createFood)(foodName, foodCal);
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.addFoodtoMeal = exports.MealFoodTable = exports.sortCals = exports.searchMealFoods = exports.showMeals = exports.getCalories = exports.changeColor = exports.totals = exports.fillMeals = exports.remainingCalories = undefined;
	exports.clearCheckBoxes = clearCheckBoxes;
	exports.calcCals = calcCals;
	exports.handleMealClick = handleMealClick;
	exports.handleMealDelete = handleMealDelete;

	var _meal_service = __webpack_require__(1);

	function clearCheckBoxes() {
	    $('input:checkbox').prop('checked', false);
	}

	function calcCals() {
	    var meals = $('.meal-table').get();
	    var totals = meals.forEach(function (meal) {
	        var totes = 0;
	        var rows = $(meal).children('tr').children('td:nth-child(2)').get();
	        var arr = [];
	        for (var i = 0; i < rows.length; i++) {
	            var cals = parseInt(rows[i].innerText);
	            arr.push(cals);
	        }
	        if (arr.length > 0) {
	            totes = arr.reduce(function (acc, cals) {
	                acc += cals;
	                return acc;
	            });
	        } else {
	            totes = 0;
	        }
	        $('#totalCals' + meal.id).html('\n       Total Calories : ' + totes + '\n        ');
	        $('#remaining' + meal.id).html('\n        Remaining Calories : ' + remainingCalories(meal, totes) + '</h4>\n        ');
	    });
	}

	var remainingCalories = exports.remainingCalories = function remainingCalories(meals, total) {
	    if (meals.id === 1 || meals.id === 'meal1') {
	        return calorieAdder(meals, 400, total);
	    } else if (meals.id === 2 || meals.id === 'meal2') {
	        return calorieAdder(meals, 600, total);
	    } else if (meals.id === 3 || meals.id === 'meal3') {
	        return calorieAdder(meals, 800, total);
	    } else if (meals.id === 4 || meals.id === 'meal4') {
	        return calorieAdder(meals, 200, total);
	    } else {
	        return 0;
	    }
	};

	var calorieAdder = function calorieAdder(meals, goal, total) {
	    var remaining = goal - total;
	    return remaining;
	};

	var fillMeals = exports.fillMeals = function fillMeals(meals) {
	    var totalCals = [];
	    meals.forEach(function (meal) {
	        $('.meal-container').append('\n        <table class=\'meal-table\' id=\'meal' + meal.id + '\'>\n        <h2>' + meal.name + '</h2>\n        <trid =\'header' + meal.id + '\'></tr>\n        <tr>\n            <th>Name</th>\n            <th>Calories</th>\n        </tr>\n        </table>\n        ');
	        meal.foods.forEach(function (food) {
	            $('#meal' + meal.id).append('\n            <tr class=\'meal-row\' id=' + meal.id + '>\n                <td class=\'food-name\' id=\'meal' + food.id + '\'>' + food.name + '</td>\n                <td class=\'food-cal\' id=\'foodCal' + food.id + '\'>' + food.calories + '</td>\n                <td><button id = ' + food.id + ' class=\'food' + food.id + ' food-remove\'>Delete</button></td>\n            </tr>\n            ');
	        });
	        totalCals.push(getCalories(meal));
	        totals(meal);
	    });
	    var fillTotals = function fillTotals() {
	        var totalCalories = function totalCalories() {
	            return totalCals.reduce(function (a, b) {
	                return a + b;
	            }, 0);
	        };
	        var calsRemainingCalc = 2000 - totalCalories();
	        $('.goal-calories').append('<td>2000</td>');
	        $('.calories-consumed').append('<td>' + totalCalories() + '</td>');
	        $('.calories-remaining').append('<td>' + calsRemainingCalc + '</td>');
	        if (calsRemainingCalc < 0) {
	            document.getElementById('calories-remaining').style.color = "red";
	        } else {
	            document.getElementById('calories-remaining').style.color = "green";
	        }
	    };
	    fillTotals();
	};

	var totals = exports.totals = function totals(meal) {
	    $('.meal-container').append('\n         <h4 class=\'total-calories\' id =\'totalCalsmeal' + meal.id + '\'>Total Calories : ' + getCalories(meal) + '</h4>\n         <h4 class = \'remaining-calories\' id=\'remainingmeal' + meal.id + '\'>Remaining Calories : ' + remainingCalories(meal, getCalories(meal)) + '</h4>\n        ');
	    changeColor(meal);
	};

	var changeColor = exports.changeColor = function changeColor(meal) {
	    if (remainingCalories(meal, getCalories(meal)) < 0) {
	        document.getElementById('remainingmeal' + meal.id).style.color = "red";
	    } else {
	        document.getElementById('remainingmeal' + meal.id).style.color = "green";
	    }
	};

	var getCalories = exports.getCalories = function getCalories(meal) {
	    if (meal.foods.length > 0) {
	        return meal.foods.reduce(function (acc, food) {
	            return acc += food.calories;
	        }, 0);
	    } else return 0;
	};

	var showMeals = exports.showMeals = function showMeals(meals) {
	    meals.forEach(function (meal) {
	        $('.add-selected').append('\n    <button class= \'meal-button\' id=' + meal.id + '>' + meal.name + '</button>\n    ');
	    });
	};

	var searchMealFoods = exports.searchMealFoods = function searchMealFoods() {
	    var input = void 0,
	        filter = void 0,
	        table = void 0,
	        tr = void 0,
	        td = void 0,
	        i = void 0;
	    input = document.getElementById("search-meal-food");
	    filter = input.value.toUpperCase();
	    table = document.getElementById('meal-food-table');
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
	};

	var sortCals = exports.sortCals = function sortCals() {
	    var table = void 0,
	        rows = void 0,
	        switching = void 0,
	        i = void 0,
	        x = void 0,
	        y = void 0,
	        shouldSwitch = void 0;
	    table = document.getElementById("meal-food-table");
	    switching = true;

	    while (switching) {
	        switching = false;
	        rows = table.getElementsByTagName("tr");
	        for (i = 1; i < rows.length - 1; i++) {
	            shouldSwitch = false;
	            x = rows[i].getElementsByTagName("td")[1];
	            y = rows[i + 1].getElementsByTagName("td")[1];
	            if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
	                shouldSwitch = true;
	                break;
	            }
	        }
	        if (shouldSwitch) {
	            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
	            switching = true;
	        }
	    }
	};

	var MealFoodTable = exports.MealFoodTable = function MealFoodTable(food) {
	    food.forEach(function (food) {
	        $('.meal-food-table').append('\n        <tr class=\'food-row\' id=' + food.id + '>\n            <td contenteditable=true class=\'food-name\' id=\'food' + food.id + '\'>' + food.name + '</td>\n            <td contenteditable=true class=\'food-cal\' id=\'foodCal' + food.id + '\'>' + food.calories + '</td>\n           <td> <input id="checkBox" type="checkbox"> </td>\n        </tr>\n        ');
	    });
	};

	function handleMealClick() {
	    var _this = this;

	    var checked = $("input:checked").get();
	    checked.forEach(function (box) {
	        var rowId = box.closest('tr').id;
	        var foodName = $('#' + rowId + '.food-row .food-name').text();
	        var foodCal = $('#' + rowId + '.food-row .food-cal').text();
	        (0, _meal_service.updateMealFood)(_this.id, box.closest('tr').id, foodName, foodCal);
	        addFoodtoMeal(_this.id, rowId, foodName, foodCal);
	    });
	}

	var addFoodtoMeal = exports.addFoodtoMeal = function addFoodtoMeal(mealId, rowId, foodName, foodCal) {
	    $('#meal' + mealId).last('td').append('\n        <tr class=\'meal-row\' id=' + mealId + '>\n            <td class=\'food-name\' id=\'meal' + rowId + '\'>' + foodName + '</td>\n            <td class=\'food-cal\' id=\'foodCal' + rowId + '\'>' + foodCal + '</td>\n            <td><button id = ' + rowId + ' class=\'food' + rowId + ' food-remove\'>Delete</button></td>\n        </tr>\n    ');
	    $("input:checked").removeAttr('checked');
	};

	function handleMealDelete() {
	    var mealId = this.closest('.meal-row').id;
	    var foodId = this.id;
	    (0, _meal_service.removeFoodAssociation)(mealId, foodId);
	    this.closest('.meal-row').remove();
	}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.eventListener = undefined;

	var _meal_service = __webpack_require__(1);

	var _meal_view = __webpack_require__(4);

	var eventListener = exports.eventListener = function eventListener() {
	  $(window).on('load', function () {
	    (0, _meal_service.getMeals)();
	    (0, _meal_service.addSelected)();
	    (0, _meal_service.getMealFood)();
	  });

	  $('.new-food').click(function () {
	    window.location.href = 'http://localhost:8080/foods.html';
	    return false;
	  });

	  $('.add-selected').on('click', '.meal-button', function () {
	    _meal_view.handleMealClick.call(this);
	    (0, _meal_view.calcCals)();
	    (0, _meal_view.clearCheckBoxes)();
	  });

	  $('.meal-container').on('click', '.meal-table .meal-row .food-remove', function () {
	    _meal_view.handleMealDelete.call(this);
	    (0, _meal_view.calcCals)();
	  });

	  $('#search-meal-food').on('keyup', function () {
	    (0, _meal_view.searchMealFoods)();
	  });

	  $('#cals').on('click', function () {
	    (0, _meal_view.sortCals)();
	  });
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.foodEventListener = undefined;

	var _food_service = __webpack_require__(2);

	var _food_view = __webpack_require__(3);

	var foodEventListener = exports.foodEventListener = function foodEventListener() {

	    $(window).on('load', function () {
	        (0, _food_service.getFood)();
	    });

	    $('.food-rows').on('blur', '.food-row .food-name', function () {
	        _food_view.handleFoodClick.call(this, 'name');
	    });
	    $('.food-rows').on('blur', '.food-row .food-cal', function () {
	        _food_view.handleFoodClick.call(this, 'cal');
	    });

	    $('.food-table').on('click', '.food-row .food-delete', function () {
	        _food_view.handleFoodDelete.call(this);
	    });

	    $('.food-button').click(function () {
	        return (0, _food_view.validateForm)(event);
	    });

	    $('#search-food').on('keyup', function () {
	        (0, _food_view.searchFoods)();
	    });
	};

/***/ })
/******/ ]);