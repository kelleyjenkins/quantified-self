$( document ).ready(function() {
    const getfood = () => { //$('.food').on('click', (e) => {
        fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/foods')
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
               const food =  Object.keys(myJson).map((thing) =>  myJson[thing])
               fillTable(food)
            });
        // });
    }

    getfood()

    const fillTable = (food) => {
        food.forEach((food)=>{
           let row = document.createElement('tr')
           let name = document.createElement('td')
           let cal = document.createElement('td')
           let del = document.createElement('button')
           del.className = `food${food.id}`
           del.innerHTML = 'x'
           $('.food-table').append(row)
           row.append(name)
           name.append(food.name)
           row.append(cal)
           cal.append(food.calories)
           row.append(del);
           delFood(food)
           
        })
    }

    const delFood = (food) => {$(`.food${food.id}`).on('click', (e) => {
        e.preventDefault()
        fetch(`https://radiant-mesa-11168.herokuapp.com/api/v1/foods/${food.id}`,{
            method: 'DELETE'
        })
        .then(response =>  location.reload());
        });
    }

    

});