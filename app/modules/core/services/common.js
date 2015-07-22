/**
*	common methods
*
*	@author Lakha Singh
*/
define([
	'core/module',
	'./airports',
	'./utils',
	'oclazyload'
], function( core ){
	core.factory( "core.Common", [
		'core.Airports',
		'core.Utils',
		'$location',
		'$ocLazyLoad',
		'$q',
		function ( Airports, Utils, $location, $ocLazyLoad, $q ){
			return {
				// returns airport-names for airport-code 
				getAirportName: (function(){
					// Map of Airportcode: airportName
					var airportNames = {};

					// raw response from Airports service
					var airports = Airports.query(function(){
						for ( i = 0; i < airports.length; i++ ){
							airportNames[ airports[ i ][ "code"] ] = airports[ i ][ "city"];
						}
					});

					return function( airportCode ){
						Utils.log( "core.services.Common" );

						return airportNames[ airportCode ];
					};
				}()),

				// adds active class nav menu based on url
				activateNav: function( page ){
					var url = $location.path().substring(1);
					var result = '', i;

					// to prevent always true empty string comparisons
					url = url == '' ? 'root' : url;

					// Detect array
					if ( typeof page == 'object' && page.length ){
						for ( i = 0; i < page.length; i++ ){
							if ( typeof page[i] == 'object' && page[i].test == 'contains' ){
								result = url.indexOf( page[i].text ) > -1 ? 'active' : '';
							}else{
								result = url == page[i] ? 'active' : '';
							}
							if ( result == 'active' ){
								break;
							}
						}
					}else{
						if ( typeof page == 'object' && page.test == 'contains' ){
							result = url.indexOf( page.text ) > -1 ? 'active' : '';
						}else{
							result = url == page ? 'active' : '';
						}
					}

					return result;
				}
			}
		}		
	]);
});