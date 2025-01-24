import React from 'react';

const ProductCard = ({ product, handleClick }) => {
  return (
    <div className="min-w-[250px] max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-95 flex flex-col h-full">
      <div className="w-full h-[50vh]">
        <img
          className="w-full h-full object-cover"
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 text-3xl my-2">Rs: {product.price}</p>
        <button
          onClick={() => handleClick(product)}
          className="mt-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
