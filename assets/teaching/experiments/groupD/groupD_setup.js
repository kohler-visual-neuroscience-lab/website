repeat_trials = 1;
pract_repeat_trials = 1;                       // how many times to repeat each trial type
trial_set_n = [0,1,2,3,4,5,6,7,8];            // note add 9 back in for full set
pract_set_n = [0,1];

const save_name = 'groupD_data_idxxxx.csv'

const same_exemplar = false; // whether to use the same exemplar for target present and target absent trials

const set_sizes = [3, 5, 7, 9]

const block_number = 5;                          // how many blocks to include in the experiment 
                                                  // message to display before each trial.
                                                  // note: '\n\n' is needed at the end of each line 
                                                  // because prompt is displayed using the psychophysics plugin

const block_len = Math.floor(2*trial_set_n.length*repeat_trials*set_sizes.length/block_number) // multiply by 2 because both target absent and target present trials

let happy_faces = []
let angry_faces = []
let neutral_faces = []
const image_path = 'assets/images/faces_upright/' // set to '' if images in the same folder
for (let i = 1; i <= 10; i++) {
        i = i.toString();
        while (i.length < 2) i = "0" + i;
        angry_faces.push(image_path + 'id' + i + '_angry.jpg')
        happy_faces.push(image_path + 'id' + i + '_happy.jpg')
        neutral_faces.push(image_path + 'id' + i + '_neutral.jpg')
      }

const fixation_img = 'assets/images/fixation.png'

const the_present_key = 'j'
const the_absent_key = 's'

const resize_factor = 50 // 50 pixels to 1 dva --- works better on smaller screens***
const item_size = [150, 150] // 150 pixels = 4 degrees of visual angle
const fix_size = [50, 50] // 50 pixels = 1 degree of visual angle
const circle_dia = 600 

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