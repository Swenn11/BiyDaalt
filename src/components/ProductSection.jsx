import React from 'react';
import Card from './card';

const ProductSection = ({ filters = {}, addToCart }) => {
  const products = [
    { id: 1, name: 'Converse', price: 19.99, colors: ['red', 'blue', 'green'], picture: 'https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw1fc8d527/images/a_08/560845C_A_08X1.jpg?sw=406' },
    { id: 2, name: 'Blue Jacket', price: 24.99, colors: ['yellow', 'purple', 'black'], picture: 'data:image/jpeg;base64,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' },
    { id: 3, name: 'Brown', price: 29.00, colors: ['black', 'pink', 'orange'], picture: 'https://outdoorvitals.com/cdn/shop/products/brownsatushopify_61bc7e13-fff8-4117-89cc-150a71598cd1.png?v=1670442575&width=1000' },
    { id: 4, name: 'Beige Short', price: 15.99, colors: ['brown', 'gray', 'teal'], picture: 'data:image/jpeg;base64,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' },
    { id: 5, name: 'Marine Blue', price: 39.99, colors: ['cyan', 'magenta', 'lime', 'indigo'], picture: 'data:image/jpeg;base64,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' },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesName = filters.name ? product.name.toLowerCase().includes(filters.name.toLowerCase()) : true;
    const matchesColor = filters.color ? product.colors.some(color => color.toLowerCase() === filters.color.toLowerCase()) : true;
    const matchesMinPrice = filters.minPrice ? product.price >= Number(filters.minPrice) : true;
    const matchesMaxPrice = filters.maxPrice ? product.price <= Number(filters.maxPrice) : true;

    return matchesName && matchesColor && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Card
            key={product.id}
            name={product.name}
            price={product.price}
            colors={product.colors}
            img={product.picture}
            addToCart={addToCart}
            id={product.id}
          />
        ))
      ) : (
        <p className="text-center col-span-full text-gray-500">No products match the filter.</p>
      )}
    </div>
  );
};

export default ProductSection;
