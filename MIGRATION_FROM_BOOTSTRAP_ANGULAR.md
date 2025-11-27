# 🔄 Guía de Migración de Bootstrap a Bodystyle para Angular

Esta guía te ayudará a migrar tu proyecto Angular desde Bootstrap (o ng-bootstrap) a Bodystyle, aprovechando las ventajas de una biblioteca moderna, ligera y con soporte completo para TypeScript.

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

### Ventajas de Bodystyle sobre Bootstrap/ng-bootstrap

| Característica | Bootstrap/ng-bootstrap | Bodystyle |
|----------------|------------------------|-----------|
| **Tamaño del Bundle** | ~180KB (con ng-bootstrap) | ~120KB (min+gzip) |
| **Dependencias** | @ng-bootstrap/ng-bootstrap | Sin dependencias Angular* |
| **TypeScript** | Tipos vía @types | Tipos nativos incluidos |
| **Integración** | Componentes Angular específicos | Vanilla JS + CSS |
| **Personalización** | SASS variables | SASS completo + variables |
| **Componentes Únicos** | Estándar | Waves, Parallax, ScrollSpy |
| **Curva de Aprendizaje** | Media-Alta | Baja (sintaxis similar) |
| **Actualizaciones** | Dependiente de versión Angular | Independiente del framework |

> *Excepto `dynamics-tips` y `show-sintax` para componentes específicos

---

## ⚡ Comparación Rápida

### Sistema de Grid

```html
<!-- Bootstrap -->
<div class="container">
  <div class="row">
    <div class="col-md-6">Contenido</div>
    <div class="col-md-6">Contenido</div>
  </div>
</div>

<!-- Bodystyle -->
<div class="contenedor">
  <div class="fila">
    <div class="col m6">Contenido</div>
    <div class="col m6">Contenido</div>
  </div>
</div>
```

### Botones

```html
<!-- Bootstrap -->
<button class="btn btn-primary btn-lg">Click me</button>

<!-- Bodystyle -->
<button class="btn bg-blue fz-18">Click me</button>
```

---

## 🚀 Proceso de Migración

### Paso 1: Instalación

#### Desinstalar Bootstrap/ng-bootstrap

```bash
npm uninstall bootstrap @ng-bootstrap/ng-bootstrap
```

#### Instalar Bodystyle

```bash
npm install bodyui2
```

### Paso 2: Configuración en `angular.json`

Abre tu archivo `angular.json` y realiza los siguientes cambios:

#### A. Agregar Estilos y Scripts

En la sección `architect > build > options`:

```json
{
  "styles": [
    "src/styles.scss",
    "node_modules/bodyui2/dist/css/bodystyle.min.css"
  ],
  "scripts": [
    "node_modules/bodyui2/dist/js/bodystyle.min.js"
  ]
}
```

#### B. Ajustar Presupuestos (Budgets)

Dado que Bodystyle es una librería completa, puede exceder los límites predeterminados. Ajusta los valores en `configurations > production > budgets`:

```json
{
  "type": "initial",
  "maximumWarning": "2mb",
  "maximumError": "4mb"
}
```

### Paso 3: Declaración de Tipos (TypeScript)

Bodystyle funciona como una librería global (`BS`). Para usarla en TypeScript sin errores, debes declarar la variable global.

#### Opción Recomendada: Archivo de Definición Global

Crea un archivo llamado `src/bodystyle.d.ts`:

```typescript
// src/bodystyle.d.ts
declare var BS: any;
```

Esto hará que `BS` esté disponible en **todos** los componentes y servicios de tu aplicación automáticamente.

#### Opción Alternativa: Tipado Fuerte

Para mejor autocompletado y validación de tipos:

```typescript
// src/bodystyle.d.ts
interface BodystyleToastOptions {
  mensaje: string;
  clases?: string[];
  duracion?: number;
  cerrar?: boolean;
}

interface BodystyleModalOptions {
  titulo: string;
  contenido: string;
  clases?: string[];
  cerrar?: boolean;
}

interface BodystyleAPI {
  Toast(options: BodystyleToastOptions): void;
  Modal(options: BodystyleModalOptions): void;
  alerta(mensaje: string, clase?: string): void;
  DynamicsAutoInit(): void;
  WavesInit(): void;
  ToolTipsInit(): void;
  InputHandlerInit(): void;
}

declare var BS: BodystyleAPI;
```

### Paso 4: Inicialización en el Componente Principal

**`src/app/app.component.ts`**

```typescript
import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'mi-app';

  ngAfterViewInit(): void {
    // Inicializar componentes de Bodystyle después de que el DOM esté listo
    BS.DynamicsAutoInit();
    BS.WavesInit();
    BS.ToolTipsInit();
  }
}
```

### Paso 5: Migración de Componentes

Reemplaza gradualmente los componentes de ng-bootstrap con sus equivalentes en Bodystyle (ver [Mapeo de Componentes](#-mapeo-de-componentes)).

---

## 🗺️ Mapeo de Componentes

### Alertas

#### Antes (ng-bootstrap)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `
    <ngb-alert type="success" [dismissible]="true">
      ¡Operación exitosa!
    </ngb-alert>
  `
})
export class AlertComponent {}
```

#### Después (Bodystyle)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `
    <div class="alerta bg-green c-white bor-rad-5 p-3">
      ¡Operación exitosa!
    </div>
  `
})
export class AlertComponent {}

// O usando JavaScript
@Component({
  selector: 'app-alert',
  template: ''
})
export class AlertComponent implements OnInit {
  ngOnInit() {
    BS.alerta('¡Operación exitosa!', 'bg-green');
  }
}
```

### Modales

#### Antes (ng-bootstrap)

```typescript
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  template: `
    <button class="btn btn-primary" (click)="open(content)">
      Abrir Modal
    </button>
    
    <ng-template #content let-modal>
      <div class="modal-header">
        <h4 class="modal-title">Título</h4>
        <button type="button" class="btn-close" (click)="modal.dismiss()"></button>
      </div>
      <div class="modal-body">
        <p>Contenido del modal</p>
      </div>
    </ng-template>
  `
})
export class ModalComponent {
  constructor(private modalService: NgbModal) {}

  open(content: any) {
    this.modalService.open(content);
  }
}
```

#### Después (Bodystyle)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    <button class="btn bg-blue c-white" (click)="openModal()">
      Abrir Modal
    </button>
  `
})
export class ModalComponent {
  openModal() {
    BS.Modal({
      titulo: 'Título',
      contenido: '<p>Contenido del modal</p>',
      clases: ['bg-white', 'bor-rad-10'],
      cerrar: true
    });
  }
}
```

### Dropdowns

#### Antes (ng-bootstrap)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  template: `
    <div ngbDropdown class="d-inline-block">
      <button class="btn btn-outline-primary" ngbDropdownToggle>
        Toggle dropdown
      </button>
      <div ngbDropdownMenu>
        <button ngbDropdownItem>Acción 1</button>
        <button ngbDropdownItem>Acción 2</button>
      </div>
    </div>
  `
})
export class DropdownComponent {}
```

#### Después (Bodystyle)

```typescript
import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  template: `
    <div class="dropdown">
      <button class="btn bg-blue dropdown-trigger" data-target="dropdown1">
        Toggle dropdown
      </button>
      <ul id="dropdown1" class="dropdown-content">
        <li><a href="#" (click)="onAction1()">Acción 1</a></li>
        <li><a href="#" (click)="onAction2()">Acción 2</a></li>
      </ul>
    </div>
  `
})
export class DropdownComponent implements AfterViewInit {
  ngAfterViewInit() {
    BS.DynamicsAutoInit(); // Inicializa el dropdown
  }

  onAction1() {
    console.log('Acción 1');
  }

  onAction2() {
    console.log('Acción 2');
  }
}
```

### Accordion (Colecciones)

#### Antes (ng-bootstrap)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-accordion',
  template: `
    <ngb-accordion>
      <ngb-panel title="Panel 1">
        <ng-template ngbPanelContent>
          Contenido del panel 1
        </ng-template>
      </ngb-panel>
      <ngb-panel title="Panel 2">
        <ng-template ngbPanelContent>
          Contenido del panel 2
        </ng-template>
      </ngb-panel>
    </ngb-accordion>
  `
})
export class AccordionComponent {}
```

#### Después (Bodystyle)

```typescript
import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-accordion',
  template: `
    <ul class="coleccion">
      <li class="coleccion-item">
        <div class="coleccion-header">Panel 1</div>
        <div class="coleccion-body">
          Contenido del panel 1
        </div>
      </li>
      <li class="coleccion-item">
        <div class="coleccion-header">Panel 2</div>
        <div class="coleccion-body">
          Contenido del panel 2
        </div>
      </li>
    </ul>
  `
})
export class AccordionComponent implements AfterViewInit {
  ngAfterViewInit() {
    BS.DynamicsAutoInit();
  }
}
```

### Tabs (Pestañas)

#### Antes (ng-bootstrap)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  template: `
    <ngb-tabset>
      <ngb-tab title="Tab 1">
        <ng-template ngbTabContent>
          <p>Contenido Tab 1</p>
        </ng-template>
      </ngb-tab>
      <ngb-tab title="Tab 2">
        <ng-template ngbTabContent>
          <p>Contenido Tab 2</p>
        </ng-template>
      </ngb-tab>
    </ngb-tabset>
  `
})
export class TabsComponent {}
```

#### Después (Bodystyle)

```typescript
import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  template: `
    <ul class="tabs">
      <li class="tab-item active">
        <a href="#tab1" class="tab-link">Tab 1</a>
      </li>
      <li class="tab-item">
        <a href="#tab2" class="tab-link">Tab 2</a>
      </li>
    </ul>
    
    <div id="tab1" class="tab-content active">
      <p>Contenido Tab 1</p>
    </div>
    <div id="tab2" class="tab-content">
      <p>Contenido Tab 2</p>
    </div>
  `
})
export class TabsComponent implements AfterViewInit {
  ngAfterViewInit() {
    BS.DynamicsAutoInit();
  }
}
```

### Tooltips

#### Antes (ng-bootstrap)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  template: `
    <button 
      class="btn btn-primary" 
      ngbTooltip="Texto del tooltip"
      placement="top">
      Hover me
    </button>
  `
})
export class TooltipComponent {}
```

#### Después (Bodystyle)

```typescript
import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  template: `
    <button 
      class="btn bg-blue com-trigger" 
      data-info="Texto del tooltip">
      Hover me
    </button>
  `
})
export class TooltipComponent implements AfterViewInit {
  ngAfterViewInit() {
    BS.ToolTipsInit();
  }
}
```

### Formularios

#### Antes (Bootstrap/ng-bootstrap)

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input 
          type="email" 
          class="form-control" 
          id="email"
          formControlName="email">
      </div>
      <button type="submit" class="btn btn-primary">Enviar</button>
    </form>
  `
})
export class FormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
```

#### Después (Bodystyle)

```typescript
import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="input-grupo mb-3">
        <label for="email">Email</label>
        <input 
          type="email" 
          class="input-text" 
          id="email"
          formControlName="email">
      </div>
      <button type="submit" class="btn bg-blue c-white waves-effect">
        Enviar
      </button>
    </form>
  `
})
export class FormComponent implements AfterViewInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngAfterViewInit() {
    BS.InputHandlerInit();
    BS.WavesInit();
  }

  onSubmit() {
    if (this.form.valid) {
      BS.Toast({
        mensaje: '¡Formulario enviado correctamente!',
        clases: ['bg-green', 'c-white'],
        duracion: 3000
      });
      console.log(this.form.value);
    }
  }
}
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

```typescript
// Bootstrap/ng-bootstrap
import { NgbModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

constructor(private modalService: NgbModal) {}

// Bodystyle
ngAfterViewInit() {
  BS.ToolTipsInit();
  BS.DynamicsAutoInit();
  BS.WavesInit();
}
```

### Toasts/Notificaciones

```typescript
// ng-bootstrap (no tiene toast nativo, se usa custom)
// Requiere implementación manual

// Bodystyle
showToast() {
  BS.Toast({
    mensaje: '¡Operación exitosa!',
    clases: ['bg-green', 'c-white'],
    duracion: 3000,
    cerrar: true
  });
}
```

### Modales

```typescript
// ng-bootstrap
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

constructor(private modalService: NgbModal) {}

open(content: any) {
  this.modalService.open(content);
}

// Bodystyle
openModal() {
  BS.Modal({
    titulo: 'Título del Modal',
    contenido: '<p>Contenido HTML</p>',
    clases: ['bg-white', 'bor-rad-10'],
    cerrar: true
  });
}
```

---

## 💡 Ejemplos de Migración

### Ejemplo 1: Servicio de Notificaciones

#### Antes (Custom con Bootstrap)

```typescript
// notification.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  showSuccess(message: string) {
    // Implementación manual con Bootstrap
    const alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.textContent = message;
    document.body.appendChild(alert);
    
    setTimeout(() => alert.remove(), 3000);
  }
}
```

#### Después (Bodystyle)

```typescript
// notification.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  showSuccess(message: string) {
    BS.Toast({
      mensaje: message,
      clases: ['bg-green', 'c-white', 'bor-rad-10'],
      duracion: 3000,
      cerrar: true
    });
  }

  showError(message: string) {
    BS.Toast({
      mensaje: message,
      clases: ['bg-red', 'c-white', 'bor-rad-10'],
      duracion: 3000,
      cerrar: true
    });
  }

  showInfo(message: string) {
    BS.Toast({
      mensaje: message,
      clases: ['bg-blue', 'c-white', 'bor-rad-10'],
      duracion: 3000,
      cerrar: true
    });
  }
}
```

### Ejemplo 2: Componente de Tarjeta de Producto

#### Antes (Bootstrap)

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="card" style="width: 18rem;">
      <img [src]="image" class="card-img-top" [alt]="title">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text text-success fw-bold">\${{ price }}</p>
        <button class="btn btn-primary w-100" (click)="addToCart()">
          Agregar al Carrito
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class ProductCardComponent {
  @Input() title!: string;
  @Input() price!: number;
  @Input() image!: string;

  addToCart() {
    console.log('Agregado al carrito');
  }
}
```

#### Después (Bodystyle)

```typescript
import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="card bor-rad-10 sombra-2" style="width: 18rem;">
      <img [src]="image" class="w-100 bor-rad-top-10" [alt]="title">
      <div class="card-body p-3">
        <h5 class="fz-18 fw-bold mb-2">{{ title }}</h5>
        <p class="c-green fw-bold fz-20">\${{ price }}</p>
        <button 
          class="btn bg-blue c-white w-100 waves-effect" 
          (click)="addToCart()">
          Agregar al Carrito
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class ProductCardComponent implements AfterViewInit {
  @Input() title!: string;
  @Input() price!: number;
  @Input() image!: string;

  ngAfterViewInit() {
    BS.WavesInit();
  }

  addToCart() {
    BS.Toast({
      mensaje: `${this.title} agregado al carrito`,
      clases: ['bg-green', 'c-white'],
      duracion: 2000
    });
  }
}
```

### Ejemplo 3: Directiva para Inicialización Automática

```typescript
// bodystyle-init.directive.ts
import { Directive, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appBodystyleInit]'
})
export class BodystyleInitDirective implements AfterViewInit {
  ngAfterViewInit() {
    BS.DynamicsAutoInit();
    BS.WavesInit();
    BS.ToolTipsInit();
  }
}

// Uso en componente
@Component({
  selector: 'app-my-component',
  template: `
    <div appBodystyleInit>
      <button class="btn bg-blue waves-effect">Click me</button>
    </div>
  `
})
export class MyComponent {}
```

### Ejemplo 4: Guard de Navegación con Modal

```typescript
// confirm-exit.guard.ts
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmExitGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate): boolean {
    if (component.canDeactivate()) {
      return true;
    }

    // Usar modal de Bodystyle para confirmar
    return confirm('¿Estás seguro de que quieres salir? Los cambios no guardados se perderán.');
  }
}
```

---

## 🔍 Solución de Problemas

### Problema 1: Los componentes dinámicos no funcionan

**Solución:** Asegúrate de inicializar Bodystyle en `ngAfterViewInit`, no en `ngOnInit`.

```typescript
ngAfterViewInit() {
  BS.DynamicsAutoInit();
  BS.WavesInit();
}
```

### Problema 2: Estilos no se aplican correctamente

**Solución:** Verifica que el CSS de Bodystyle esté antes de tus estilos en `angular.json`.

```json
"styles": [
  "node_modules/bodyui2/dist/css/bodystyle.min.css",
  "src/styles.scss"
]
```

### Problema 3: TypeScript no reconoce `BS`

**Solución:** Crea el archivo de definiciones `src/bodystyle.d.ts`.

```typescript
declare var BS: any;
```

### Problema 4: Componentes no se reinicializan en rutas dinámicas

**Solución:** Reinicializa Bodystyle cuando cambies de ruta.

```typescript
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

constructor(private router: Router) {
  this.router.events.pipe(
    filter(event => event instanceof NavigationEnd)
  ).subscribe(() => {
    setTimeout(() => {
      BS.DynamicsAutoInit();
      BS.WavesInit();
    }, 100);
  });
}
```

### Problema 5: Conflictos con Angular Material

**Solución:** Si usas Angular Material junto con Bodystyle, asegúrate de usar clases específicas para evitar conflictos.

```html
<!-- Usar prefijos específicos -->
<button class="btn bg-blue">Bodystyle Button</button>
<button mat-raised-button color="primary">Material Button</button>
```

### Problema 6: Animaciones no funcionan en componentes lazy-loaded

**Solución:** Inicializa Bodystyle en cada módulo lazy-loaded.

```typescript
// feature.component.ts (en módulo lazy)
import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-feature',
  template: `...`
})
export class FeatureComponent implements AfterViewInit {
  ngAfterViewInit() {
    BS.DynamicsAutoInit();
    BS.WavesInit();
  }
}
```

---

## 📚 Recursos Adicionales

- [Documentación Oficial de Bodystyle](https://bodystyle.webcindario.com)
- [Guía de Integración con Angular](./ANGULAR_INTEGRATION.md)
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
