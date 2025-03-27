import fetchData from "./api.js";

let cars; // Declare cars globally
let vehicleData
(async () => {
    cars = await fetchData(); // Assign fetched data to the global variable
    console.log(cars);

    // You can now safely use `cars` here or in other parts of the code

// Vehicle and Tourist Sites Data Management
vehicleData = {
    vehicles: [
        {
            id: 1,
            name: cars.trims[0].name,
            type: cars.trims[0].make_model.name,
            seats: 5,
            pricePerDay: 100,
            availability: true,
            airports: ["Kigali International Airport"]
        },
        {
            id: 2,
            name: cars.trims[1].name,
            type: cars.trims[1].make_model.name,
            seats: 7,
            pricePerDay: 150,
            availability: true,
            airports: ["Kigali International Airport", "Bugesera International Airport"]
        },
        {
            id: 3,
            name: cars.trims[2].name,
            type: cars.trims[2].make_model.name,
            seats: 4,
            pricePerDay: 80,
            availability: true,
            airports: ["Bugesera International Airport"]
        }
    ],
    touristSites: {
        "Kigali International Airport": [
            "Kigali Genocide Memorial",
            "Inema Art Center", 
            "Nyamirambo Women's Center"
        ],
        "Bugesera International Airport": [
            "Lake Muhazi",
            "Bugesera Reconciliation Village",
            "Akagera National Park"
        ]
    }
};

})();


// Utility Functions
const utils = {
    validateDates: (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();

        if (start < today) {
            throw new Error('Pickup date cannot be in the past');
        }
        if (start > end) {
            throw new Error('Return date must be after pickup date');
        }
    },
    calculateRentalDays: (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    }
};

// UI Management
const ui = {
    clearResults: () => {
        document.getElementById('vehicles-list').innerHTML = '';
        document.getElementById('sites-list').innerHTML = '';
    },
    displayVehicles: (vehicles, rentalDays) => {
        const vehiclesList = document.getElementById('vehicles-list');
        
        if (vehicles.length === 0) {
            vehiclesList.innerHTML = '<p>No vehicles available at this airport.</p>';
            return;
        }

        vehicles.forEach(vehicle => {
            const totalPrice = vehicle.pricePerDay * rentalDays;
            const vehicleCard = document.createElement('div');
            vehicleCard.classList.add('vehicle-card');
            vehicleCard.innerHTML = `
                <h3>${vehicle.name}</h3>
                <p>Type: ${vehicle.type}</p>
                <p>Seats: ${vehicle.seats}</p>
                <p>Price per Day: $${vehicle.pricePerDay}</p>
                <p>Total for ${rentalDays} days: $${totalPrice}</p>
                <button class="book-btn" onclick="booking.openModal('${vehicle.name}', ${totalPrice})">Book Now</button>
            `;
            vehiclesList.appendChild(vehicleCard);
        });
    },
    displayTouristSites: (airport) => {
        const sitesList = document.getElementById('sites-list');
        const sites = vehicleData.touristSites[airport] || [];
        
        sites.forEach(site => {
            const siteElement = document.createElement('div');
            siteElement.classList.add('site-card');
            siteElement.innerHTML = `<h3>${site}</h3>`;
            sitesList.appendChild(siteElement);
        });
    }
};

// Search Functionality
const search = {
    performSearch: (event) => {
        event.preventDefault();
        
        const airport = document.getElementById('airport').value;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;

        try {
            // Validate dates
            utils.validateDates(startDate, endDate);
            
            // Calculate rental duration
            const rentalDays = utils.calculateRentalDays(startDate, endDate);

            // Clear previous results
            ui.clearResults();

            // Filter vehicles
            const availableVehicles = vehicleData.vehicles.filter(vehicle => 
                vehicle.airports.includes(airport) && vehicle.availability
            );

            // Display vehicles and tourist sites
            ui.displayVehicles(availableVehicles, rentalDays);
            ui.displayTouristSites(airport);
        } catch (error) {
            alert(error.message);
        }
    }
};

// Booking Management
const booking = {
    openModal: (vehicleName, totalPrice) => {
        const bookingModal = document.getElementById('booking-modal');
        const selectedVehicleInput = document.getElementById('selected-vehicle');
        
        selectedVehicleInput.value = `${vehicleName} - Total: $${totalPrice}`;
        bookingModal.style.display = 'block';
    },
    handleSubmission: (event) => {
        event.preventDefault();
        
        const fullName = document.getElementById('full-name').value;
        const email = document.getElementById('booking-email').value;
        const phone = document.getElementById('phone').value;
        const selectedVehicle = document.getElementById('selected-vehicle').value;

        // Simple validation
        if (!fullName || !email || !phone) {
            alert('Please fill all fields');
            return;
        }

        const confirmationModal = document.getElementById('confirmation-modal');
        const confirmationMessage = document.getElementById('confirmation-message');
        
        confirmationMessage.textContent = `Thank you, ${fullName}! Your booking for ${selectedVehicle} has been confirmed. We'll contact you at ${email} or ${phone} soon.`;
        
        confirmationModal.style.display = 'block';
        event.target.reset();
    },
    initializeModalControls: () => {
        const modalCloseButtons = document.querySelectorAll('.close-button');
        const confirmationCloseButton = document.getElementById('close-confirmation');

        modalCloseButtons.forEach(button => {
            button.addEventListener('click', () => {
                document.getElementById('booking-modal').style.display = 'none';
            });
        });

        confirmationCloseButton.addEventListener('click', () => {
            document.getElementById('confirmation-modal').style.display = 'none';
        });
    }
};

// Event Listeners and Initialization
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const bookingForm = document.getElementById('booking-form');

    searchForm.addEventListener('submit', search.performSearch);
    bookingForm.addEventListener('submit', booking.handleSubmission);
    
    // Initialize modal controls
    booking.initializeModalControls();
});
