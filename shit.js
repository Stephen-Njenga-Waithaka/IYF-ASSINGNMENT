document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        // Save user preference
        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        }
    });

    // Apply saved theme on load
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    // Overlay functionality (for Book Session & My Sessions)
    const navOverlayTriggers = document.querySelectorAll('.nav-overlay-trigger');
    const overlays = document.querySelectorAll('.overlay');
    const closeOverlayButtons = document.querySelectorAll('.close-overlay');

    navOverlayTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor link behavior
            const targetId = this.getAttribute('href').substring(1); // Get target section ID
            const targetOverlay = document.getElementById(targetId);

            if (targetOverlay) {
                targetOverlay.classList.add('visible');
                body.classList.add('no-scroll'); // Disable scrolling on body
            }
        });
    });

    closeOverlayButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parentOverlay = this.closest('.overlay');
            if (parentOverlay) {
                parentOverlay.classList.remove('visible');
                body.classList.remove('no-scroll'); // Enable scrolling on body
            }
        });
    });

    // Close overlay if clicked outside content
    overlays.forEach(overlay => {
        overlay.addEventListener('click', function(event) {
            // Check if the click occurred directly on the overlay background
            if (event.target === this) {
                this.classList.remove('visible');
                body.classList.remove('no-scroll');
            }
        });
    });

    // FAQ Accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item'); // Get the parent .faq-item
            const faqAnswer = faqItem.querySelector('.faq-answer'); // Get the answer div

            // Toggle the 'active' class on the faq-item
            faqItem.classList.toggle('active');

            // Set max-height for smooth transition
            if (faqItem.classList.contains('active')) {
                // When opening, set max-height to the actual scrollHeight
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
            } else {
                // When closing, set max-height to 0
                faqAnswer.style.maxHeight = '0';
            }
        });
    });

    // Example of handling a form submission (for the booking overlay)
    const sessionBookingForm = document.querySelector('.session-booking-form');
    if (sessionBookingForm) {
        sessionBookingForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const serviceType = document.getElementById('service-type').value;
            const preferredDate = document.getElementById('preferred-date').value;
            const preferredTime = document.getElementById('preferred-time').value;
            const clientName = document.getElementById('name-booking').value;
            const clientEmail = document.getElementById('email-booking').value;

            if (!serviceType || !preferredDate || !preferredTime || !clientName || !clientEmail) {
                alert('Please fill in all booking details.');
                return;
            }

            // In a real application, you'd send this data to a server
            console.log('Booking request:', { serviceType, preferredDate, preferredTime, clientName, clientEmail });

            // Simulate adding to "My Sessions" (for demonstration)
            const sessionList = document.getElementById('session-list');
            const noSessionsMsg = sessionList.querySelector('.no-sessions-msg');
            if (noSessionsMsg) {
                noSessionsMsg.remove();
            }

            const newSessionItem = document.createElement('div');
            newSessionItem.classList.add('session-item');
            newSessionItem.innerHTML = `
                <div class="session-info">
                    <span>${serviceType}</span>
                    <small>${preferredDate} at ${preferredTime}</small>
                    <small>Client: ${clientName}</small>
                </div>
                <button class="delete-session" aria-label="Delete session"><i class="fas fa-trash"></i></button>
            `;
            sessionList.appendChild(newSessionItem);

            // Add event listener for the new delete button
            newSessionItem.querySelector('.delete-session').addEventListener('click', function() {
                newSessionItem.remove();
                if (sessionList.children.length === 0) {
                    const msg = document.createElement('p');
                    msg.classList.add('no-sessions-msg');
                    msg.textContent = 'You currently have no scheduled sessions.';
                    sessionList.appendChild(msg);
                }
            });

            alert('Session requested successfully! We will contact you to confirm.');
            sessionBookingForm.reset(); // Clear the form
            document.getElementById('book-session').classList.remove('visible'); // Close the booking overlay
            body.classList.remove('no-scroll');
        });
    }

    // Example of handling contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                alert('Please fill in all required contact fields (Name, Email, Message).');
                return;
            }

            // In a real application, you'd send this data to a server
            console.log('Contact form submission:', { name, email, subject, message });

            alert('Your message has been sent successfully!');
            contactForm.reset(); // Clear the form
        });
    }
});