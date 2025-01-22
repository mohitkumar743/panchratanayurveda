import React from "react";
import { Link } from "react-router-dom";
// import { useCart } from '../context/CardContext';

function ProductCard({ product, handleClick }) {
  return (
    <>
      <div className=" text-black  h-[80vh]  flex-col   ">
        <div className="product-card flex flex-col items-center ">
          <img
            className=""
            // src="https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            src={product.image}
            alt={product.name}
            style={{ height: "55vh" }}
          />

          <div className="text-center">
            <h1 className="text-xl h-[8vh]  ">
              <strong>{product.name}</strong>
            </h1>
            {/* <p className="text-2xl">{product.description}</p> */}
            <p className="text-xl text-center ">Rs:{product.price}</p>
            <div className="flex items-center justify-center   pt-1">
              {/* <button className="btn text-black btn-outline m-3 w-[100px] ">buy now</button> */}
              <button
                onClick={() => handleClick(product)}
                className="btn text-black btn-outline m-2 w-[100px] "
              >
                add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
