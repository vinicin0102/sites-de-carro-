/**
 * Auto Elite - Admin Panel JavaScript
 * Complete administration functionality
 */

// Global variables
let currentCropper = null;
let cropCallback = null;
let vehicleImages = [];

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initMobileMenu();
    initForms();
    initVehicleManagement();
    initTestimonialManagement();
    initImageCropper();
    initColorPickers();
    initFontPreviews();
    initDataManagement();

    // Load initial data
    loadDashboardData();
    loadAllFormData();
});

// ==========================================
// NAVIGATION
// ==========================================
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-panel]');

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            const panelId = this.dataset.panel;
            showPanel(panelId);

            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            // Update page title
            document.getElementById('pageTitle').textContent = this.querySelector('span').textContent;

            // Close mobile menu
            closeMobileMenu();
        });
    });
}

function showPanel(panelId) {
    const panels = document.querySelectorAll('.admin-panel');
    panels.forEach(panel => panel.classList.remove('active'));

    const targetPanel = document.getElementById('panel-' + panelId);
    if (targetPanel) {
        targetPanel.classList.add('active');

        // Load panel-specific data
        switch (panelId) {
            case 'dashboard':
                loadDashboardData();
                break;
            case 'vehicles':
                loadVehiclesTable();
                break;
            case 'testimonials':
                loadTestimonialsList();
                break;
            case 'reports':
                loadReportsData();
                break;
        }
    }

    // Update nav active state
    const navItems = document.querySelectorAll('.nav-item[data-panel]');
    navItems.forEach(item => {
        if (item.dataset.panel === panelId) {
            item.classList.add('active');
            document.getElementById('pageTitle').textContent = item.querySelector('span').textContent;
        } else {
            item.classList.remove('active');
        }
    });
}

// ==========================================
// MOBILE MENU
// ==========================================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('adminSidebar');
    const overlay = document.getElementById('sidebarOverlay');

    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close on overlay click
    overlay.addEventListener('click', function () {
        closeMobileMenu();
    });

    // Close on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const sidebar = document.getElementById('adminSidebar');
    const overlay = document.getElementById('sidebarOverlay');

    const isOpen = sidebar.classList.contains('active');

    if (isOpen) {
        closeMobileMenu();
    } else {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    const sidebar = document.getElementById('adminSidebar');
    const overlay = document.getElementById('sidebarOverlay');

    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ==========================================
// DASHBOARD
// ==========================================
function loadDashboardData() {
    const analytics = dataManager.getAnalytics();
    const vehicles = dataManager.getVehicles() || [];

    // Update stats
    document.getElementById('statTotalViews').textContent = analytics?.totalViews || 0;
    document.getElementById('statWhatsappClicks').textContent = analytics?.whatsappClicks || 0;
    document.getElementById('statTotalVehicles').textContent = vehicles.length;
    document.getElementById('statFeaturedVehicles').textContent = vehicles.filter(v => v.featured).length;

    // Load top vehicles
    loadTopVehicles();
}

function loadTopVehicles() {
    const analytics = dataManager.getAnalytics();
    const vehicles = dataManager.getVehicles() || [];
    const container = document.getElementById('topVehiclesList');

    if (!analytics?.vehicleViews || Object.keys(analytics.vehicleViews).length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="padding: 1rem;">
                <i class="fas fa-chart-bar" style="font-size: 2rem; color: var(--admin-text-muted);"></i>
                <p style="color: var(--admin-text-muted); margin-top: 0.5rem;">Nenhuma visualização registrada ainda.</p>
            </div>
        `;
        return;
    }

    // Sort by views
    const sortedViews = Object.entries(analytics.vehicleViews)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    let html = '';
    sortedViews.forEach(([id, views]) => {
        const vehicle = vehicles.find(v => v.id === parseInt(id));
        if (vehicle) {
            html += `
                <div class="activity-item">
                    <div class="activity-icon view"><i class="fas fa-eye"></i></div>
                    <div class="activity-content">
                        <div class="activity-title">${vehicle.brand} ${vehicle.model}</div>
                        <div class="activity-desc">${views} visualizações</div>
                    </div>
                </div>
            `;
        }
    });

    container.innerHTML = html || '<p style="color: var(--admin-text-muted);">Nenhum dado disponível.</p>';
}

// ==========================================
// FORMS
// ==========================================
function initForms() {
    // Site Identity Form
    document.getElementById('siteIdentityForm').addEventListener('submit', function (e) {
        e.preventDefault();
        saveSiteIdentity();
    });

    // Contact Form
    document.getElementById('contactForm').addEventListener('submit', function (e) {
        e.preventDefault();
        saveContactInfo();
    });

    // Social Form
    document.getElementById('socialForm').addEventListener('submit', function (e) {
        e.preventDefault();
        saveSocialMedia();
    });

    // Theme Form
    document.getElementById('themeForm').addEventListener('submit', function (e) {
        e.preventDefault();
        saveThemeColors();
    });

    // Typography Form
    document.getElementById('typographyForm').addEventListener('submit', function (e) {
        e.preventDefault();
        saveTypography();
    });

    // Hero Content Form
    document.getElementById('heroContentForm').addEventListener('submit', function (e) {
        e.preventDefault();
        saveHeroContent();
    });

    // Stats Content Form
    document.getElementById('statsContentForm').addEventListener('submit', function (e) {
        e.preventDefault();
        saveStatsContent();
    });

    // Section Titles Form
    document.getElementById('sectionTitlesForm').addEventListener('submit', function (e) {
        e.preventDefault();
        saveSectionTitles();
    });

    // Image upload handlers
    initImageUploads();
}

function loadAllFormData() {
    const config = dataManager.getConfig();
    if (!config) return;

    // Site Identity
    setInputValue('siteName', config.siteName);
    setInputValue('siteDescription', config.siteDescription);
    if (config.logoUrl) {
        document.getElementById('logoPreview').innerHTML = `<img src="${config.logoUrl}" alt="Logo">`;
    }
    if (config.heroImageUrl) {
        document.getElementById('heroImagePreview').innerHTML = `<img src="${config.heroImageUrl}" alt="Hero">`;
    }

    // Contact
    setInputValue('contactPhone', config.phone);
    setInputValue('contactWhatsapp', config.whatsapp);
    setInputValue('contactEmail', config.email);
    setInputValue('contactHours', config.workingHours);
    setInputValue('contactAddress', config.address);
    setInputValue('contactCity', config.city);
    setInputValue('contactMapEmbed', config.mapEmbed);

    // Social
    setInputValue('socialFacebook', config.facebook);
    setInputValue('socialInstagram', config.instagram);
    setInputValue('socialYoutube', config.youtube);
    setInputValue('socialLinkedin', config.linkedin);

    // Theme Colors
    setColorValue('themePrimaryColor', config.primaryColor);
    setColorValue('themePrimaryLight', config.primaryLight);
    setColorValue('themePrimaryDark', config.primaryDark);
    setColorValue('themeAccentColor', config.accentColor);
    setColorValue('themeSecondaryColor', config.secondaryColor);
    setColorValue('themeTertiaryColor', config.tertiaryColor);
    setColorValue('themeGoldColor', config.goldColor);
    setColorValue('themeSuccessColor', config.successColor);

    // Theme Effects
    if (config.borderRadius) setInputValue('themeBorderRadius', config.borderRadius);
    if (config.animationSpeed) setInputValue('themeAnimationSpeed', config.animationSpeed);
    
    updateColorPreviews();

    // Typography
    setInputValue('fontPrimary', config.fontPrimary);
    setInputValue('fontSecondary', config.fontSecondary);
    setInputValue('fontAccent', config.fontAccent);

    // Hero Content
    setInputValue('heroBadgeText', config.heroBadgeText);
    setInputValue('heroTitle1', config.heroTitle1);
    setInputValue('heroTitle2', config.heroTitle2);
    setInputValue('heroDescription', config.heroDescription);

    // Stats
    if (config.stats) {
        for (let i = 0; i < 4; i++) {
            if (config.stats[i]) {
                setInputValue(`stat${i + 1}Number`, config.stats[i].number);
                setInputValue(`stat${i + 1}Label`, config.stats[i].label);
            }
        }
    }

    // Section Titles
    setInputValue('vehiclesSectionSubtitle', config.vehiclesSectionSubtitle);
    setInputValue('vehiclesSectionTitle', config.vehiclesSectionTitle);
    setInputValue('vehiclesSectionDescription', config.vehiclesSectionDescription);
    setInputValue('ctaTitle', config.ctaTitle);
    setInputValue('ctaDescription', config.ctaDescription);
    setInputValue('footerDescription', config.footerDescription);
    setInputValue('footerCopyright', config.footerCopyright);
}

function setInputValue(id, value) {
    const element = document.getElementById(id);
    if (element && value !== undefined) {
        element.value = value;
    }
}

function setColorValue(id, value) {
    if (!value) return;
    const colorInput = document.getElementById(id);
    const textInput = document.getElementById(id + 'Text');
    if (colorInput) colorInput.value = value;
    if (textInput) textInput.value = value;
}

// Save Functions
function saveSiteIdentity() {
    const updates = {
        siteName: document.getElementById('siteName').value,
        siteDescription: document.getElementById('siteDescription').value
    };

    dataManager.updateConfig(updates);
    showToast('Identidade do site salva com sucesso!', 'success');
}

function saveContactInfo() {
    const updates = {
        phone: document.getElementById('contactPhone').value,
        whatsapp: document.getElementById('contactWhatsapp').value,
        email: document.getElementById('contactEmail').value,
        workingHours: document.getElementById('contactHours').value,
        address: document.getElementById('contactAddress').value,
        city: document.getElementById('contactCity').value,
        mapEmbed: document.getElementById('contactMapEmbed').value
    };

    dataManager.updateConfig(updates);
    showToast('Informações de contato salvas com sucesso!', 'success');
}

function saveSocialMedia() {
    const updates = {
        facebook: document.getElementById('socialFacebook').value,
        instagram: document.getElementById('socialInstagram').value,
        youtube: document.getElementById('socialYoutube').value,
        linkedin: document.getElementById('socialLinkedin').value
    };

    dataManager.updateConfig(updates);
    showToast('Redes sociais salvas com sucesso!', 'success');
}

function saveThemeColors() {
    const updates = {
        primaryColor: document.getElementById('themePrimaryColor').value,
        primaryLight: document.getElementById('themePrimaryLight').value,
        primaryDark: document.getElementById('themePrimaryDark').value,
        accentColor: document.getElementById('themeAccentColor').value,
        secondaryColor: document.getElementById('themeSecondaryColor').value,
        tertiaryColor: document.getElementById('themeTertiaryColor').value,
        goldColor: document.getElementById('themeGoldColor').value,
        successColor: document.getElementById('themeSuccessColor').value,
        borderRadius: document.getElementById('themeBorderRadius').value,
        animationSpeed: document.getElementById('themeAnimationSpeed').value
    };

    dataManager.updateConfig(updates);
    showToast('Cores do tema salvas com sucesso!', 'success');
}

function saveTypography() {
    const updates = {
        fontPrimary: document.getElementById('fontPrimary').value,
        fontSecondary: document.getElementById('fontSecondary').value,
        fontAccent: document.getElementById('fontAccent').value
    };

    dataManager.updateConfig(updates);
    showToast('Fontes salvas com sucesso!', 'success');
}

function saveHeroContent() {
    const updates = {
        heroBadgeText: document.getElementById('heroBadgeText').value,
        heroTitle1: document.getElementById('heroTitle1').value,
        heroTitle2: document.getElementById('heroTitle2').value,
        heroDescription: document.getElementById('heroDescription').value
    };

    dataManager.updateConfig(updates);
    showToast('Conteúdo do hero salvo com sucesso!', 'success');
}

function saveStatsContent() {
    const stats = [];
    for (let i = 1; i <= 4; i++) {
        stats.push({
            number: document.getElementById(`stat${i}Number`).value,
            label: document.getElementById(`stat${i}Label`).value
        });
    }

    dataManager.updateConfig({ stats });
    showToast('Estatísticas salvas com sucesso!', 'success');
}

function saveSectionTitles() {
    const updates = {
        vehiclesSectionSubtitle: document.getElementById('vehiclesSectionSubtitle').value,
        vehiclesSectionTitle: document.getElementById('vehiclesSectionTitle').value,
        vehiclesSectionDescription: document.getElementById('vehiclesSectionDescription').value,
        ctaTitle: document.getElementById('ctaTitle').value,
        ctaDescription: document.getElementById('ctaDescription').value,
        footerDescription: document.getElementById('footerDescription').value,
        footerCopyright: document.getElementById('footerCopyright').value
    };

    dataManager.updateConfig(updates);
    showToast('Títulos das seções salvos com sucesso!', 'success');
}

// ==========================================
// IMAGE UPLOADS
// ==========================================
function initImageUploads() {
    // Logo upload
    const logoInput = document.getElementById('logoInput');
    logoInput.addEventListener('change', function (e) {
        if (e.target.files[0]) {
            handleImageUpload(e.target.files[0], 'logo', function (base64) {
                dataManager.updateConfig({ logoUrl: base64 });
                document.getElementById('logoPreview').innerHTML = `<img src="${base64}" alt="Logo">`;
                showToast('Logo atualizado com sucesso!', 'success');
            });
        }
    });

    // Hero image upload
    const heroInput = document.getElementById('heroImageInput');
    heroInput.addEventListener('change', function (e) {
        if (e.target.files[0]) {
            handleImageUpload(e.target.files[0], 'hero', function (base64) {
                dataManager.updateConfig({ heroImageUrl: base64 });
                document.getElementById('heroImagePreview').innerHTML = `<img src="${base64}" alt="Hero">`;
                showToast('Imagem do hero atualizada com sucesso!', 'success');
            });
        }
    });

    // Drag and drop
    setupDragDrop('logoUploadArea', logoInput);
    setupDragDrop('heroUploadArea', heroInput);
}

function setupDragDrop(areaId, input) {
    const area = document.getElementById(areaId);

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        area.addEventListener(eventName, preventDefaults);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        area.addEventListener(eventName, () => area.classList.add('dragover'));
    });

    ['dragleave', 'drop'].forEach(eventName => {
        area.addEventListener(eventName, () => area.classList.remove('dragover'));
    });

    area.addEventListener('drop', function (e) {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            input.files = files;
            input.dispatchEvent(new Event('change'));
        }
    });
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleImageUpload(file, type, callback) {
    const reader = new FileReader();
    reader.onload = function (e) {
        openCropModal(e.target.result, type, callback);
    };
    reader.readAsDataURL(file);
}

// ==========================================
// IMAGE CROPPER
// ==========================================
function initImageCropper() {
    const cropModal = document.getElementById('cropModal');
    const cropImage = document.getElementById('cropImage');

    document.getElementById('cropModalClose').addEventListener('click', closeCropModal);
    document.getElementById('cropCancelBtn').addEventListener('click', closeCropModal);

    document.getElementById('cropConfirmBtn').addEventListener('click', function () {
        if (currentCropper && cropCallback) {
            const canvas = currentCropper.getCroppedCanvas({
                maxWidth: 1920,
                maxHeight: 1080
            });
            const base64 = canvas.toDataURL('image/jpeg', 0.8);
            cropCallback(base64);
            closeCropModal();
        }
    });
}

function openCropModal(imageSrc, type, callback) {
    const cropModal = document.getElementById('cropModal');
    const cropImage = document.getElementById('cropImage');

    cropImage.src = imageSrc;
    cropModal.classList.add('active');
    cropCallback = callback;

    // Wait for image to load
    cropImage.onload = function () {
        if (currentCropper) {
            currentCropper.destroy();
        }

        let aspectRatio;
        switch (type) {
            case 'logo':
                aspectRatio = NaN; // Free aspect ratio for logo
                break;
            case 'hero':
                aspectRatio = 16 / 9;
                break;
            case 'vehicle':
                aspectRatio = 16 / 10;
                break;
            default:
                aspectRatio = NaN;
        }

        currentCropper = new Cropper(cropImage, {
            aspectRatio: aspectRatio,
            viewMode: 2,
            autoCropArea: 1,
            responsive: true
        });
    };
}

function closeCropModal() {
    const cropModal = document.getElementById('cropModal');
    cropModal.classList.remove('active');

    if (currentCropper) {
        currentCropper.destroy();
        currentCropper = null;
    }
    cropCallback = null;
}

// ==========================================
// VEHICLE MANAGEMENT
// ==========================================
function initVehicleManagement() {
    const addBtn = document.getElementById('addVehicleBtn');
    const form = document.getElementById('vehicleForm');
    const priceToggle = document.getElementById('priceComparisonToggle');
    const addImageBtn = document.getElementById('addImageBtn');
    const imageInput = document.getElementById('vehicleImageInput');

    addBtn.addEventListener('click', () => openVehicleForm());

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        saveVehicle();
    });

    // Price comparison toggle
    priceToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        const oldPriceGroup = document.getElementById('oldPriceGroup');
        oldPriceGroup.style.display = this.classList.contains('active') ? 'block' : 'none';
    });

    // Image upload
    addImageBtn.addEventListener('click', () => imageInput.click());

    imageInput.addEventListener('change', function (e) {
        if (e.target.files[0]) {
            handleImageUpload(e.target.files[0], 'vehicle', function (base64) {
                vehicleImages.push(base64);
                renderVehicleImageGallery();
            });
        }
    });

    loadVehiclesTable();
}

function loadVehiclesTable() {
    const tbody = document.getElementById('vehiclesTableBody');
    const vehicles = dataManager.getVehicles() || [];

    if (vehicles.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 2rem;">
                    <div class="empty-state">
                        <i class="fas fa-car empty-state-icon"></i>
                        <h4 class="empty-state-title">Nenhum veículo cadastrado</h4>
                        <p class="empty-state-desc">Adicione seu primeiro veículo clicando no botão acima.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    let html = '';
    vehicles.forEach(vehicle => {
        const statusBadge = vehicle.sold
            ? '<span class="table-badge inactive">Vendido</span>'
            : '<span class="table-badge active">Disponível</span>';

        const typeBadge = vehicle.badge
            ? `<span class="table-badge ${vehicle.badge}">${vehicle.badge === 'new' ? 'Novo' : 'Destaque'}</span>`
            : '';

        html += `
            <tr>
                <td>
                    <img src="${vehicle.images[0] || 'https://via.placeholder.com/100x60'}" alt="${vehicle.model}" class="table-image">
                </td>
                <td>
                    <strong>${vehicle.brand} ${vehicle.model}</strong>
                    <br><small style="color: var(--admin-text-muted);">${vehicle.year} • ${vehicle.mileage}</small>
                </td>
                <td>${vehicle.category.toUpperCase()} ${typeBadge}</td>
                <td>
                    ${vehicle.priceOld ? `<small style="text-decoration: line-through; color: var(--admin-text-muted);">${formatCurrency(vehicle.priceOld)}</small><br>` : ''}
                    <strong style="color: var(--admin-success);">${formatCurrency(vehicle.priceCurrent)}</strong>
                </td>
                <td>${statusBadge}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-secondary btn-icon" onclick="editVehicle(${vehicle.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-icon" onclick="deleteVehicle(${vehicle.id})" title="Excluir">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
}

function openVehicleForm(vehicle = null) {
    const formCard = document.getElementById('vehicleFormCard');
    const formTitle = document.getElementById('vehicleFormTitle');

    // Reset form
    document.getElementById('vehicleForm').reset();
    vehicleImages = [];

    if (vehicle) {
        formTitle.textContent = 'Editar Veículo';
        document.getElementById('vehicleId').value = vehicle.id;
        document.getElementById('vehicleBrand').value = vehicle.brand;
        document.getElementById('vehicleModel').value = vehicle.model;
        document.getElementById('vehicleYear').value = vehicle.year;
        document.getElementById('vehicleMileage').value = vehicle.mileage;
        document.getElementById('vehicleFuel').value = vehicle.fuel;
        document.getElementById('vehicleTransmission').value = vehicle.transmission;
        document.getElementById('vehicleColor').value = vehicle.color;
        document.getElementById('vehicleEngine').value = vehicle.engine;
        document.getElementById('vehicleDoors').value = vehicle.doors;
        document.getElementById('vehicleCategory').value = vehicle.category;
        document.getElementById('vehiclePriceCurrent').value = vehicle.priceCurrent;
        document.getElementById('vehicleBadge').value = vehicle.badge || '';
        document.getElementById('vehicleSold').value = vehicle.sold ? 'true' : 'false';
        document.getElementById('vehicleDescription').value = vehicle.description || '';

        if (vehicle.priceOld) {
            document.getElementById('priceComparisonToggle').classList.add('active');
            document.getElementById('oldPriceGroup').style.display = 'block';
            document.getElementById('vehiclePriceOld').value = vehicle.priceOld;
        }

        vehicleImages = vehicle.images || [];
    } else {
        formTitle.textContent = 'Adicionar Veículo';
        document.getElementById('vehicleId').value = '';
        document.getElementById('priceComparisonToggle').classList.remove('active');
        document.getElementById('oldPriceGroup').style.display = 'none';
    }

    renderVehicleImageGallery();
    formCard.style.display = 'block';
    formCard.scrollIntoView({ behavior: 'smooth' });
}

function closeVehicleForm() {
    document.getElementById('vehicleFormCard').style.display = 'none';
}

function renderVehicleImageGallery() {
    const gallery = document.getElementById('vehicleImageGallery');

    let html = '';
    vehicleImages.forEach((img, index) => {
        html += `
            <div class="gallery-item">
                <img src="${img}" alt="Vehicle image ${index + 1}">
                <div class="gallery-item-overlay">
                    <button class="btn btn-danger btn-icon" onclick="removeVehicleImage(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    html += `
        <div class="gallery-add" id="addImageBtn" onclick="document.getElementById('vehicleImageInput').click();">
            <i class="fas fa-plus"></i>
            <span>Adicionar</span>
        </div>
    `;

    gallery.innerHTML = html;
}

function removeVehicleImage(index) {
    vehicleImages.splice(index, 1);
    renderVehicleImageGallery();
}

function saveVehicle() {
    const id = document.getElementById('vehicleId').value;
    const hasComparison = document.getElementById('priceComparisonToggle').classList.contains('active');

    const vehicleData = {
        brand: document.getElementById('vehicleBrand').value,
        model: document.getElementById('vehicleModel').value,
        year: parseInt(document.getElementById('vehicleYear').value),
        mileage: document.getElementById('vehicleMileage').value,
        fuel: document.getElementById('vehicleFuel').value,
        transmission: document.getElementById('vehicleTransmission').value,
        color: document.getElementById('vehicleColor').value,
        engine: document.getElementById('vehicleEngine').value,
        doors: parseInt(document.getElementById('vehicleDoors').value),
        category: document.getElementById('vehicleCategory').value,
        priceOld: hasComparison ? parseInt(document.getElementById('vehiclePriceOld').value) : null,
        priceCurrent: parseInt(document.getElementById('vehiclePriceCurrent').value),
        badge: document.getElementById('vehicleBadge').value,
        sold: document.getElementById('vehicleSold').value === 'true',
        featured: document.getElementById('vehicleBadge').value === 'featured',
        description: document.getElementById('vehicleDescription').value,
        images: vehicleImages.length > 0 ? vehicleImages : ['https://via.placeholder.com/800x500']
    };

    // Calculate discount
    if (vehicleData.priceOld && vehicleData.priceCurrent) {
        vehicleData.discount = Math.round((1 - vehicleData.priceCurrent / vehicleData.priceOld) * 100);
    }

    if (id) {
        // Update existing
        dataManager.updateVehicle(parseInt(id), vehicleData);
        showToast('Veículo atualizado com sucesso!', 'success');
    } else {
        // Add new
        dataManager.addVehicle(vehicleData);
        showToast('Veículo adicionado com sucesso!', 'success');
    }

    closeVehicleForm();
    loadVehiclesTable();
}

function editVehicle(id) {
    const vehicle = dataManager.getVehicleById(id);
    if (vehicle) {
        openVehicleForm(vehicle);
    }
}

function deleteVehicle(id) {
    if (confirm('Tem certeza que deseja excluir este veículo?')) {
        dataManager.deleteVehicle(id);
        showToast('Veículo excluído com sucesso!', 'success');
        loadVehiclesTable();
    }
}

// ==========================================
// TESTIMONIAL MANAGEMENT
// ==========================================
function initTestimonialManagement() {
    const addBtn = document.getElementById('addTestimonialBtn');
    const form = document.getElementById('testimonialForm');

    addBtn.addEventListener('click', () => openTestimonialForm());

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        saveTestimonial();
    });

    loadTestimonialsList();
}

function loadTestimonialsList() {
    const container = document.getElementById('testimonialsList');
    const testimonials = dataManager.getTestimonials() || [];

    if (testimonials.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-comments empty-state-icon"></i>
                <h4 class="empty-state-title">Nenhum depoimento cadastrado</h4>
                <p class="empty-state-desc">Adicione depoimentos de clientes para aumentar a credibilidade do site.</p>
            </div>
        `;
        return;
    }

    let html = '';
    testimonials.forEach((testimonial, index) => {
        html += `
            <div class="activity-item">
                <img src="${testimonial.avatar}" alt="${testimonial.name}" 
                     style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
                <div class="activity-content">
                    <div class="activity-title">${testimonial.name}</div>
                    <div class="activity-desc">${testimonial.role} • ${testimonial.rating} estrelas</div>
                    <p style="font-size: 0.85rem; color: var(--admin-text-muted); margin-top: 0.5rem; font-style: italic;">
                        "${testimonial.text.substring(0, 100)}${testimonial.text.length > 100 ? '...' : ''}"
                    </p>
                </div>
                <div class="table-actions">
                    <button class="btn btn-secondary btn-icon" onclick="editTestimonial(${index})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-icon" onclick="deleteTestimonial(${index})" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function openTestimonialForm(testimonial = null, index = -1) {
    const formCard = document.getElementById('testimonialFormCard');
    const formTitle = document.getElementById('testimonialFormTitle');

    document.getElementById('testimonialForm').reset();
    document.getElementById('testimonialIndex').value = index;

    if (testimonial) {
        formTitle.textContent = 'Editar Depoimento';
        document.getElementById('testimonialName').value = testimonial.name;
        document.getElementById('testimonialRole').value = testimonial.role;
        document.getElementById('testimonialAvatar').value = testimonial.avatar;
        document.getElementById('testimonialRating').value = testimonial.rating;
        document.getElementById('testimonialText').value = testimonial.text;
    } else {
        formTitle.textContent = 'Adicionar Depoimento';
    }

    formCard.style.display = 'block';
    formCard.scrollIntoView({ behavior: 'smooth' });
}

function closeTestimonialForm() {
    document.getElementById('testimonialFormCard').style.display = 'none';
}

function saveTestimonial() {
    const index = parseInt(document.getElementById('testimonialIndex').value);
    const testimonials = dataManager.getTestimonials() || [];

    const testimonialData = {
        name: document.getElementById('testimonialName').value,
        role: document.getElementById('testimonialRole').value,
        avatar: document.getElementById('testimonialAvatar').value || 'https://via.placeholder.com/100',
        rating: parseFloat(document.getElementById('testimonialRating').value),
        text: document.getElementById('testimonialText').value
    };

    if (index >= 0) {
        testimonials[index] = testimonialData;
        showToast('Depoimento atualizado com sucesso!', 'success');
    } else {
        testimonials.push(testimonialData);
        showToast('Depoimento adicionado com sucesso!', 'success');
    }

    dataManager.saveTestimonials(testimonials);
    closeTestimonialForm();
    loadTestimonialsList();
}

function editTestimonial(index) {
    const testimonials = dataManager.getTestimonials() || [];
    if (testimonials[index]) {
        openTestimonialForm(testimonials[index], index);
    }
}

function deleteTestimonial(index) {
    if (confirm('Tem certeza que deseja excluir este depoimento?')) {
        const testimonials = dataManager.getTestimonials() || [];
        testimonials.splice(index, 1);
        dataManager.saveTestimonials(testimonials);
        showToast('Depoimento excluído com sucesso!', 'success');
        loadTestimonialsList();
    }
}

// ==========================================
// COLOR PICKERS
// ==========================================
function initColorPickers() {
    const colorPairs = [
        ['themePrimaryColor', 'themePrimaryColorText', 'previewPrimary'],
        ['themePrimaryLight', 'themePrimaryLightText', 'previewPrimaryLight'],
        ['themePrimaryDark', 'themePrimaryDarkText', 'previewPrimaryDark'],
        ['themeAccentColor', 'themeAccentColorText', 'previewAccent'],
        ['themeSecondaryColor', 'themeSecondaryColorText', 'previewSecondary'],
        ['themeTertiaryColor', 'themeTertiaryColorText', 'previewTertiary'],
        ['themeGoldColor', 'themeGoldColorText', 'previewGold'],
        ['themeSuccessColor', 'themeSuccessColorText', 'previewSuccess']
    ];

    colorPairs.forEach(([colorId, textId, previewId]) => {
        const colorInput = document.getElementById(colorId);
        const textInput = document.getElementById(textId);

        colorInput.addEventListener('input', function () {
            textInput.value = this.value;
            updateColorPreview(previewId, this.value);
        });

        textInput.addEventListener('input', function () {
            if (/^#[0-9A-Fa-f]{6}$/.test(this.value)) {
                colorInput.value = this.value;
                updateColorPreview(previewId, this.value);
            }
        });
    });
}

function updateColorPreview(previewId, color) {
    if (previewId) {
        const preview = document.getElementById(previewId);
        if (preview) {
            preview.style.background = color;
        }
    }
}

function updateColorPreviews() {
    updateColorPreview('previewPrimary', document.getElementById('themePrimaryColor').value);
    updateColorPreview('previewPrimaryLight', document.getElementById('themePrimaryLight').value);
    updateColorPreview('previewPrimaryDark', document.getElementById('themePrimaryDark').value);
    updateColorPreview('previewAccent', document.getElementById('themeAccentColor').value);
    updateColorPreview('previewSecondary', document.getElementById('themeSecondaryColor').value);
    updateColorPreview('previewTertiary', document.getElementById('themeTertiaryColor').value);
    updateColorPreview('previewGold', document.getElementById('themeGoldColor').value);
    updateColorPreview('previewSuccess', document.getElementById('themeSuccessColor').value);
}

// ==========================================
// FONT PREVIEWS
// ==========================================
function initFontPreviews() {
    const fontSelects = [
        ['fontPrimary', 'fontPrimaryPreview'],
        ['fontSecondary', 'fontSecondaryPreview'],
        ['fontAccent', 'fontAccentPreview']
    ];

    fontSelects.forEach(([selectId, previewId]) => {
        const select = document.getElementById(selectId);
        const preview = document.getElementById(previewId);

        select.addEventListener('change', function () {
            const fontName = this.value;
            // Load font
            const link = document.createElement('link');
            link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(' ', '+')}:wght@400;500;600;700&display=swap`;
            link.rel = 'stylesheet';
            document.head.appendChild(link);

            preview.style.fontFamily = `'${fontName}', sans-serif`;
        });
    });
}

// ==========================================
// REPORTS
// ==========================================
function loadReportsData() {
    const analytics = dataManager.getAnalytics() || {};
    const vehicles = dataManager.getVehicles() || [];

    // Update summary stats
    document.getElementById('reportTotalViews').textContent = analytics.totalViews || 0;
    document.getElementById('reportWhatsappClicks').textContent = analytics.whatsappClicks || 0;
    document.getElementById('reportTotalClicks').textContent = analytics.totalClicks || 0;

    // Vehicle views report
    const vehicleViewsContainer = document.getElementById('vehicleViewsReport');
    if (analytics.vehicleViews && Object.keys(analytics.vehicleViews).length > 0) {
        const sortedViews = Object.entries(analytics.vehicleViews)
            .sort((a, b) => b[1] - a[1]);

        let html = '<div class="activity-list">';
        sortedViews.forEach(([id, views]) => {
            const vehicle = vehicles.find(v => v.id === parseInt(id));
            if (vehicle) {
                html += `
                    <div class="activity-item">
                        <img src="${vehicle.images[0]}" alt="${vehicle.model}" 
                             style="width: 60px; height: 40px; border-radius: 6px; object-fit: cover;">
                        <div class="activity-content">
                            <div class="activity-title">${vehicle.brand} ${vehicle.model}</div>
                            <div class="activity-desc">${vehicle.year}</div>
                        </div>
                        <div style="font-size: 1.25rem; font-weight: 700; color: var(--admin-accent);">
                            ${views}
                        </div>
                    </div>
                `;
            }
        });
        html += '</div>';
        vehicleViewsContainer.innerHTML = html;
    } else {
        vehicleViewsContainer.innerHTML = '<p style="color: var(--admin-text-muted);">Nenhuma visualização registrada.</p>';
    }

    // Daily visits report
    const dailyVisitsContainer = document.getElementById('dailyVisitsReport');
    if (analytics.dailyVisits && analytics.dailyVisits.length > 0) {
        let html = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 0.5rem;">';
        analytics.dailyVisits.slice(-14).forEach(day => {
            const date = new Date(day.date);
            const formattedDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
            html += `
                <div style="background: rgba(255,255,255,0.05); padding: 0.75rem; border-radius: 8px; text-align: center;">
                    <div style="font-weight: 700; color: var(--admin-accent);">${day.count}</div>
                    <div style="font-size: 0.75rem; color: var(--admin-text-muted);">${formattedDate}</div>
                </div>
            `;
        });
        html += '</div>';
        dailyVisitsContainer.innerHTML = html;
    } else {
        dailyVisitsContainer.innerHTML = '<p style="color: var(--admin-text-muted);">Nenhum dado de visitas diárias.</p>';
    }
}

// ==========================================
// DATA MANAGEMENT
// ==========================================
function initDataManagement() {
    // Export data
    document.getElementById('exportDataBtn').addEventListener('click', function () {
        const data = dataManager.exportData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `autoelite-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Dados exportados com sucesso!', 'success');
    });

    // Import data
    document.getElementById('importDataBtn').addEventListener('click', function () {
        document.getElementById('importDataInput').click();
    });

    document.getElementById('importDataInput').addEventListener('change', function (e) {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (event) {
                try {
                    const data = JSON.parse(event.target.result);
                    dataManager.importData(data);
                    showToast('Dados importados com sucesso! Recarregando...', 'success');
                    setTimeout(() => location.reload(), 1500);
                } catch (error) {
                    showToast('Erro ao importar dados. Arquivo inválido.', 'error');
                }
            };
            reader.readAsText(e.target.files[0]);
        }
    });

    // Reset data
    document.getElementById('resetDataBtn').addEventListener('click', function () {
        if (confirm('ATENÇÃO: Esta ação irá resetar TODOS os dados para os valores padrão. Esta ação NÃO pode ser desfeita. Deseja continuar?')) {
            if (confirm('Tem certeza ABSOLUTA? Todos os veículos, configurações e depoimentos serão perdidos.')) {
                dataManager.resetAllData();
                showToast('Dados resetados com sucesso! Recarregando...', 'success');
                setTimeout(() => location.reload(), 1500);
            }
        }
    });
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';

    toast.innerHTML = `
        <i class="fas ${icon} toast-icon"></i>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    container.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}
