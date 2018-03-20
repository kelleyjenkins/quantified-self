import {getMeals, addSelected, getMealFood, calcCals, clearCheckBoxes, sortCals, handleMealDelete, handleMealClick, searchMealFoods, changeColor} from './meals.js';

export const eventListener = () => {
  $(window).on('load', () => {
      getMeals()
      addSelected()
      getMealFood()
  });

  $('.new-food').click(function () {
    window.location.href='http://localhost:8080/foods.html';
    return false;
  });


  $('.add-selected').on('click', '.meal-button', function(){
      handleMealClick.call(this)
      calcCals()
      clearCheckBoxes()
  })

  $('.meal-container').on('click', '.meal-table .meal-row .food-remove', function(){
      handleMealDelete.call(this)
      calcCals()
  })

  $('#search-meal-food').on('keyup', function() {
    searchMealFoods()
  })

  $('#cals').on('click', function() {
    sortCals()
  })
}
