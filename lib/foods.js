
$('.food-rows').on('blur', '.food-row .food-name', function(){
    handleFoodClick.call(this,'name')
})
$('.food-rows').on('blur', '.food-row .food-cal', function(){
    handleFoodClick.call(this,'cal')
})

$('.food-rows').on('click', '.food-row .food-delete', function(){
    handleFoodDelete.call(this)
})

function handleFoodDelete() {
    const foodRowId = this.closest('.food-row').id
    delFood(foodRowId)
    this.closest('.food-row').remove()
}

function handleFoodClick(attribute) {
    console.log(this);
    let childId = ''
    let inputId = ''
    const foodRowId = this.closest('.food-row').id

    if(attribute === 'name'){
        childId = $(`#${foodRowId} .food-cal`).text()
        inputId = this.innerText
        putFood(inputId,childId, foodRowId)
    }
    else{
        childId = $(`#${foodRowId} .food-name`).text()
        inputId = this.innerText
        putFood(childId,inputId, foodRowId)
    }

}
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

export const getfood = () => {
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
        $('.food-rows').append(`
        <tr class='food-row' id=${food.id}>
            <td contenteditable=true class='food-name' id='food${food.id}'>${food.name}</td>
            <td contenteditable=true class='food-cal' id='foodCal${food.id}'>${food.calories}</td>
            <td><button class='food${food.id} food-delete'>Delete</button></td>
        </tr>
        `)

    })
}

// export const editFoodName = (food) => {
//     let foodNameInput = `.foodName${food.id}`
//     const foodId = food.id
//      const changeIt  = $(foodNameInput).on('click',(event) => {
//         const foodName = event.target.innerText;
//         const foodinput = `<input value = ${foodName} class= 'foodinput'/>`
//         $(foodNameInput).replaceWith(foodinput)
//         const out = $(document).change((event) => {
//         return $('.foodinput').val()
//         });
//     });

// ?}

// // export const editFoodCal = (food) => {
// //     $(`.foodCal${food.id}`).on('click', (e) => {
// //         const foodCal = event.target.innerText;
// //         let foodinput = `<input value = ${foodCal} class= 'foodinput'/>`
// //         $(`.foodCal${food.id}`).replaceWith(foodinput)
// //         $(document).change((event,food) => {
// //            $('.foodinput').val()
// //         });
// //     });
// // }

// export const editFood = (food) => {

//     const foodName = editFoodName(food)
//     const foodCal = editFoodCal(food)
//     // console.log(foodCal)
//     // editFoodCal(food)
//     // debugger;
//     // fetch(`https://radiant-mesa-11168.herokuapp.com/api/v1/foods/${food.id}`,{
//     //     method: 'Put',
//     //     headers:{'Content-Type': 'application/json'},
//     //     body:{}
//     // })
//     // .then(response =>  location.reload())
// }

// // export const removeFood(row){}

export const delFood = (id) => {
    // debugger;
    fetch(`https://radiant-mesa-11168.herokuapp.com/api/v1/foods/${id}`,{
        method: 'DELETE'
    })
    .then(response =>  response.json)
    .catch(response =>  console.error(response));
    
    };


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
