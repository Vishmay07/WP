export const getProducts = () => {
  const savedProducts = localStorage.getItem('products');
  return savedProducts ? JSON.parse(savedProducts) : [];
};

export const getProductById = (id) => {
  const products = getProducts();
  return products.find((p) => p.id === id) || null;
};

export const getProductsByCategory = (segment, category) => {
  const products = getProducts();
  return products.filter((p) => p.segment === segment && p.category === category);
};
