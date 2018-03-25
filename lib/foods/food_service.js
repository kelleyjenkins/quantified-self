import {sortFood, fillTable, addFoodRow} from './food_view.js'

export const putFood = (foodName, foodCal, foodId) => {
    const body = JSON.stringify({
        name: foodName,
        calories: foodCal
    })
        fetch(`https://salty-escarpment-41029.herokuapp.com/api/foods/${foodId}`,{
        method: 'put',
        headers:{'Content-Type': 'application/json'},
        body: body
    })
    .then(response =>  location.reload())
}

export const getFood = () => {
    fetch('https://salty-escarpment-41029.herokuapp.com/api/foods', {'Access-Control-Allow-Origin':'*'} )
        .then(function(response) {
            return response.json()
        })
        .then(function(myJson) {
           const foods =  Object.keys(myJson).map((thing) =>  myJson[thing])
            const sorted = sortFood(foods)
            fillTable(sorted)
        });
}

export const delFood = (id) => {
    fetch(`https://salty-escarpment-41029.herokuapp.com/api/foods/${id}`,{
        method: 'DELETE'
    })
    .then(response => handleResponse(response))
    .catch(response =>  console.error(response))
};


export const createFood = (foodName, cal, event) => {
    const food  = {name: foodName,
                   calories: cal}
    fetch(`https://salty-escarpment-41029.herokuapp.com/api/foods`,{
        headers: {'Accept': 'application/json',
                  'Content-Type':'application/json'},
        method: 'post',
        body: JSON.stringify(food)
    })
    .then(function(response) {
        return response.json();
    })
    .then(response => {
        let food = Object.keys(response).map((thing) =>  response[thing])
        addFoodRow(food)})
    .catch(error => console.error(error))
};

function handleResponse(response){
    if(!response.ok){
        alert('sorry that foods belongs to a meal')
        location.reload()
    }
    else
    return response
}
