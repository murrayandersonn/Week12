$(document).ready(function () {
    const API_URL = 'http://localhost:3000/Cars/';
    
    //get method to pull cars from api
    function getCars() {
        $.ajax({
            url: API_URL,
            method: 'GET',
            success: function (cars) {
                displayCars(cars);
                console.log("cars" ,cars)
            },
            error: function (xhr, status, error) {
                console.log(error);
            }
        });
    }
    
    //function for displaying listings
    function displayCars(cars) {
        console.log("displayCars ran", cars)
        const awdContainer = $('#4wd');
        const fwdContainer = $('#fwd');
        const rwdContainer = $('#rwd');
      
        //empties all containers
        awdContainer.empty();
        fwdContainer.empty();
        rwdContainer.empty();

        

        //card builder for 4WD
        cars.forEach(car => {
            if (car.drivetrain === '4WD') {
                console.log(car)
                const carCard = `
                    <div class="col-md-4 menu-item">
                        <div class="card">
                            <img src="${car.image}" class="card-img-top" alt="${car.make} ${car.model}" />
                            <div class="card-body">
                                <h5 class="card-title">${car.year} ${car.make} ${car.model}</h5>
                                <p class="card-text">This ${car.year} ${car.model} has ${car.miles} miles. It is ${car.drivetrain} with a  ${car.engine} paired with a ${car.transmission}.</p>
                                <p class="card-text"><small>Listing price is ${car.price}</small></p>
                                <button class="btn btn-danger delete-btn" data-id="${car.id}">Remove Listing</button> <button class="btn btn-secondary edit-button" data-id="${car.id}">Edit Listing</button>
                            </div>
                        </div>
                    </div>
                `;
                awdContainer.append(carCard);
            
            }
            
            
            
        });

        //card builder for FWD
        cars.forEach(car => {
            if (car.drivetrain === 'FWD') {
                console.log(car)
                const carCard = `
                    <div class="col-md-4 menu-item">
                        <div class="card">
                            <img src="${car.image}" class="card-img-top" alt="${car.make} ${car.model}" />
                            <div class="card-body">
                                <h5 class="card-title">${car.year} ${car.make} ${car.model}</h5>
                                <p class="card-text">This ${car.year} ${car.model} has ${car.miles} miles. It is ${car.drivetrain} with a  ${car.engine} paired with a ${car.transmission}.</p>
                                <p class="card-text"><small>Listing price is ${car.price}</small></p>
                                <button class="btn btn-danger delete-btn" data-id="${car.id}">Remove Listing</button> <button class="btn btn-secondary edit-button" data-id="${car.id}">Edit Listing</button>
                            </div>
                        </div>
                    </div>
                `;
                fwdContainer.append(carCard);
            
            }
            
            
            
        });

        //card builder for RWD
        cars.forEach(car => {
            if (car.drivetrain === 'RWD') {
                console.log(car)
                const carCard = `
                    <div class="col-md-4 menu-item">
                        <div class="card">
                            <img src="${car.image}" class="card-img-top" alt="${car.make} ${car.model}" />
                            <div class="card-body">
                                <h5 class="card-title">${car.year} ${car.make} ${car.model}</h5>
                                <p class="card-text">This ${car.year} ${car.model} has ${car.miles} miles. It is ${car.drivetrain} with a  ${car.engine} paired with a ${car.transmission}.</p>
                                <p class="card-text"><small>Listing price is ${car.price}</small></p>
                                <button class="btn btn-danger delete-btn" data-id="${car.id}">Remove Listing</button> <button class="btn btn-secondary edit-button" data-id="${car.id}">Edit Listing</button>
                            </div>
                        </div>
                    </div>
                `;
                rwdContainer.append(carCard);
            
            }
            
            
            
        });

        //logic for delete button
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                console.log('you clicked delete');
                const carId = this.getAttribute('data-id');
                fetch(`http://localhost:3000/Cars/${carId}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (response.ok) {
                        document.querySelector(`[data-id="${carId}"]`).remove();
                    } else {
                        alert('Failed to delete the car listing');
                    }
                })
                .catch(error => console.error('Error:', error));
            });
        });

        //logic for editing a listing
        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', function() {
                console.log('you clicked edit');
                const carId = this.getAttribute('data-id');
                const car = cars.find(c => c.id === carId);
                if (car) {
                    document.getElementById('editCarId').value = car.id;
                    document.getElementById('editCarMake').value = car.make;
                    document.getElementById('editCarModel').value = car.model;
                    document.getElementById('editCarYear').value = car.year;
                    document.getElementById('editCarMiles').value = car.miles;
                    document.getElementById('editCarEngine').value = car.engine;
                    document.getElementById('editCarTransmission').value = car.transmission;
                    document.getElementById('editCarDrivetrain').value = car.drivetrain;
                    document.getElementById('editCarPrice').value = car.price;
                    document.getElementById('editCarImage').value = car.image;

                    $('#editCarModal').modal('show');
                }
            });
        });

        //saves the edited info and posts it to api
        document.getElementById('saveEditBtn').addEventListener('click', () => {
            const carId = document.getElementById('editCarId').value;
            const updatedCar = {
                id: carId,
                make: document.getElementById('editCarMake').value,
                model: document.getElementById('editCarModel').value,
                year: document.getElementById('editCarYear').value,
                miles: document.getElementById('editCarMiles').value,
                engine: document.getElementById('editCarEngine').value,
                transmission: document.getElementById('editCarTransmission').value,
                drivetrain: document.getElementById('editCarDrivetrain').value,
                price: document.getElementById('editCarPrice').value,
                image: document.getElementById('editCarImage').value,
            };
    
            fetch(`http://localhost:3000/Cars/${carId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCar)
            })
            .then(response => {
                if (response.ok) {
                    const carElement = document.querySelector(`.menu-item[data-id="${carId}"]`);
                    carElement.querySelector('.card-title').textContent = `${updatedCar.year} ${updatedCar.make} ${updatedCar.model}`;
                    carElement.querySelector('.card-text').innerHTML = `This ${updatedCar.year} ${updatedCar.model} has ${updatedCar.miles} miles. It is ${updatedCar.drivetrain} with a ${updatedCar.engine} paired with a ${updatedCar.transmission}.<br><small>Listing price is ${updatedCar.price}</small>`;
                    $('#editCarModal').modal('hide');
                } else {
                    alert('Failed to update the car listing');
                }
            })
            .catch(error => console.error('Error:', error));
        });
        


        
    }
    getCars()

    //logic for creating a listing. takes the values and posts them to the api          
    const listingForm = document.querySelector('#listing-form')
        listingForm.addEventListener('submit', (e) => {
            e.preventDefault()

            const makeInput = listingForm.querySelector('#make').value
            const modelInput = listingForm.querySelector('#model').value
            const yearInput = listingForm.querySelector('#year').value
            const milesInput = listingForm.querySelector('#miles').value
            const engineInput = listingForm.querySelector('#engine').value
            const transmissionInput = listingForm.querySelector('#transmission').value
            const drivetrainInput = listingForm.querySelector('#drivetrain').value
            const priceInput = listingForm.querySelector('#price').value
            const imageInput = listingForm.querySelector('#image').value

                fetch(`${API_URL}`, {
     
                    method: 'POST',
                    body: JSON.stringify({
                        make: makeInput,
                        model: modelInput,
                        year: yearInput,
                        miles: milesInput,
                        engine: engineInput,
                        transmission: transmissionInput,
                        drivetrain: drivetrainInput,
                        price: priceInput,
                        image: imageInput
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            })
            listingForm.reset();

    
})


