// triplets_settings.js (all snake_case)
const triplets_settings = {
  /* Look */
  background_color: "#000000ff",
  foreground_color: "#eeeeee",
  use_fullscreen: true,

  /* Where the files live relative to the HTML */
  shapes_base_path: "stimuli/shapes/",     // prepended to filenames in stimulus_manifest.shapes[*]
  textures_base_path: "stimuli/textures/", // prepended to filenames in stimulus_manifest.textures[*]

  /* Layout / size (px) */
  stim_size_px: 500,
  triangle_radius_px: 220,   // distance (px) from arena center to each stimulus center

  /* Timing */
  pre_trial_ms: 600,

  /* Design: counts per block (shape / texture) */
  practice_trials_per_type: 5,  // should be 5, baseline & incongruent → 2 × 5 = 10 practice trials/block
  main_trials_per_type: 60,     // should be 60, baseline & incongruent → 2 × 60 = 120 main trials/block

  /* Feedback */
  practice_feedback: true,
  main_feedback: false,
  feedback_button_label: "Next",

  /* saving and datapipe */
  collect_consent_survey: true, // set to true when collecting real data
  use_local_save: false,          // replaces "save_data"
  use_datapipe: true,           // upload via DataPipe (Pipe plugin)
  file_format: "csv",            // replaces "save_format" / "datapipe_format"
  filename_base: "triplets_data",// replaces "save_filename" / "datapipe_filename_prefix"
  add_timestamp: true,           // replaces "save_add_timestamp"
  datapipe_experiment_id: "SXIm98HnPi9H",

  // ---- Redirect to SONA / URPP ----
  enable_redirect: true,   // turn on/off redirect at the end
  redirect_base_url: "https://yorku.sona-systems.com/webstudy_credit.aspx?experiment_id=5227&credit_token=72810003e37249dd86347ebde36a9372",
  urpp_param_name: "participant",     // where we read the code from the URL
  redirect_append_param: "survey_code",// the param name we append to redirect URL

  /* Browser Check (official plugin) — simple, optional gate */
  use_browser_check: true,                // set to false to skip the check entirely
  browser_check_require_desktop: true,    // true = block phones/tablets
  browser_check_min_width: 900,           // minimum window width in pixels
  browser_check_min_height: 600,          // minimum window height in pixels

  /* Text */
  instr_text_html: `
    <h2>Instructions</h2>
    <p>
      On each trial, you will see three shape–texture combinations arranged in a triangle
      around a central fixation. Pick the odd one out based on the current block's rule.
    </p>
    <p>
      Respond with the arrow keys: Left, Up, or Right.
    </p>
    <p><em>Press SPACE to continue.</em></p>
  `,

  shape_block_intro_html: `
    <h2>Shape Block</h2>
    <p>Pick the item whose <em>shape category</em> differs from the other two.</p>
    <p><em>Press SPACE to continue.</em></p>
  `,
  texture_block_intro_html: `
    <h2>Texture Block</h2>
    <p>Pick the item whose <em>texture category</em> differs from the other two.</p>
    <p><em>Press SPACE to continue.</em></p>
  `,
  practice_intro_html: `
    <h3>Practice</h3>
    <p>Practice: <strong>{{n_trials}}</strong> trial(s) for this block (baseline and incongruent).</p>
    <p><em>Press SPACE to start practice.</em></p>
  `,
  main_intro_html: `
    <h3>Main</h3>
    <p>Main: <strong>{{n_trials}}</strong> trial(s) for this block (baseline and incongruent).</p>
    <p><em>Press SPACE to begin.</em></p>
  `,
};

const survey_html =
  "<div style='text-align: left; vertical-align: top; display: inline-block; float: left; width: 100%'>" +
  "<p><u>Participant ID:</u> <input style='font-size: 18px; line-height: 1.6em;' input type='text' id='start' name='p_id'></p>" +
  "<p><u>Age:</u> <input style='font-size: 18px; line-height: 1.6em;' input type='text' id='start' name='age'></p>" +
  "<p><u>Handedness:</u> </strong><input type='radio' id='left' name='handedness' value='left'>" +
  "<label for='left'>Left-handed</label>" +
  "<input type='radio' id='right' name='handedness' value='right' checked>" +
  "<label for='right'>Right-handed</label>" +
  "<input type='radio' id='ambi' name='handedness' value='ambi'>" +
  "<label for='ambi'>Ambidextrous</label></p>" +
  "<p><u>Sex:</u> <input type='radio' id='female' name='sex' value='female' checked>" +
  "<label for='female'>Female</label>" +
  "<input type='radio' id='male' name='sex' value='male'>" +
  "<label for='male'>Male</label>" +
  "<input type='radio' name='sex' value='other'><label for='other'>Other, please specify: </label>" +
  "<input type='text' name='other_sex' id='other_sex' value=''></p>" +
  "</div>"