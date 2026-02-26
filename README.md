<p align="center">
  <img src="https://fotos.miarroba.com/th/e029/2A6A4EBA8C2C69A08A0D2B69A089FA.png" width="300px" alt="Bodystyle Logo" />
</p>


<h1 align="center">Bodystyle</h1>

<p align="center">
  <a href="https://mega.nz/file/8cFFjSYZ#y82eMpvPRGRoQZUA8Lktuj3oHmFVMonJAE8hgFHj1MA"><img src="https://img.shields.io/badge/MEGA-Download-green" alt="MEGA Download"></a>
  <a href="https://mega.nz/file/dFMVnaSD#Bl1jtd8F_wN4Egd-_ijJdodQPOkI0owOw8N3kT7sgCo"><img src="https://img.shields.io/badge/Documentation-v4.0.0-blue" alt="Docs Download"></a>
  <a href="https://bodystyle.webcindario.com"><img src="https://img.shields.io/badge/Documentation-Online-blue" alt="Documentation"></a>
  <a href="https://www.npmjs.com/package/bodyui2"><img src="https://img.shields.io/badge/NPM-bodyui2-orange" alt="NPM"></a>
  <a href="https://github.com/FedeManzano/bodystyle/blob/master/LICENSE"><img src="https://img.shields.io/badge/LICENSE-MIT-purple" alt="License"></a>
  <a href="https://github.com/FedeManzano/bodystyle/releases/tag/v6.5.0"><img src="https://img.shields.io/badge/VERSION-6.5.0-red" alt="Version"></a>
  <a href="./MODAL_ACCESIBILIDAD.md"><img src="https://img.shields.io/badge/♿-Accesibilidad-blue" alt="Accessibility"></a>
</p>

<p align="center">
  <a href="https://github.com/FedeManzano/bodystyle/actions/workflows/ci.yml"><img src="https://github.com/FedeManzano/bodystyle/actions/workflows/ci.yml/badge.svg" alt="CI/CD Status"></a>
  <img src="https://img.shields.io/badge/tests-247%20passing-brightgreen" alt="Tests">
  <img src="https://img.shields.io/badge/coverage-91%25-brightgreen" alt="Coverage"/>
  <img src="https://img.shields.io/badge/quality-9.5%2F10-brightgreen" alt="Quality Score">
  <img src="https://img.shields.io/badge/jQuery-Free-brightgreen" alt="jQuery Free">
  <img src="https://img.shields.io/badge/TypeScript-supported-blue" alt="TypeScript Support">
</p>

<p align="center">
  <strong>Tu caja de herramientas CSS para resolver cualquier problema UI con mínimo código</strong>
</p>
<p align="center">
  <em>Utilidades granulares + Componentes interactivos opcionales. Sin dependencias. Sin build process necesario.</em>
</p>

---

## 📋 Tabla de Contenidos

- [Acerca de Bodystyle](#-acerca-de-bodystyle)
- [¿Por qué Bodystyle?](#-por-qué-bodystyle)
- [Características Principales](#-características-principales)
- [Resolviendo Problemas en Segundos](#-resolviendo-problemas-en-segundos)
- [Comparativa](#-comparativa)
- [Inicio Rápido](#-inicio-rápido)
- [Instalación](#-instalación)
- [TypeScript Support](#-typescript-support)
- [Migración desde Bootstrap](#-migración-desde-bootstrap)
- [Core de Bodystyle](#-core-de-bodystyle)
- [Documentación](#-documentación)
- [Desarrollo](#-desarrollo)
- [Compatibilidad de Navegadores](#-compatibilidad-de-navegadores)
- [Dependencias](#-dependencias)
- [Novedades v6.5.0](#-novedades-v650)
- [Novedades v6.0.0](#-novedades-v600)
- [📊 Informe de Calidad](QUALITY.md)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Autor](#-autor)

---

## 🎯 Acerca de Bodystyle

Bodystyle es una **biblioteca de software libre** diseñada para facilitar la creación del Front-End de sitios y aplicaciones web. Está conformada por cuatro módulos principales que constituyen su **core**, permitiendo agrupar y distribuir elementos de diferentes características de manera eficiente en toda la interfaz de usuario (UI).

**Objetivo:** Proporcionar herramientas poderosas a los desarrolladores para crear diseños innovadores y enfocarse en mejorar continuamente la experiencia de usuario (UX).

> **Versión actual:** `v6.5.0` - ♿ **Con Accesibilidad WCAG 2.1**

---

## ✅ ¿Por qué Bodystyle?

**Para desarrolladores que quieren:**
- ✅ Soluciones rápidas a problemas de UI sin escribir CSS desde cero
- ✅ Framework liviano que NO requiere build process
- ✅ Utilidades granulares como Tailwind, pero más simple
- ✅ Componentes interactivos sin dependencias externas (jQuery-free)
- ✅ Personalización fácil con SASS

**Bodystyle es perfecto para ti si:**
- Necesitas "salir de casi cualquier problema" con poco código
- Prefieres utilidades CSS reutilizables sobre componentes prefabricados
- Quieres máxima flexibilidad con mínimas dependencias
- Te importa que el archivo final sea pequeño
- Trabajas en proyectos donde el CDN es suficiente

---

## ✨ Características Principales

### 🎨 Utilidades CSS Eficientes
- **Clases atómicas** para espaciado (`p-*`, `m-*`), colores (`c-*`, `bg-*`), tamaños (`fz-*`, `fw-*`)
- **Sistema de Grid Responsive** flexible y adaptable para layouts modernos
- **Flexbox utilities** para alineación y distribución sin código extra
- **Efectos visuales** (hover, 3D, animaciones, waves) listos para usar

### ⚡ Componentes Interactivos Opcionales
- Modales, tooltips, dropdowns, tabs, carruseles, etc.
- Sin dependencias externas (jQuery-free, ~XX KB)
- Inicializa solo lo que necesitas en tu proyecto

### 📦 Modular y Personalizable
- Cada módulo SASS es independiente
- Customiza fácilmente antes de compilar
- Incluye solo lo que usas (tree-shakeable)
- **Mobile First** - Responsive optimizado para todos los dispositivos

---

## 💡 Resolviendo Problemas en Segundos

### Sin Bodystyle:
```css
/* tu-estilos.css - Necesitas escribir todo */
.card { 
  padding: 20px; 
  border-radius: 8px; 
  box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
}
.card-title { 
  font-size: 24px; 
  font-weight: bold; 
  margin-bottom: 10px; 
}
.card-button { 
  padding: 10px 20px; 
  background: blue; 
  color: white; 
  border-radius: 4px; 
}
```

### Con Bodystyle:
```html
<!-- Reutiliza clases de utilidad directamente -->
<div class="p-5 bor-rad-8 shadow">
  <h2 class="fz-24 fw-bold mb-3">Título</h2>
  <button class="btn bg-blue c-white">Acción</button>
</div>
```

**Beneficio:** Menos CSS, más velocidad, sin cambiar de archivo.

---

## 📊 Comparativa

| Aspecto | Bodystyle | Tailwind | Bootstrap |
|---------|-----------|----------|-----------|
| CDN Sin Build | ✅ | ❌ | ✅ |
| Utilidades Granulares | ✅ | ✅ | ❌ |
| Componentes Interactivos | ✅ | ❌ | ✅ |
| Sin Dependencias | ✅ | ✅ | ❌ |
| Curva de Aprendizaje | Baja | Media | Media |
| Personalizable con SASS | ✅ | Parcial | ✅ |
| Documentación en Español | ✅ | ❌ | ✅ |
| Tamaño Final (minificado) | ~35 KB | ~50+ KB | ~150+ KB |

---

## 🚀 Inicio Rápido

### Crear un Modal Accesible (v6.5.0)

```html
<!-- Botón para abrir modal -->
<button class="btn bg-blue activar-modal" data-target="#miModal">
    Abrir Modal
</button>

<!-- Modal con accesibilidad WCAG 2.1 -->
<div id="miModal" class="modal-fondo">
    <div class="modal">
        <!-- Cabecera -->
        <div class="modal-cabecera">
            <h2 class="modal-titulo">Título del Modal</h2>
            <button class="modal-salir" aria-label="Cerrar modal"></button>
        </div>
        
        <!-- Contenido -->
        <div class="modal-cuerpo">
            <p>Tu contenido aquí...</p>
        </div>
        
        <!-- Pie (opcional) -->
        <div class="modal-pie">
            <button class="btn bg-gris">Cancelar</button>
            <button class="btn bg-blue">Aceptar</button>
        </div>
    </div>
</div>

<!-- Inicializar -->
<script src="dist/js/bodystyle.min.js"></script>
<script>
    BS.ModalInit()
</script>
```

**Características:**
- ✅ Presiona **ESC** para cerrar
- ✅ Navega con **Tab**
- ✅ Compatible con lectores de pantalla
- ✅ Focus visible en todos los elementos

[📖 Ver documentación completa](./MODAL_ACCESIBILIDAD.md) | [🎯 Ver ejemplos interactivos](./ejemplos/v6.5.0/modales.html)

---

### Ejemplo Básico (CDN)

La forma más rápida de empezar es usando el CDN:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Proyecto con Bodystyle</title>
    
    <!-- Bodystyle CSS -->
    <link rel="stylesheet" href="https://rawcdn.githack.com/FedeManzano/bodystyle/refs/heads/master/dist/css/bodystyle.min.css">
</head>
<body>
    
    <h1 class="ta-c c-blue fz-50">¡Hola Bodystyle!</h1>
    <div class="contenedor">
        <button class="btn bg-blue">Mi Botón</button>
    </div>

    <!-- Bodystyle JS -->
    <script src="https://rawcdn.githack.com/FedeManzano/bodystyle/refs/heads/master/dist/js/bodystyle.min.js"></script>
    <script>
        BS.ToolTipsInit();
    </script>
</body>
</html>
```

---

## 📦 Instalación

### Opción 1: NPM

```bash
npm install bodyui2
```

### Opción 2: Descarga Directa
- [Bodystyle v6.5.0](https://mega.nz/file/8cFFjSYZ#y82eMpvPRGRoQZUA8Lktuj3oHmFVMonJAE8hgFHj1MA) - **Última versión con Accesibilidad WCAG 2.1**
- [Bodystyle v6.0.0](https://mega.nz/file/pVFWWBDa#cxmhYVVSguG1mPhhqUruEEKNmvXuvbYH0lWBlGxJD_s)
- [Bodystyle v5.8.0](https://mega.nz/file/IEtFjbhL#9avwQbK0EicykZx_vGLWaMUemt53lhvpDZHRYykynNw)
- [Bodystyle v5.0.0](https://mega.nz/file/UQk3WQhS#e_TBHmfNXsHuJzE9rxir387MSVM_NFv8SdEZe1VAlZI)
- [Bodystyle v4.8.0](https://mega.nz/file/UZEzQI5K#9ULEwt4p7DlILAaXz8Mu5z2O-Rsgr-7V360fWUxqs58)
- [Bodystyle v4.5.0](https://mega.nz/file/JcdFVbDS#NqtpoN3LjrfFkyzzB0O6RUMa1FZSPWnHgTRXVSjhgww)
- [Bodystyle v4.0.0](https://mega.nz/file/cQMHGSDS#kK6bvOzeLMdLy15qLuqAwYaY_j_UnDWuyVAudZCYoTw)

### Opción 3: Clonar Repositorio

```bash
git clone https://github.com/FedeManzano/bodystyle
cd bodystyle
npm install
```

---

## � TypeScript Support

Bodystyle ahora incluye **definiciones de tipos completas** para TypeScript, proporcionando autocompletado, validación de tipos y mejor experiencia de desarrollo.

### Instalación con TypeScript

```bash
npm install bodyui2
```

Las definiciones de tipos se incluyen automáticamente. No necesitas instalar `@types` adicionales.

### Uso Básico con TypeScript

```typescript
import 'bodyui2/dist/js/bodystyle.bundle.js'; // OBJETO GLOBAL BS => window.BS
import  Waves  from 'bodyui2/modulos/Waves';
import { slideUp, slideDown } from 'bodyui2/modulos/Animaciones';

// TypeScript proporciona autocompletado y validación de tipos
window.BS.Toast({
  mensaje: 'Hola TypeScript!',
  clases: ['bg-red', 'bor-rad-10', 'c-white'], // Color de fondo, radio de borde y color de texto
  duracion: 3000,
  cerrar: true // Permite cerrar el toast manualmente
});

// Inicializar waves con tipos
Waves.iniciar();

// Animaciones con tipos completos
const element = document.querySelector('.my-element') as HTMLElement;
slideDown(element, 300, () => {
  console.log('Animación completada');
});
```

### Integración con Frameworks

<details>
<summary><strong>Angular</strong></summary>

[Guía de integración con Angular](./ANGULAR_INTEGRATION.md)

</details>

<details>
<summary><strong>React</strong></summary>


#### :file: App.js
```js
/****************************************************************************************************** 
 * App.js Archivo del componente principal
 */

import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Inicializar Bodystyle después de que el componente se monte
    if (window.BS) {
      window.BS.ToolTipsInit();
      window.BS.CommentInit();
    }
  }, []); // Array vacío = solo se ejecuta una vez al montar

  return (
    <div className="App">
      <div className='container mt-3'>
        <button
          type="button"
          className="com-trigger btn fd-bodyui"
          data-info="Hello Soy un Tips !!"
        >
          Tips
        </button>
      </div>
    </div>
  );
}

export default App;
```

#### :file: index.js

```js
/********************************************************************
 * Archivo index.js 
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Importar CSS y JS de Bodystyle globalmente
import "bodyui2/dist/css/bodystyle.min.css";
import "bodyui2/dist/js/bodystyle.min.js";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```


</details>


### Ejemplo Completo

Consulta los ejemplos en la carpeta [`ejemplos/`](./ejemplos/) para ver casos de uso completos con TypeScript y JavaScript.

---

## 🔄 Migración desde Bootstrap

¿Vienes de Bootstrap? Tenemos guías completas para ayudarte a migrar tu proyecto a Bodystyle:

### 📘 Guías de Migración por Framework

- **[Migración desde Bootstrap para React](./MIGRATION_FROM_BOOTSTRAP_REACT.md)** - Guía completa con ejemplos de componentes, hooks personalizados y solución de problemas
- **[Migración desde Bootstrap para Angular](./MIGRATION_FROM_BOOTSTRAP_ANGULAR.md)** - Guía detallada con servicios, directivas y guards

### 🎯 ¿Por qué migrar a Bodystyle?

| Ventaja | Descripción |
|---------|-------------|
| 🚀 **Menor tamaño** | ~30% más ligero que Bootstrap |
| 📦 **Sin dependencias** | No requiere Popper.js ni otras librerías externas* |
| 💪 **TypeScript nativo** | Tipos incluidos, sin necesidad de @types |
| ⚡ **100% Vanilla JS** | Sin jQuery, mejor rendimiento |
| 🎨 **Componentes únicos** | Waves, Parallax, ScrollSpy y más |
| 🔧 **Fácil migración** | Sintaxis similar, curva de aprendizaje baja |

> *Excepto `dynamics-tips` y `show-sintax` para componentes específicos

### 📊 Comparación Rápida

```html
<!-- Bootstrap -->
<button class="btn btn-primary btn-lg">Click me</button>

<!-- Bodystyle -->
<button class="btn bg-blue fz-18">Click me</button>
```

Consulta las guías completas para ver mapeos detallados de todos los componentes, clases CSS y APIs de JavaScript.

---

## 📚 Core de Bodystyle

Bodystyle está compuesto por **cuatro módulos independientes** que pueden descargarse por separado:

| Módulo | Versión | Descripción | Descarga |
|--------|---------|-------------|----------|
| **Grid** | 6.5.0 | Sistema de grilla responsive para layouts | [Descargar](https://mega.nz/file/0AMFRJTI#m7jZbhubbQyecdwasf5hA1goQEAT0YTNNxPoxh_i_sI) |
| **Utils** | 6.5.0 | Utilidades de texto, espaciado y Flexbox | [Descargar](https://mega.nz/file/IVskib6T#x7cYUGISEbASO6wj6k24gV5uhQK5ZYSFXO1rgVIglO80) |
| **Dynamics** | 3.0.0 | Componentes dinámicos e interactivos (dytips) | [Descargar](https://mega.nz/file/hI9RWToJ#H6No147H25Bxh6hE8Q2jlGSB-JBbTYHBgoGBptaFnUw) |
| **Show-Code** | 3.0.0 | Resaltado de sintaxis para código | [Descargar](https://mega.nz/file/xVVFCaxR#oBrMTHaTmhwca9ajcSyM65XpoP_UHJH3g-qbv3ymP3w) |

---

## 📖 Documentación

### Sitio Web

- [Documentación Online](https://bodystyle.webcindario.com) - Navegación interactiva

### Descargas
- [Documentación v4.0.0](https://mega.nz/file/BBFwyALC#niLWlUCjOu9hNTyTwAGjAz-pGGQjKhs9BH5XaavsXZM) - **Lasted**
- [Todas las versiones](https://mega.nz/folder/VdMHERDR#gjbVQoWuKsIjNYJ39X1Dcw)

<details>
<summary><strong>📁 Estructura de la Documentación</strong></summary>

```
Docs/
├── css/
│   └── bodystyle.min.css
├── imagenes/
│   └── [imágenes de la documentación]
├── js/
│   └── docs-body.js
├── paginas/
│   ├── alertas.html
│   ├── ancho_alto.html
│   ├── badges.html
│   ├── bordes.html
│   ├── botones.html
│   ├── breadcrumbs.html
│   ├── colecciones.html
│   ├── colores.html
│   ├── dropdown.html
│   ├── flexbox.html
│   ├── formularios.html
│   ├── get_started.html
│   ├── grid.html
│   ├── modal.html
│   ├── nav.html
│   ├── sidebar.html
│   ├── tablas.html
│   ├── tarjetas.html
│   ├── tooltips.html
│   └── [más componentes...]
├── index.html
└── logo.ico
```

</details>

---

## 🛠️ Desarrollo

### Compilar SASS

```bash
# Versión sin minificar
sass sass/bodystyle.scss dist/css/bodystyle.css

# Versión minificada
sass -s compressed sass/bodystyle.scss dist/css/bodystyle.min.css
```

### Compilar JavaScript

```bash
npm run build
```
### Ejecutar pruebas

```bash
npm test          # Ejecuta la suite completa
npm test:watch    # Ejecuta pruebas en modo watch
npm test:coverage # Genera reporte de cobertura
```

Los resultados se mostrarán en la consola y el reporte de cobertura se guardará en `coverage/`.


Esto generará `dist/js/bodystyle.min.js` con todo el código transpilado y optimizado.

---

## 🌐 Compatibilidad de Navegadores

Bodystyle es compatible con las versiones modernas de los principales navegadores:

| Navegador | Versión Mínima |
|-----------|----------------|
| Chrome | 60+ |
| Firefox | 60+ |
| Safari | 12+ |
| Edge | 79+ |
| Opera | 47+ |

> **Nota:** Para navegadores más antiguos, se recomienda usar polyfills apropiados.

---

## 🔧 Dependencias

| Dependencia | Versión | Descripción | Estado |
|-------------|---------|-------------|--------|
| [Webpack](https://webpack.js.org/) | 5.102.0 | Empaquetador de módulos | ✅ Activo |
| [Babel](https://babeljs.io/) | 6.23.0 | Transpilador de JavaScript | ✅ Activo |
| [dytips](https://github.com/FedeManzano/dynamics-tips) | 3.0.0 | Sistema de tooltips y componentes | ✅ Activo |
| [@bodystyle/show-code](https://github.com/FedeManzano/show-code) | 3.0.0 | Resaltado de código | ✅ Activo |

---


## 🎉 Novedades v6.5.0

### ♿ Mejoras de Accesibilidad en Modales (WCAG 2.1)

Implementación completa de estándares de accesibilidad en el componente Modal:

- ✅ **Atributos ARIA Completos**
  - `role="dialog"` - Identifica el elemento como diálogo
  - `aria-modal="true"` - Indica que es modal
  - `aria-labelledby` - Conecta con el título del modal
  - `aria-label` - Botón de cerrar accesible
  - `aria-hidden` - Gestión de visibilidad para lectores de pantalla

- ✅ **Navegación con Teclado**
  - **Tecla Escape** - Cierra el modal (estándar WCAG)
  - **Tab/Shift+Tab** - Navegación entre elementos
  - **Enter/Espacio** - Activa botón de cerrar

- ✅ **Gestión de Focus**
  - Focus automático al primer elemento interactivo
  - Restauración del focus al cerrar
  - Soporte para modales anidados

- ✅ **Indicadores Visuales**
  - Focus visible con outline azul
  - Hover effects mejorados
  - Contraste de colores optimizado

- ✅ **Compatibilidad con Tecnologías Asistivas**
  - Soporte para lectores de pantalla (NVDA, JAWS, VoiceOver)
  - Estructura semántica correcta
  - Estados ARIA actualizados dinámicamente

### Ejemplos Mejorados

- 📌 Modal simple con estructura completa
- 📝 Modal con formulario interactivo
- ⚠️ Modal de confirmación
- 📖 Modal con contenido largo (scroll)

**Documentación:** [MODAL_ACCESIBILIDAD.md](./MODAL_ACCESIBILIDAD.md)

---

## 🎉 Novedades v6.0.0

### Nuevas Características

- ✅ **Migración Total a Vanilla JavaScript** - ¡Proyecto 100% libre de jQuery!
  - ✅ **Bundle optimizado**: Reducción del 34% en el tamaño final (66KB).
  - ✅ **Rendimiento superior**: Ejecución nativa sin sobrecarga de librerías legacy.
  - ✅ **Modularidad**: Integración de `@bodystyle/show-code` v3.0.0 y `dytips` v3.0.0.

- ✅ **Suite de Testing Completa** - 247 tests unitarios con Jest
  - Cobertura de código: 87%
  - Tests para todos los módulos migrados
  - Integración continua con GitHub Actions

- ✅ **CI/CD con GitHub Actions** - Pipeline automatizado
  - Tests automáticos en cada push
  - Validación de build
  - Verificación de calidad de código

- ✅ **Soporte TypeScript Mejorado** - Definiciones de tipos completas
  - IntelliSense completo en IDEs
  - Validación de tipos en tiempo de desarrollo
  - Compatibilidad con Angular, React y Vue

- ✅ **Documentación Mejorada** - Ejemplos y guías actualizadas
  - Ejemplos de uso con TypeScript
  - Guías de migración de jQuery
  - Documentación de API completa

### Mejoras de Rendimiento

- ⚡ **Reducción de dependencias** - Menos código, mejor rendimiento
  - **jQuery eliminado totalmente**
  - Código nativo más rápido y eficiente
  - Mejor compatibilidad con frameworks modernos

- 🚀 **Optimización de módulos** - Código refactorizado
  - Mejor organización del código fuente
  - Funciones más eficientes
  - Menor huella de memoria

### Características de v5.0.0 (Mantenidas)

- ✅ **Nueva sidebar desplegable** - Navegación lateral mejorada
- ✅ **Nuevo handler del sidebar** - Mejor control y animaciones
- ✅ **Documentación del código** - Todos los módulos documentados
- ✅ **Refactorización completa** - Código más limpio y mantenible
- ✅ **Optimización CSS y JS** - Mejor rendimiento
- ✅ **Nuevos estilos de formularios** - Inputs, selects y más
- ✅ **Cerrar alertas** - Funcionalidad de cierre en alertas
- ✅ **Métodos destroy** - Limpieza de componentes dinámicos
- ✅ **Auto-iniciación** - Componentes se inician automáticamente
- ✅ **Efecto waves** - Nueva animación de ondas
- ✅ **Estado desactivado** - Mejor manejo de elementos disabled
- ✅ **Alias Helpers** - Nombres alternativos para clases
- ✅ **Input con íconos** - Soporte nativo para íconos en inputs

### Roadmap de Migración

**Fase Completada: Grupo 1 - Input/Forms** ✅
- ✅ InputHandler.js (Completado)
- ✅ GruposInput.js (Completado)
- ✅ Select.js (Completado)
- ✅ Range.js (Completado)

**Fase Completada: Grupo 2 - Navigation** ✅
- ✅ Tabs.js (Completado)
- ✅ SidebarHandler.js (Completado)
- ✅ Navigation.js (Completado)

**Fase Completada: Grupo 3 - Visual Effects** ✅
- ✅ ScrollSpy.js (Completado)
- ✅ Parallax.js (Completado)
- ✅ Imagenes.js (Completado)

**Progreso Total:** 20/20 módulos migrados (100%) **MIGRACIÓN COMPLETADA**

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si deseas contribuir a Bodystyle:

1. **Fork** el repositorio
2. Crea una **rama** para tu feature (`git checkout -b feature/NuevaCaracteristica`)
3. **Commit** tus cambios (`git commit -m 'Agregar nueva característica'`)
4. **Push** a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un **Pull Request**

### Reportar Issues

Si encuentras un bug o tienes una sugerencia, por favor abre un [issue](https://github.com/FedeManzano/bodystyle/issues) en GitHub.

---

## 📄 Licencia

Este proyecto está licenciado bajo la [Licencia MIT](https://github.com/FedeManzano/bodystyle/blob/master/LICENSE).

---

## 👨‍💻 Autor

**Federico Manzano**

- GitHub: [@FedeManzano](https://github.com/FedeManzano)
- Repositorio: [bodystyle](https://github.com/FedeManzano/bodystyle)

---

<p align="center">
  <strong>¿Te gusta Bodystyle? ¡Dale una ⭐ en GitHub!</strong>
</p>

<p align="center">
  Hecho con ❤️ por <a href="https://github.com/FedeManzano">Federico Manzano</a>
</p>
