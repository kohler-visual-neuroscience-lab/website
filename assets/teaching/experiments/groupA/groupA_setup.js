const neg_scenes = [
  'assets/images/neg_scenes/cemetery01.jpg',
  'assets/images/neg_scenes/desert02.jpg',
  'assets/images/neg_scenes/destruction03.jpg',
  'assets/images/neg_scenes/destruction04.jpg',
  'assets/images/neg_scenes/destruction05.jpg',
  'assets/images/neg_scenes/destruction06.jpg',
  'assets/images/neg_scenes/destruction07.jpg',
  'assets/images/neg_scenes/destruction08.jpg',
  'assets/images/neg_scenes/explotion09.jpg',
  'assets/images/neg_scenes/fire10.jpg',
  'assets/images/neg_scenes/fire11.jpg',
  'assets/images/neg_scenes/fire12.jpg',
  'assets/images/neg_scenes/fire13.jpg',
  'assets/images/neg_scenes/fire14.jpg',
  'assets/images/neg_scenes/flood15.jpg',
  'assets/images/neg_scenes/garbage16.jpg',
  'assets/images/neg_scenes/graveyard17.jpg',
  'assets/images/neg_scenes/jail18.jpg',
  'assets/images/neg_scenes/planecrash19.jpg',
  'assets/images/neg_scenes/pollution20.jpg',
  'assets/images/neg_scenes/railroad21.jpg',
  'assets/images/neg_scenes/street22.jpg',
  'assets/images/neg_scenes/street23.jpg',
  'assets/images/neg_scenes/street24.jpg',
  'assets/images/neg_scenes/thunderstorm25.jpg',
  'assets/images/neg_scenes/thunderstorm26.jpg',
  'assets/images/neg_scenes/tornado27.jpg',
  'assets/images/neg_scenes/tornado28.jpg',
  'assets/images/neg_scenes/tornado29.jpg',
  'assets/images/neg_scenes/war30.jpg' 
]
const pos_scenes = [
  'assets/images/pos_scenes/beach01.jpg',
  'assets/images/pos_scenes/beach02.jpg',
  'assets/images/pos_scenes/firework03.jpg',
  'assets/images/pos_scenes/sunflower28.jpg',
  'assets/images/pos_scenes/rainbow24.jpg',
  'assets/images/pos_scenes/rainbow25.jpg',
  'assets/images/pos_scenes/grass05.jpg',
  'assets/images/pos_scenes/lake19.jpg',
  'assets/images/pos_scenes/lake18.jpg',
  'assets/images/pos_scenes/sailing26.jpg',
  'assets/images/pos_scenes/lake13.jpg',
  'assets/images/pos_scenes/lake12.jpg',
  'assets/images/pos_scenes/lake20.jpg',
  'assets/images/pos_scenes/lake21.jpg',
  'assets/images/pos_scenes/volcano30.jpg',
  'assets/images/pos_scenes/lake14.jpg',
  'assets/images/pos_scenes/lake15.jpg',
  'assets/images/pos_scenes/lake09.jpg',
  'assets/images/pos_scenes/lake08.jpg',
  'assets/images/pos_scenes/firework04.jpg',
  'assets/images/pos_scenes/penguin23.jpg',
  'assets/images/pos_scenes/lake10.jpg',
  'assets/images/pos_scenes/lake11.jpg',
  'assets/images/pos_scenes/sunset29.jpg',
  'assets/images/pos_scenes/lake07.jpg',
  'assets/images/pos_scenes/sunflower27.jpg',
  'assets/images/pos_scenes/happypose06.jpg',
  'assets/images/pos_scenes/lake17.jpg',
  'assets/images/pos_scenes/lake16.jpg',
  'assets/images/pos_scenes/lake22.jpg'
]

let neg_faces = [ ]
let pos_faces = [ ]
for (let i = 1; i <= 10; i++) {
  i = i.toString();
  while (i.length < 2) i = "0" + i;
  neg_faces.push('assets/images/faces_smaller/id' + i + '_angry.jpg')
  pos_faces.push('assets/images/faces_smaller/id' + i + '_happy.jpg')
}

const save_name = 'groupA_data_idxxxx.csv'

exp_trial_num = 160;
prac_trial_num = 10;                       // how many times to repeat each trial type

const block_number = 8;                          // how many blocks to include in the experiment 
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