'use strict';
(function(productos) { 

/**
 * Clase con el router de la aplicacion 
 * @author Alejandro Vivas
 * @since 7/01/2017
 * @version 0.0.1 7/01/2017
 */    
productos.Router = Backbone.Router.extend
({
	view:undefined
    ,routes : 
    {            
        ''                      : 'productos'
        ,'productos/'           : 'productos'
        ,'carrito/(:idProducto)': 'carrito'
        ,'*path'                : 'vistaPorDefecto'
    }
    ,productos:function()
    {
    	var productosCategorias = new productos.modelo.ProductosCategorias();
    	var vista = new productos.vista.VistaProductos({model:productosCategorias});
    	this.render(vista);
    }
    ,carrito:function(idProducto)
    {
    	var carrito;
    	if(idProducto)
    	{
    		carrito = new productos.modelo.Carrito({idProductoAgregar:idProducto});
    	}
    	else
    	{
    		carrito = new productos.modelo.Carrito();
    	}
    	    	
    	var vista = new productos.vista.VistaCarrito({model:carrito});
    	this.render(vista);
    }
    ,vistaPorDefecto:function()
    {
        window.location = '#productos/';
    },
    render:function(newView)
    {
        if (this.view)
        {
        	this.view.eliminar();
        }
        this.view = newView;
        this.view.init();

        return this;        
    }
});

var router = new productos.Router();
Backbone.history.start();

})(window.productos || (window.productos = {}));