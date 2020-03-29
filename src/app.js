// TODO: Build an awesome garage!

//1. Add event listener to form, preventDefault
//2. Grab inputs from the form: brand, model, plate, owner
//3. Build a car JS object with the info --> newCar = {}
//4. Update the HTML with the car
//5. Send it to the Api DB --> POST request
//6. Fetch all the cars from the Api --> Get request

const GARAGE = "CARS";
const carsList = document.querySelector('.cars-list');
const form = document.querySelector("#new-car");
const button = document.querySelector("#button");

// Fetch all cars from your garage - GET
const fetchAllCars = () => {
  fetch(`https://wagon-garage-api.herokuapp.com/${GARAGE}/cars`)
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    carsList.innerHTML = "";
    // if (data !== undefined || data.length != 0) {
    //    console.log("its empty");
        data.forEach((car) => {
        // if () {}
        // carsList.innerHTML = ""
        addCar(car);
      });
    // };
  });
};

// Build the car object
const createNewCar = (form) => {
  const newCar = {};
  newCar.brand = form.querySelector('#brand').value;
  newCar.model = form.querySelector('#model').value;
  newCar.plate = form.querySelector('#plate').value;
  newCar.owner = form.querySelector('#owner').value;
  return newCar;
};

// Send a POST ajax request to send car to the API database.
const sendNewCar = (car) => {
  fetch(`https://wagon-garage-api.herokuapp.com/${GARAGE}/cars`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(car)
  })
  .then(response => response.json())
  .then((data) => {
    addCar(data); // Update html with the car posted to the api
  });
}

// Update HTML with the car information
const addCar = (car) => {
  const carCard = `<div class="car">
    <div class="car-image">
      <img src="http://loremflickr.com/300/300/${car.brand}%20${car.model}" />
    </div>
    <div class="car-info">
      <h4>${car.brand} - ${car.model}</h4>
      <p><strong>Owner:</strong> ${car.owner}</p>
      <p><strong>Plate:</strong> ${car.plate}</p>
    </div>
  </div>`;
  carsList.insertAdjacentHTML('beforeend', carCard);
};

// Event Listener, call all the functions
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // console.log(event);
  const newCar = createNewCar(event.currentTarget); // obj is created
          form.reset();

  sendNewCar(newCar); // post it to the api --> update html
  // fetchAllCars();
});


// button.addEventListener('click', fetchAllCars);

setInterval(fetchAllCars, 2000) //1second is 1000 milliseconds























