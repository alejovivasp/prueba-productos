'use strict';
(function(productos) {
	
productos = productos || {};
productos.modelo = productos.modelo || {};

/** URL al contenido de las productos y servicios */
productos.modelo.URL_PRODUCTOS = 'data.json';

/**
 * Clase con el modelo que permite consultar los productos y las categorias
 * @author Alejandro Vivas
 * @since 7/01/2017
 * @version 0.0.1 7/01/2017
 */
productos.modelo.ProductosCategorias = Backbone.Model.extend
({
	url:productos.modelo.URL_PRODUCTOS
});

})(window.productos || (window.productos = {}));