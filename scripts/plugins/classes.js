

/** Point class */
function Point(x,y) {
    this.x = x || 0;
    this.y = y || 0;
}
	
/** Size pair class */
//SIZE OF IMAGES???
function SizePair(large, small){
    this.largeSize = large || MAX_FONT_SIZE;
    this.smallSize = small || MIN_FONT_SIZE;
}

/** Trial Item */
// single or pair of stimuli
function TrialItem(stim1, cat1, stim2, cat2, bool) {
    this.stim1 = stim1;
    this.stim2 = stim2;
    this.cat1 = cat1;
    this.cat2 = cat2;
    this.isTarget = bool;
}