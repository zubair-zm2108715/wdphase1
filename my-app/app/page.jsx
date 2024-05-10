// pages/index.js
'use client';
import './components/Statistics.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LineChart from './components/linechart';
import BarChart from './components/Barchart';
import Piechart from './components/PieChart';

export default function Home() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/statistics');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, []);

  // Extracting data for Line Chart
  // console.log(stats)
  const BarChartData_getAverageQuantitySoldPerProduct =
    stats &&
    stats.getAverageQuantitySoldPerProduct.map((item) => ({
      name: `Product ID ${item.itemId}`,
      Avg_quantity: item._avg.quantity,
    }));
  const PieChartData_getAverageQuantitySoldPerProduct =
    stats &&
    stats.totalPurchasesPerSeller.map((item) => ({
      name: ` Id:${item.sellerId}`,
      count: item._count,
    }));

  const topProductsBySalesData =
    stats &&
    stats.topProductsBySales.map((item) => ({
      name: ` ${item.itemId}`,
      quantity: item._sum.quantity,
    }));

  const BarChartData_totalRevenuePerHour =
    stats &&
    stats.totalRevenuePerHour.map((item) => ({
      name: new Date(item.date).getHours(),
      totalPrice: item._sum.totalPrice,
    }));
  const averagePurchaseAmountPerCustomerData =
    stats &&
    stats.averagePurchaseAmountPerCustomer.map((item) => ({
      name: `Customer ${item.customerId}`,
      averagePurchaseAmount: item._avg.totalPrice,
    }));

  // Extracting data for Pie Chart

  const customersPerLocationData =
    stats &&
    stats.customersPerLocation.map((item) => ({
      name: `${item.address}`,
      count: item._count,
    }));

  return (
    <div className="app">
      <h1>Admin Dashboard</h1>
      {stats && (
        <div className="dashboard">
          <div className="chart-container">
            <h2>Total Revenue Per Hour</h2>
            <BarChart
              data={BarChartData_totalRevenuePerHour}
              datakey="totalPrice"
              nameSize={5}
            />
          </div>
          <div className="chart-container">
            <h2>Top Products by Sales</h2>
            <BarChart
              data={topProductsBySalesData}
              datakey="quantity"
              nameSize={30}
            />
          </div>
          <div className="chart-container">
            <h2>Total Average Quantity Sold Per Product</h2>
            <BarChart
              data={BarChartData_getAverageQuantitySoldPerProduct}
              datakey="Avg_quantity"
              nameSize={30}
            />
          </div>
          <div className="chart-container">
            <h2>Total Purchases Percentage Per Seller</h2>
            <Piechart
              data={PieChartData_getAverageQuantitySoldPerProduct}
              datakey="count"
            />
          </div>
          <div className="chart-container">
            <h2>Average Purchase Amount Per Customer</h2>
            <BarChart
              data={averagePurchaseAmountPerCustomerData}
              datakey="averagePurchaseAmount"
              nameSize={30}
            />
          </div>
          <div className="chart-container">
            <h2>Customers Per Location</h2>
            <Piechart data={customersPerLocationData} datakey="count" />
          </div>
        </div>
      )}
      {!stats && <p>Loading...</p>}
    </div>
  );
}
