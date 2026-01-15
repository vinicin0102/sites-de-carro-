/**
 * Auto Elite - Data Management
 * Handles all data storage and retrieval using localStorage
 */

// Default site configuration
const DEFAULT_CONFIG = {
    // Site Identity
    siteName: 'AUTO ELITE',
    siteDescription: 'Concessionária Premium de Veículos',
    logoUrl: '',
    faviconUrl: '',
    
    // Contact Information
    phone: '(11) 99999-9999',
    whatsapp: '5511999999999',
    email: 'contato@autoelite.com.br',
    
    // Location
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    city: 'São Paulo, SP',
    workingHours: 'Seg-Sab: 8h-18h',
    mapCoordinates: { lat: -23.5505, lng: -46.6333 },
    mapEmbed: '',
    
    // Theme Colors
    primaryColor: '#1a1a2e',
    primaryLight: '#16213e',
    primaryDark: '#0f0f1a',
    accentColor: '#e94560',
    secondaryColor: '#0f3460',
    goldColor: '#ffd700',
    successColor: '#00d26a',
    
    // Typography
    fontPrimary: 'Montserrat',
    fontSecondary: 'Poppins',
    fontAccent: 'Playfair Display',
    
    // Social Media
    facebook: '',
    instagram: '',
    youtube: '',
    linkedin: '',
    
    // Hero Section
    heroBadgeText: 'Concessionária Premium #1',
    heroTitle1: 'Encontre o',
    heroTitle2: 'Carro dos Seus Sonhos',
    heroDescription: 'Descubra nossa seleção exclusiva de veículos premium com as melhores condições de pagamento e garantia completa.',
    heroImageUrl: '',
    
    // Stats
    stats: [
        { number: '500+', label: 'Veículos Vendidos' },
        { number: '15+', label: 'Anos de Experiência' },
        { number: '98%', label: 'Clientes Satisfeitos' },
        { number: '50+', label: 'Marcas Disponíveis' }
    ],
    
    // Section Titles
    vehiclesSectionSubtitle: 'Nossa Frota',
    vehiclesSectionTitle: 'Veículos Disponíveis',
    vehiclesSectionDescription: 'Explore nossa seleção exclusiva de veículos seminovos e 0km com garantia e procedência comprovada.',
    
    featuresSectionSubtitle: 'Por Que Nos Escolher',
    featuresSectionTitle: 'Excelência em Cada Detalhe',
    featuresSectionDescription: 'Há mais de uma década entregando qualidade, confiança e as melhores condições do mercado.',
    
    testimonialsSectionSubtitle: 'Depoimentos',
    testimonialsSectionTitle: 'O Que Nossos Clientes Dizem',
    
    ctaTitle: 'Pronto Para Encontrar Seu Próximo Carro?',
    ctaDescription: 'Entre em contato agora e receba uma proposta exclusiva. Nossa equipe está pronta para ajudar você!',
    
    // Footer
    footerDescription: 'Há mais de 15 anos oferecendo os melhores veículos com qualidade, confiança e as melhores condições de pagamento do mercado.',
    footerCopyright: '© 2026 Auto Elite. Todos os direitos reservados.'
};

// Default categories/filters
const DEFAULT_CATEGORIES = [
    { id: 'all', name: 'Todos', active: true },
    { id: 'suv', name: 'SUVs', active: true },
    { id: 'sedan', name: 'Sedans', active: true },
    { id: 'hatch', name: 'Hatches', active: true },
    { id: 'pickup', name: 'Pickups', active: true },
    { id: 'sport', name: 'Esportivos', active: true }
];

// Sample vehicles data
const DEFAULT_VEHICLES = [
    {
        id: 1,
        brand: 'BMW',
        model: 'X5 xDrive40i',
        year: 2024,
        mileage: '0 km',
        fuel: 'Gasolina',
        transmission: 'Automático',
        color: 'Preto',
        engine: '3.0 Turbo',
        doors: 5,
        category: 'suv',
        badge: 'new',
        priceOld: 650000,
        priceCurrent: 589990,
        discount: 10,
        featured: true,
        sold: false,
        description: 'SUV de luxo com tecnologia de ponta e acabamento impecável.',
        images: [
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800'
        ],
        specs: {
            potencia: '340 cv',
            torque: '450 Nm',
            velocidade: '250 km/h',
            aceleracao: '5.5s (0-100)'
        }
    },
    {
        id: 2,
        brand: 'Mercedes-Benz',
        model: 'C 300 AMG Line',
        year: 2023,
        mileage: '15.000 km',
        fuel: 'Gasolina',
        transmission: 'Automático',
        color: 'Branco',
        engine: '2.0 Turbo',
        doors: 4,
        category: 'sedan',
        badge: 'featured',
        priceOld: 380000,
        priceCurrent: 349990,
        discount: 8,
        featured: true,
        sold: false,
        description: 'Sedan esportivo com design elegante e performance impressionante.',
        images: [
            'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800'
        ],
        specs: {
            potencia: '258 cv',
            torque: '400 Nm',
            velocidade: '250 km/h',
            aceleracao: '5.9s (0-100)'
        }
    },
    {
        id: 3,
        brand: 'Porsche',
        model: '911 Carrera S',
        year: 2023,
        mileage: '8.500 km',
        fuel: 'Gasolina',
        transmission: 'PDK',
        color: 'Vermelho',
        engine: '3.0 Biturbo',
        doors: 2,
        category: 'sport',
        badge: 'featured',
        priceOld: 980000,
        priceCurrent: 895000,
        discount: 9,
        featured: true,
        sold: false,
        description: 'O ícone esportivo por excelência. Performance e design incomparáveis.',
        images: [
            'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800'
        ],
        specs: {
            potencia: '450 cv',
            torque: '530 Nm',
            velocidade: '308 km/h',
            aceleracao: '3.5s (0-100)'
        }
    },
    {
        id: 4,
        brand: 'Audi',
        model: 'Q8 55 TFSI',
        year: 2024,
        mileage: '0 km',
        fuel: 'Gasolina',
        transmission: 'Automático',
        color: 'Cinza',
        engine: '3.0 V6 Turbo',
        doors: 5,
        category: 'suv',
        badge: 'new',
        priceOld: 720000,
        priceCurrent: 679990,
        discount: 6,
        featured: false,
        sold: false,
        description: 'SUV coupé de alta performance com interior luxuoso.',
        images: [
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'
        ],
        specs: {
            potencia: '340 cv',
            torque: '500 Nm',
            velocidade: '250 km/h',
            aceleracao: '5.6s (0-100)'
        }
    },
    {
        id: 5,
        brand: 'Toyota',
        model: 'Hilux SRX',
        year: 2024,
        mileage: '0 km',
        fuel: 'Diesel',
        transmission: 'Automático',
        color: 'Prata',
        engine: '2.8 Turbodiesel',
        doors: 4,
        category: 'pickup',
        badge: 'new',
        priceOld: 320000,
        priceCurrent: 289990,
        discount: 9,
        featured: false,
        sold: false,
        description: 'A pickup mais vendida do Brasil. Robustez e confiabilidade.',
        images: [
            'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800'
        ],
        specs: {
            potencia: '204 cv',
            torque: '500 Nm',
            velocidade: '175 km/h',
            tracao: '4x4'
        }
    },
    {
        id: 6,
        brand: 'Volkswagen',
        model: 'Golf GTI',
        year: 2023,
        mileage: '12.000 km',
        fuel: 'Gasolina',
        transmission: 'Automático',
        color: 'Azul',
        engine: '2.0 TSI',
        doors: 5,
        category: 'hatch',
        badge: '',
        priceOld: 250000,
        priceCurrent: 219990,
        discount: 12,
        featured: false,
        sold: false,
        description: 'O hot hatch mais desejado. Esportividade no dia a dia.',
        images: [
            'https://images.unsplash.com/photo-1471479917193-f00955256257?w=800'
        ],
        specs: {
            potencia: '230 cv',
            torque: '350 Nm',
            velocidade: '250 km/h',
            aceleracao: '6.2s (0-100)'
        }
    },
    {
        id: 7,
        brand: 'Range Rover',
        model: 'Sport Dynamic',
        year: 2023,
        mileage: '20.000 km',
        fuel: 'Diesel',
        transmission: 'Automático',
        color: 'Verde',
        engine: '3.0 D300',
        doors: 5,
        category: 'suv',
        badge: '',
        priceOld: 850000,
        priceCurrent: 749990,
        discount: 12,
        featured: false,
        sold: false,
        description: 'Luxo e capacidade off-road em um único veículo.',
        images: [
            'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800'
        ],
        specs: {
            potencia: '300 cv',
            torque: '650 Nm',
            velocidade: '225 km/h',
            tracao: '4x4'
        }
    },
    {
        id: 8,
        brand: 'Honda',
        model: 'Civic Touring',
        year: 2024,
        mileage: '0 km',
        fuel: 'Gasolina',
        transmission: 'CVT',
        color: 'Preto',
        engine: '1.5 Turbo',
        doors: 4,
        category: 'sedan',
        badge: 'new',
        priceOld: 200000,
        priceCurrent: 184990,
        discount: 8,
        featured: false,
        sold: false,
        description: 'O sedan mais tecnológico da categoria. Design premiado.',
        images: [
            'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800'
        ],
        specs: {
            potencia: '173 cv',
            torque: '220 Nm',
            velocidade: '200 km/h',
            consumo: '14 km/l'
        }
    },
    {
        id: 9,
        brand: 'Ford',
        model: 'Mustang GT',
        year: 2023,
        mileage: '5.000 km',
        fuel: 'Gasolina',
        transmission: 'Automático',
        color: 'Amarelo',
        engine: '5.0 V8',
        doors: 2,
        category: 'sport',
        badge: 'featured',
        priceOld: 550000,
        priceCurrent: 489990,
        discount: 11,
        featured: true,
        sold: false,
        description: 'O muscle car americano mais icônico. V8 puro.',
        images: [
            'https://images.unsplash.com/photo-1584345604476-8ec5f82d718c?w=800'
        ],
        specs: {
            potencia: '466 cv',
            torque: '569 Nm',
            velocidade: '250 km/h',
            aceleracao: '4.3s (0-100)'
        }
    }
];

// Default features
const DEFAULT_FEATURES = [
    { icon: 'fas fa-shield-alt', title: 'Garantia Total', description: 'Todos os nossos veículos possuem garantia de fábrica ou garantia estendida para sua tranquilidade.' },
    { icon: 'fas fa-file-contract', title: 'Documentação OK', description: 'Veículos com procedência comprovada e documentação regularizada. Transparência total.' },
    { icon: 'fas fa-percentage', title: 'Financiamento Facilitado', description: 'Parcelas que cabem no seu bolso. Trabalhamos com os principais bancos do país.' },
    { icon: 'fas fa-exchange-alt', title: 'Avaliamos seu Usado', description: 'Traga seu carro atual e faça a troca com as melhores condições do mercado.' },
    { icon: 'fas fa-headset', title: 'Suporte 24/7', description: 'Atendimento personalizado antes, durante e após a compra. Estamos sempre disponíveis.' },
    { icon: 'fas fa-truck', title: 'Entrega em Casa', description: 'Levamos seu novo carro até você. Entregas para todo o Brasil com segurança.' }
];

// Default testimonials
const DEFAULT_TESTIMONIALS = [
    {
        name: 'Carlos Silva',
        role: 'Empresário',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 5,
        text: 'Atendimento excepcional! Comprei meu SUV aqui e foi a melhor experiência de compra que já tive. Recomendo a todos!'
    },
    {
        name: 'Ana Beatriz',
        role: 'Advogada',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5,
        text: 'Processo de financiamento rápido e sem burocracia. Saí dirigindo meu carro no mesmo dia. Equipe muito profissional!'
    },
    {
        name: 'Roberto Mendes',
        role: 'Médico',
        avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
        rating: 5,
        text: 'Já é o terceiro carro que compro com eles. Sempre veículos impecáveis e com preços justos. Confio 100%!'
    },
    {
        name: 'Mariana Costa',
        role: 'Arquiteta',
        avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
        rating: 4.5,
        text: 'Encontrei exatamente o que procurava. O vendedor foi super atencioso e me ajudou a escolher o melhor modelo para minha família.'
    }
];

// Analytics/Reports data
const DEFAULT_ANALYTICS = {
    totalViews: 0,
    totalClicks: 0,
    whatsappClicks: 0,
    vehicleViews: {},
    dailyVisits: [],
    monthlyLeads: []
};

// Data Manager Class
class DataManager {
    constructor() {
        this.storageKeys = {
            config: 'autoelite_config',
            vehicles: 'autoelite_vehicles',
            categories: 'autoelite_categories',
            features: 'autoelite_features',
            testimonials: 'autoelite_testimonials',
            analytics: 'autoelite_analytics'
        };
        
        this.init();
    }
    
    init() {
        // Initialize with default data if not exists
        if (!this.getConfig()) {
            this.saveConfig(DEFAULT_CONFIG);
        }
        if (!this.getVehicles()) {
            this.saveVehicles(DEFAULT_VEHICLES);
        }
        if (!this.getCategories()) {
            this.saveCategories(DEFAULT_CATEGORIES);
        }
        if (!this.getFeatures()) {
            this.saveFeatures(DEFAULT_FEATURES);
        }
        if (!this.getTestimonials()) {
            this.saveTestimonials(DEFAULT_TESTIMONIALS);
        }
        if (!this.getAnalytics()) {
            this.saveAnalytics(DEFAULT_ANALYTICS);
        }
    }
    
    // Config methods
    getConfig() {
        const data = localStorage.getItem(this.storageKeys.config);
        return data ? JSON.parse(data) : null;
    }
    
    saveConfig(config) {
        localStorage.setItem(this.storageKeys.config, JSON.stringify(config));
    }
    
    updateConfig(updates) {
        const config = this.getConfig() || DEFAULT_CONFIG;
        const updatedConfig = { ...config, ...updates };
        this.saveConfig(updatedConfig);
        return updatedConfig;
    }
    
    // Vehicles methods
    getVehicles() {
        const data = localStorage.getItem(this.storageKeys.vehicles);
        return data ? JSON.parse(data) : null;
    }
    
    saveVehicles(vehicles) {
        localStorage.setItem(this.storageKeys.vehicles, JSON.stringify(vehicles));
    }
    
    addVehicle(vehicle) {
        const vehicles = this.getVehicles() || [];
        vehicle.id = vehicles.length > 0 ? Math.max(...vehicles.map(v => v.id)) + 1 : 1;
        vehicles.push(vehicle);
        this.saveVehicles(vehicles);
        return vehicle;
    }
    
    updateVehicle(id, updates) {
        const vehicles = this.getVehicles() || [];
        const index = vehicles.findIndex(v => v.id === id);
        if (index !== -1) {
            vehicles[index] = { ...vehicles[index], ...updates };
            this.saveVehicles(vehicles);
            return vehicles[index];
        }
        return null;
    }
    
    deleteVehicle(id) {
        const vehicles = this.getVehicles() || [];
        const filtered = vehicles.filter(v => v.id !== id);
        this.saveVehicles(filtered);
        return true;
    }
    
    getVehicleById(id) {
        const vehicles = this.getVehicles() || [];
        return vehicles.find(v => v.id === id);
    }
    
    getVehiclesByCategory(category) {
        const vehicles = this.getVehicles() || [];
        if (category === 'all') return vehicles.filter(v => !v.sold);
        return vehicles.filter(v => v.category === category && !v.sold);
    }
    
    getFeaturedVehicles() {
        const vehicles = this.getVehicles() || [];
        return vehicles.filter(v => v.featured && !v.sold);
    }
    
    // Categories methods
    getCategories() {
        const data = localStorage.getItem(this.storageKeys.categories);
        return data ? JSON.parse(data) : null;
    }
    
    saveCategories(categories) {
        localStorage.setItem(this.storageKeys.categories, JSON.stringify(categories));
    }
    
    // Features methods
    getFeatures() {
        const data = localStorage.getItem(this.storageKeys.features);
        return data ? JSON.parse(data) : null;
    }
    
    saveFeatures(features) {
        localStorage.setItem(this.storageKeys.features, JSON.stringify(features));
    }
    
    // Testimonials methods
    getTestimonials() {
        const data = localStorage.getItem(this.storageKeys.testimonials);
        return data ? JSON.parse(data) : null;
    }
    
    saveTestimonials(testimonials) {
        localStorage.setItem(this.storageKeys.testimonials, JSON.stringify(testimonials));
    }
    
    // Analytics methods
    getAnalytics() {
        const data = localStorage.getItem(this.storageKeys.analytics);
        return data ? JSON.parse(data) : null;
    }
    
    saveAnalytics(analytics) {
        localStorage.setItem(this.storageKeys.analytics, JSON.stringify(analytics));
    }
    
    trackPageView() {
        const analytics = this.getAnalytics() || DEFAULT_ANALYTICS;
        analytics.totalViews++;
        
        // Track daily visits
        const today = new Date().toISOString().split('T')[0];
        const todayVisit = analytics.dailyVisits.find(v => v.date === today);
        if (todayVisit) {
            todayVisit.count++;
        } else {
            analytics.dailyVisits.push({ date: today, count: 1 });
        }
        
        // Keep only last 30 days
        if (analytics.dailyVisits.length > 30) {
            analytics.dailyVisits = analytics.dailyVisits.slice(-30);
        }
        
        this.saveAnalytics(analytics);
    }
    
    trackVehicleView(vehicleId) {
        const analytics = this.getAnalytics() || DEFAULT_ANALYTICS;
        analytics.vehicleViews[vehicleId] = (analytics.vehicleViews[vehicleId] || 0) + 1;
        this.saveAnalytics(analytics);
    }
    
    trackWhatsappClick() {
        const analytics = this.getAnalytics() || DEFAULT_ANALYTICS;
        analytics.whatsappClicks++;
        analytics.totalClicks++;
        this.saveAnalytics(analytics);
    }
    
    // Reset to defaults
    resetAllData() {
        this.saveConfig(DEFAULT_CONFIG);
        this.saveVehicles(DEFAULT_VEHICLES);
        this.saveCategories(DEFAULT_CATEGORIES);
        this.saveFeatures(DEFAULT_FEATURES);
        this.saveTestimonials(DEFAULT_TESTIMONIALS);
        this.saveAnalytics(DEFAULT_ANALYTICS);
    }
    
    // Export data
    exportData() {
        return {
            config: this.getConfig(),
            vehicles: this.getVehicles(),
            categories: this.getCategories(),
            features: this.getFeatures(),
            testimonials: this.getTestimonials(),
            analytics: this.getAnalytics()
        };
    }
    
    // Import data
    importData(data) {
        if (data.config) this.saveConfig(data.config);
        if (data.vehicles) this.saveVehicles(data.vehicles);
        if (data.categories) this.saveCategories(data.categories);
        if (data.features) this.saveFeatures(data.features);
        if (data.testimonials) this.saveTestimonials(data.testimonials);
        if (data.analytics) this.saveAnalytics(data.analytics);
    }
}

// Export data manager instance
const dataManager = new DataManager();

// Helper function to format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

// Helper function to generate WhatsApp link
function generateWhatsappLink(phone, message = '') {
    const cleanPhone = phone.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanPhone}${message ? '?text=' + encodedMessage : ''}`;
}
