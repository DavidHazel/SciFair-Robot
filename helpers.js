//gets random number 0-matrix size
function getRandom(a){
	return Math.round(Math.random()*(a-1));

}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomIndex(collection) {
	return getRandomInt(0, collection.length - 1);
}


// stick all the properties of source on destination
function extend(destination, source) {
	for (var key in source) {
		if (source.hasOwnProperty(key)) {
			destination[key] = source[key];
		}
	}
	return destination;
}


// return new array of length len. Each item has value of val.
// val can be a function that returns a value or a value
function fillArray(len, val) {
	var arr = [], i;
	if (typeof val === 'function') {
		for (i = 0; i < len; i++) {
			arr.push(val(i));
		}
	} else {
		for (i = 0; i < len; i++) {
			arr.push(val);
		}
	}
	return arr;
}


// call callback up to cap or collection.length times
// pass a random unique item from collection each time
function loopRandom(collection, callback, cap) {
	var untouched = collection.slice(0);
	cap = typeof cap === 'number' ? cap : collection.length;

	// loop through up to cap items
	for (var i = 0; i < cap; i++) {
		// pick a random index in untouched
		var randomI = getRandomIndex(untouched);

		// pass the item to callback
		callback(untouched[randomI], randomI, collection);

		// remove the item from untouched
		untouched.splice(randomI, 1);
	}
}