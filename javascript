function getProducts() {
    return JSON.parse(localStorage.getItem("products")) || [];
  }
  


function buyNow(index) {
  const products = getProducts(); // From localStorage
  localStorage.setItem("selectedProduct", JSON.stringify(products[index]));
  window.location.href = "product.html";
}
<script>
function addToCart(name, price, image) {
  const product = {
    name: name,
    price: price,
    image: image
  };
  localStorage.setItem('selectedProduct', JSON.stringify(product));
  window.location.href = "cart.html";
}
</script>
