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
let sellerItemsSoldDiv = document.querySelector('#sale-history-list');

if (purchases) {
  let soldItems = Object.values(purchases.items).filter((purchase) => {
    return purchase.seller === username;
  });
  function showSellerItemsSold() {
    sellerItemsSoldDiv.innerHTML = soldItems
      .map((item) => itemsToCardSold(item))
      .join('');
  }
  showSellerItemsSold();
}

function showSellerItems() {
  console.log('Seller items:', sellerItems);
  sellerItemsDiv.innerHTML = sellerItems
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
            <p hidden><b>Description: </b>${item.description}</p>
            <p hidden><b>Category: </b>${item.category}</p>
            <p><b>Quantity: </b>${item.quantity}</p>
            <button class="Button" id="update" onclick="updateItem('${item.id}');">Update</button>
            <input type="number" id="quantity-${item.id}" placeholder="${item.quantity}" hidden>
            <button class="saveBtn" id="save" onclick="saveItem('${item.id}')" hidden>Save</button>
           
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

document.addEventListener('click', (e) => {
  if (e.target.id === 'update') {
    e.target.nextElementSibling.hidden = false;
    e.target.nextElementSibling.nextElementSibling.hidden = false;
  }
});

document.addEventListener('click', (e) => {
  if (e.target.id === 'card') {
    let description = e.target.querySelector('p:nth-child(5)');
    let category = e.target.querySelector('p:nth-child(6)');

    description.hidden = !description.hidden;
    category.hidden = !category.hidden;
  }
});

document.addEventListener('click', (e) => {
  if (e.target.id === 'img') {
    e.target.nextElementSibling.nextElementSibling.hidden = false;
    e.target.nextElementSibling.nextElementSibling.nextElementSibling.hidden = false;
  }
});

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
}

function uploadItem() {
  let params = new URLSearchParams(window.location.search);
  let username = params.get('username');
  let itemName = document.getElementById('itemName').value;
  let price = document.getElementById('price').value;
  let quantity = document.getElementById('quantity').value;
  let picture = document.getElementById('picture').value;
  let details = document.getElementById('details').value;
  let id = items.items.length + 1;
  let item = {
    id: id,
    name: itemName,
    price: price,
    quantity: quantity,
    seller: username,
    image_url: picture,
    description: details,
  };
  console.log(items);
  items.items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
  window.items = items;
}
