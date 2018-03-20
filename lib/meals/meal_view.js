import {updateMealFood, removeFoodAssociation} from './meal_service.js'

export function clearCheckBoxes() {
  $('input:checkbox').prop('checked', false);
}

export function calcCals(){
   const meals =  $('.meal-table').get()
   const totalTableCals = []
    const totals =  meals.forEach((meal)=>{
        let totes = 0
        let rows = $(meal).children('tr').children('td:nth-child(2)').get()
        let arr = []
        for(var i = 0; i < rows.length; i++ ){
            const cals = parseInt(rows[i].innerText)
            arr.push(cals)
        }
        if(arr.length > 0){
            totes = arr.reduce((acc,cals) => {
                acc += cals
                return acc
            })
        }
        else {
          totes = 0
        }
        totalTableCals.push(totes);
        $(`#totalCals${meal.id}`).html(`Total Calories : ${totes}`)
        $(`#remaining${meal.id}`).html(`Remaining Calories: ${remainingCalories(meal, totes)}</h4>`);
        if(remainingCalories(meal, totes) < 0) {
          document.getElementById(`remaining${meal.id}`).style.color = "red"
        }
        else {
          document.getElementById(`remaining${meal.id}`).style.color = "green"
        }
    })
    const updateTotalTable = () => {
        const totalTableCalories = () => { return totalTableCals.reduce((a, b) => a + b, 0) }
        const remainingTableCals = (2000-totalTableCalories());
        $('.cals-consumed').html(`${totalTableCalories()}`);
        $('.remaining-cals').html(`${remainingTableCals}`)
        if(remainingTableCals < 0) {
          document.getElementById('calories-remaining').style.color = "red"
        }
        else {
          document.getElementById('calories-remaining').style.color = "green"
        }
    }
    updateTotalTable();
}

export const remainingCalories = (meals,total) => {
    if(meals.id === 1|| meals.id === 'meal1'){
        return calorieAdder(meals,400,total)
    }
    else if(meals.id === 2|| meals.id === 'meal2'){
        return calorieAdder(meals,200,total)
    }
    else if(meals.id === 3|| meals.id === 'meal3'){
        return calorieAdder(meals,600,total)
    }
    else if(meals.id === 4|| meals.id === 'meal4'){
        return  calorieAdder(meals,800,total)
    }
    else
    {return 0}
}

const calorieAdder = (meals,goal,total)=> {
    const remaining = goal - total
    return   remaining
}

const totalCals = []

export const fillMeals = (meals) =>{
    meals.forEach((meal)=>{
        $('.meal-container').append(`
        <table class='meal-table' id='meal${meal.id}'>
        <h2>${meal.name}</h2>
        <trid ='header${meal.id}'></tr>
        <tr>
            <th>Name</th>
            <th>Calories</th>
        </tr>
        </table>
        `)
        meal.foods.forEach((food) => {
            $(`#meal${meal.id}`).append(`
            <tr class='meal-row' id=${meal.id}>
                <td class='food-name' id='meal${food.id}'>${food.name}</td>
                <td class='food-cal' id='foodCal${food.id}'>${food.calories}</td>
                <td><button id = ${food.id} class='food${food.id} food-remove'>Delete</button></td>
            </tr>
            `)
        })
        totalCals.push(getCalories(meal));
        totals(meal)
      })
    fillTotalsTable()
}

const fillTotalsTable = () => {
  const totalCalories = () => { return totalCals.reduce((a, b) => a + b, 0) }
  const calsRemainingCalc = (2000 - totalCalories())
  $('.cals-consumed').html(`<td>${totalCalories()}</td>`);
  $('.remaining-cals').html(`<td>${calsRemainingCalc}</td>`)
  if(calsRemainingCalc < 0) {
    document.getElementById('calories-remaining').style.color = "red"
  }
  else {
    document.getElementById('calories-remaining').style.color = "green"
  }
}

export const totals = (meal) => {
   $(`.meal-container`).append(`
     <h4 class='total-calories' id ='totalCalsmeal${meal.id}'>Total Calories : ${getCalories(meal)}</h4>
     <h4 class = 'remaining-calories' id='remainingmeal${meal.id}'>Remaining Calories : ${remainingCalories(meal, getCalories(meal))}</h4>
    `);
    changeColor(meal)
}

export const changeColor = (meal) => {
  if(remainingCalories(meal, getCalories(meal)) < 0) {
    document.getElementById(`remainingmeal${meal.id}`).style.color = "red"
  }
  else {
    document.getElementById(`remainingmeal${meal.id}`).style.color = "green"
  }
}

export const getCalories = (meal) => {
    if(meal.foods.length > 0){
      return meal.foods.reduce((acc,food) =>{
            return acc += food.calories},0)
    }
    else
    return 0
}

export const showMeals= (meals)=>{
    meals.forEach((meal)=>{$('.add-selected').append(`
    <button class= 'meal-button' id=${meal.id}>${meal.name}</button>
    `)
})
}

export const searchMealFoods = () => {
  let input, filter, table, tr, td, i;
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

export const sortCals = () => {
  let table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("meal-food-table");
  switching = true;

  while (switching) {
    switching = false;
    rows = table.getElementsByTagName("tr");
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[1];
      y = rows[i + 1].getElementsByTagName("td")[1];
      if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
        shouldSwitch= true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

export const MealFoodTable = (food) => {
    food.forEach((food)=>{
        $('.meal-food-table').append(`
        <tr class='food-row' id=${food.id}>
            <td contenteditable=true class='food-name' id='food${food.id}'>${food.name}</td>
            <td contenteditable=true class='food-cal' id='foodCal${food.id}'>${food.calories}</td>
           <td> <input id="checkBox" type="checkbox"> </td>
        </tr>
        `)
    })
}

export function handleMealClick() {
    const checked = $("input:checked").get()
    checked.forEach((box)=>{
       const rowId = box.closest('tr').id
       const foodName = $(`#${rowId}.food-row .food-name`).text()
       const foodCal = $(`#${rowId}.food-row .food-cal`).text()
       updateMealFood(this.id, box.closest('tr').id, foodName, foodCal);
       addFoodToMeal(this.id,rowId, foodName,foodCal)
    })
}

export const addFoodToMeal = (mealId,rowId, foodName, foodCal) => {
    $(`#meal${mealId}`).last('td').append(`
        <tr class='meal-row' id=${mealId}>
            <td class='food-name' id='meal${rowId}'>${foodName}</td>
            <td class='food-cal' id='foodCal${rowId}'>${foodCal}</td>
            <td><button id = ${rowId} class='food${rowId} food-remove'>Delete</button></td>
        </tr>
    `)
    $("input:checked").removeAttr('checked')
}

export function handleMealDelete() {
    const mealId = this.closest('.meal-row').id
    const foodId = this.id
    removeFoodAssociation(mealId, foodId)
    this.closest('.meal-row').remove()
}
