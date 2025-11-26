import { fadeIn, fadeOut } from "./Animaciones"

/**
 * Módulo (14) Se encarga de la gestión de imágenes 
 * brindando la posibilidad de realizarle zoom a la imágen
 * seleccionada.
 */
class Imagenes {
    constructor() {
        this.desplegarImagen = this.desplegarImagen.bind(this);
        this.cerrarClick = this.cerrarClick.bind(this);
        this.cerrarEsc = this.cerrarEsc.bind(this);
        this.cerrarScroll = this.cerrarScroll.bind(this);
    }

    iniciar() {
        document.querySelectorAll(".img-exp").forEach(img => {
            img.addEventListener("click", this.desplegarImagen);
        });
    }

    desplegarImagen(e) {
        let contenedor = document.querySelector('.contenedor-imagen');
        if (!contenedor) {
            contenedor = document.createElement("div");
            contenedor.classList.add('contenedor-imagen');
            document.body.appendChild(contenedor);

            // Agregar listener para cerrar al hacer click en el contenedor
            contenedor.addEventListener("click", this.cerrarClick);
        }

        // Limpiar contenido previo
        contenedor.innerHTML = '';

        const ruta = e.target.getAttribute("src");
        const img = document.createElement("img");
        img.src = ruta;
        contenedor.appendChild(img);

        fadeIn(contenedor, 500);

        // Agregar listeners globales para cerrar
        document.body.addEventListener('keydown', this.cerrarEsc);
        window.addEventListener('scroll', this.cerrarScroll);
        // Usar wheel en lugar de mousewheel para mejor compatibilidad, aunque mantenemos lógica similar
        window.addEventListener('wheel', this.cerrarScroll);
    }

    cerrarClick() {
        const contenedor = document.querySelector(".contenedor-imagen");
        if (contenedor) {
            fadeOut(contenedor, 300, () => {
                // Opcional: remover del DOM si se desea, o solo ocultar
                // contenedor.remove(); 
            });
            this.removerListenersCierre();
        }
    }

    cerrarEsc(e) {
        if (e.which == 27 || e.key === "Escape") {
            this.cerrarClick();
        }
    }

    cerrarScroll() {
        this.cerrarClick();
    }

    removerListenersCierre() {
        document.body.removeEventListener('keydown', this.cerrarEsc);
        window.removeEventListener('scroll', this.cerrarScroll);
        window.removeEventListener('wheel', this.cerrarScroll);
    }

    destroy() {
        document.querySelectorAll(".img-exp").forEach(img => {
            img.removeEventListener("click", this.desplegarImagen);
        });

        const contenedor = document.querySelector(".contenedor-imagen");
        if (contenedor) {
            contenedor.removeEventListener("click", this.cerrarClick);
            contenedor.remove();
        }

        this.removerListenersCierre();
    }
}

const imagenesInstance = new Imagenes();
window.Imagenes = imagenesInstance;
export default imagenesInstance;