// pages/index.js
'use client';
import './statistics.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BarChart from './components/Barchart';
import Piechart from './components/PieChart';

export default function Home() {
  const [stats, setStats] = useState(null);
  const [items, setItems] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [sellers, setSellers] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/statistics');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/item');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/customer');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchSellers = async () => {
      try {
        const response = await axios.get('/api/seller');
        setSellers(response.data);
      } catch (error) {
        console.error('Error fetching sellers:', error);
      }
    };
    fetchSellers();
    fetchStats();
    fetchItems();
    fetchUsers();
  }, []);

  function getCustomerUsername(customerId) {
    let customer = customers.find((customer) => customer.id === customerId);
    return customer ? customer.name : 'Unknown';
  }

  function getItemName(itemId) {
    let item = items.find((item) => item.id === itemId);
    return item ? item.name : 'Unknown';
  }

  function getSellerUsername(sellerId) {
    let seller = sellers.find((seller) => seller.id === sellerId);
    return seller ? seller.username : 'Unknown';
  }

  function getItemCategory(itemId) {
    let item = items.find((item) => item.id === itemId);
    return item ? item.category : 'Unknown';
  }

  const BarChartData_getAverageQuantitySoldPerProduct =
    stats &&
    stats.getAverageQuantitySoldPerProduct.map((item) => ({
      name: `${getItemName(item.itemId)}`,
      Avg_quantity: item._avg.quantity,
    }));
  const PieChartData_getAverageQuantitySoldPerProduct =
    stats &&
    stats.totalPurchasesPerSeller.map((item) => ({
      name: `${getSellerUsername(item.sellerId)}`,
      count: item._count,
    }));

  const topProductsBySalesData =
    stats &&
    stats.topProductsBySales.map((item) => ({
      name: `${getItemName(item.itemId)}`,
      quantity: item._sum.quantity,
    }));

  const topCategoriesBySalesData =
    stats &&
    stats.topProductsBySales.map((item) => ({
      name: `${getItemCategory(item.itemId)}`,
      quantity: item._sum.quantity,
    }));

  const averagePurchaseAmountPerCustomerData =
    stats &&
    stats.averagePurchaseAmountPerCustomer.map((item) => ({
      name: `${getCustomerUsername(item.customerId)}`,
      averagePurchaseAmount: item._avg.totalPrice,
    }));

  const customersPerLocationData =
    stats &&
    stats.customersPerLocation.map((item) => ({
      name: `${item.address}`,
      count: item._count,
    }));

  return (
    <div className="app">
      <h1>Statistics Page</h1>
      <button onClick={() => (window.location.href = '/index.html')}>
        Home
      </button>
      {stats && (
        <div className="dashboard">
          <div className="chart-container">
            <h2>Top Products by Sales</h2>
            <BarChart
              data={topProductsBySalesData}
              datakey="quantity"
              nameSize={30}
            />
          </div>
          
          <div className="chart-container">
            <h2>Customers Per Location</h2>
            <Piechart data={customersPerLocationData} datakey="count" />
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
            <h2>Purchases Percentage Per Seller</h2>
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
            <h2>Top Categories by Sales</h2>
            <BarChart
              data={topCategoriesBySalesData}
              datakey="quantity"
              nameSize={30}
            />
          </div>
        </div>
      )}
      {!stats && <p>Loading...</p>}
    </div>
  );
}
