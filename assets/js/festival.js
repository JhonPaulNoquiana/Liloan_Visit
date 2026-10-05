let index = 0;
const images = document.querySelectorAll('.fest-wrapper a');
const totalImages = images.length;

// Function to move to the next image
function nextSlide() {
    if (index < totalImages - 1) {
        index++;
    } else {
        index = 0;
    }
    updateSlidePosition();
}

// Function to move to the previous image
function prevSlide() {
    if (index > 0) {
        index--;
    } else {
        index = totalImages - 1;
    }
    updateSlidePosition();
}

// Function to update the transform position of the wrapper
function updateSlidePosition() {
    const offset = -index * 10; // 10% per image
    document.querySelector('.fest-wrapper').style.transform = `translateX(${offset}%)`;
}

// Initially set the wrapper to the first image
updateSlidePosition();
