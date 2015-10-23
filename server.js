var app = require( './api/index');


// app.set('port', process.env.PORT || 8080 )

var server = app.listen(app.get('port'), function(){
	// console.log("Server is listening on port" + port)
});	