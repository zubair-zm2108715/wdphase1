/* 
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
