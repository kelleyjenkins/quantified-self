import {getMeals, fillMeals,calorieAdder, remainingCalories, handleMealDelete, changeColor, searchFoods} from './meals.js';
import {getFood, handleFoodClick,handleFoodDelete, sortFood,editFoodName, editFoodCal, fillTable, editFood, delFood, validateForm,createFood} from './foods.js';



$('.new-food').click(function () {
  window.location.href='http://localhost:8080/foods.html';
  return false;
});
