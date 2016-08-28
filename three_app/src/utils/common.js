class Common {

	constructor ( ) {

	}

	static isNull ( val ) {

		return this.isNone ( val )
	}

	static isEmpty ( val ) {

		return this.isNone ( val )
	}

	static isNone ( val ) {

		if ( typeof ( val ) == "undefined" ) return true
		if ( val === null ) return true
		return false
	}

	static toRad ( degrees ) {

		return degrees * ( Math.PI/180 )
	}

	static toDeg (radians ) {

		return radians * ( 180/Math.PI )
	}

	static toPercent ( decimals ) {

		return 100 * decimals
	}

	static toDecimals ( percent ) {

		return percent/100
	}

	static clone ( obj ) {

		if ( obj === null || typeof( obj ) !== 'object' || 'isActiveClone' in obj ) return obj;

		let temp
		if ( obj instanceof Date )

	    	temp = new obj.constructor( ); //or new Date ( obj );

		else

	    	temp = obj.constructor( );

		for ( var key in obj ) {

	    	if ( Object.prototype.hasOwnProperty.call( obj, key ) ) {

				obj[ 'isActiveClone' ] = null;
				temp[key] = this.clone ( obj[key] );
				delete obj[ 'isActiveClone' ];

	    	}
		}
		return temp;
	}

	static getObjectsKeys( obj )
	{
		let keys = []

		for ( let key in obj ) {
			if ( obj.hasOwnProperty( key ) ) {

				keys.push( key )

			}
		}
		return keys
	}

	static piMultiply ( array ) {

		for ( let i = 0; i < array.length; i++ ) {

			array [ i ] = array [ i ] * Math.PI
		}
		return array
	}
}

module.exports = Common
