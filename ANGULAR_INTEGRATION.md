# Guía de Integración de Bodystyle con Angular

Esta guía detalla los pasos necesarios para integrar **Bodystyle (bodyui2)** en un proyecto de Angular (versión 16+).

## 1. Instalación

Instala el paquete mediante npm:

```bash
npm install bodyui2
```

## 2. Configuración de `angular.json`

Es necesario registrar los estilos y scripts globales, y ajustar el presupuesto de tamaño del bundle.

Abre tu archivo `angular.json` y realiza los siguientes cambios:

### A. Agregar Estilos y Scripts

En la sección `architect > build > options`:

```json
"styles": [
  "src/styles.scss",
  "node_modules/bodyui2/dist/css/bodystyle.min.css"
],
"scripts": [
  "node_modules/bodyui2/dist/js/bodystyle.min.js"
]
```

## 2. Declaración de Tipos (TypeScript)

Bodystyle funciona como una librería global (`BS`). Para usarla en TypeScript sin errores, debes declarar la variable global.

### Opción Recomendada: Archivo de Definición Global

Crea un archivo llamado `src/bodystyle.d.ts` (o agrégalo a tu carpeta de tipos) con el siguiente contenido:

```typescript
// src/bodystyle.d.ts
declare var BS: any;
```

Esto hará que `BS` esté disponible en **todos** los componentes y servicios de tu aplicación automáticamente.

## 3. Uso en Componentes

Ahora puedes usar `BS` directamente en tus componentes. Se recomienda inicializar los efectos dinámicos en `OnInit` para asegurar que el DOM ya existe.

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    // Inicializar componentes de Bodystyle
    BS.DynamicsAutoInit();
  }
}
```

## Nota para el Mantenedor (Mejora Futura)

Para evitar el paso 3 en el futuro, se recomienda incluir el archivo de definición de tipos directamente en el paquete npm `bodyui2`.

