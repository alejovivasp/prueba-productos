'use strict';
(function(productos) {
	
productos = productos || {};
productos.vista = productos.vista || {};

/**
 * Clase con la vista del carrito.
 * @author Alejandro Vivas
 * @since 7/01/2017
 * @version 0.0.1 7/01/2017
 */
productos.vista.VistaCarrito = productos.vista.VistaProductos.extend
({
	 el: '#Contenido'
	,template: _.template($('#VistaTablaCarrito').html())
	,events:
	{
		'click button[name="EliminarProducto"]':'eliminarProducto'
	}
	,init:function()
	{
	    this.carritoDao = new productos.dao.CarritoDao();
		var self = this;
		var products = this.carritoDao.recuperarProductos();
		this.model.set('products',products);
		
    	var productosCategorias = new productos.modelo.ProductosCategorias();
    	productosCategorias.fetch()
		.done
		(
			function( data, textStatus, jqXHR ) 
			{
				var idProductoAgregar = self.model.get('idProductoAgregar'); 
				if( idProductoAgregar )
				{	
					for( var i = 0; i < productosCategorias.get('products').length ; i++  )
					{
						if( productosCategorias.get('products')[i].id == idProductoAgregar )
						{
							var producto = productosCategorias.get('products')[i];
							var productos = self.carritoDao.guardarProducto(producto);
							self.model.set('products',productos);
							break;
						}						
					}					
				}
				self.model.set('categories',productosCategorias.get('categories'));
				self.model.set('numeroProductosCarrito',self.carritoDao.numeroProductos());
				self.model.set('costoTotal',self.carritoDao.costoTotal());
				self.render();
			}
		)
		.fail
		(
			function( data, textStatus, jqXHR ) 
			{
			    $("#ErrorGeneral").removeClass("hide").show();
			}
		);
	}
	,render: function() 
    {
		var html = this.template(this.model.toJSON());
		this.$el.html(html);	
    }
	,eliminarProducto:function(event)
	{
		var id = event.target.id;
		var products = this.carritoDao.eliminarProducto(parseInt(id));
		this.model.set('products',products);
		$('#NumeroProductos').html(this.carritoDao.numeroProductos());
        $('#CostoTotal').html(this.carritoDao.costoTotal());
	}
});

})(window.productos || (window.productos = {}));