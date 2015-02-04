
// All pages to be loaded
/*var pages = [
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-ready.html",
	"stage.html",
	"attitude.html",
	"carefulcheck.html",
	"manipulation.html",
	"contingency.html",
	"perceiveduse.html",
	"perceivedcomp.html",
	"postquestionnaire1.html",
	"postquestionnaire2.html",
	"postquestionnaire3.html",
	"postquestionnaire4.html"
];

psiTurk.preloadPages(pages);

var instructionPages = [ // add as a list as many pages as you like
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-ready.html"
];
*/



/********************
* HTML manipulation
*
* All HTML files in the templates directory are requested 
* from the server when the PsiTurk object is created above. We
* need code to get those pages from the PsiTurk object and 
* insert them into the document.
*
********************/

/********************
* EC TEST       *
********************/


	//var wordon, // time word is presented
	//    listening = false;
	//var successArr = [];
	
	var loadTrial = function(index, blocktype, word1, cat1, word2, cat2, isTargetBool, display_element){
		var wrapper_label = "B"+blocktype+"_"+index;
		var stimbox = $("<div></div>").addClass("stimBox "+wrapper_label);
		if (isTargetBool) {
			stimbox.addClass("target");
		}
		display_element.append(stimbox);
		var boxwidth = 0;
		var boxheight = 0;
		if (word1 == null && word2 == null) {
			// do nothing
		} else if (word2 == null) {
			var newspan = $("<span></span>").addClass("center");
			stimbox.append(newspan);
			var word1_is_img = word1.indexOf(".JPG") > -1;
			if (word1_is_img) {
				img_str = "<img src=\'img/"+word1+"\'>";
				newspan.html(img_str);
			} else {
				newspan.text(word1).css("fontSize", randomSize());
			}
			boxwidth = newspan.width();
			boxheight = newspan.height();
		} else if (word1 == null) {
			var newspan = $("<span></span>").addClass("center");
			stimbox.append(newspan);
			var word2_is_img = word2.indexOf(".JPG") > -1;
			if (word2_is_img) {
				img_str = "<img src=\'img/"+word2+"\'>";
				newspan.html(img_str);
			} else {
				newspan.text(word2).css("fontSize", randomSize());
			}
		}else{
			var leftspan = $("<span></span>").addClass("left");
			var rightspan = $("<span></span>").addClass("right");
			stimbox.append(leftspan);
			stimbox.append(rightspan);
			var leftword = Math.random() < .5 ? word1 : word2;
			var rightword = leftword == word1 ? word2 : word1;
			var leftcat = leftword == word1 ? cat1 : cat2;
			var rightcat = leftcat == cat1 ? cat2 : cat1;
			
			var leftword_is_img = leftword.indexOf(".JPG") > -1;
			var rightword_is_img = rightword.indexOf(".JPG") > -1;
			
			if (leftword_is_img && rightword_is_img) {
				leftword_img = "<img src=\'img/"+leftword+"\'>";
				rightword_img = "<img src=\'img/"+rightword+"\'>";
				leftspan.html(leftword_img); 
				rightspan.html(rightword_img);
			}else if (leftword_is_img) {
				leftword_img = "<img src=\'img/"+leftword+"\'>";
				leftspan.html(leftword_img);
				var rightsize = randomSize();
				if (rightword.length >= 10 && rightsize >= 50) {
						rightsize = rightsize - 10;
					}
				rightspan.text(rightword).css("fontSize", rightsize);
			}else if (rightword_is_img) {
				var leftsize = randomSize();
				if (leftword.length >= 10 && leftsize >= 50) {
						leftsize = leftsize - 10;
					}
				leftspan.text(leftword).css("fontSize", leftsize);
				rightword_img = "<img src=\'img/"+rightword+"\'>";
				rightspan.html(rightword_img);
			}else{
				if (leftcat == "NS" || rightcat == "NS") {
					leftspan.text(leftword).css("fontSize", randomSize());
					rightspan.text(rightword).css("fontSize", randomSize());
				}else{
					var sizepair = randomSizePair();
					var leftsize = leftcat == "US" ? sizepair.smallSize : sizepair.largeSize;
					var rightsize = rightcat == "CS" ? sizepair.largeSize : sizepair.smallSize;
					if (leftword.length >= 10 && leftsize >= 50) {
						leftsize = leftsize - 10;
					}
					if (rightword.length >= 10 && rightsize >= 50) {
						rightsize = rightsize - 10;
					}
					leftspan.text(leftword).css("fontSize", leftsize);
					rightspan.text(rightword).css("fontSize", rightsize);
				}
			}
			boxwidth = leftspan.width() + rightspan.width();
			boxheight = leftspan.height() + rightspan.height();
		}
		
		var position = randomPos(boxwidth, boxheight);
		var newPos = new Object();
			newPos.left = position.x < 0 ? 0 : position.x;
			newPos.top = position.y < 0 ? 0 : position.y;
			stimbox.offset(newPos); // if word goes off of window, set right to window width
				

	};

	var buildStimList = function(cond, block){
				
		
		CSPos = cond == 1 ? "walking" : "hearing";
		CSNeut = cond == 1 ? "hearing" : "walking";
		
		//alert("mycondition="+cond+", CSPos="+CSPos+", CSNeut="+CSNeut);
		
		if (block == 0) {
			us_pos_list = US_POS_LIST.slice(0);
			us_neut_list = US_NEUT_LIST.slice(0);
			ns_list = NS_LIST.slice(0);
			targetCount = 2; // may not be necessary
			CSPosCount = 2;
			CSNeutCount = 2;
			//CHANGE FROM HERE
			blankCount = 0;
			USNSposCount = US_POS_LIST.length - CSPosCount;
			USNSneutCount = US_NEUT_LIST.length - CSNeutCount;
			NSPairCountSum = Math.floor(Math.random() * (24 - 8) + 1) + 8;
			totalTrialCount = targetCount + CSPosCount + CSNeutCount + USNSposCount + USNSneutCount + NSPairCountSum;
			NSPairCountArray = [];
			
			for (i = 0; i < CSPosCount + CSNeutCount; i++){
				NSPairCountArray.push(2);
			}
			
			NSPairCountArray = calcNSPairs(NSPairCountArray, NSPairCountSum, 6);
			
		}else{
		
			us_pos_list = US_POS_LIST.slice(0);
			us_neut_list = US_NEUT_LIST.slice(0);
			ns_list = NS_LIST.slice(0);
			targetCount = 10;
			CSPosCount = 5; // CSpos USpos
			CSNeutCount = 5; // CSneut USneut
			totalTrialCount = Math.floor(Math.random() * (100 - 90) + 1) + 90; // 90..100
			blankCount = Math.floor(totalTrialCount * PERCENT_BLANK);
			USNSposCount = US_POS_LIST.length - CSPosCount;
			USNSneutCount = US_NEUT_LIST.length - CSNeutCount;
			NSPairCountSum = totalTrialCount - (targetCount + CSPosCount + CSNeutCount + blankCount + USNSposCount + USNSneutCount);
			NSPairCountArray = []; // recursive function, get 10 numbers between 1..20 that add up to remainder trials (NSPairCountSum)
		
			for (i = 0; i < CSPosCount + CSNeutCount; i++){
				NSPairCountArray.push(1);
			}
		
			NSPairCountArray = calcNSPairs(NSPairCountArray, NSPairCountSum, 20);
		}
		
		
		// Set stim order
		StimOrder = [];
		for (var i = 0; i < CSPosCount; i++){
			StimOrder.push(CS_POS_PAIR);
		}
		for (var i = 0; i < CSNeutCount; i++){
			StimOrder.push(CS_NEUT_PAIR);
		}
		for (var i = 0; i < targetCount; i++){
			StimOrder.push(DISP_TARGET);
		}
		for (var i = 0; i < blankCount; i++){
			StimOrder.push(BLANK);
		}
		for (var i = 0; i < USNSposCount; i++){
			StimOrder.push(US_NS_POS_PAIR);
		}
		for (var i = 0; i < USNSneutCount; i++){
			StimOrder.push(US_NS_NEUT_PAIR);
		}
		
		// shuffle StimOrder
		shuffleArray(StimOrder);
		
		NSPairPos = 0;
		
		for (var i = 0; i < StimOrder.length; i++){
			if (StimOrder[i] == CS_POS_PAIR || StimOrder[i] == CS_NEUT_PAIR) {
				// add ns pairs from NSPairCountArray
				
				for (var k = 1; k <= NSPairCountArray[NSPairPos]; k++) {
					StimOrder.splice(i+k, 0, NS_NS_PAIR);
				}
				NSPairPos++;
			}
			
		}
		
		//alert(StimOrder + "   number of total trials: "+totalTrialCount+",   number of blanks: "+blankCount+",   number of NSNS: "+NSPairCountSum);

		
		
	for (var i = 0; i < StimOrder.length; i++){
		var stim_type = StimOrder[i];
		switch (stim_type){
			case CS_POS_PAIR:
				var pos = Math.floor(Math.random() * us_pos_list.length);
				var usPosStim = us_pos_list[pos];
				us_pos_list.splice(pos1, 1);
				StimOrder[i] = new TrialItem(CSPos, "CS", usPosStim, "US", false);
				break;
			case CS_NEUT_PAIR:
				var pos = Math.floor(Math.random() * us_neut_list.length);
				var usNeutStim = us_neut_list[pos];
				us_neut_list.splice(pos, 1);
				StimOrder[i] = new TrialItem(CSNeut, "CS", usNeutStim, "US", false);
				break;
			case BLANK:
				StimOrder[i] = new TrialItem();
				break;
			case DISP_TARGET:
				if (Math.random() < .5) {
					StimOrder[i] = new TrialItem(TARGET, "target", null, null, true);
				}else{
					var pos = Math.floor(Math.random() * ns_list.length);
					var nsStim = ns_list[pos];
					StimOrder[i] = new TrialItem(TARGET, "target", nsStim, "NS", true);
				}
				break;
			case NS_NS_PAIR:
				var pos1 = Math.floor(Math.random() * ns_list.length);
				var nsStim1 = ns_list[pos1];
				var pos2 = Math.floor(Math.random() * ns_list.length);
				while (pos2 == pos1) {
					pos2 = Math.floor(Math.random() * ns_list.length);
				}
				var nsStim2 = ns_list[pos2];
				StimOrder[i] = new TrialItem(nsStim1, "NS", nsStim2, "NS", false);
				break;
			case US_NS_POS_PAIR:
				var pos1 = Math.floor(Math.random() * us_pos_list.length);
				var usPosStim = us_pos_list[pos1];
				us_pos_list.splice(pos1, 1);
				var pos2 = Math.floor(Math.random() * ns_list.length);
				var nsStim2 = ns_list[pos2];
				if (Math.random() < .5) {
					StimOrder[i] = new TrialItem(usPosStim, "US");
				}else{
				StimOrder[i] = new TrialItem(usPosStim, "US", nsStim2, "NS", false);
				}
				break;
			case US_NS_NEUT_PAIR:
				var pos1 = Math.floor(Math.random() * us_neut_list.length);
				var usNeutStim = us_pos_list[pos1];
				us_neut_list.splice(pos1, 1);
				var pos2 = Math.floor(Math.random() * ns_list.length);
				var nsStim2 = ns_list[pos2];
				if (Math.random() < .5) {
					StimOrder[i] = new TrialItem(usNeutStim, "US");
				}else{
					StimOrder[i] = new TrialItem(usNeutStim, "US", nsStim2, "NS", false);
				}
				break;
		}
		
		
	}
	return StimOrder;
	};
	
	/*for (var i = 0; i < StimOrder.length; i++){
		var trial = StimOrder[i];
		var block_type = "B"+block;
		loadTrial(i, block_type, trial.stim1, trial.cat1, trial.stim2, trial.cat2, trial.isTarget);
	}
	
	//alert(StimOrder);
	
	
	$("#begin"+block).click(function(event) {
		$("#stage_inst"+block).remove();
		runThis();
	});
	
	
	};
	*/
	
	var flashTrialSingle = function(trial_label){
		var k = 0;
		var flashing = setInterval(function(){
		if (k == 3) {
			clearInterval(flashing);
		}
		$(trial_label).css('visibility', 'visible');
		$(trial_label)
			.delay(75)
			.queue( function(next){ 
			  $(this).css('visibility','hidden'); 
			  //next(); 
			})
			.delay(40)
			.queue( function(next){
				$(this).css('visibility','visible');
				//next();
			});
		k++;
						
		}, 500);	
	};
	
	var flashTrialPair = function(trial_label){
		var left = $(trial_label+" span:first-child");
		var right = $(trial_label+" span:last-child");
		var k = 0;
		var m = 0;
		var hide1 = Math.random() < .5 ? left : right;
		var hide2 = hide1 == left ? right : left;
		
		var flashing = setInterval(function(){
		
		$(hide1).css('visibility', 'visible');
		$(hide1)
			.delay(75)
			.queue( function(next){ 
			  $(this).css('visibility','hidden'); 
			  next(); 
			})
			.delay(40)
			.queue( function(next){
				$(this).css('visibility','visible');
				next();
			});
		
		$(hide2).css('visibility', 'visible');
		$(hide2)
			.delay(375)
			.queue( function(next){ 
			  $(this).css('visibility','hidden'); 
			  next(); 
			})
			.delay(40)
			.queue( function(next){
				$(this).css('visibility','visible');
				next();
			});
		
		if (k == 3) {
			clearInterval(flashing);
		}
		k++;

		}, 500);
	};


	var finish = function() {
		clearInterval(trialLoop);
	    $("body").unbind("keydown", response_handler); // Unbind keys
	    $("#wrapper").empty();
	    var csPos = mycondition == 1 ? "walking" : "hearing";
	    var csNeut = mycondition == 1 ? "hearing" : "walking";   
	   
	    currentview = new AttitudeMeasure(csPos, csNeut);
	};
	
	var nextBlock = function(blocknum) {
		clearInterval(trialLoop);
		$("#wrapper").empty();
		runCondition(mycondition, blocknum);
	};


/****************
 * Attitude Measure *
 * ***************/

var AttitudeMeasure = function(csPos, csNeut) {
	
	var noneChecked = true;
	// Stimuli for a basic Stroop experiment
	var stims = [
			[csPos, "CSpos"],
			[csNeut, "CSneut"],
			[TARGET, "target"],
			["window", "USneut1"],
			["door", "USneut2"],
			["room", "USneut3"],
		];

	stims = _.shuffle(stims);

	var next = function() {
		if (stims.length===0) {
			finish();
		}
		else {
			stim = stims.shift();
			show_word( stim[0] );
			$(".neutral").prop("checked", true);
			$(".neutral").prop("checked", false);
			noneChecked = true;

			
		}
	};
	

	var finish = function() {
	//     psiTurk.recordTrialData({'phase':'attitude', 'status':'submit'});
	    currentview = new CarefulReadingCheck();
	};
	
	var show_word = function(text) {
		d3.select("#stim")
			.append("div")
			.attr("id","word")
			.style("text-align","center")
			.style("font-size","60px")
			.style("font-weight","200")
			.style("margin","20px")
			.text(text);
	};

	var remove_word = function() {
		d3.select("#word").remove();
	};
	
	var record_responses = function() {
		$('input').each( function(i, val) {
			if (this.checked == true) {
				psiTurk.recordTrialData({
                                     'word':stim[0],
                                     'label':stim[1],
                                     'response':this.value}
                                   );
				noneChecked = false;
			}
		});

	};
	
	
	// Load the stage.html snippet into the body of the page
	psiTurk.showPage('attitude.html');

	// Show first word
	next();
	
	$("#next").click(function () {
	    record_responses();
	    if (noneChecked) {
		alert("Please answer this question before advancing");
	    }else{
	    remove_word();
	    next();
	    }
	});
	
};

/*************
 * Careful Reading Check *
 * ************/
var CarefulReadingCheck = function() {
		var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";
		var notComplete = true;
	
	var record_responses = function() {

		//psiTurk.recordTrialData({'phase':'carefulcheck', 'status':'submit'});
	
		if ($('#careful').val().length > 0) {
			psiTurk.recordUnstructuredData("careful", $('#careful').val());
			notComplete = false;
		}
		$('select').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('input').each( function(i, val) {
			if (this.checked == true) {
				psiTurk.recordUnstructuredData(this.name, this.value);
			notComplete = false;

			}
		});

	};

	prompt_resubmit = function() {
		replaceBody(error_message);
		$("#resubmit").click(resubmit);
	};

	resubmit = function() {
		replaceBody("<h1>Trying to resubmit...</h1>");
		reprompt = setTimeout(prompt_resubmit, 10000);
		
		psiTurk.saveData({
			success: function() {
			    clearInterval(reprompt); 
                 
			}, 
			error: prompt_resubmit
		});
	};

	// Load the questionnaire snippet 
	psiTurk.showPage('carefulcheck.html');
	//psiTurk.recordTrialData({'phase':'carefulcheck', 'status':'begin'});
	
	$("#next").click(function () {
	     record_responses();
	     if (notComplete) {
		alert("Please answer this question before advancing");
	     }
	    currentview = new ManipulationCheck();
	});
};

/**************
 * Manipulation Check *
 * *************/

var ManipulationCheck = function(){
	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";
	var notComplete = true;
	
	var record_responses = function() {

		//psiTurk.recordTrialData({'phase':'manipulation', 'status':'submit'});

		$('select').each( function(i, val) {
			if (this.value != "blank") {
				psiTurk.recordUnstructuredData(this.id, this.value);
				notComplete = false;
			}
		});

	};

	prompt_resubmit = function() {
		replaceBody(error_message);
		$("#resubmit").click(resubmit);
	};

	resubmit = function() {
		replaceBody("<h1>Trying to resubmit...</h1>");
		reprompt = setTimeout(prompt_resubmit, 10000);
		
		psiTurk.saveData({
			success: function() {
			    clearInterval(reprompt); 
                 
			}, 
			error: prompt_resubmit
		});
	};

	// Load the questionnaire snippet 
	psiTurk.showPage('manipulation.html');
	//psiTurk.recordTrialData({'phase':'manipulation', 'status':'begin'});
	
	$("#next").click(function () {
	    record_responses();
	    if (notComplete) {
		alert("Please answer this question before advancing");
	     }else{
		currentview = new ContingencyMemory();
	     }
	});
};

/***************
 *Contingency Memory *
 ****************/

var ContingencyMemory = function() {
	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	var notComplete1 = true;
	var notComplete2 = true;
	var record_responses = function() {

		//psiTurk.recordTrialData({'phase':'contingency', 'status':'submit'});

		$('select').each( function(i, val) {
			if (this.id == 'contingency_positive') {
				if (this.value != "blank") {
					var score = mycondition == 1 ? this.value : (parseInt(this.value) * -1) + "";
					psiTurk.recordUnstructuredData(this.id, score);
					notComplete1 = false;
				}
			} else if (this.id == 'contingency_neutral') {
				if (this.value != "blank") {
					var score = mycondition == 2 ? this.value : (parseInt(this.value) * -1) + "";
					psiTurk.recordUnstructuredData(this.id, score);
					notComplete2 = false;
				}
			}	
		});

	};

	prompt_resubmit = function() {
		replaceBody(error_message);
		$("#resubmit").click(resubmit);
	};

	resubmit = function() {
		replaceBody("<h1>Trying to resubmit...</h1>");
		reprompt = setTimeout(prompt_resubmit, 10000);
		
		psiTurk.saveData({
			success: function() {
			    clearInterval(reprompt); 
                 
			}, 
			error: prompt_resubmit
		});
	};

	// Load the questionnaire snippet 
	psiTurk.showPage('contingency.html');
	//psiTurk.recordTrialData({'phase':'contingency', 'status':'begin'});
	
	$("#next").click(function () {
	     record_responses();
	     if (notComplete1 || notComplete2) {
		alert("Please answer this question before advancing");
	     }else{
	    currentview = new PerceivedUse();
	     }
	});
};

/****************
 * Perceived Use *
 * **************/

var PerceivedUse = function() {
		var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";
		var notComplete = true;
	
	var record_responses = function() {

		//psiTurk.recordTrialData({'phase':'perceived_use', 'status':'submit'});

		$('select').each( function(i, val) {
			if (this.value != "blank") {
				psiTurk.recordUnstructuredData(this.id, this.value);
				notComplete = false;
			}
		});

	};

	prompt_resubmit = function() {
		replaceBody(error_message);
		$("#resubmit").click(resubmit);
	};

	resubmit = function() {
		replaceBody("<h1>Trying to resubmit...</h1>");
		reprompt = setTimeout(prompt_resubmit, 10000);
		
		psiTurk.saveData({
			success: function() {
			    clearInterval(reprompt); 
                 
			}, 
			error: prompt_resubmit
		});
	};

	// Load the questionnaire snippet 
	psiTurk.showPage('perceiveduse.html');
	//psiTurk.recordTrialData({'phase':'perceived_use', 'status':'begin'});
	
	$("#next").click(function () {
	     record_responses();
	     if (notComplete) {
		alert("Please answer this question before advancing");
	     }else{
		currentview = new PerceivedCompliance();
	     }
	});
};

/****************
 * Perceived Compliance *
 * **************/

var PerceivedCompliance = function() {
		var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";
		var notComplete = true;
	
	var record_responses = function() {

		//psiTurk.recordTrialData({'phase':'perceived_comp', 'status':'submit'});

		$('select').each( function(i, val) {
			if (this.value != "blank") {
				psiTurk.recordUnstructuredData(this.id, this.value);
				notComplete = false;
			}
		});

	};

	prompt_resubmit = function() {
		replaceBody(error_message);
		$("#resubmit").click(resubmit);
	};

	resubmit = function() {
		replaceBody("<h1>Trying to resubmit...</h1>");
		reprompt = setTimeout(prompt_resubmit, 10000);
		
		psiTurk.saveData({
			success: function() {
			    clearInterval(reprompt); 
                 
			}, 
			error: prompt_resubmit
		});
	};

	// Load the questionnaire snippet 
	psiTurk.showPage('perceivedcomp.html');
	//psiTurk.recordTrialData({'phase':'perceived_comp', 'status':'begin'});
	
	$("#next").click(function () {
	     record_responses();
	     if (notComplete) {
		alert("Please answer this question before advancing");
	     }else{
	    currentview = new Questionnaire1();
	     }
	});
};

/****************
* Questionnaire 1 *
****************/

var Questionnaire1 = function() {
		var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";
	var radioNotComplete = true;
	
	var record_responses = function() {

		//psiTurk.recordTrialData({'phase':'postquestionnaire1', 'status':'submit'});

		if ($('#english_age').val().length > 0) {
			psiTurk.recordUnstructuredData("english_age", $('#english_age').val());
		}
		$('select').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);		
		});
		$('input').each( function(i, val) {
			if (this.checked == true) {
				psiTurk.recordUnstructuredData(this.name, this.value);
				radioNotComplete = false;
			}
		});

	};

	prompt_resubmit = function() {
		replaceBody(error_message);
		$("#resubmit").click(resubmit);
	};

	resubmit = function() {
		replaceBody("<h1>Trying to resubmit...</h1>");
		reprompt = setTimeout(prompt_resubmit, 10000);
		
		psiTurk.saveData({
			success: function() {
			    clearInterval(reprompt); 
                 
			}, 
			error: prompt_resubmit
		});
	};

	// Load the questionnaire snippet 
	psiTurk.showPage('postquestionnaire1.html');
	//psiTurk.recordTrialData({'phase':'postquestionnaire1', 'status':'begin'});
	
	$("#next").click(function () {
	     record_responses();
	     if (radioNotComplete) {
		alert("Please answer this question before advancing");
	     }else{
		currentview = new Questionnaire2();
	     }
	});
};

/****************
* Questionnaire 2 *
****************/

var Questionnaire2 = function() {
		var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	var selectNotComplete = true;
	var textNotComplete = true;
	
	var record_responses = function() {

		//psiTurk.recordTrialData({'phase':'postquestionnaire2', 'status':'submit'});

		/*$('textarea').each( function(i, val) {
			if (this.value != "") {
				psiTurk.recordUnstructuredData(this.id, this.value);
				textNotComplete = false;
			}
		});*/
		
		if ($('#age').val().length > 0) {
			psiTurk.recordUnstructuredData("age", $('#age').val());
			textNotComplete = false;
		}
		
		$('select').each( function(i, val) {
			if (this.value != "blank") {
				psiTurk.recordUnstructuredData(this.id, this.value);
				selectNotComplete = false;
			}
		});
		$('input').each( function(i, val) {
			if (this.checked == true) {
				psiTurk.recordUnstructuredData(this.name, this.value);
			}
		});

	};

	prompt_resubmit = function() {
		replaceBody(error_message);
		$("#resubmit").click(resubmit);
	};

	resubmit = function() {
		replaceBody("<h1>Trying to resubmit...</h1>");
		reprompt = setTimeout(prompt_resubmit, 10000);
		
		psiTurk.saveData({
			success: function() {
			    clearInterval(reprompt); 
                 
			}, 
			error: prompt_resubmit
		});
	};

	// Load the questionnaire snippet 
	psiTurk.showPage('postquestionnaire2.html');
	//psiTurk.recordTrialData({'phase':'postquestionnaire2', 'status':'begin'});
	
	$("#next").click(function () {
	     record_responses();
	    if (selectNotComplete || textNotComplete) {
		alert("Please answer this question before advancing");
	     }else{
		currentview = new Questionnaire3();
	     }
	});
};


/****************
* Questionnaire 3 *
****************/

var Questionnaire3 = function() {
		var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";
	var textNotComplete = true;
	
	var record_responses = function() {

		//psiTurk.recordTrialData({'phase':'postquestionnaire3', 'status':'submit'});

		/*$('textarea').each( function(i, val) {
			if (this.value != "") {
				psiTurk.recordUnstructuredData(this.name, this.val());
				textNotComplete = false;
			}
		});*/
		
		if ($('#quest3').val().length > 0) {
			psiTurk.recordUnstructuredData("about", $('#quest3').val());
			textNotComplete = false;
		}

	};

	prompt_resubmit = function() {
		replaceBody(error_message);
		$("#resubmit").click(resubmit);
	};

	resubmit = function() {
		replaceBody("<h1>Trying to resubmit...</h1>");
		reprompt = setTimeout(prompt_resubmit, 10000);
		
		psiTurk.saveData({
			success: function() {
			    clearInterval(reprompt); 
                 
			}, 
			error: prompt_resubmit
		});
	};

	// Load the questionnaire snippet 
	psiTurk.showPage('postquestionnaire3.html');
	//psiTurk.recordTrialData({'phase':'postquestionnaire3', 'status':'begin'});
	
	$("#next").click(function () {
	     record_responses();
	     if (textNotComplete) {
		alert("Please answer this question before advancing");
	     }else{
		currentview = new Questionnaire4();
	     }
	});
};

/****************
* Questionnaire 4 *
****************/

var Questionnaire4 = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";
	
	var radioNotComplete = true;
	
	var record_responses = function() {

		//psiTurk.recordTrialData({'phase':'postquestionnaire2', 'status':'submit'});

		/*$('textarea').each( function(i, val) {
				psiTurk.recordUnstructuredData(this.name, this.val());
		});*/
		
		if ($('#quest4').val().length > 0) {
			psiTurk.recordUnstructuredData("taken_before_desc", $('#quest4').val());
			textNotComplete = false;
		}
		
		$('input').each( function(i, val) {
			if (this.checked == true) {
				psiTurk.recordUnstructuredData(this.name, this.value);
				radioNotComplete = false;
			}
		});

	};

	prompt_resubmit = function() {
		replaceBody(error_message);
		$("#resubmit").click(resubmit);
	};

	resubmit = function() {
		replaceBody("<h1>Trying to resubmit...</h1>");
		reprompt = setTimeout(prompt_resubmit, 10000);
		
		psiTurk.saveData({
			success: function() {
			    clearInterval(reprompt); 
                 
			}, 
			error: prompt_resubmit
		});
	};

	// Load the questionnaire snippet 
	psiTurk.showPage('postquestionnaire4.html');
	//psiTurk.recordTrialData({'phase':'postquestionnaire4', 'status':'begin'});
	
	$("#next").click(function () {
	    record_responses();
	    if (radioNotComplete) {
		alert("Please answer this question before advancing");
	     }else{
	    psiTurk.saveData({
            success: function(){
		psiTurk.completeHIT();
                //psiTurk.computeBonus('compute_bonus', function() { 
                //	psiTurk.completeHIT(); // when finished saving compute bonus, the quit
                //}); 
            }, 
            error: prompt_resubmit});
	     }
	});

    
	
};

// Task object to keep track of the current phase
//var currentview;

/*******************
 * Run Task
 ******************/
/*$(window).load( function(){
    psiTurk.doInstructions(
    	instructionPages, // a list of pages you want to display in sequence
    	function() { currentview = new SurveillanceTask(mycondition); } // what you want to do when you are done with instructions
    );
}); */
