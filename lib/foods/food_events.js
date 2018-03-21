import {getFood, editFoodName, editFoodCal, editFood, delFood, createFood} from './food_service.js';

import {searchFoods,handleFoodClick, handleFoodDelete, sortFood, validateForm} from './food_view.js'

export const foodEventListener = () => {

  $(window).on('load', () => {
      getFood()
  })
  $('.food-table').on('blur', '.food-row .food-name', function(){
      handleFoodClick.call(this,'name')
  })
  $('.food-table').on('blur', '.food-row .food-cal', function(){
      handleFoodClick.call(this,'cal')
  })

  $('.food-table').on('click', '.food-row .food-delete', function(){
      handleFoodDelete.call(this)
  })
  
  $('.food-button').click(()=> validateForm(event))

  $('#search-food').on('keyup', function() {
    searchFoods()
  });
}
