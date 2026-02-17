import React, { useEffect, useState } from "react";
import { getCardDta } from "./api";

export default function App() {
  const [cart, setCart] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    getCardDta().then((res) => {
      // collect products from all carts
      const allProducts = res.carts.flatMap((cart) => cart.products);
      setCart(allProducts);

      // calculate grand total
      const total = allProducts.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setGrandTotal(total);
    });
  }, []);


  const increaseQuantity = (id) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const decresesQty=(id)=>{
    setCart((prev)=>{
      return prev.map((item)=>{
        if(item.id===id){
          return {...item,quantity:item.quantity-1}
        }
        return item;
      })
    })
  };

  
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <table className="border-collapse border border-gray-400 w-full text-center">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Product</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Total</th>
          </tr>
        </thead>

        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td className="border border-gray-300 p-2 font-medium">
                <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded" />
              </td>
              <td className="border border-gray-300 p-2 font-medium">
                {item.title}
              </td>

              <td className="border border-gray-300 p-2">
                ${item.price.toFixed(2)}
              </td>

              <td className="border border-gray-300 p-2">
                  <button onClick={()=>decresesQty(item.id)} className="px-2 mr-2 py-1 bg-red-500 text-white rounded">-</button>
                {item.quantity}
                <button onClick={()=>increaseQuantity(item.id)} className="px-2 py-1 bg-green-500 text-white rounded ml-2">+</button>
              </td>

              <td className="border border-gray-300 p-2 font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>

        {/* Grand Total Row */}
        <tfoot>
          <tr className="bg-yellow-200 font-bold text-lg">
            <td colSpan="4" className="border border-gray-300 p-3 text-right">
              Grand Total:
            </td>
            <td className="border border-gray-300 p-3">
              ${grandTotal.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
