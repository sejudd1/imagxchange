$(  'button.form-control[id="buy"]' ).on( 'click', function (){
	console.log( "image was purchased" )
	if( $( this ).html() === 'false' ) {
		$( this ).html( 'true' );
	} else {
		$( this ).html( 'false' );
	}
});