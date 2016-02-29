//tells instructions to load page
var resultsButton = document.getElementById('runExperiments');
resultsButton.addEventListener('click', runSimulation);

// get initial matrix size from input
var getMatrixSize = (function() {
	var matrixSizeInput = document.getElementById('MatrixSize');

	return function() {
		// get the value, convert to a base 10 number
		return parseInt(matrixSizeInput.value, 10);
	};
})();

// m is a 2d array filled with zeros
var initialSize = getMatrixSize();
var m = new Matrix(initialSize);


//runs program
function runSimulation(){
	// m is a 2d array filled with zeros
	var initialSize = getMatrixSize();
	var m = new Matrix(initialSize);

	
	m.insertRandomFattyAcids(10);

		console.log(m);
			//searchRobot(m);
	

	//var m = new Array(matrixsize, matrixsize);

}






/*
	render cell
*/

function renderCell(cell) {
	var li = dom({
		el: 'li',
		'class_fatty-acid': cell.snoop('fattyAcid')
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

