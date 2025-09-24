<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @package Pizza_Ke
 * @since 1.0.0
 */

?>

    </div><!-- #content -->

    <footer id="colophon" class="site-footer">
        <div class="container">
            <div class="footer-content">
                
                <!-- Brand Section -->
                <div class="footer-section">
                    <div class="footer-brand">
                        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="footer-logo">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            <span><?php bloginfo( 'name' ); ?></span>
                        </a>
                        <p><?php 
                            $description = get_bloginfo( 'description' );
                            echo $description ? esc_html( $description ) : esc_html__( "Kenya's premier pizza directory connecting you with the best local vendors.", 'pizza-ke' );
                        ?></p>
                        
                        <!-- Social Media Links -->
                        <div class="social-links">
                            <?php
                            $facebook_url = get_theme_mod( 'facebook_url', '#' );
                            $twitter_url = get_theme_mod( 'twitter_url', '#' );
                            $instagram_url = get_theme_mod( 'instagram_url', '#' );
                            ?>
                            <?php if ( $facebook_url ) : ?>
                                <a href="<?php echo esc_url( $facebook_url ); ?>" target="_blank" rel="noopener noreferrer">
                                    <span class="screen-reader-text"><?php esc_html_e( 'Facebook', 'pizza-ke' ); ?></span>
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                            <?php endif; ?>
                            
                            <?php if ( $twitter_url ) : ?>
                                <a href="<?php echo esc_url( $twitter_url ); ?>" target="_blank" rel="noopener noreferrer">
                                    <span class="screen-reader-text"><?php esc_html_e( 'Twitter', 'pizza-ke' ); ?></span>
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                </a>
                            <?php endif; ?>
                            
                            <?php if ( $instagram_url ) : ?>
                                <a href="<?php echo esc_url( $instagram_url ); ?>" target="_blank" rel="noopener noreferrer">
                                    <span class="screen-reader-text"><?php esc_html_e( 'Instagram', 'pizza-ke' ); ?></span>
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348 0-1.297 1.051-2.348 2.348-2.348 1.297 0 2.348 1.051 2.348 2.348 0 1.297-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348 0-1.297 1.051-2.348 2.348-2.348 1.297 0 2.348 1.051 2.348 2.348 0 1.297-1.051 2.348-2.348 2.348z"/>
                                    </svg>
                                </a>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>

                <!-- Quick Links -->
                <div class="footer-section">
                    <h3><?php esc_html_e( 'Quick Links', 'pizza-ke' ); ?></h3>
                    <?php
                    wp_nav_menu(
                        array(
                            'theme_location' => 'footer',
                            'menu_id'        => 'footer-menu',
                            'container'      => false,
                            'fallback_cb'    => 'pizza_ke_footer_menu_fallback',
                        )
                    );
                    ?>
                </div>

                <!-- For Vendors -->
                <div class="footer-section">
                    <h3><?php esc_html_e( 'For Vendors', 'pizza-ke' ); ?></h3>
                    <ul>
                        <li><a href="<?php echo esc_url( home_url( '/vendor-register' ) ); ?>"><?php esc_html_e( 'List Your Business', 'pizza-ke' ); ?></a></li>
                        <li><a href="<?php echo esc_url( admin_url() ); ?>"><?php esc_html_e( 'Vendor Dashboard', 'pizza-ke' ); ?></a></li>
                        <li><a href="<?php echo esc_url( home_url( '/vendor-help' ) ); ?>"><?php esc_html_e( 'Vendor Support', 'pizza-ke' ); ?></a></li>
                        <li><a href="<?php echo esc_url( home_url( '/terms' ) ); ?>"><?php esc_html_e( 'Terms & Conditions', 'pizza-ke' ); ?></a></li>
                    </ul>
                </div>

                <!-- Contact Info -->
                <div class="footer-section">
                    <h3><?php esc_html_e( 'Get in Touch', 'pizza-ke' ); ?></h3>
                    <ul class="contact-info">
                        <li>
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                            </svg>
                            <span><?php echo esc_html( get_theme_mod( 'contact_phone', '+254 700 123 456' ) ); ?></span>
                        </li>
                        <li>
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                            <span><?php echo esc_html( get_theme_mod( 'contact_email', 'hello@pizza.ke' ) ); ?></span>
                        </li>
                        <li>
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            <span><?php echo esc_html( get_theme_mod( 'contact_address', 'Nairobi, Kenya' ) ); ?></span>
                        </li>
                    </ul>
                </div>

            </div>

            <div class="footer-bottom">
                <div class="copyright">
                    <p>
                        <?php
                        printf(
                            /* translators: 1: copyright year, 2: site name */
                            esc_html__( '© %1$s %2$s. All rights reserved.', 'pizza-ke' ),
                            date( 'Y' ),
                            get_bloginfo( 'name' )
                        );
                        ?>
                    </p>
                </div>
                
                <div class="footer-links">
                    <a href="<?php echo esc_url( home_url( '/privacy-policy' ) ); ?>"><?php esc_html_e( 'Privacy Policy', 'pizza-ke' ); ?></a>
                    <a href="<?php echo esc_url( home_url( '/terms-of-service' ) ); ?>"><?php esc_html_e( 'Terms of Service', 'pizza-ke' ); ?></a>
                    <a href="<?php echo esc_url( home_url( '/cookie-policy' ) ); ?>"><?php esc_html_e( 'Cookie Policy', 'pizza-ke' ); ?></a>
                </div>
            </div>
        </div>
    </footer>

</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>

<?php
/**
 * Footer menu fallback
 */
function pizza_ke_footer_menu_fallback() {
    echo '<ul>';
    echo '<li><a href="' . esc_url( home_url( '/browse' ) ) . '">' . esc_html__( 'Browse Vendors', 'pizza-ke' ) . '</a></li>';
    echo '<li><a href="' . esc_url( home_url( '/vendors' ) ) . '">' . esc_html__( 'All Vendors', 'pizza-ke' ) . '</a></li>';
    echo '<li><a href="' . esc_url( home_url( '/blog' ) ) . '">' . esc_html__( 'Blog', 'pizza-ke' ) . '</a></li>';
    echo '<li><a href="' . esc_url( home_url( '/about' ) ) . '">' . esc_html__( 'About Us', 'pizza-ke' ) . '</a></li>';
    echo '<li><a href="' . esc_url( home_url( '/contact' ) ) . '">' . esc_html__( 'Contact', 'pizza-ke' ) . '</a></li>';
    echo '</ul>';
}
?>