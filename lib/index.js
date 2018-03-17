import {getfood, sortFood,editFoodName, editFoodCal, fillTable, editFood, delFood, validateForm,createFood} from './foods.js';

// console.log(getfood)

$('.new-food').click(function () {
  window.location.href='http://localhost:8080/foods.html';
  return false;
});
