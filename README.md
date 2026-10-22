# Explorador de Viajes y Lugares Turísticos

Proyecto integrador desarrollado con JavaScript puro, APIs y librerías para explorar información de países y destinos alrededor del mundo.

## Tecnologías

- HTML5
- JavaScript ES6+
- Tailwind CSS
- REST Countries API
- Leaflet
- OpenStreetMap
- SweetAlert2
- LocalStorage
- Git
- GitHub

## Características

El proyecto permite:

- Consultar destinos desde una API REST.
- Mostrar destinos dinámicamente.
- Buscar destinos por nombre.
- Filtrar destinos por continente.
- Ordenar resultados alfabéticamente.
- Consultar información detallada sin cambiar de página.
- Visualizar ubicaciones mediante Leaflet.
- Guardar destinos favoritos.
- Evitar favoritos duplicados.
- Persistir favoritos mediante LocalStorage.
- Consultar una vista dinámica de favoritos.
- Eliminar favoritos mediante confirmación.
- Mostrar notificaciones utilizando SweetAlert2.

## Arquitectura

La aplicación utiliza una sola página HTML y divide la lógica JavaScript en módulos según su responsabilidad.

Actualmente la aplicación separa:

- Comunicación con APIs.
- Servicios y persistencia.
- Coordinación principal.
- Renderizado de la interfaz.
- Integración de mapas.
- Búsqueda, filtrado y ordenamiento.

## Versión actual

v0.6.0 - Favoritos persistentes con LocalStorage e integración de SweetAlert2.