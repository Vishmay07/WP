import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AdvertisementBanner from './AdvertisemenBanner';

export default function HomePage() {
  const [segments, setSegments] = useState([]);
  const [categories, setCategories] = useState({});
  const segmentRefs = useRef({});

  useEffect(() => {
    const savedSegments = localStorage.getItem('segments');
    const savedCategories = localStorage.getItem('categories');
    
    if (savedSegments) setSegments(JSON.parse(savedSegments));
    if (savedCategories) setCategories(JSON.parse(savedCategories));
  }, []);

  // Inline CSS for the page components
  const fadeInStyle = (index) => ({
    animation: `fadeIn 1s ease-out forwards`,
    animationDelay: `${index * 0.3}s`, 
    marginTop: '2rem', // Add space above each segment
  });

  const cardHoverStyle = {
    transition: 'transform 0.3s ease-in-out',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  };

  const hoverEffect = {
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
  };

  const cardImageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '12px',
  };

  const categoryContentStyle = {
    padding: '1rem',
  };

  const h3Style = {
    fontSize: '1.125rem',
    color: '#333',
    fontWeight: '600',
  };

  const h2Style = {
    fontSize: '2.25rem',
    fontWeight: '700',
    color: '#333',
    marginBottom: '1rem',
  };

  const buttonStyle = {
    marginTop: '1rem',
    marginRight: '1rem', // Space between buttons horizontally
    
    marginBottom: '1rem', // Added space below each button
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#45a049',
  };

  // Scroll to the segment
  const scrollToSegment = (segment) => {
    segmentRefs.current[segment]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <AdvertisementBanner />

      {/* Add buttons for each segment */}
      <div className="segment-buttons">
        {segments.map((segment) => (
          <button
            key={segment}
            style={buttonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
            onClick={() => scrollToSegment(segment)}
          >
            {segment}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {segments.map((segment, index) => (
          <div
            key={segment}
            ref={(el) => (segmentRefs.current[segment] = el)} // Set the ref for each segment
            style={fadeInStyle(index)} // Applying fade-in animation inline
            className="space-y-4"
          >
            <h2 style={h2Style}>{segment}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories[segment]?.map((category) => (
                <Link
                  key={category.name}
                  to={`/products/${segment}/${category.name}`}
                  className="category-link"
                  style={{ display: 'block' }} // Ensuring the link is a block element
                >
                  <div
                    className="category-card"
                    style={cardHoverStyle} // Applying card hover effect inline
                  >
                    <img
                      src={category.image instanceof File ? URL.createObjectURL(category.image) : category.image}
                      alt={category.name}
                      className="category-image"
                      style={cardImageStyle} // Image styling inline
                    />
                    <div style={categoryContentStyle}>
                      <h3 style={h3Style}>{category.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
