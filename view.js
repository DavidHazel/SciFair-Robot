

// get matrix size from input
var getMatrixSize = (function() {
	// get input
	var matrixSizeInput = document.getElementById('MatrixSize');

	// update matrix size whenever input changes
	matrixSizeInput.addEventListener('input', function setMatrixSize() {
		// change matrix size
		m.set('size', getMatrixSize());
	});

	return function() {
		// get the value, convert to a base 10 number
		return parseInt(matrixSizeInput.value, 10);
	};
})();


// get fatty acid count from input
var getFattyAcidCount = (function() {
	// get input
	var fattyAcidCountInput = document.getElementById('FattyAcidCount');

	// update fatty acid count whenever input changes
	fattyAcidCountInput.addEventListener('input', updateFattyAcidCount);

	return function() {
		// get the value, convert to a base 10 number
		return parseInt(fattyAcidCountInput.value, 10);
	};
})();




// m is a 2d array filled with zeros
var initialSize = getMatrixSize();
var m = new Matrix(initialSize);




// set fatty acid count now and whenever input changes
function updateFattyAcidCount() {
	// update fatty acid count
	m.insertRandomFattyAcids(getFattyAcidCount());
}

updateFattyAcidCount();




//runs program
function runSimulation(){
	// m is a 2d array filled with zeros

	

		console.log(m);
			//searchRobot(m);
	

	//var m = new Array(matrixsize, matrixsize);

}




/*
	render cells
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






/*
	set up events
*/

// hook up "run experiments" button
var resultsButton = document.getElementById('runExperiments');
resultsButton.addEventListener('click', runSimulation);