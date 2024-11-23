const neg_scenes = [
  'assets/images/neg_scenes/cemetery02.jpg',
  'assets/images/neg_scenes/desert01.jpg'
]
const pos_scenes = [
  'assets/images/pos_scenes/beach01.jpg',
  'assets/images/pos_scenes/beach02.jpg'
]
const neg_faces = [
  'assets/images/faces/id01_angry.jpg',
  'assets/images/faces/id02_angry.jpg',
  'assets/images/faces/id03_angry.jpg'
]
const pos_faces = [
  'assets/images/faces/id01_happy.jpg',
  'assets/images/faces/id02_happy.jpg',
  'assets/images/faces/id03_happy.jpg'
]

const save_name = 'groupA_data_idxxxx.csv'


exp_repeat_trials = 1;
prac_repeat_trials = 1;                       // how many times to repeat each trial type
exp_trial_num = 100;
prac_trial_num = 10;                       // how many times to repeat each trial type

const block_number = 4;                          // how many blocks to include in the experiment 
                                                  // message to display before each trial.
                                                  // note: '\n\n' is needed at the end of each line 
                                                  // because prompt is displayed using the psychophysics plugin
const block_len = Math.floor(exp_trial_num/block_number) // multiply by 2 because both target absent and target present trials

const fixation_img = 'assets/images/fixation.png'

resize_factor = 50
const item1_size = [600, 400]
const item2_size = [163, 250]

const pos_key = 'j'
const neg_key = 's'
const image_dur = [1000, null]
const gap_dur = 500

const fix_size = [50, 50] // 50 pixels = 1 degree of visual angle

const start_msg = "<p>You just finished your practice trials - good job!<br>" +
                  "Next you will complete $BLOCK_NUM blocks of $BLOCK_LEN test trials. <br>" +
                  "At the end of each block you will have the opportunity to take a brief break.<br>"+ 
                  "Please remember to be as accurate and quick as possible.</p>"
                  "<p>Press any key to continue the experiment when you are ready. </p>"

const switch_msg = "<p>You just finished the first half of the experiment - good job!<br>" + 
                "Next you will complete another $BLOCK_NUM blocks of $BLOCK_LEN test trials. <br>" + 
                "This time, the objects will be slightly different but the task is the same." + 
                "At the end of each block you will have the opportunity to take a brief break.<br>" + 
                "Please remember to be as accurate and quick as possible.</p>" + 
                "<p>Press any key to continue the experiment when you are ready.</p>"

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