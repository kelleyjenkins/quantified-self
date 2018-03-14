$( document ).ready(function() {
    const getfood = () => {$('.food').on('click', (e) => {
        fetch('https://radiant-mesa-11168.herokuapp.com/api/v1/foods')
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
               const food =  Object.keys(myJson).map((thing) =>  myJson[thing])
               fillTable(food)
            });
        });
    }
    getfood()

    const fillTable = (food) => {
        food.forEach((food)=>{
           let name = document.createElement('td')
           $('.rows').append(name)
           name.append(food.name)
        })
        console.log(food)
    }

});