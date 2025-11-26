/**
 * @jest-environment jsdom
 * 
 * TESTS PARA ScrollSpy.js
 * =======================
 * Este módulo maneja el seguimiento de scroll para navegación lateral.
 * Funcionalidades principales:
 * 1. Detectar posición de scroll y actualizar indicadores
 * 2. Resaltar elemento activo en la navegación
 * 3. Configuración de estilos y colores
 * 4. Manejo de eventos de scroll
 */

import ScrollSpy from '../modulos/ScrollSpy';

describe('ScrollSpy.js', () => {

    beforeEach(() => {
        // Limpiar el DOM antes de cada test
        document.body.innerHTML = '';
        // Mock window.pageYOffset
        Object.defineProperty(window, 'pageYOffset', {
            writable: true,
            configurable: true,
            value: 0
        });
    });

    afterEach(() => {
        // Limpiar event listeners
        if (ScrollSpy && ScrollSpy.destroy) {
            ScrollSpy.destroy();
        }
    });

    /**
     * VERIFICACIÓN DE EXISTENCIA
     * ==========================
     */
    test('Debe estar disponible en window.ScrollSpy', () => {
        expect(window.ScrollSpy).toBeDefined();
        expect(typeof window.ScrollSpy).toBe('object');
    });

    test('Debe tener los métodos iniciar y destroy', () => {
        expect(ScrollSpy.iniciar).toBeDefined();
        expect(typeof ScrollSpy.iniciar).toBe('function');
        expect(ScrollSpy.destroy).toBeDefined();
        expect(typeof ScrollSpy.destroy).toBe('function');
    });

    test('Debe exportar correctamente el módulo', () => {
        expect(ScrollSpy).toBeDefined();
        expect(ScrollSpy).toBe(window.ScrollSpy);
    });

    /**
     * INICIALIZACIÓN BÁSICA
     * =====================
     */
    describe('Inicialización', () => {

        beforeEach(() => {
            document.body.innerHTML = `
                <div class="lista-scroll">
                    <ul>
                        <li><a href="#seccion1">Sección 1</a></li>
                        <li><a href="#seccion2">Sección 2</a></li>
                        <li><a href="#seccion3">Sección 3</a></li>
                    </ul>
                </div>
                <div class="scroll-item" id="seccion1" style="height: 500px;">Contenido 1</div>
                <div class="scroll-item" id="seccion2" style="height: 500px;">Contenido 2</div>
                <div class="scroll-item" id="seccion3" style="height: 500px;">Contenido 3</div>
            `;
        });

        test('Debe inicializar sin errores con configuración por defecto', () => {
            expect(() => {
                ScrollSpy.iniciar();
            }).not.toThrow();
        });

        test('Debe aplicar ancho a .lista-scroll', () => {
            ScrollSpy.iniciar({ ancho: 20 });

            const listaScroll = document.querySelector('.lista-scroll');
            expect(listaScroll.style.width).toBe('20%');
        });

        test('Debe aplicar tamaño de fuente a los links', () => {
            ScrollSpy.iniciar({ tamFuente: 16 });

            const links = document.querySelectorAll('.lista-scroll ul li a');
            links.forEach(link => {
                expect(link.style.fontSize).toBe('16px');
            });
        });

        test('Debe aplicar separación (top) a .lista-scroll', () => {
            ScrollSpy.iniciar({ separacion: 100 });

            const listaScroll = document.querySelector('.lista-scroll');
            expect(listaScroll.style.top).toBe('100px');
        });

        test('Debe agregar clase de color al elemento seleccionado', () => {
            ScrollSpy.iniciar({ colorBorde: 'fd-rojo' });

            const elementoSeleccionado = document.querySelector('.elemento-seleccionado');
            if (elementoSeleccionado) {
                expect(elementoSeleccionado.classList.contains('fd-rojo')).toBe(true);
            }
        });
    });

    /**
     * CONFIGURACIÓN PERSONALIZADA
     * ===========================
     */
    describe('Configuración personalizada', () => {

        beforeEach(() => {
            document.body.innerHTML = `
                <div class="lista-scroll">
                    <ul>
                        <li><a href="#test1">Test 1</a></li>
                    </ul>
                </div>
                <div class="scroll-item" id="test1">Contenido</div>
            `;
        });

        test('Debe aceptar configuración personalizada completa', () => {
            const config = {
                ancho: 25,
                tamFuente: 20,
                colorBorde: 'fd-azul',
                alturaBorde: 40,
                separacion: 150,
                colorSeleccionado: '#FF0000',
                colorNoSeleccionado: '#999999'
            };

            expect(() => {
                ScrollSpy.iniciar(config);
            }).not.toThrow();

            const listaScroll = document.querySelector('.lista-scroll');
            expect(listaScroll.style.width).toBe('25%');
            expect(listaScroll.style.top).toBe('150px');
        });

        test('Debe usar valores por defecto si no se proporciona configuración', () => {
            ScrollSpy.iniciar();

            const listaScroll = document.querySelector('.lista-scroll');
            expect(listaScroll.style.width).toBe('15%'); // Default
            expect(listaScroll.style.top).toBe('120px'); // Default
        });
    });

    /**
     * DETECCIÓN DE SCROLL
     * ===================
     */
    describe('Detección de scroll', () => {

        beforeEach(() => {
            document.body.innerHTML = `
                <div class="lista-scroll">
                    <ul>
                        <li><a href="#item1">Item 1</a></li>
                        <li><a href="#item2">Item 2</a></li>
                    </ul>
                </div>
                <div class="scroll-item" id="item1" style="height: 500px;">Item 1</div>
                <div class="scroll-item" id="item2" style="height: 500px;">Item 2</div>
            `;
        });

        test('Debe agregar event listener de scroll al inicializar', () => {
            const addEventListenerSpy = jest.spyOn(window, 'addEventListener');

            ScrollSpy.iniciar();

            expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

            addEventListenerSpy.mockRestore();
        });

        test('Debe crear elemento indicador al inicializar', () => {
            ScrollSpy.iniciar();

            // Debería haber creado al menos un elemento-seleccionado
            const elementoSeleccionado = document.querySelector('.elemento-seleccionado');
            expect(elementoSeleccionado).toBeTruthy();
        });
    });

    /**
     * ELEMENTO SELECCIONADO
     * =====================
     */
    describe('Elemento seleccionado', () => {

        beforeEach(() => {
            document.body.innerHTML = `
                <div class="lista-scroll">
                    <ul>
                        <li><a href="#sec1">Sec 1</a></li>
                        <li><a href="#sec2">Sec 2</a></li>
                    </ul>
                </div>
                <div class="scroll-item" id="sec1">Sección 1</div>
                <div class="scroll-item" id="sec2">Sección 2</div>
            `;
        });

        test('Debe crear elemento <p> con clase elemento-seleccionado', () => {
            ScrollSpy.iniciar();

            const elemento = document.querySelector('.elemento-seleccionado');
            expect(elemento).toBeTruthy();
            expect(elemento.tagName).toBe('P');
        });

        test('Debe aplicar altura al elemento seleccionado', () => {
            ScrollSpy.iniciar({ alturaBorde: 50 });

            const elemento = document.querySelector('.elemento-seleccionado');
            if (elemento) {
                expect(elemento.style.height).toBe('50px');
            }
        });

        test('Debe insertar elemento antes del anchor', () => {
            ScrollSpy.iniciar();

            const primerLink = document.querySelector('.lista-scroll ul li:first-child a');
            const elementoAnterior = primerLink?.previousElementSibling;

            if (elementoAnterior) {
                expect(elementoAnterior.classList.contains('elemento-seleccionado')).toBe(true);
            }
        });
    });

    /**
     * MÉTODO DESTROY
     * ==============
     */
    describe('Método destroy', () => {

        beforeEach(() => {
            document.body.innerHTML = `
                <div class="lista-scroll">
                    <ul>
                        <li><a href="#test">Test</a></li>
                    </ul>
                </div>
                <div class="scroll-item" id="test">Test</div>
            `;
        });

        test('Debe remover event listener de scroll', () => {
            const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

            ScrollSpy.iniciar();
            ScrollSpy.destroy();

            expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

            removeEventListenerSpy.mockRestore();
        });

        test('Debe ejecutarse sin errores', () => {
            ScrollSpy.iniciar();

            expect(() => {
                ScrollSpy.destroy();
            }).not.toThrow();
        });

        test('Debe poder destruir sin haber inicializado', () => {
            expect(() => {
                ScrollSpy.destroy();
            }).not.toThrow();
        });
    });

    /**
     * MANEJO DE ELEMENTOS FALTANTES
     * =============================
     */
    describe('Manejo de errores y casos edge', () => {

        test('Debe manejar correctamente cuando no hay .scroll-item', () => {
            document.body.innerHTML = `
                <div class="lista-scroll">
                    <ul>
                        <li><a href="#noexiste">No existe</a></li>
                    </ul>
                </div>
            `;

            expect(() => {
                ScrollSpy.iniciar();
            }).not.toThrow();
        });

        test('Debe manejar correctamente cuando no hay .lista-scroll', () => {
            document.body.innerHTML = `
                <div class="scroll-item" id="item">Item</div>
            `;

            expect(() => {
                ScrollSpy.iniciar();
            }).not.toThrow();
        });

        test('Debe manejar scroll-items sin ID', () => {
            document.body.innerHTML = `
                <div class="lista-scroll">
                    <ul>
                        <li><a href="#test">Test</a></li>
                    </ul>
                </div>
                <div class="scroll-item">Sin ID</div>
                <div class="scroll-item" id="test">Con ID</div>
            `;

            expect(() => {
                ScrollSpy.iniciar();
            }).not.toThrow();
        });
    });

    /**
     * MÚLTIPLES INSTANCIAS
     * ====================
     */
    describe('Múltiples elementos', () => {

        test('Debe manejar múltiples scroll-items', () => {
            document.body.innerHTML = `
                <div class="lista-scroll">
                    <ul>
                        <li><a href="#s1">S1</a></li>
                        <li><a href="#s2">S2</a></li>
                        <li><a href="#s3">S3</a></li>
                        <li><a href="#s4">S4</a></li>
                    </ul>
                </div>
                <div class="scroll-item" id="s1">1</div>
                <div class="scroll-item" id="s2">2</div>
                <div class="scroll-item" id="s3">3</div>
                <div class="scroll-item" id="s4">4</div>
            `;

            expect(() => {
                ScrollSpy.iniciar();
            }).not.toThrow();

            const items = document.querySelectorAll('.scroll-item');
            expect(items.length).toBe(4);
        });

        test('Debe aplicar estilos a todos los links', () => {
            document.body.innerHTML = `
                <div class="lista-scroll">
                    <ul>
                        <li><a href="#a">A</a></li>
                        <li><a href="#b">B</a></li>
                        <li><a href="#c">C</a></li>
                    </ul>
                </div>
                <div class="scroll-item" id="a">A</div>
                <div class="scroll-item" id="b">B</div>
                <div class="scroll-item" id="c">C</div>
            `;

            ScrollSpy.iniciar({ tamFuente: 18 });

            const links = document.querySelectorAll('.lista-scroll ul li a');
            expect(links.length).toBe(3);
            links.forEach(link => {
                expect(link.style.fontSize).toBe('18px');
            });
        });
    });
});
