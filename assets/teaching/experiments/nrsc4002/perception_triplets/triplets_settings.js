// triplets_settings.js (all snake_case)
const triplets_settings = {
  /* Look */
  background_color: "#808080",
  foreground_color: "#eeeeee",
  use_fullscreen: false,

  /* Where the files live relative to the HTML */
  shapes_base_path: "stimuli/shapes/",     // prepended to filenames in stimulus_manifest.shapes[*]
  textures_base_path: "stimuli/textures/", // prepended to filenames in stimulus_manifest.textures[*]

  /* Layout / size (px) */
  stim_size_px: 500,
  triangle_radius_px: 220,   // distance (px) from arena center to each stimulus center

  /* Timing */
  pre_trial_ms: 600,

  /* Design: counts per block (shape / texture) */
  practice_trials_per_type: 10,  // baseline & incongruent → 2 × 10 = 20 practice trials/block
  main_trials_per_type: 60,     // baseline & incongruent → 2 × 60 = 120 main trials/block

  /* Feedback */
  practice_feedback: true,
  main_feedback: false,
  feedback_button_label: "Next",

  /* saving and datapipe */
  collect_consent_survey: true, // set to true when collecting real data
  use_local_save: true,          // replaces "save_data"
  use_datapipe: false,           // upload via DataPipe (Pipe plugin)
  file_format: "csv",            // replaces "save_format" / "datapipe_format"
  filename_base: "triplets_data",// replaces "save_filename" / "datapipe_filename_prefix"
  add_timestamp: true,           // replaces "save_add_timestamp"
  datapipe_experiment_id: "SXIm98HnPi9H",

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