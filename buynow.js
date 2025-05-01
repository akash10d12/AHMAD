<script>
  const grid = document.getElementById("product-grid");

  products.map(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price} TK</p>
      <button onclick="buyNow('${product.id}')">Buy Now</button>
      <button onclick="viewDetails('${product.id}')">View Details</button>
    `;
    grid.appendChild(card);
  });

  function buyNow(id) {
    localStorage.setItem("productId", id);
    window.location.href = "checkout.html";
  }

  function viewDetails(id) {
    localStorage.setItem("productId", id);
    window.location.href = "product.html";
  }
</script>
