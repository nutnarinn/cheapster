import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function ProductCompare(props) {
  const { product1, product2 } = props;

  const [product1Price, setProduct1Price] = useState('');
  const [product1Size, setProduct1Size] = useState('');
  const [product2Price, setProduct2Price] = useState('');
  const [product2Size, setProduct2Size] = useState('');

  const bothProductsComplete = product1Price && product1Size && product2Price && product2Size;

  const product1PricePerUnit = bothProductsComplete ? product1Price / product1Size : null;
  const product2PricePerUnit = bothProductsComplete ? product2Price / product2Size : null;

  let resultMessage = '';
  if (bothProductsComplete) {
    if (product1PricePerUnit < product2PricePerUnit) {
      resultMessage = `${product1.name} is the better deal!`;
    } else if (product1PricePerUnit > product2PricePerUnit) {
      resultMessage = `${product2.name} is the better deal!`;
    } else {
      resultMessage = 'Same!';
    }
  }

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
          <tr>
            <td>{product1.name}</td>
            <td><input type="number" value={product1Size} onChange={(e) => setProduct1Size(e.target.value)} /></td>
            <td><input type="number" value={product1Price} onChange={(e) => setProduct1Price(e.target.value)} /></td>
          </tr>
          <tr>
            <td>{product2.name}</td>
            <td><input type="number" value={product2Size} onChange={(e) => setProduct2Size(e.target.value)} /></td>
            <td><input type="number" value={product2Price} onChange={(e) => setProduct2Price(e.target.value)} /></td>
          </tr>
        </tbody>
      </table>
      {bothProductsComplete && <p>{resultMessage}</p>}
    </div>
  );
}

export default ProductCompare;

