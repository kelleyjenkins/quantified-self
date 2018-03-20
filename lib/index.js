import {getMeals, addSelected, getMealFood} from './meals/meal_service.js';

import {clearCheckBoxes, calcCals, remainingCalories, fillMeals, totals, changeColor, getCalories, showMeals, searchMealFoods, sortCals, MealFoodTable, handleMealClick, addFoodtoMeal, handleMealDelete} from './meals/meal_view.js'

import {getFood, editFoodName, editFoodCal, editFood, delFood, createFood } from './foods/food_service.js';

import {searchFoods, handleFoodClick, handleFoodDelete, sortFood, fillTable, validateForm} from './foods/food_view.js'

import {eventListener} from './meals/meal_events.js'
import {foodEventListener} from './foods/food_events.js'

eventListener();
foodEventListener();
