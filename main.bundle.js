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

	__webpack_require__(5);

	var _meal_events = __webpack_require__(9);

	var _food_events = __webpack_require__(10);

	(0, _meal_events.eventListener)();
	(0, _food_events.foodEventListener)();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.addSelected = exports.getMealFood = exports.getMeals = exports.removeFoodAssociation = undefined;
	exports.updateMealFood = updateMealFood;

	var _food_service = __webpack_require__(2);

	var _food_view = __webpack_require__(3);

	var _meal_view = __webpack_require__(4);

	function updateMealFood(mealId, foodId, foodName, foodCal) {
	    var body = JSON.stringify({
	        name: foodName,
	        calories: foodCal
	    });
	    fetch('https://salty-escarpment-41029.herokuapp.com/api/meals/' + mealId + '/foods/' + foodId, {
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
	    fetch('https://salty-escarpment-41029.herokuapp.com/api/meals/' + mealId + '/foods/' + foodId, {
	        method: 'Delete'
	    }).then(function (response) {
	        return console.log(response);
	    }).catch(function (error) {
	        return console.error(error);
	    });
	};

	var getMeals = exports.getMeals = function getMeals() {
	    fetch('https://salty-escarpment-41029.herokuapp.com/api/meals').then(function (response) {
	        return response.json();
	    }).then(function (myJson) {
	        var meals = Object.keys(myJson).map(function (thing) {
	            return myJson[thing];
	        });
	        (0, _meal_view.fillMeals)(meals);
	    });
	};

	var getMealFood = exports.getMealFood = function getMealFood() {
	    fetch('https://salty-escarpment-41029.herokuapp.com/api/foods').then(function (response) {
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
	    fetch('https://salty-escarpment-41029.herokuapp.com/api/meals').then(function (response) {
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
	    fetch('https://salty-escarpment-41029.herokuapp.com/api/foods/' + foodId, {
	        method: 'put',
	        headers: { 'Content-Type': 'application/json' },
	        body: body
	    }).then(function (response) {
	        return location.reload();
	    });
	};

	var getFood = exports.getFood = function getFood() {
	    fetch('https://salty-escarpment-41029.herokuapp.com/api/foods', { 'Access-Control-Allow-Origin': '*' }).then(function (response) {
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
	    fetch('https://salty-escarpment-41029.herokuapp.com/api/foods/' + id, {
	        method: 'DELETE'
	    }).then(function (response) {
	        return handleResponse(response);
	    }).catch(function (response) {
	        return console.error(response);
	    });
	};

	var createFood = exports.createFood = function createFood(foodName, cal, event) {
	    var food = { name: foodName,
	        calories: cal };
	    fetch('https://salty-escarpment-41029.herokuapp.com/api/foods', {
	        headers: { 'Accept': 'application/json',
	            'Content-Type': 'application/json' },
	        method: 'post',
	        body: JSON.stringify(food)
	    }).then(function (response) {
	        return response.json();
	    }).then(function (response) {
	        var food = Object.keys(response).map(function (thing) {
	            return response[thing];
	        });
	        (0, _food_view.addFoodRow)(food);
	    }).catch(function (error) {
	        return console.error(error);
	    });
	};

	function handleResponse(response) {
	    if (!response.ok) {
	        alert('sorry that foods belongs to a meal');
	        location.reload();
	    } else return response;
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.addFoodRow = exports.validateForm = exports.fillTable = exports.sortFood = exports.searchFoods = undefined;
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

	  var foodRowId = '';
	  var result = '';

	  if (this.closest('.food-row')) {
	    foodRowId = this.closest('.food-row').id;
	    (0, _food_service.delFood)(foodRowId);
	    this.closest('.food-row').remove();
	  } else {
	    foodRowId = this.parentNode.parentNode.className;
	    this.parentNode.parentNode.remove();
	    (0, _food_service.delFood)(foodRowId);
	  }
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
	    $('.food-table').append('\n     <tr class=\'food-row\' id=' + food.id + '>\n         <td contenteditable=true class=\'food-name\' id=\'food' + food.id + '\'>' + food.name + '</td>\n         <td contenteditable=true class=\'food-cal\' id=\'foodCal' + food.id + '\'>' + food.calories + '</td>\n         <td><button class=\'food' + food.id + ' food-delete\'>Delete</button></td>\n     </tr>\n     ');
	  });
	};

	var validateForm = exports.validateForm = function validateForm(event) {
	  event.preventDefault();
	  $('.food-error').remove();
	  var foodName = $('.name-input').val();
	  var foodCal = $('.cal-input').val();
	  if (foodName === "") {
	    $('.food-form').append('<div class = \'food-error\'>Please enter a food name </div>');
	  } else if (foodCal === "") {
	    $('.food-form').append('<div class = \'food-error\'>Please enter a calorie amount</div>');
	  } else (0, _food_service.createFood)(foodName, foodCal);
	};

	var addFoodRow = exports.addFoodRow = function addFoodRow(food) {
	  $('.food-table tbody').append('\n    <tr class = \'' + food[0].id + '\'>\n    <td contenteditable="true" class="food-name" id="food' + food[0].name + '">' + food[0].name + '</td>\n    <td contenteditable="true" class="food-name" id="foodCal' + food[0].calories + '">' + food[0].calories + '</td>\n    <td><button class="food' + food[0].id + ' food-delete">Delete</button></td>\n    </tr>');
	  $('.food' + food[0].id).on('click', function () {
	    handleFoodDelete.call(this);
	  });
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.addFoodToMeal = exports.MealFoodTable = exports.appendSorted = exports.sortCals = exports.fillArray = exports.searchMealFoods = exports.showMeals = exports.getCalories = exports.changeColor = exports.totals = exports.fillmealfoodrow = exports.fillMeals = exports.remainingCalories = undefined;
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
	    var totalTableCals = [];
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
	        totalTableCals.push(totes);
	        $('#totalCals' + meal.id).html('Total Calories : ' + totes);
	        $('#remaining' + meal.id).html('Remaining Calories: ' + remainingCalories(meal, totes) + '</h4>');
	        if (remainingCalories(meal, totes) < 0) {
	            document.getElementById('remaining' + meal.id).style.color = "#8b0000";
	        } else {
	            document.getElementById('remaining' + meal.id).style.color = "green";
	        }
	    });
	    updateTotalTable(totalTableCals);
	}

	var updateTotalTable = function updateTotalTable(totalTableCals) {
	    var totalTableCalories = function totalTableCalories() {
	        return totalTableCals.reduce(function (a, b) {
	            return a + b;
	        }, 0);
	    };
	    var remainingTableCals = 2000 - totalTableCalories();
	    $('.cals-consumed').html('' + totalTableCalories());
	    $('.remaining-cals').html('' + remainingTableCals);
	    if (remainingTableCals < 0) {
	        document.getElementById('calories-remaining').style.color = "#8b0000";
	    } else {
	        document.getElementById('calories-remaining').style.color = "green";
	    }
	};

	var remainingCalories = exports.remainingCalories = function remainingCalories(meals, total) {
	    if (meals.id === 1 || meals.id === 'meal1') {
	        return calorieAdder(meals, 400, total);
	    } else if (meals.id === 2 || meals.id === 'meal2') {
	        return calorieAdder(meals, 600, total);
	    } else if (meals.id === 3 || meals.id === 'meal3') {
	        return calorieAdder(meals, 200, total);
	    } else if (meals.id === 4 || meals.id === 'meal4') {
	        return calorieAdder(meals, 800, total);
	    } else {
	        return 0;
	    }
	};

	var calorieAdder = function calorieAdder(meals, goal, total) {
	    var remaining = goal - total;
	    return remaining;
	};

	var totalCals = [];

	var fillMeals = exports.fillMeals = function fillMeals(meals) {
	    meals.forEach(function (meal) {
	        $('.meal-container').append('\n        <div class=\'table-container\' id =\'table' + meal.id + '\'>\n        <table label=\'meal-table\'class=\'meal-table\' id=\'meal' + meal.id + '\'>\n        <h2>' + meal.name + '</h2>\n        <trid =\'header' + meal.id + '\'></tr>\n        <tr>\n            <th>Name</th>\n            <th>Calories</th>\n        </tr>\n        </table>\n        </div>\n        ');
	        fillmealfoodrow(meal);
	        totalCals.push(getCalories(meal));
	        totals(meal);
	    });
	    fillTotalsTable();
	};

	var fillmealfoodrow = exports.fillmealfoodrow = function fillmealfoodrow(meal) {
	    meal.foods.forEach(function (food) {
	        $('#meal' + meal.id).append('\n    <tr class=\'meal-row\' >\n        <td label=\'food-name\' class=\'food-name\' id=\'meal' + food.id + '\'>' + food.name + '</td>\n        <td label=\'food-cal\' class=\'food-cal\' id=\'foodCal' + food.id + '\'>' + food.calories + '</td>\n        <td><button id = ' + food.id + ' class=\'food' + food.id + ' food-remove\'>Delete</button></td>\n    </tr>\n    ');
	    });
	};

	var fillTotalsTable = function fillTotalsTable() {
	    var totalCalories = function totalCalories() {
	        return totalCals.reduce(function (a, b) {
	            return a + b;
	        }, 0);
	    };
	    var calsRemainingCalc = 2000 - totalCalories();
	    $('.cals-consumed').html('<td>' + totalCalories() + '</td>');
	    $('.remaining-cals').html('<td>' + calsRemainingCalc + '</td>');
	    if (calsRemainingCalc < 0) {
	        document.getElementById('calories-remaining').style.color = "#8b0000";
	    } else {
	        document.getElementById('calories-remaining').style.color = "green";
	    }
	};

	var totals = exports.totals = function totals(meal) {
	    $('#table' + meal.id).append('<div class=\'totals\'>\n     <h4 class=\'total-calories\' id =\'totalCalsmeal' + meal.id + '\'>Total Calories : ' + getCalories(meal) + '</h4>\n     <h4 class = \'remaining-calories\' id=\'remainingmeal' + meal.id + '\'>Remaining Calories : ' + remainingCalories(meal, getCalories(meal)) + '</h4></div>\n    ');
	    changeColor(meal);
	};

	var changeColor = exports.changeColor = function changeColor(meal) {
	    if (remainingCalories(meal, getCalories(meal)) < 0) {
	        document.getElementById('remainingmeal' + meal.id).style.color = "#8b0000";
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

	var myArray = void 0;

	var fillArray = exports.fillArray = function fillArray() {
	    myArray = $("#meal-food-table").children('tbody').children('tr:not(:first)').get();
	};

	var sortCals = exports.sortCals = function sortCals(clicks) {
	    var sorted = void 0;
	    var rows = $("#meal-food-table").children('tbody').children('tr:not(:first)').get();
	    var cals = rows.map(function (row) {
	        return row;
	    });
	    if (clicks === 1) {
	        var _sorted = cals.sort(function (a, b) {
	            return parseInt(a.children[1].innerText) > parseInt(b.children[1].innerText) ? -1 : 1;
	        });
	        $("#meal-food-table tbody tr:not(:first)").remove();
	        appendSorted(_sorted);
	    } else if (clicks === 2) {
	        var _sorted2 = cals.sort(function (a, b) {
	            return parseInt(a.children[1].innerText) < parseInt(b.children[1].innerText) ? -1 : 1;
	        });
	        $("#meal-food-table tbody tr:not(:first)").remove();
	        appendSorted(_sorted2);
	    } else if (clicks === 3) {
	        $("#meal-food-table tbody tr:not(:first)").remove();
	        appendSorted(myArray);
	    }
	};

	var appendSorted = exports.appendSorted = function appendSorted(things) {
	    $("#meal-food-table tbody").append(things);
	};

	var MealFoodTable = exports.MealFoodTable = function MealFoodTable(food) {
	    food.forEach(function (food) {
	        $('.meal-food-table').find('tbody').append('\n        <tr class=\'food-row\' id=' + food.id + '>\n            <td contenteditable=true class=\'food-name\' id=\'food' + food.id + '\'>' + food.name + '</td>\n            <td contenteditable=true class=\'food-cal\' id=\'foodCal' + food.id + '\'>' + food.calories + '</td>\n           <td> <input title="checkbox" id="checkBox" type="checkbox"><label="checkbox"></label> </td>\n        </tr>\n        ');
	    });
	    fillArray();
	};

	function handleMealClick() {
	    var _this = this;

	    var checked = $("input:checked").get();
	    checked.forEach(function (box) {
	        var rowId = box.closest('tr').id;
	        var foodName = $('#' + rowId + '.food-row .food-name').text();
	        var foodCal = $('#' + rowId + '.food-row .food-cal').text();
	        (0, _meal_service.updateMealFood)(_this.id, box.closest('tr').id, foodName, foodCal);
	        addFoodToMeal(_this.id, rowId, foodName, foodCal);
	    });
	}

	var addFoodToMeal = exports.addFoodToMeal = function addFoodToMeal(mealId, rowId, foodName, foodCal) {
	    $('#meal' + mealId).last('td').append('\n        <tr class=\'meal-row\' id=' + mealId + '>\n            <td class=\'food-name\' id=\'meal' + rowId + '\'>' + foodName + '</td>\n            <td class=\'food-cal\' id=\'foodCal' + rowId + '\'>' + foodCal + '</td>\n            <td><button id = ' + rowId + ' class=\'food' + rowId + ' food-remove\'>Delete</button></td>\n        </tr>\n    ');
	    $("input:checked").removeAttr('checked');
	};

	function handleMealDelete() {
	    var mealId = this.closest('.meal-table').id.split('').pop();
	    var foodId = this.id;
	    (0, _meal_service.removeFoodAssociation)(mealId, foodId);
	    this.closest('.meal-row').remove();
	}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./styles.css", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./styles.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Montserrat);", ""]);

	// module
	exports.push([module.id, "h1 {\n  color: green;\n}\n\nbody {\n  font-family: 'Montserrat', sans-serif ;\n  margin: 30px;\n}\n.food-table, .meal-food-table {\n  border-collapse: collapse;\n  width: 40%;\n  margin-top: 10px;\n}\n\n.food-table td, .food-table th, .meal-food-table td, .meal-food-table th {\n  border: 1px solid #ddd;\n  border-right: none;\n  padding: 8px;\n}\n\n.food-table td:nth-child(3), .meal-table td:nth-child(3), .meal-food-table td:nth-child(3){\n  border: none; border-left: 1px solid #ddd\n}\n\n\n.food-table th, .meal-food-table th {\npadding-top: 8px;\npadding-bottom: 8px;\ntext-align: left;\nbackground-color: #6290C8\t;\ncolor: black;\n}\n\n.meal-table th {\npadding-top: 3px;\npadding-bottom: 3px;\ntext-align: left;\nbackground-color: #6290C8\t;\ncolor: black;\nfont-size: 3px;\n}\n\n.meal-table td, .meal-table th {\n  border: 1px solid #ddd;\n  padding: 8px;\n}\n\n.meal-table {\n  border-collapse: collapse;\n  margin-top: 10px;\n}\n\n\n.meal-table th, .meal-table td {\n  font-size: 14px;\n\n}\n\n#search-food, #search-meal-food {\n  margin-top: 20px;\n  height: 20px;\n  font-size: 16px\n}\n\n.name-input, .cal-input {\n  margin-bottom: 20px;\n  height: 20px;\n  font-size: 16px\n}\n\n.table-container {\n  display: flex;\n  flex-direction: column;\n}\n.meal-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n}\n\n.new-food {\n  height: 25px;\n  font-size: 14px;\n  margin-bottom: 30px;\n  box-shadow: 1px 1px 1px\n}\n\n.table-container {\n  border: 2px solid grey;\n  border-radius: 10px;\n  padding: 15px;\n  box-shadow: 1px 1px 1px;\n}\n", ""]);

	// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 9 */
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

	  var clicks = 1;
	  $('#meal-food-table').on('click', '#cals', function () {
	    console.log(clicks);
	    (0, _meal_view.sortCals)(clicks);
	    if (clicks > 2) {
	      clicks = 0;
	    }
	    clicks++;
	  });
	};

/***/ }),
/* 10 */
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
	    $('.food-table').on('blur', '.food-row .food-name', function () {
	        _food_view.handleFoodClick.call(this, 'name');
	    });
	    $('.food-table').on('blur', '.food-row .food-cal', function () {
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