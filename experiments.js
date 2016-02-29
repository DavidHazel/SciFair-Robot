/**
 JS file to calculate the experiments results.
*/



var countfattyacid = 1; //does amont of fatty acid
var countrobot = 1; //does amont of robot

var matrixsize = 3; //tells the size of the matrix 


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
}




/*
 ResultDivID = the ID of the div you want to place your results value inside of
 val = the value you want to display
*/      


function updateResultsValue(ResultDivID, val) {
	var results = document.getElementById(ResultDivID);
	results.innerHTML = val;
}



//************** OLD CODE FROM GENETICS EPERIMETN **************************************\

/*
Rerun all calculations, we do this becasue we have limited inputs and its easier just to recalc the page
*/
function runExperiments(){

	//clear results
	count_x_blue_x_green = 0;
	count_x_green_x_green = 0;
	count_x_blue_y_naked = 0;
	count_x_green_y_naked = 0;
	var experimentLog = document.getElementById('ExperimentLog');
	experimentLog.innerHTML = "";

	console.log("running experiments");


	var samplesize = document.getElementById('SampleSize').value;
	
	console.log("Sample Size" . samplesize);
	var counter = 0;
	var results= "";
	while (counter < samplesize) {
		results = getRandom(ovaries_bucket) + '_' + getRandom(testes_bucket);
		resultsLog = counter + " = " + results;
		experimentLog.insertAdjacentHTML('beforeend', resultsLog + "</br>");

		updateResults(results);
		counter++;
	}

	//write results to experiments
	var printResults = "<div><strong>Sample Size : " + samplesize + "</strong></div>";
	printResults += "<div>X Blue | X Green = " + count_x_blue_x_green + "</div>";
	printResults += "<div>X Green | X green = " + count_x_green_x_green + "</div>";
	printResults += "<div>X Blue | Y Naked = " + count_x_blue_y_naked + "</div>";
	printResults += "<div>X Green | Y Naked = " + count_x_green_y_naked + "</div>";

	updateResultsValue("Results", printResults);
	
	var results = [];
	results['samplesize'] = samplesize;
	results['count_x_blue_x_green'] = count_x_blue_x_green;
	results['count_x_green_x_green'] = count_x_green_x_green;
	results['count_x_blue_y_naked'] = count_x_blue_y_naked;
	results['count_x_green_y_naked'] = count_x_green_y_naked;

	logResults(results);


}

function logResults(data){
	$.post( "log.php", {
		samplesize: data.samplesize,
		count_x_blue_x_green: data.count_x_blue_x_green,
		count_x_green_x_green: data.count_x_green_x_green,
		count_x_blue_y_naked: data.count_x_blue_y_naked,
		count_x_green_y_naked: data.count_x_green_y_naked
	 } );
}
function updateResults(results){
	//update the count variables

	switch(results){
		case "x_blue_x_green":
			count_x_blue_x_green++;
			break;
		case "x_green_x_green":
			count_x_green_x_green++;
			break;
		case "x_blue_y_naked":
			count_x_blue_y_naked++;
			break;
		case "x_green_y_naked":
			count_x_green_y_naked++;
			break;
	}
	//update the results window pane

}

/*
size = 10

var x = new Array(size);
for (var i = 0; i < size; i++) {
  x[i] = new Array(size);
  for(var k = 0; k<size; k++){
      x[i][k] = 0;
  }
}
*/









