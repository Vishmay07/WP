import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton({ product, phoneNumber }) {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `May I get more information about this product?\n\nProduct: ${product.productName}\nDesign: ${product.designNumber}\nPrice: ₹${product.pricePerSet}/set`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
    >
      <MessageCircle className="w-6 h-6" />
      <span>Contact on WhatsApp</span>
    </button>
  );
}
