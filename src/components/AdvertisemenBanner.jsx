import React, { useState, useEffect } from 'react';

const AdvertisementBanner = () => {
  // Hardcoded ads with direct paths
  const ads = [
    { image: '/images/ad1.png' },
    { image: '/images/ad2.png' },
    { image: '/images/ad3.png' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic scroll every 4 seconds for a smooth transition
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === ads.length - 1 ? 0 : prevIndex + 1));
    }, 4000); // Change every 4 seconds

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [ads.length]);

  return (
    <div style={bannerContainerStyle}>
      <div style={scrollWrapperStyle}>
        <div
          style={{
            ...scrollStyle,
            transform: `translateX(-${currentIndex * 100}%)`, // Smooth horizontal movement
            transition: 'transform 1s ease-in-out', // Seamless effect
          }}
        >
          {ads.map((ad, index) => (
            <div key={index} style={adStyle}>
              <img src={ad.image} alt={`Advertisement ${index}`} style={imageStyle} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Styles
const bannerContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '90%', // Short margins on left and right
  margin: '20px auto', // Adds 20px gap above the banner and centers it horizontally
  borderRadius: '10px', // Slightly smaller curve
  overflow: 'hidden', // Ensures no overflow
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Subtle shadow for a polished look
  height: '300px', // Maintains the same height
};

const scrollWrapperStyle = {
  width: '100%', // Full width of the banner container
  overflow: 'hidden', // Hide off-screen content
};

const scrollStyle = {
  display: 'flex', // Align ads side by side
};

const adStyle = {
  flexShrink: 0, // Prevent images from shrinking
  width: '100%', // Each ad takes up the full width of the banner container
  height: '300px', // Consistent height for the banner
  position: 'relative', // Stack ads side by side
};

const imageStyle = {
  width: '100%', // Ensure the image fills the container width
  height: '100%', // Fill the height of the banner
  objectFit: 'cover', // Prevent stretching while filling the container
  borderRadius: '10px', // Slightly smaller curved edges for each ad
};

// Export the AdvertisementBanner component
export default AdvertisementBanner;
