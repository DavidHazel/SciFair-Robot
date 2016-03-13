/*
	This file handles everything related to
	rendering views and handling user events
*/





/*
	"matrix size" input
*/

var matrixSizeInput = document.getElementById('MatrixSize');

// update matrix size whenever input changes
matrixSizeInput.addEventListener('input', function setMatrixSize() {
	if (this.validity.valid) {
		// change matrix size
		m.set('size', getMatrixSize());
	} else {
		// show error message if invalid
		this.form.reportValidity();
	}
});

function getMatrixSize() {
	// get the value, convert to a base 10 number
	return parseInt(matrixSizeInput.value, 10);
}




/*
	"fatty acid count" input
*/

var fattyAcidCountInput = document.getElementById('FattyAcidCount');

// update fatty acid count whenever input changes
fattyAcidCountInput.addEventListener('input', function updateFattyAcidCount() {
	if (this.validity.valid) {
		// update fatty acid count
		m.set('fattyAcidCount', getFattyAcidCount());
	} else {
		// show error message if invalid
		this.form.reportValidity();
	}
});

// handy function for getting the input's value
function getFattyAcidCount() {
	// get the value, convert to a base 10 number
	return parseInt(fattyAcidCountInput.value, 10);
}

/*
delay count input
*/
/*
var delayCountInput = document.getElementById('DelayCount');

function getDelayCount(){
	return parseInt(delayCountInput.value, 10);
}
*/

/*
	initialize matrix object
*/

var m = new Matrix({
	size: getMatrixSize(),
	fattyAcidCount: getFattyAcidCount()
});




/*
	keep the bubbles in .search-attempts-log in sync with m.searchAttemptsLog
*/

var searchAttemptsLogList = document.querySelector('.search-attempts-log ol');
m.searchAttemptsLog.addDomObserver(searchAttemptsLogList, renderAttemptsNum);

function renderAttemptsNum(attemptsObject) {
	var li = dom({
		el: 'li',
		text: attemptsObject.snoop('attempts')
	});
	//log the results
//	pushResult(attemptsObject.snoop('attempts'));
	return li;
}




/*
	input validation
*/

// don't do anything upon form submit (the form is for validation by the browser)
var configForm = document.getElementById('MatrixSize');
	configForm.addEventListener('submit', function handleConfigFormSubmit(event) {
	event.preventDefault();
});

// keep the max attribute on the "fatty acid count" input updated to be size*size
dom({
	el: fattyAcidCountInput,
	max: m.snoop('size', function(size) {
		return size*size;
	})
});

// keep the min attribute on the "matrix size" input updated
// to be the square root of fattyAcidCount rounded up
dom({
	el: matrixSizeInput,
	min: m.snoop('fattyAcidCount', function(fattyAcidCount) {
		return Math.ceil(Math.sqrt(fattyAcidCount));
	})
});
//hook up "run" button

var runButton = document.getElementById('run');
runButton.addEventListener('click', searchUntilFound);

//write run function
function searchUntilFound(){
	found = false;
	delay = 0;//getDelayCount(); //in milliseconds
	// 1.set a timer to 2 sec
	// 2.every 2 sec fatty acid move 1 square on grid
	// 3.repeat until fatty acid found

	
//Trying to get the loop to slow down.

	function run(found, delay){
		if(found == false){
			var move = fattyAcidsCanMove();
			if(move){
				m.insertRandomFattyAcids();
			}
			found = m.findFattyAcid();
			setTimeout(run(found, delay), delay);
		}
		else{
			console.log(found);
		}
	}

	run(found, delay);

	

	//console.log(found);
}


/*
	hook up "Step" button
*/
var stepButton = document.getElementById('step');
stepButton.addEventListener('click', continueSearch);


function continueSearch(){
	// shuffle
	var move = fattyAcidsCanMove();
	if(move){
		m.insertRandomFattyAcids();
	}
	// search
	m.findFattyAcid();
	updateResultsBox();
}

/**

 Types of searches
*/


function randomSearch(){

}

function intelligentSearch(){

}

function scanSearch(){

}


/**

Log results to screen


*/
var resultsBox = document.getElementById('resultsBox');


//function updateResultsBox(date,searchType,gridSize,attempts,movingFattyAcids){
function updateResultsBox(){
	resultsBox.innerHTML = "";
	//load to the results array
	resultsBox.innerHTML = resultsLog.toString();

	//print to the screen
	//console.log("updated");
	//results = date + "," + searchType; //need to finish the rest
//	resultsBox.insertAdjacentHTML('beforeend', results + "</br>");

}




/*
	render cells
*/

function renderCell(cell) {
	var li = dom({
		el: 'li',
		'class_fatty-acid': cell.snoop('fattyAcid'),
		'class_searching': cell.snoop('searching')
	});
	return li;
}

// setup cell container
(function() {
	var cellParent = document.querySelector('.cell-parent');

	// keep element width updated
	m.snoop('size', function(size) {
		cellParent.style.width = 24 * size + 'px';
	});

	// render and append new cells when they're pushed to m.cells
	m.cells.addDomObserver(cellParent, renderCell);
})();



/*

Ability to export results as a file
http://stackoverflow.com/questions/21012580/is-it-possible-to-write-data-to-file-using-only-javascript/21016088#21016088

*/

/*
var textFile = null;
  makeTextFile = function (text) {

  	var jsonText = JSON.parse(text);

    var data = new Blob([jsonText], {type: 'application/json'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
  };

  var create = document.getElementById('create'),
  //  textbox = document.getElementById('resultsBox');

  	create.addEventListener('click', function () {
    var link = document.getElementById('downloadlink');
   // link.href = makeTextFile(textbox.innerHTML);
    link.href = makeTextFile(resultsLog);
    link.style.display = 'block';
  }, false);
*/


  var create = document.getElementById('create');
  //  textbox = document.getElementById('resultsBox');

  	create.addEventListener('click', function () {
		var csvContent = "data:text/csv;charset=utf-8,\n";
		csvContent += "searchType,gridSize,attempts,numFattyAcid,movingFattyAcid \n";

		resultsLog.forEach(function(result, index){
      
      row =   result.searchType.toString() + ',' 
            + result.gridSize.toString() + ',' 
            + result.attempts.toString() + ','
            + result.numFattyAcid.toString() + ',' 
            + result.movingFattyAcid.toString();
 //     console.log(row);
      csvContent += index < resultsLog.length ? row + "\n" : row;

		}); 

		console.log(csvContent);	
		var encodedUri = encodeURI(csvContent);
		window.open(encodedUri);
  }, false);





  	function buildCSV(data){
  		//var data = [["name1", "city1", "some other info"], ["name2", "city2", "more info"]];

		
  	}
 




