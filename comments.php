<?php
/**
 * The template for displaying comments
 *
 * @package Pizza_Ke
 * @since 1.0.0
 */

if ( post_password_required() ) {
    return;
}
?>

<div id="comments" class="comments-area">

    <?php if ( have_comments() ) : ?>
        <h2 class="comments-title">
            <?php
            $pizza_ke_comment_count = get_comments_number();
            if ( '1' === $pizza_ke_comment_count ) {
                printf(
                    /* translators: 1: title. */
                    esc_html__( 'One thought on &ldquo;%1$s&rdquo;', 'pizza-ke' ),
                    '<span>' . wp_kses_post( get_the_title() ) . '</span>'
                );
            } else {
                printf(
                    /* translators: 1: comment count number, 2: title. */
                    esc_html( _nx( '%1$s thought on &ldquo;%2$s&rdquo;', '%1$s thoughts on &ldquo;%2$s&rdquo;', $pizza_ke_comment_count, 'comments title', 'pizza-ke' ) ),
                    number_format_i18n( $pizza_ke_comment_count ), // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                    '<span>' . wp_kses_post( get_the_title() ) . '</span>'
                );
            }
            ?>
        </h2>

        <?php the_comments_navigation(); ?>

        <ol class="comment-list">
            <?php
            wp_list_comments( array(
                'style'      => 'ol',
                'short_ping' => true,
            ) );
            ?>
        </ol>

        <?php
        the_comments_navigation();

        if ( ! comments_open() ) :
            ?>
            <p class="no-comments"><?php esc_html_e( 'Comments are closed.', 'pizza-ke' ); ?></p>
            <?php
        endif;

    endif;

    comment_form();
    ?>

</div>