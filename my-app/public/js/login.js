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

function validateForm() {
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let login = document.getElementById('login');
  if (username === '' || password === '') {
    console.log('Username and password must be filled out');
    return false;
  }

  let validUser = customers.find(
    (customer) =>
      customer.username === username && customer.password === password
  );
  let validSeller = sellers.find(
    (seller) => seller.username === username && seller.password === password
  );

  if (validUser) {
    alert('Customer logged in');
    validUser.isLogged = true;
    localStorage.setItem('users', JSON.stringify(validUser));
    login.action = 'index.html';
  } else if (validSeller) {
    alert('Seller logged in');
    validSeller.isLogged = true;
    localStorage.setItem('sellers', JSON.stringify(validSeller));
    login.action = 'seller.html';
  } else {
    console.log('Invalid username or password');
    alert('Invalid username or password');
    return false;
  }
  console.log(validUser);
}

/*   function validateForm() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let login = document.getElementById('login');

    if (username === '' || password === '') {
      console.log('Username and password must be filled out');
      return false;
    }

    let validUser = customers.find(
      (customer) =>
        customer.username === username && customer.password === password
    );
    let validSeller = sellers.find(
      (seller) => seller.username === username && seller.password === password
    );

    if (validUser) {
      alert('Customer logged in');
      validUser.isLogged = true;
      localStorage.setItem('users', JSON.stringify(validUser));
      login.action = 'index.html';
    } else if (validSeller) {
      alert('Seller logged in');
      validSeller.isLogged = true;
      localStorage.setItem('users', JSON.stringify(users));
      login.action = 'seller.html';
    } else {
      console.log('Invalid username or password');
      alert('Invalid username or password');
      return false;
    }
    console.log(validUser);
  };
 */
