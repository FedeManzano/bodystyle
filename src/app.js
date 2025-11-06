

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
import EfectoHoverBorde from "./modulos/EfectoHoverBorde"
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
    Waves.iniciar()
    Range.iniciar()
    Alerta.iniciar()
    GruposInput.iniciar()
    Desactivado.iniciar();
    InputHandler.iniciar()
    ComentarioDinamico.iniciar()

    const DynamicsInit = () => {
        ComentarioDinamico.destroy()
        ComentarioDinamico.iniciar()
        ToolTips.iniciar()
        DropDown.iniciar()
    }

    const DynamicsDestroy = () => {
        ComentarioDinamico.destroy()
        ToolTips.destroy()
        DropDown.destroy()
    }

    const CodigoHtmlInit = (config) => {
        Html.iniciar(config)
    }

    const CodigoJsInit = (config) => {
        Js.iniciar(config)
    }

    const CodigoCssInit = (config) => {
        Css.iniciar(config)
    }

    const CodigoJavaInit = (config) => {
        Java.iniciar(config)
    }

    const CodigoCInit = (config) => {
        C.iniciar(config)
    }

    const TemplateDestroy = () => {
        Template.destroy()
    }

    const NavigationInit = (id, border) => Navigation.Init(id, border)
    const NavigationDestroy = () => Navigation.Destroy()

    const SidebarDropInit = (conf) => SidebarDrop.Init(conf)


    const Colecciones = () => {
        return new Coleccion
    } 

    const ParalaxInit = () => Paralax.iniciar()

    const ScrollSpyInit = (config) => ScrollSpy.iniciar(config)
    const ScrollSpyDestroy = () => ScrollSpy.destroy()


    const ModalInit = function(conf){
        Modal.iniciar(conf)
    }

    const ModalDestroy = function(){
        Modal.destroy()
    }

    const ImagenesInit = ()=> {
        Imagenes.iniciar()
    }

    const ImagenesDestroy = ()=> {
        Imagenes.destroy()
    }


    const BotonInicioInit = () => {
        BotonInicio.iniciar()
    }

    const TabInit = () => {
        return new Tab
    }

    const ColeccionFlot = () => {
        return new ColeccionFlotante
    }

    const EfectoHoverBordeInit = () => {
        return new EfectoHoverBorde
    }


    const PersonalizadoInit = (config) => {
        Personalizado.iniciar(config)
    }

    const PersonalizadoDestroy = () => {
        Personalizado.destroy()
    }

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
    
    const DropDownInit = (config) => {
        DropDown.iniciar(config)
    }

    const DropDownDestroy = (elemento) => {
        DropDown.destroy(elemento)
    }

    const ToolTipsInit = () => {
        ToolTips.iniciar()
    }

    const ToolTipsDestroy = () => {
        ToolTips.destroy()
    }

    const SelectInit = () => {
        return new Select
    }

    const BotonInicioDestroy = () => {
        BotonInicio.destroy()
    }

    const BS = {
        
        DynamicsAuto: () => DynamicsInit(),
        DynamicsAutoDestroy: () => DynamicsDestroy(),
        // Modales
        ModalInit: (config) => ModalInit(config),
        ModalDestroy: () => ModalDestroy(),


        // Dropdown
        DropDownInit: (config) => DropDownInit(config),
        DropDownDestroy: (elemento) => DropDownDestroy(elemento),

        // Toast
        Toast: (config) => Toast.ejecutar(config),

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

        // Tooltips
        ToolTipsInit: () =>  ToolTipsInit(),
        ToolTipsDestroy: () => ToolTipsDestroy(),


        // Colecciones
        Colecciones: () => Colecciones(),
        ColeccionFlot: () => ColeccionFlot(),

        // Efecti Hover Borde
        EfectoHoverBordeInit: () => EfectoHoverBordeInit(),

        // Select 
        SelectInit: () => SelectInit(),

        // Template
        TemplateDestroy: () => TemplateDestroy(),


        // Personalizado
        PersonalizadoInit: (config) => PersonalizadoInit(config),
        PersonalizadoDestroy: () => PersonalizadoDestroy(),

        SidebarDropInit: (conf)=> SidebarDropInit(conf),
        NavigationInit: (id, border) => NavigationInit(id, border),
        NavigationDestroy: () => NavigationDestroy(),

        // Codigo 
        CodigoHtmlInit: (config) =>  CodigoHtmlInit(config),
        CodigoCssInit: (config) =>  CodigoCssInit(config),
        CodigoJsInit: (config) =>  CodigoJsInit(config),
        CodigoJavaInit: (config) =>  CodigoJavaInit(config),
        CodigoCInit: (config) =>  CodigoCInit(config)
    }
    
    window.BS = BS
})()

export default BS




