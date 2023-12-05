//local storage
var products = [];
if (localStorage.getItem('myProduct') != null) {
    products = JSON.parse(localStorage.getItem('myProduct'));
    displayProduct();
}

var productNameInput = document.getElementById("product-name");
var productPriceInput = document.getElementById("product-price");
var productCategoryInput = document.getElementById("product-category");
var productDescriptionInput = document.getElementById("description");
var addBtn = document.getElementById("addBtn");
var inputs = document.getElementsByClassName("inputs");

addBtn.onclick = function () {
    addProduct();
    displayProduct();
    clearForm();
}
//add product
function addProduct() {
    if ((validateName() == true) && (validatePrice() == true) && (validateCategory() == true)) {
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            decription: productDescriptionInput.value
        };
        products.push(product);
        localStorage.setItem('myProduct', JSON.stringify(products));
    }


}

function displayProduct() {
    var tableRaw = ``;
    for (var i = 0; i < products.length; i++) {
        tableRaw += `
        <tr>
            <td>${(i + 1)}</td>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].decription}</td>
            <td><button onclick="updateProduct(${i})" class="btnSize" style="background-color:#f0ad4e;" type="button">update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btnSize" style="background-color: #d9534f; color: white;" type="button">delete</button></td>
        </tr>
        `
    }
    document.getElementById("table-body").innerHTML = tableRaw;
}

// clear form
function clearForm() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

//delete product
function deleteProduct(index) {
    if (confirm('Are you sure to delete this record ?')) {
    products.splice(index, 1);
    localStorage.setItem('myProduct', JSON.stringify(products));
    displayProduct();
    }
}

//search product

function searchProduct(serachTerm) {
    tableRaw = ``;
    for (var i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(serachTerm.toLowerCase()) == true) {
            tableRaw += `
            <tr>
                <td>${(i + 1)}</td>
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].category}</td>
                <td>${products[i].decription}</td>
                <td><button onclick="updateProduct(${i})" class="btnSize" style="background-color:#f0ad4e;" type="button">update</button></td>
                <td><button onclick="deleteProduct(${i})" class="btnSize" style="background-color: #d9534f; color: white;" type="button">delete</button></td>
            </tr>
            `
        }

    }
    document.getElementById("table-body").innerHTML = tableRaw;
}

//update Product

function updateProduct(index) {
    productNameInput.value = products[index].name;
    productPriceInput.value = products[index].price;
    productCategoryInput.value = products[index].category;
    productDescriptionInput.value = products[index].description;

    document.getElementById('addBtn').innerHTML = "Update Product";
    
}

function validateName() {
    var regexName = /^[A-Z][a-z]{3,10}$/gm;
    if (regexName.test(productNameInput.value) == true) {
        return true;
    }
    else {
        document.getElementById('idName').innerHTML = "please enter right product name !!"
    }
}
function validatePrice() {
    var regexPrice = /(^[1-9][0-9]{3}|10000)$/gm;
    if (regexPrice.test(productPriceInput.value) == true) {
        return true;
    }
    else {
        document.getElementById('idPrice').innerHTML = "the right product price [1000 - 10000] !!"
    }
}
function validateCategory() {
    var regexCategory = /^[A-Z][a-z]{5,20}$/gm;
    if (regexCategory.test(productCategoryInput.value) == true) {
        return true;
    }
    else {
        document.getElementById('idCat').innerHTML = "please insert right product category !!"
    }
}
