$(document).ready(function () {
    "use strict";

    /**
     * Clients Section Carousel Logic
     * - Ensures the active item is centered.
     * - Applies blur and scale effects to carousel items.
     */

    const carousel = $("#client-carousel");
    const items = carousel.find(".item");
    const totalItems = items.length;
    let activeIndex = 0;

    // Function to update the carousel display
    function updateCarousel() {
        items.removeClass("active").css({
            filter: "blur(5px)",       // Apply blur to all items
            opacity: 0.5,              // Dim all items
            transform: "scale(1)",     // Reset scaling
            zIndex: 1                 // Reset z-index for all items
        });

        // The active item remains in the center
        const activeItem = items.eq(activeIndex);
        activeItem.addClass("active").css({
            filter: "blur(0)",        // Remove blur for active item
            opacity: 1,               // Full opacity for active item
            transform: "scale(1.3)",  // Scale up the active item
            zIndex: 2                 // Bring active item to the front
        });

        // Calculate the offset to center the active item
        const itemWidth = items.outerWidth(true);  // Include margin between items
        const gap = 30;  // Space between items
        const totalWidth = (itemWidth + gap) * totalItems; // Full width of the carousel items including gap
        const centerPosition = (window.innerWidth - itemWidth) / 2; // Center the active item on screen

        // Adjust the carousel offset to keep the active item centered
        const offset = (centerPosition - (activeIndex * (itemWidth + gap)));

        // Update carousel position using translateX for smooth scrolling
        carousel.css("transform", `translateX(${offset}px)`);
    }

    // Left navigation button functionality
    $(".nav-btn.left").on("click", function () {
        // Move to the previous item, and loop around if at the beginning
        activeIndex = (activeIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    // Right navigation button functionality
    $(".nav-btn.right").on("click", function () {
        // Move to the next item, and loop around if at the end
        activeIndex = (activeIndex + 1) % totalItems;
        updateCarousel();
    });

    // Initialize the carousel with the default state
    updateCarousel();
});
