/*  jspsych-xab.js
 *	Josh de Leeuw
 *
 *  This plugin runs a single XAB trial, where X is an image presented in isolation, and A and B are choices, with A or B being equal to X. 
 *	The subject's goal is to identify whether A or B is identical to X.
 *
 * documentation: https://github.com/jodeleeuw/jsPsych/wiki/jspsych-xab
 *
 */

(function($) {
    jsPsych.xabcd = (function() {

        var plugin = {};

        plugin.create = function(params) {
            
            params = jsPsych.pluginAPI.enforceArray(params, ['data']);

            // the number of trials is determined by how many entries the params.stimuli array has
            var trials = new Array(params.stimuli.length);

            for (var i = 0; i < trials.length; i++) {
                trials[i] = {};
                trials[i].type = "xabcd";
                trials[i].x_path = params.stimuli[i][0];
                // if there is only a pair of stimuli, then the first is the target and is shown twice.
                // if there is a triplet, then the first is X, the second is the target, and the third is foil (useful for non-exact-match XAB).
                if (params.stimuli[i].length == 2) {
                    trials[i].a_path = params.stimuli[i][0];
                    trials[i].b_path = params.stimuli[i][1];
                }
                else {
                    trials[i].a_path = params.stimuli[i][1];
                    trials[i].b_path = params.stimuli[i][2];
                    trials[i].c_path = params.stimuli[i][3];
                    trials[i].d_path = params.stimuli[i][4]
                }
                // timing parameters
                trials[i].timing_x = params.timing_x || 20; // defaults to 1000msec.
                trials[i].timing_xab_gap = params.timing_xab_gap || 50; // defaults to 1000msec.
                trials[i].timing_ab = params.timing_ab || -1; // defaults to -1, meaning infinite time on AB. If a positive number is used, then AB will only be displayed for that length.
                trials[i].timing_post_trial = (typeof params.timing_post_trial === 'undefined') ? 1000 : params.timing_post_trial; // defaults to 1000msec.
                // optional parameters
                trials[i].is_html = (typeof params.is_html === 'undefined') ? true : params.is_html;
                trials[i].prompt = (typeof params.prompt === 'undefined') ? "" : params.prompt;
                trials[i].data = (typeof params.data === 'undefined') ? {} : params.data[i];
                trials[i].cont_key = params.cont_key || []; // keycode to press to advance screen, default is all keys.


            }
            return trials;
        };

        var xab_trial_complete = false;

        plugin.trial = function(display_element, block, trial, part) {
            
            // if any trial variables are functions
            // this evaluates the function and replaces
            // it with the output of the function
            trial = jsPsych.pluginAPI.normalizeTrialVariables(trial);
            
            switch (part) {

                // the first part of the trial is to show the X stimulus.
                
            case 1:
                // reset this variable to false
                xab_trial_complete = false;
                display_element.append($('<div>', {
                    "class": 'instructions',
                    html: "<p>Please press the space bar when you are ready to begin the next trial</p>"}
                    ));
                
                jsPsych.pluginAPI.getKeyboardResponse(function() {plugin.trial(display_element, block, trial, part + 1);}, trial.cont_key, 'date', false);
                
                break;
            case 2:
                $('.instructions').remove();
                
                
                // how we display the content depends on whether the content is 
                // HTML code or an image path.
                if (!trial.is_html) {
                    display_element.append($('<img>', {
                        src: trial.x_path,
                        "class": 'jspsych-xab-stimulus'
                    }));
                }
                else {                        
                    
                    display_element.append($('<div>', {
                        "class": 'jspsych-xab-stimulus',
                        html: trial.x_path
                    }));
                    
                    
                }

                // start a timer of length trial.timing_x to move to the next part of the trial
                setTimeout(function() {
                    plugin.trial(display_element, block, trial, part + 1);
                }, trial.timing_x);
                break;

                // the second part of the trial is the gap between X and AB.
            case 3:
                // remove the x stimulus
                $('.jspsych-xab-stimulus').remove();
                var mask = ""
                for (i = 0; i < trial.x_path.length; i++) {
                    mask += "x";
                }
                
                display_element.append($('<div>', {
                        "class": 'jspsych-xab-stimulus',
                        html: mask
                    }));
                // start timer
                setTimeout(function() {
                    plugin.trial(display_element, block, trial, part + 1);
                }, trial.timing_xab_gap);
                break;

                // the third part of the trial is to display A and B, and get the subject's response
            case 4:
                $('.jspsych-xab-stimulus').remove();
                
                if (trial.prompt !== "") {
                    display_element.append(trial.prompt)
                    }
                
                    images = [trial.b_path, trial.a_path, trial.c_path, trial.d_path];

                // show the options
                if (!trial.is_html) {
                    display_element.append($('<img>', {
                        "src": images[0],
                        "class": 'jspsych-xab-stimulus left'
                    }));
                    display_element.append($('<img>', {
                        "src": images[1],
                        "class": 'jspsych-xab-stimulus right'
                    }));
                }
                else {
                                        
                    $(document).ready(function() {
                        
                    
                    display_element.append($('<div>').append($('<input>', {
                        "class": 'jspsych-xabcd-stimulus',
                        "type":"radio",
                        "value": images[0],
                        "name": "choice"
                    })).append($('<span>', {
                        "class": 'jspsych-xabcd-stimulus',
                        html: images[0]
                    })));
                    
                    display_element.append($('<div>').append($('<input>', {
                        "class": 'jspsych-xabcd-stimulus',
                        "type":"radio",
                        "value": images[1],
                        "name": "choice"
                    })).append($('<span>', {
                        "class": 'jspsych-xabcd-stimulus',
                        html: images[1]
                    })));
                    
                    display_element.append($('<div>').append($('<input>', {
                        "class": 'jspsych-xabcd-stimulus',
                        "type":"radio",
                        "value": images[2],
                        "name": "choice"
                    })).append($('<span>', {
                        "class": 'jspsych-xabcd-stimulus',
                        html: images[2]
                    })));
                    
                    display_element.append($('<div>').append($('<input>', {
                        "class": 'jspsych-xabcd-stimulus',
                        "type":"radio",
                        "value": images[3],
                        "name": "choice"
                    })).append($('<span>', {
                        "class": 'jspsych-xabcd-stimulus',
                        html: images[3]
                    })));
                    
                    display_element.append($('<button>', {
                        'id': 'jspsych-xabcd-next',
                        'class': 'jspsych-xabcd'
                    }));
                    $("#jspsych-xabcd-next").html('Next');
                    
                     $('#jspsych-xabcd-next').click(function(){
                        
                        var response = "";
                            $('input').each( function(i, val) {
                            if (this.checked == true) {
                            	response = this.value;
                            }
                            });
                            
                            if (response == "") {
                                alert("Please choose a word");
                            }else{
                                after_response(response);
                            }
                       
                     
                     });
                    });
                    
                }


                // if timing_ab is > 0, then we hide the stimuli after timing_ab milliseconds
                if (trial.timing_ab > 0) {
                    setTimeout(function() {
                        if (!xab_trial_complete) {
                            $('.jspsych-xab-stimulus').css('visibility', 'hidden');
                        }
                    }, trial.timing_ab);
                }
                
                var next_part = function(part){
                    plugin.trial(display_element, block, trial, part + 1)
                }

                // create the function that triggers when a key is pressed.
                var after_response = function(response) {
                    
                       
                    // create object to store data from trial
                    var trial_data = {
                        "trial_type": "xab",
                        "trial_index": block.trial_idx,
                        "response": response
                    };
                    block.writeData($.extend({}, trial_data, trial.data));
                    
                    display_element.html(''); // remove all
                    
                    xab_trial_complete = true;
                    
                    // move on to the next trial after timing_post_trial milliseconds
                    if(trial.timing_post_trial > 0) {
                        setTimeout(function() {
                            block.next();
                        }, trial.timing_post_trial);
                    } else {
                        block.next();
                    }
                
                };
                                
                break;
            }
        };

        return plugin;
    })();
})(jQuery);
