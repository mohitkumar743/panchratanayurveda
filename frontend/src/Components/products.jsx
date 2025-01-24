
// // not in used in new project combined in home page
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import ShopproductCard from "../Components/shopproduct";
// function products() {
//     const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
 


//   useEffect(() => {
//     const fetchProducts = async () => {
//       const { data } = await axios.get(`${backendUrl}/products`);

//       // Add cartValue: 1 to each product
//       const productsWithCartValue = data.map(product => ({
//         ...product,
//         cartValue: 1
//       }));

//       setProducts(productsWithCartValue);
//     };

//     fetchProducts();
    
//   }, []);

//   const handleClick = (product) => {
//     // Check if the product is already in the cart
//     // console.log(products)
//     const isPresent = cart.some((cartItem) => cartItem._id === product._id);

//     if (isPresent) {
//       console.log("Product is already in the cart");
//       alert("Product is already in the cart");
//       return;
//     }

//     // If the product is not in the cart, add it
//     setCart([...cart, product]);
//     console.log("Product added to cart");
//   };
//   return (
//     <>
//       {/* <Navbar size={cart.length} cart={cart} setCart={setCart} setProducts={setProducts} /> */}
//       <div className="App text-black max-h-[80vh]   overflow-x-auto">
//         {/* <h1 className="text-center text-5xl">Products</h1> */}
//         <div className="flex gap-4 px-4  justify-normal ">
//           {products.map((product) => (
//             <ShopproductCard
//               key={product._id}
//               product={product}
//               handleClick={handleClick}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

// export default products
import React, { useState, useEffect } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`${backendUrl}/products`);

      // Add cartValue: 1 to each product
      const productsWithCartValue = data.map((product) => ({
        ...product,
        cartValue: 1,
      }));

      setProducts(productsWithCartValue);
    };

    fetchProducts();
  }, []);

  const handleClick = (product) => {
    const isPresent = cart.some((cartItem) => cartItem._id === product._id);

    if (isPresent) {
      console.log("Product is already in the cart");
      alert("Product is already in the cart");
      return;
    }

    setCart([...cart, product]);
    console.log("Product added to cart");
  };

  return (
    <>
      <div className="App text-black max-h-[80vh] overflow-x-auto">
        <div className="products-container flex overflow-x-scroll no-scrollbar gap-4 px-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="product-card flex-shrink-0 min-w-[15vw] p-4 border rounded-md shadow-lg text-center bg-white"
            >
              <div className="image-container w-full aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="text-lg font-bold mt-2">Rs: {product.price}</p>
              <button
                onClick={() => handleClick(product)}
                className="btn bg-blue-500 text-white px-4 py-2 rounded-md mt-3"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;
