/* jQuery moreLink
 * Ajaxifies the 'More' link of a WordPress web site
 *
 * @author Gabriele Romanato <http://blog.gabrieleromanato.com>
 * @version 1.0
 * @requires jQuery 1.4+
 *
 * Usage:
 * $('a.more-link').moreLink(options)
 *
 * Options:
 *   target: the post container of the destination URL
 *   parent: the parent (outermost) of the link (whose content will be replaced with the content of the target post)
 *   loader: the full path to the animated GIF
 *   loaderStyles: the CSS styles of the AJAX loader
 *
 */


(function($) {

    $.fn.moreLink = function(options) {
    
    	var that = this;
    		
    	var defaults = {
    	
    		target: 'div.post',
    		parent: 'div.post-single',
    		loader: 'loader.gif',
    		loaderStyles: {
    		
    			'float' : 'left',
    			'position': 'relative',
    			'top': '15px',
    			'margin-right': '5px'
    		
    		}
    	
    	};
    	
    	options = $.extend(defaults, options);
    	
    	if(!that.is('a')) {
    	
    		throw new Error(that[0].nodeName + ' is not a link ');
    		
    		return;
    	
    	}
    	
    	
    	var _sanitize = function(url) {
    		
    		var sanitized = url.replace(/#more\-\d+/, '');
    			
    		return sanitized;
    		
    	};
    		
    		
        	
    	return that.each(function() {
    	
    	    var link = $(this);
    	    
    	    $('<img/>').attr('src', options.loader).css(options.loaderStyles).appendTo(link.parent()).hide();
    	
    	    var href = link.attr('href');
    	
    		link.attr('href', _sanitize(href));
    		
    		link.click(function(event) {
    		
    		        link.next().show();
    			
    				$.ajax({
    					url: link.attr('href'),
    					dataType: 'html',
    					type: 'GET',
    					success: function(html) {
    					
    						var post = $(html).find(options.target).html();
    					    link.parents(options.parent).html(post);
    						
    					
    					}
    				});
    			
    			event.preventDefault();
    			
    		});
	
    	
    	
    	});
    
    
    
    };
})(jQuery);
