<?php
/**
 * Pizza.ke functions and definitions
 *
 * @package Pizza_Ke
 * @since 1.0.0
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Theme setup
 */
function pizza_ke_setup() {
    // Make theme available for translation
    load_theme_textdomain( 'pizza-ke', get_template_directory() . '/languages' );

    // Add default posts and comments RSS feed links to head
    add_theme_support( 'automatic-feed-links' );

    // Enable support for Post Thumbnails on posts and pages
    add_theme_support( 'post-thumbnails' );

    // Enable support for document title tag
    add_theme_support( 'title-tag' );

    // Enable support for custom logo
    add_theme_support( 'custom-logo', array(
        'height'      => 50,
        'width'       => 200,
        'flex-width'  => true,
        'flex-height' => true,
    ) );

    // Enable support for HTML5 markup
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ) );

    // Enable support for Post Formats
    add_theme_support( 'post-formats', array(
        'aside',
        'image',
        'video',
        'quote',
        'link',
        'gallery',
        'status',
        'audio',
        'chat',
    ) );

    // Add theme support for selective refresh for widgets
    add_theme_support( 'customize-selective-refresh-widgets' );

    // Enable support for editor styles
    add_theme_support( 'editor-styles' );
    add_editor_style( 'style-editor.css' );

    // Enable support for responsive embeds
    add_theme_support( 'responsive-embeds' );

    // Enable support for wide and full alignment
    add_theme_support( 'align-wide' );

    // Register navigation menus
    register_nav_menus( array(
        'primary' => esc_html__( 'Primary Menu', 'pizza-ke' ),
        'footer'  => esc_html__( 'Footer Menu', 'pizza-ke' ),
    ) );
}
add_action( 'after_setup_theme', 'pizza_ke_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet
 */
function pizza_ke_content_width() {
    $GLOBALS['content_width'] = apply_filters( 'pizza_ke_content_width', 1200 );
}
add_action( 'after_setup_theme', 'pizza_ke_content_width', 0 );

/**
 * Enqueue scripts and styles
 */
function pizza_ke_scripts() {
    // Theme stylesheet
    wp_enqueue_style( 'pizza-ke-style', get_stylesheet_uri(), array(), wp_get_theme()->get( 'Version' ) );
    
    // Google Fonts
    wp_enqueue_style( 'pizza-ke-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', array(), null );

    // Theme JavaScript
    wp_enqueue_script( 'pizza-ke-navigation', get_template_directory_uri() . '/js/navigation.js', array(), wp_get_theme()->get( 'Version' ), true );

    // Comment reply script
    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
}
add_action( 'wp_enqueue_scripts', 'pizza_ke_scripts' );

/**
 * Register widget areas
 */
function pizza_ke_widgets_init() {
    register_sidebar( array(
        'name'          => esc_html__( 'Primary Sidebar', 'pizza-ke' ),
        'id'            => 'sidebar-1',
        'description'   => esc_html__( 'Add widgets here to appear in your sidebar.', 'pizza-ke' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ) );

    register_sidebar( array(
        'name'          => esc_html__( 'Footer Area 1', 'pizza-ke' ),
        'id'            => 'footer-1',
        'description'   => esc_html__( 'Add widgets here to appear in the first footer area.', 'pizza-ke' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ) );

    register_sidebar( array(
        'name'          => esc_html__( 'Footer Area 2', 'pizza-ke' ),
        'id'            => 'footer-2',
        'description'   => esc_html__( 'Add widgets here to appear in the second footer area.', 'pizza-ke' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ) );

    register_sidebar( array(
        'name'          => esc_html__( 'Footer Area 3', 'pizza-ke' ),
        'id'            => 'footer-3',
        'description'   => esc_html__( 'Add widgets here to appear in the third footer area.', 'pizza-ke' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ) );
}
add_action( 'widgets_init', 'pizza_ke_widgets_init' );

/**
 * Custom template tags for this theme
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Custom post types and meta boxes
 */
require get_template_directory() . '/inc/custom-post-types.php';

/**
 * AJAX handlers
 */
require get_template_directory() . '/inc/ajax-handlers.php';

/**
 * Security enhancements
 */
require get_template_directory() . '/inc/security.php';

/**
 * Performance optimizations
 */
require get_template_directory() . '/inc/performance.php';

/**
 * Add custom image sizes
 */
function pizza_ke_image_sizes() {
    add_image_size( 'pizza-thumbnail', 300, 200, true );
    add_image_size( 'pizza-featured', 600, 400, true );
    add_image_size( 'vendor-logo', 150, 150, true );
    add_image_size( 'hero-banner', 1200, 600, true );
}
add_action( 'after_setup_theme', 'pizza_ke_image_sizes' );

/**
 * Customize excerpt length
 */
function pizza_ke_excerpt_length( $length ) {
    return is_admin() ? $length : 25;
}
add_filter( 'excerpt_length', 'pizza_ke_excerpt_length', 999 );

/**
 * Customize excerpt more text
 */
function pizza_ke_excerpt_more( $more ) {
    if ( is_admin() ) {
        return $more;
    }
    return '&hellip; <a href="' . get_permalink() . '" class="read-more">' . esc_html__( 'Read More', 'pizza-ke' ) . '</a>';
}
add_filter( 'excerpt_more', 'pizza_ke_excerpt_more' );

/**
 * Add schema.org markup for SEO
 */
function pizza_ke_schema_markup() {
    $schema = array(
        '@context' => 'https://schema.org',
        '@type' => 'Organization',
        'name' => get_bloginfo( 'name' ),
        'url' => home_url(),
        'logo' => wp_get_attachment_image_src( get_theme_mod( 'custom_logo' ), 'full' )[0] ?? '',
        'description' => get_bloginfo( 'description' ),
        'contactPoint' => array(
            '@type' => 'ContactPoint',
            'telephone' => get_theme_mod( 'contact_phone', '+254 700 123 456' ),
            'contactType' => 'customer service'
        ),
        'address' => array(
            '@type' => 'PostalAddress',
            'addressLocality' => 'Nairobi',
            'addressCountry' => 'Kenya'
        )
    );
    
    echo '<script type="application/ld+json">' . wp_json_encode( $schema ) . '</script>';
}
add_action( 'wp_head', 'pizza_ke_schema_markup' );

/**
 * Add Open Graph meta tags
 */
function pizza_ke_og_meta_tags() {
    if ( is_singular() ) {
        global $post;
        
        echo '<meta property="og:title" content="' . esc_attr( get_the_title() ) . '">' . "\n";
        echo '<meta property="og:description" content="' . esc_attr( get_the_excerpt() ) . '">' . "\n";
        echo '<meta property="og:url" content="' . esc_url( get_permalink() ) . '">' . "\n";
        echo '<meta property="og:type" content="article">' . "\n";
        
        if ( has_post_thumbnail() ) {
            $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' );
            echo '<meta property="og:image" content="' . esc_url( $thumbnail[0] ) . '">' . "\n";
        }
    }
}
add_action( 'wp_head', 'pizza_ke_og_meta_tags' );

/**
 * Add Twitter Card meta tags
 */
function pizza_ke_twitter_meta_tags() {
    if ( is_singular() ) {
        echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
        echo '<meta name="twitter:title" content="' . esc_attr( get_the_title() ) . '">' . "\n";
        echo '<meta name="twitter:description" content="' . esc_attr( get_the_excerpt() ) . '">' . "\n";
        
        if ( has_post_thumbnail() ) {
            $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' );
            echo '<meta name="twitter:image" content="' . esc_url( $thumbnail[0] ) . '">' . "\n";
        }
    }
}
add_action( 'wp_head', 'pizza_ke_twitter_meta_tags' );

/**
 * Optimize WordPress for performance
 */
function pizza_ke_optimize_performance() {
    // Remove unnecessary WordPress features
    remove_action( 'wp_head', 'wp_generator' );
    remove_action( 'wp_head', 'wlwmanifest_link' );
    remove_action( 'wp_head', 'rsd_link' );
    remove_action( 'wp_head', 'wp_shortlink_wp_head' );
    
    // Remove emoji scripts
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'admin_print_styles', 'print_emoji_styles' );
}
add_action( 'init', 'pizza_ke_optimize_performance' );

/**
 * Add theme customizer options
 */
function pizza_ke_customize_register( $wp_customize ) {
    // Contact Information Section
    $wp_customize->add_section( 'pizza_ke_contact', array(
        'title' => __( 'Contact Information', 'pizza-ke' ),
        'priority' => 30,
    ) );

    // Phone Number
    $wp_customize->add_setting( 'contact_phone', array(
        'default' => '+254 700 123 456',
        'sanitize_callback' => 'sanitize_text_field',
    ) );

    $wp_customize->add_control( 'contact_phone', array(
        'label' => __( 'Phone Number', 'pizza-ke' ),
        'section' => 'pizza_ke_contact',
        'type' => 'text',
    ) );

    // Email Address
    $wp_customize->add_setting( 'contact_email', array(
        'default' => 'hello@pizza.ke',
        'sanitize_callback' => 'sanitize_email',
    ) );

    $wp_customize->add_control( 'contact_email', array(
        'label' => __( 'Email Address', 'pizza-ke' ),
        'section' => 'pizza_ke_contact',
        'type' => 'email',
    ) );

    // Address
    $wp_customize->add_setting( 'contact_address', array(
        'default' => 'Nairobi, Kenya',
        'sanitize_callback' => 'sanitize_text_field',
    ) );

    $wp_customize->add_control( 'contact_address', array(
        'label' => __( 'Address', 'pizza-ke' ),
        'section' => 'pizza_ke_contact',
        'type' => 'text',
    ) );

    // Social Media Section
    $wp_customize->add_section( 'pizza_ke_social', array(
        'title' => __( 'Social Media', 'pizza-ke' ),
        'priority' => 31,
    ) );

    // Facebook URL
    $wp_customize->add_setting( 'facebook_url', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
    ) );

    $wp_customize->add_control( 'facebook_url', array(
        'label' => __( 'Facebook URL', 'pizza-ke' ),
        'section' => 'pizza_ke_social',
        'type' => 'url',
    ) );

    // Twitter URL
    $wp_customize->add_setting( 'twitter_url', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
    ) );

    $wp_customize->add_control( 'twitter_url', array(
        'label' => __( 'Twitter URL', 'pizza-ke' ),
        'section' => 'pizza_ke_social',
        'type' => 'url',
    ) );

    // Instagram URL
    $wp_customize->add_setting( 'instagram_url', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
    ) );

    $wp_customize->add_control( 'instagram_url', array(
        'label' => __( 'Instagram URL', 'pizza-ke' ),
        'section' => 'pizza_ke_social',
        'type' => 'url',
    ) );
}
add_action( 'customize_register', 'pizza_ke_customize_register' );

/**
 * Load Jetpack compatibility file
 */
if ( defined( 'JETPACK__VERSION' ) ) {
    require get_template_directory() . '/inc/jetpack.php';
}