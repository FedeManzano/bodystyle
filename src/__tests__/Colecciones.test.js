/**
 * @jest-environment jsdom
 */

// Mock de jQuery
jest.mock('jquery', () => jest.fn());

// Mock de Animaciones
jest.mock('../modulos/Animaciones', () => ({
    slideUp: jest.fn(),
    slideDown: jest.fn()
}));

// Mock de Errores
jest.mock('../modulos/Errores', () => ({
    __esModule: true,
    default: {
        id: {
            validacion: { test: jest.fn(() => true) },
            mensaje: 'ID inválido'
        },
        clasesColorFondo: {
            validacion: { test: jest.fn(() => true) },
            mensaje: 'Color de fondo inválido'
        },
        clasesColorTexto: {
            validacion: { test: jest.fn(() => true) },
            mensaje: 'Color de texto inválido'
        },
        hexadecimal: {
            validacion: { test: jest.fn(() => true) },
            mensaje: 'Color hexadecimal inválido'
        }
    }
}));

import Coleccion from '../modulos/Colecciones';
import { slideDown } from '../modulos/Animaciones';

describe('Módulo Colecciones', () => {
    let coleccion;
    let container;

    beforeEach(() => {
        document.body.innerHTML = '';

        container = document.createElement('div');
        container.id = 'test-coleccion';

        const lista = document.createElement('ul');
        lista.className = 'l-colapso';

        const item1 = document.createElement('li');
        item1.className = 'lista-item';
        item1.setAttribute('data-target', '#submenu1');
        item1.textContent = 'Item 1';

        const submenu1 = document.createElement('ul');
        submenu1.id = 'submenu1';
        submenu1.className = 'desplegable';
        submenu1.style.display = 'none';

        lista.appendChild(item1);
        lista.appendChild(submenu1);
        container.appendChild(lista);
        document.body.appendChild(container);

        jest.clearAllMocks();
        coleccion = new Coleccion();
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    describe('Constructor', () => {
        test('Debe crear una instancia de Coleccion', () => {
            expect(coleccion).toBeInstanceOf(Coleccion);
        });

        test('Debe inicializar menues como Map', () => {
            expect(coleccion.menues).toBeInstanceOf(Map);
        });

        test('Debe inicializar eventListeners como Map', () => {
            expect(coleccion.eventListeners).toBeInstanceOf(Map);
        });
    });

    describe('Método select', () => {
        test('Debe retornar NodeList de elementos', () => {
            const result = coleccion.select('.lista-item');
            expect(result).toBeInstanceOf(NodeList);
        });
    });

    describe('Método acordeon', () => {
        test('Debe agregar flechas a items con data-target', () => {
            const config = {
                contexto: '#test-coleccion',
                colorFlechas: '#000'
            };

            coleccion.acordeon(config);

            const item = document.querySelector('[data-target]');
            const flechas = item.querySelectorAll('i');

            expect(flechas.length).toBe(2);
        });

        test('Debe agregar clase f-der', () => {
            const config = {
                contexto: '#test-coleccion',
                colorFlechas: '#000'
            };

            coleccion.acordeon(config);

            const item = document.querySelector('[data-target]');
            const flechaDer = item.querySelector('.f-der');

            expect(flechaDer).toBeTruthy();
        });

        test('Debe agregar clase f-aba', () => {
            const config = {
                contexto: '#test-coleccion',
                colorFlechas: '#000'
            };

            coleccion.acordeon(config);

            const item = document.querySelector('[data-target]');
            const flechaAba = item.querySelector('.f-aba');

            expect(flechaAba).toBeTruthy();
        });
    });

    describe('Método desplegable', () => {
        beforeEach(() => {
            coleccion.acordeon({
                contexto: '#test-coleccion',
                colorFlechas: '#000'
            });
        });

        test('Debe agregar event listeners', () => {
            coleccion.desplegable({ contexto: '#test-coleccion' });
            expect(coleccion.eventListeners.size).toBeGreaterThan(0);
        });

        test('Debe llamar a slideDown al hacer click', () => {
            coleccion.desplegable({ contexto: '#test-coleccion' });

            const item = document.querySelector('[data-target]');
            item.click();

            expect(slideDown).toHaveBeenCalled();
        });
    });

    describe('Método validarConfig', () => {
        test('Debe retornar true con configuración válida', () => {
            const config = {
                contexto: '#test-coleccion',
                colorFondo: 'bg-white',
                colorTexto: 'text-black',
                colorFlechas: '#000'
            };

            const result = coleccion.validarConfig(config);
            expect(result).toBe(true);
        });
    });

    describe('Método iniciar', () => {
        test('Debe llamar a validarConfig', () => {
            const spy = jest.spyOn(coleccion, 'validarConfig');

            coleccion.iniciar({
                contexto: '#test-coleccion',
                colorFondo: 'bg-white',
                colorTexto: 'text-black',
                colorFlechas: '#000'
            });

            expect(spy).toHaveBeenCalled();
        });

        test('Debe llamar a cargarConfiguracion', () => {
            const spy = jest.spyOn(coleccion, 'cargarConfiguracion');

            coleccion.iniciar({
                contexto: '#test-coleccion',
                colorFondo: 'bg-white',
                colorTexto: 'text-black',
                colorFlechas: '#000'
            });

            expect(spy).toHaveBeenCalled();
        });

        test('Debe llamar a acordeon', () => {
            const spy = jest.spyOn(coleccion, 'acordeon');

            coleccion.iniciar({
                contexto: '#test-coleccion',
                colorFondo: 'bg-white',
                colorTexto: 'text-black',
                colorFlechas: '#000'
            });

            expect(spy).toHaveBeenCalled();
        });

        test('Debe llamar a desplegable', () => {
            const spy = jest.spyOn(coleccion, 'desplegable');

            coleccion.iniciar({
                contexto: '#test-coleccion',
                colorFondo: 'bg-white',
                colorTexto: 'text-black',
                colorFlechas: '#000'
            });

            expect(spy).toHaveBeenCalled();
        });
    });

    describe('Método destroy', () => {
        beforeEach(() => {
            coleccion.iniciar({
                contexto: '#test-coleccion',
                colorFondo: 'bg-white',
                colorTexto: 'text-black',
                colorFlechas: '#000'
            });
        });

        test('Debe eliminar flechas', () => {
            coleccion.destroy('#test-coleccion');

            const flechas = document.querySelectorAll('#test-coleccion i');
            expect(flechas.length).toBe(0);
        });

        test('No debe fallar si no hay listeners', () => {
            const newColeccion = new Coleccion();

            expect(() => {
                newColeccion.destroy('#test-coleccion');
            }).not.toThrow();
        });
    });
});
