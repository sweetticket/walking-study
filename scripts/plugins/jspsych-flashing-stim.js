
(function($) {
    jsPsych["single-stim"] = (function() {

        var plugin = {};

        plugin.create = function(params) {
            
            params = jsPsych.pluginAPI.enforceArray(params, ['stimuli', 'choices', 'data']);
            
            var trials = new Array(params.stimuli.length);
            for (var i = 0; i < trials.length; i++) {
                trials[i] = {};
                trials[i].index = i;
                trials[i].type = "single-stim";
                trials[i].a_path = params.stimuli[i];
                trials[i].block_type = params.block_type;
                trials[i].choices = params.choices;
                // option to show image for fixed time interval, ignoring key responses
                //      true = image will keep displaying after response
                //      false = trial will immediately advance when response is recorded
                trials[i].continue_after_response = false;
                // timing parameters
                trials[i].timing_stim = -1; // if -1, then show indefinitely
                trials[i].timing_response = -1; // if -1, then wait for response forever
                trials[i].timing_post_trial = (typeof params.timing_post_trial === 'undefined') ? 0 : params.timing_post_trial;
                // optional parameters
                trials[i].is_html = (typeof params.is_html === 'undefined') ? false : params.is_html;
                trials[i].prompt = (typeof params.prompt === 'undefined') ? "" : params.prompt;
                trials[i].data = (typeof params.data === 'undefined') ? {} : params.data[i];
                trials[i].timing_1 = 300;
                trials[i].timing_gap = 25;
                trials[i].timing_2 = 275;
            } 
            return trials;
        };
        
        var trial_complete = false;
        var trial_label = "";
        var response;
        var isSingle;
        var hide1;
        var hide2;

        plugin.trial = function(display_element, block, trial, part) {
            
            // if any trial variables are functions
            // this evaluates the function and replaces
            // it with the output of the function
            trial = jsPsych.pluginAPI.normalizeTrialVariables(trial);
            
            switch (part){
            case 1:
                trial_complete = false;
                response = trial.a_path.isTarget ? "M" : "CR" ;
                loadTrial(trial.index, trial.block_type, trial.a_path.stim1, trial.a_path.cat1, trial.a_path.stim2, trial.a_path.cat2, trial.a_path.isTarget, display_element);
                trial_label = ".B"+trial.block_type+"_"+ trial.index;
                isSingle = $(trial_label + " span:first-child").hasClass("center");
                //alert(isSingle);
               // alert("isSingle: "+isSingle);
                if (!isSingle) {
                    hide1 = Math.random() < .5 ? ".left" : ".right";
                    hide2 = hide1 == ".right" ? ".left" : ".right"; 
                }
	    $(trial_label).css("display","block");
                setTimeout(function() {
                    plugin.trial(display_element, block, trial, part + 1);
                }, trial.timing_1);
                break;
	    case 2:
                //alert(isSingle);
                if (!isSingle) {
                    $(hide1).css("visibility", "hidden");
                }else{
                    $(trial_label).css("visibility", "hidden");
                }
                setTimeout(function() {
                    plugin.trial(display_element, block, trial, part + 1);
                }, trial.timing_gap);
                break;
            case 3:
                if (!isSingle) {
                    $(hide1).css("visibility", "visible");  
                }else{
                    $(trial_label).css("visibility", "visible");
                }
                setTimeout(function() {
                    plugin.trial(display_element, block, trial, part + 1);
                }, trial.timing_2);
                break;
            case 4:
                if (!isSingle) {
                    $(hide2).css("visibility", "hidden");  
                }else{
                    $(trial_label).css("visibility", "hidden");
                }
                setTimeout(function() {
                    plugin.trial(display_element, block, trial, part + 1);
                }, trial.timing_gap);
                break;
            case 5:
                if (!isSingle) {
                    $(hide2).css("visibility", "visible");  
                }else{
                    $(trial_label).css("visibility", "visible");
                }
                setTimeout(function() {
                    if (!trial_complete) {
                        end_trial({rt: -1, key: -1});
                    }
                }, trial.timing_2);
                break;
            }
            
            
            
            var end_trial = function(info) {
                
                trial_complete = true;
                
                var trial_data = {
                    //"trial_type": "single-stim",
                    //"trial_index": block.trial_idx,
                    "label": "B" + trial.block_type + "_" + trial.index,
                    "response": response,
                };

                block.writeData($.extend({}, trial_data, trial.data));
                
                display_element.html('');
                if (trial.timing_post_trial > 0) {
                    setTimeout(function() {
                        block.next();
                    }, trial.timing_post_trial);
                }
                else {
                    block.next();
                }
            };

            var after_response = function(info) {
                response = trial.a_path.isTarget ? "H" : "FA" ;
                // after a valid response, the stimulus will have the CSS class 'responded'
                // which can be used to provide visual feedback that a response was recorded
                //$(trial_label).addClass('responded');

                if (trial.continue_after_response) {
                    // response triggers the next trial in this case.
                    // if hide_image_after_response is true, then next
                    // trial should be triggered by timeout function below.
                    end_trial(info);
                }
            };
        

            jsPsych.pluginAPI.getKeyboardResponse(after_response, trial.choices);
            
            // hide image if timing is set
            /*if (trial.timing_stim > 0) {
                setTimeout(function() {
                    if (!trial_complete) {
                        $('#jspsych-single-stim-stimulus').css('visibility', 'hidden');
                    }
                }, trial.timing_stim);
            }
            */

            // end trial if time limit is set
            if (trial.timing_response > 0) {
                setTimeout(function() {
                    if (!trial_complete) {
                        end_trial({rt: -1, key: -1});
                    }
                }, trial.timing_response);
            }

        };


        return plugin;
    })();
})(jQuery);
