function fetchYields() {
    fetch('/api/yields')
        .then(response => response.json())
        .then(yields => {
            const yieldsList = document.getElementById('yieldsList');
            yieldsList.innerHTML = '';  // Clear existing data
            yields.forEach(yieldData => {
                const yieldElement = document.createElement('li');
                yieldElement.textContent = `Crop ID: ${yieldData.crop_id}, Yield: ${yieldData.yield} tons, Season: ${yieldData.season}, Year: ${yieldData.year}`;
                yieldsList.appendChild(yieldElement);
            });
        })
        .catch(error => {
            console.error('Error fetching yields:', error);
        });
}

document.addEventListener('DOMContentLoaded', fetchYields);
