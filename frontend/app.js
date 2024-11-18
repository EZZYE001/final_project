document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:4000/api/crops')  // Ensure the API is running at the correct port
        .then(response => {
            console.log('Response status:', response.status);  // Log response status
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();  // Get raw response text for debugging
        })
        .then(text => {
            console.log('Response Text:', text);  // Log raw response text

            try {
                const data = JSON.parse(text);  // Parse the response as JSON
                const cropsDiv = document.getElementById('crops');
                cropsDiv.innerHTML = '';  // Clear previous data

                if (data.length === 0) {
                    cropsDiv.innerHTML = 'No crops available.';
                } else {
                    data.forEach(crop => {
                        const cropItem = document.createElement('p');
                        cropItem.textContent = `${crop.crop_name} (${crop.crop_type})${crop.price ? ' - $' + crop.price : ''} per unit`;
                        cropsDiv.appendChild(cropItem);
                    });
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
                const cropsDiv = document.getElementById('crops');
                cropsDiv.innerHTML = 'Error: Invalid JSON response.';
            }
        })
        .catch(error => {
            console.error('Error fetching crops:', error);
            const cropsDiv = document.getElementById('crops');
            cropsDiv.innerHTML = 'Error loading crops.';
        });
});

// Handle the form submission to add a new crop
document.getElementById('addCropForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cropData = {
        crop_name: document.getElementById('crop_name').value,
        crop_type: document.getElementById('crop_type').value,
        season: document.getElementById('season').value,
        crop_id: document.getElementById('crop_id').value,
        
    };

    fetch('http://localhost:4000/api/crops', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cropData)
    })
    .then(response => {
        console.log('Response status:', response.status);  // Log response status
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();  // Get raw response text for debugging
    })
    .then(text => {
        console.log('Response Text:', text);  // Log raw response text

        try {
            const data = JSON.parse(text);  // Parse the response as JSON
            console.log('Crop added:', data);
            alert('Crop added successfully!');
            // Optionally, refresh the list of crops after adding
            location.reload();
        } catch (error) {
            console.error('Error parsing JSON:', error);
            alert('Error: Invalid JSON response.');
        }
    })
    .catch(error => {
        console.error('Error adding crop:', error);
        alert('There was an error adding the crop.');
    });
});
