import {handleFoodDelete, delFood, getFood, sortFood} from './foods.js'
// import { debug } from 'util';

$(window).on('load', () => {
    getMeals()
    addSelected()
    getMealFood()
});

$('.add-selected').on('click', '.meal-button', function(){
    handleMealClick.call(this)
})

$('.calories-sort').on('click', function(){
     return caloriesSort.call(this)
})


$('.meal-container').on('click', '.meal-table .meal-row .food-remove', function(){
    handleMealDelete.call(this)
})


export function handleMealClick(){
    const checked = $("input:checked").get()
    checked.forEach((box)=>{
       const rowId = box.closest('tr').id
       const foodName = $(`#${rowId}.food-row .food-name`).text()
       const foodCal = $(`#${rowId}.food-row .food-cal`).text()
       updateMealFood(this.id, box.closest('tr').id, foodName, foodCal);
       addFoodtoMeal(this.id,rowId, foodName,foodCal)
       getOneMeal()
    //    get single meal from fetch
    })
    
}

export const getOneMeal = () => {
    fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/meals')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
           const meals =  Object.keys(myJson).map((thing) =>  myJson[thing])
        });
        
}

export const addFoodtoMeal = (mealId,rowId, foodName, foodCal) => {
    $(`#meal${mealId}`).last('td').append(`
        <tr class='meal-row' id=${mealId}>
            <td class='food-name' id='meal${rowId}'>${foodName}</td>
            <td class='food-cal' id='foodCal${rowId}'>${foodCal}</td>
            <td><button id = ${rowId} class='food${rowId} food-remove'>Delete</button></td>
        </tr>
    `)
    $("input:checked").removeAttr('checked')
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
    const mealId = this.closest('.meal-row').id
    const foodId = this.id
    removeFoodAssociation(mealId, foodId)
    this.closest('.meal-row').remove()
}

export const removeFoodAssociation = (mealId,foodId) => {
        fetch(`https://radiant-mesa-11168.herokuapp.com/api/v1/meals/${mealId}/foods/${foodId}`,{
        method: 'Delete'
    })
    .then(response =>  console.log(response))
    .catch((error) => console.error(error))

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
      if( remaining < 0){
          return remaining
        }
        else
        colorRed(meals)
    return   remaining
}


const fillMeals = (meals) =>{
    const totalCals = []
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
    const fillTotals = () => {
        const totalCalories = totalCals.reduce((a, b) => a + b, 0)
        $('.goal-calories').append(`<td>2000</td>`);
        $('.calories-consumed').append(`<td>${totalCalories}</td>`);
        $('.calories-remaining').append(`<td>${2000 - totalCalories}</td>`)
    }
    fillTotals()
}

export const totals = (meal) => {
       $(`.meal-container`).append(`
         <h4 class='total-calories'>Total Calories : ${getCalories(meal)}</h4>
         <h4 class = 'remaining-calories' id='remaining${meal.id}'>Remaining Calories : ${remainingCalories(meal, getCalories(meal))}</h4>
        `)
}

export const getCalories = (meal) => {
    if(meal.foods.length > 0){
      return meal.foods.reduce((acc,food) =>{
            return acc += food.calories},0)
    }
    else
    return 0
}


const colorRed = (meal) => {
    console.log(meal)
     $(`.meal-table`).children(`.remaining-calories#remaining${meal.id}`).css('color','red')
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
