<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EMIL FATION | Checkout</title>
  <link rel="stylesheet" href="styles.css">
  <!-- Firebase SDKs -->
  <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore-compat.js"></script>
</head>
<body>

<header>
  <div class="container">
    <h1>EMIL FATION</h1>
    <nav>
      <a href="index.html">Home</a>
      <a href="manwoman.html">Shoes</a>
      <a href="cart.html">Cart</a>
      <a href="login.html">Login</a>
    </nav>
  </div>
</header>

<section class="checkout">
  <div class="container">
    <h2>Checkout</h2>

    <div id="product-info" style="margin-bottom: 20px;"></div>

    <form id="checkoutForm">
      <label for="size">Shoe Size:</label>
      <select id="size" required>
        <option value="">Select size</option>
        <option value="35">35</option>
        <option value="36">36</option>
        <option value="37">37</option>
        <option value="38">38</option>
        <option value="39">39</option>
        <option value="40">40</option>
        <option value="41">41</option>
        <option value="42">42</option>
        <option value="43">43</option>
      </select>

      <label for="quantity">Quantity:</label>
      <input type="number" id="quantity" value="1" min="1" required>

      <p>Total: <span id="total-price">0</span> TK</p>

      <input type="text" id="fullname" placeholder="Full Name" required>
      <input type="text" id="address" placeholder="Shipping Address" required>
      <input type="email" id="email" placeholder="Email" required>
      <input type="tel" id="phone" placeholder="Mobile Number" required>

      <button type="submit" class="btn">Place Order</button>
    </form>
  </div>
</section>

<footer>
  <div class="container">
    <p>&copy; 2025 EMIL FATION. All rights reserved.</p>
  </div>
</footer>

<script>
  // Firebase Configuration (Replace with your actual config)
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  // Load product from Firestore using ID
  const productId = localStorage.getItem('productId');
  const productDiv = document.getElementById('product-info');
  let loadedProduct = null;

  db.collection('products').doc(productId).get().then(doc => {
    if (!doc.exists) {
      productDiv.innerHTML = '<p>Product not found.</p>';
      return;
    }
    loadedProduct = doc.data();
    productDiv.innerHTML = `
      <img src="${loadedProduct.image}" alt="${loadedProduct.name}" style="width: 200px;">
      <h3>${loadedProduct.name}</h3>
      <p>Unit Price: <span id="unit-price">${loadedProduct.price}</span> TK</p>
    `;
    document.getElementById('total-price').textContent = loadedProduct.price;
  });

  document.getElementById('quantity').addEventListener('input', () => {
    if (!loadedProduct) return;
    const unitPrice = parseInt(loadedProduct.price);
    const quantity = parseInt(document.getElementById('quantity').value);
    document.getElementById('total-price').textContent = unitPrice * quantity;
  });

  document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const size = document.getElementById('size').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const name = document.getElementById('fullname').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const total = parseInt(document.getElementById('total-price').textContent);

    if (!loadedProduct) {
      alert("No product loaded.");
      return;
    }

    db.collection('orders').add({
      name,
      address,
      email,
      phone,
      size,
      quantity,
      productId,
      productName: loadedProduct.name,
      productPrice: loadedProduct.price,
      total,
      image: loadedProduct.image,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      alert('✅ Order placed successfully!');
      localStorage.removeItem('productId');
      window.location.href = 'index.html';
    }).catch(err => {
      console.error('Error placing order:', err);
      alert('❌ Failed to place order.');
    });
  });
</script>

</body>
</html>
