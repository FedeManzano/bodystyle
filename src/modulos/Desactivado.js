import $ from 'jquery'


(function(){

    const inicializar = () => {
        $(".desactivado, .desactivado *").removeAttr("onclick")
        $(".desactivado, .desactivado *").removeAttr("ondblclick")
        $(".desactivado, .desactivado *").removeAttr("onmousedown")
        $(".desactivado, .desactivado *").removeAttr("onmouseleave")
        $(".desactivado, .desactivado *").removeAttr("onmouseout")
        $(".desactivado, .desactivado *").removeAttr("onkeydown")
        $(".desactivado, .desactivado *").removeAttr("onkeypress")
        $(".desactivado, .desactivado *").removeAttr("onkeyup")
        $(".desactivado, .desactivado *").removeAttr("href")
        $(".desactivado, .desactivado *").removeAttr("onfocus")
        $(".desactivado, .desactivado *").removeAttr("onblur")
        $(".desactivado, .desactivado *").removeAttr("onchange")
        $(".desactivado, .desactivado *").removeAttr("onselect")
        $(".desactivado, .desactivado *").removeAttr("onreset")
        $(".desactivado, .desactivado *").removeAttr("onsubmit")
        $("input.desactivado").attr("readonly", true)
        $("*.desactivado *").attr("readonly", true)
        $("*.desactivado *").addClass("desactivado")
        $("input.desactivado").siblings("label").removeAttr("for")
    }

    var Desactivado = {
        iniciar: () => {
            inicializar();
        }
    }
    window.Desactivado = Desactivado
})()

export default Desactivado