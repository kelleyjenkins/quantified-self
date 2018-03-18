$(window).on('load', () => {
    getfood()
})

$('.food-rows').on('blur', '.food-row .food-name', function(){
    handleFoodClick.call(this,'name')
})

$('.food-rows').on('blur', '.food-row .food-cal', function(){
    handleFoodClick.call(this,'cal')
})

$('.food-table').on('click','.food-row .food-delete', function(){
    handleFoodDelete.call(this)
})

$('.food-button').click(()=> validateForm(event))

$('#search-food').on('keyup', function() {
  var input, filter, table, tr, td, i;
   input = document.getElementById("search-food");
   filter = input.value.toUpperCase();
   table = document.getElementById('food-table');
   tr = table.getElementsByTagName("tr");

  for (i = 1; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
       if (td) {
         if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
           tr[i].style.display = "";
         } else {
           tr[i].style.display = "none";
         }
       }
     }
 });

function handleFoodDelete() {
    const foodRowId = this.closest('.food-row').id
    delFood(foodRowId)
    this.closest('.food-row').remove()
}

function handleFoodClick(attribute) {
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
        $('.food-table').append(`
        <tr class='food-row' id=${food.id}>
            <td contenteditable=true class='food-name' id='food${food.id}'>${food.name}</td>
            <td contenteditable=true class='food-cal' id='foodCal${food.id}'>${food.calories}</td>
            <td><button class='food${food.id} food-delete'>Delete</button></td>
        </tr>`)
    })
}

export const delFood = (id) => {
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
    console.log('name',foodName,'cal',foodCal)
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
    .then(response =>  location.reload())
    .catch(error => console.error(error))
};
