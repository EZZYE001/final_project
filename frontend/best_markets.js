function fetchBestMarkets() {
    fetch('/api/best_markets')
        .then(response => response.json())
        .then(markets => {
            const marketsList = document.getElementById('marketsList');
            marketsList.innerHTML = '';  // Clear existing data
            markets.forEach(market => {
                const marketElement = document.createElement('li');
                marketElement.textContent = `${market.market_name} - ${market.location} - Rating: ${market.rating}`;
                marketsList.appendChild(marketElement);
            });
        })
        .catch(error => {
            console.error('Error fetching markets:', error);
        });
}

document.addEventListener('DOMContentLoaded', fetchBestMarkets);
