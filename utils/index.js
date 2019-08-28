/**
 * biasing takes in a set of data about the result of a trial, and returns the new biasing array. 
 * Each value is scaled 0-15, enforced by this function.
 * 
 * @param {Number[]} biasArr Array of the biases towards each rgb
 * @param {Boolean} correct Boolean of whether the user selected the correct choice
 * @param {Number} goalNum Number of the goal color (double-check the reference array)
 * @returns	{Number[]} New biasing array
 */
function biasing(biasArr,correct,goalNum){

	if (correct && biasArr[goalNum] > 1){
		biasArr[goalNum]--;
	}
	else if(biasArr[goalNum] < 15 ){
		biasArr[goalNum]++;
	}
	return biasArr;
}

export default biasing;