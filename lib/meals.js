import {handleFoodDelete, delFood} from './foods.js'

$(window).on('load', () => {
    getMeals()
});

$('.meal-container').on('click', '.meal-table .meal-row .food-delete', function(){
    handleMealDelete.call(this)
})

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

const fillMeals = (meals) =>{
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
            console.log(food)
            $(`#meal${meal.id}`).append(`
            <tr class='meal-row' id=${meal.id}>
                <td class='food-name' id='meal${food.id}'>${food.name}</td>
                <td class='food-cal' id='foodCal${food.id}'>${food.calories}</td>
                <td><button id = ${food.id} class='food${food.id} food-delete'>Delete</button></td>
            </tr>
            `)
        })
        $(`#meal${meal.id}`).append(`
        <h4 class='total-calories'>Total Calories :${getCalories(meal)}</h4>
        `)
    })
}

export const getCalories = (meal) => {
    if(meal.foods.length > 0){
      return meal.foods.reduce((acc,food) =>{
            return acc += food.calories},0)
    }
    else 
    return 0

}