import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

export default function EditProductForm({ product, onSubmit, onDelete, onClose }) {
  const [formData, setFormData] = useState(product);

  const [segments] = useState(() => {
    const saved = localStorage.getItem('segments');
    return saved ? JSON.parse(saved) : ['Boy\'s Garment', 'Girl\'s Garment'];
  });

  const [categories] = useState(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : {};
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      setFormData((prev) => ({
        ...prev,
        images: [
          ...prev.images,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          )
        ]
      }));
    }
  });

  // Clean up object URLs
  useEffect(() => {
    return () => {
      formData.images.forEach((image) => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [formData.images]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDelete(product.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2">Segment</label>
        <select
          value={formData.segment}
          onChange={(e) => setFormData((prev) => ({ ...prev, segment: e.target.value }))}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Segment</option>
          {segments.map((segment) => (
            <option key={segment} value={segment}>
              {segment}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          {categories[formData.segment]?.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={formData.productName}
          onChange={(e) => setFormData((prev) => ({ ...prev, productName: e.target.value }))}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Design Number"
          value={formData.designNumber}
          onChange={(e) => setFormData((prev) => ({ ...prev, designNumber: e.target.value }))}
          className="p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Size"
          value={formData.size}
          onChange={(e) => setFormData((prev) => ({ ...prev, size: e.target.value }))}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Color"
          value={formData.color}
          onChange={(e) => setFormData((prev) => ({ ...prev, color: e.target.value }))}
          className="p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Pcs/Set"
          value={formData.pcsPerSet}
          onChange={(e) => setFormData((prev) => ({ ...prev, pcsPerSet: e.target.value }))}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Price/Pcs"
          value={formData.pricePerPcs}
          onChange={(e) => setFormData((prev) => ({ ...prev, pricePerPcs: e.target.value }))}
          className="p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Price/Set"
          value={formData.pricePerSet}
          onChange={(e) => setFormData((prev) => ({ ...prev, pricePerSet: e.target.value }))}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="GST %"
          value={formData.gst}
          onChange={(e) => setFormData((prev) => ({ ...prev, gst: e.target.value }))}
          className="p-2 border rounded"
        />
      </div>

      <input
        type="text"
        placeholder="HSN Code"
        value={formData.hsnCode}
        onChange={(e) => setFormData((prev) => ({ ...prev, hsnCode: e.target.value }))}
        className="w-full p-2 border rounded"
      />

      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
        className="w-full p-2 border rounded"
        rows="4"
      />

      <div {...getRootProps()} className="border-2 border-dashed p-4 text-center cursor-pointer">
        <input {...getInputProps()} />
        <p>Drag & drop product images here, or click to select files</p>
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        {formData.images.map((image, index) => (
          <div key={index} className="relative w-24 h-24">
            <img
              src={image.preview || URL.createObjectURL(image)}
              alt={`Product ${index + 1}`}
              className="w-full h-full object-cover rounded"
            />
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  images: prev.images.filter((_, i) => i !== index)
                }))
              }
              className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full p-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Product
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}