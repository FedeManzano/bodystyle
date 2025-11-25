
import Navigation from '../modulos/Navigation';
import { fadeIn, fadeOut } from '../modulos/Animaciones';

// Mock de Animaciones
jest.mock('../modulos/Animaciones', () => ({
    fadeIn: jest.fn(),
    fadeOut: jest.fn()
}));

describe('Navigation Module', () => {
    let navElement;
    let sidebarElement;
    let btnMenu;

    beforeEach(() => {
        jest.clearAllMocks();

        // Setup DOM
        document.body.innerHTML = `
            <nav id="main-nav">
                <div class="bs-nav-md">
                    <button class="btn-menu">Menu</button>
                </div>
            </nav>
            <div id="sidebar" class="bs-nav-sidebar" style="display: none;">
                Sidebar Content
            </div>
        `;

        // Configurar data-target en el nav (simulando lo que jQuery .data() haría o atributo HTML)
        // En la implementación original: state.sidebar =  $(id).data("target")
        // Asumimos que en el HTML real sería data-target="#sidebar"
        document.getElementById('main-nav').setAttribute('data-target', '#sidebar');

        navElement = document.getElementById('main-nav');
        sidebarElement = document.getElementById('sidebar');
        btnMenu = document.querySelector('.btn-menu');
    });

    afterEach(() => {
        Navigation.Destroy();
        document.body.innerHTML = '';
    });

    test('Debe inicializar correctamente', () => {
        Navigation.Init('#main-nav');

        // Verifica que el sidebar se muestre (fadeIn)
        expect(fadeIn).toHaveBeenCalledWith(sidebarElement);

        // Verifica que se creen los labels del botón menú
        expect(btnMenu.querySelectorAll('label').length).toBe(3);

        // Verifica que se cree el complemento
        expect(document.querySelector('.bs-nav-complement')).toBeTruthy();
    });

    test('Debe abrir y cerrar el sidebar al hacer click en el botón menú', () => {
        Navigation.Init('#main-nav');

        // Reset mocks after init
        jest.clearAllMocks();

        // Click para abrir
        btnMenu.click();

        // Al abrir: complemento fadeIn, sidebar left 0
        const complement = document.querySelector('.bs-nav-complement');
        expect(fadeIn).toHaveBeenCalledWith(complement);
        expect(sidebarElement.style.left).toBe('0px');

        jest.clearAllMocks();

        // Click para cerrar
        btnMenu.click();

        // Al cerrar: complemento fadeOut, sidebar left -240
        expect(fadeOut).toHaveBeenCalledWith(complement);
        expect(sidebarElement.style.left).toBe('-240px');
    });

    test('Debe cerrar el sidebar al hacer click en el complemento', () => {
        Navigation.Init('#main-nav');

        // Abrir primero
        btnMenu.click();
        jest.clearAllMocks();

        const complement = document.querySelector('.bs-nav-complement');
        complement.click();

        expect(fadeOut).toHaveBeenCalledWith(complement);
        expect(sidebarElement.style.left).toBe('-240px');
    });

    test('Debe validar ID de contexto incorrecto', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        Navigation.Init('invalid-id');
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});
