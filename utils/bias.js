function biasing(biasArr,correct,goalNum){
	
	if (correct && biasArr[goalNum]> 1){
		biasArr[goalNum]--;

	}
	else if (bias[goalNum]< 15){
		biasArr[goalNum]++;
	}
	return biasArr
}
