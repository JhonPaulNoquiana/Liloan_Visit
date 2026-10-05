let currentIndex = 0;

function showImage(index) {
    const wrapper = document.querySelector('.image-wrapper');
    const images = document.querySelectorAll('.slider-image');
    const totalImages = images.length;

    // Loop around if index goes out of bounds
    if (index < 0) {
        currentIndex = totalImages - 1;
    } else if (index >= totalImages) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    // Move the wrapper to show the current image
    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function prevImage() {
    showImage(currentIndex - 1);
}

function nextImage() {
    showImage(currentIndex + 1);
}

// Initialize the slider
showImage(currentIndex);
