import {putFood, delFood, createFood } from './food_service.js';


export const searchFoods = () => {
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

export function handleFoodDelete() {

  let foodRowId  = ''
  let result = ''

  if(this.closest('.food-row')){
    foodRowId = this.closest('.food-row').id
    delFood(foodRowId)
    this.closest('.food-row').remove()
  }
  else {
    foodRowId = this.parentNode.parentNode.className
    this.parentNode.parentNode.remove()
    delFood(foodRowId)
  }
}


 export function handleFoodClick(attribute) {
     let childId = ''
     let inputId = ''
     const foodRowId = this.closest('.food-row').id
     if(attribute === 'name'){
         childId = $(`#${foodRowId} .food-cal`).text()
         inputId = this.innerText
         putFood(inputId,childId, foodRowId)
     }
     else{
         childId = $(`#${foodRowId} .food-name`).text()
         inputId = this.innerText
         putFood(childId,inputId, foodRowId)
     }

 }

export const sortFood = (food) =>{
  const result =  food.sort((a,b)=>{
    if(a.id > b.id){
      return -1
      }
    else {
      return 1
      }
    })
  return result
}

export const fillTable = (food) => {
  food.forEach((food)=>{
     $('.food-table').append(`
     <tr class='food-row' id=${food.id}>
         <td contenteditable=true class='food-name' id='food${food.id}'>${food.name}</td>
         <td contenteditable=true class='food-cal' id='foodCal${food.id}'>${food.calories}</td>
         <td><button class='food${food.id} food-delete' type="button">Delete</button></td>
     </tr>
     `)
  })
}


export const validateForm = (event) => {
  event.preventDefault()
    $('.food-error').remove()
    const foodName = $('.name-input').val();
    const foodCal = $('.cal-input').val();
  if(foodName === "") {
    $('.food-form').append(
      `<div class = 'food-error'>Please enter a food name </div>`)
  }
  else if(foodCal === ""){
    $('.food-form').append(
    `<div class = 'food-error'>Please enter a calorie amount</div>`)
  }
  else
    createFood(foodName,foodCal)
}

export const addFoodRow= (food) => {
  $('.food-table tbody').append(`
    <tr class = '${food[0].id}'>
    <td contenteditable="true" class="food-name" id="food${food[0].name}">${food[0].name}</td>
    <td contenteditable="true" class="food-name" id="foodCal${food[0].calories}">${food[0].calories}</td>
    <td><button class="food${food[0].id} food-delete" type="button">Delete</button></td>
    </tr>`
  )
  $(`.food${food[0].id}`).on('click', function(){
    handleFoodDelete.call(this)
  })
}
