'use strict';
(function(productos) {
	
productos = productos || {};
productos.Util = productos.Util || {};
productos.vista = productos.vista || {};

/** Configuracion para usar sintaxis de "mustache" */
_.templateSettings =
{
        evaluate : /\{\[([\s\S]+?)\]\}/g,
        interpolate : /\{\{([\s\S]+?)\}\}/g
};	

/**
 * Clase con la vista de la que deben heredar todas las vista de la aplicacion.
 * @author Alejandro Vivas
 * @since 7/01/2017
 * @version 0.0.1 7/01/2017
 */
productos.vista.AppVista = Backbone.View.extend
({
	eliminar:function()
	{
		if(this.events)
		{
			for(var i = 0; i < this.events.length; i++)
			{
				$(this.events[i].selector).off(this.events[i].event);
			}
		}
		this.undelegateEvents();
    	this.stopListening();
        this.$el.children().remove();
	}
});

/**
 * Soporte de la funcion includes en array para IE. 
 * Tomado de https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
 */
if (!Array.prototype.includes) {
	  Object.defineProperty(Array.prototype, 'includes', {
	    value: function(searchElement, fromIndex) {

	      // 1. Let O be ? ToObject(this value).
	      if (this == null) {
	        throw new TypeError('"this" is null or not defined');
	      }

	      var o = Object(this);

	      // 2. Let len be ? ToLength(? Get(O, "length")).
	      var len = o.length >>> 0;

	      // 3. If len is 0, return false.
	      if (len === 0) {
	        return false;
	      }

	      // 4. Let n be ? ToInteger(fromIndex).
	      //    (If fromIndex is undefined, this step produces the value 0.)
	      var n = fromIndex | 0;

	      // 5. If n ≥ 0, then
	      //  a. Let k be n.
	      // 6. Else n < 0,
	      //  a. Let k be len + n.
	      //  b. If k < 0, let k be 0.
	      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

	      // 7. Repeat, while k < len
	      while (k < len) {
	        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
	        // b. If SameValueZero(searchElement, elementK) is true, return true.
	        // c. Increase k by 1.
	        // NOTE: === provides the correct "SameValueZero" comparison needed here.
	        if (o[k] === searchElement) {
	          return true;
	        }
	        k++;
	      }

	      // 8. Return false
	      return false;
	    }
	  });
	}

/**
 * Soporte de la funcion includes en String para IE. 
 * Tomado de https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/includes
 */
if (!String.prototype.includes) {
	  String.prototype.includes = function(search, start) {
	    'use strict';
	    if (typeof start !== 'number') {
	      start = 0;
	    }
	    
	    if (start + search.length > this.length) {
	      return false;
	    } else {
	      return this.indexOf(search, start) !== -1;
	    }
	  };
	}

})(window.productos || (window.productos = {}));