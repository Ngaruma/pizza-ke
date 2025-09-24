<?php
/**
 * Template part for displaying results in search pages
 *
 * @package Pizza_Ke
 * @since 1.0.0
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'card search-result' ); ?>>
    
    <?php if ( has_post_thumbnail() ) : ?>
        <div class="post-thumbnail">
            <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail( 'thumbnail' ); ?>
            </a>
        </div>
    <?php endif; ?>

    <div class="card-content">
        <header class="entry-header">
            <?php the_title( sprintf( '<h2 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h2>' ); ?>

            <div class="entry-meta">
                <span class="posted-on">
                    <time class="entry-date published" datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>">
                        <?php echo esc_html( get_the_date() ); ?>
                    </time>
                </span>
                <span class="post-type">
                    <?php echo esc_html( get_post_type_object( get_post_type() )->labels->singular_name ); ?>
                </span>
            </div>
        </header>

        <div class="entry-summary">
            <?php the_excerpt(); ?>
        </div>

        <footer class="entry-footer">
            <a href="<?php the_permalink(); ?>" class="btn btn-outline btn-small">
                <?php esc_html_e( 'Read More', 'pizza-ke' ); ?>
            </a>
        </footer>
    </div>

</article>