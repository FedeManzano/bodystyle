
import ERR from "./Errores"

/**
 * Módulo (21) Elemento que sirve como guia para el usuario
 * de manera tal que el usuario conozca en cada momento 
 * el lugar de la página en la cual se encuentra. 
 */
class ScrollSpy {
    constructor() {
        this.config = {}
        this.ids = []
        this.eventoScroll = this.eventoScroll.bind(this)
    }

    validarListaScroll(
        modulo,
        ancho,
        tamFuente,
        colorBorde,
        alturaBorde,
        separacion,
        colorSeleccionado,
        colorNoSeleccionado
    ) {
        if (!ERR.positivos.validacion(ancho)) {
            console.error(modulo + ERR.positivos.mensaje)
            return false
        }

        if (!ERR.positivos.validacion(tamFuente)) {
            console.error(modulo + ERR.positivos.mensaje)
            return false
        }

        if (!ERR.clasesColorFondo.validacion.test(colorBorde)) {
            console.error(modulo + ERR.clasesColorFondo.mensaje)
            return false
        }

        if (!ERR.positivos.validacion(alturaBorde)) {
            console.error(modulo + ERR.positivos.mensaje)
            return false
        }

        if (!ERR.positivos.validacion(separacion)) {
            console.error(modulo + ERR.separacion.mensaje)
            return false
        }

        if (!ERR.hexadecimal.validacion.test(colorSeleccionado)) {
            console.error(modulo + ERR.hexadecimal.mensaje)
            return false
        }

        if (!ERR.hexadecimal.validacion.test(colorNoSeleccionado)) {
            console.error(modulo + ERR.hexadecimal.mensaje)
            return false
        }

        return true
    }

    iniciar({
        ancho = 15,
        tamFuente = 18,
        colorBorde = "fd-azul-c",
        alturaBorde = 30,
        separacion = 120,
        colorSeleccionado = "#000",
        colorNoSeleccionado = "#666"
    } = {}) {
        const MODULO = "Error BodyStyle dice: M21"
        if (!this.validarListaScroll(MODULO, ancho, tamFuente, colorBorde, alturaBorde, separacion, colorSeleccionado, colorNoSeleccionado)) {
            return
        }

        this.ids = []
        document.querySelectorAll(".scroll-item").forEach((element) => {
            const id = element.getAttribute("id");
            if (id !== null && id !== undefined) {
                this.ids.push(id);
            }
        })

        this.config = {
            ancho,
            tamFuente,
            colorBorde,
            alturaBorde,
            separacion,
            colorSeleccionado,
            colorNoSeleccionado
        }

        document.querySelectorAll(".lista-scroll").forEach((e) => e.style.width = this.config.ancho + "%")
        document.querySelectorAll(".lista-scroll ul li a").forEach((e) => e.style.fontSize = this.config.tamFuente + "px")
        document.querySelectorAll(".elemento-seleccionado").forEach((e) => e.classList.add(this.config.colorBorde))
        document.querySelectorAll(".lista-scroll").forEach((e) => e.style.top = this.config.separacion + "px")

        this.eventoScroll()
        window.addEventListener("scroll", this.eventoScroll)
    }

    eventoScroll() {
        this.ids.forEach((e) => {
            const elemento = document.getElementById(e);
            if (!elemento) return;

            const top = window.pageYOffset;
            const scrollElemento = elemento.offsetTop;

            if (top >= scrollElemento - 200) {
                this.seleccionarIndice(this.ids.indexOf(e) + 1);
            }
        });
    }

    seleccionarIndice(indice) {
        document.querySelectorAll(".elemento-seleccionado").forEach((e) => e.remove())
        document.querySelectorAll(".lista-scroll ul li a").forEach((ele) => {
            ele.style.color = this.config.colorNoSeleccionado
        })
        let elemento = document.createElement("p")
        elemento.classList.add("elemento-seleccionado", this.config.colorBorde)
        elemento.style.height = this.config.alturaBorde + "px"
        const anchor = document.querySelector(".lista-scroll ul li:nth-child(" + indice + ") a");
        if (anchor) {
            // Insertar 'elemento' ANTES del 'anchor'
            anchor.insertAdjacentElement('beforebegin', elemento);
            // Cambiar color del anchor
            anchor.style.color = this.config.colorSeleccionado;
        }
    }

    destroy() {
        window.removeEventListener("scroll", this.eventoScroll)
    }
}

const scrollSpyInstance = new ScrollSpy();
window.ScrollSpy = scrollSpyInstance;
export default scrollSpyInstance;