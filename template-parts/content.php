<?php
/**
 * Template part for displaying posts
 *
 * @package Pizza_Ke
 * @since 1.0.0
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'card' ); ?>>
    
    <?php if ( has_post_thumbnail() ) : ?>
        <div class="post-thumbnail">
            <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail( 'medium' ); ?>
            </a>
        </div>
    <?php endif; ?>

    <div class="card-content">
        <header class="entry-header">
            <?php
            if ( is_singular() ) :
                the_title( '<h1 class="entry-title">', '</h1>' );
            else :
                the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
            endif;
            ?>

            <?php if ( 'post' === get_post_type() ) : ?>
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
                            '<a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a>'
                        );
                        ?>
                    </span>
                </div>
            <?php endif; ?>
        </header>

        <div class="entry-content">
            <?php
            if ( is_singular() ) {
                the_content();
            } else {
                the_excerpt();
            }

            wp_link_pages( array(
                'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'pizza-ke' ),
                'after'  => '</div>',
            ) );
            ?>
        </div>

        <?php if ( ! is_singular() ) : ?>
            <footer class="entry-footer">
                <a href="<?php the_permalink(); ?>" class="btn btn-outline">
                    <?php esc_html_e( 'Read More', 'pizza-ke' ); ?>
                </a>
            </footer>
        <?php endif; ?>
    </div>

</article>