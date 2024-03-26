users = JSON.parse(localStorage.getItem('users'));
items = JSON.parse(localStorage.getItem('items'));
purchases = JSON.parse(localStorage.getItem('purchases'));


function purchaseHistory() {
    let params = new URLSearchParams(window.location.search);
    let username = params.get('username');
    let purchaseHistory = document.querySelector('#purchase-history');
    let purchases = JSON.parse(localStorage.getItem('purchases'));
    let purchaseHistoryList = purchases.purchases.filter(
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
    return `<div class="purchase-history">
        <img src="${product.image}" alt="Product Image">
        <p>Product: ${product.name}</p>
        <p>Quantity: ${purchase.quantity}</p>
        <p>Total Cost: $${purchase.totalCost}</p>
        <p>Address: ${purchase.address}</p>
        <p>Seller: ${purchase.seller}</p>
    </div>`;
}
// (Abdulrahman) i add here function for the logout button
function goToLogin() {
  let params = new URLSearchParams(window.location.search);
  let username = params.get("username");
  location.href = `login.html?username=${username}`;
}
    