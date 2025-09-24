<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @package Pizza_Ke
 * @since 1.0.0
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    <a class="skip-link screen-reader-text" href="#primary">
        <?php esc_html_e( 'Skip to content', 'pizza-ke' ); ?>
    </a>

    <header id="masthead" class="site-header">
        <div class="container">
            <div class="header-inner">
                
                <!-- Site Logo/Branding -->
                <div class="site-branding">
                    <?php
                    $custom_logo_id = get_theme_mod( 'custom_logo' );
                    $logo = wp_get_attachment_image_src( $custom_logo_id , 'full' );
                    
                    if ( has_custom_logo() ) : ?>
                        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-logo" rel="home">
                            <img src="<?php echo esc_url( $logo[0] ); ?>" alt="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>">
                            <span><?php bloginfo( 'name' ); ?></span>
                        </a>
                    <?php else : ?>
                        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-logo" rel="home">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            <span><?php bloginfo( 'name' ); ?></span>
                        </a>
                    <?php endif; ?>
                </div>

                <!-- Main Navigation -->
                <nav id="site-navigation" class="main-navigation">
                    <?php
                    wp_nav_menu(
                        array(
                            'theme_location' => 'primary',
                            'menu_id'        => 'primary-menu',
                            'container'      => false,
                            'fallback_cb'    => 'pizza_ke_default_menu',
                        )
                    );
                    ?>
                </nav>

                <!-- User Actions -->
                <div class="user-actions">
                    <?php if ( is_user_logged_in() ) : ?>
                        <a href="<?php echo esc_url( wp_logout_url( home_url() ) ); ?>" class="btn btn-outline">
                            <?php esc_html_e( 'Logout', 'pizza-ke' ); ?>
                        </a>
                        <a href="<?php echo esc_url( admin_url( 'profile.php' ) ); ?>" class="btn btn-primary">
                            <?php esc_html_e( 'Profile', 'pizza-ke' ); ?>
                        </a>
                    <?php else : ?>
                        <a href="<?php echo esc_url( wp_login_url( get_permalink() ) ); ?>" class="btn btn-outline">
                            <?php esc_html_e( 'Sign In', 'pizza-ke' ); ?>
                        </a>
                        <a href="<?php echo esc_url( wp_registration_url() ); ?>" class="btn btn-primary">
                            <?php esc_html_e( 'Sign Up', 'pizza-ke' ); ?>
                        </a>
                    <?php endif; ?>
                </div>

                <!-- Mobile Menu Toggle -->
                <button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false">
                    <span class="screen-reader-text"><?php esc_html_e( 'Menu', 'pizza-ke' ); ?></span>
                    <span class="hamburger"></span>
                </button>

            </div>
        </div>
    </header>

    <div id="content" class="site-content"><?php
/**
 * Default menu fallback
 */
function pizza_ke_default_menu() {
    echo '<ul class="default-menu">';
    echo '<li><a href="' . esc_url( home_url( '/' ) ) . '">' . esc_html__( 'Home', 'pizza-ke' ) . '</a></li>';
    echo '<li><a href="' . esc_url( home_url( '/browse' ) ) . '">' . esc_html__( 'Browse', 'pizza-ke' ) . '</a></li>';
    echo '<li><a href="' . esc_url( home_url( '/vendors' ) ) . '">' . esc_html__( 'Restaurants', 'pizza-ke' ) . '</a></li>';
    echo '<li><a href="' . esc_url( home_url( '/about' ) ) . '">' . esc_html__( 'About', 'pizza-ke' ) . '</a></li>';
    echo '<li><a href="' . esc_url( home_url( '/contact' ) ) . '">' . esc_html__( 'Contact', 'pizza-ke' ) . '</a></li>';
    echo '</ul>';
}
?>