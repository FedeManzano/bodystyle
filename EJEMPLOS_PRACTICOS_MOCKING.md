# Ejemplos Prácticos de Mocking para tu Proyecto

Estos son ejemplos basados en tu estructura actual de tests.

---

## 1. Mock Simple: Función Utilitaria

### Caso Real: Validar que se llama una función

**Módulo:**
```javascript
// src/modulos/Utilidades.js
export const aplicarClase = (elemento, clase) => {
    elemento.classList.add(clase);
};

export const obtenerPosicion = (elemento) => {
    const rect = elemento.getBoundingClientRect();
    return {
        top: rect.top,
        left: rect.left
    };
};
```

**Test:**
```javascript
// src/__tests__/Utilidades.test.js

import { aplicarClase, obtenerPosicion } from '../modulos/Utilidades';

jest.mock('../modulos/Utilidades', () => ({
    aplicarClase: jest.fn(),
    obtenerPosicion: jest.fn()
}));

describe('Utilidades - Mockeo Simple', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('aplicarClase se llama con elementos correctos', () => {
        const elemento = document.createElement('div');
        const clase = 'activo';

        aplicarClase(elemento, clase);

        // Verificar que se llamó
        expect(aplicarClase).toHaveBeenCalled();
        // Verificar con qué argumentos
        expect(aplicarClase).toHaveBeenCalledWith(elemento, clase);
        // Verificar cuántas veces
        expect(aplicarClase).toHaveBeenCalledTimes(1);
    });

    test('obtenerPosicion retorna objeto mock', () => {
        const elemento = document.createElement('div');
        
        // Configurar qué retorna el mock
        obtenerPosicion.mockReturnValue({
            top: 100,
            left: 50
        });

        const resultado = obtenerPosicion(elemento);

        expect(resultado).toEqual({
            top: 100,
            left: 50
        });
        expect(obtenerPosicion).toHaveBeenCalledWith(elemento);
    });
});
```

---

## 2. Mock con Dependencia: Animación + Componente

Esto es similar a tu test de Modal.

**Módulo:**
```javascript
// src/modulos/Dropdown.js
import { fadeIn, fadeOut } from './Animaciones';

export default class Dropdown {
    constructor(selector) {
        this.elemento = document.querySelector(selector);
        this.abierto = false;
    }

    abrir() {
        this.abierto = true;
        fadeIn(this.elemento);
    }

    cerrar() {
        this.abierto = false;
        fadeOut(this.elemento);
    }
}
```

**Test:**
```javascript
// src/__tests__/Dropdown.test.js

import Dropdown from '../modulos/Dropdown';
import { fadeIn, fadeOut } from '../modulos/Animaciones';

// Mock de la dependencia
jest.mock('../modulos/Animaciones', () => ({
    fadeIn: jest.fn(),
    fadeOut: jest.fn()
}));

describe('Dropdown - Mockeo de Dependencia', () => {
    let dropdown;
    let elemento;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="dropdown" style="display: none;">
                Opciones
            </div>
        `;
        
        elemento = document.getElementById('dropdown');
        dropdown = new Dropdown('#dropdown');
        
        jest.clearAllMocks();
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('abre dropdown llamando a fadeIn', () => {
        dropdown.abrir();

        // Verificar que fadeIn fue llamado
        expect(fadeIn).toHaveBeenCalledTimes(1);
        expect(fadeIn).toHaveBeenCalledWith(elemento);
    });

    test('cierra dropdown llamando a fadeOut', () => {
        dropdown.abierto = true;
        dropdown.cerrar();

        expect(fadeOut).toHaveBeenCalledTimes(1);
        expect(fadeOut).toHaveBeenCalledWith(elemento);
    });

    test('no llama fadeOut si ya está cerrado', () => {
        dropdown.abrir();
        dropdown.cerrar();

        // fadeOut debería llamarse una vez (en cerrar)
        expect(fadeOut).toHaveBeenCalledTimes(1);
    });
});
```

---

## 3. Mock de Promesas: API Call

**Módulo:**
```javascript
// src/modulos/DataLoader.js
export class DataLoader {
    async cargar(url) {
        try {
            const response = await fetch(url);
            return response.json();
        } catch (error) {
            console.error('Error cargando datos:', error);
            throw error;
        }
    }
}
```

**Test:**
```javascript
// src/__tests__/DataLoader.test.js

import { DataLoader } from '../modulos/DataLoader';

describe('DataLoader - Mock de Promesas', () => {
    let loader;

    beforeEach(() => {
        loader = new DataLoader();
        jest.clearAllMocks();
    });

    test('carga datos exitosamente', async () => {
        // Mock fetch
        global.fetch = jest.fn().mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                id: 1,
                nombre: 'Juan'
            })
        });

        const datos = await loader.cargar('/api/usuarios');

        expect(datos).toEqual({
            id: 1,
            nombre: 'Juan'
        });
        expect(global.fetch).toHaveBeenCalledWith('/api/usuarios');
    });

    test('maneja errores de carga', async () => {
        global.fetch = jest.fn().mockRejectedValueOnce(
            new Error('Network error')
        );

        await expect(
            loader.cargar('/api/usuarios')
        ).rejects.toThrow('Network error');
    });

    test('reintentos en caso de error', async () => {
        let intentos = 0;
        
        global.fetch = jest.fn(async () => {
            intentos++;
            if (intentos === 1) {
                throw new Error('Fallo');
            }
            return {
                json: jest.fn().mockResolvedValueOnce({ data: 'OK' })
            };
        });

        // Primer intento falla
        await expect(loader.cargar('/api')).rejects.toThrow();
        
        // Segundo intento funciona
        const datos = await loader.cargar('/api');
        expect(datos.data).toBe('OK');
        
        expect(global.fetch).toHaveBeenCalledTimes(2);
    });
});
```

---

## 4. Mock de Múltiples Valores (Retornos Diferentes)

**Módulo:**
```javascript
// src/modulos/Navegacion.js
export class Navegacion {
    constructor() {
        this.items = [];
    }

    obtenerItem(indice) {
        return this.items[indice];
    }

    agregarItem(texto) {
        this.items.push({
            id: this.items.length + 1,
            texto: texto
        });
    }
}
```

**Test:**
```javascript
// src/__tests__/Navegacion.test.js

import { Navegacion } from '../modulos/Navegacion';

describe('Navegacion - Múltiples Retornos', () => {
    let nav;
    let mockObtener;

    beforeEach(() => {
        nav = new Navegacion();
        
        // Mock que retorna diferentes valores
        mockObtener = jest.fn()
            .mockReturnValueOnce({ id: 1, texto: 'Inicio' })
            .mockReturnValueOnce({ id: 2, texto: 'Servicios' })
            .mockReturnValueOnce(null);

        // Reemplazar método
        nav.obtenerItem = mockObtener;
    });

    test('retorna diferentes items en cada llamada', () => {
        const item1 = nav.obtenerItem(0);
        const item2 = nav.obtenerItem(1);
        const item3 = nav.obtenerItem(2);

        expect(item1).toEqual({ id: 1, texto: 'Inicio' });
        expect(item2).toEqual({ id: 2, texto: 'Servicios' });
        expect(item3).toBeNull();

        expect(mockObtener).toHaveBeenCalledTimes(3);
    });
});
```

---

## 5. Mock Automático en __mocks__/ (Recomendado)

Este es el enfoque que usa tu proyecto actualmente.

**Crear archivo:**
```javascript
// src/__mocks__/Animaciones.js

export const fadeIn = jest.fn((element, duration = 300) => {
    // Mock que simula el comportamiento real mínimamente
    element.style.opacity = '1';
    return Promise.resolve();
});

export const fadeOut = jest.fn((element, duration = 300) => {
    element.style.opacity = '0';
    return Promise.resolve();
});

export const slideDown = jest.fn();
export const slideUp = jest.fn();
```

**Usar en tests:**
```javascript
// src/__tests__/componente.test.js

// NO necesitas jest.mock() - Jest lo detecta automáticamente
import { fadeIn, fadeOut } from '../modulos/Animaciones';

describe('Componente con Animaciones', () => {
    test('usa animaciones', () => {
        fadeIn(element);
        
        // La función fue llamada
        expect(fadeIn).toHaveBeenCalled();
        
        // El mock hizo su trabajo
        expect(element.style.opacity).toBe('1');
    });
});
```

**Ventajas:**
- Jest lo usa automáticamente
- Se reutiliza en todos los tests
- Más limpio y mantenible

---

## 6. Espiar Sin Reemplazar (jest.spyOn)

Cuando quieres **registrar** llamadas sin cambiar el comportamiento.

**Test:**
```javascript
// src/__tests__/Modal.test.js

import Modal from '../modulos/Modal';
import * as Animaciones from '../modulos/Animaciones';

describe('Modal - Espiar Animaciones', () => {
    let spyFadeIn;
    let spyFadeOut;

    beforeEach(() => {
        // Crear spies (registran sin cambiar función)
        spyFadeIn = jest.spyOn(Animaciones, 'fadeIn');
        spyFadeOut = jest.spyOn(Animaciones, 'fadeOut');
    });

    afterEach(() => {
        // Restaurar funciones originales
        spyFadeIn.mockRestore();
        spyFadeOut.mockRestore();
    });

    test('llama funciones reales pero las registra', () => {
        const elemento = document.createElement('div');
        
        // Llama la función REAL pero también la registra
        Animaciones.fadeIn(elemento);

        // Puedes verificar que fue llamada
        expect(spyFadeIn).toHaveBeenCalled();
        
        // Y la función hizo su trabajo real
        expect(elemento.style.opacity).toBe('1');
    });
});
```

---

## 7. Mock Parcial: Mockear Solo Algunos Métodos

**Módulo:**
```javascript
// src/modulos/GestorDatos.js
export class GestorDatos {
    constructor() {
        this.datos = [];
    }

    agregar(item) {
        this.datos.push(item);
    }

    filtrar(criterio) {
        return this.datos.filter(d => d.tipo === criterio);
    }

    limpiar() {
        this.datos = [];
    }
}
```

**Test (mockear solo algunos métodos):**
```javascript
// src/__tests__/GestorDatos.test.js

import { GestorDatos } from '../modulos/GestorDatos';

jest.mock('../modulos/GestorDatos', () => ({
    GestorDatos: jest.fn().mockImplementation(() => ({
        // Métodos reales
        agregar: function(item) {
            this.datos = this.datos || [];
            this.datos.push(item);
        },
        
        // Métodos mockeados
        filtrar: jest.fn().mockReturnValue([]),
        limpiar: jest.fn(),
        
        datos: []
    }))
}));

describe('GestorDatos - Mock Parcial', () => {
    let gestor;

    beforeEach(() => {
        gestor = new GestorDatos();
        jest.clearAllMocks();
    });

    test('agregar funciona real, filtrar está mockeado', () => {
        // agregar funciona realmente
        gestor.agregar({ tipo: 'A' });
        expect(gestor.datos.length).toBe(1);

        // filtrar está mockeado, retorna []
        const resultado = gestor.filtrar('A');
        expect(resultado).toEqual([]);
        expect(gestor.filtrar).toHaveBeenCalled();
    });
});
```

---

## 8. Simulación Completa de Usuario

Test más realista que combina mocking con interacción del usuario.

**Módulo:**
```javascript
// src/modulos/Formulario.js
import { validarEmail } from './Validadores';
import { enviarAPI } from './API';
import { mostrarMensaje } from './Notificaciones';

export class Formulario {
    constructor(selector) {
        this.formulario = document.querySelector(selector);
        this.formulario.addEventListener('submit', (e) => this.manejarEnvio(e));
    }

    async manejarEnvio(e) {
        e.preventDefault();
        
        const email = this.formulario.email.value;
        
        if (!validarEmail(email)) {
            mostrarMensaje('Email inválido', 'error');
            return;
        }

        try {
            await enviarAPI('/submit', { email });
            mostrarMensaje('Éxito', 'success');
        } catch (error) {
            mostrarMensaje('Error al enviar', 'error');
        }
    }
}
```

**Test:**
```javascript
// src/__tests__/Formulario.test.js

import { Formulario } from '../modulos/Formulario';
import { validarEmail } from '../modulos/Validadores';
import { enviarAPI } from '../modulos/API';
import { mostrarMensaje } from '../modulos/Notificaciones';

// Mockear todas las dependencias
jest.mock('../modulos/Validadores');
jest.mock('../modulos/API');
jest.mock('../modulos/Notificaciones');

describe('Formulario - Simulación Completa', () => {
    let formulario;

    beforeEach(() => {
        document.body.innerHTML = `
            <form id="miForm">
                <input type="email" name="email" value="">
                <button type="submit">Enviar</button>
            </form>
        `;

        formulario = new Formulario('#miForm');
        jest.clearAllMocks();
    });

    test('envía formulario correctamente', async () => {
        // Configurar mocks
        validarEmail.mockReturnValue(true);
        enviarAPI.mockResolvedValueOnce({ ok: true });

        // Simular usuario llenando el formulario
        document.querySelector('[name="email"]').value = 'test@ejemplo.com';

        // Simular click en submit
        const submitBtn = document.querySelector('button');
        const formularioDOM = document.querySelector('form');
        
        // Disparar evento submit
        formularioDOM.dispatchEvent(new Event('submit'));

        // Esperar promesas
        await new Promise(r => setTimeout(r, 0));

        // Verificaciones
        expect(validarEmail).toHaveBeenCalledWith('test@ejemplo.com');
        expect(enviarAPI).toHaveBeenCalledWith('/submit', { 
            email: 'test@ejemplo.com' 
        });
        expect(mostrarMensaje).toHaveBeenCalledWith('Éxito', 'success');
    });

    test('maneja email inválido', async () => {
        validarEmail.mockReturnValue(false);

        document.querySelector('[name="email"]').value = 'invalido';
        document.querySelector('form').dispatchEvent(new Event('submit'));

        await new Promise(r => setTimeout(r, 0));

        expect(mostrarMensaje).toHaveBeenCalledWith(
            'Email inválido', 
            'error'
        );
        expect(enviarAPI).not.toHaveBeenCalled();
    });

    test('maneja errores de API', async () => {
        validarEmail.mockReturnValue(true);
        enviarAPI.mockRejectedValueOnce(new Error('Server error'));

        document.querySelector('[name="email"]').value = 'test@ejemplo.com';
        document.querySelector('form').dispatchEvent(new Event('submit'));

        await new Promise(r => setTimeout(r, 0));

        expect(mostrarMensaje).toHaveBeenCalledWith(
            'Error al enviar', 
            'error'
        );
    });
});
```

---

## Resumen de Patrones

| Patrón | Código | Cuándo |
|--------|--------|--------|
| Mock simple | `jest.fn()` | Función sin lógica |
| Mock retorno | `jest.fn().mockReturnValue(x)` | Función con valor |
| Mock promesa | `jest.fn().mockResolvedValue(x)` | Async/await |
| Mock error | `jest.fn().mockRejectedValue(e)` | Error esperado |
| Múltiples retornos | `.mockReturnValueOnce().mockReturnValueOnce()` | Diferentes valores |
| Mock automático | `__mocks__/archivo.js` | Reutilizar en tests |
| Espiar | `jest.spyOn(obj, 'method')` | Ver sin cambiar |

