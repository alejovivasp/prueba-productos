'use strict';
(function(productos) {
	
productos = productos || {};
productos.vista = productos.vista || {};

/**
 * Clase que maneja la vista con los productos
 * @author Alejandro Vivas
 * @since 7/01/2017
 * @version 0.0.1 7/01/2017
 */
productos.vista.VistaProductos = productos.vista.AppVista.extend
({
	 el: '#Contenido'
	,template: _.template($('#VistaTablaProductos').html())
	,events:
	{
		 'click #DesplegarOcultarFiltro'  : 'desplegarOcultarFiltro'
		,'click #BotonBuscar'             : 'buscar'
		,'change #Ordenamiento'           : 'ordenar'
		,'click #AplicarFiltro'           : 'botonFiltrar'
	}
	,init:function()
	{
	    this.carritoDao = new productos.dao.CarritoDao();
		var self = this;
		this.model.fetch()
		.done
		(
			function( data, textStatus, jqXHR ) 
			{
				self.model.set('filtro',{categories:[],disponibles:false,agotados:false,best_seller:false,precio:'cualquierprecio',ordenar:'',nombre:''});
				self.model.set('datosFiltrados',self.model.get('products'));
				self.model.set('numeroProductosCarrito',self.carritoDao.numeroProductos());
				
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
	,getNombreCategoriaPorId:function(categories)
	{
		var nombresCategorias = '';
		for(var j = 0; j < categories.length; j++)
		{
			var id = categories[j];
			for(var i = 0; i < this.model.get('categories').length; i++)
			{
				if( this.model.get('categories')[i].categori_id === id )
				{
					nombresCategorias += '<span class="badge secondary">' + this.model.get('categories')[i].name + '</span>';
				}
			}
		}
		return nombresCategorias;
	}
	,ordenar:function(event)
	{
		var filtro = this.model.get('filtro');
		filtro.ordenar = $(event.target).val();
		this.filtrar();
		this.render();
	}
	,buscar:function(event)
	{
		var filtro = this.model.get('filtro');
		filtro.nombre = $('#Buscar').val();
		this.filtrar();
		this.render();
	}
	,botonFiltrar:function()
	{
		var filtro = this.model.get('filtro');
		$('[name="FiltroCategorias"]').each(function( index, value ) 
		{
			if( $(value).is(':checked') && !filtro.categories.includes(value.id) )
			{
				filtro.categories.push(value.id)
			}
			
			if( !$(value).is(':checked') && filtro.categories.includes(value.id) )
			{
				for(var i = 0; i < filtro.categories.length; i++)
				{
					if( filtro.categories[i] == value.id )
					{
						filtro.categories.splice(i, 1);
					}
				}
			}
		});
		
		filtro.disponibles =  $('#FiltroDisponibles').is(':checked');
		filtro.agotados = $('#FiltroAgotados').is(':checked');
		filtro.best_seller = $('#FiltroMasVendidos').is(':checked');
		filtro.precio = $('input[name="precio"]:checked').val();
		this.filtrar();
		this.render();
	}
	,filtrar:function()
	{
		var filtro = this.model.get('filtro');	
		var datos = this.model.get('products').slice(0);
		// Filtrar por categorias
		if( filtro.categories.length > 0 )
		{
			datos = $.grep( datos , function( dato ) 
			{
				for(var i = 0; i < filtro.categories.length ; i++ )
				{
					if( dato.categories.includes( parseInt(filtro.categories[i])  ) )
					{
						return true;
					}
				}
				return false;
			});
		}
		// Filtrar por disponibilidad 
		datos = $.grep( datos , function( dato ) 
		{
			if( (filtro.disponibles == false) &&  (filtro.agotados == false) )
			{
				return true;
			}
			
			if( dato.available === filtro.disponibles )
			{
				return true;
			}
			else if ( !dato.available === filtro.agotados )
			{
				return true;
			}						
			return false ;
		});
		// Filtrar por los mas vendidos
		if( filtro.best_seller === true )
		{
			datos = $.grep( datos , function( dato ) 
					{					
						return dato.best_seller === true;
					});
		}
		// Filtrar por precio
		if( filtro.precio !== 'cualquierprecio' )
		{
			var valorPrecio = parseInt(filtro.precio);
			if(valorPrecio === 30000)
			{
				datos = $.grep( datos , function( dato ) 
						{					
							var precio = parseInt(dato.price.replace('.',''));
							return precio > valorPrecio;
						});
			}
			else
			{
				datos = $.grep( datos , function( dato ) 
						{					
							var precio = parseInt(dato.price.replace('.',''));
							return precio < valorPrecio;
						});
			}
		}
		// Ordenar 
		if( filtro.ordenar === 'nombre' )
		{
			datos.sort(function(a,b){return a.name.localeCompare(b.name);});
		}
		else if( filtro.ordenar === 'mayorprecio' )
		{
			datos.sort
			(function(a,b)
			{
				var valueA = parseInt( a.price.replace('.','') );
				var valueB = parseInt( b.price.replace('.','') );
				return valueB - valueA;
			});
		}
		else if( filtro.ordenar === 'menorprecio' )
		{
			datos.sort
			(function(a,b)
			{
				var valueA = parseInt( a.price.replace('.','') );
				var valueB = parseInt( b.price.replace('.','') );
				return valueA - valueB;
			});
		}
		// Buscar por el nombre
		if(filtro.nombre.length > 0)
		{
			datos = $.grep( datos , function( dato ) 
					{					
						return dato.name.toUpperCase().includes(filtro.nombre.toUpperCase());
					});
		}
		
		this.model.set('datosFiltrados',datos);
		return datos;
	}
	,desplegarOcultarFiltro:function()
	{
		var filtros = $('#Filtros');
		if( filtros.is(':visible') === true)
		{
			filtros.hide();
		}
		else
		{
			filtros.show();
		}		
	}
});

/**
 * Funcion que regresa el nombre de las categorias segun su id.
 * @param categories Id de la categorias en el producto
 * @param categoriasModelo Categoria en el sistema
 * @author Alejandro Vivas
 * @since 7/01/2017
 * @version 0.0.1 7/01/2017
 */
productos.vista.getNombreCategoriaPorId = function(categories,categoriasModelo)
{
	var nombresCategorias = '';
	for(var j = 0; j < categories.length; j++)
	{
		var id = categories[j];
		for(var i = 0; i < categoriasModelo.length; i++)
		{
			if( categoriasModelo[i].categori_id === id )
			{
				nombresCategorias += ' <span class="badge secondary">' + categoriasModelo[i].name + '</span>';
			}
		}
	}
	return nombresCategorias;
}

})(window.productos || (window.productos = {}));