import { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import EditProductForm from "./EditProductForm";
import { Pencil, Trash2, Settings } from "lucide-react";

export default function AdminDashboard() {
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showSegmentManager, setShowSegmentManager] = useState(false);
  const [showCategoryManager, setShowCategoryManager] = useState(false);

  // Load data from localStorage
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });

  const [segments, setSegments] = useState(() => {
    const saved = localStorage.getItem("segments");
    return saved ? JSON.parse(saved) : [];
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("categories");
    return saved ? JSON.parse(saved) : {};
  });

  // Product Management
  const handleAddProduct = (product) => {
    const newProduct = {
      ...product,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setShowProductForm(false);
  };

  const handleEditProduct = (updatedProduct) => {
    const updatedProducts = products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // Segment Management
  const handleDeleteSegment = (segmentToDelete) => {
    if (!window.confirm(`Are you sure you want to delete the segment "${segmentToDelete}" and all its categories and products?`)) return;
    
    // Remove segment from segments list
    const updatedSegments = segments.filter(segment => segment !== segmentToDelete);
    setSegments(updatedSegments);
    localStorage.setItem("segments", JSON.stringify(updatedSegments));
    
    // Remove segment's categories
    const updatedCategories = { ...categories };
    delete updatedCategories[segmentToDelete];
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    
    // Remove all products in this segment
    const updatedProducts = products.filter(product => product.segment !== segmentToDelete);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // Category Management
  const handleDeleteCategory = (segment, categoryToDelete) => {
    if (!window.confirm(`Are you sure you want to delete the category "${categoryToDelete}" and all its products?`)) return;
    
    // Remove category from segment
    const updatedCategories = {
      ...categories,
      [segment]: categories[segment].filter(cat => cat.name !== categoryToDelete)
    };
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    
    // Remove all products in this category
    const updatedProducts = products.filter(
      product => !(product.segment === segment && product.category === categoryToDelete)
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Management Buttons */}
      <div className="flex gap-6 mb-8 justify-center">
        <button
          onClick={() => setShowProductForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
        >
          Add Product
        </button>
        <button
          onClick={() => setShowSegmentManager(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
        >
          Manage Segments
        </button>
        <button
          onClick={() => setShowCategoryManager(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
        >
          Manage Categories
        </button>
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform scale-95 hover:scale-100">
            <ProductForm onSubmit={handleAddProduct} onClose={() => setShowProductForm(false)} />
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-transform scale-95 hover:scale-100">
            <EditProductForm
              product={editingProduct}
              onSubmit={handleEditProduct}
              onDelete={handleDeleteProduct}
              onClose={() => setEditingProduct(null)}
            />
          </div>
        </div>
      )}

      {/* Segment Manager Modal */}
      {showSegmentManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-2xl w-full shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Manage Segments</h2>
            <div className="space-y-4">
              {segments.map(segment => (
                <div key={segment} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200">
                  <span className="font-semibold">{segment}</span>
                  <button
                    onClick={() => handleDeleteSegment(segment)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowSegmentManager(false)}
              className="mt-6 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Category Manager Modal */}
      {showCategoryManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-2xl w-full shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Manage Categories</h2>
            <div className="space-y-6">
              {segments.map(segment => (
                <div key={segment} className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-800">{segment}</h3>
                  <div className="space-y-4">
                    {categories[segment]?.map(category => (
                      <div key={category.name} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200">
                        <span>{category.name}</span>
                        <button
                          onClick={() => handleDeleteCategory(segment, category.name)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowCategoryManager(false)}
              className="mt-6 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transform transition-transform hover:scale-105">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-xl">{product.productName}</h3>
                <button
                  onClick={() => setEditingProduct(product)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  <Pencil size={20} />
                </button>
              </div>
              <p className="text-gray-700">Segment: {product.segment}</p>
              <p className="text-gray-700">Category: {product.category}</p>
              <p className="text-gray-700">Price/Set: ₹{product.pricePerSet}</p>
              {product.images.length > 0 && (
                <img
                  src={product.images[0].preview || URL.createObjectURL(product.images[0])}
                  alt={product.productName}
                  className="mt-4 rounded w-full h-48 object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
