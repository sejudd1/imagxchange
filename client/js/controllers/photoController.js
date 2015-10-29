angular
	.module('imagXchange')
	.controller('PhotosController', PhotosController);
//inject the $http
PhotosController.$inject = [ '$state', '$http' ]
//PhotosController.$inject = [ 'photosFactory' ]

var yaxisdata = []
var xaxisdata = []
var newpass = false



//refer to the photo module
function PhotosController( $state, $http ){

	var vm = this
	//vm.photos = []
	// vm.photo = {}
	// console.log("vm photo in controller", vm.photo)
	// vm.photo.pricehistory = {}
	// console.log("price history in the controller", vm.photo.pricehistory)
	// vm.newPhoto = {}
	vm.$http = $http

	if (newpass === false){

		console.log(newpass)

		vm.allPhotos()
	} 
}

//gets all photos 
PhotosController.prototype.allPhotos = function() {


	var vm = this

	
	vm.$http
		.get( "http://localhost:8080/api/photos" )
		.then( response => {
			vm.all = response.data
			//console.log(response)
			console.log("allPhotos is running")
	})
}

PhotosController.prototype.showPhoto = function(id) {
	

	var vm = this
	var id = id
	 vm.showAnimation = function(){
			
			console.log('lets animate')
			initChart()
		};

	console.log( "showPhotos function is running", id)

	vm.$http
		.get( "http://localhost:8080/api/photos/" + id )

		.then( response => {

			vm.photo = response.data
			console.log()
			
			console.log(vm.photo)

			//yaxisdata = vm.photo.pricehistory

			for (i = 0; i < vm.photo.pricehistory.length; i++){
				xaxisdata.push(i)
				yaxisdata.push(vm.photo.pricehistory[i])
			}
			
			newpass = true

			initChart();
			// console.log("yaxis", yaxisdata)
			// console.log("xaxis", xaxisdata)
				



			window.location.href = "#/photos/" + response.data._id

		})

		function initChart() {
			console.log("init chart is running" )
			// yaxis = photo.pricehistory
			// xaxis = photo.pricehistory.length
                	 // console.log("faaaad")
                  //    var data = []
                  //    for ( var i = 0; i < xaxisdata.length; i++ ) {
                	 // 	data.push( { position: i, price: yaxisdata[ i ] } ) 
                	 // }
                	 // console.log(data)
                	 //console.log(xaxisdata)


                    var data = [{
                        "position": "0",
                        "price": "5"
                    }, {
                        "position": "1",
                        "price": "6"
                    }, {
                        "position": "2",
                        "price": "7"
                    }, {
                        "position": "3",
                        "price": "10"
                    }, {
                        "position": "5",
                        "price": "9"
                    }, {
                        "position": "8",
                        "price": "10"
                    }];

                    console.log("Initchat:", data)
                    
                    var vis = d3.select("#visualisation"),
                        WIDTH = 500,
                        HEIGHT = 250,
                        MARGINS = {
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 50
                        },
                        xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0, 10]),
                        yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, 10]),
                        xAxis = d3.svg.axis()
                        .scale(xScale),
                        yAxis = d3.svg.axis()
                        .scale(yScale)
                        .orient("left");
                    
                    console.log("vis:", vis)

                    vis.append("svg:g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
                        .call(xAxis);
                    vis.append("svg:g")
                        .attr("class", "y axis")
                        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
                        .call(yAxis);

                    var lineGen = d3.svg.line()
                        .x(function(d) {
                            return xScale(d.position);
                        })
                        .y(function(d) {
                            return yScale(d.price);
                        })
                        .interpolate("basis");

                    vis.append('svg:path')
                        .attr('d', lineGen(data))
                        .attr('stroke', 'green')
                        .attr('stroke-width', 0)
                        .transition()
                        .attr('stroke-width', 5)
                        .attr('fill', 'none'); 
                }
             	
             	console.log("vis")

                initChart();




}

PhotosController.prototype.buyPhoto = function(id) {
	console.log("buy button is hitting")

	var vm = this

	console.log(vm.photo)

	if (vm.photo.currentprice >= vm.photo.startingprice){

		var newprice = (vm.photo.currentprice + 1)
		vm.photo.currentprice = newprice
		console.log(newprice)	
		console.log(id)

	 vm.$http.patch( "http://localhost:8080/api/photos/" + id,
	{currentprice: newprice})
	
	}

}






