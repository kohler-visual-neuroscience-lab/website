window.s = Object.freeze({
    /* display*/
    stim_num: 4,                 // items on the circle (<= min #categories if you want clean within-cycle balance)
    require_distinct_categories: true,  // if true, enforce stim_num ≤ #categories in both families
    stim_img_size_px: 400,
    circle_radius_px: 200,
    mask_softness: 0.2,

    /* timing */
    study_ms: 1000,
    memory_isi_ms: 2000,
    test_timeout_ms: null,

    /* theme */
    bg_color: "#808080",   // page background
    text_color: "#ffffff",   // default text color
    muted_text_color: "",   // optional; if "", a softer color is auto-derived from bg/text

    /* Where the files live relative to the HTML */
    shapes_base_path: "stimuli/shapes",     // prepended to filenames in stimulus_manifest.shapes[*]
    textures_base_path: "stimuli/textures", // prepended to filenames in stimulus_manifest.textures[*]

    /* keys & prompts */
    key_diff: "j",
    key_same: "s",
    prompt_change_label: "",     // leave blank to use the default

    /* behavior toggles */
    show_block_intro: true,

    /* optional custom intros */
    block_intro_html: `
    <div style="max-width:720px;line-height:1.55;font-family:system-ui;">
      you will see ${6} images arranged around the center. remember them.
      after a brief delay, the images will appear again. sometimes one image changes (shape, texture, or both),
      sometimes nothing changes. press <b>${"j"}</b> for "same" and <b>${"f"}</b> for "different".
      press space to begin this block.
    </div>`,

    /* practice/main trials per condition */
    change_types: ["shape", "texture", "both"], /* x 2 (change / no change)*/
    prac_reps: 2,
    exp_reps: 20,

    /* feedback */
    practice_feedback: true,
    main_feedback: true,
    feedback_button_label: "continue",
    feedback_ms: 1000,

    /* compositing */
    mask_threshold: 0.2,        // luminance threshold for shape→alpha mapping

    /* preload */
    preload_show_progress: true,
    preload_message: "loading images…",
    preload_continue_after_error: false,

    /* browser check & fullscreen */
    use_browser_check: false,
    require_desktop: false,
    min_width_px: 900,
    min_height_px: 600,
    use_fullscreen: false,

    /* saving */
    use_datapipe: false,
    datapipe_experiment_id: "",
    save_locally: true,          // set false when DataPipe is on
    save_format: "csv",          // "csv" or "json"
    filename_base: "change_detect",
    add_timestamp: true,
    fallback_to_local_on_pipe_error: true,  // behavior if datapipe fails

    /* instructions (templates) */
    practice_intro_tpl: `
    You will see {{stim_num}} images arranged around the center. Remember them. <br>
    After {{memory_isi_ms}} ms, the images reappear. <br>
    Sometimes one of them images have changed (in shape, texture, or both), <br>
    sometimes none of them have changed. <br>
    Press <b>{{key_diff}}</b> if the images have changed, and <b>{{key_same}}</b> if there is no change. <br>
    This practice block has {{practice_trials}} trials. Press space to begin.
    `,
    main_intro_tpl: `
    The main experiment will now begin ({{main_trials}} trials).<br>
    Again you will see {{stim_num}} images arranged around the center. Remember them. <br>
    After {{memory_isi_ms}} ms, the images reappear. <br>
    Sometimes one of them images have changed (in shape, texture, or both), <br>
    sometimes none of them have changed. <br>
    Same rules: Sometimes one of them images have changed (in shape, texture, or both), sometimes none of them have changed. <br>
    Please stay focused and respond as accurately as you can.
    Press space to start.
    `,

    // trial counter card (shown briefly before each trial)
    show_trial_counter: true,
    trial_counter_ms: 450, // duration of the counter card before each trial

    // counter labels (lowercase, as you prefer)
    practice_counter_tpl: `practice trial {{i}} of {{N}}`,
    main_counter_tpl: `experiment trial {{i}} of {{N}}`,
});


