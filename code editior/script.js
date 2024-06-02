document.addEventListener('DOMContentLoaded', function() {
    const stockForm = document.getElementById('add-stock-form');
    const portfolioDiv = document.getElementById('portfolio');
    const API_KEY = 'YOUR_UPSTOX_API_KEY'; // Replace with your actual Upstox API key

    stockForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const symbol = document.getElementById('stock-symbol').value.toUpperCase();
        const quantity = parseInt(document.getElementById('stock-quantity').value);
        
        if (symbol && quantity > 0) {
            fetchStockData(symbol, quantity);
            document.getElementById('stock-symbol').value = '';
            document.getElementById('stock-quantity').value = '';
        }
    });

    async function fetchStockData(symbol, quantity) {
        const url = `https://api.upstox.com/v2/historical-candle/intraday/${symbol}/1day`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                }
            });
            const data = await response.json();

            if (data.status === "success" && data.data.candles.length > 0) {
                const latestCandle = data.data.candles[data.data.candles.length - 1];
                const latestPrice = latestCandle[4]; // Closing price
                addStockToPortfolio(symbol, quantity, latestPrice);
            } else {
                alert('No data found for the given symbol.');
            }
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
    }

    function addStockToPortfolio(symbol, quantity, price) {
        const stockDiv = document.createElement('div');
        stockDiv.className = 'stock';
        stockDiv.innerHTML = `
            <span>${symbol}</span>
            <span>Quantity: ${quantity}</span>
            <span>Price: $${price.toFixed(2)}</span>
        `;
        portfolioDiv.appendChild(stockDiv);
    }
});
