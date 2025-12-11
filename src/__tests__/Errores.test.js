
import { afterEach, describe } from "node:test";
import Errores from "../modulos/GestionErrores.js";


describe("GestionErrores.js", () => {
    
    describe("Funciones principales", () => {
        test("Validar ID ", () => {
            expect(Errores.contexto.val("id")).toBe(false);   
            expect(Errores.contexto.val("#id")).toBe(true);
            expect(Errores.contexto.val("#id-2")).toBe(true);       
            expect(Errores.contexto.val("#id*")).toBe(false);   
            expect(Errores.contexto.val("#*id")).toBe(false); 
            expect(Errores.contexto.val("#id_1")).toBe(true);  
            expect(Errores.contexto.val("id_1#")).toBe(false);
        });  

        test("Validar Tipo bool ", () => {
            expect(Errores.bool.val("id")).toBe(false);   
            expect(Errores.bool.val(true)).toBe(true);
            expect(Errores.bool.val(false)).toBe(true);       
            expect(Errores.bool.val(1)).toBe(false);   
        }); 
    });
});

