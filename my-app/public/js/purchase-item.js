/* users = JSON.parse(localStorage.getItem('users'));
items = JSON.parse(localStorage.getItem('items')); */

fetch('http://localhost:3000/api/item').then((response) => {
  response.json().then((data) => {
    items = data;
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    let product = items.find((item) => item.id == id);
    // set the product in the localStorage
    localStorage.setItem('product', JSON.stringify(product));

    container = document.querySelector('.container1');
    container.innerHTML = productDetails(product);
    function productDetails(item) {
      return `
      <img class="img" src="${item.image}">
      <div id="productDetails">
        <h2>Product Details</h2>
        <p class="productName">${item.name}</p>
        <p class="price">${item.price}</p>
        <p class="description">
          ${item.description}
        </p>
      </div>
    </div>
  `;
    }
  });
}, console.error);

fetch('http://localhost:3000/api/customer').then((response) => {
  response.json().then((data) => {
    customers = data;
  });
}, console.error);

product = JSON.parse(localStorage.getItem('product'));
customer = JSON.parse(localStorage.getItem('users'));

function purchaseItem() {
  let purchaseQuantity = document.getElementById('p_quantity').value;
  let totalCost = product.price * purchaseQuantity;

  if (product.quantity < purchaseQuantity) {
    alert('Insufficient quantity');
  }
  if (customer.moneyBalance < totalCost) {
    alert('Insufficient funds');
  }

  data = {
    customerId: customer.id,
    itemId: product.id,
    quantity: purchaseQuantity,
  };

  fetch('http://localhost:3000/api/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.message === 'Purchase successful') {
        // Redirect to home page after successful purchase
        alert('Purchase successful');
        window.location.href = `index.html?user=${currentUser}`;
      } else {
        throw new Error('Purchase failed');
      }
    })
    .catch((error) => {
      // Display error message to the user
      console.error('Purchase error:', error.message);
      alert('Purchase failed. Please try again later.');
    });
  /* product.quantity -= purchaseQuantity;

  customer.money_balance -= totalCost;

  purchaseQuantity = parseInt(purchaseQuantity);
  let purchase = {
      username: username,
      product_id: id,
      productName: product.name,
      quantity: purchaseQuantity,
      price: product.price,
      image: product.image,
      totalCost: totalCost,
      address: purchaseAddress,
      seller: product.seller,
  };

  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('items', JSON.stringify(items));

  let purchases = JSON.parse(localStorage.getItem('purchases')) || { purchases: [] };
  purchases.purchases.push(purchase);
  localStorage.setItem('purchases', JSON.stringify(purchases)); */

  alert(
    `You have successfully purchased ${purchaseQuantity} ${product.name}(s) for a total cost of $${totalCost}. Your remaining balance is $${customer.money_balance}.`
  );
}
function backToHome() {
  location.href = 'index.html';
}
