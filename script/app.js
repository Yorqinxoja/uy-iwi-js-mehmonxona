document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const updateForm = document.getElementById('updateForm');
    const reservationList = document.getElementById('reservationList');
    const roomNumberSelect = document.getElementById('roomNumber');
    const updateRoomNumberSelect = document.getElementById('updateRoomNumber');
    const cancelUpdateButton = document.getElementById('cancelUpdate');
    let reservations = [];
    let currentUpdateIndex = null;

    function populateRoomNumbers(selectElement) {
        for (let i = 1; i <= 15; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            selectElement.appendChild(option);
        }
    }

    function updateRoomOptions() {
        const bookedRooms = reservations.map(reservation => reservation.room);
        [...roomNumberSelect.options].forEach(option => {
            option.disabled = bookedRooms.includes(parseInt(option.value));
        });
        [...updateRoomNumberSelect.options].forEach(option => {
            option.disabled = bookedRooms.includes(parseInt(option.value));
        });
    }

    function renderReservations() {
        reservationList.innerHTML = '';
        reservations.forEach((reservation, index) => {
            const li = document.createElement('li');
            li.textContent = `Guest: ${reservation.guest}, Room: ${reservation.room}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteReservation(index));
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.addEventListener('click', () => loadUpdateForm(index));
            li.appendChild(updateButton);
            li.appendChild(deleteButton);
            reservationList.appendChild(li);
        });
        updateRoomOptions();
    }

    function addReservation(event) {
        event.preventDefault();
        const guest = document.getElementById('guestName').value;
        const room = parseInt(roomNumberSelect.value);
        reservations.push({ guest, room });
        registrationForm.reset();
        renderReservations();
    }

    function deleteReservation(index) {
        reservations.splice(index, 1);
        renderReservations();
    }

    function loadUpdateForm(index) {
        currentUpdateIndex = index;
        const reservation = reservations[index];
        document.getElementById('updateGuestName').value = reservation.guest;
        updateRoomNumberSelect.value = reservation.room;
        updateForm.style.display = 'block';
        registrationForm.style.display = 'none';
    }

    function updateReservation(event) {
        event.preventDefault();
        const guest = document.getElementById('updateGuestName').value;
        const room = parseInt(updateRoomNumberSelect.value);
        reservations[currentUpdateIndex] = { guest, room };
        updateForm.style.display = 'none';
        registrationForm.style.display = 'block';
        renderReservations();
    }

    function cancelUpdate() {
        updateForm.style.display = 'none';
        registrationForm.style.display = 'block';
    }

    registrationForm.addEventListener('submit', addReservation);
    updateForm.addEventListener('submit', updateReservation);
    cancelUpdateButton.addEventListener('click', cancelUpdate);

    populateRoomNumbers(roomNumberSelect);
    populateRoomNumbers(updateRoomNumberSelect);
});
