# 🔄 Guía de Migración de Bootstrap a Bodystyle para React

Esta guía te ayudará a migrar tu proyecto React desde Bootstrap a Bodystyle, aprovechando las ventajas de una biblioteca moderna, ligera y con soporte completo para TypeScript.

---

## 📋 Tabla de Contenidos

- [¿Por qué migrar a Bodystyle?](#-por-qué-migrar-a-bodystyle)
- [Comparación Rápida](#-comparación-rápida)
- [Proceso de Migración](#-proceso-de-migración)
- [Mapeo de Componentes](#-mapeo-de-componentes)
- [Mapeo de Clases CSS](#-mapeo-de-clases-css)
- [API de JavaScript](#-api-de-javascript)
- [Ejemplos de Migración](#-ejemplos-de-migración)
- [Solución de Problemas](#-solución-de-problemas)

---

## 🎯 ¿Por qué migrar a Bodystyle?

### Ventajas de Bodystyle sobre Bootstrap

| Característica | Bootstrap | Bodystyle |
|----------------|-----------|-----------|
| **Tamaño del Bundle** | ~150KB (min+gzip) | ~120KB (min+gzip) |
| **Dependencias JS** | Popper.js requerido | Sin dependencias externas* |
| **TypeScript** | Tipos vía @types | Tipos nativos incluidos |
| **jQuery** | No requerido (v5+) | 100% Vanilla JS |
| **Personalización** | SASS variables | SASS completo + variables |
| **Componentes Únicos** | Estándar | Waves, Parallax, ScrollSpy |
| **Curva de Aprendizaje** | Media | Baja (sintaxis similar) |

> *Excepto `dynamics-tips` y `show-sintax` para componentes específicos

---

## ⚡ Comparación Rápida

### Sistema de Grid

```jsx
// Bootstrap
<div className="container">
  <div className="row">
    <div className="col-md-6">Contenido</div>
    <div className="col-md-6">Contenido</div>
  </div>
</div>

// Bodystyle
<div className="contenedor">
  <div className="fila"> // fila  o row
    <div className="cm-6">Contenido</div>
    <div className="cm-6">Contenido</div>
  </div>
</div>
```

### Botones

```jsx
// Bootstrap
<button className="btn btn-primary btn-lg">Click me</button>

// Bodystyle
<button className="btn bg-blue fz-18">Click me</button>
```

---

## 🚀 Proceso de Migración

### Paso 1: Instalación

#### Desinstalar Bootstrap

```bash
npm uninstall bootstrap react-bootstrap
```

#### Instalar Bodystyle

```bash
npm install bodyui2
```

### Paso 2: Configuración en React

#### Opción A: Importación Global (Recomendada)

**`src/index.js` o `src/index.tsx`**

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Importar Bodystyle CSS y JS
import "bodyui2/dist/css/bodystyle.min.css";
import "bodyui2/dist/js/bodystyle.min.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

#### Opción B: Importación Modular (TypeScript)

```typescript
import BS from 'bodyui2';
import { Waves, slideUp, slideDown } from 'bodyui2';
import 'bodyui2/dist/css/bodystyle.min.css';
```

### Paso 3: Inicialización de Componentes

**`src/App.js` o `src/App.tsx`**

```javascript
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Inicializar componentes dinámicos de Bodystyle
    if (window.BS) {
      window.BS.DynamicsAutoInit(); // Inicializa todos los componentes automáticamente
      window.BS.WavesInit();        // Efecto de ondas en botones
      window.BS.ToolTipsInit();     // Tooltips dinámicos
    }
  }, []); // Solo se ejecuta una vez al montar

  return (
    <div className="App">
      {/* Tu contenido aquí */}
    </div>
  );
}

export default App;
```

### Paso 4: Migración de Componentes

Reemplaza gradualmente los componentes de Bootstrap con sus equivalentes en Bodystyle (ver [Mapeo de Componentes](#-mapeo-de-componentes)).

---

## 🗺️ Mapeo de Componentes

### Alertas

```jsx
// Bootstrap
<div className="alert alert-success" role="alert">
  ¡Operación exitosa!
</div>

// Bodystyle
<div className="alerta bg-green c-white bor-rad-5 p-3">
  ¡Operación exitosa!
</div>

// O usando JavaScript
useEffect(() => {
  window.BS.alerta('¡Operación exitosa!', 'bg-green');
}, []);
```

### Badges

```jsx
// Bootstrap
<span className="badge bg-primary">Nuevo</span>

// Bodystyle
<span className="badge bg-blue c-white">Nuevo</span>
```

### Botones

```jsx
// Bootstrap
<button className="btn btn-primary">Primario</button>
<button className="btn btn-outline-secondary">Secundario</button>

// Bodystyle
<button className="btn bg-blue">Primario</button>
<button className="btn fd-blue">Secundario</button>
```

### Cards (Tarjetas)

```jsx
// Bootstrap
<div className="card">
  <div className="card-header">Título</div>
  <div className="card-body">
    <h5 className="card-title">Subtítulo</h5>
    <p className="card-text">Contenido</p>
  </div>
</div>

// Bodystyle
<div className="card bor-rad-10 sombra-1">
  <div className="card-header bg-blue c-white">Título</div>
  <div className="card-body p-3">
    <h5 className="fz-20 fw-bold">Subtítulo</h5>
    <p>Contenido</p>
  </div>
</div>
```

### Modales

```jsx
// Bootstrap (con react-bootstrap)
import { Modal, Button } from 'react-bootstrap';

function MyModal() {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button onClick={() => setShow(true)}>Abrir Modal</Button>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Título</Modal.Title>
        </Modal.Header>
        <Modal.Body>Contenido</Modal.Body>
      </Modal>
    </>
  );
}

// Bodystyle
function MyModal() {
  const openModal = () => {
    window.BS.Modal({
      titulo: 'Título',
      contenido: '<p>Contenido del modal</p>',
      clases: ['bg-white', 'bor-rad-10']
    });
  };

  return (
    <button className="btn bg-blue" onClick={openModal}>
      Abrir Modal
    </button>
  );
}
```

### Dropdowns

```jsx
// Bootstrap
<div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" 
          type="button" 
          data-bs-toggle="dropdown">
    Dropdown
  </button>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item" href="#">Acción 1</a></li>
    <li><a className="dropdown-item" href="#">Acción 2</a></li>
  </ul>
</div>

// Bodystyle
<div className="dropdown">
  <button className="btn bg-blue dropdown-trigger" 
          data-target="dropdown1">
    Dropdown
  </button>
  <ul id="dropdown1" className="dropdown-content">
    <li><a href="#">Acción 1</a></li>
    <li><a href="#">Acción 2</a></li>
  </ul>
</div>
```

### Navbar

```jsx
// Bootstrap
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Logo</a>
    <button className="navbar-toggler" type="button">
      <span className="navbar-toggler-icon"></span>
    </button>
  </div>
</nav>

// Bodystyle
<nav className="nav bg-blue">
  <div className="contenedor">
    <a href="#" className="nav-logo c-white">Logo</a>
    <ul className="nav-menu">
      <li><a href="#" className="c-white">Inicio</a></li>
      <li><a href="#" className="c-white">Acerca</a></li>
    </ul>
  </div>
</nav>
```

### Formularios

```jsx
// Bootstrap
<div className="mb-3">
  <label htmlFor="email" className="form-label">Email</label>
  <input type="email" className="form-control" id="email" />
</div>

// Bodystyle
<div className="input-grupo mb-3">
  <label htmlFor="email">Email</label>
  <input type="email" className="input-text" id="email" />
</div>
```

### Tabs (Pestañas)

```jsx
// Bootstrap
<ul className="nav nav-tabs">
  <li className="nav-item">
    <a className="nav-link active" href="#tab1">Tab 1</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#tab2">Tab 2</a>
  </li>
</ul>

// Bodystyle
<ul className="tabs">
  <li className="tab-item active">
    <a href="#tab1" className="tab-link">Tab 1</a>
  </li>
  <li className="tab-item">
    <a href="#tab2" className="tab-link">Tab 2</a>
  </li>
</ul>
```

---

## 🎨 Mapeo de Clases CSS

### Utilidades de Espaciado

| Bootstrap | Bodystyle | Descripción |
|-----------|-----------|-------------|
| `m-0` a `m-5` | `m-0` a `m-5` | Margin (igual) |
| `p-0` a `p-5` | `p-0` a `p-5` | Padding (igual) |
| `mt-3` | `mt-3` | Margin top |
| `mb-3` | `mb-3` | Margin bottom |
| `mx-auto` | `mx-auto` | Margin horizontal auto |

### Utilidades de Texto

| Bootstrap | Bodystyle | Descripción |
|-----------|-----------|-------------|
| `text-center` | `ta-c` | Texto centrado |
| `text-left` | `ta-l` | Texto a la izquierda |
| `text-right` | `ta-r` | Texto a la derecha |
| `text-uppercase` | `tt-u` | Texto en mayúsculas |
| `text-lowercase` | `tt-l` | Texto en minúsculas |
| `fw-bold` | `fw-bold` | Texto en negrita |
| `fs-1` a `fs-6` | `fz-10` a `fz-50` | Tamaño de fuente |

### Utilidades de Color

| Bootstrap | Bodystyle | Descripción |
|-----------|-----------|-------------|
| `text-primary` | `c-blue` | Color de texto azul |
| `text-danger` | `c-red` | Color de texto rojo |
| `text-success` | `c-green` | Color de texto verde |
| `bg-primary` | `bg-blue` | Fondo azul |
| `bg-danger` | `bg-red` | Fondo rojo |
| `bg-success` | `bg-green` | Fondo verde |

### Flexbox

| Bootstrap | Bodystyle | Descripción |
|-----------|-----------|-------------|
| `d-flex` | `flex` | Display flex |
| `justify-content-center` | `jc-c` | Justify center |
| `justify-content-between` | `jc-sb` | Justify space-between |
| `align-items-center` | `ai-c` | Align items center |
| `flex-column` | `fd-c` | Flex direction column |
| `flex-row` | `fd-r` | Flex direction row |

### Display

| Bootstrap | Bodystyle | Descripción |
|-----------|-----------|-------------|
| `d-none` | `d-none` | Display none |
| `d-block` | `d-block` | Display block |
| `d-inline` | `d-inline` | Display inline |
| `d-inline-block` | `d-inline-block` | Display inline-block |

### Bordes y Sombras

| Bootstrap | Bodystyle | Descripción |
|-----------|-----------|-------------|
| `rounded` | `bor-rad-5` | Border radius |
| `rounded-circle` | `bor-rad-50p` | Border radius 50% |
| `border` | `bor-1` | Border 1px |
| `shadow` | `sombra-1` | Box shadow |
| `shadow-lg` | `sombra-3` | Box shadow grande |

---

## 🔧 API de JavaScript

### Inicialización de Componentes

```javascript
// Bootstrap
import { Tooltip, Modal, Dropdown } from 'bootstrap';

const tooltip = new Tooltip(element);
const modal = new Modal(element);

// Bodystyle
window.BS.ToolTipsInit();     // Inicializa todos los tooltips
window.BS.DynamicsAutoInit(); // Inicializa todos los componentes
window.BS.WavesInit();        // Inicializa efecto waves
```

### Toasts/Notificaciones

```javascript
// Bootstrap
import { Toast } from 'bootstrap';
const toast = new Toast(element);
toast.show();

// Bodystyle
window.BS.Toast({
  mensaje: '¡Operación exitosa!',
  clases: ['bg-green', 'c-white'],
  duracion: 3000,
  cerrar: true
});
```

### Modales

```javascript
// Bootstrap
import { Modal } from 'bootstrap';
const modal = new Modal(document.getElementById('myModal'));
modal.show();

// Bodystyle
window.BS.Modal({
  titulo: 'Título del Modal',
  contenido: '<p>Contenido HTML</p>',
  clases: ['bg-white', 'bor-rad-10'],
  cerrar: true
});
```

### Alertas

```javascript
// Bootstrap (manual)
const alertDiv = document.createElement('div');
alertDiv.className = 'alert alert-success';
alertDiv.textContent = 'Mensaje';

// Bodystyle
window.BS.alerta('Mensaje de éxito', 'bg-green');
```

---

## 💡 Ejemplos de Migración

### Ejemplo 1: Componente de Tarjeta de Producto

#### Antes (Bootstrap)

```jsx
import React from 'react';

function ProductCard({ title, price, image }) {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text text-success fw-bold">${price}</p>
        <button className="btn btn-primary w-100">
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
```

#### Después (Bodystyle)

```jsx
import React from 'react';

function ProductCard({ title, price, image }) {
  const handleAddToCart = () => {
    window.BS.Toast({
      mensaje: `${title} agregado al carrito`,
      clases: ['bg-green', 'c-white'],
      duracion: 2000
    });
  };

  return (
    <div className="card bor-rad-10 sombra-2" style={{ width: '18rem' }}>
      <img src={image} className="w-100 bor-rad-top-10" alt={title} />
      <div className="card-body p-3">
        <h5 className="fz-18 fw-bold mb-2">{title}</h5>
        <p className="c-green fw-bold fz-20">${price}</p>
        <button 
          className="btn bg-blue c-white w-100 waves-effect"
          onClick={handleAddToCart}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
```

### Ejemplo 2: Formulario de Contacto

#### Antes (Bootstrap)

```jsx
import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nombre</label>
        <input 
          type="text" 
          className="form-control" 
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input 
          type="email" 
          className="form-control" 
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">Mensaje</label>
        <textarea 
          className="form-control" 
          id="message" 
          rows="3"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
        />
      </div>
      <button type="submit" className="btn btn-primary">Enviar</button>
    </form>
  );
}
```

#### Después (Bodystyle)

```jsx
import React, { useState, useEffect } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    // Inicializar validación de formularios de Bodystyle
    if (window.BS) {
      window.BS.InputHandlerInit();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mostrar toast de confirmación
    window.BS.Toast({
      mensaje: '¡Mensaje enviado correctamente!',
      clases: ['bg-green', 'c-white', 'bor-rad-10'],
      duracion: 3000,
      cerrar: true
    });
    
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="contenedor mt-5">
      <div className="input-grupo mb-3">
        <label htmlFor="name">Nombre</label>
        <input 
          type="text" 
          className="input-text" 
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>
      <div className="input-grupo mb-3">
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          className="input-text" 
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
      </div>
      <div className="input-grupo mb-3">
        <label htmlFor="message">Mensaje</label>
        <textarea 
          className="input-text" 
          id="message" 
          rows="3"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          required
        />
      </div>
      <button type="submit" className="btn bg-blue c-white waves-effect">
        Enviar
      </button>
    </form>
  );
}
```

### Ejemplo 3: Hook Personalizado para Bodystyle

```typescript
// useBodystyle.ts
import { useEffect } from 'react';

export const useBodystyle = () => {
  useEffect(() => {
    if (window.BS) {
      window.BS.DynamicsAutoInit();
      window.BS.WavesInit();
      window.BS.ToolTipsInit();
    }
  }, []);

  return {
    toast: (mensaje: string, tipo: 'success' | 'error' | 'info' = 'success') => {
      const colores = {
        success: 'bg-green',
        error: 'bg-red',
        info: 'bg-blue'
      };

      window.BS.Toast({
        mensaje,
        clases: [colores[tipo], 'c-white', 'bor-rad-10'],
        duracion: 3000,
        cerrar: true
      });
    },
    
    modal: (titulo: string, contenido: string) => {
      window.BS.Modal({
        titulo,
        contenido,
        clases: ['bg-white', 'bor-rad-10'],
        cerrar: true
      });
    },
    
    alerta: (mensaje: string, tipo: string = 'bg-blue') => {
      window.BS.alerta(mensaje, tipo);
    }
  };
};

// Uso en componente
function MyComponent() {
  const { toast, modal } = useBodystyle();

  const handleClick = () => {
    toast('¡Acción completada!', 'success');
  };

  return (
    <button onClick={handleClick} className="btn bg-blue">
      Click me
    </button>
  );
}
```

---

## 🔍 Solución de Problemas

### Problema 1: Los componentes dinámicos no funcionan

**Solución:** Asegúrate de inicializar Bodystyle después de que el DOM esté listo.

```javascript
useEffect(() => {
  if (window.BS) {
    window.BS.DynamicsAutoInit();
    window.BS.WavesInit();
  }
}, []);
```

### Problema 2: Estilos no se aplican correctamente

**Solución:** Verifica que el CSS de Bodystyle se importe antes que tus estilos personalizados.

```javascript
// index.js - orden correcto
import 'bodyui2/dist/css/bodystyle.min.css';
import './index.css'; // Tus estilos personalizados
```

### Problema 3: TypeScript no reconoce `window.BS`

**Solución:** Declara el tipo global en un archivo de definiciones.

```typescript
// src/bodystyle.d.ts
declare global {
  interface Window {
    BS: any;
  }
}

export {};
```

### Problema 4: Conflictos con React Router

**Solución:** Reinicializa Bodystyle cuando cambies de ruta.

```javascript
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  useEffect(() => {
    if (window.BS) {
      window.BS.DynamicsAutoInit();
    }
  }, [location]); // Reinicializa en cada cambio de ruta

  return <Routes>...</Routes>;
}
```

### Problema 5: Animaciones no funcionan en componentes dinámicos

**Solución:** Usa `useEffect` con dependencias para reinicializar cuando el contenido cambie.

```javascript
function DynamicComponent({ items }) {
  useEffect(() => {
    if (window.BS) {
      window.BS.WavesInit();
    }
  }, [items]); // Reinicializa cuando items cambie

  return (
    <div>
      {items.map(item => (
        <button key={item.id} className="btn bg-blue waves-effect">
          {item.name}
        </button>
      ))}
    </div>
  );
}
```

---

## 📚 Recursos Adicionales

- [Documentación Oficial de Bodystyle](https://bodystyle.webcindario.com)
- [Repositorio en GitHub](https://github.com/FedeManzano/bodystyle)
- [NPM Package](https://www.npmjs.com/package/bodyui2)
- [Ejemplos de Código](https://github.com/FedeManzano/bodystyle/tree/master/ejemplos)

---

## 🤝 Contribuir

Si encuentras errores en esta guía o tienes sugerencias, por favor abre un [issue](https://github.com/FedeManzano/bodystyle/issues) en GitHub.

---

## 📄 Licencia

Esta guía está bajo la [Licencia MIT](https://github.com/FedeManzano/bodystyle/blob/master/LICENSE), al igual que Bodystyle.

---

**¿Necesitas ayuda con la migración?** Abre un issue en el repositorio de Bodystyle y la comunidad te ayudará.
