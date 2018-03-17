$(window).on('load', () => {
    getMeals()
});

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
                <td contenteditable=true class='food-name' id='meal${food.id}'>${food.name}</td>
                <td contenteditable=true class='food-cal' id='foodCal${food.id}'>${food.calories}</td>
                <td><button class='food${food.id} food-delete'>Delete</button></td>
            </tr>
            `)
        })
    })
}