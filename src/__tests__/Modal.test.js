
import Modal from '../modulos/Modal';
import { fadeIn, fadeOut } from '../modulos/Animaciones';

// Mock de Animaciones
jest.mock('../modulos/Animaciones', () => ({
    fadeIn: jest.fn(),
    fadeOut: jest.fn()
}));

describe('Modal Module', () => {
    let modalElement;
    let triggerElement;
    let backdropElement;

    beforeEach(() => {
        // Limpiar mocks
        jest.clearAllMocks();

        // Configurar DOM
        document.body.innerHTML = `
            <button class="activar-modal" data-target="#miModal">Abrir Modal</button>
            <div id="miModal" class="modal-fondo">
                <div class="modal-contenido">Contenido</div>
            </div>
        `;

        modalElement = document.getElementById('miModal');
        triggerElement = document.querySelector('.activar-modal');

        // Inicializar módulo
        Modal.iniciar();

        // Obtener elementos generados dinámicamente
        backdropElement = modalElement.querySelector('.complemento');
    });

    afterEach(() => {
        Modal.destroy();
        document.body.innerHTML = '';
    });

    test('Debe inicializar correctamente el estado del modal', () => {
        expect(modalElement.style.opacity).toBe('1');
        expect(modalElement.style.display).toBe('none');
        expect(backdropElement).toBeTruthy();
        expect(backdropElement.classList.contains('complemento')).toBe(true);
    });

    test('Debe abrir el modal al hacer click en el disparador', () => {
        triggerElement.click();

        // Debe llamar a fadeIn con el elemento correcto
        expect(fadeIn).toHaveBeenCalledTimes(1);
        expect(fadeIn).toHaveBeenCalledWith(modalElement);
    });

    test('Debe cerrar el modal al hacer click en el complemento (fondo)', () => {
        // Simular click en el complemento
        backdropElement.click();

        // Debe llamar a fadeOut con el elemento correcto
        expect(fadeOut).toHaveBeenCalledTimes(1);
        expect(fadeOut).toHaveBeenCalledWith(modalElement, 200);
    });

    test('No debe cerrar el modal si se hace click en el contenido', () => {
        const contenido = modalElement.querySelector('.modal-contenido');
        contenido.click();

        expect(fadeOut).not.toHaveBeenCalled();
    });

    test('Debe limpiar los eventos al destruir', () => {
        Modal.destroy();

        // Reiniciar mocks para verificar que no se llamen después de destroy
        jest.clearAllMocks();

        triggerElement.click();
        expect(fadeIn).not.toHaveBeenCalled();

        backdropElement.click();
        expect(fadeOut).not.toHaveBeenCalled();
    });

    test('Debe manejar múltiples modales independientemente', () => {
        document.body.innerHTML = `
            <button class="activar-modal" id="btn1" data-target="#modal1">Modal 1</button>
            <div id="modal1" class="modal-fondo"></div>
            
            <button class="activar-modal" id="btn2" data-target="#modal2">Modal 2</button>
            <div id="modal2" class="modal-fondo"></div>
        `;

        // Reinicializar con nuevo DOM
        Modal.iniciar();

        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        const modal1 = document.getElementById('modal1');
        const modal2 = document.getElementById('modal2');

        btn1.click();
        expect(fadeIn).toHaveBeenCalledWith(modal1);
        expect(fadeIn).not.toHaveBeenCalledWith(modal2);

        jest.clearAllMocks();

        btn2.click();
        expect(fadeIn).toHaveBeenCalledWith(modal2);
        expect(fadeIn).not.toHaveBeenCalledWith(modal1);
    });
});
