	
	// recursive function, get 10 numbers between 1..20 that add up to remainder trials (NSPairCountSum)
	// pre: NSCountArray is an array of integers
	function calcNSPairs(NSCountArray, NSPairCountSum, max) {
		var total = 0;
		$.each(NSCountArray,function() {
		    total += this;
		});
		if (total == NSPairCountSum) {
			return NSCountArray;
		}else{
		
		var addPos = Math.floor(Math.random() * NSCountArray.length);
		if (NSCountArray[addPos] < max) {
			NSCountArray[addPos]++;
			
		}
		
		//alert(NSCountArray + " --> sum " + NSPairCountSum);
		return calcNSPairs(NSCountArray, NSPairCountSum, max);
		}
	}
	

	function randomPos(divwidth, divheight){
		var x = Math.floor(Math.random() * (WINDOW_WIDTH - divwidth - 150 + 1))+ 30; // MINUS PADDING? ALSO: MINIMUM POS
		var y = Math.floor(Math.random() * (WINDOW_HEIGHT - 300 - 200 + 1)) + 200; // MINUS PADDING?
		return new Point(x, y);
	}
	
	// get random relative sizes
	function randomSizePair(){
		var largeSize = Math.floor(Math.random() * (MAX_FONT_SIZE - MIN_FONT_SIZE + 1)) + MIN_FONT_SIZE;
		var smallSize = Math.floor(Math.random() * (largeSize - MIN_FONT_SIZE + 1)) + MIN_FONT_SIZE;
		return new SizePair(largeSize, smallSize);
	}
	
	// get random size
	function randomSize(){
		return (Math.floor(Math.random() * (MAX_FONT_SIZE - MIN_FONT_SIZE + 1)) + MIN_FONT_SIZE);
	}
	
	
	/**
	* Randomize array element order in-place.
	* Using Fisher-Yates shuffle algorithm.
	*/
	function shuffleArray(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
	}

