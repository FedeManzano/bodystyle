

/*!
 * BodyStyle v5.0.0
 * Copyright Federico Manzano
 * Licencia MIT
 * Repositorio (https://github.com/FedeManzano/bodystyle)
 */

import Modal from "./modulos/Modal"
import Waves from  "./modulos/Waves"
import DropDown from "./modulos/Dropdown"
import Toast from "./modulos/Toast"
import ScrollSpy from "./modulos/ScrollSpy"
import ToolTips from "./modulos/ToolTips"
import Imagenes from "./modulos/Imagenes"
import Range from "./modulos/Range"
import Paralax from "./modulos/Paralax"
import BotonInicio from "./modulos/BotonInicio"
import Alerta from "./modulos/Alerta"
import Tab from "./modulos/Tabs"
import GruposInput from "./modulos/GruposInput"
import Desactivado from "./modulos/Desactivado"
import Coleccion from "./modulos/Colecciones"
import ColeccionFlotante from "./modulos/ColeccionFlotante"
import InputHandler from "./modulos/InputHandler"
import Select from "./modulos/Select"
import Html from "./modulos/CodigoHtml"
import Js from "./modulos/CodigoJs"
import Css from "./modulos/CodigoCss"
import Java from "./modulos/CodigoJava"
import C from "./modulos/CodigoC"
import ComentarioDinamico from "./modulos/ComentarioDinamico"
import Personalizado from "./modulos/Personalizado"
import Navigation from "./modulos/Navigation"
import SidebarDrop from "./modulos/SidebarDrop"

(function(){

    /************************** MÓDULOS INICIADOS AUTOMÁTICAMNTE ******************/
    /******************************************************************************/

    // Inicia automáticamente el efecto WAVES
    // Para elementos dinámicos es necesario la inicialización manual
    Waves.iniciar()

    // Inicia las funcionalidades del input range
    Range.iniciar()

    // Permite cerrar una alerta
    Alerta.iniciar()

    // Permite agregar un dropdown al input-g
    // de la librería
    GruposInput.iniciar()

    // Remueve todos los eventos html del elemento afectado
    Desactivado.iniciar()

    // Permite manejar a los input file    
    InputHandler.iniciar()

    // Inicializa al módulo de comentarios dinámicos
    // Para elementos dinámicos se tiene que inicializar manulamente
    // con la función correspondiente.
    ComentarioDinamico.iniciar()


    /**************************** WAVES EFFECT *************************************/

    /**
     * Función de iniciación del efecto Waves
     */
    const WavesInit =  () => {
        Waves.destroy() 
        Waves.iniciar() 
    }

    /**
     * Desvincula los eventos involucrados 
     * en el efecto liberando recursos no utilizados
     * @returns 
     */
    const WavesDestroy = () => Waves.destroy() 


    /************************* Objetos Dinámicos  **********************************/

    /**
     * Función de inicialización de los elementos dinámicos
     * Dropdown, Comentarios y tootips. Consume más recursos 
     * que inicializar cada uno de estos elementos por separado.
     */
    const DynamicsInit = () => {
        ComentarioDinamico.destroy()
        ComentarioDinamico.iniciar()
        ToolTips.iniciar()
        DropDown.iniciar()
    }

    /**
     * Función de desvinculación de eventos que producen
     * los elementos dinámicos, Dropdown, Tooltips y Comentarios.
     * Tiene el problema que desvincula a todos los elementos antes mencionados
     * Si solo queremos devincular uno de ellos hay que utilizar su función 
     * específica.
     */
    const DynamicsDestroy = () => {
        ComentarioDinamico.destroy()
        ToolTips.destroy()
        DropDown.destroy()
    }

    /**
     * Función que inicializa los comentarios dinámicos,
     * los mismos se inicializan automáticamente cuando se 
     * dispone del archivo transpilado de bodystyle, pero para 
     * utilizar este elemento en objetos dinámicos es necesario 
     * utilizar esta función.
     */
    const ComentariosInit = () => {
        ComentarioDinamico.destroy()
        ComentarioDinamico.iniciar()
    }

    /**
     * Comentarios desvinculados de los elementos asociados. 
     * Se liberan los recursos utilizados cuando ya no se necesite 
     * utilizar este elemento.
     */
    const ComentariosDestroy = () => ComentarioDinamico.destroy()

    /**
     * @param {ori,ele} config deonde ori es la clase asociada al elemento disparador,
     * y ele es la/s clases asociadas al elemento dinámico personalizado.
     */
    const PersonalizadoInit = (config) => Personalizado.iniciar(config)

    /**
     * Función de destrucción y desvinculación de eventos 
     * asociados al tips personalizado.
     */
    const PersonalizadoDestroy = () => Personalizado.destroy()

    /**
     * Menú desplegable asociado a un determinado elemento
     * esta función vincula esta lista con un elemento del DOM. 
     */
    const DropDownInit = () => DropDown.iniciar()

    /**
     * Desvinculación de eventos entre el elemento disparador 
     * y el drop.
     */
    const DropDownDestroy = () => DropDown.destroy()

    /**
     * Elementos dinámicos asociados a un elemento que permiten 
     * una breve descripción de lo que realizan. Esta función 
     * permite su inicialización, esto de debe a que no se inica de 
     * manera automática.
     */
    const ToolTipsInit = () => ToolTips.iniciar()

    /**
     * Desvinculación de los eventos asociados a 
     * los tootips.
     */
    const ToolTipsDestroy = () => ToolTips.destroy()


    /************************* Código Pintado  **********************************/

    /**
     * Perimite inicializar el módulo para pintar el código
     * html dentro las etiquetas pre de html.
     */
    const CodigoHtmlInit = (config) => Html.iniciar(config)

     /**
     * Perimite inicializar el módulo para pintar el código
     * JS dentro las etiquetas pre de html.
     */
    const CodigoJsInit = (config) => Js.iniciar(config)

    /**
     * Perimite inicializar el módulo para pintar el código
     * CSS dentro las etiquetas pre de html.
     */
    const CodigoCssInit = (config) => Css.iniciar(config)

    /**
     * Perimite inicializar el módulo para pintar el código
     * JAVA dentro las etiquetas pre de html.
     */
    const CodigoJavaInit = (config) => Java.iniciar(config)

    /**
     * Perimite inicializar el módulo para pintar el código
     * C dentro las etiquetas pre de html.
     */
    const CodigoCInit = (config) => C.iniciar(config)

    /************************* Navegación **********************************/

    /**
     * Permite inicializar la barra de navegación y vincular 
     * este elemento con el sidebar simple.
     * @param {ID de contexto de la barra de navegación} id 
     * @param {Establece si la navegación tiene borde o no} border 
     */
    const NavigationInit = (id, border) => Navigation.Init(id, border)

    /**
     * Permite desvincular los eventos que se utilizan para 
     * mostrar el sidebar simple asociados al NAV.
     */
    const NavigationDestroy = () => Navigation.Destroy()

    /**
     * Permite inicializar el vínculo entre el NAV con el SIDEBAR 
     * plegable.
     * @param {idNav, idSidebar} conf Objeto JSON que contiene el ID del NAV y el ID del SIDEBAR 
     */
    const SidebarDropInit = (conf) => SidebarDrop.Init(conf)

    /************************* Colecciones **********************************/

    /**
     * @returns Instancia del objeto Coleccon
     * @see /modulos/Coleccion
     */
    const Colecciones = () => new Coleccion 

    /************************* Imagenes *******************************************/

    /**
     * Permite inicializar módulo que genera el efecto 
     * paralax.
     */
    const ParalaxInit = () => Paralax.iniciar()

    /**
     * Inicializa el módulo que permite realizarle 
     * zoom a la imagen.
     */
    const ImagenesInit = ()=> Imagenes.iniciar()

    /**
     * Desvincula los eventos asociados al click que permite 
     * establecer el zoom en una imagen.
     */
    const ImagenesDestroy = ()=> Imagenes.destroy()

    /************************* ScrollSpy *******************************************/
    /**
     * Elemento que se utiliza como guia para el usuario dentro de la página
     * los atributos de inicialización son:
     *      - ancho: PX ancho del scrollspy
     *      - tamFuente: Tamaño de la fuente de los enlaces
     *      - colorBorde: fd-[color] bg-[color] define el color del borde señalador
     *      - alturaBorde: PX altura del borde que compone el señalador de enlaces
     *      - separacion:  Separación del scrollspy respecto el inicio de la página
     *      - colorSeleccionado: Color hexadecimal que define el enlace seleccionado
     *      - colorNoSeleccionado: Color Hexadecimal que define el color de los enlaces no seleccionados
     * @param {ancho, tamFuente, colorBorde, alturaBorde, separacion, colorSeleccionado, colorNoSeleccionado} config  
     */
    const ScrollSpyInit = (config) => ScrollSpy.iniciar(config)

    /**
     * Permite desvincular el evento scroll de la ventana
     * para maximixar recursos.
     */
    const ScrollSpyDestroy = () => ScrollSpy.destroy()

    /************************* Modal *******************************************/
    /**
     * Inicializa el módulo de las ventanas Modales
     */
    const ModalInit = () => Modal.iniciar(conf)

    /**
     * Desvincula los eventos de las ventanas modales
     */
    const ModalDestroy = () => Modal.destroy()

    /************************* Botón de Inicio *******************************************/

    /**
     * Permite la inicialización del módulo para crear y mostrar
     * el botón que le brinda la posibilidad al usuario volver 
     * al scroll = 0. 
     */
    const BotonInicioInit = () => BotonInicio.iniciar()

    /**
     * Permite desvincular el evento window.scroll y
     * el evento click asociados el botón.
     */
    const BotonInicioDestroy = () => BotonInicio.destroy()

    /************************* Tabs *******************************************/

    /**
     * Devuelve una instancia de la clase Tab
     * a través de ella se inicializa el módulo corrspondiente
     * y poder gestionar la lógica de este elemento.
     */
    const TabInit = () => new Tab

    /************************* Colecciones Flotantes *******************************************/

    /**
     * Devuelve una instancia que permite a través de ella 
     * gestionar la lógica de las colecciones fijas dentro 
     * del DOM.
     */
    const ColeccionFlot = () => new ColeccionFlotante

    /************************* Colecciones Flotantes *******************************************/

    /**
     * Devuelve una instancia que permite gestionar 
     * los elementos Select de html brindando estilos 
     * nuevos a este lemento. 
     */
    const SelectInit = () => new Select

    const Deshabilitar = () => {
        desactivar(".deshabilitado")
        desactivar(".input-cargando")
        desactivar(".input-cargando input")
        desactivar(".b-rojo-cargando")
        desactivar(".b-verde-cargando")
        desactivar(".b-azul-cargando")
        desactivar(".b-gris-cargando")
        desactivar(".b-negro-cargando")
        desactivar(".b-blanco-cargando")
    }

    /**
     * Objeto JSON visible desde el exterior que permite acceder e inicializar 
     * todos los módulos de la librería.
     */
    const BS = {
        
        //////////////////////////////////////////////////
        /////////////////////DINÁMICOS ///////////////////
        DynamicsAutoInit: () => DynamicsInit(),
        DynamicsAutoDestroy: () => DynamicsDestroy(),

        // Personalizado
        PersonalizadoInit: (config) => PersonalizadoInit(config),
        PersonalizadoDestroy: () => PersonalizadoDestroy(),

        PersonalizedInit: (conf) => PersonalizadoInit(conf),
        PersonalizedDestroy: () => PersonalizadoDestroy(),

         // Dropdown
        DropDownInit: (config) => DropDownInit(config),
        DropDownDestroy: (elemento) => DropDownDestroy(elemento),

        // Toast
        Toast: (config) => Toast.ejecutar(config),

        // Tooltips
        ToolTipsInit: () =>  ToolTipsInit(),
        ToolTipsDestroy: () => ToolTipsDestroy(),

        // Comentarios
        CommentInit: () => ComentariosInit(),
        CommentDestroy: () => ComentariosDestroy(),

        // Comentarios Alias
        ComentariosInit: () => ComentariosInit(),
        ComentariosDestroy: () => ComentariosDestroy(),

        //////////////////////////////////////////////////
        ///////////////////// FIN DINÁMICOS ///////////////////

        // Modales
        ModalInit: (config) => ModalInit(config),
        ModalDestroy: () => ModalDestroy(),
        
        // ScrollSpy
        ScrollSpyInit: (config) => ScrollSpyInit(config),
        ScrollSpyDestroy: () => ScrollSpyDestroy(),

        // Imagenes
        ImagenesInit: () => ImagenesInit(),
        ImagenesDestroy: () => ImagenesDestroy(),

        // Deshabilitado
        Deshabilitar: () => Deshabilitar(),

        // Paralax
        ParalaxInit: () => ParalaxInit(),

        // botonInicio
        BotonInicioInit: () => BotonInicioInit(),
        BotonInicioDestroy: () => BotonInicioDestroy(),

        // Tabs
        TabInit: () => TabInit(),

        // Colecciones
        Colecciones: () => Colecciones(),
        ColeccionFlot: () => ColeccionFlot(),

        // Select 
        SelectInit: () => SelectInit(),

        // Template
        TemplateDestroy: () => TemplateDestroy(),

        SidebarDropInit: (conf)=> SidebarDropInit(conf),
        NavigationInit: (id, border) => NavigationInit(id, border),
        NavigationDestroy: () => NavigationDestroy(),

        WavesInit: () => WavesInit(),
        WavesDestroy: () => WavesDestroy(),

        //////////////////////////////////////////////////
        ///////////////////// CÓDIGO PINTADO /////////////
       
        CodigoHtmlInit: (config) =>  CodigoHtmlInit(config),
        CodigoCssInit: (config) =>  CodigoCssInit(config),
        CodigoJsInit: (config) =>  CodigoJsInit(config),
        CodigoJavaInit: (config) =>  CodigoJavaInit(config),
        CodigoCInit: (config) =>  CodigoCInit(config),

        // Alias
        CodeHtmlInit: (config) =>  CodigoHtmlInit(config),
        CodeCssInit: (config) =>  CodigoCssInit(config),
        CodeJsInit: (config) =>  CodigoJsInit(config),
        CodeJavaInit: (config) =>  CodigoJavaInit(config),
        CodeCInit: (config) =>  CodigoCInit(config),


        CodeAutoInit: (config) => {
            CodigoHtmlInit(config)
            CodigoCssInit(config)
            CodigoJsInit(config)
            CodigoJavaInit(config)
            CodigoCInit(config)
        },

        CodigoAutoInit: (config) => {
            CodigoHtmlInit(config)
            CodigoCssInit(config)
            CodigoJsInit(config)
            CodigoJavaInit(config)
            CodigoCInit(config)
        }

        //////////////////////////////////////////////////
        /////////////////////FIN CÓDIGO PINTADO /////////////
    }

    
    window.BS = BS
})()


// Exporta obj que posee todos los accesos
// a las funcionalidades de la biblioteca
export default BS




