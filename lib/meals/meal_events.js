import {getMeals, getMealFood, addSelected} from './meal_service.js';

import {calcCals, searchMealFoods, changeColor, clearCheckBoxes, sortCals, handleMealDelete, handleMealClick} from './meal_view.js'

export const eventListener = () => {
  $(window).on('load', () => {
      getMeals()
      addSelected()
      getMealFood()
  });

  $('.new-food').click(function () {
    window.location.href='https://kelleyjenkins.github.io/quantified-self/foods.html';
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

  let clicks = 1
  $('#meal-food-table').on('click','#cals', function() {
    console.log(clicks)
    sortCals(clicks)
    if(clicks > 2){
      clicks = 0
    }
    clicks ++
  })
}
