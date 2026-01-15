/**
 * Auto Elite - Main JavaScript
 * Handles all frontend functionality
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize the application
    initApp();
});

function initApp() {
    // Track page view
    dataManager.trackPageView();

    // Load site configuration
    loadSiteConfig();

    // Initialize components
    initLoader();
    initParticles();
    initHeader();
    initMobileMenu();
    initScrollEffects();
    initFilterTabs();
    initModal();
    initWhatsappButtons();

    // Load dynamic content
    loadVehicles();
    loadTestimonials();
}

// ==========================================
// LOADER
// ==========================================
function initLoader() {
    const loader = document.getElementById('loader');

    window.addEventListener('load', function () {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1000);
    });
}

// ==========================================
// PARTICLES
// ==========================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 20) + 's';
        particlesContainer.appendChild(particle);
    }
}

// ==========================================
// LOAD SITE CONFIGURATION
// ==========================================
function loadSiteConfig() {
    const config = dataManager.getConfig();
    if (!config) return;

    // Apply theme colors
    applyThemeColors(config);

    // Apply typography
    applyTypography(config);

    // Update site identity
    updateSiteIdentity(config);

    // Update contact info
    updateContactInfo(config);

    // Update hero section
    updateHeroSection(config);

    // Update stats
    updateStats(config);

    // Update section titles
    updateSectionTitles(config);

    // Update footer
    updateFooter(config);
}

function applyThemeColors(config) {
    const root = document.documentElement;

    if (config.primaryColor) root.style.setProperty('--primary-color', config.primaryColor);
    if (config.primaryLight) root.style.setProperty('--primary-light', config.primaryLight);
    if (config.primaryDark) root.style.setProperty('--primary-dark', config.primaryDark);
    if (config.accentColor) {
        root.style.setProperty('--accent-color', config.accentColor);
        // Update accent glow
        const rgb = hexToRgb(config.accentColor);
        if (rgb) {
            root.style.setProperty('--accent-glow', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`);
        }
    }
    if (config.secondaryColor) root.style.setProperty('--secondary-color', config.secondaryColor);
    if (config.goldColor) root.style.setProperty('--gold-color', config.goldColor);
    if (config.successColor) root.style.setProperty('--success-color', config.successColor);
}

function applyTypography(config) {
    const root = document.documentElement;

    if (config.fontPrimary) {
        root.style.setProperty('--font-primary', `'${config.fontPrimary}', sans-serif`);
        loadGoogleFont(config.fontPrimary);
    }
    if (config.fontSecondary) {
        root.style.setProperty('--font-secondary', `'${config.fontSecondary}', sans-serif`);
        loadGoogleFont(config.fontSecondary);
    }
    if (config.fontAccent) {
        root.style.setProperty('--font-accent', `'${config.fontAccent}', serif`);
        loadGoogleFont(config.fontAccent);
    }
}

function loadGoogleFont(fontName) {
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(' ', '+')}:wght@400;500;600;700;800&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
}

function updateSiteIdentity(config) {
    // Logo
    const siteLogo = document.getElementById('siteLogo');
    const footerLogo = document.getElementById('footerLogo');

    if (config.logoUrl) {
        if (siteLogo) {
            siteLogo.src = config.logoUrl;
            siteLogo.style.display = 'block';
        }
        if (footerLogo) {
            footerLogo.src = config.logoUrl;
            footerLogo.style.display = 'block';
        }
    }

    // Logo text
    const logoText = document.getElementById('logoText');
    const footerLogoText = document.getElementById('footerLogoText');
    const loaderLogoText = document.getElementById('loaderLogoText');

    if (config.siteName) {
        if (logoText) logoText.textContent = config.siteName;
        if (footerLogoText) footerLogoText.textContent = config.siteName;
        if (loaderLogoText) loaderLogoText.textContent = config.siteName;
        document.title = `${config.siteName} | ${config.siteDescription || 'Concessionária Premium'}`;
    }
}

function updateContactInfo(config) {
    // Header phone
    const headerPhone = document.getElementById('headerPhone');
    if (headerPhone && config.phone) {
        headerPhone.textContent = config.phone;
        headerPhone.href = `tel:${config.phone.replace(/\D/g, '')}`;
    }

    // Header location
    const headerLocation = document.getElementById('headerLocation');
    if (headerLocation && config.city) {
        headerLocation.textContent = config.city;
    }

    // Header hours
    const headerHours = document.getElementById('headerHours');
    if (headerHours && config.workingHours) {
        headerHours.textContent = config.workingHours;
    }
}

function updateHeroSection(config) {
    if (config.heroBadgeText) {
        const heroBadge = document.getElementById('heroBadgeText');
        if (heroBadge) heroBadge.textContent = config.heroBadgeText;
    }

    if (config.heroTitle1) {
        const heroTitle1 = document.getElementById('heroTitle1');
        if (heroTitle1) heroTitle1.textContent = config.heroTitle1;
    }

    if (config.heroTitle2) {
        const heroTitle2 = document.getElementById('heroTitle2');
        if (heroTitle2) heroTitle2.textContent = config.heroTitle2;
    }

    if (config.heroDescription) {
        const heroDescription = document.getElementById('heroDescription');
        if (heroDescription) heroDescription.textContent = config.heroDescription;
    }

    if (config.heroImageUrl) {
        const heroCar = document.getElementById('heroCar');
        if (heroCar) heroCar.src = config.heroImageUrl;
    }
}

function updateStats(config) {
    if (config.stats && config.stats.length >= 4) {
        for (let i = 0; i < 4; i++) {
            const numberEl = document.getElementById(`stat${i + 1}Number`);
            const labelEl = document.getElementById(`stat${i + 1}Label`);

            if (numberEl) numberEl.textContent = config.stats[i].number;
            if (labelEl) labelEl.textContent = config.stats[i].label;
        }
    }
}

function updateSectionTitles(config) {
    // Vehicles section
    updateTextContent('vehiclesSectionSubtitle', config.vehiclesSectionSubtitle);
    updateTextContent('vehiclesSectionTitle', config.vehiclesSectionTitle);
    updateTextContent('vehiclesSectionDescription', config.vehiclesSectionDescription);

    // Features section
    updateTextContent('featuresSectionSubtitle', config.featuresSectionSubtitle);
    updateTextContent('featuresSectionTitle', config.featuresSectionTitle);
    updateTextContent('featuresSectionDescription', config.featuresSectionDescription);

    // Testimonials section
    updateTextContent('testimonialsSectionSubtitle', config.testimonialsSectionSubtitle);
    updateTextContent('testimonialsSectionTitle', config.testimonialsSectionTitle);

    // CTA section
    updateTextContent('ctaTitle', config.ctaTitle);
    updateTextContent('ctaDescription', config.ctaDescription);
}

function updateFooter(config) {
    // Description
    updateTextContent('footerDescription', config.footerDescription);
    updateTextContent('footerCopyright', config.footerCopyright);

    // Contact info
    const footerPhone = document.getElementById('footerPhone');
    if (footerPhone && config.phone) {
        footerPhone.querySelector('span').textContent = config.phone;
    }

    const footerEmail = document.getElementById('footerEmail');
    if (footerEmail && config.email) {
        footerEmail.querySelector('span').textContent = config.email;
    }

    const footerAddress = document.getElementById('footerAddress');
    if (footerAddress && config.address) {
        footerAddress.querySelector('span').textContent = config.address;
    }

    // Social links
    updateSocialLinks(config);
}

function updateSocialLinks(config) {
    const socialLinks = document.querySelectorAll('.social-link');

    socialLinks.forEach(link => {
        const icon = link.querySelector('i');
        if (!icon) return;

        if (icon.classList.contains('fa-facebook-f') && config.facebook) {
            link.href = config.facebook;
        } else if (icon.classList.contains('fa-instagram') && config.instagram) {
            link.href = config.instagram;
        } else if (icon.classList.contains('fa-youtube') && config.youtube) {
            link.href = config.youtube;
        } else if (icon.classList.contains('fa-linkedin-in') && config.linkedin) {
            link.href = config.linkedin;
        }
    });
}

function updateTextContent(elementId, text) {
    const element = document.getElementById(elementId);
    if (element && text) {
        element.textContent = text;
    }
}

// ==========================================
// HEADER
// ==========================================
function initHeader() {
    const header = document.getElementById('header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Update active state
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');

                    // Close mobile menu
                    document.getElementById('navMenu').classList.remove('active');
                }
            }
        });
    });
}

// ==========================================
// MOBILE MENU
// ==========================================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    mobileMenuBtn.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
}

// ==========================================
// SCROLL EFFECTS
// ==========================================
function initScrollEffects() {
    const scrollTopBtn = document.getElementById('scrollTop');

    // Show/hide scroll to top button
    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top
    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Update active nav on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function () {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ==========================================
// FILTER TABS
// ==========================================
function initFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Update active state
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Filter vehicles
            const category = this.dataset.filter;
            loadVehicles(category);
        });
    });
}

// ==========================================
// LOAD VEHICLES
// ==========================================
function loadVehicles(category = 'all') {
    const carsGrid = document.getElementById('carsGrid');
    const vehicles = dataManager.getVehiclesByCategory(category);

    carsGrid.innerHTML = '';

    vehicles.forEach((vehicle, index) => {
        const card = createVehicleCard(vehicle);
        card.style.animationDelay = (index * 0.1) + 's';
        carsGrid.appendChild(card);
    });

    if (vehicles.length === 0) {
        carsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <i class="fas fa-car" style="font-size: 3rem; color: var(--gray-500); margin-bottom: 1rem;"></i>
                <p style="color: var(--gray-400);">Nenhum veículo encontrado nesta categoria.</p>
            </div>
        `;
    }
}

function createVehicleCard(vehicle) {
    const config = dataManager.getConfig();
    const card = document.createElement('div');
    card.className = 'car-card';
    card.dataset.id = vehicle.id;

    const badgeHtml = vehicle.badge ? `
        <span class="car-badge ${vehicle.badge}">
            ${vehicle.badge === 'new' ? 'Novo' : vehicle.badge === 'featured' ? 'Destaque' : 'Vendido'}
        </span>
    ` : '';

    const discountHtml = vehicle.discount ? `
        <span class="car-price-tag">-${vehicle.discount}%</span>
    ` : '';

    card.innerHTML = `
        ${badgeHtml}
        <div class="car-image-container">
            <img src="${vehicle.images[0]}" alt="${vehicle.brand} ${vehicle.model}" class="car-image" loading="lazy">
            <div class="car-image-overlay"></div>
            <button class="car-quick-view" aria-label="Ver detalhes">
                <i class="fas fa-eye"></i>
            </button>
        </div>
        <div class="car-content">
            <span class="car-brand">${vehicle.brand}</span>
            <h3 class="car-title">${vehicle.model}</h3>
            <div class="car-specs">
                <span class="car-spec"><i class="fas fa-calendar"></i> ${vehicle.year}</span>
                <span class="car-spec"><i class="fas fa-tachometer-alt"></i> ${vehicle.mileage}</span>
                <span class="car-spec"><i class="fas fa-gas-pump"></i> ${vehicle.fuel}</span>
                <span class="car-spec"><i class="fas fa-cog"></i> ${vehicle.transmission}</span>
            </div>
            <div class="car-price-container">
                <div class="car-price">
                    ${vehicle.priceOld ? `<span class="car-price-old">${formatCurrency(vehicle.priceOld)}</span>` : ''}
                    <span class="car-price-current">${formatCurrency(vehicle.priceCurrent)}</span>
                </div>
                ${discountHtml}
            </div>
        </div>
    `;

    // Add click event for quick view
    const quickViewBtn = card.querySelector('.car-quick-view');
    quickViewBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        openVehicleModal(vehicle);
    });

    // Add click event for card
    card.addEventListener('click', function () {
        openVehicleModal(vehicle);
    });

    return card;
}

// ==========================================
// MODAL
// ==========================================
function initModal() {
    const modalOverlay = document.getElementById('carModal');
    const modalClose = document.getElementById('modalClose');

    modalClose.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function openVehicleModal(vehicle) {
    const config = dataManager.getConfig();
    const modalOverlay = document.getElementById('carModal');

    // Track vehicle view
    dataManager.trackVehicleView(vehicle.id);

    // Update modal content
    document.getElementById('modalCarImage').src = vehicle.images[0];
    document.getElementById('modalCarImage').alt = `${vehicle.brand} ${vehicle.model}`;
    document.getElementById('modalBadge').textContent = vehicle.badge === 'new' ? 'Novo' : vehicle.badge === 'featured' ? 'Destaque' : vehicle.category.toUpperCase();
    document.getElementById('modalTitle').textContent = `${vehicle.brand} ${vehicle.model}`;

    // Update specs
    const specsHtml = `
        <div class="modal-spec">
            <i class="fas fa-calendar"></i>
            <div>
                <span class="modal-spec-value">${vehicle.year}</span>
                <span class="modal-spec-label">Ano</span>
            </div>
        </div>
        <div class="modal-spec">
            <i class="fas fa-tachometer-alt"></i>
            <div>
                <span class="modal-spec-value">${vehicle.mileage}</span>
                <span class="modal-spec-label">Quilometragem</span>
            </div>
        </div>
        <div class="modal-spec">
            <i class="fas fa-gas-pump"></i>
            <div>
                <span class="modal-spec-value">${vehicle.fuel}</span>
                <span class="modal-spec-label">Combustível</span>
            </div>
        </div>
        <div class="modal-spec">
            <i class="fas fa-cog"></i>
            <div>
                <span class="modal-spec-value">${vehicle.transmission}</span>
                <span class="modal-spec-label">Câmbio</span>
            </div>
        </div>
        <div class="modal-spec">
            <i class="fas fa-palette"></i>
            <div>
                <span class="modal-spec-value">${vehicle.color}</span>
                <span class="modal-spec-label">Cor</span>
            </div>
        </div>
        <div class="modal-spec">
            <i class="fas fa-car-side"></i>
            <div>
                <span class="modal-spec-value">${vehicle.engine}</span>
                <span class="modal-spec-label">Motor</span>
            </div>
        </div>
    `;
    document.getElementById('modalSpecs').innerHTML = specsHtml;

    // Update prices
    if (vehicle.priceOld) {
        document.getElementById('modalPriceOld').textContent = `De ${formatCurrency(vehicle.priceOld)}`;
        document.getElementById('modalPriceOld').style.display = 'block';
    } else {
        document.getElementById('modalPriceOld').style.display = 'none';
    }
    document.getElementById('modalPriceCurrent').textContent = formatCurrency(vehicle.priceCurrent);

    // Update WhatsApp button
    const whatsappMessage = `Olá! Tenho interesse no ${vehicle.brand} ${vehicle.model} ${vehicle.year} - ${formatCurrency(vehicle.priceCurrent)}. Podem me enviar mais informações?`;
    document.getElementById('modalWhatsappBtn').href = generateWhatsappLink(config.whatsapp, whatsappMessage);
    document.getElementById('modalWhatsappBtn').onclick = function () {
        dataManager.trackWhatsappClick();
    };

    // Show modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modalOverlay = document.getElementById('carModal');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ==========================================
// LOAD TESTIMONIALS
// ==========================================
function loadTestimonials() {
    const slider = document.getElementById('testimonialsSlider');
    const testimonials = dataManager.getTestimonials();

    if (!testimonials || testimonials.length === 0) return;

    slider.innerHTML = '';

    testimonials.forEach(testimonial => {
        const card = createTestimonialCard(testimonial);
        slider.appendChild(card);
    });
}

function createTestimonialCard(testimonial) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';

    const fullStars = Math.floor(testimonial.rating);
    const hasHalfStar = testimonial.rating % 1 !== 0;

    let starsHtml = '';
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        starsHtml += '<i class="fas fa-star-half-alt"></i>';
    }

    card.innerHTML = `
        <div class="testimonial-header">
            <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">
            <div class="testimonial-author">
                <div class="testimonial-name">${testimonial.name}</div>
                <div class="testimonial-role">${testimonial.role}</div>
            </div>
            <div class="testimonial-rating">
                ${starsHtml}
            </div>
        </div>
        <p class="testimonial-text">${testimonial.text}</p>
    `;

    return card;
}

// ==========================================
// WHATSAPP BUTTONS
// ==========================================
function initWhatsappButtons() {
    const config = dataManager.getConfig();

    // Float button
    const whatsappFloat = document.getElementById('whatsappFloat');
    whatsappFloat.href = generateWhatsappLink(config.whatsapp, 'Olá! Gostaria de mais informações sobre os veículos disponíveis.');
    whatsappFloat.addEventListener('click', function () {
        dataManager.trackWhatsappClick();
    });

    // Hero button
    const heroWhatsappBtn = document.getElementById('heroWhatsappBtn');
    heroWhatsappBtn.href = generateWhatsappLink(config.whatsapp, 'Olá! Vi o site de vocês e gostaria de conhecer os veículos disponíveis.');
    heroWhatsappBtn.addEventListener('click', function () {
        dataManager.trackWhatsappClick();
    });

    // CTA button
    const ctaWhatsappBtn = document.getElementById('ctaWhatsappBtn');
    ctaWhatsappBtn.href = generateWhatsappLink(config.whatsapp, 'Olá! Gostaria de falar com um consultor sobre veículos.');
    ctaWhatsappBtn.addEventListener('click', function () {
        dataManager.trackWhatsappClick();
    });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Initialize Google Maps (if API key is provided)
function initMap() {
    const config = dataManager.getConfig();
    const mapContainer = document.getElementById('map');

    if (!mapContainer) return;

    // If map embed URL is provided, use iframe
    if (config.mapEmbed) {
        mapContainer.innerHTML = `<iframe src="${config.mapEmbed}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
    } else {
        // Show placeholder
        mapContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: var(--primary-dark);">
                <div style="text-align: center; color: var(--gray-400);">
                    <i class="fas fa-map-marker-alt" style="font-size: 3rem; margin-bottom: 1rem; color: var(--accent-color);"></i>
                    <p>${config.address || 'Localização não configurada'}</p>
                </div>
            </div>
        `;
    }
}

// Call initMap after page load
window.addEventListener('load', initMap);
