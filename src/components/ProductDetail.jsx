import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getProductById } from '../utils/storage';
import WhatsAppButton from './WhatsAppButton';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-gray-600">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link 
        to={`/products/${product.segment}/${product.category}`}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.images[selectedImage]?.preview}
              alt={product.productName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden bg-gray-100 ${
                  selectedImage === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <img
                  src={image.preview}
                  alt={`${product.productName} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.productName}</h1>
            <p className="text-gray-600">Design Number: {product.designNumber}</p>
          </div>

          <div className="space-y-2">
            <p className="text-2xl font-bold">₹{product.pricePerSet}/set</p>
            <p className="text-gray-600">₹{product.pricePerPcs}/piece</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Size</p>
                <p className="font-semibold">{product.size}</p>
              </div>
              <div>
                <p className="text-gray-600">Color</p>
                <p className="font-semibold">{product.color}</p>
              </div>
              <div>
                <p className="text-gray-600">Pieces per Set</p>
                <p className="font-semibold">{product.pcsPerSet}</p>
              </div>
              <div>
                <p className="text-gray-600">GST</p>
                <p className="font-semibold">{product.gst}%</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">HSN Code: {product.hsnCode}</p>
          </div>
        </div>
      </div>

      <WhatsAppButton product={product} phoneNumber="919723322445" />
    </div>
  );
}
