// import React from "react";
// import { Link } from "react-router-dom";
// // import { useCart } from '../context/CardContext';

// function ProductCard({ product, handleClick }) {
//   return (
//     <>
//       <div className="text-black h-[77vh] bg-slate-500 flex-col  ">
//         <div className="product-card flex flex-col   items-center">
//           <img
//             className=""
//             // src="https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
//             src={product.image}
//             alt={product.name}
//             style={{ height: "55vh" }}
//           />
//           <div className="text-center">
//             <h1 className="text-xl h-[8vh]">
//               <strong>{product.name}</strong>
//             </h1>
//             {/* <p className="text-2xl">{product.description}</p> */}
//             <p className="text-xl text-center">Rs:{product.price}</p>
//             <div className="flex items-center justify-center pt-1">
//               {/* <button className="btn text-black btn-outline m-3 w-[100px] ">buy now</button> */}
//               <button
//                 onClick={() => handleClick(product)}
//                 className="btn text-black btn-outline m-2 w-[100px]"
//               >
//                 add to cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProductCard;

import React from "react";

function ProductCard({ product, handleClick }) {
  return (
    <div className="product-card w-full sm:w-[40vw] md:w-[30vw] lg:w-[20vw] xl:w-[15vw] p-4 border rounded-md shadow-lg bg-white">
      {/* Image Container */}
      <div className="image-container w-full aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Product Details */}
      <h1 className="text-base sm:text-lg font-semibold mt-2 h-12 overflow-hidden">
        {product.name}
      </h1>
      <p className="text-sm sm:text-lg font-bold mt-2">Rs: {product.price}</p>
      <button
        onClick={() => handleClick(product)}
        className="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mt-3"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
