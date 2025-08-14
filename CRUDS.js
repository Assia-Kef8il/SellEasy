// Get elements by ID
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total"); // <small>, use innerHTML
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let deleteall = document.getElementById("deleteallbtn");

let mood = 'create';
let tmp; // for update index

// Initialize data array from localStorage or empty
let datapro = localStorage.product ? JSON.parse(localStorage.product) : [];

// Show data initially
showdata();

// Calculate total price and update total display
function gettotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}

// Clear input fields after submit
function cleardata() {
  title.value = "";
  price.value = "";
  ads.value = "";
  taxes.value = "";
  discount.value = "";
  count.value = "";
  total.innerHTML = "";
  category.value = "";
  total.style.background = "red";
  count.style.display = "block";
}

// Show data in table
function showdata() {
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += `
    <tr>
      <td data-label="ID">${i + 1}</td>
      <td data-label="Title">${datapro[i].title}</td>
      <td data-label="Price">${datapro[i].price}</td>
      <td data-label="Taxes">${datapro[i].taxes}</td>
      <td data-label="Ads">${datapro[i].ads}</td>
      <td data-label="Discount">${datapro[i].discount}</td>
      <td data-label="Total">${datapro[i].total}</td>
      <td data-label="Category">${datapro[i].category}</td>
      <td data-label="Update"><button onclick="updatedata(${i})">Update</button></td>
      <td data-label="Delete"><button onclick="deletedata(${i})">Delete</button></td>
    </tr>`;
  }

  document.getElementById("tbody").innerHTML = table;

  if (datapro.length > 0) {
    deleteall.innerHTML = `<button id="deleteAllBtn">Delete All (${datapro.length})</button>`;
    document.getElementById("deleteAllBtn").onclick = deleteAllProducts;
  } else {
    deleteall.innerHTML = "";
  }
}

// Submit button click handler (create or update)
submit.onclick = function () {
  if (!title.value || !price.value || !category.value) {
    alert("Title, Price, and Category are required!");
    return;
  }

  let newpro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value || 0,
    ads: ads.value || 0,
    discount: discount.value || 0,
    total: total.innerHTML,
    count: count.value || 1,
    category: category.value,
  };

  if (mood === 'create') {
    if (newpro.count > 1) {
      for (let i = 0; i < newpro.count; i++) {
        datapro.push(newpro);
      }
    } else {
      datapro.push(newpro);
    }
  } else { // update mode
    datapro[tmp] = newpro;
    mood = 'create';
    submit.innerHTML = 'Create';
    count.style.display = 'block';
  }

  // Save to localStorage
  localStorage.setItem("product", JSON.stringify(datapro));

  cleardata();
  showdata();
};

// Delete single product
function deletedata(i) {
  datapro.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(datapro));
  showdata();
}

// Delete all products
function deleteAllProducts() {
  localStorage.clear();
  datapro = [];
  showdata();
}

// Update product
function updatedata(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  gettotal();
  count.style.display = "none";
  category.value = datapro[i].category;
  submit.innerHTML = "Update";
  mood = 'update';
  tmp = i;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Search functionality
let searchTitleBtn = document.getElementById("searchtitle");
let searchCategoryBtn = document.getElementById("searchcategory");
let searchInput = document.getElementById("search");

// Filter and render search results
function renderFilteredData(data) {
  let table = "";
  for (let i = 0; i < data.length; i++) {
    table += `
    <tr>
      <td data-label="ID">${i + 1}</td>
      <td data-label="Title">${data[i].title}</td>
      <td data-label="Price">${data[i].price}</td>
      <td data-label="Taxes">${data[i].taxes}</td>
      <td data-label="Ads">${data[i].ads}</td>
      <td data-label="Discount">${data[i].discount}</td>
      <td data-label="Total">${data[i].total}</td>
      <td data-label="Category">${data[i].category}</td>
      <td data-label="Update"><button onclick="updatedata(${i})">Update</button></td>
      <td data-label="Delete"><button onclick="deletedata(${i})">Delete</button></td>
    </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
}

// Search by title
searchTitleBtn.onclick = function () {
  let searchTerm = searchInput.value.toLowerCase();
  let filteredData = datapro.filter(item => item.title.toLowerCase().includes(searchTerm));
  renderFilteredData(filteredData);
};

// Search by category
searchCategoryBtn.onclick = function () {
  let searchTerm = searchInput.value.toLowerCase();
  let filteredData = datapro.filter(item => item.category.toLowerCase().includes(searchTerm));
  renderFilteredData(filteredData);
};

// Console test to check elements
console.log(title, price, taxes, ads, discount, total);
