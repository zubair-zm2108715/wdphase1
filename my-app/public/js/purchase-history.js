fetch('http://localhost:3000/api/customer/')
  .then((response) => response.json())
  .then((data) => {
    customers = data;
    console.log('Customer:', customers);
    let params = new URLSearchParams(window.location.search);
    let username = params.get('username');
    let customer = customers.find((customer) => customer.username === username);

    fetch(`http://localhost:3000/api/customer/${customer.id}`)
      .then((response) => response.json())
      .then((data) => {
        purchases = data;
        console.log('Purchases:', purchases);
        purchaseHistory();
      })
      .catch(console.error);

    fetch('http://localhost:3000/api/seller')
      .then((response) => response.json())
      .then((data) => {
        sellers = data;
        console.log('Sellers:', sellers);
      })
      .catch(console.error);
  })
  .catch(console.error);

function purchaseHistory() {
  let purchaseHistory = document.querySelector('#purchase-history');

  purchaseHistory.innerHTML = purchases
    .map((purchase) => purchaseToCard(purchase))
    .join('');
}
purchaseHistory();
function purchaseToCard(purchase) {
  return `<div class="card">
        <img src="${purchase.item.image}" alt="Product Image">
        <div class="Description"><p class="product-name"><b>Product: </b> ${
          purchase.item.name
        }</p>
        <p><b>Quantity: </b>${purchase.quantity}</p>
        <p><b>Total Cost:</b> $${purchase.totalPrice}</p>
        <p><b>Address: </b>${purchase.address}</p>
        <p><b>Seller: </b>${getSellerUsername(purchase.sellerId)}</p></div>
    </div>`;
}

function getSellerUsername(sellerId) {
  let seller = sellers.find((seller) => seller.id === sellerId);
  return seller ? seller.username : 'Unknown';
}
function goToLogin() {
  location.href = `login.html`;
  localStorage.removeItem('users');
}
