$( document ).ready(function() {
    const getfood = () => {
        fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/foods')
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
               const foods =  Object.keys(myJson).map((thing) =>  myJson[thing])
               sortFood(foods)
               fillTable(foods)
            });
    }

    getfood()

    sortFood = (food) =>{
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

    createFood = () => {
        const $foodName = $('.name-input').val();
        const $foodCal = $('.cal-input').val();
        const food  = {name: $foodName,
                       calories: $foodCal}
        
        fetch(`https://radiant-mesa-11168.herokuapp.com/api/v1/foods`,{
            headers: {'Accept': 'application/json',
                      'Content-Type':'application/json'},
            method: 'post',
            body: JSON.stringify({name: $foodName,
                                  calories: $foodCal})
        })
        // .then(response =>  console.log(response))
        .catch(response =>  console.log(response));
        
        };    
});