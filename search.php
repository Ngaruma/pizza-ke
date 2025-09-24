<?php
/**
 * The template for displaying search results pages
 *
 * @package Pizza_Ke
 * @since 1.0.0
 */

get_header(); ?>

<main id="primary" class="site-main">
    <div class="container">
        
        <?php if ( have_posts() ) : ?>
            
            <header class="page-header">
                <h1 class="page-title">
                    <?php
                    printf( 
                        /* translators: %s: search query */
                        esc_html__( 'Search Results for: %s', 'pizza-ke' ), 
                        '<span>' . get_search_query() . '</span>' 
                    );
                    ?>
                </h1>
            </header>

            <div class="posts-grid">
                <?php
                while ( have_posts() ) :
                    the_post();
                    get_template_part( 'template-parts/content', 'search' );
                endwhile;
                ?>
            </div>

            <?php
            the_posts_navigation( array(
                'prev_text' => __( 'Older posts', 'pizza-ke' ),
                'next_text' => __( 'Newer posts', 'pizza-ke' ),
            ) );

        else :

            get_template_part( 'template-parts/content', 'none' );

        endif;
        ?>

    </div>
</main>

<?php
get_sidebar();
get_footer();
?>