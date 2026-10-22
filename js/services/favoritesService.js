/* =========================================
   SERVICIO DE FAVORITOS
   Manejo de favoritos con LocalStorage
========================================= */


/* =========================================
   CLAVE DE LOCALSTORAGE
========================================= */

const FAVORITES_KEY =
    "explorador_viajes_favoritos";


/* =========================================
   OBTENER FAVORITOS
========================================= */

export function obtenerFavoritos() {

    const favoritosGuardados =
        localStorage.getItem(
            FAVORITES_KEY
        );


    if (!favoritosGuardados) {

        return [];

    }


    try {

        return JSON.parse(
            favoritosGuardados
        );

    } catch (error) {

        console.error(
            "Error al leer favoritos:",
            error
        );

        return [];

    }

}


/* =========================================
   GUARDAR FAVORITOS
========================================= */

function guardarFavoritos(
    favoritos
) {

    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(
            favoritos
        )
    );

}


/* =========================================
   VERIFICAR FAVORITO
========================================= */

export function esFavorito(
    codigo
) {

    const favoritos =
        obtenerFavoritos();


    return favoritos.some(
        (pais) =>
            pais.codes?.alpha_3 === codigo
    );

}


/* =========================================
   AGREGAR FAVORITO
========================================= */

export function agregarFavorito(
    pais
) {

    const favoritos =
        obtenerFavoritos();


    const codigo =
        pais.codes?.alpha_3;


    if (!codigo) {

        return false;

    }


    const yaExiste =
        favoritos.some(
            (favorito) =>
                favorito.codes?.alpha_3 === codigo
        );


    if (yaExiste) {

        return false;

    }


    favoritos.push(
        pais
    );


    guardarFavoritos(
        favoritos
    );


    return true;

}


/* =========================================
   ELIMINAR FAVORITO
========================================= */

export function eliminarFavorito(
    codigo
) {

    const favoritos =
        obtenerFavoritos();


    const favoritosActualizados =
        favoritos.filter(
            (pais) =>
                pais.codes?.alpha_3 !== codigo
        );


    guardarFavoritos(
        favoritosActualizados
    );


    return favoritosActualizados;

}