/**
	core program logic
*/



// Cell constructor
function Cell() {
	// make `new` keyword optional
	if (!(this instanceof Cell)) return new Cell();

	// for Snoopy
	this.snoopers = {};

	// initial cell config
	this.fattyAcid = false;
	this.searching = false;
}

//Result constructor
//stores the values we get from each search result

 function getDate(){

	var timestamp = Date.now();
	//    console.log(timestamp)
	date = new Date(timestamp),
	datevalues = [
	   date.getFullYear(),
	   date.getMonth()+1,
	   date.getDay(),
	   //date.getHours(),
	   //date.getMinutes(),
	   //date.getSeconds(),
	];
	return datevalues;
 }

 function getSearchType(){
	var searchType = document.getElementById('searchType');
	return searchType.elements["searchType"].value;

 }
function fattyAcidsCanMove(){
	var movingFattyAcid = document.getElementById('movingFattyAcid');
	return movingFattyAcid.checked;
}


function Result(){
	if (!(this instanceof Result)) return new Result();

	//TODO: finish making the Result constructor
	this.date = getDate();
	this.searchType = getSearchType();
	this.gridSize = getMatrixSize;
	this.attempts = null;
	this.numFattyAcid = getFattyAcidCount();
	this.movingFattyAcid = fattyAcidsCanMove();
}

//initialize the result array
var resultsLog = new Array();


function pushResult(attempts){
	result = new Result;
	result.attempts = attempts;
	resultsLog.push(result);
}




// make each Cell object observable
extend(Cell.prototype, Snoopy.prototype);




// Matrix constructor
function Matrix(config) {
	// required to make instances of this instructor snoopable
	this.snoopers = {};

	// setup config
	this.size = config.size;
	this.fattyAcidCount = config.fattyAcidCount;

	// set up search attempts observable array with a prefilled instance of SearchAttempts()
	this.searchAttemptsLog = new ObservableArray([SearchAttempts()]);

	// setup array of cells
	var cells = fillArray(this.size * this.size, Cell);

	// make the array observable so that changes can be observed
	this.cells = new ObservableArray(cells);

	// cache this matrix instance for use in side the following nested functions which have a different value for `this`
	var thisMatrixInstance = this;

	// keep matrix updated to be the right size
	this.snoop('size', function(size) {
		// add new Cell objects to this.cells or remove cell objects to ensure a length of size*size
		setLength(thisMatrixInstance.cells, size*size, Cell);

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


// pick a random cell and see if it's a fatty acid
Matrix.prototype.findFattyAcid = function findFattyAcid(){
	var numToInsert = this.fattyAcidCount;

	// reset each cell to be a searching first
	this.cells.forEach(function(cell) {
		cell.set('searching', false);
	});

	var cellI = getRandomIndex(this.cells);
	var cell = this.cells[cellI];
	cell.set('searching', true);


	var currentSearch = this.searchAttemptsLog[0];
	currentSearch.set('attempts', currentSearch.attempts + 1);

	if (cell.fattyAcid) {
		this.foundFattyAcid();
		pushResult(currentSearch.attempts);
		return true;
	}
	else {
		return false;
	}
};


// do special stuff when we find one
Matrix.prototype.foundFattyAcid = function foundFattyAcid() {
	// add a new SearchAttempts instance to the beginning of the log
	this.searchAttemptsLog.unshift(SearchAttempts());
};


// Search attempts contructor

function SearchAttempts() {
	// make `new` keyword optional
	if (!(this instanceof SearchAttempts)) return new SearchAttempts();

	// for Snoopy
	this.snoopers = {};

	this.attempts = 0;
}


// make each SearchAttempts object observable
extend(SearchAttempts.prototype, Snoopy.prototype);