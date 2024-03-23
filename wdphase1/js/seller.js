users = JSON.parse(localStorage.getItem('users'));
items = JSON.parse(localStorage.getItem('items'));
purchases = JSON.parse(localStorage.getItem('purchases'));

function sellerPage(){
    let params = new URLSearchParams(window.location.search);
    let username = params.get('username');
    console.log('Seller username:', username);
    let sellerItems = items.items.filter((item) => item.seller === username);
    let soldItems = Object.values(purchases.purchases).filter((purchase) => {
      return purchase.seller === username;
    });
    console.log('Currently Selling:', sellerItems);
    console.log('Sold items:', soldItems);
  }
    sellerPage();

function goToSeller(){
    let params = new URLSearchParams(window.location.search);
    let username = params.get('username');
        location.href = `seller.html?username=${username}`;
}

function goToUpload(){
    let params = new URLSearchParams(window.location.search);
    let username = params.get('username');
        location.href = `upload.html?username=${username}`;
}