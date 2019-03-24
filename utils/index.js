function biasing(biasArr,correct,goalNum){

	if (correct && biasArr[goalNum] > 1){
		biasArr[goalNum]--;
	}
	else if(biasArr[goalNum] < 15 ){
		biasArr[goalNum]++;
	}
	return biasArr
}
//should take in current bias array and output new bias array

module.exports = biasing;