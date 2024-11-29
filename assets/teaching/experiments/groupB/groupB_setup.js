exp_repeat_trials = 10;
pract_repeat_trials = 1;                       // how many times to repeat each trial type
const prop_list = ['025','070','090','100','110','130','175']

const save_name = 'groupB_data_idxxxx.csv'

const block_number = 10;                          // how many blocks to include in the experiment 
                                                  // message to display before each trial.
                                                  // note: '\n\n' is needed at the end of each line 
                                                  // because prompt is displayed using the psychophysics plugin

const block_len = Math.floor(2*2*prop_list.length*exp_repeat_trials/block_number) // 2 conditions, left vs right side

const fixation_img = 'assets/images/fixation.png'

// trial variables
// letter keys, same first, then different
const letter_keys = ["ArrowLeft", "ArrowRight"]
const img_h = [250, 50, 250]
const img_margin = 100
const fix_size = [50, 50] // 50 pixels = 1 degree of visual angle

const start_msg = "<p>You just finished your practice trials - good job!<br>" +
                  "Next you will complete $BLOCK_NUM blocks of $BLOCK_LEN test trials. <br>" +
                  "At the end of each block you will have the opportunity to take a brief break.<br>"+ 
                  "Please remember to be as accurate and quick as possible.</p>"
                  "<p>Press any key to continue the experiment when you are ready. </p>"

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