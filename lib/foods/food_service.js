import {sortFood, fillTable} from './food_view.js'

export const putFood = (foodName, foodCal, foodId) => {
    const body = JSON.stringify({
        name: foodName,
        calories: foodCal
    })
        fetch(`https://radiant-mesa-11168.herokuapp.com/api/v1/foods/${foodId}`,{
        method: 'put',
        headers:{'Content-Type': 'application/json'},
        body: body
    })
    .then(response =>  location.reload())
}

export const getFood = () => {
    fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/foods')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
           const foods =  Object.keys(myJson).map((thing) =>  myJson[thing])
            const sorted = sortFood(foods)
            fillTable(sorted)
        });
}

export const delFood = (id) => {
    fetch(`https://radiant-mesa-11168.herokuapp.com/api/v1/foods/${id}`,{
        method: 'DELETE'
    })
    .then(response =>  response.json)
    .catch(response =>  console.error(response))
    };


export const createFood = (foodName, cal, event) => {
    const food  = {name: foodName,
                   calories: cal}

    fetch(`https://radiant-mesa-11168.herokuapp.com/api/v1/foods`,{
        headers: {'Accept': 'application/json',
                  'Content-Type':'application/json'},
        method: 'post',
        body: JSON.stringify(food)
    })
    .then(response =>  location.reload())
    .catch(error => console.error(error))
};
