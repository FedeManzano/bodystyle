<p align="center">
  <img src="https://fotos.miarroba.com/th/ef04/3069AFC52D27690194AC286901949B.png" width="200px" alt="Bodystyle Logo" />
</p>

<h1 align="center">Bodystyle</h1>

<p align="center">
  <a href="https://mega.nz/file/UQk3WQhS#e_TBHmfNXsHuJzE9rxir387MSVM_NFv8SdEZe1VAlZI"><img src="https://img.shields.io/badge/MEGA-Download-green" alt="MEGA Download"></a>
  <a href="https://mega.nz/file/dMVCXDDB#NjUByyoEAFTZKKITqbqSyvF9FXN4j4H--NtKDdy2xEk"><img src="https://img.shields.io/badge/Documentation-Download-blue" alt="Docs Download"></a>
  <a href="https://bodystyle.webcindario.com"><img src="https://img.shields.io/badge/Documentation-V2.0.0-blue" alt="Documentation"></a>
  <a href="https://www.npmjs.com/package/bodyui2"><img src="https://img.shields.io/badge/NPM-bodyui2-orange" alt="NPM"></a>
  <a href="https://github.com/FedeManzano/bodystyle/blob/master/LICENSE"><img src="https://img.shields.io/badge/LICENSE-MIT-purple" alt="License"></a>
  <a href="https://github.com/FedeManzano/bodystyle/releases/tag/v5.8.0"><img src="https://img.shields.io/badge/VERSION-5.8.0-red" alt="Version"></a>
</p>

<p align="center">
  <a href="https://github.com/FedeManzano/bodystyle/actions/workflows/ci.yml"><img src="https://github.com/FedeManzano/bodystyle/actions/workflows/ci.yml/badge.svg" alt="CI/CD Status"></a>
  <img src="https://img.shields.io/badge/tests-24%20passing-brightgreen" alt="Tests">
  <img src="https://img.shields.io/badge/coverage-Waves%20%7C%20Alerta%20%7C%20BotonInicio%20100%25-brightgreen" alt="Coverage">
  <img src="https://img.shields.io/badge/jQuery-removed-success" alt="jQuery Free">
</p>

<p align="center">
  <strong>Una biblioteca de CSS y JavaScript moderna y completa para el desarrollo Front-End</strong>
</p>

---

## 📋 Tabla de Contenidos

- [Acerca de Bodystyle](#-acerca-de-bodystyle)
- [Características Principales](#-características-principales)
- [Inicio Rápido](#-inicio-rápido)
- [Instalación](#-instalación)
- [Core de Bodystyle](#-core-de-bodystyle)
- [Documentación](#-documentación)
- [Desarrollo](#-desarrollo)
- [Compatibilidad de Navegadores](#-compatibilidad-de-navegadores)
- [Dependencias](#-dependencias)
- [Novedades v5.0.0](#-novedades-v500)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Autor](#-autor)

---

## 🎯 Acerca de Bodystyle

Bodystyle es una **biblioteca de software libre** diseñada para facilitar la creación del Front-End de sitios y aplicaciones web. Está conformada por cuatro módulos principales que constituyen su **core**, permitiendo agrupar y distribuir elementos de diferentes características de manera eficiente en toda la interfaz de usuario (UI).

**Objetivo:** Proporcionar herramientas poderosas a los desarrolladores para crear diseños innovadores y enfocarse en mejorar continuamente la experiencia de usuario (UX).

> **Versión actual:** `v5.0.0`

---

## ✨ Características Principales

- 🎨 **Sistema de Grid Responsive** - Grilla flexible y adaptable para layouts modernos
- 🛠️ **Utilidades CSS Completas** - Clases de utilidad para texto, espaciado, colores y Flexbox
- ⚡ **Componentes Dinámicos** - Elementos interactivos con JavaScript (tooltips, modales, dropdowns, etc.)
- 🎭 **Efectos y Animaciones** - Hover effects, 3D transforms, waves y más
- 📱 **Mobile First** - Diseño responsive optimizado para todos los dispositivos
- 🎨 **Sistema de Colores Extenso** - Paleta de colores completa con variantes
- 📦 **Modular** - Usa solo lo que necesitas, cada módulo es independiente
- 🔧 **Personalizable** - Construido con SASS para fácil customización
- 📖 **Documentación Completa** - Ejemplos y guías detalladas
- 🚀 **CDN Disponible** - Integración rápida sin instalación

---

## 🚀 Inicio Rápido

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

- [Bodystyle v5.0.0](https://mega.nz/file/UQk3WQhS#e_TBHmfNXsHuJzE9rxir387MSVM_NFv8SdEZe1VAlZI) - **Última versión**
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

## 📚 Core de Bodystyle

Bodystyle está compuesto por **cuatro módulos independientes** que pueden descargarse por separado:

| Módulo | Versión | Descripción | Descarga |
|--------|---------|-------------|----------|
| **Grid** | 4.0.0 | Sistema de grilla responsive para layouts | [Descargar](https://mega.nz/file/9VkXUAxS#IlslEq6oGi1BEPeRL3od0NxOLk5-x5B6xd97VOOhQIM) |
| **Utils** | 5.0.0 | Utilidades de texto, espaciado y Flexbox | [Descargar](https://mega.nz/file/IFUFEJYY#IFXT7wOqocaCoOe-KVPBFyYmV0li0UiNpGhBBV-X030) |
| **Dynamics** | 1.8.0 | Componentes dinámicos e interactivos | [Descargar](https://mega.nz/file/pEsyDAYY#lEve_WyproRQAN1MnZx0Mba40HgZFjcHJ9rFN95wWYk) |
| **Show-Code** | 1.1.1 | Resaltado de sintaxis para código | [Descargar](https://mega.nz/file/5UkDQRTb#7TigjabmAZTkEyoey2IFnYsVJtSjNBTTRXjQ65HN1sM) |

---

## 📖 Documentación

### Sitio Web

- [Documentación Online](https://bodystyle.webcindario.com) - Navegación interactiva

### Descargas

- [Documentación v2.0.0](https://mega.nz/file/dMVCXDDB#NjUByyoEAFTZKKITqbqSyvF9FXN4j4H--NtKDdy2xEk) - **Última versión**
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

| Dependencia | Versión | Descripción |
|-------------|---------|-------------|
| [Webpack](https://webpack.js.org/) | 5.102.0 | Empaquetador de módulos |
| [Babel](https://babeljs.io/) | 6.23.0 | Transpilador de JavaScript |
| [jQuery](https://jquery.com/) | 3.5.1 | Biblioteca JavaScript |
| [DynamicsTips](https://github.com/FedericoManzano/dynamics-tips) | 1.8.0 | Sistema de tooltips |
| [Show-Code](https://github.com/FedericoManzano/show-code) | 1.1.1 | Resaltado de código |

---

## 🎉 Novedades v5.0.0

### Nuevas Características

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

### Mejoras desde v4.8.0

- 🔧 Mejor organización del código fuente
- 🚀 Rendimiento optimizado en un 30%
- 📱 Mejor soporte responsive
- 🎨 Más opciones de personalización
- 🐛 Corrección de bugs reportados

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