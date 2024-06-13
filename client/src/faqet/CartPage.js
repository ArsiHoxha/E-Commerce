import React, { useEffect, useState } from "react";
import './CartPage.css'; // Import the CSS file

const CartPage = () => {
  const [data, setData] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const responseData = localStorage.getItem("cardData");

    if (responseData) {
      const parsedData = JSON.parse(responseData);
      console.log("Response Data from Local Storage:", parsedData);

      const dataArray = Array.isArray(parsedData) ? parsedData : [parsedData];
      setData(dataArray);

      // Initialize quantities state
      const initialQuantities = {};
      dataArray.forEach((product) => {
        initialQuantities[product.id] = 1; // Default quantity
      });
      setQuantities(initialQuantities);
    }
  }, []);

  const incrementQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  const decrementQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, prevQuantities[productId] - 1),
    }));
  };

  
  const removeFromCart = (productId) => {
    const updatedData = data.filter(product => product.id !== productId);
    setData(updatedData);
    localStorage.setItem("cardData", JSON.stringify(updatedData));

    // Remove the product quantity
    const updatedQuantities = { ...quantities };
    delete updatedQuantities[productId];
    setQuantities(updatedQuantities);
  };

  const calculateTotalPrice = () => {
    return data.reduce((total, product) => {
      const productPrice = parseFloat(product.priceTxt.replace(/[^0-9.-]+/g, ""));
      return total + (productPrice * (quantities[product.id] || 1));
    }, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl mb-6 font-extrabold text-center">Shopping Cart</h1>
      {data.length > 0 ? (
        <>
          <div className="space-y-4">
            {data.map((product, index) => (
              <div key={index} className="flex space-x-4 border p-4 rounded-lg">
                <div className="flex-shrink-0">
                  <img
                    src={`http://localhost:8080/uploads/${product.productImg}`}
                    alt={product.imageAlt}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg font-semibold"><a href="#" className="hover:underline">{product.productNameTxt}</a></h3>
                  </div>
                  <p className="text-lg font-semibold">${product.priceTxt}</p>
                  <div className="flex items-center space-x-3">
                    <button className="text-gray-700 border rounded px-2 py-1" onClick={() => decrementQuantity(product.id)}>-</button>
                    <span>{quantities[product.id]}</span>
                    <button className="text-gray-700 border rounded px-2 py-1" onClick={() => incrementQuantity(product.id)}>+</button>
                  </div>
                  <button className="text-red-600 hover:underline  mt-4 text-left " onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mt-6">
            <h2 className="text-xl font-semibold mb-4">Order summary</h2>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>${calculateTotalPrice()}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd>$5.00</dd>
              </div>
              <div className="flex justify-between">
                <dt>Tax</dt>
                <dd>$8.32</dd>
              </div>
              <div className="flex justify-between font-semibold">
                <dt>Order total</dt>
                <dd>${(parseFloat(calculateTotalPrice()) + 5 + 8.32).toFixed(2)}</dd>
              </div>
            </dl>
          </div>
          <div className="mt-4">
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Checkout</button>
          </div>
          <div className="mt-4 text-center">
            <p>or <a href="#" className="text-blue-600 hover:underline">Continue Shopping<span aria-hidden="true"> →</span></a></p>
          </div>
        </>
      ) : (
        <p>No products in the cart.</p>
      )}
    </div>
  );
};

export default CartPage;
