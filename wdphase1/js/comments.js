/* 



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





function viewSales() {
    // Add code here to handle viewing sales for the item
}

document.getElementById("itemForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    let itemName = document.getElementById("itemName").value;
    let price = document.getElementById("price").value;
    let quantity = document.getElementById("quantity").value;
    let picture = document.getElementById("picture").value;
    let details = document.getElementById("details").value;

    // Check if item already exists
    let existingItem = localStorage.getItem(itemName);
    if (existingItem) {
        // Item already exists, update quantity
        let item = JSON.parse(existingItem);
        item.quantity += parseInt(quantity);
        localStorage.setItem(itemName, JSON.stringify(item));
    } else {
            // Item does not exist, create new item
            var newItem = {
                itemName: itemName,
                price: price,
                quantity: quantity,
                picture: picture,
                details: details
            };
            localStorage.setItem(itemName, JSON.stringify(newItem));
        }

        // Clear form inputs
        document.getElementById("itemName").value = "";
        document.getElementById("price").value = "";
        document.getElementById("quantity").value = "";
        document.getElementById("picture").value = "";
        document.getElementById("details").value = "";

        alert("Item uploaded successfully!");
    }); */





    /* function updateItemForm(itemIndex) {
  let updateItemDiv = document.createElement('div');
  updateItemDiv.innerHTML = `
        <h3>${itemIndex.name}</h3>
        <p>${itemIndex.price}</p>
        <p>${itemIndex.description}</p>
        <input type="number" id="quantity" placeholder="${itemIndex.quantity}">
        <button onclick="saveItem('${itemIndex.id}')">Save</button>
    `;
  itemsList.appendChild(updateItemDiv);
}

 */
  /* let updateItemDiv = document.createElement('div');
  updateItemDiv.innerHTML = `
        <h3>${itemIndex.name}</h3>
        <p>${itemIndex.price}</p>
        <p>${itemIndex.description}</p>
        <input type="number" id="quantity" placeholder="${itemIndex.quantity}">
        <button onclick="saveItem('${itemIndex.id}')">Save</button>
    `;
  sellerItemsDiv.appendChild(updateItemDiv); 
  
  // close the div after updating
  /* let closeButton = document.createElement('button');
  closeButton.innerText = 'Close';
  closeButton.onclick = function () {
    sellerItemsDiv.removeChild(updateItemDiv);
  };
  updateItemDiv.appendChild(closeButton); */ 

