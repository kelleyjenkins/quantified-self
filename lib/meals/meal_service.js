import {handleFoodDelete, delFood, getFood} from '../foods/food_service.js'
import {sortFood} from '../foods/food_view.js'
import {fillMeals, MealFoodTable, showMeals} from './meal_view.js'


export function updateMealFood(mealId,foodId, foodName, foodCal){
    const body = JSON.stringify({
        name: foodName,
        calories: foodCal
    })
        fetch(`https://salty-escarpment-41029.herokuapp.com/api/meals/${mealId}/foods/${foodId}`,{
        method: 'post',
        headers:{'Content-Type': 'application/json'},
        body: body
    })
    .then(response =>  console.log(response))
    .catch((error) => console.error(error))
}

export const removeFoodAssociation = (mealId,foodId) => {
        fetch(`https://salty-escarpment-41029.herokuapp.com/api/meals/${mealId}/foods/${foodId}`,{
        method: 'Delete'
    })
    .then(response =>  console.log(response))
    .catch((error) => console.error(error))
}

export const getMeals = () => {
    fetch(`https://salty-escarpment-41029.herokuapp.com/api/meals`)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
           const meals =  Object.keys(myJson).map((thing) =>  myJson[thing])
            fillMeals(meals)
        });
}

export const getMealFood = () => {
    fetch(`https://salty-escarpment-41029.herokuapp.com/api/foods`)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            const foods =  Object.keys(myJson).map((thing) =>  myJson[thing])
            const sorted = sortFood(foods)
            MealFoodTable(sorted)
        });
}

export const addSelected = (meals) => {
    fetch('https://salty-escarpment-41029.herokuapp.com/api/meals')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
       const meals =  Object.keys(myJson).map((thing) =>  myJson[thing])
       showMeals(meals)
    });
    $("input:checked")
}
