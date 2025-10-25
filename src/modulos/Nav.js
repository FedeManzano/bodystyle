import $ from "jquery"

(function(){

    // SidebarFijaDesplegar
    let sidebarDesplegada = false
    let colapsoDesplegable = false
    let seidebarCompuestaDesplegada = true

        

    const destroy = () => {
        $(".boton-nav").off("click", desplegarSidebarFija)
        $(".boton-nav-colapso").off("click", manejadorColapso)
        $(".boton-desplegable").off()
        $(".nav-complemento").off()
        $(window).off("resize", manejadorVentana)
        sidebarDesplegada = false
        colapsoDesplegable = false
        seidebarCompuestaDesplegada = true
    }

    const cargarComplemento = () => {
        $("body").append("<div class='nav-complemento'></div>")
        $(".nav-complemento").hide()
        $(".nav-complemento").click(manejadorComplemento)
        $(window).resize(manejadorVentana)
    }

    const manejadorSidebarFija = (id) => {
        if(!sidebarDesplegada || sidebarDesplegada === undefined) {
            $(id).css("left", 0)
            $(".nav-complemento").show()
            sidebarDesplegada = true
        } else {
            $(id).css("left", -240)
            $(".nav-complemento").hide()
            sidebarDesplegada = false
        }
    }
    const manejadorVentana = () => {
        $(".nav-sidebar").css("left", -240)
        $(".nav-sidebar-desplegable").css("left", -240)
        $( ".nav-contenido" ).css("width", "100%")
        $( ".nav-contenido" ).css("margin-left", 0)
        $(".nav-complemento").hide()
        sidebarDesplegada = false
        seidebarCompuestaDesplegada = false
    }


    const manejadorComplemento  = (e) => {
        $(".nav-sidebar").css("left", -240)
        $(".nav-sidebar-desplegable").css("left", -240)
        $(".nav-complemento").hide()
        sidebarDesplegada = false
        seidebarCompuestaDesplegada = false
    }

    const desplegarSidebarFija = (e) => {
        let id= $(e.target).data("trigger")
            if(id === undefined) 
                id = $(e.target).parent().data("trigger")
        manejadorSidebarFija(id)
    }

    const inicializarNav = () => {
        $(".nav-sidebar").css("top", $(".nav-body").height())
        if($(".nav-body").hasClass("nav-fixed")) 
            $(".nav-sidebar").css("top", $(".nav-body").height()) 
        else 
            $(".nav-sidebar").css("top", 0) 
        $(".boton-nav").append("<span></span><span></span><span></span>")
        $(".boton-nav").click(desplegarSidebarFija)
    }

    const manejadorColapso = (e) => {
        let id= $(e.target).data("trigger")
            if(id === undefined) 
                id = $(e.target).parent().data("trigger")
        if(!colapsoDesplegable || colapsoDesplegable === undefined) {
            $(id).slideDown(300)
            colapsoDesplegable = true
        } else {
            $(id).slideUp(300)
            colapsoDesplegable = false
        }
    }

    const inicializarColapso = () => {
        $(".nav-colapso").hide()
        $(".nav-colapso").css("opacity",1)
        $(".nav-colapso").css("top", $(".nav-body").height())
        if($(".nav-body").hasClass("nav-fixed")) {
            $(".nav-colapso").css("position", "fixed") 
            $(".nav-colapso").css("top", $(".nav-body").height()) 
        }
        
        $(".boton-nav-colapso").append("<span></span><span></span><span></span>")
        $(".boton-nav-colapso").click(manejadorColapso)
    }

    // Este metodo
    const menejadorSidebarCompuesta = (e) => {
        let idLista = $(e.target).data("target")
        if($(idLista).hasClass("ab")) {
            $(idLista).slideUp(200)
            $(e.target).children(".f-abajo").remove()
            $(e.target).append("<span class='f-derecha'></span>")
            $(idLista).removeClass("ab") 
        }else {
            $(idLista).slideDown(200)
            $(e.target).children(".f-derecha").remove()
            $(e.target).append("<span class='f-abajo'></span>")
            $(idLista).addClass("ab") 
        }
    }

    const inicializarSideBar = (contexto = null) => {
        $(".nav-sidebar-desplegable .titulo").append("<span class='f-derecha'></span>")
        $(".nav-sidebar-desplegable ul").hide()
        if($(".nav-body .boton-desplegable").length > 0) {
            if(!$(".nav-body").hasClass("nav-fixed")){
                $(".nav-body").addClass("nav-fixed")
            }
        }
        $(".nav-sidebar-desplegable .titulo").click(menejadorSidebarCompuesta)
        
        

        if( $( window ).width() < 1024) {
            $( ".nav-contenido" ).css("width", "100%")
            $( ".nav-contenido" ).css("margin-left", 0)
            $(".nav-sidebar-desplegable").css("left", -240)
            $(".nav-complemento").hide()
        }else {
            if(!seidebarCompuestaDesplegada) {
                $( ".nav-contenido" ).css("width", "100%")
                $( ".nav-contenido" ).css("margin-left", 0)
            }else {
                $(".nav-contenido").css("width", "calc(100% - 240px)")
                $(".nav-contenido").css("margin-left", "240px")
                $(".nav-sidebar-desplegable").css("left", 0)
            }
        }

        $(".boton-desplegable").append("<span></span><span></span><span></span>")

        $(".boton-desplegable").click( function (e) {
            let idColapso = $(e.target).data("trigger")
            if(idColapso === undefined) 
                idColapso = $(e.target).parent().data("trigger")
            if(seidebarCompuestaDesplegada === false || seidebarCompuestaDesplegada === undefined) {
                $(idColapso).css("left", 0)
                seidebarCompuestaDesplegada = true
                if($(window).width() > 1024) {
                    $(".nav-contenido").css("width", "calc(100% - 240px)")
                    $(".nav-contenido").css("margin-left", "240px")
                }else 
                    $(".nav-complemento").show()
            }else {
                $(idColapso).css("left", -240)
                seidebarCompuestaDesplegada = false
                if($(window).width() > 1024) {
                    $(".nav-contenido").css("width", "100%")
                    $(".nav-contenido").css("margin-left", 0)
                }else 
                    $(".nav-complemento").hide()
            }
        })

        $(".nav-complemento").click(manejadorComplemento)

        console.log("contexto")
        if (contexto !== null && contexto !== undefined)
        {
            if(!$(contexto).hasClass("ab")){
                $(contexto).slideDown(200)
                $(contexto).addClass("ab") 
            }  
        } 
    }


    const Nav = {
        iniciar: (contexto) => {
            cargarComplemento()
            inicializarNav()
            inicializarColapso()
            inicializarSideBar(contexto)
        },
        destroy: () => destroy()
    }
    window.Nav = Nav
})()

export default Nav


