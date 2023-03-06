import logo from './logo.svg';
import './App.css';
import ProductCompare from './ProductCompare';

const product1 = { name: 'A', price: 10, size: 8 };
const product2 = { name: 'B', price: 12, size: 10 };

function App() {
  return (
    <div className="App">
      <ProductCompare product1={product1} product2={product2} />
    </div>
  );
}

export default App;
