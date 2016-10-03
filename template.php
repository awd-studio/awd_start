<?php

/**
 * Implements hook_preprocess_html()
 */
function awd_start_preprocess_html(&$vars) {
  // Add inline css
  $inline_css = __awd_start_inline_css();
  $inline_css_options = array(
    'group'  => CSS_SYSTEM,
    'type'   => 'inline',
    'weight' => -9999,
  );
  drupal_add_css($inline_css, $inline_css_options);
}

/**
 * Return inline-css for theme
 */
function __awd_start_inline_css() {
  $css_data = &drupal_static(__FUNCTION__);
  if (!isset($css_data)) {
    if ($cache = cache_get('awd_start_inline_css')) {
      $css_data = $cache->data;
    }
    else {
      $path = drupal_get_path('theme', 'awd_start');
      $inline_css = $path . '/assets/css/inline.css';
      $css_data = file_get_contents($inline_css);

      cache_set('awd_start_inline_css', $css_data, 'cache');
    }
  }

  return $css_data;
}
