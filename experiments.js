/**
 JS file to calculate the experiments results.
*/



var countfattyacid = 20; //does amont of fatty acid
var countrobot = 1; //does amont of robot

var matrixsize =10; //tells the size of the matrix 


/*
has the robot search to find fatty acid
*/

function searchRobot(m){

	//random move in matrix
	loc = getRandom(matrixsize);
	console.log(loc);
	if(m[loc] == 'f'){
		console.log('found fatty acid:' + loc)
	}

}



//makes matrix
/*
outer:loops 10 times to create a grid's rows.
inner:loops 10 times to create a grid's colums.
*/



// Matrix constructor
function Matrix(size) {
	this.snoopers = {};
	this.size = size;
	var cells = fillArray(size * size, function() {
		// make each cell object observable (an instance of the Snoopy constructor)
		return new Snoopy({ fattyAcid: false });
	});

	// make the array observable so that changes can be observed
	this.cells = new ObservableArray(cells);
}



// Matrix methods


// Make instances of Matrix be observable objects so that the view can update automatically when its size property changes
extend(Matrix.prototype, Snoopy.prototype);


//puts in fatty acid
Matrix.prototype.insertRandomFattyAcids = function insertRandomFattyAcids(numToInsert){

	// pick a random unique cell from the matrix numToInsert times
	// call insertFattyAcid for each picked cell
	loopRandom(this.cells, function insertFattyAcid(cell) {
		// set cell value to f (fatty acid)
		// changes to a snoopy object (in this case a cell) is made through .set() so that observers can be notified
		cell.set('fattyAcid', true);
	}, numToInsert);
};


/*
 ResultDivID = the ID of the div you want to place your results value inside of
 val = the value you want to display
*/      


function updateResultsValue(ResultDivID, val) {
	var results = document.getElementById(ResultDivID);
	results.innerHTML = val;
}