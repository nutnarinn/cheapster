import logo from './logo.svg';
import './App.css';

function ProductCompare(props) {
  const { product1, product2 } = props;

  const product1PricePerUnit = product1.price / product1.size;
  const product2PricePerUnit = product2.price / product2.size;

  const isProduct1Cheaper = product1PricePerUnit < product2PricePerUnit;

  return (
    <div>
      <h2>Cheapster</h2>
      <p>{product1.name}: ${product1.price} ({product1.size} oz.)</p>
      <p>{product2.name}: ${product2.price} ({product2.size} oz.)</p>
      <p>{isProduct1Cheaper ? product1.name : product2.name} is the better deal!</p>
    </div>
  );
}

export default ProductCompare;

