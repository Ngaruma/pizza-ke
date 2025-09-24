<?php
/**
 * The template for displaying archive pages
 *
 * @package Pizza_Ke
 * @since 1.0.0
 */

get_header(); ?>

<main id="primary" class="site-main">
    <div class="container">
        
        <?php if ( have_posts() ) : ?>
            
            <header class="page-header">
                <?php
                the_archive_title( '<h1 class="page-title">', '</h1>' );
                the_archive_description( '<div class="archive-description">', '</div>' );
                ?>
            </header>

            <div class="posts-grid">
                <?php
                while ( have_posts() ) :
                    the_post();
                    get_template_part( 'template-parts/content', get_post_type() );
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