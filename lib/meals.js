import {handleFoodDelete, delFood, getFood, sortFood} from './foods.js'

$('.add-selected').on('click', '.meal-button', function(){
    handleMealClick.call(this)
})


$(window).on('load', () => {
    getMeals()
    addSelected()
    getMealFood()
});

$('.meal-container').on('click', '.meal-table .meal-row .food-delete', function(){
    handleMealDelete.call(this)
})

$('#search-meal-food').on('keyup', function() {
  searchFoods() })

$('#cals').on('click', function() {
  sortCals()
});

export function handleMealClick() {
    const checked = $("input:checked").get()

    checked.forEach((box)=>{
       const rowId = box.closest('tr').id
       const foodName = $(`#${rowId}.food-row .food-name`).text()
       const foodCal = $(`#${rowId}.food-row .food-cal`).text()
       updateMealFood( this.id, box.closest('tr').id, foodName, foodCal)
    })
}

export function updateMealFood(mealId,foodId, foodName, foodCal){
    const body = JSON.stringify({
        name: foodName,
        calories: foodCal
    })
        fetch(`https://radiant-mesa-11168.herokuapp.com/api/v1/meals/${mealId}/foods/${foodId}`,{
        method: 'post',
        headers:{'Content-Type': 'application/json'},
        body: body
    })
    .then(response =>  console.log(response))
    .catch((error) => console.error(error))
}

export function handleMealDelete() {
    const foodId = event.target.id
    console.log(foodId.to_s)
    delFood(foodId)
    this.closest('.meal-row').remove()
}

export const getMeals = () => {
    fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/meals')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
           const meals =  Object.keys(myJson).map((thing) =>  myJson[thing])
            fillMeals(meals)
        });

}

const remainingCalories = (meals,total) => {
    let meal = meals.name.toLowerCase()

    if(meal === 'breakfast'){
        return calorieAdder(meals,400,total)
    }
    else if(meal === 'lunch'){
        return calorieAdder(meals,600,total)
    }
    else if(meal === 'dinner'){
        return calorieAdder(meals,800,total)
    }
    else if(meal === 'snack'){
        return  calorieAdder(meals,200,total)
    }
    else
    {return 0}
}

const calorieAdder = (meals,goal,total)=> {
    const remaining = goal - total
    return   remaining
}


const fillMeals = (meals) =>{
  const totalCals = []
    meals.forEach((meal)=>{
        $('.meal-container').append(`
        <table class='meal-table' id='meal${meal.id}'>
        <h2>${meal.name}</h2>
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
                <td><button id = ${food.id} class='food${food.id} food-delete'>Delete</button></td>
            </tr>
            `)
        })
        totalCals.push(getCalories(meal));
        totals(meal)
    })
    const fillTotals = () => {
      const totalCalories = () => { return totalCals.reduce((a, b) => a + b, 0) }
      const calsRemainingCalc = (2000 - totalCalories())
        $('.goal-calories').append(`<td>2000</td>`);
        $('.calories-consumed').append(`<td>${totalCalories()}</td>`);
        $('.calories-remaining').append(`<td>${calsRemainingCalc}</td>`)
        if(calsRemainingCalc < 0) {
          document.getElementById('calories-remaining').style.color = "red"
        }
        else {
          document.getElementById('calories-remaining').style.color = "green"
        }
    }
    fillTotals()
}

export const totals = (meal) => {
       $(`#meal${meal.id}`).append(`
         <h4 class='total-calories'>Total Calories : ${getCalories(meal)}</h4>
         <h4 class = 'remaining-calories' id='remaining${meal.id}'>Remaining Calories : ${remainingCalories(meal, getCalories(meal))}</h4>
        `);
        changeColor(meal)
}

export const changeColor = (meal) => {
  if(remainingCalories(meal, getCalories(meal)) < 0) {
    document.getElementById(`remaining${meal.id}`).style.color = "red"
  }
  else {
    document.getElementById(`remaining${meal.id}`).style.color = "green"
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

export const getMealFood = () => {
    fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/foods')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            const foods =  Object.keys(myJson).map((thing) =>  myJson[thing])
            const sorted = sortFood(foods)
            MealFoodTable(sorted)
        });
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


export const addSelected = (meals) => {
    fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/meals')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
       const meals =  Object.keys(myJson).map((thing) =>  myJson[thing])
       showMeals(meals)
    });
    $("input:checked")
}

export const showMeals= (meals)=>{
    meals.forEach((meal)=>{$('.add-selected').append(`
    <button class= 'meal-button' id=${meal.id}>${meal.name}</button>
    `)
})
}

export const searchFoods = () => {
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
