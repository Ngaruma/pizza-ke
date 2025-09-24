<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package Pizza_Ke
 * @since 1.0.0
 */

get_header(); ?>

<main id="primary" class="site-main">
    <div class="container">
        
        <section class="error-404 not-found">
            <header class="page-header">
                <h1 class="page-title"><?php esc_html_e( 'Oops! That page can&rsquo;t be found.', 'pizza-ke' ); ?></h1>
            </header>

            <div class="page-content">
                <p><?php esc_html_e( 'It looks like nothing was found at this location. Maybe try one of the links below or a search?', 'pizza-ke' ); ?></p>

                <?php get_search_form(); ?>

                <div class="widget-area">
                    <div class="widget">
                        <h2 class="widget-title"><?php esc_html_e( 'Most Used Categories', 'pizza-ke' ); ?></h2>
                        <ul>
                            <?php
                            wp_list_categories( array(
                                'orderby'    => 'count',
                                'order'      => 'DESC',
                                'show_count' => 1,
                                'title_li'   => '',
                                'number'     => 10,
                            ) );
                            ?>
                        </ul>
                    </div>

                    <div class="widget">
                        <h2 class="widget-title"><?php esc_html_e( 'Popular Posts', 'pizza-ke' ); ?></h2>
                        <ul>
                            <?php
                            $popular_posts = get_posts( array(
                                'numberposts' => 5,
                                'orderby' => 'comment_count',
                                'order' => 'DESC'
                            ) );
                            foreach( $popular_posts as $post ) : setup_postdata( $post ); ?>
                                <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
                            <?php endforeach; wp_reset_postdata(); ?>
                        </ul>
                    </div>

                    <div class="widget">
                        <h2 class="widget-title"><?php esc_html_e( 'Quick Links', 'pizza-ke' ); ?></h2>
                        <ul>
                            <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'pizza-ke' ); ?></a></li>
                            <li><a href="<?php echo esc_url( home_url( '/browse' ) ); ?>"><?php esc_html_e( 'Browse Vendors', 'pizza-ke' ); ?></a></li>
                            <li><a href="<?php echo esc_url( home_url( '/vendors' ) ); ?>"><?php esc_html_e( 'All Vendors', 'pizza-ke' ); ?></a></li>
                            <li><a href="<?php echo esc_url( home_url( '/about' ) ); ?>"><?php esc_html_e( 'About Us', 'pizza-ke' ); ?></a></li>
                            <li><a href="<?php echo esc_url( home_url( '/contact' ) ); ?>"><?php esc_html_e( 'Contact', 'pizza-ke' ); ?></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

    </div>
</main>

<?php
get_footer();
?>