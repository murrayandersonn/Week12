$(document).ready(function () {
    const API_URL = 'http://localhost:3000/Cars/';
    
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
    
    function displayCars(cars) {
        console.log("displayCars ran", cars)
        const awdContainer = $('#4wd');
        const fwdContainer = $('#fwd');
        const rwdContainer = $('#rwd');
        //console.log("awdContainer: ", awdContainer)
        awdContainer.empty();
        fwdContainer.empty();
        rwdContainer.empty();

        

        
        cars.forEach(car => {
            if (car.drivetrain === '4WD') {
                console.log(car)
                const carCard = `
                    <div class="col-md-4 menu-item">
                        <div class="card">
                            <img src="${car.image}" class="card-img-top" alt="${car.make} + ${car.model}" />
                            <div class="card-body">
                                <h5 class="card-title">${car.year} ${car.make} ${car.model}</h5>
                                <p class="card-text">This ${car.year} ${car.model} has ${car.miles}. It is ${car.drivetrain} with a  ${car.engine} paired with a ${car.transmission}.</p>
                                <p class="card-text"><small>Listing price is ${car.price}</small></p>
                                <button class="btn btn-danger delete-btn" data-id="${car.id}">Remove Listing</button> <button class="btn btn-secondary edit-button" data-id="${car.id}">Edit Listing</button>
                            </div>
                        </div>
                    </div>
                `;
                awdContainer.append(carCard);
            
            }
            
            
            
        });

        cars.forEach(car => {
            if (car.drivetrain === 'FWD') {
                console.log(car)
                const carCard = `
                    <div class="col-md-4 menu-item">
                        <div class="card">
                            <img src="${car.image}" class="card-img-top" alt="${car.make} + ${car.model}" />
                            <div class="card-body">
                                <h5 class="card-title">${car.year} ${car.make} ${car.model}</h5>
                                <p class="card-text">This ${car.year} ${car.model} has ${car.miles}. It is ${car.drivetrain} with a  ${car.engine} paired with a ${car.transmission}.</p>
                                <p class="card-text"><small>Listing price is ${car.price}</small></p>
                                <button class="btn btn-danger delete-btn" data-id="${car.id}">Remove Listing</button> <button class="btn btn-secondary edit-button" data-id="${car.id}">Edit Listing</button>
                            </div>
                        </div>
                    </div>
                `;
                fwdContainer.append(carCard);
            
            }
            
            
            
        });

        cars.forEach(car => {
            if (car.drivetrain === 'RWD') {
                console.log(car)
                const carCard = `
                    <div class="col-md-4 menu-item">
                        <div class="card">
                            <img src="${car.image}" class="card-img-top" alt="${car.make} + ${car.model}" />
                            <div class="card-body">
                                <h5 class="card-title">${car.year} ${car.make} ${car.model}</h5>
                                <p class="card-text">This ${car.year} ${car.model} has ${car.miles}. It is ${car.drivetrain} with a  ${car.engine} paired with a ${car.transmission}.</p>
                                <p class="card-text"><small>Listing price is ${car.price}</small></p>
                                <button class="btn btn-danger delete-btn" data-id="${car.id}">Remove Listing</button> <button class="btn btn-secondary edit-button" data-id="${car.id}">Edit Listing</button>
                            </div>
                        </div>
                    </div>
                `;
                rwdContainer.append(carCard);
            
            }
            
            
            
        });
    }
    getCars()
})

