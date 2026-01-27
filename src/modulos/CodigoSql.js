import CodigoSql from "@bodystyle/show-code/src/modulos/CodigoSql"

(function () {

    const inicializar = (config) => {
        CodigoSql.Init()
    }


    const CodigoSql = {
        iniciar: (config) => {
            inicializar(config)
        }
    }

    window.CodigoSql = CodigoSql
})()

export default CodigoSql