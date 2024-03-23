usersJSON = './data/users.json';
itemsJSON = './data/items.json';
purchasesJSON = './data/purchases.json';

const jsonFiles = [usersJSON, itemsJSON, purchasesJSON];

// Import each JSON file and load it into localStorage

async function loadJsonIntoLocalStorage(jsonFiles) {
  for (let file of jsonFiles) {
    const response = await fetch(file);
    const data = await response.json();
    localStorage.setItem(file, JSON.stringify(data));
  }
}
async function loadData() {
  await loadJsonIntoLocalStorage(jsonFiles);
}

loadData();

users = JSON.parse(localStorage.getItem(usersJSON));
items = JSON.parse(localStorage.getItem(itemsJSON));
purchases = JSON.parse(localStorage.getItem(purchasesJSON));

let popularProduct = document.querySelector('#popular-product');

function validateForm() {
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;

  if (username === '' || password === '') {
    console.log('Username and password must be filled out');
    return false;
  }

  let validUser = users.customers.find(
    (customer) =>
      customer.username === username && customer.password === password
  );
  let validSeller = users.sellers.find(
    (seller) => seller.username === username && seller.password === password
  );

  if (validUser) {
    validUser.isLogged = true;
  } else if (validSeller) {
    validSeller.isLogged = true;
  } else {
    console.log('Invalid username or password');
    return false;
  }
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('sellers', JSON.stringify(sellers));
  return true;
}

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
    (customer) =>customer.username === username && customer.isLogged === true
  ); 
}

function isSellerLoggedIn(username) {
  sellers = JSON.parse(localStorage.getItem('sellers'));
  return sellers.sellers.some(
    (seller) => seller.username === username && seller.isLogged === true
  );
}

function loadPopularProduct() {
    console.log(items)
    popularProduct.innerHTML = items.items
    .map((item) => itemsToCard(item))
    .join('');
}
loadPopularProduct();

function itemsToCard(item) {
  return `<div class="popular-product">
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
    .then(function(isLoggedIn) {
        if (isLoggedIn==true)
        { 
            let customer = users.customers.find((customer) => customer.username === username);
            let product = items.items.find((item) => item.id === id);
            console.log(customer.money_balance)
            console.log(product.price)
            if (customer.money_balance < product.price) {
                alert('You do not have enough money to buy this product.');
            }
            else{
                location.href = `purchase.html?id=${id}&username=${username}`;
            }
            
        }
        else
        {
            alert('You must be logged in as a customer to purchase a product.');
            location.href = `login.html`;
        }
    })
    .catch(function(error) {
        alert('Error');
        location.href = `login.html`;
    });
  }
  
  function purchaseItem() {
    let params = new URLSearchParams(window.location.search);

    // Get the id and username from the query string
    let id = params.get('id');
    let username = params.get('username');

    let purchaseQuantity = document.getElementById('p_quantity').value;
    let purchaseAddress = document.getElementById('p_address').value;
    console.log(id)
    console.log(username)
    let product = items.items.find((item) => item.id == id);
    console.log(product)
    let totalCost = product.price * purchaseQuantity;
    console.log(totalCost)
    product.quantity -= purchaseQuantity;
    let customer = users.customers.find((customer) => customer.username === username);
    customer.money_balance -= totalCost;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('items', JSON.stringify(items));
    let purchases = JSON.parse(localStorage.getItem('purchases')) || {purchases: []};
    let purchase = {
        'username': username,
        'product_id': id,
        'quantity': purchaseQuantity,
        'totalCost': totalCost,
        'address': purchaseAddress
    };
    purchases.purchases.push(purchase);
    localStorage.setItem('purchases', JSON.stringify(purchases));
    window.users = users;
    window.items = items;
    window.purchases = purchases;
    console.log(purchases)
    alert(`You have successfully purchased ${purchaseQuantity} ${product.name}(s) for a total cost of $${totalCost}. Your remaining balance is $${customer.money_balance}.`);
    console.log(id, username);
    
  }

  

