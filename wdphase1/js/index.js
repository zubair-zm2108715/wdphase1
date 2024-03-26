usersJSON = './data/users.json';
itemsJSON = './data/items.json';

window.addEventListener('DOMContentLoaded', async () => {
  await loadJsonData();
  users = JSON.parse(localStorage.getItem('users'));
  items = JSON.parse(localStorage.getItem('items'));
  loadPopularProduct();
});

async function loadJsonData() {
  if (localStorage.getItem('users') && localStorage.getItem('items')) {
    return;
  }
  data1 = await fetch(usersJSON);
  const usersdata = await data1.json();
  localStorage.setItem('users', JSON.stringify(usersdata));

  data2 = await fetch(itemsJSON);
  const itemsdata = await data2.json();
  localStorage.setItem('items', JSON.stringify(itemsdata));
}

users = JSON.parse(localStorage.getItem('users'));
items = JSON.parse(localStorage.getItem('items'));

let popularProduct = document.querySelector('#popular-product');

function searchItems() {
  let searchQuery = document.getElementById('searchInput').value.toLowerCase();

  // Filter items based on search query
  let filteredItems = items.items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery)
  );

  let filteredItemsSection = document.getElementById('filteredItems');
  filteredItemsSection.innerHTML = ''; // Clear previous results

  filteredItems.forEach((item) => {
    let itemElement = document.createElement('p');
    itemElement.textContent = `Name: ${item.name}, Price: ${item.price}`;
    filteredItemsSection.appendChild(itemElement);
  });
}

async function isCustomerLoggedIn(username) {
  users = await JSON.parse(localStorage.getItem('users'));
  return users.customers.some(
    (customer) => customer.username === username && customer.isLogged === true
  );
}

function isSellerLoggedIn(username) {
  sellers = JSON.parse(localStorage.getItem('sellers'));
  return sellers.sellers.some(
    (seller) => seller.username === username && seller.isLogged === true
  );
}

function loadPopularProduct() {
  console.log(items);
  popularProduct.innerHTML = items.items
    .map((item) => itemsToCard(item))
    .join('');
}

function itemsToCard(item) {
  return `<div class="card">
    <p hidden>${item.id}</p> 
        <a href='./product.html?id=${item.id}'><img src="${item.image}" alt="Product Image"></a>
        <p>Name: ${item.name}</p>
        <p>Price: ${item.price}</p>
        <button id="purchaseButton" class="purchase-button" onclick="toProductPage(${item.id});">Purchase</button>
        </div>`;
        
}

function toProductPage(id) {
  let username = prompt('Please enter your username');

  isCustomerLoggedIn(username)
    .then(function (isLoggedIn) {
      if (isLoggedIn == true) {
        let customer = users.customers.find(
          (customer) => customer.username === username
        );
        let product = items.items.find((item) => item.id === id);
        console.log(customer.money_balance);
        console.log(product.price);
        if (customer.money_balance < product.price) {
          alert('You do not have enough money to buy this product.');
        } else {
          location.href = `purchase-item.html?id=${id}&username=${username}`;
        }
      } else {
        alert('You must be logged in as a customer to purchase a product.');
        location.href = `login.html`;
      }
    })
    .catch(function (error) {
      alert('Error');
      location.href = `login.html`;
    });
}

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
