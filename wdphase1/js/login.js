users = JSON.parse(localStorage.getItem('users'))

function validateForm() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
  
    if (username === '' || password === '') {
      console.log('Username and password must be filled out');
      return false;
    }
    
    let validUser = users.customers.find(
      (customer) => customer.username === username && customer.password === password
    );
    
    if (validUser) {
      console.log('Customer logged in');
      validUser.isLogged = true;
      localStorage.setItem('users', JSON.stringify(users));
    }  else {
      console.log('Invalid username or password');
      return false;
    }
  }