let container = document.querySelector(".container");
let searchInput = document.getElementById("search");
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
      loader.style.display = "none";
    })
    .catch((err) => {
      console.error("Error fetching products:", err);
      loader.innerText = "Failed to load products.";
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


searchInput.addEventListener("input", () => {
  const val = searchInput.value.toLowerCase();
  const filtered = allProducts.filter((p) =>
    p.title.toLowerCase().includes(val)
  );

  container.innerHTML = "";
  visibleCount = 0;
  renderCards(filtered);
});


loadMoreBtn.addEventListener("click", () => {
  const val = searchInput.value.toLowerCase();
  const filtered = val
    ? allProducts.filter((p) =>
        p.title.toLowerCase().includes(val)
      )
    : allProducts;

  renderCards(filtered);
});


fetchProducts();
