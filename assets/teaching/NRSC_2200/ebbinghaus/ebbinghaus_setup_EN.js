const color_inner = 'rgb(191, 191, 191)';           // color of inner discs
const color_outer = 'rgb(64, 64, 64)';           // color of outer discs
const fix_color = 'rgb(255, 255, 255)';
const ref_inner = 25;                             // inner disc radius (reference)
const test_inner = [20, 23, 24, 25, 26, 27, 30]   //                   (test)
const ref_outer = 35                              // outer disc radius (reference)
const test_outer = [35, 15]                       //                   (test)
const dist_discs = 80;                            // distance between inner and outer discs
const dist_groups = 200;                          // distance from fixation for each disc group
const repeat_trials = 10;                         // how many times to repeat each trial type
                                                  // total_trials = repeat_trials * 2 * 2 * test_inner.lenght()
const block_number = 10;                          // how many blocks to include in the experiment 

const prompt_msg = "Keep staring at the cross in the center of the screen.\n\n"+
                   "Use the left and right arrow keys to indicate "+
                   "which of the center circles is biggest.\n\n"
                                                  // message to display before each trial.
                                                  // note: '\n\n' is needed at the end of each line 
                                                  // because prompt is displayed using the psychophysics plugin

// note that words that begin with $ will be replaced with variable values when the code is run
const welcome_msg = '<p style="color: white">Welcome to the Size Judgment Experiment. <br>' +
                    'There will be $BLOCK_NUM blocks in this experiment. <br>' +
                    'There will be $BLOCK_LEN trials in each block. <br>'+
                    'You will be given a chance to take a break between blocks. <br>'+ 
                    'Press any key to start the experiment.</p>'

const any_key_msg = "Press any key to continue."

const trial_msg = "You have completed $TRIAL of $EXP_LEN trials. Get ready for the next!"

const break_msg = "<p>You have completed $PERCENT% of the trials. You are on block $BLOCK of $BLOCK_NUM. <br>Good job! Take a break if you need to.</p>"+
                  "<p>Press any key to continue the experiment.</p></div>"

const survey_html = 
    "<div style='text-align: left; vertical-align: top; display: inline-block; float: left; width: 100%'>"+
    "<p><u>Participant ID:</u> <input style='font-size: 18px; line-height: 1.6em;' input type='text' id='start' name='p_id'></p>"+
    "<p><u>Age:</u> <input style='font-size: 18px; line-height: 1.6em;' input type='text' id='start' name='age'></p>"+
    "<p><u>Handedness:</u> </strong><input type='radio' id='left' name='handedness' value='left'>"+
    "<label for='left'>Left-handed</label>"+
    "<input type='radio' id='right' name='handedness' value='right' checked>"+
    "<label for='right'>Right-handed</label>"+
    "<input type='radio' id='ambi' name='handedness' value='ambi'>"+
    "<label for='ambi'>Ambidextrous</label></p>"+
    "<p><u>Sex:</u> <input type='radio' id='female' name='sex' value='female' checked>"+
    "<label for='female'>Female</label>"+
    "<input type='radio' id='male' name='sex' value='male'>"+
    "<label for='male'>Male</label>"+
    "<input type='radio' name='sex' value='other'><label for='other'>Other, please specify: </label>"+ 
    "<input type='text' name='other_sex' id='other_sex' value=''></p>"+
    "</div>"