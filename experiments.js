/**
 JS file to calculate the experiments results.
*/



var countfattyacid = 1; //does amont of fatty acid
var countrobot = 1; //does amont of robot

var matrixsize = 3; //tells the size of the matrix 


<<<<<<< HEAD
//gets random number 0-matrix size
function getRandom(a){
	return Math.round(Math.random()*(a-1));

}
//runs program
function runSimulation(){
	var m = buildMatrix(matrixsize);
	insertRandomFattyAcid(m);
	printMatrix(matrix);
	//console.log(m);
	found = false;
	while (found == false){
		found = searchRobot(m);
	}	
	//var m = new Array(matrixsize, matrixsize);

}


//puts in fatty acid
function insertRandomFattyAcid(m){
	x = getRandom(matrixsize);
	y = getRandom(matrixsize);

	m[x][y] = 'f';


}

function printMatrix(matrix){
	for (i = 0;i<matrixsize;i++){
		console.log(matrix[i])

	}
}

=======
>>>>>>> adding-matrix-view
/*
has the robot search to find fatty acid
*/

function searchRobot(m){
	var found = false;
	cnt = 0;
	//random move in matrix
	x = getRandom(matrixsize);
	y = getRandom(matrixsize);
	
		if(m[x][y] == 'f'){
			cnt = cnt + 1;
			found = true;
			console.log('found fatty acid:' + x + ','+ y)
		}
		console.log(cnt);
		return found;

}


<<<<<<< HEAD

//makes matrix
/*
outer:loops 10 times to create a grid's rows.
inner:loops 10 times to create a grid's colums.
*/
function buildMatrix(size){

	matrix = new Array(size)
	for(i = 0;i<size;i++){
	  matrix[i] = new Array(size);
	  for(j = 0;j<size;j++){
	    matrix[i][j] = 0;
	  }
	}
	//console.log(matrix);
	return matrix;

}


//tells instructions to load page
function onLoad(){
	var resultsButton = document.getElementById('runExperiments');
	resultsButton.onclick = runSimulation;
=======
function createCell() {
	// make each cell object observable (an instance of the Snoopy constructor)
	return new Snoopy({ fattyAcid: false });
>>>>>>> adding-matrix-view
}


// Matrix constructor
function Matrix(size) {
	var thisMatrixInstance = this;
	this.snoopers = {};
	this.size = size;
	var cells = fillArray(size * size, createCell);

	// make the array observable so that changes can be observed
	this.cells = new ObservableArray(cells);

	this.snoop('size', function(size) {
		// fill this.cells with new cell objects
		setLength(thisMatrixInstance.cells, size*size, createCell);

		// inset fatty acids
		thisMatrixInstance.insertRandomFattyAcids(getFattyAcidCount());
	});
}



// Matrix methods


// Make instances of Matrix be observable objects so that the view can update automatically when its size property changes
extend(Matrix.prototype, Snoopy.prototype);


//puts in fatty acid
Matrix.prototype.insertRandomFattyAcids = function insertRandomFattyAcids(numToInsert){
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