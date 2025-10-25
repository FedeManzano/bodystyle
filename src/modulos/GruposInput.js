import $ from 'jquery'


(function () {

    var inicializar = () => {
        $(".input-g .grupo .dropdown-toggle").append("<span class='f-abajo-grupo'></span>")
        $(".input-g .grupo .dropdown-toggle").each(function (index) {
            if (
                $.trim($(this).text()) !== "" &&
                $.trim($(this).text()) !== undefined
            ) {
                $(this).addClass("a-ajuste-btn")
                $(this).addClass("combo-box")
            }
        })
        $(".combo-box").each(function () {
            var idDrop = $($(this)).data("target")

            $(idDrop).children().children().children().click(function () {
                var combobox = null

                $(".combo-box").each(function () {
                    if ($(this).attr("data-target") === idDrop)
                        combobox = this
                })
                $(combobox).children(".c-drop-grupo").text($(this).text())
            })
        })

    }



    var GruposInput = {
        iniciar: () => {
            inicializar()

        }
    }

    window.GruposInput = GruposInput
})()

export default GruposInput