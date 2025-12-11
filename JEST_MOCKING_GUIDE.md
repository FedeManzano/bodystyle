# Guía Completa: Mocking de Componentes con Jest

Esta guía te explica cómo hacer mocking de componentes y dependencias en Jest de forma práctica.

## Tabla de Contenidos
1. [Conceptos Básicos](#conceptos-básicos)
2. [Tipos de Mocks](#tipos-de-mocks)
3. [Mocking Manual vs Automático](#mocking-manual-vs-automático)
4. [Ejemplos Prácticos](#ejemplos-prácticos)
5. [Mejores Prácticas](#mejores-prácticas)

---

## Conceptos Básicos

### ¿Por qué hacer mocking?

Cuando testas un componente, a menudo necesitas **aislar** su funcionalidad de sus dependencias:
- Otros módulos complejos
- APIs externas (HTTP, base de datos)
- Animaciones
- Elementos del DOM que son difíciles de simular

El mocking reemplaza estas dependencias con versiones simplificadas para enfocarte en lo que realmente quieres probar.

### ¿Cuándo mockear?

✅ **Usa mocks cuando:**
- Necesitas aislar el componente de sus dependencias
- La dependencia es externa (API, base de datos)
- La dependencia es costosa de ejecutar (animaciones, timers)
- Necesitas controlar el comportamiento de la dependencia en tests

❌ **NO uses mocks cuando:**
- Quieres probar la integración real entre módulos
- La dependencia es simple y rápida (funciones puras)
- Necesitas probar el comportamiento end-to-end

---

## Tipos de Mocks

### 1. **Mocks Automáticos** (Manual Mocking)

Creas archivos mock en `__mocks__/` que Jest usa automáticamente.

**Estructura:**
```
src/
├── modulos/
│   └── Animaciones.js
├── __mocks__/
│   └── Animaciones.js      ← Mock automático
└── __tests__/
    └── Modal.test.js
```

**Cómo funciona:**

1. Creas un archivo en `__mocks__/` con el mismo nombre
2. Jest lo usa automáticamente al importar ese módulo
3. No necesitas código especial en el test

**Ejemplo:**

```javascript
// src/modulos/Animaciones.js (original)
export const fadeIn = (element) => {
    element.style.opacity = '1';
    // ... animación compleja
};

export const fadeOut = (element) => {
    element.style.opacity = '0';
    // ... animación compleja
};
```

```javascript
// src/__mocks__/Animaciones.js (mock automático)
export const fadeIn = jest.fn();
export const fadeOut = jest.fn();
```

```javascript
// src/__tests__/Modal.test.js (test)
import { fadeIn, fadeOut } from '../modulos/Animaciones';

// Jest AUTOMÁTICAMENTE usa el archivo de __mocks__

test('debe llamar a fadeIn', () => {
    fadeIn(element);
    expect(fadeIn).toHaveBeenCalled();
});
```

### 2. **jest.mock()** (Mock Manual en el Test)

Mockeas directamente en el archivo de test sin necesidad de `__mocks__/`.

**Ventajas:**
- Más control
- Más específico para ese test
- No necesitas crear archivos extras

**Ejemplo:**

```javascript
// src/__tests__/Modal.test.js

import Modal from '../modulos/Modal';
import { fadeIn, fadeOut } from '../modulos/Animaciones';

// Jest.mock() debe ir en el nivel superior del archivo
jest.mock('../modulos/Animaciones', () => ({
    fadeIn: jest.fn(),
    fadeOut: jest.fn()
}));

describe('Modal', () => {
    test('abre modal con fadeIn', () => {
        Modal.open();
        expect(fadeIn).toHaveBeenCalled();
    });
});
```

### 3. **jest.spyOn()** (Espiar sin Reemplazar)

Mantiene la funcionalidad original pero registra las llamadas.

```javascript
const animaciones = require('../modulos/Animaciones');

test('registra llamadas sin cambiar comportamiento', () => {
    const spy = jest.spyOn(animaciones, 'fadeIn');
    
    animaciones.fadeIn(element);
    
    expect(spy).toHaveBeenCalled();
    expect(element.style.opacity).toBe('1'); // Funcionó real
    
    spy.mockRestore(); // Restaura la función original
});
```

---

## Mocking Manual vs Automático

### Mock Automático ✅ Simple

```javascript
// __mocks__/Animaciones.js
export const fadeIn = jest.fn();
```

```javascript
// test.js
import { fadeIn } from '../modulos/Animaciones'; // ← Jest usa automáticamente el mock
```

**Ventajas:**
- Automático y limpio
- Se reutiliza en todos los tests

**Desventajas:**
- Menos flexible
- No puedes cambiar comportamiento por test

### Mock Manual ✅ Flexible

```javascript
// test.js
jest.mock('../modulos/Animaciones', () => ({
    fadeIn: jest.fn().mockImplementation((el) => {
        el.style.opacity = '1';
    })
}));

import { fadeIn } from '../modulos/Animaciones';
```

**Ventajas:**
- Puedes implementar lógica custom
- Máximo control

**Desventajas:**
- Más código en cada test
- No se reutiliza

---

## Ejemplos Prácticos

### Ejemplo 1: Mockear una Función Simple

**Módulo original:**
```javascript
// src/modulos/Utilidades.js
export const validarEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

**Test con mock:**
```javascript
import { validarEmail } from '../modulos/Utilidades';

jest.mock('../modulos/Utilidades', () => ({
    validarEmail: jest.fn()
}));

describe('Validación de Email', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('retorna true para email válido', () => {
        // Configurar el mock para este test
        validarEmail.mockReturnValue(true);
        
        expect(validarEmail('test@ejemplo.com')).toBe(true);
        expect(validarEmail).toHaveBeenCalledWith('test@ejemplo.com');
    });

    test('retorna false para email inválido', () => {
        validarEmail.mockReturnValue(false);
        
        expect(validarEmail('no-es-email')).toBe(false);
    });
});
```

### Ejemplo 2: Mockear un Módulo Completo

**Módulo original:**
```javascript
// src/modulos/API.js
export class APIClient {
    async fetchData(url) {
        const response = await fetch(url);
        return response.json();
    }
}
```

**Mock:**
```javascript
// src/__mocks__/API.js
export class APIClient {
    async fetchData(url) {
        return Promise.resolve({ 
            data: 'mock data',
            url: url 
        });
    }
}
```

**Test:**
```javascript
import { APIClient } from '../modulos/API';

jest.mock('../modulos/API');

describe('APIClient', () => {
    test('fetches data', async () => {
        const client = new APIClient();
        const data = await client.fetchData('/users');
        
        expect(data).toEqual({ data: 'mock data', url: '/users' });
    });
});
```

### Ejemplo 3: Mockear con Diferentes Comportamientos

```javascript
jest.mock('../modulos/API', () => ({
    fetch: jest.fn()
}));

import { fetch } from '../modulos/API';

describe('Casos diferentes', () => {
    test('maneja respuesta exitosa', async () => {
        fetch.mockResolvedValueOnce({ status: 200, data: 'OK' });
        
        const result = await fetch('/api/data');
        expect(result.status).toBe(200);
    });

    test('maneja error', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));
        
        await expect(fetch('/api/data')).rejects.toThrow('Network error');
    });

    test('maneja múltiples llamadas diferente', () => {
        fetch
            .mockReturnValueOnce({ id: 1 })
            .mockReturnValueOnce({ id: 2 })
            .mockReturnValueOnce({ id: 3 });

        expect(fetch()).toEqual({ id: 1 });
        expect(fetch()).toEqual({ id: 2 });
        expect(fetch()).toEqual({ id: 3 });
    });
});
```

### Ejemplo 4: Mockear Animaciones (Tu Caso Real)

```javascript
// src/__tests__/Modal.test.js

import Modal from '../modulos/Modal';
import { fadeIn, fadeOut } from '../modulos/Animaciones';

// ← Mock automático en __mocks__/Animaciones.js
jest.mock('../modulos/Animaciones', () => ({
    fadeIn: jest.fn(),
    fadeOut: jest.fn()
}));

describe('Modal con Animaciones Mockeadas', () => {
    let modal;

    beforeEach(() => {
        document.body.innerHTML = `
            <button class="open-modal">Abrir</button>
            <div id="modal" class="modal">Contenido</div>
        `;

        jest.clearAllMocks();
        modal = new Modal('#modal');
    });

    test('abre modal con fadeIn', () => {
        modal.open();

        expect(fadeIn).toHaveBeenCalledTimes(1);
        expect(fadeIn).toHaveBeenCalledWith(
            document.getElementById('modal')
        );
    });

    test('cierra modal con fadeOut', () => {
        modal.open();
        modal.close();

        expect(fadeOut).toHaveBeenCalledTimes(1);
    });

    test('verifica argumentos exactos', () => {
        const element = document.getElementById('modal');
        modal.open();

        expect(fadeIn).toHaveBeenCalledWith(element);
        expect(fadeIn.mock.calls[0][0]).toBe(element);
    });
});
```

### Ejemplo 5: Mockear Dependencies Anidadas

```javascript
// src/modulos/FormHandler.js
import { validarEmail } from './Validadores';
import { enviarDatos } from './API';

export class FormHandler {
    async submit(datos) {
        if (!validarEmail(datos.email)) {
            throw new Error('Email inválido');
        }
        return enviarDatos(datos);
    }
}
```

```javascript
// src/__tests__/FormHandler.test.js

import { FormHandler } from '../modulos/FormHandler';
import { validarEmail } from '../modulos/Validadores';
import { enviarDatos } from '../modulos/API';

// Mockear múltiples dependencias
jest.mock('../modulos/Validadores', () => ({
    validarEmail: jest.fn()
}));

jest.mock('../modulos/API', () => ({
    enviarDatos: jest.fn()
}));

describe('FormHandler', () => {
    let handler;

    beforeEach(() => {
        jest.clearAllMocks();
        handler = new FormHandler();
    });

    test('envía datos si email es válido', async () => {
        validarEmail.mockReturnValue(true);
        enviarDatos.mockResolvedValue({ success: true });

        const resultado = await handler.submit({ 
            email: 'test@ejemplo.com',
            nombre: 'Juan'
        });

        expect(validarEmail).toHaveBeenCalledWith('test@ejemplo.com');
        expect(enviarDatos).toHaveBeenCalled();
        expect(resultado.success).toBe(true);
    });

    test('no envía si email es inválido', async () => {
        validarEmail.mockReturnValue(false);

        await expect(
            handler.submit({ email: 'invalido' })
        ).rejects.toThrow('Email inválido');

        expect(enviarDatos).not.toHaveBeenCalled();
    });
});
```

---

## Mejores Prácticas

### 1. **Siempre Limpiar Mocks entre Tests**

```javascript
beforeEach(() => {
    jest.clearAllMocks(); // ← Limpia llamadas anteriores
});
```

### 2. **Usa Nombres Descriptivos**

```javascript
// ❌ Malo
jest.fn();

// ✅ Bueno
jest.fn().mockName('mockFadeIn');
```

### 3. **Verifica Llamadas, No Solo Retornos**

```javascript
// ❌ No es suficiente
expect(fadeIn()).toBeTruthy();

// ✅ Completo
expect(fadeIn).toHaveBeenCalledTimes(1);
expect(fadeIn).toHaveBeenCalledWith(element);
```

### 4. **Organiza tu Código de Mocks**

```javascript
// Todos los jest.mock() al principio del archivo
jest.mock('../modulos/Animaciones');
jest.mock('../modulos/API');
jest.mock('../modulos/Validadores');

// Luego los imports
import Modal from '../modulos/Modal';
import { fadeIn } from '../modulos/Animaciones';

// Luego los tests
describe('Tests', () => {
    // ...
});
```

### 5. **Restaura Después de Cambios Globales**

```javascript
test('test que modifica Object.prototype', () => {
    const mockFn = jest.fn();
    
    // Hacer algo
    mockFn();
    
    // Jest lo restaura automáticamente en afterEach
});

afterEach(() => {
    jest.clearAllMocks();
});
```

### 6. **Mockea Solo lo Necesario**

```javascript
// ❌ Mockea todo (tú no necesitas esto)
jest.mock('../modulos/Modal');

// ✅ Mockea solo dependencias
jest.mock('../modulos/Animaciones');
jest.mock('../modulos/API');

// Importa el componente real
import Modal from '../modulos/Modal';
```

---

## Cheat Sheet Rápido

```javascript
// Mock básico
const mock = jest.fn();

// Mock que retorna valor
jest.fn().mockReturnValue(true);

// Mock que retorna promesa resuelta
jest.fn().mockResolvedValue({ data: 'OK' });

// Mock que lanza error
jest.fn().mockRejectedValue(new Error('Fail'));

// Múltiples retornos
jest.fn()
    .mockReturnValueOnce(1)
    .mockReturnValueOnce(2)
    .mockReturnValueOnce(3);

// Verificar llamadas
expect(mock).toHaveBeenCalled();
expect(mock).toHaveBeenCalledTimes(3);
expect(mock).toHaveBeenCalledWith(arg1, arg2);

// Ver llamadas
console.log(mock.mock.calls); // Array de arrays

// Limpiar
jest.clearAllMocks();
mock.mockClear();
mock.mockReset();
```

---

## Resumen

| Concepto | Cuándo Usar | Cómo |
|----------|-----------|------|
| **jest.mock()** | Mockear en el test | `jest.mock('path', () => ({...}))` |
| **__mocks__/** | Reutilizar mock en varios tests | Crea archivo en `__mocks__/` |
| **jest.spyOn()** | Ver llamadas sin cambiar función | `jest.spyOn(obj, 'method')` |
| **mockReturnValue()** | Controlar qué retorna | `mock.mockReturnValue(value)` |
| **mockResolvedValue()** | Mockear promesas | `mock.mockResolvedValue(data)` |
| **jest.clearAllMocks()** | Limpiar entre tests | En `beforeEach()` |

