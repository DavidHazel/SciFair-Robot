



/*
	don't do anything upon form submit (the form is for input validation)
*/

var configForm = document.getElementById('MatrixSize');
configForm.addEventListener('submit', function handleConfigFormSubmit(event) {
	event.preventDefault();
});




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
	initialize matrix object
*/

var m = new Matrix({
	size: getMatrixSize(),
	fattyAcidCount: getFattyAcidCount()
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




// set fatty acid count now and whenever input changes
function updateFattyAcidCount() {
	// update fatty acid count
	m.insertRandomFattyAcids();
}




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