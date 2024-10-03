import { useState, useEffect } from 'react';
import './UploadImage.css';

const UploadImage = ({ onImagesChange }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState('');

  useEffect(() => {
    onImagesChange(images);
  }, [images, onImagesChange]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));

    const newImages = [];
    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push({ dataUrl: reader.result, file }); 
        if (newImages.length === imageFiles.length) {
          setImages((prevImages) => [...prevImages, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const goToNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setAnimationDirection('next');
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length + 1)); 
        setIsAnimating(false);
      }, 500);
    }
  };

  const goToPrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setAnimationDirection('prev');
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + (images.length + 1)) % (images.length + 1)); 
        setIsAnimating(false);
      }, 500);
    }
  };

  const goToImage = (index) => {
    if (!isAnimating && index <= images.length) {
      setAnimationDirection(index > currentIndex ? 'next' : 'prev');
      setCurrentIndex(index);
    }
  };

  const handleDelete = () => {
    if (images.length > 0) {
      const updatedImages = images.filter((_, index) => index !== currentIndex);
      setImages(updatedImages);
      setCurrentIndex((prevIndex) => (prevIndex >= updatedImages.length ? updatedImages.length : prevIndex));
    }
  };

  return (
    <div className="upload-container">
      {images.length > 0 && currentIndex < images.length ? (
        <div className="counter-outside">
          {currentIndex + 1}/{images.length}
        </div>
      ) : (
        <div className="counter-outside hidden"></div>
      )}

      <div className="drag-container" onDragOver={handleDragOver} onDrop={handleDrop}>
        {images.length > 0 && currentIndex < images.length ? (
          <>
            <div
              className={`image-wrapper ${
                isAnimating
                  ? animationDirection === 'next'
                    ? 'animating-next'
                    : 'animating-prev'
                  : ''
              }`}
            >
              <img src={images[currentIndex].dataUrl} alt="Preview" className="image-preview" />
            </div>

            <div className="image-buttons">
              <button className="image-button">1/N로 계산</button>
              <button className="image-button" onClick={handleDelete}>삭제</button>
            </div>
          </>
        ) : (
          <div className="add-image-screen">
            <p>여기에 이미지를 드래그하여 추가하세요.</p>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="navigation-container">
          <button className="nav-button left" onClick={goToPrev}>
            &lt;
          </button>
          <button className="nav-button right" onClick={goToNext}>
            &gt;
          </button>
        </div>
      )}

      {images.length > 0 && (
        <div className="dots-container-outside">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => goToImage(index)}
            ></span>
          ))}
          <span
            className={`dot ${currentIndex === images.length ? 'active' : ''}`}
            onClick={() => goToImage(images.length)}
          ></span>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
