let container = document.querySelector(".container");
let searchInput = document.getElementById("search");
let categoryFilter = document.getElementById("categoryFilter");
let loader = document.getElementById("loader");
let loadMoreBtn = document.getElementById("loadMore");

let allProducts = [];
let visibleCount = 0;
let perPage = 4;

function fetchProducts() {
  loader.style.display = "block";

  return fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      allProducts = data;
      visibleCount = 0;
      renderCards(); 
      setupCategories(data);
      loader.style.display = "none";
    })
    .catch((err) => {
      console.error("Error fetching products:", err);
      loader.innerText = "Failed to load products.";
    });
}

function setupCategories(data) {
  const categories = new Set(data.map((item) => item.category));
  categories.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categoryFilter.appendChild(opt);
  });
}

function getFilteredProducts() {
  const searchVal = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  return allProducts.filter((p) => {
    const matchTitle = p.title.toLowerCase().includes(searchVal);
    const matchCategory = selectedCategory === "" || p.category === selectedCategory;
    return matchTitle && matchCategory;
  });
}

function renderCards(filteredList) {
  const dataToRender = filteredList || allProducts;
  const end = visibleCount + perPage;
  const currentItems = dataToRender.slice(visibleCount, end);

  currentItems.forEach((product) => {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${product.image}" />
      <p><strong>${product.title}</strong></p>
      <p>₹ ${product.price}</p>
    `;
    container.appendChild(card);
  });

  visibleCount += perPage;

  if (visibleCount >= dataToRender.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "inline-block";
  }
}

function resetAndRender() {
  container.innerHTML = "";
  visibleCount = 0;
  const filtered = getFilteredProducts();
  renderCards(filtered);
}

searchInput.addEventListener("input", resetAndRender);
categoryFilter.addEventListener("change", resetAndRender);

loadMoreBtn.addEventListener("click", () => {
  const filtered = getFilteredProducts();
  renderCards(filtered);
});

fetchProducts();
