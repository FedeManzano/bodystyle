
import CodigoCss from "show-sintax/src/modulos/CodigoCss"


(function() {
   
    const inicializar = (config) => {
       CodigoCss.iniciar(config)
    }

    const Css = {
        iniciar: (config) => {
            inicializar(config)
        }
    }

    window.Css = Css
})()

export default Css

        

