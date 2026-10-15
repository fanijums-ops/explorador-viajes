export function buscarPaises(paises, text) {

//normalizamos el texto para que no importe si es mayuscula o minuscula
const textoNormalizado = text.trim().toLowerCase();

//validacion si no hay busqueda
if(!textoNormalizado){
    return paises;
}

   //filtramos los paises que contengan el texto
return paises.filter((pais) =>{

//Normalizacion del nombre del pais
const nombre=pais.names?.common.toLowerCase() ??'';

return nombre.includes(textoNormalizado)
})}

//Filtrar por continente
export function filtrarPorContinente(paises, continente){
    //filtrado all
    if(continente === 'all'){
        return paises;
}

//filter por region
return paises.filter((pais) => pais.region === continente);{
}}

//Ordenar paises con el a y b
export function ordenarPaises(paises, criterio){

//utilizar paisesOrdenado, los ... son para crear una copia del array original y no modificarlo
    const paisesOrdenados = [...paises];
    //ordenar de a-z con LocalCompare
        if(criterio === 'az'){
            return paisesOrdenados.sort((a,b) => {
                const nombreA = a.name?.common ?? '';
                const nombreB = b.name?.common ?? '';
                return nombreA.localeCompare(nombreB);
            
            });
        } 
        //Ordenar de z-a
        if(criterio === 'za'){
            return paisesOrdenados.sort((a,b) => {

                const nombreA = a.names?.common ?? '';
                const nombreB = b.name?.common ?? '';

                return nombreB.localeCompare(nombreA);
            })
        }
        return paisesOrdenados;

    }

    //Funcion cambiando procesamiento 
    export function procesarPaises(paises, texto, continente, criterio){
        let resultado = buscarPaises(paises, texto)
        resultado = filtrarPorContinente(resultado, continente)
        resultado = ordenarPaises(resultado, criterio)
        return resultado;

    }
