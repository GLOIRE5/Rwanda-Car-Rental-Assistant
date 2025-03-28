const booking = {
    openModal: (vehicleName, totalPrice) => {
        const bookingModal = document.getElementById('booking-modal');
        const selectedVehicleInput = document.getElementById('selected-vehicle');
        
        if (!bookingModal || !selectedVehicleInput) {
            console.error('Booking modal or selected vehicle input not found');
            return;
        }
        
        selectedVehicleInput.value = `${vehicleName} - Total: $${totalPrice}`;
        bookingModal.style.display = 'block';
    },
    
    handleSubmission: (event) => {
        event.preventDefault();
        const fullName = document.getElementById('full-name').value;
        const email = document.getElementById('booking-email').value;
        const phone = document.getElementById('phone').value;
        const selectedVehicle = document.getElementById('selected-vehicle').value;

        if (!fullName || !email || !phone) {
            alert('Please fill all fields');
            return;
        }

        const confirmationModal = document.getElementById('confirmation-modal');
        const confirmationMessage = document.getElementById('confirmation-message');
        
        if (!confirmationModal || !confirmationMessage) {
            console.error('Confirmation modal or message not found');
            return;
        }
        
        confirmationMessage.textContent = `Thank you, ${fullName}! Your booking for ${selectedVehicle} has been confirmed. We'll contact you at ${email} or ${phone} soon.`;
        confirmationModal.style.display = 'block';
        event.target.reset();
    },
    
    initializeModalControls: () => {
        const bookingModal = document.getElementById('booking-modal');
        const bookingCloseButtons = bookingModal ? bookingModal.querySelectorAll('.close-button') : [];
        bookingCloseButtons.forEach(button => {
            button.addEventListener('click', () => {
                bookingModal.style.display = 'none';
            });
        });

        const confirmationModal = document.getElementById('confirmation-modal');
        const confirmationCloseButton = document.getElementById('close-confirmation');
        if (confirmationCloseButton) {
            confirmationCloseButton.addEventListener('click', () => {
                confirmationModal.style.display = 'none';
            });
        }
    }
};

const search = {
    performSearch: (event) => {
        event.preventDefault();
        
        const airport = document.getElementById('airport').value;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;

        // Dummy vehicle data
        const vehicles = [
            { name: 'Toyota Rav4', price: 50 },
            { name: 'Land Rover', price: 80 }
        ];

        // Dummy tourist sites data based on airport
        const touristSites = {
            'Kigali International Airport': [
                { name: 'Kigali Genocide Memorial', description: 'A poignant reminder of Rwanda’s history.' },
                { name: 'Nyungwe Forest', description: 'A biodiversity hotspot with canopy walks.' }
            ],
            'Bugesera International Airport': [
                { name: 'Akagera National Park', description: 'Home to the Big Five animals.' },
                { name: 'Lake Kivu', description: 'A stunning lake for relaxation.' }
            ]
        };

        // Populate vehicles
        const vehiclesList = document.getElementById('vehicles-list');
        vehiclesList.innerHTML = '';
        vehicles.forEach(vehicle => {
            const vehicleCard = document.createElement('div');
            vehicleCard.className = 'vehicle-card';
            vehicleCard.innerHTML = `
                <h3>${vehicle.name}</h3>
                <p>$${vehicle.price}/day</p>
                <button class="btn-primary book-now" data-vehicle="${vehicle.name}" data-price="${vehicle.price}">Book Now</button>
            `;
            vehiclesList.appendChild(vehicleCard);
        });

        // Add event listeners to "Book Now" buttons
        document.querySelectorAll('.book-now').forEach(button => {
            button.addEventListener('click', () => {
                const vehicleName = button.dataset.vehicle;
                const totalPrice = button.dataset.price;
                booking.openModal(vehicleName, totalPrice);
            });
        });

        // Populate tourist sites
        const sitesList = document.getElementById('sites-list');
        sitesList.innerHTML = '';
        const sites = touristSites[airport] || [];
        if (sites.length === 0) {
            sitesList.innerHTML = '<p>No tourist sites available for this location.</p>';
        } else {
            sites.forEach(site => {
                const siteCard = document.createElement('div');
                siteCard.className = 'site-card';
                siteCard.innerHTML = `
                    <h3>${site.name}</h3>
                    <p>${site.description}</p>
                `;
                sitesList.appendChild(siteCard);
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const bookingForm = document.getElementById('booking-form');

    if (searchForm) {
        searchForm.addEventListener('submit', search.performSearch);
    }
    if (bookingForm) {
        bookingForm.addEventListener('submit', booking.handleSubmission);
    }
    
    booking.initializeModalControls();
});
