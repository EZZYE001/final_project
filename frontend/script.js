document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:5000/api/crops")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const cropsContainer = document.getElementById("crops-list");
            data.forEach(crop => {
                const cropItem = document.createElement("li");
                cropItem.textContent = `${crop.crop_name} - ${crop.price}`;
                cropsContainer.appendChild(cropItem);
            });
        })
        .catch(error => console.error('Error fetching crops data:', error));
});
