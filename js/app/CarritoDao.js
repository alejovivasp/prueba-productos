'use strict';
(function(productos) {

productos = productos || {};
productos.dao = productos.dao || {};	

/**
 * Clase encargada de consultar el carrito de la aplicacion.
 * @author Alejandro Vivas
 * @version 0.0.1 7/01/2017
 * @since 7/01/2017
 */
productos.dao.CarritoDao = function()
{
};

productos.dao.CarritoDao.prototype.guardarProducto = function(producto)
{
    var stringProductos = localStorage.getItem('productos')
    if(stringProductos)
    {
        var products = JSON.parse(stringProductos);            
    }
    else
    {
        var products = new Array();
    }       
    products.push(producto);
    localStorage.setItem('productos', JSON.stringify(products) );
    return products;
};

productos.dao.CarritoDao.prototype.recuperarProductos = function()
{
    var stringProductos = localStorage.getItem('productos');
    var products;
    if(stringProductos)
    {
        products = JSON.parse(stringProductos);
    }
    else
    {
        products = new Array();
    }
    return products;
};

productos.dao.CarritoDao.prototype.eliminarProducto = function(id)
{
    var stringProductos = localStorage.getItem('productos')
    if(stringProductos)
    {
        var products = JSON.parse(stringProductos);
        for(var i = 0; i < products.length; i++)
        {
            if( products[i].id === id )
            {
                products.splice(i, 1);
                break;
            }   
        }
        localStorage.setItem('productos', JSON.stringify(products) );
    }
    return products;
};

productos.dao.CarritoDao.prototype.buscarProducto = function(id)
{
    var stringProductos = localStorage.getItem('productos')
    if(stringProductos)
    {
        var products = JSON.parse(stringProductos);
        for(var i = 0; i < productos.length; i++)
        {
            if( products[i].id == id )
            {
                return products[i];
            }
        }
    }
};

productos.dao.CarritoDao.prototype.numeroProductos = function()
{
    var stringProductos = localStorage.getItem('productos')
    if(stringProductos)
    {
        var products = JSON.parse(stringProductos);
        return products.length;
    }
    return 0;
};

productos.dao.CarritoDao.prototype.costoTotal = function()
{
    var total = 0;
    var stringProductos = localStorage.getItem('productos')
    if(stringProductos)
    {
        var products = JSON.parse(stringProductos);
        for(var i = 0; i < products.length; i++)
        {
            total += parseInt(products[i].price.replace('.',''));
        }
    }
    return total;
};	
	
})(window.productos || (window.productos = {}));