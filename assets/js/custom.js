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

    // Contact form handling
    $(document).ready(function() {
        $('#send-message').on('click', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = $('#name').val();
            const email = $('#email').val();
            const subject = $('#subject').val();
            const message = $('#comment').val();
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Here you would typically send the data to your server
            // For now, we'll just show an alert
            alert('Message sent successfully!');
            
            // Clear the form
            $('#contact-form')[0].reset();
        });
    });

    // Rating Widget functionality
    $(document).ready(function() {
        const btn = document.querySelector("button");
        const post = document.querySelector(".post");
        const widget = document.querySelector(".star-widget");
        const editBtn = document.querySelector(".edit");

        btn.onclick = (e) => {
            e.preventDefault();
            widget.style.display = "none";
            post.style.display = "block";
            editBtn.onclick = () => {
                widget.style.display = "block";
                post.style.display = "none";
            }
            return false;
        }
    });

    // Matrix rain effect
    function setupMatrixRain() {
        const canvas = document.getElementById('matrix-canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        return setInterval(draw, 33);
    }

    // Loading sequence
    window.addEventListener('load', function() {
        const loaderWrapper = document.querySelector('.loader-wrapper');
        const loadingStatus = document.querySelector('.loading-status');
        const matrixInterval = setupMatrixRain();
        
        // Loading status messages
        const statusMessages = [
            "Accessing mainframe...",
            "Bypassing security...",
            "Decrypting data...",
            "Establishing connection...",
            "Access granted!"
        ];

        let messageIndex = 0;
        
        // Update status messages
        const statusInterval = setInterval(() => {
            if (messageIndex < statusMessages.length) {
                loadingStatus.textContent = statusMessages[messageIndex];
                messageIndex++;
            }
        }, 500);

        // Complete loading sequence
        setTimeout(() => {
            clearInterval(statusInterval);
            clearInterval(matrixInterval);
            loaderWrapper.classList.add('fade-out');
            
            setTimeout(() => {
                loaderWrapper.style.display = 'none';
                document.body.style.overflow = 'visible';
            }, 500);
        }, 3000);
    });

    // Hide scrollbar during loading
    document.body.style.overflow = 'hidden';
});
