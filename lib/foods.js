export const getfood = () => {
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

export const sortFood = (food) =>{
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

export const fillTable = (food) => {
    food.forEach((food)=>{
       let row = document.createElement('tr')
       let name = document.createElement('td')
       let cal = document.createElement('td')
       let del = document.createElement('button')
       del.className = `food${food.id}`
       cal.className = `foodCal${food.id}`
       name.className = `foodName${food.id}`
       del.innerHTML = 'delete'
       $('.food-table').append(row)
       row.append(name)
       name.append(food.name)
       row.append(cal)
       cal.append(food.calories)
       row.append(del);
       delFood(food)
       editFood(food)
    })
}
export const editFoodName = (food) => {
    $(`.foodName${food.id}`).on('click', (e) => {
    const foodVal = event.target.innerText;
    $(`.foodName${food.id}`).replaceWith(`<input value = ${foodVal} />`)
    });
}

export const editFoodCal = (food) => {
    $(`.foodCal${food.id}`).on('click', (e) => {
        const foodCal = event.target.innerText;
        $(`.foodCal${food.id}`).replaceWith(`<input value = ${foodCal} />`);
        // e.stopPropagation
        // debugger
        // if(e.target !== this){
        //     debugger;
        // console.log('clickeroni')
        // }
    });
}

export const editFood = (food) => {

    editFoodName(food)
    editFoodCal(food)
    

   //   var $input = $('<input/>').val($(this).text() );
   //   $el.replaceWith( $input );
//    $(`.foodCal${food.id}`).replaceWith('<input/>')

    // fetch(`https://radiant-mesa-11168.herokuapp.com/api/v1/foods/${food.id}`,{
    //     method: 'Put'
    // })
    // .then(response =>  location.reload())
}



export const delFood = (food) => {$(`.food${food.id}`).on('click', (e) => {
    e.preventDefault()
    fetch(`https://radiant-mesa-11168.herokuapp.com/api/v1/foods/${food.id}`,{
        method: 'DELETE'
    })
    .then(response =>  location.reload());
    });
}

export const validateForm = (event) => {
  event.preventDefault()

    const foodName = $('.name-input').val();
    const foodCal = $('.cal-input').val();
    if(foodName === "") {
      $('.food-form').append(
        `<div>Please enter a food name </div>`)
    }
    else if(foodCal === ""){
      $('.food-form').append(
        `<div>Please enter a calorie amount</div>`)
    }
    else
      createFood(foodName,foodCal)
}

export const createFood = (foodName, cal, event) => {

    const food  = {name: foodName,
                   calories: cal}

    fetch(`https://radiant-mesa-11168.herokuapp.com/api/v1/foods`,{
        headers: {'Accept': 'application/json',
                  'Content-Type':'application/json'},
        method: 'post',
        body: JSON.stringify(food)
    })
    .then(response => (response))
    .then(response =>  location.reload())
};

$('.food-button').click(validateForm)

getfood()
