/* usersJSON = "./data/users.json";
itemsJSON = "./data/items.json";

window.addEventListener("DOMContentLoaded", async () => {
  await loadJsonData();
  users = JSON.parse(localStorage.getItem("users"));
  items = JSON.parse(localStorage.getItem("items"));
  loadProduct(items);
});

async function loadJsonData() {
  if (localStorage.getItem("users") && localStorage.getItem("items")) {
    return;
  }
  data1 = await fetch(usersJSON);
  const usersdata = await data1.json();
  localStorage.setItem("users", JSON.stringify(usersdata));

  data2 = await fetch(itemsJSON);
  const itemsdata = await data2.json();
  localStorage.setItem("items", JSON.stringify(itemsdata));
}

users = JSON.parse(localStorage.getItem("users"));
items = JSON.parse(localStorage.getItem("items")); */

fetch('http://localhost:3000/api/item').then((response) => {
  response.json().then((data) => {
    items = data;
    loadProduct(items);
  });
}, console.error);

fetch('http://localhost:3000/api/customer').then((response) => {
  response.json().then((data1) => {
    customers = data1;
  });
}, console.error);

let popularProduct = document.querySelector('#popular-product');

function searchItems() {
  let searchQuery = document.getElementById('searchInput').value.toLowerCase();

  // Filter items based on search query
  let filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery)
  );
  loadProduct(filteredItems);
  if (filteredItems.length === 0) {
    alert('No items found');
  }
}

loggedcustomer = JSON.parse(localStorage.getItem('users'));

function isSellerLoggedIn(username) {
  sellers = JSON.parse(localStorage.getItem('sellers'));
  return sellers.sellers.some(
    (seller) => seller.username === username && seller.isLogged === true
  );
}

function loadProduct(items) {
  console.log(items);
  popularProduct.innerHTML = items.map((item) => itemsToCard(item)).join('');
}

function itemsToCard(item) {
  return `<div class="card">
    <p hidden>${item.id}</p> 
        <a href='./product.html?id=${item.id}'><img src="${item.image}" alt="Product Image"></a>
        <p>Name: ${item.name}</p>
        <p>Price: ${item.price}</p>
        <p>Description: ${item.description}</p>
        <button id="purchaseButton" class="Button" onclick="toProductPage(${item.id});">Purchase</button>
        </div>`;
}
function toProductPage(id) {
  if (loggedcustomer.isLogged) {
    let customer = customers.find((customer) => customer.username === loggedcustomer.username);
    let product = items.find((item) => item.id === id);
    console.log(customer.money_balance);
    console.log(product.price);
    if (customer.money_balance < product.price) {
      alert('You do not have enough money to buy this product.');
    } else {
      location.href = `purchase-item.html?id=${id}&username=${loggedcustomer.username}`;
    }
  } else {
    alert('You must be logged in as a customer to purchase a product.');
    location.href = `login.html`;
  }
}

function updateLoginButton() {
  let loginButton = document.getElementById('loginbutton');
  let params = new URLSearchParams(window.location.search);
  let username = params.get('username');
  isCustomerLoggedIn(username).then(function (isLoggedIn) {
    if (isLoggedIn == true) {
      loginButton.innerHTML = 'Logout';
    } else {
      loginButton.innerHTML = 'Login';
    }
  });
}

// Call the function when the page loads
window.onload = updateLoginButton;

function purchaseHistoryButton() {
  let params = new URLSearchParams(window.location.search);
  let username = params.get('username');

  if (username == null) {
    alert('You must be logged in as a customer to show purchase history.');
    location.href = `login.html`;
  } else {
    location.href = `purchase-history.html?username=${username}`;
  }
}
