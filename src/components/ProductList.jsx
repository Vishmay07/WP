import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductsByCategory } from '../utils/storage';

export default function ProductList() {
  const { segment, category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (segment && category) {
      const filteredProducts = getProductsByCategory(segment, category);
      setProducts(filteredProducts);
    }
  }, [segment, category]);

  if (!products.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="text-sm text-gray-600 mb-4">
          <Link to="/" className="hover:underline text-blue-500">Home</Link> / 
          <Link to={`/segments/${segment}`} className="hover:underline text-blue-500"> {segment}</Link> / 
          <span>{category}</span>
        </nav>
        <h2 className="text-2xl font-bold mb-6">{category} - {segment}</h2>
        <p className="text-gray-600">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="text-sm text-gray-600 mb-4">
        <Link to="/" className="hover:underline text-blue-500">Home</Link> / 
        <Link to={`/segments/${segment}`} className="hover:underline text-blue-500"> {segment}</Link> / 
        <span>{category}</span>
      </nav>
      <h2 className="text-2xl font-bold mb-6">{category} - {segment}</h2>
      <p className="text-gray-600">{products.length} product(s) found in this category.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link 
            key={product.id} 
            to={`/product/${product.id}`} 
            className="block hover:shadow-lg transition-shadow duration-200"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.images?.[0]?.preview || '/placeholder.png'}
                alt={product.productName}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.productName}</h3>
                <p className="text-gray-600">Design: {product.designNumber}</p>
                <p className="text-gray-800 font-bold mt-2">₹{product.pricePerSet}/set</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
