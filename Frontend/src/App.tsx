import ProductCarousel from './components/ProductCarousel';
import './App.css';

function App() {
  return (
    <div className="App">
      <main className="main-content">
        <header className="page-header">
          <h1 className="page-title">Product List</h1>
          <div className="title-underline"></div>
        </header>
        <ProductCarousel />
      </main>
    </div>
  );
}

export default App;
