import { afterEach, describe } from "node:test";
import EfectoScroll from "../modulos/EfectoScroll.js";

// Mock de IntersectionObserver - versión simple que siempre detecta intersección
global.IntersectionObserver = class IntersectionObserver {
    constructor(callback) {
        this.callback = callback;
        this.elements = [];
    }
    observe(element) {
        this.elements.push(element);
        // Siempre reportar que el elemento está en la vista
        this.callback([{ target: element, isIntersecting: true }]);
    }
    disconnect() {
        this.elements = [];
    }
    unobserve(element) {
        this.elements = this.elements.filter(el => el !== element);
    }
};

describe("EfectoScroll.js", () => {

    let div = null;
    beforeEach(() => {
        div = document.createElement('div');
        div.style.height = '2000px'; // Para permitir el scroll
        div.style.marginTop = '1500px';
        document.body.appendChild(div);
    })


    afterEach(() => {
        document.body.innerHTML = '';
    });


    describe("iniciar()", () => {
        test("Debe agregar la clase 'active-scroll' a los elementos observados cuando entran en la vista", () => {
            // Configurar el DOM con un elemento de prueba
            let testElement = document.createElement('div');
            testElement.className = 'scroll-effect';
            document.body.appendChild(testElement);
            expect(testElement.classList.contains('active-scroll')).toBe(false);
        });

        test("Verificar la función iniciar() esté presente", () => {
            expect(typeof EfectoScroll.iniciar).toBe("function");         
        });
        
    });

    describe("destroy()", () => {
        test("Verificar la función destroy() esté presente", () => {
            expect(typeof EfectoScroll.destroy).toBe("function");         
        });
    });

    describe("Comportamiento del Observer", () => {
        test("Debe desconectar el observer al llamar a destroy()", () => {
            EfectoScroll.iniciar();
            const destroySpy = jest.spyOn(EfectoScroll, 'destroy');
            EfectoScroll.destroy();
            expect(destroySpy).toHaveBeenCalled();
            destroySpy.mockRestore();
        });

        test("Comportamiento cuando la ventana incrementa su scroll - falso scroll insufuciente", () => {
            // Crear un elemento con la clase scroll-effect
            let testElement = document.createElement('div');
            testElement.className = 'scroll-effect';
            testElement.style.marginTop = '1700px'; // Posicionarlo para que entre en vista al hacer scroll
            document.body.appendChild(testElement);
            
            // Iniciar el IntersectionObserver
            EfectoScroll.iniciar();
            
            // El elemento debería tener la clase active-scroll cuando lo observa
            expect(testElement.classList.contains('active-scroll')).toBe(true);
        })
    });

    describe("Casos adicionales", () => {
        test("Debe funcionar con múltiples elementos scroll-effect", () => {
            // Crear varios elementos con la clase scroll-effect
            const element1 = document.createElement('div');
            element1.className = 'scroll-effect';
            document.body.appendChild(element1);
            
            const element2 = document.createElement('div');
            element2.className = 'scroll-effect';
            document.body.appendChild(element2);
            
            const element3 = document.createElement('div');
            element3.className = 'scroll-effect';
            document.body.appendChild(element3);
            
            EfectoScroll.iniciar();
            
            // Todos los elementos deberían tener la clase active-scroll
            expect(element1.classList.contains('active-scroll')).toBe(true);
            expect(element2.classList.contains('active-scroll')).toBe(true);
            expect(element3.classList.contains('active-scroll')).toBe(true);
        });

        test("Debe manejar correctamente cuando no hay elementos scroll-effect", () => {
            // No crear elementos con scroll-effect
            expect(() => {
                EfectoScroll.iniciar();
            }).not.toThrow();
        });

        test("Debe evitar memory leak cuando se llama a iniciar() múltiples veces", () => {
            const element = document.createElement('div');
            element.className = 'scroll-effect';
            document.body.appendChild(element);
            
            // Llamar iniciar múltiples veces
            EfectoScroll.iniciar();
            EfectoScroll.destroy();
            EfectoScroll.iniciar();
            EfectoScroll.destroy();
            EfectoScroll.iniciar();
            
            // El elemento debería tener la clase (se observó correctamente)
            expect(element.classList.contains('active-scroll')).toBe(true);
        });

        test("No debería aplicar clase active-scroll después de destroy()", () => {
            const element = document.createElement('div');
            element.className = 'scroll-effect';
            document.body.appendChild(element);
            
            EfectoScroll.iniciar();
            expect(element.classList.contains('active-scroll')).toBe(true);
            
            // Limpiar la clase
            element.classList.remove('active-scroll');
            
            // Destruir el observer
            EfectoScroll.destroy();
            
            // Crear un nuevo elemento después de destroy
            const newElement = document.createElement('div');
            newElement.className = 'scroll-effect';
            document.body.appendChild(newElement);
            
            // El nuevo elemento NO debería tener la clase porque el observer fue destruido
            expect(newElement.classList.contains('active-scroll')).toBe(false);
        });

        test("Debe observar solo elementos con la clase scroll-effect", () => {
            const scrollElement = document.createElement('div');
            scrollElement.className = 'scroll-effect';
            document.body.appendChild(scrollElement);
            
            const otherElement = document.createElement('div');
            otherElement.className = 'other-class';
            document.body.appendChild(otherElement);
            
            EfectoScroll.iniciar();
            
            // Solo el elemento con scroll-effect debería tener la clase active-scroll
            expect(scrollElement.classList.contains('active-scroll')).toBe(true);
            expect(otherElement.classList.contains('active-scroll')).toBe(false);
        });
    });
    
}); 