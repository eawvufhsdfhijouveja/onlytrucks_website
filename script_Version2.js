// ==================== MODAL FUNCTIONALITY ====================
const discordModal = document.getElementById('discordModal');
const applyBtns = document.querySelectorAll('#applyBtn, #applyBtnHero');
const closeBtn = document.querySelector('.close');

// Open modal on page load
window.addEventListener('load', () => {
    // Voeg een kleine vertraging toe zodat het natuur voelt
    setTimeout(() => {
        discordModal.classList.add('active');
    }, 500);
});

// Open modal when clicking apply button
applyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        discordModal.classList.add('active');
    });
});

// Close modal when clicking the X
closeBtn.addEventListener('click', () => {
    discordModal.classList.remove('active');
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === discordModal) {
        discordModal.classList.remove('active');
    }
});

// ==================== HAMBURGER MENU ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
const navLinks = navMenu.querySelectorAll('a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== FAQ ACCORDION ====================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const answer = question.nextElementSibling;

        // Close other open items
        faqQuestions.forEach(otherQuestion => {
            if (otherQuestion !== question) {
                otherQuestion.classList.remove('active');
                otherQuestion.parentElement.classList.remove('active');
                otherQuestion.nextElementSibling.classList.remove('active');
            }
        });

        // Toggle current item
        question.classList.toggle('active');
        faqItem.classList.toggle('active');
        answer.classList.toggle('active');
    });
});

// ==================== GALLERY FUNCTIONALITY ====================
const galleryContainer = document.getElementById('galleryContainer');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const imageModalClose = document.querySelector('.image-modal-close');

// Gallery data structure
// Voeg hier je afbeeldingen toe per maand
const galleryData = {
    'Februari 2026': [
        'INSERT_IMAGE_URL_1',
        'INSERT_IMAGE_URL_2',
        // Voeg meer afbeeldingen toe
    ],
    'Januari 2026': [
        'INSERT_IMAGE_URL_1',
        // Voeg meer afbeeldingen toe
    ]
};

// Render gallery
function renderGallery() {
    galleryContainer.innerHTML = '';
    
    Object.entries(galleryData).forEach(([month, images]) => {
        // Skip maanden zonder afbeeldingen
        if (images.length === 0) return;

        const monthSection = document.createElement('div');
        monthSection.className = 'gallery-month';

        const monthTitle = document.createElement('h3');
        monthTitle.textContent = month;
        monthSection.appendChild(monthTitle);

        const gridContainer = document.createElement('div');
        gridContainer.className = 'gallery-grid';

        images.forEach(imageUrl => {
            const item = document.createElement('div');
            item.className = 'gallery-item';

            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = `Gallery image from ${month}`;

            img.addEventListener('click', () => {
                modalImage.src = imageUrl;
                imageModal.classList.add('active');
            });

            item.appendChild(img);
            gridContainer.appendChild(item);
        });

        monthSection.appendChild(gridContainer);
        galleryContainer.appendChild(monthSection);
    });
}

// Close image modal
if (imageModalClose) {
    imageModalClose.addEventListener('click', () => {
        imageModal.classList.remove('active');
    });
}

window.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        imageModal.classList.remove('active');
    }
});

// Render gallery on page load
if (galleryContainer) {
    renderGallery();
}

// ==================== STATS API (Placeholder) ====================
// Vervang deze met je werkelijke Trucksbook API call
function updateStats() {
    // Voorbeeld: vervang dit met je API call
    const totalDistance = document.getElementById('totalDistance');
    const totalDrivers = document.getElementById('totalDrivers');
    const jobsCompleted = document.getElementById('jobsCompleted');

    if (totalDistance) totalDistance.textContent = '0 KM';
    if (totalDrivers) totalDrivers.textContent = '0';
    if (jobsCompleted) jobsCompleted.textContent = '0';

    // Hier kun je je Trucksbook API call toevoegen:
    // fetch('YOUR_API_ENDPOINT')
    //     .then(response => response.json())
    //     .then(data => {
    //         totalDistance.textContent = data.distance + ' KM';
    //         totalDrivers.textContent = data.drivers;
    //         jobsCompleted.textContent = data.jobs;
    //     })
    //     .catch(error => console.error('Error fetching stats:', error));
}

// Update stats on page load
window.addEventListener('load', updateStats);

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const formMessage = document.getElementById('formMessage');

        // Validate form
        if (!name || !email || !subject || !message) {
            formMessage.textContent = 'Vul alstublieft alle velden in';
            formMessage.className = 'error';
            formMessage.style.display = 'block';
            return;
        }

        // Hier kun je je form submission handler toevoegen
        // Voor nu, tonen we alleen een success message
        formMessage.textContent = 'Bedankt voor je bericht! We nemen binnenkort contact op.';
        formMessage.className = 'success';
        formMessage.style.display = 'block';

        // Reset form
        contactForm.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);

        // Voorbeeld: fetch call naar je backend
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ name, email, subject, message })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     formMessage.textContent = 'Bedankt voor je bericht!';
        //     formMessage.className = 'success';
        //     formMessage.style.display = 'block';
        //     contactForm.reset();
        // })
        // .catch(error => {
        //     formMessage.textContent = 'Er is een fout opgetreden. Probeer het later opnieuw.';
        //     formMessage.className = 'error';
        //     formMessage.style.display = 'block';
        // });
    });
}