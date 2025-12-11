# Ejercicios Prácticos de Mocking con Jest

Sigue estos ejercicios para aprender mocking de forma práctica. Cada uno te guía paso a paso.

---

## Ejercicio 1: Tu Primer Mock

### Objetivo
Aprender a mockear una función simple y verificar que se llamó.

### Paso 1: Crea el módulo
```javascript
// src/modulos/Saludos.js

export const saludar = (nombre) => {
    return `¡Hola, ${nombre}!`;
};

export const despedir = (nombre) => {
    return `¡Adiós, ${nombre}!`;
};
```

### Paso 2: Crea el test

Copia esto en `src/__tests__/Ejercicio1.test.js`:

```javascript
import { saludar, despedir } from '../modulos/Saludos';

// Mockea el módulo completo
jest.mock('../modulos/Saludos', () => ({
    saludar: jest.fn(),
    despedir: jest.fn()
}));

describe('Ejercicio 1: Primer Mock', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // ← Siempre limpia antes de cada test
    });

    test('saludar es una función mockeada', () => {
        // Configurar qué retorna
        saludar.mockReturnValue('Mock Saludo');

        // Llamarla
        const resultado = saludar('Juan');

        // Verificar resultado
        expect(resultado).toBe('Mock Saludo');

        // Verificar que se llamó
        expect(saludar).toHaveBeenCalled();

        // Verificar con qué argumentos
        expect(saludar).toHaveBeenCalledWith('Juan');
    });

    test('despedir retorna lo que configuramos', () => {
        despedir.mockReturnValue('Hasta luego');

        const resultado = despedir('María');

        expect(resultado).toBe('Hasta luego');
        expect(despedir).toHaveBeenCalledWith('María');
    });
});
```

### Paso 3: Ejecuta

```bash
npm test -- Ejercicio1.test.js
```

### ✅ Qué aprendiste
- Cómo usar `jest.mock()`
- Cómo configurar retornos con `mockReturnValue()`
- Cómo verificar llamadas con `expect().toHaveBeenCalled()`

---

## Ejercicio 2: Mock de Animaciones (Tu Caso Real)

### Objetivo
Mockear animaciones para probar lógica sin esperar a que terminen.

### Paso 1: Crea el componente que usa animaciones

```javascript
// src/modulos/Card.js

import { fadeIn, fadeOut } from './Animaciones';

export class Card {
    constructor(selector) {
        this.elemento = document.querySelector(selector);
        this.visible = false;
    }

    mostrar() {
        if (!this.visible) {
            this.visible = true;
            fadeIn(this.elemento, 300);
        }
    }

    ocultar() {
        if (this.visible) {
            this.visible = false;
            fadeOut(this.elemento, 300);
        }
    }
}
```

### Paso 2: Mockea Animaciones automáticamente

```javascript
// src/__mocks__/Animaciones.js

export const fadeIn = jest.fn();
export const fadeOut = jest.fn();
```

### Paso 3: Test la Card

Copia en `src/__tests__/Ejercicio2.test.js`:

```javascript
import { Card } from '../modulos/Card';
import { fadeIn, fadeOut } from '../modulos/Animaciones';

// Jest automáticamente usa __mocks__/Animaciones.js
jest.mock('../modulos/Animaciones');

describe('Ejercicio 2: Mock de Animaciones', () => {
    let card;
    let elemento;

    beforeEach(() => {
        // Crear HTML
        document.body.innerHTML = '<div id="card">Contenido</div>';
        elemento = document.getElementById('card');

        // Crear instancia
        card = new Card('#card');

        // Limpiar mocks
        jest.clearAllMocks();
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('mostrar llama a fadeIn con elemento correcto', () => {
        card.mostrar();

        // Verificar que fadeIn se llamó
        expect(fadeIn).toHaveBeenCalled();

        // Verificar con qué argumentos
        expect(fadeIn).toHaveBeenCalledWith(elemento, 300);

        // Verificar que se llamó una sola vez
        expect(fadeIn).toHaveBeenCalledTimes(1);
    });

    test('ocultar llama a fadeOut', () => {
        card.visible = true; // Simular que está visible
        card.ocultar();

        expect(fadeOut).toHaveBeenCalledWith(elemento, 300);
    });

    test('no llama fadeIn si ya está visible', () => {
        card.visible = true;
        card.mostrar();

        // No debería llamar fadeIn
        expect(fadeIn).not.toHaveBeenCalled();
    });

    test('secuencia: mostrar luego ocultar', () => {
        card.mostrar();
        expect(fadeIn).toHaveBeenCalledTimes(1);

        card.ocultar();
        expect(fadeOut).toHaveBeenCalledTimes(1);

        // fadeIn se llamó una sola vez
        expect(fadeIn).toHaveBeenCalledTimes(1);
    });
});
```

### Paso 4: Ejecuta

```bash
npm test -- Ejercicio2.test.js
```

### ✅ Qué aprendiste
- Cómo usar `__mocks__/` automáticamente
- Cómo verificar argumentos específicos
- Cómo contar llamadas con `toHaveBeenCalledTimes()`

---

## Ejercicio 3: Mock de Promesas y APIs

### Objetivo
Aprender a mockear funciones asincrónicas.

### Paso 1: Crea un servicio que usa fetch

```javascript
// src/modulos/UsuarioServicio.js

export class UsuarioServicio {
    async obtenerUsuario(id) {
        const response = await fetch(`/api/usuarios/${id}`);
        return response.json();
    }

    async crearUsuario(datos) {
        const response = await fetch('/api/usuarios', {
            method: 'POST',
            body: JSON.stringify(datos)
        });
        if (!response.ok) {
            throw new Error('Error creando usuario');
        }
        return response.json();
    }
}
```

### Paso 2: Test con mocks de promesas

Copia en `src/__tests__/Ejercicio3.test.js`:

```javascript
import { UsuarioServicio } from '../modulos/UsuarioServicio';

describe('Ejercicio 3: Mock de Promesas', () => {
    let servicio;

    beforeEach(() => {
        servicio = new UsuarioServicio();
        jest.clearAllMocks();
    });

    test('obtener usuario retorna datos mockeados', async () => {
        // Mockear fetch
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                id: 1,
                nombre: 'Juan',
                email: 'juan@ejemplo.com'
            })
        });

        // Llamar función
        const usuario = await servicio.obtenerUsuario(1);

        // Verificar resultado
        expect(usuario).toEqual({
            id: 1,
            nombre: 'Juan',
            email: 'juan@ejemplo.com'
        });

        // Verificar que fetch se llamó correctamente
        expect(global.fetch).toHaveBeenCalledWith('/api/usuarios/1');
    });

    test('crear usuario con error', async () => {
        // Mockear fetch para que lance error
        global.fetch = jest.fn().mockRejectedValueOnce(
            new Error('Network error')
        );

        // Verificar que lanza error
        await expect(
            servicio.crearUsuario({ nombre: 'Pedro' })
        ).rejects.toThrow('Network error');

        expect(global.fetch).toHaveBeenCalled();
    });

    test('crear usuario exitoso', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce({
                id: 2,
                nombre: 'Pedro',
                email: 'pedro@ejemplo.com'
            })
        });

        const usuario = await servicio.crearUsuario({
            nombre: 'Pedro',
            email: 'pedro@ejemplo.com'
        });

        expect(usuario).toEqual({
            id: 2,
            nombre: 'Pedro',
            email: 'pedro@ejemplo.com'
        });

        // Verificar que se llamó con POST
        expect(global.fetch).toHaveBeenCalledWith(
            '/api/usuarios',
            expect.objectContaining({
                method: 'POST'
            })
        );
    });
});
```

### Paso 3: Ejecuta

```bash
npm test -- Ejercicio3.test.js
```

### ✅ Qué aprendiste
- Cómo usar `mockResolvedValueOnce()` para promesas
- Cómo usar `mockRejectedValueOnce()` para errores
- Cómo verificar argumentos complejos con `expect.objectContaining()`

---

## Ejercicio 4: Múltiples Mocks Juntos

### Objetivo
Aprender a mockear varios módulos en el mismo test.

### Paso 1: Crea un componente complejo

```javascript
// src/modulos/Carrito.js

import { UsuarioServicio } from './UsuarioServicio';
import { fadeIn, fadeOut } from './Animaciones';

export class Carrito {
    constructor() {
        this.usuarioServicio = new UsuarioServicio();
        this.items = [];
    }

    async cargarCarrito(usuarioId) {
        const usuario = await this.usuarioServicio.obtenerUsuario(usuarioId);
        this.items = usuario.carrito || [];
        return this.items;
    }

    mostrar() {
        const elemento = document.getElementById('carrito');
        fadeIn(elemento);
    }

    ocultar() {
        const elemento = document.getElementById('carrito');
        fadeOut(elemento);
    }
}
```

### Paso 2: Test mockeando todo

Copia en `src/__tests__/Ejercicio4.test.js`:

```javascript
import { Carrito } from '../modulos/Carrito';
import { UsuarioServicio } from '../modulos/UsuarioServicio';
import { fadeIn, fadeOut } from '../modulos/Animaciones';

// Mockear DOS módulos
jest.mock('../modulos/UsuarioServicio');
jest.mock('../modulos/Animaciones');

describe('Ejercicio 4: Múltiples Mocks', () => {
    let carrito;

    beforeEach(() => {
        document.body.innerHTML = '<div id="carrito">Mi Carrito</div>';

        // Mockear el constructor
        UsuarioServicio.mockImplementation(() => ({
            obtenerUsuario: jest.fn()
        }));

        carrito = new Carrito();
        jest.clearAllMocks();
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('carga carrito del usuario', async () => {
        // Configurar mock
        carrito.usuarioServicio.obtenerUsuario.mockResolvedValueOnce({
            id: 1,
            nombre: 'Juan',
            carrito: [
                { id: 101, nombre: 'Producto 1' },
                { id: 102, nombre: 'Producto 2' }
            ]
        });

        // Llamar función
        const items = await carrito.cargarCarrito(1);

        // Verificar
        expect(items).toHaveLength(2);
        expect(items[0]).toEqual({ id: 101, nombre: 'Producto 1' });

        expect(carrito.usuarioServicio.obtenerUsuario).toHaveBeenCalledWith(1);
    });

    test('muestra y oculta carrito', () => {
        const elemento = document.getElementById('carrito');

        carrito.mostrar();
        expect(fadeIn).toHaveBeenCalledWith(elemento);

        carrito.ocultar();
        expect(fadeOut).toHaveBeenCalledWith(elemento);
    });

    test('integración completa', async () => {
        // 1. Mockear obtenerUsuario
        carrito.usuarioServicio.obtenerUsuario.mockResolvedValueOnce({
            id: 1,
            carrito: [{ id: 101, nombre: 'Producto' }]
        });

        // 2. Cargar carrito
        await carrito.cargarCarrito(1);

        // 3. Mostrar
        carrito.mostrar();

        // 4. Verificar todo
        expect(carrito.usuarioServicio.obtenerUsuario).toHaveBeenCalled();
        expect(fadeIn).toHaveBeenCalled();
        expect(carrito.items).toHaveLength(1);
    });
});
```

### Paso 3: Ejecuta

```bash
npm test -- Ejercicio4.test.js
```

### ✅ Qué aprendiste
- Cómo mockear múltiples módulos
- Cómo mockear clases con `mockImplementation()`
- Cómo hacer tests de integración simple

---

## Ejercicio 5: Espiar Sin Cambiar (jest.spyOn)

### Objetivo
Aprender la diferencia entre mockear y espiar.

### Paso 1: Crea funciones que quieres mantener reales

```javascript
// src/modulos/Utilidades.js

export const sumar = (a, b) => {
    return a + b;
};

export const multiplicar = (a, b) => {
    return a * b;
};

export const calcularTotal = (items) => {
    return items.reduce((sum, item) => sum + item.precio, 0);
};
```

### Paso 2: Test usando jest.spyOn

Copia en `src/__tests__/Ejercicio5.test.js`:

```javascript
import * as Utilidades from '../modulos/Utilidades';

describe('Ejercicio 5: jest.spyOn', () => {
    let sumarSpy;
    let multiplicarSpy;

    beforeEach(() => {
        // Espiar funciones (no las reemplazas)
        sumarSpy = jest.spyOn(Utilidades, 'sumar');
        multiplicarSpy = jest.spyOn(Utilidades, 'multiplicar');
    });

    afterEach(() => {
        // IMPORTANTE: Restaurar spies
        sumarSpy.mockRestore();
        multiplicarSpy.mockRestore();
    });

    test('sumar funciona real pero se registra', () => {
        const resultado = Utilidades.sumar(2, 3);

        // La función REALMENTE funcionó
        expect(resultado).toBe(5);

        // Pero también se registró la llamada
        expect(sumarSpy).toHaveBeenCalledWith(2, 3);
        expect(sumarSpy).toHaveBeenCalledTimes(1);
    });

    test('multiplicar funciona real', () => {
        const resultado = Utilidades.multiplicar(4, 5);

        // Real
        expect(resultado).toBe(20);

        // Registrado
        expect(multiplicarSpy).toHaveBeenCalled();
    });

    test('calcularTotal funciona', () => {
        const items = [
            { id: 1, precio: 100 },
            { id: 2, precio: 200 },
            { id: 3, precio: 50 }
        ];

        const total = Utilidades.calcularTotal(items);

        expect(total).toBe(350);
    });

    test('comparar mock vs spy', () => {
        // Esto es con mock (reemplaza)
        const mock = jest.fn().mockReturnValue(100);
        const mockResultado = mock(2, 3);
        expect(mockResultado).toBe(100); // Retorna lo configurado

        // Esto es con spy (mantiene real)
        const spyResultado = Utilidades.sumar(2, 3);
        expect(spyResultado).toBe(5); // Retorna el real
    });
});
```

### Paso 3: Ejecuta

```bash
npm test -- Ejercicio5.test.js
```

### ✅ Qué aprendiste
- Diferencia entre mock (reemplaza) y spy (registra)
- Cuándo usar cada uno
- La importancia de `mockRestore()`

---

## Reto Final: Test Realista del Proyecto

### Objetivo
Aplicar todo lo aprendido en un test similar a tu código real.

### Paso: Test realista

Copia en `src/__tests__/RetoFinal.test.js`:

```javascript
import Modal from '../modulos/Modal';
import { fadeIn, fadeOut } from '../modulos/Animaciones';

jest.mock('../modulos/Animaciones', () => ({
    fadeIn: jest.fn(),
    fadeOut: jest.fn()
}));

describe('Reto Final: Test Realista', () => {
    let modal;
    let triggerBtn;
    let closeBtn;
    let modalElement;

    beforeEach(() => {
        // Setup HTML realista
        document.body.innerHTML = `
            <button id="openBtn" class="btn-modal" data-target="#miModal">
                Abrir Modal
            </button>
            <div id="miModal" class="modal">
                <div class="modal-header">
                    <h2>Título</h2>
                    <button id="closeBtn" class="close">&times;</button>
                </div>
                <div class="modal-body">
                    Contenido del modal
                </div>
            </div>
        `;

        triggerBtn = document.getElementById('openBtn');
        closeBtn = document.getElementById('closeBtn');
        modalElement = document.getElementById('miModal');

        modal = new Modal('#miModal');
        jest.clearAllMocks();
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    // Test 1: Verificar que se inicializa
    test('inicializa correctamente', () => {
        expect(modalElement).toBeTruthy();
        expect(triggerBtn).toBeTruthy();
        expect(closeBtn).toBeTruthy();
    });

    // Test 2: Verificar que fade se usa
    test('abre modal con animación', () => {
        triggerBtn.click();

        expect(fadeIn).toHaveBeenCalledWith(modalElement);
    });

    // Test 3: Verificar cierre
    test('cierra modal con animación', () => {
        // Primero abre
        triggerBtn.click();
        
        // Luego cierra
        closeBtn.click();

        expect(fadeOut).toHaveBeenCalledWith(
            modalElement,
            expect.any(Number)
        );
    });

    // Test 4: Múltiples aperturas
    test('puede abrir y cerrar varias veces', () => {
        triggerBtn.click();
        closeBtn.click();
        triggerBtn.click();

        // fadeIn debería llamarse 2 veces
        expect(fadeIn).toHaveBeenCalledTimes(2);

        // fadeOut debería llamarse 1 vez
        expect(fadeOut).toHaveBeenCalledTimes(1);
    });
});
```

### Ejecuta

```bash
npm test -- RetoFinal.test.js
```

---

## Checklist de Aprendizaje

Marca ✅ mientras avanzas:

- [ ] Entiendo qué es un mock
- [ ] Sé usar `jest.fn()`
- [ ] Sé usar `jest.mock()`
- [ ] Sé usar `__mocks__/`
- [ ] Entiendo `mockReturnValue()`
- [ ] Entiendo `mockResolvedValue()`
- [ ] Entiendo `mockRejectedValue()`
- [ ] Sé verificar llamadas con `expect().toHaveBeenCalled()`
- [ ] Sé verificar argumentos específicos
- [ ] Entiendo la diferencia entre mock y spy
- [ ] Puedo mockear múltiples módulos
- [ ] Sé cuándo mockear y cuándo no

---

## Próximos Pasos

Una vez completes estos ejercicios:

1. **Aplica a tu código**: Reemplaza tus tests existentes con lo aprendido
2. **Cubre más escenarios**: Agrega tests para casos edge
3. **Mejora mocks existentes**: Revisa `__mocks__/Animaciones.js` y `__tests__/Modal.test.js`
4. **Lee**: La guía completa en `JEST_MOCKING_GUIDE.md`

¡Felicidades por aprender testing! 🎉
