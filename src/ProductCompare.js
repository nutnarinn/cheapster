import logo from './logo.svg';
import './App.css';
import './ProductCompare.css';
import React, { useState, useEffect } from 'react';

function ProductCompare(props) {
  const { product1, product2 } = props;
  const [products, setProducts] = useState([
    { name: 'A', price: '', size: '', pricePerUnit: null },
    { name: 'B', price: '', size: '', pricePerUnit: null }
  ]);

  useEffect(() => {
    // Calculate price per unit for each product whenever the size or price of a product changes
    const updatedProducts = products.map((product) => {
      const { price, size } = product;
      const pricePerUnit = price && size ? price / size : null;
      return { ...product, pricePerUnit };
    });
    setProducts(updatedProducts);
  }, [products]);

  const allProductsComplete = products.every((product) => product.price && product.size && product.pricePerUnit);

    let resultMessage = '';
    const cheapestProducts = products.reduce((acc, cur) => {
      if (!cur.pricePerUnit) {
        return acc;
      }
      if (!acc.length || cur.pricePerUnit < acc[0].pricePerUnit) {
        return [cur];
      }
      if (cur.pricePerUnit === acc[0].pricePerUnit) {
        return [...acc, cur];
      }
      return acc;
    }, []);

  if (allProductsComplete) {
    if (cheapestProducts.length === 0) {
        resultMessage = '';
    } else if (cheapestProducts.length === 1) {
        const cheapestProductNames = cheapestProducts.map((product) => product.name).join(' and ');
        resultMessage = `${cheapestProductNames} is the cheapest!`;
    } else {
        const cheapestProductNames = cheapestProducts.map((product) => product.name).join(' and ');
        resultMessage = `${cheapestProductNames} are tied for cheapest!`;
    }
  }


  const handleClear = () => {
    const updatedProducts = products.map((product) => ({ ...product, price: '', size: '' }));
    setProducts(updatedProducts.slice(0, 2));
  };

  const handleAddProduct = () => {
    if (products.length < 25) {
      const newProduct = { name: String.fromCharCode(65 + products.length), price: '', size: '', pricePerUnit: null };
      setProducts([...products, newProduct]);
    }
  };

  const handleDeleteProduct = () => {
    setProducts(products.slice(0, -1));
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  const productRows = products.map((product, index) => {
    const isCheapest = (cheapestProducts.some((p) => p.name === product.name)) && (cheapestProducts.length != 0);
    const className = isCheapest ? 'cheapest' : '';
    return (
      <tr key={index} className={className}>
        <td>{product.name}</td>
        <td><input type="number" min="0" value={product.size} onChange={(e) => handleProductChange(index, 'size', e.target.value)} /></td>
        <td><input type="number" min="0" value={product.price} onChange={(e) => handleProductChange(index, 'price', e.target.value)} /></td>
        <td>{product.pricePerUnit && `${product.pricePerUnit.toFixed(2)} ฿ /unit`}</td>
      </tr>
    );
  });

  return (
    <div className="product-compare-container">
      <h2>Cheapster</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Size</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {productRows}
        </tbody>
      </table>
      <div className="button-container">
        <button className="add-button" onClick={handleAddProduct}>Add</button>
        {products.length > 2 && <button className="delete-button" onClick={handleDeleteProduct}>Delete</button>}
        {products.length > 0 && <button className="clear-button" onClick={handleClear}>Clear</button>}
      </div>
      {allProductsComplete && <p className="result-message">{resultMessage}</p>}
    </div>
  );
}

export default ProductCompare;

