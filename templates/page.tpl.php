<?php
/**
 * @file
 * Default theme implementation to display a single Drupal page.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/garland.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to main-menu administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - $page['content']: The main content of the current page.
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['sidebar']: Items for the sidebar.
 * - $page['footer']: Items for the footer region.
 *
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see template_process()
 */
?>
<header>
<div id="header" class="fwidth">
  <div id="header_block" class="center_block">
  
    <div id="header_top_block" class="header_item">
      <?php if ($logo): ?>
      <div id="logo">
        <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>">
          <img src="<?php print $logo; ?>"/>
        </a>
      </div>
      <?php endif; ?>
  
      <?php if ($site_name): ?>
      <div id="site_name">
        <h1 class="site_name">
          <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>"><?php print $site_name; ?></a>
        </h1>
      </div>
      <?php endif; ?>
  
      <?php if ($site_slogan): ?>
      <div id="site_slogan">
        <h2 class="site_slogan">
          <?php print $site_slogan; ?>
        </h2>
      </div>
      <?php endif; ?>
    </div>
    
    <?php if ($main_menu == TRUE): ?>
    <nav id="main-menu" class="header_item">
      <div id="mobile_menu"><i class="fa fa-bars"></i></div>
      <div class="menu-navigation-container">
        <?php 
          $main_menu_tree = menu_tree('main-menu');
          print render($main_menu_tree);
        ?>
      </div>
    </nav>
    <?php endif;?>
    
  </div>
</div>
</header>

<main>
  <div id="main" role="main" class="fwidth">
    <div id="main_block" class="center_block contextual-links-region">
    
      <?php print $messages; ?>

      <?php if($is_front): ?>
      <div id="front_block" class="front_block">
      
      </div>
      <?php endif; ?>
    
      <?php print render($title_prefix); ?>
      <?php if($title): ?>
        <h1 class="page-title"><?php print $title; ?></h1>
      <?php endif; ?>
      <?php print render($title_suffix); ?>
    
      <?php if ($tabs): ?>
      <div class="tabs">
        <?php print render($tabs); ?>
      </div>
      <?php endif; ?>
    
      <?php if ($action_links): ?>
      <ul class="action-links">
        <?php print render($action_links); ?>
      </ul>
      <?php endif; ?>
    
      <?php if(!$is_front): ?>
        <?php print render($page['content']); ?>
      <?php endif; ?>
    
    </div>
  </div>
</main>

<?php if ($page['sidebar_first']): ?>
<aside id="sidebar_first" role="complementary" class="">
  <div id="sidebar_first_block" class="">
    <?php print render($page['sidebar_first']); ?>
  </div>
</aside>
<?php endif; ?>

<?php if ($page['sidebar_second']): ?>
<aside id="sidebar_second" role="complementary" class="">
  <div id="sidebar_second_block" class="">
    <?php print render($page['sidebar_second']); ?>
  </div>
</aside>
<?php endif; ?>

<footer>
<div id="footer" class="fwidth">
  <div id="footer_block" class="center_block">
    <div id="copyright" class="icon_rotate">
      <i class="fa fa-copyright"></i><?php print t('All rights reserved'); ?> <?php echo date("Y"); ?>, <a href="<?php print $front_page; ?>"><?php print $site_name; ?></a>.
    </div>
  </div>
</div>
  
<div id="credits" class="icon_rotate">
  <i class="fa fa-cogs"></i><?php print t('Site development'); ?>: <a href="//awd.com.ua" title="<?php print t('Developer site'); ?>" target="_blank">AWD Studio</a>
</div>
</footer>
