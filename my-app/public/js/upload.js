fetch('http://localhost:3000/api/item').then((response) => {
  response.json().then((data) => {
    items1 = data;
    localStorage.setItem('items', JSON.stringify(items1));
  });
}, console.error);

fetch('http://localhost:3000/api/customer').then((response) => {
  response.json().then((data) => {
    customers = data;
  });
}, console.error);

fetch('http://localhost:3000/api/seller').then((response) => {
  response.json().then((data) => {
    sellers = data;
  });
}, console.error);

fetch('http://localhost:3000/api/transaction').then((response) => {
  response.json().then((data) => {
    purchases = data;
  });
}, console.error);

let params = new URLSearchParams(window.location.search);
let username = params.get('username');

function backToHome() {
  location.href = 'index.html';
}

items = JSON.parse(localStorage.getItem('items'));

function getSellerId(username) {
  let seller = sellers.find((seller) => seller.username === username);
  return seller.id;
}

function uploadItem() {
  let itemName = document.getElementById('itemName').value;
  let price = parseInt(document.getElementById('price').value);
  let quantity = parseInt(document.getElementById('quantity').value);
  let picture = document.getElementById('picture').value;
  let details = document.getElementById('details').value;
  let category = document.getElementById('category').value;
  let newItem = {
    name: itemName,
    price: price,
    quantity: quantity,
    sellerId: parseInt(getSellerId(username)),
    image: picture,
    description: details,
    category: category,
  };
  fetch('http://localhost:3000/api/item', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newItem),
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.href = `seller.html?username=${seller.username}`;
    })
    .catch((error) => console.error('Error uploading item:', error));

}

function goToLogin() {
  location.href = `login.html`;
}
