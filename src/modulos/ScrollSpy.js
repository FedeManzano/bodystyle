
import ERR from "./Errores"

/**
 * Módulo (21) Elemento que sirve como guia para el usuario
 * de manera tal que el usuario conozca en cada momento 
 * el lugar de la página en la cual se encuentra. 
 */
(function () {

    var c = {}
    var cantidad = document.querySelectorAll(".scroll-item").length;
    var ids = new Array(cantidad)


    const destroy = () => {
        window.removeEventListener("scroll", eventoScroll)
    }



    const validarListaScroll = (
        modulo,
        ancho,
        tamFuente,
        colorBorde,
        alturaBorde,
        separacion,
        colorSeleccionado,
        colorNoSeleccionado
    ) => {


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



    var inicializarIds =
        ({
            ancho = 15,
            tamFuente = 18,
            colorBorde = "fd-azul-c",
            alturaBorde = 30,
            separacion = 120,
            colorSeleccionado = "#000",
            colorNoSeleccionado = "#666"
        } = {}) => {


            const MODULO = "Error BodyStyle dice: M21"
            if (!validarListaScroll(MODULO, ancho, tamFuente, colorBorde, alturaBorde, separacion, colorSeleccionado, colorNoSeleccionado)) {
                return
            }



            document.querySelectorAll(".scroll-item").forEach((element, index) => {
                const id = element.getAttribute("id");
                if (id !== null && id !== undefined) {
                    ids[index] = id;
                }
            })


            c.ancho = ancho
            c.tamFuente = tamFuente
            c.colorBorde = colorBorde
            c.alturaBorde = alturaBorde
            c.separacion = separacion
            c.colorSeleccionado = colorSeleccionado
            c.colorNoSeleccionado = colorNoSeleccionado


            document.querySelectorAll(".lista-scroll").forEach((e) => e.style.width = c.ancho + "%")
            document.querySelectorAll(".lista-scroll ul li a").forEach((e) => e.style.fontSize = c.tamFuente + "px")
            document.querySelectorAll(".elemento-seleccionado").forEach((e) => e.classList.add(c.colorBorde))
            document.querySelectorAll(".lista-scroll").forEach((e) => e.style.top = c.separacion + "px")
            eventoScroll(null)
        }

    const eventoScroll = (el) => {
        ids.forEach((e) => {
            const elemento = document.getElementById(e);
            if (!elemento) return;

            const top = window.pageYOffset;
            const scrollElemento = elemento.offsetTop;

            if (top >= scrollElemento - 200) {
                seleccionarIndice(ids.indexOf(e) + 1);
            }
        });
    }

    var seleccionarIndice = (indice) => {
        document.querySelectorAll(".elemento-seleccionado").forEach((e) => e.remove())
        document.querySelectorAll(".lista-scroll ul li a").forEach((ele) => {
            ele.style.color = c.colorNoSeleccionado
        })
        let elemento = document.createElement("p")
        elemento.classList.add("elemento-seleccionado", c.colorBorde)
        elemento.style.height = c.alturaBorde + "px"
        const anchor = document.querySelector(".lista-scroll ul li:nth-child(" + indice + ") a");
        if (anchor) {
            // Insertar 'elemento' ANTES del 'anchor'
            anchor.insertAdjacentElement('beforebegin', elemento);
            // Cambiar color del anchor
            anchor.style.color = c.colorSeleccionado;
        }
    }

    var inicializar = () => {
        window.addEventListener("scroll", eventoScroll)
    }

    var ScrollSpy = {
        iniciar: (config) => {
            inicializarIds(config)
            inicializar()
        },

        destroy: () => destroy()
    }
    window.ScrollSpy = ScrollSpy;
})()

export default ScrollSpy;