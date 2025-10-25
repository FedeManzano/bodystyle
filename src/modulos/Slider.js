
import $ from 'jquery'
import ERR from "./GestionErrores"



(function () {

    let seleccionado = 1
    let intervalo = null
    let config = null
    let cantidad = 0

    // Mover El Slider
    const adelante = () => {
        return seleccionado === cantidad ? 1 : seleccionado + 1
    }

    const atras = () => {
        return seleccionado === 1 ? cantidad : seleccionado - 1
    }


    const efectofadeAdelante = () => {
        $(config.contexto + " .slider-show .slider .item:nth-child(" + (seleccionado) + ")").fadeOut(500)
        $(config.contexto + " .slider-show .slider .selectores span:nth-child(" + seleccionado + ")")
            .removeClass("activo")
        seleccionado = adelante()
        $(config.contexto + " .slider-show .slider .item:nth-child(" + (seleccionado) + ")").fadeIn(500)
        $(config.contexto + " .slider-show .slider .selectores span:nth-child(" + seleccionado + ")")
            .addClass("activo")
    }

    const efectofadeAtras = () => {
        $(config.contexto + " .slider-show .slider .item:nth-child(" + (seleccionado) + ")").fadeOut(500)
        $(config.contexto + " .slider-show .slider .selectores span:nth-child(" + seleccionado + ")")
            .removeClass("activo")
        seleccionado = atras()
        $(config.contexto + " .slider-show .slider .item:nth-child(" + (seleccionado) + ")").fadeIn(500)
        $(config.contexto + " .slider-show .slider .selectores span:nth-child(" + seleccionado + ")")
            .addClass("activo")
    }

    const eventoSelectores = (e) => {
        if (config.automatico)
            pararCronometro()
        let ind = $(e.target).index()
        $(config.contexto + " .slider-show .slider .item:nth-child(" + (seleccionado) + ")")
            .fadeOut(500)
        $(config.contexto + " .slider-show .slider .selectores span:nth-child(" + seleccionado + ")")
            .removeClass("activo")
        seleccionado = ind + 1
        $(config.contexto + " .slider-show .slider .item:nth-child(" + (seleccionado) + ")")
            .fadeIn(500)
        $(config.contexto + " .slider-show .slider .selectores span:nth-child(" + seleccionado + ")")
            .addClass("activo")
        if (config.automatico)
            activarCronometo()
    }


    const activarCronometo = () => {
        intervalo = setInterval(() => {
            efectofadeAdelante()
        }, config.tiempo);
    }

    const pararCronometro = () => {
        clearInterval(intervalo)
    }

    const flechaDerecha = (e) => {
        if (config.automatico)
            pararCronometro()
        efectofadeAdelante()
        if (config.automatico)
            activarCronometo()
    }

    const flechaIzquierda = (e) => {
        if (config.automatico)
            pararCronometro()
        efectofadeAtras()
        if (config.automatico)
            activarCronometo()
    }

    const focoVentana = () => {
        activarCronometo()
    }

    const blurVentana = () => {
        pararCronometro()
    }

    const inicializar = ({

        contexto = "sinid",
        selectores = true,
        flechas = true,
        automatico = false,
        tiempo = 3000 } = {}) => {

        if (!ERR.contexto.val(contexto)) {
            console.error("(SLIDER)" + ERR.contexto.mje)
            $(".slider-show").hide()
            return
        }

        if (!ERR.bool.val(selectores)) {
            console.error("(SLIDER)" + ERR.bool.mje)
            $(".slider-show").hide()
            return
        }

        if (!ERR.bool.val(flechas)) {
            console.error("(SLIDER)" + ERR.bool.mje)
            $(".slider-show").hide()
            return
        }

        if (!ERR.bool.val(automatico)) {
            console.error("(SLIDER)" + ERR.bool.mje)
            $(".slider-show").hide()
            return
        }

        if (!ERR.positivo.val(tiempo)) {
            console.error("(SLIDER)" + ERR.positivo.mje + " Tiempo en ms")
            $(".slider-show").hide()
            return
        }


        config = {
            contexto,
            selectores,
            flechas,
            automatico,
            tiempo
        }


        cantidad = $(contexto + " .slider-show .slider .item").length


        $("html").css("height", "100%")
        $("body").css("height", "100%")

        $(".slider-show .slider .item").css("display", "none")
        $(".slider-show .slider .item:nth-child(1)").show()


        if (selectores) {
            $(".slider-show .slider").append(`
            <div class='selectores'>
            </div>
            `)

            for (let i = 0; i < cantidad; i++) {
                $(contexto + " .slider-show .slider .selectores").append("<span></span>")
            }

            $(contexto + " .slider-show .slider .selectores span").click(eventoSelectores)
            $(".slider-show .slider .selectores span:nth-child(1)").addClass("activo")
        }

        if (flechas) {
            $(".slider-show .slider").append(`
            <div class='f'>
                <div class='f-der'></div>
                <div class='f-izq'></div>
            </div>
            `)
            $(contexto + " .slider-show .slider .f .f-der").click(flechaDerecha)
            $(contexto + " .slider-show .slider .f .f-izq").click(flechaIzquierda)
        }


        if (automatico) {
            activarCronometo()
            $(window).focus(focoVentana)
            $(window).blur(blurVentana)
        }
    }

    const destroy = () => {
        $(config.contexto + " .slider-show .slider .selectores span").off("click", eventoSelectores)
        $(config.contexto + " .slider-show .slider .f .f-der").off("click",flechaDerecha)
        $(config.contexto + " .slider-show .slider .f .f-izq").off("click", flechaIzquierda)
        $(window).off("focus", focoVentana)
        $(window).off("blur", blurVentana)
        pararCronometro()
        seleccionado = 1
        intervalo = null
        config = null
        cantidad = 0
    } 

    var Slider = {
        iniciar: (config) => {
            inicializar(config)
        },
        destroy: () => destroy()
    }

    window.Slider = Slider
})()

export default Slider