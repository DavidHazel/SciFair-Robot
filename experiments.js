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


function createCell() {
	// make each cell object observable (an instance of the Snoopy constructor)
	return new Snoopy({ fattyAcid: false });
}


// Matrix constructor
function Matrix(config) {
	// required to make instances of this instructor snoopable
	this.snoopers = {};

	// setup config
	this.size = config.size;
	this.fattyAcidCount = config.fattyAcidCount;

	// setup array of cells
	var cells = fillArray(this.size * this.size, createCell);

	// make the array observable so that changes can be observed
	this.cells = new ObservableArray(cells);

	// cache this matrix instance for use in side the following nested functions which have a different value for `this`
	var thisMatrixInstance = this;

	// keep matrix updated to be the right size
	this.snoop('size', function(size) {
		// fill this.cells with new cell objects
		setLength(thisMatrixInstance.cells, size*size, createCell);

		// inset fatty acids
		thisMatrixInstance.insertRandomFattyAcids(getFattyAcidCount());
	});

	// shuffle fatty acids now and whenever fattyAcidCount changes
	this.snoop('fattyAcidCount', function() {
		// insert fatty acids
		thisMatrixInstance.insertRandomFattyAcids();
	});
}



// Matrix methods


// Make instances of Matrix be observable objects so that the view can update automatically when its size property changes
extend(Matrix.prototype, Snoopy.prototype);


//puts in fatty acid
Matrix.prototype.insertRandomFattyAcids = function insertRandomFattyAcids(){
	var numToInsert = this.fattyAcidCount;

	// reset each cell to be a non-fatty-acid first
	this.cells.forEach(function(cell) {
		cell.set('fattyAcid', false);
	});

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