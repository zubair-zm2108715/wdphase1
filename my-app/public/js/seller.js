let sellers;
let sellerItems;

// Fetch the data
fetch('http://localhost:3000/api/seller/')
  .then((response) => response.json())
  .then((data) => {
    sellers = data;
    console.log('Sellers:', sellers);
    let params = new URLSearchParams(window.location.search);
    let username = params.get('username');
    let seller = sellers.find((seller) => seller.username === username);

    fetch(`http://localhost:3000/api/seller/${seller.id}`)
      .then((response) => response.json())
      .then((data) => {
        sellerItems = data;
        console.log('Seller items:', sellerItems);

        let sellerItemsDiv = document.querySelector('#item-list');
        sellerItemsDiv.innerHTML = sellerItems
          .map((item) => itemsToCard(item))
          .join('');
      })
      .catch(console.error);
    fetch(`http://localhost:3000/api/transaction/${seller.id}`)
      .then((response) => response.json())
      .then((data) => {
        let soldItems = data;
        purchases = localStorage.setItem('purchases', JSON.stringify(soldItems));
        console.log('Sold items:', soldItems);
        let sellerItemsSoldDiv = document.querySelector('#sale-history-list');
        sellerItemsSoldDiv.innerHTML = soldItems
          .map((item) => itemsToCardSold(item))
          .join('');
      })
      .catch(console.error);

    fetch('http://localhost:3000/api/customer')
      .then((response) => response.json())
      .then((data) => {
        customers = data;
        localStorage.setItem('customers', JSON.stringify(customers));
        console.log('Items:', items);
      })
      .catch(console.error);

    fetch('http://localhost:3000/api/item')
      .then((response) => response.json())
      .then((data) => {
        items = data;
        console.log('Purchases:', purchases);
      })
      .catch(console.error);
  })
  .catch(console.error);

let sellerItemsDiv = document.querySelector('#item-list');



localseller = JSON.parse(localStorage.getItem('sellers'));
items = JSON.parse(localStorage.getItem('items'));
purchases = JSON.parse(localStorage.getItem('purchases'));
customers = JSON.parse(localStorage.getItem('customers'));

if (localseller) {
  let filteredItems = items.filter((item) => item.sellerId === localseller.id);
  console.log('Filtered items:', filteredItems);
  sellerItemsDiv.innerHTML = filteredItems
    .map((item) => itemsToCard(item))
    .join('');
}

let sellerItemsSoldDiv = document.querySelector('#sale-history-list');

if (purchases) {
  
  function showSellerItemsSold() {
    sellerItemsSoldDiv.innerHTML = purchases
      .map((item) => itemsToCardSold(item))
      .join('');
  }
  showSellerItemsSold();
}

function showSellerItems() {
  let filteredItems = items.filter((item) => item.sellerId === localseller.id);
  console.log('Seller items:', filteredItems);
  sellerItemsDiv.innerHTML = filteredItems
    .map((item) => itemsToCard(item))
    .join('');
}
showSellerItems();

function itemsToCard(item) {
  return `<div class="card" id="card">
            <p hidden>${item.id}</p>
            <h3>${item.name}</h3>
            <img src="${item.image}" alt="Product Image" id="img">
            
            <p><b>Price: </b>${item.price}</p>
            <p><b>Quantity: </b>${item.quantity}</p>
            <p><b>Description: </b>${item.description}</p>
            <p><b>Category: </b>${item.category}</p>
            </div>
        `;
}

function itemsToCardSold(item) {
  return `<div class="card">
            <p hidden>${item.id}</p>
            <h3>${item.item.name}</h3>
            <img src="${item.item.image}" alt="Product Image">
            <p><b>Price: </b>${item.item.price}</p>
            <p><b>Purchased by: </b>${getCustomerUsername(item.customerId)}</p>
            <p><b>Quantity: </b>${item.quantity}</p>
            </div>
        `;

  function getCustomerUsername(customerId) {
    let customer = customers.find((customer) => customer.id === customerId);
    return customer ? customer.username : 'Unknown';
  }
}

function updateItem(e) {
  console.log('Item id:', e);
  console.log('Items:', items);
  let itemIndex = items.find((item) => item.id == e);
  console.log('Item index:', itemIndex);
}

function saveItem(id) {
  let quantity = document.querySelector(`#quantity-${id}`).value;
  console.log('Quantity:', quantity);
  console.log('Item id:', id);
  let item = items.find((item) => item.id == id);
  item.quantity = parseInt(quantity);
  localStorage.setItem('items', JSON.stringify(items));
  window.items = items;
}

function uploadType() {
  let params = new URLSearchParams(window.location.search);
  let username = params.get('username');
  location.href = `uploadtype.html?username=${username}`;
}

function goToSeller() {
  let params = new URLSearchParams(window.location.search);
  let username = params.get('username');
  location.href = `seller.html?username=${username}`;
}

function goToUpload() {
  let params = new URLSearchParams(window.location.search);
  let username = params.get('username');
  location.href = `upload.html?username=${username}`;
}

function backToHome() {
  location.href = 'index.html';
}
function goToLogin() {
  location.href = `login.html`;
  localStorage.removeItem('users');
}
