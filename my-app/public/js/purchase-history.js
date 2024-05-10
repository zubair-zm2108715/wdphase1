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
  })
  .catch(console.error);

/* users = JSON.parse(localStorage.getItem("users"));
items = JSON.parse(localStorage.getItem("items"));
purchases = JSON.parse(localStorage.getItem("purchases")); */

function purchaseHistory() {
  let purchaseHistory = document.querySelector('#purchase-history');
  let purchases = JSON.parse(localStorage.getItem('purchases'));
  let purchaseHistoryList = purchases.filter(
    (purchase) => purchase.username === username
  );
  console.log(purchaseHistoryList);
  purchaseHistory.innerHTML = purchaseHistoryList
    .map((purchase) => purchaseToCard(purchase))
    .join('');
}
purchaseHistory();
function purchaseToCard(purchase) {
  let product = items.items.find((item) => item.id == purchase.product_id);
  return `<div class="card">
        <img src="${product.image}" alt="Product Image">
        <div class="Description"><p class="product-name"><b>Product: </b> ${product.name}</p>
        <p><b>Quantity: </b>${purchase.quantity}</p>
        <p><b>Total Cost:</b> $${purchase.totalCost}</p>
        <p><b>Address: </b>${purchase.address}</p>
        <p><b>Seller: </b>${purchase.seller}</p></div>
    </div>`;
}
function goToLogin() {
  location.href = `login.html`;
}
