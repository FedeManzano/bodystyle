/**
 * @jest-environment jsdom
 */

// Mock de GestionErrores antes de importar Waves
jest.mock('../modulos/GestionErrores', () => ({
    __esModule: true,
    default: {
        fondo: {
            val: jest.fn((color) => {
                const validColors = ['bg-red', 'bg-blue', 'bg-green', 'bg-yellow', 'bg-purple', 'bg-orange'];
                return validColors.includes(color);
            }),
            mje: 'Color de fondo inválido'
        }
    }
}));

describe('Módulo Waves', () => {
    let Waves;

    beforeAll(() => {
        // Importar el módulo después de configurar el DOM
        Waves = require('../modulos/Waves').default;
    });

    beforeEach(() => {
        // Limpiar el DOM antes de cada test
        document.body.innerHTML = '';

        // Limpiar timers y mocks
        jest.clearAllTimers();
        jest.clearAllMocks();
    });

    afterEach(() => {
        // Destruir Waves después de cada test
        if (window.Waves && window.Waves.destroy) {
            window.Waves.destroy();
        }
    });

    describe('Inicialización', () => {
        test('El módulo debe estar disponible en window.Waves', () => {
            expect(window.Waves).toBeDefined();
            expect(typeof window.Waves).toBe('object');
        });

        test('Debe tener método iniciar()', () => {
            expect(window.Waves.iniciar).toBeDefined();
            expect(typeof window.Waves.iniciar).toBe('function');
        });

        test('Debe tener método destroy()', () => {
            expect(window.Waves.destroy).toBeDefined();
            expect(typeof window.Waves.destroy).toBeDefined();
        });
    });

    describe('Funcionalidad Básica', () => {
        test('Debe crear span con clase efecto-waves al hacer click', () => {
            // Crear botón
            const button = document.createElement('button');
            button.className = 'waves btn';
            button.style.position = 'relative';
            document.body.appendChild(button);

            // Reinicializar Waves
            window.Waves.iniciar();

            // Simular click
            button.click();

            // Verificar que se creó el span
            const span = button.querySelector('.efecto-waves');
            expect(span).toBeTruthy();
            expect(span.classList.contains('efecto-waves')).toBe(true);
        });

        test('Debe aplicar color desde data-color', () => {
            const button = document.createElement('button');
            button.className = 'waves btn';
            button.setAttribute('data-color', 'bg-blue');
            button.style.position = 'relative';
            document.body.appendChild(button);

            window.Waves.iniciar();
            button.click();

            const span = button.querySelector('.efecto-waves');
            expect(span).toBeTruthy();
            expect(span.classList.contains('bg-blue')).toBe(true);
        });

        test('Debe funcionar sin data-color', () => {
            const button = document.createElement('button');
            button.className = 'waves btn';
            button.style.position = 'relative';
            document.body.appendChild(button);

            window.Waves.iniciar();
            button.click();

            const span = button.querySelector('.efecto-waves');
            expect(span).toBeTruthy();
        });
    });

    describe('Posicionamiento', () => {
        test('Debe posicionar el span en las coordenadas del click', () => {
            const button = document.createElement('button');
            button.className = 'waves btn';
            button.style.position = 'relative';
            document.body.appendChild(button);

            window.Waves.iniciar();

            // Crear evento con coordenadas
            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            });

            // Definir offsetX y offsetY
            Object.defineProperty(clickEvent, 'offsetX', { value: 25, writable: false });
            Object.defineProperty(clickEvent, 'offsetY', { value: 15, writable: false });

            button.dispatchEvent(clickEvent);

            const span = button.querySelector('.efecto-waves');
            expect(span.style.left).toBe('25px');
            expect(span.style.top).toBe('15px');
        });
    });

    describe('Animación', () => {
        test('Debe llamar a Element.animate()', () => {
            const button = document.createElement('button');
            button.className = 'waves btn';
            button.style.position = 'relative';
            document.body.appendChild(button);

            window.Waves.iniciar();
            button.click();

            const span = button.querySelector('.efecto-waves');
            expect(span).toBeTruthy();
            expect(span.animate).toHaveBeenCalled();
        });
    });

    describe('Eliminación del Span', () => {
        test('Debe eliminar el span después de 500ms', () => {
            jest.useFakeTimers();

            const button = document.createElement('button');
            button.className = 'waves btn';
            button.style.position = 'relative';
            document.body.appendChild(button);

            window.Waves.iniciar();
            button.click();

            // Verificar que existe
            let span = button.querySelector('.efecto-waves');
            expect(span).toBeTruthy();

            // Avanzar tiempo
            jest.advanceTimersByTime(500);

            // Verificar que fue eliminado
            span = button.querySelector('.efecto-waves');
            expect(span).toBeFalsy();

            jest.useRealTimers();
        });
    });

    describe('Método iniciar()', () => {
        test('Debe funcionar con elementos dinámicos', () => {
            // Primer botón
            const button1 = document.createElement('button');
            button1.className = 'waves btn';
            button1.style.position = 'relative';
            document.body.appendChild(button1);

            window.Waves.iniciar();

            // Segundo botón agregado dinámicamente
            const button2 = document.createElement('button');
            button2.className = 'waves btn';
            button2.style.position = 'relative';
            document.body.appendChild(button2);

            // Reinicializar
            window.Waves.destroy();
            window.Waves.iniciar();

            // Ambos deben funcionar
            button1.click();
            button2.click();

            expect(button1.querySelector('.efecto-waves')).toBeTruthy();
            expect(button2.querySelector('.efecto-waves')).toBeTruthy();
        });
    });

    describe('Método destroy()', () => {
        test('Debe eliminar event listeners', () => {
            const button = document.createElement('button');
            button.className = 'waves btn';
            button.style.position = 'relative';
            document.body.appendChild(button);

            window.Waves.iniciar();
            window.Waves.destroy();

            // Click después de destroy no debe crear span
            button.click();

            const span = button.querySelector('.efecto-waves');
            expect(span).toBeFalsy();
        });
    });

    describe('Múltiples Clicks', () => {
        test('Debe crear múltiples efectos', () => {
            jest.useFakeTimers();

            const button = document.createElement('button');
            button.className = 'waves btn';
            button.style.position = 'relative';
            document.body.appendChild(button);

            window.Waves.iniciar();

            // 3 clicks
            button.click();
            jest.advanceTimersByTime(100);
            button.click();
            jest.advanceTimersByTime(100);
            button.click();

            // Debe haber 3 spans
            const spans = button.querySelectorAll('.efecto-waves');
            expect(spans.length).toBe(3);

            jest.useRealTimers();
        });
    });
});
