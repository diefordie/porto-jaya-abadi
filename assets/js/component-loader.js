/**
 * Component Loader
 * Dynamically fetches and injects HTML fragments into the DOM.
 */

const components = [
    { id: 'home-placeholder', file: 'assets/components/hero.html' },
    { id: 'services-placeholder', file: 'assets/components/services.html' },
    { id: 'about-placeholder', file: 'assets/components/about.html' },
    { id: 'portfolio-placeholder', file: 'assets/components/portfolio.html' },
    { id: 'faq-placeholder', file: 'assets/components/faq.html' },
    { id: 'contact-placeholder', file: 'assets/components/contact.html' },
    { id: 'footer-placeholder', file: 'assets/components/footer.html' }
];

async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        const html = await response.text();
        document.getElementById(id).outerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

async function loadAllComponents() {
    // Load components sequentially or in parallel
    const promises = components.map(comp => loadComponent(comp.id, comp.file));
    await Promise.all(promises);

    // Dispatch custom event when all components are loaded
    window.dispatchEvent(new CustomEvent('componentsLoaded'));
}

// Start loading
loadAllComponents();
