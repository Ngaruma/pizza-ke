<?php
/**
 * The template for displaying all single posts
 *
 * @package Pizza_Ke
 * @since 1.0.0
 */

get_header(); ?>

<main id="primary" class="site-main">
    <div class="container">
        
        <?php while ( have_posts() ) : the_post(); ?>
            
            <article id="post-<?php the_ID(); ?>" <?php post_class( 'single-post' ); ?>>
                
                <header class="entry-header">
                    <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
                    
                    <div class="entry-meta">
                        <span class="posted-on">
                            <time class="entry-date published" datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>">
                                <?php echo esc_html( get_the_date() ); ?>
                            </time>
                        </span>
                        <span class="byline">
                            <?php
                            printf(
                                /* translators: %s: post author */
                                esc_html__( 'by %s', 'pizza-ke' ),
                                '<span class="author vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a></span>'
                            );
                            ?>
                        </span>
                    </div>
                </header>

                <?php if ( has_post_thumbnail() ) : ?>
                    <div class="post-thumbnail">
                        <?php the_post_thumbnail( 'large' ); ?>
                    </div>
                <?php endif; ?>

                <div class="entry-content">
                    <?php
                    the_content();

                    wp_link_pages( array(
                        'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'pizza-ke' ),
                        'after'  => '</div>',
                    ) );
                    ?>
                </div>

                <footer class="entry-footer">
                    <?php
                    $categories_list = get_the_category_list( esc_html__( ', ', 'pizza-ke' ) );
                    if ( $categories_list ) {
                        printf( '<span class="cat-links">' . esc_html__( 'Posted in %1$s', 'pizza-ke' ) . '</span>', $categories_list );
                    }

                    $tags_list = get_the_tag_list( '', esc_html_x( ', ', 'list item separator', 'pizza-ke' ) );
                    if ( $tags_list ) {
                        printf( '<span class="tags-links">' . esc_html__( 'Tagged %1$s', 'pizza-ke' ) . '</span>', $tags_list );
                    }
                    ?>
                </footer>

            </article>

            <?php
            the_post_navigation( array(
                'prev_text' => '<span class="nav-subtitle">' . esc_html__( 'Previous:', 'pizza-ke' ) . '</span> <span class="nav-title">%title</span>',
                'next_text' => '<span class="nav-subtitle">' . esc_html__( 'Next:', 'pizza-ke' ) . '</span> <span class="nav-title">%title</span>',
            ) );

            // If comments are open or we have at least one comment, load up the comment template.
            if ( comments_open() || get_comments_number() ) :
                comments_template();
            endif;

        endwhile; ?>

    </div>
</main>

<?php
get_sidebar();
get_footer();
?>