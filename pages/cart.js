import { useEffect, useState } from "react";

export default function Cart() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("35");

  useEffect(() => {
    const saved = localStorage.getItem("selectedProduct");
    if (saved) {
      setProduct(JSON.parse(saved));
    }
  }, []);

  const totalPrice = product ? (product.price * quantity).toFixed(2) : "0.00";

  if (!product) return <p className="p-4 text-red-600">No product selected.</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <img src={product.imageUrl} alt={product.name} className="w-full max-w-sm mx-auto mb-4" />
      <h3 className="text-xl font-semibold">{product.name}</h3>
      <p className="mb-2">Price per unit: ${product.price}</p>

      <label className="block mt-4 mb-1 font-medium">Select Shoe Size</label>
      <select
        value={size}
        onChange={(e) => setSize(e.target.value)}
        className="border px-4 py-2 rounded w-full"
      >
        {[...Array(9)].map((_, i) => {
          const sz = 35 + i;
          return <option key={sz}>{sz}</option>;
        })}
      </select>

      <label className="block mt-4 mb-1 font-medium">Quantity</label>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="border px-4 py-2 rounded w-full"
      />

      <p className="mt-4 font-semibold text-lg">Total: ${totalPrice}</p>

      <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800">
        Checkout
      </button>
    </div>
  );
}
