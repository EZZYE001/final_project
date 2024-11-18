# final_project details...
Dashboard: Yields, Market Prices, and Best Markets
The Farm Market Tracker Dashboard provides an intuitive interface for visualizing essential agricultural data, including crop yields, market prices, and the best-performing markets. It helps stakeholders make informed decisions through dynamic data visualization.

Features
Yields Section:

Displays crop yields in tons per crop.
Visualized as a bar chart for quick comparison.
A detailed list of crop yields is available below the chart.
Market Prices Section:

Shows the current market prices of crops in USD.
Represented using a line chart for observing trends over time.
A detailed price breakdown is displayed below the chart.
Best Markets Section:

Highlights the highest-rated markets for selling or purchasing crops.
Visualized as a pie chart for distribution insights.
A list of markets with their respective ratings is included.
Technologies Used
Frontend:

HTML5 and CSS3 for the structure and styling of the dashboard.
JavaScript for dynamic data rendering and interactivity.
Chart.js library for creating visually appealing and responsive charts.
Backend:

Flask (Python) API for fetching data from the database.
MySQL for storing and retrieving crop, market, and pricing data.
How It Works
Data is fetched from the following API endpoints:

/api/yields: Provides data about crop yields.
/api/prices: Returns current market prices for crops.
/api/markets: Lists the top-rated markets and their ratings.
The fetched data is dynamically displayed in the respective sections:

How to Use
Navigate to the dashboard page of the application.
Explore the visualizations:
Hover over charts for precise values.
Review the detailed lists for additional information.
Use the insights from the charts and lists for decision-making.
Future Enhancements
Add filters for crop types, regions, and seasons to refine data.
Introduce downloadable reports for users.
Enhance interactivity with real-time data updates.
