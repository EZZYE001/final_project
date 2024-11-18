function fetchMarketPrices() {
    fetch('/api/market_prices')
        .then(response => response.json())
        .then(prices => {
            const pricesList = document.getElementById('pricesList');
            pricesList.innerHTML = '';  // Clear existing data
            prices.forEach(price => {
                const priceElement = document.createElement('li');
                priceElement.textContent = `Crop ID: ${price.crop_id}, Market ID: ${price.market_id}, Price: $${price.price}`;
                pricesList.appendChild(priceElement);
            });
        })
        .catch(error => {
            console.error('Error fetching market prices:', error);
        });
}

document.addEventListener('DOMContentLoaded', fetchMarketPrices);
