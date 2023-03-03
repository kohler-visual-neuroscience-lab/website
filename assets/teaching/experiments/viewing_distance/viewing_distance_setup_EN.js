// note that words that begin with $ will be replaced with variable values when the code is run
const welcome = {
      type: "html-keyboard-response",
      stimulus: "<strong>Welcome to the Viewing Distance Experiment.</strong><br>" +
                "<p>Find a comfortable seating position and distance to your monitor </p>" +
                "<p>Try to maintain that position and distance throughout the experiment.</p>" +
                "<p>Before starting, find a <strong>measuring tape</strong> and a standard-sized <strong>ID or payment card</strong>.</p>" +
                "<p>Press any key to continue.</p>"
    }

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