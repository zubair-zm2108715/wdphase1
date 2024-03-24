users = JSON.parse(localStorage.getItem('users'));
items = JSON.parse(localStorage.getItem('items'));
purchases = JSON.parse(localStorage.getItem('purchases'));

let params = new URLSearchParams(window.location.search);
let username = params.get('username');
let sellerItemsDiv = document.querySelector('#items');
let sellerItems = items.items.filter((item) => item.seller === username);
let itemsList = document.querySelector('#item-list');

function sellerPage() {
  //console.log('Seller username:', username);
  let soldItems = Object.values(purchases.purchases).filter((purchase) => {
    return purchase.seller === username;
  });
  console.log('Currently Selling:', sellerItems);
  //console.log('Sold items:', soldItems);
}
window.addEventListener('DOMContentLoaded', () => {
  sellerPage();
  showSellerItems();
});

function showSellerItems() {
  console.log('Seller items:', sellerItems);
  sellerItemsDiv.innerHTML = sellerItems
    .map((item) => itemsToCard(item))
    .join('');
}

function itemsToCard(item) {
  return `<div class="item-list"></div>
            <p hidden>${item.id}</p>
            <h3>${item.name}</h3>
            <p>${item.price}</p>
            <p>${item.description}</p>
            <p>${item.quantity}</p>
            <button id="update" onclick="updateItem('${item.id}');">Update</button>
            <input type="number" id="quantity" placeholder="${item.quantity}" hidden>
            <button id="save" onclick="saveItem('${item.id}')" hidden>Save</button>
        `;
}

document.addEventListener('click', (e) => {
  if (e.target.id === 'update') {
    //toggle the hidden attribute
    e.target.nextElementSibling.hidden = false;
    e.target.nextElementSibling.nextElementSibling.hidden = false;
  }
})

function updateItem(e) {
  console.log('Item id:', e);
  console.log('Items:', items);
  let itemIndex = items.items.find(item => item.id == e);
  console.log('Item index:', itemIndex);
  
}

function saveItem(id) {
  let quantity = document.querySelector('#quantity').value;
  console.log('Quantity:', quantity);
  console.log('Item id:', id);
  let item = items.items.find((item) => item.id == id);
  item.quantity = quantity;
  localStorage.setItem('items', JSON.stringify(items));
  window.items = items;
  showSellerItems();
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
  console.log(items)
  items.items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
  window.items = items;
}