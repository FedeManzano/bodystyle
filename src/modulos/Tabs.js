import $ from 'jquery'
import ERR from "./Errores"

class Tab {


    destroy(contexto) {
        $(contexto + " .tab-borde .op-tab-borde label").off()
        $(contexto + " .tab .op-tab label").off()
    }
    /**
     * Inicializa el Tab de tipo solapa
     * @param {ID del contenedor padre de todo el tab} contexto 
     */
    inicializar(contexto) {

        const MODULO = "Error BodyStyle dice: M28"
        if(!ERR.id.validacion.test(contexto)){
            console.error(MODULO + ERR.id.mensaje)
            return 
        }

        var encontrado = 0
        $(contexto + " .contenido-tab").hide()
        $(contexto + " .tab .op-tab label").each(function(){
            if( !$(this).hasClass("desactivado") && encontrado === 0){
                $(this).addClass("activo")
                var idCont = $($(this)).data("target")
                $(idCont).show()
                encontrado = 1
            }
        })
    }


    /**
     * Inicializa el Tab tipo borde
     * @param {Obj Json con la configuración} c 
     */
    inicializarBorde(c){
        $(c.contexto + " .tab-borde .op-tab-borde ul").addClass(c.colorFondo)
        $(c.contexto + " .tab-borde .op-tab-borde label").addClass(c.colorFuente)
        $(c.contexto + " .contenido-tab").hide()
        var encontrado = 0
        $(c.contexto + " .tab-borde .op-tab-borde label").each(function(){
            
            if(!$(this).hasClass("desactivado") && encontrado === 0 ){
                var borde = $("<span class='activo "+ c.colorBorde +"' ></span>")
                $(this).append(borde)
                var id = $($(this)).data("target")
                $(id).show()
                encontrado = 1
            }
        })
    }

    cambiarBorde(c) {
        $(c.contexto + " .tab-borde .op-tab-borde label").click(function() {

            if(!$(this).hasClass("desactivado")) {
                $(c.contexto + " .tab-borde .op-tab-borde label span").remove()
                var borde = $("<span class='activo "+ c.colorBorde +"' ></span>")
                $(this).append(borde)
                $(c.contexto + " .contenido-tab").hide()
                var id = $($(this)).data("target")
                $(id).show()
            }
        })
    }

    cambiarSolapa(contexto){
        $(contexto + " .tab .op-tab label").click(function() {
            if(!$(this).hasClass("desactivado")){
                $(contexto + " .tab .op-tab label").removeClass("activo")
                $(this).addClass("activo")
                var idInfo = $($(this)).data("target")
                $(contexto + " .contenido-tab").hide()
                $(idInfo).show()
            }
        })
    } 

    iniciar(contexto) {
        this.inicializar(contexto)
        this.cambiarSolapa(contexto)
    }

    iniciarBorde({contexto = "vacio", colorFuente = "c-negro", colorFondo = "fd-blanco", colorBorde = "fd-negro"} = {}){


        const MODULO = "Error BodyStyle dice: M28"
        if(!ERR.id.validacion.test(contexto)){
            console.error(MODULO + ERR.id.mensaje)
            return 
        }

        if(!ERR.clasesColorTexto.validacion.test(colorFuente)){
            console.error(MODULO + ERR.clasesColorTexto.mensaje)
            return
        }

        if(!ERR.clasesColorFondo.validacion.test(colorFondo)){
            console.error(MODULO + ERR.clasesColorFondo.mensaje)
            return
        }

        if(!ERR.clasesColorFondo.validacion.test(colorBorde)){
            console.error(MODULO + ERR.clasesColorFondo.mensaje)
            return
        }


        var c = {
            contexto,       // ID del contenido
            colorFuente,    // Color de la fuente de los Tabs
            colorFondo,     // Color de Fondo de la barra 
            colorBorde      // Color del borde seleccionado
        }

        // Inicializa el Tab con borde
        this.inicializarBorde(c)

        // Inicializa el Tab con solapa
        this.cambiarBorde(c)
    }

}


export default Tab