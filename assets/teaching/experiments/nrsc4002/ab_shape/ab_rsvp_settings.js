// ab_rsvp_settings.js
// Central settings for the AB RSVP experiment (UMD version).

const AB_SETTINGS = {
  /* visuals */
  background_color: "#808080",          // default mid-gray
  foreground_color: "#eeeeee",

  // --- which blocks to run ---
  run_shape_block: true,
  run_texture_block: false,

  // 'random' | 'shape_first' | 'texture_first'
  block_order: "random",

  /* timing */
  n_stream: 24,
  frame_time_ms: 32,
  frame_isi_ms: 70,                     // SOA = 102 ms (paper-aligned)
  pre_trial_message_ms: 500,            // duration of the brief counter screen

  /* design */
  // Main experiment
  design_t1_levels: [0, 1],       // 0 = absent, 1 = present
  design_t2_levels: [0, 1],       // 0 = absent, 1 = present
  design_lag_levels: [1,2,3,8],  // allowed lags (1–8)
 
  // Practice block
  prac_t1_levels: [0, 1],         
  prac_t2_levels: [0, 1],
  prac_lag_levels: [8],           

  // Repetitions per cell (kept, now applied to the cartesian product above)
  exp_reps: 1, // 20,
  prac_reps: 1 // 4,

  // feedback
  practice_feedback: true,
  feedback_button_label: "Next",
  main_feedback: true,                 // set true to show feedback after main trials
  main_feedback_button_label: "Next",   // optional; falls back to feedback_button_label

  /* image sizing (px) */
  instr_image_size_px: 300,
  response_image_size_px: 300,
  trial_image_size_px: 600,

  /* targets preview toggles */
  show_targets_in_instructions: true,
  show_targets_on_response: true,

  /* preload / audit */
  preload_show_progress: true,
  preload_message: "Loading images…",
  preload_continue_after_error: false,
  verify_assets_before_start: true,
  asset_audit_timeout_ms: 5000,

  /* ---- browser check and fullscreen ---- */
  use_fullscreen: true,
  use_browser_check: true,        // set false to skip
  require_desktop: true,          // block phones/tablets if true
  min_width_px: 900,              // screen width requirement
  min_height_px: 600,             // screen height requirement
  browser_check_note: "For best timing, please use a recent Chrome/Edge/Firefox on desktop.",
  browser_check_button_label: "Continue",

  /* saving dataPipe */
  collect_consent_survey: true, // set to true when collecting real data
  use_datapipe: true,                 // enable Pipe
  use_local_save: false,               // enable local save
  datapipe_experiment_id: "mXb8yXo8czps", // from pipe.jspsych.org
  datapipe_filename_prefix: "ab_shape",
  datapipe_format: "csv",             // or "json"

  /* text templates (placeholders: n_stream, frame_time_ms, frame_isi_ms, n_blocks, blocks ("shape, texture"), total_practice_trials, total_main_trials, total_trials) */
  global_intro_tpl: `<p>In this experiment, you will see a rapid stream of {{n_stream}} different images.<br>
                  Each image is shown for <strong>{{frame_time_ms}} ms</strong> with <strong>{{frame_isi_ms}} ms</strong> between images.<br>
                  The first target T1 (if present) will appear anywhere between images 9 and 16.<br>
                  The second target T2 (if present) will appear anywhere between 1 and 8 images after T1.<br>
                  After each stream, report whether you saw T1 and T2.<br>
                  There will be {{n_blocks}} block(s): {{blocks}}.<br>
                  Press continue to begin. </p>`,

  block_intro_tpl: `<p>You will now do the <strong>{{family}}</strong> block.<br>
                    There are <strong>{{practice_trials}}</strong> practice trial(s), followed by <strong>{{main_trials}}</strong> main experiment trial(s).<br>
                    Press continue when ready.</p>`,

  practice_intro_tpl: `<p>The practice trials will now begin. There are <strong>{{practice_trials}}</strong> trials.<br>
                      These are the images you will be looking for:</p>`,
  /* removed text: practice uses the 2×2 design (T1 present/absent × T2 present/absent) with the longest T2 delay. */

  main_intro_tpl: `<p>The main experiment will now begin. There are <strong>{{main_trials}}</strong> trials.<br>
                  Please stay focused and respond as accurately as you can.<br>
                  These are the images you will be looking for:</p>`
};