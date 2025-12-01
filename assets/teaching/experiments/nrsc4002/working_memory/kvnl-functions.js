// make a list of integers
function integer_list(low_end, high_end, inclusive) {
  let list = [];
  if (inclusive) {
    // add one to that high_end is included in the output
    high_end = high_end + 1
  }
  for (let i = low_end; i < high_end; i++) {
    list.push(i);
  }
  return list;
}

// shuffle any input array
function shuffle(array) {
    // define three variables
    let cur_idx = array.length, tmp_val, rand_idx;

    // While there remain elements to shuffle...
    while (0 !== cur_idx) {
        // Pick a remaining element...
        rand_idx = Math.floor(Math.random() * cur_idx);
        cur_idx -= 1;

        // And swap it with the current element.
        tmp_val = array[cur_idx];
        array[cur_idx] = array[rand_idx];
        array[rand_idx] = tmp_val;
    }
    return array;
}

function choose_combos(n, k) {
  // combo_array = choose_combos(n, k)
  // returns an array of arrays of every possible n choose k
  // grabbed from Blindman67's modified version here: 
  // https://codereview.stackexchange.com/questions/200700/n-choose-k-combination-in-javascript
  const result= [];
  const combos = [];
  const recurse = start => {
  if (combos.length + (n - start + 1) < k) { return }
    recurse(start + 1);
    combos.push(start);
    if(combos.length === k) {     
      result.push(combos.slice());
    } else if ( combos.length + ( n - start + 2 ) >= k ) {
      recurse(start + 1);
    }
    combos.pop();     
  }
  recurse(1, combos);
  return result;
}

function balanced_samples(n_samples, set_size, sub_size) {
  // 
  // sample_array = balanced_samples(n_samples, set_size, sub_size)
  // 
  // allows you to specify the number of samples (x), the set size (n) and subset size (k)
  // and returns an array of arrays of samples, 
  // where items from n are approximately equal across samples. 
  // balanced_samples should work will any combination of n, k and x, 
  // and works even when x is bigger than the set of possible combinations. 
  // The function is not superfast, so you should define your arrays 
  // before starting the experiment (which you always would anyway). 
  // Counterbalancing across items is not perfect, but it seems good enough for our purposes. 
  
  // get the full set (no need to shuffle here)
  let full_set = choose_combos(set_size, sub_size)
  let new_set = []
  
  // if more samples are requested than there are possible combinations 
  const n_reps = Math.floor(n_samples / full_set.length)

  for (let i = 0; i < n_reps; i += 1) {
    // simply add the full set
    // we will shuffle everything at the end
    new_set = new_set.concat(full_set)
  }

  // note that this function will run to add any remaining trials
  // because every element in full set was added an equal number of times
  // the elements in num_counter will be the same

  // define num_counter so it has scope outside of loops
  let num_counter = Array(set_size).fill(0)
  // the while loops below will not always run, so computer num_counter up front
  for (const elem of new_set) {
    for (let i = 0; i < set_size; i += 1) {
      num_counter[i] = num_counter[i]+elem.filter(el => el === i+1 ).length
    }
  }

  // now assign randomly chosen samples
  while (new_set.length < n_samples ) {
    let unassigned = true
    while (unassigned) {
      // choose a set
      let rand_idx = Math.floor(Math.random() * full_set.length); 
      new_set.push(full_set[rand_idx])

      // how many times does each number appear?  
      num_counter = Array(set_size).fill(0) // redefine num_counter every time
      for (const elem of new_set) {
        for (let i = 0; i < set_size; i += 1) {
          num_counter[i] = num_counter[i]+elem.filter(el => el === i+1 ).length
        }
      }
      // what is the range of numbers in num_counter?
      let c_diff = Math.max.apply(null, num_counter)-Math.min.apply(null, num_counter)
      if ( c_diff <= 2 ) {
        // remove the selected set from the full set  
        full_set.splice(rand_idx, 1);
        // and break further execution of the inner while lopp
        unassigned = false
      } else {
        // remove latest element from the array
        new_set.pop();
      }
    }
  }
  console.log(num_counter)
  // shuffle the whole thing at the end
  return shuffle(new_set)
}

function completion_code(prefix, suffix) {
    let code = "";
    for (const i of Array(8).keys()) {
        let this_num = Math.floor(Math.random() * 10);
        let this_char = this_num.toString();
        code = code + this_char;
    }
    code = `${code}-${prefix}-`;

    for (const i of Array(12).keys()) {
        let this_num = Math.floor(Math.random() * 10);
        let this_char = this_num.toString();
        code = code + this_char;
    }
    code = `${code}-${suffix}`;
    return code;
}

function get_id() {
  const turk_info = jsPsych.turk.turkInfo();
  const prolific_id = jsPsych.data.urlVariables()['PROLIFIC_PID'];
  const urpp_id = jsPsych.data.urlVariables()['participant'];
  let out_obj = {}
  // const set_c = completion_code("KVNL", "QRUL")
  // you can change these two four-letter codes, KVNL stands for Kohler Visual Neuroscience Lab, QRUL are just random letters
  // not set_c is not used with URPP
  if ( turk_info.hitId.length > 0 ) {
    out_obj = {
      workerId: turk_info.workerId,
      assignmentId: turk_info.assignmentId,
      hitId: turk_info.hitId,
      recruited_from: 'mturk'
    }
  } else if ( prolific_id ) {
    // assume PROLIFIC
    out_obj = { 
      p_id: prolific_id,
      study_id: jsPsych.data.urlVariables()['STUDY_ID'],
      session_id: jsPsych.data.urlVariables()['SESSION_ID'],
      recruited_from: 'prolific'
    }
  } else if ( urpp_id ) {
    // assume URPP
    out_obj = { 
      p_id: participant_id,
      recruited_from: 'URPP'
    }
  } else {
    out_obj = { 
      p_id: null,
      recruited_from: 'unknown'
    }
  }
  return out_obj
}

// add text describing what these two letter keys correspond to, and how the variables work

function trial_performance(data, present_key=68, absent_key=76, absent_val=0) {
    if ( data.target == absent_val ) {
        if ( data.key_press == absent_key ) {
            data.correct = true;
            data.class = "correct reject"
        } else if ( data.key_press == present_key ) {
            data.class = "false alarm"
        } else {
            data.correct = false;
        }
    } else {
        if ( data.key_press == present_key ) {
            data.correct = true; 
            data.class = "hit" 
        } else if ( data.key_press == absent_key ) {
            data.class = "miss"
        } else {
            data.correct = false;
        }
    }
  return data
}

function trial_summary(trials) {
  const correct_trials = trials.filter({correct: true})
  const ht = trials.filter({class: "hit"})
  const fa = trials.filter({class: "false alarm"})
  const cr = trials.filter({class: "correct reject"})
  const mi = trials.filter({class: "miss"})
  const hit_prob = ht.count()/(ht.count()+mi.count())
  const fa_prob = fa.count()/(fa.count()+cr.count())
  const d_prime = hit_prob - fa_prob
  const accuracy = (correct_trials.count() / trials.count() * 100);
  const rt = (correct_trials.select('rt').mean());
  return {rt:rt, accuracy:accuracy, d_prime:d_prime}
}

// END DISPLAY AND AUTOMATIC CREDIT GRANTING FUNCTION // 
/*
The following function is meant to be used at the end of the experiment like so

on_finish: function(){
  end_display(debrief(), 
  "https://yorku.sona-systems.com/webstudy_credit.aspx?experiment_id=3947&credit_token=b518a1342fd848388cb4ca7d8c4524a8&survey_code=", 8000)
}

redirects participants back to the specified URL to be granted a credit upon completion of an experiment. 
  - debrief: html_code with any non-generic debriefing
  - url: redirect URL code (if not set, no redirect will be done ) 
  - delay: delay in ??? before redirection   
You may use this function to redirect participants back to any site you wish, it is NOT limited to URPP.
This function is to be used in conjuction with the jsPsych plugin package. 
*/

function end_display(debrief='', url=null, delay=5000) {
    var display_element = jsPsych.getDisplayElement();
    var data_soft = jsPsych.data.get().select("recruited_from")["values"][0]
    if ( url ) {
      display_element.innerHTML = "<p>You have completed the experiment.</p>"+
                                  "<p>We appreciate your participation.</p>"+
                                  "<p>Please wait to be redirected.</p>"+debrief;
      if (data_soft == 'URPP') { // the string in the square brackets should be changed accordingly
        let uid = jsPsych.data.urlVariables()['participant'];
        console.log("URPP:" + url + uid);
        setTimeout( function() { window.location.assign(url + uid) }, delay)
        }//timeout amount can be changed
      else if (data_soft == 'prolific') {
        let uid = jsPsych.data.urlVariables()['PROLIFIC_PID'];
        console.log("PROLIFIC:" + url);
        setTimeout( function() { window.location.assign(url) }, delay) 
      }
      else if (data_soft == 'mturk') {
        console.log("M-TURK:" + url);
        setTimeout( function() { window.location.assign(url) }, delay)
      }
    } else {
      display_element.innerHTML = "<p>You have completed the experiment.</p>"+
                                  "<p>We appreciate your participation.</p>"+debrief
    }
}

function get_survey(type) {
  if ( type == "simple") {
    survey_html = "<div style='text-align: left; vertical-align: top; display: inline-block; float: left; width: 100%'>"+
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
  } else {
    survey_html = "<div style='text-align: left; vertical-align: top; display: inline-block; float: left; width: 100%'>"+
      "<p><u>Birth Date:</u> <input style='font-size: 18px; line-height: 1.6em;' type='date' id='start' name='dob' min='1960-01-01' max='2020-01-01'></p>"+
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
      "<p><u>What race(s) do you identify with? (choose all that apply)</u><br>"+
      "<input type='checkbox' name='race' id='indigenous' value='indigenous' /><label for='indigenous'>Aboriginal (Indigenous) Peoples</label><br>"+
      "<input type='checkbox' name='race' id='black' value='black' /><label for='black'>Black or African-American</label><br>"+
      "<input type='checkbox' name='race' id='asian' value='asian' /><label for='asian'>Asian</label><br>"+
      "<input type='checkbox' name='race' id='white' value='white' /><label for='white'>White</label><br>"+
      "<input type='checkbox' name='race' id='hispanic' value='hispanic' /><label for='hispanic'>Hispanic or Latino/a/x</label><br>"+
      "<input type='checkbox' name='race' id='pacific' value='pacific' /><label for='pacific'>Native Hawaiian or other Pacific Islander</label><br>"+
      "<input type='checkbox' name='race' id='other' value='other' /><label for='other'>Multiracial/Other, please specify: </label>"+
      "<input type='text' name='other_race' id='other_race' value=''>​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​</p></div>"
  }
  return survey_html
}

// PASSWORD PROTECT FUNCTION //
/*
The following function can be used to password protect an experiment. 
When used with jsPsych, it can be placed before the experiment and used to redirect the participant to 
the specified experiment file if the login credentials are correct. It is recommended that this function be stored 
in a seperate html file from the experiment. An example of how to use this function with jsPsych is included below.
*/

var password_func = function passWord() {
  var testV = 1;
  var pass1 = prompt('Please Enter Your Password',' ');
  while (testV < 100) {
      if (!pass1)
      history.go(-1);
      if (pass1.toLowerCase() == "triplets") { //password is here. Recommend using encryption software 
          alert('You Got it Right!');
          window.open('trial_3D_p1.html'); //redirects the participant to the experiment file if login correct. Change file accordingly
          break;
      }
      testV+=1;
      var pass1 =
      prompt('Access Denied - Password Incorrect, Please Try Again.','Password');
      }
      if (pass1.toLowerCase()!="password" & testV ==100) //testV value can be changed to lock people out after n number of attempts
      history.go(-1);
      return " ";
}

//EXAMPLE USE CASE (with jsPsych)//
//seperate html file//
/*
  timeline = [];
  var pavlovia_init = {
  type: "pavlovia",
  command: "init"
  };
  timeline.push(pavlovia_init);

  var password_func = function passWord() {
      var testV = 1;
      var pass1 = prompt('Please Enter Your Password',' ');
      while (testV < 100) {
          if (!pass1)
          history.go(-1);
          if (pass1.toLowerCase() == "triplets") {
              alert('You Got it Right!');
              window.open('trial_3D_p1.html');
              break;
          }
          testV+=1;
          var pass1 =
          prompt('Access Denied - Password Incorrect, Please Try Again.','Password');
          }
          if (pass1.toLowerCase()!="password" & testV ==100) //test can be changed to lock people out after n number of attempts
          history.go(-1);
          return " ";
          }
          var password_trial1 = {
              type: 'survey-html-form',
              preamble: 'Welcome to the experiment. Please click on the button below to enter.',
              html: '<div style:"visibility: hidden"</div>'
              }
              timeline.push(password_trial1)
              var password_trial = {
                  type: 'call-function',
                  func: password_func,
                  async: true
                  }
                  timeline.push(password_trial)

  var pavlovia_finish = {
  type: "pavlovia",
  command: "finish"
  };

  timeline.push(pavlovia_finish);
  jsPsych.init({
      timeline: timeline,
      on_finish: jsPsych.data.get()
  })
*/