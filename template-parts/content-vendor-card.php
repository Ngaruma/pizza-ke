<?php
/**
 * Template part for displaying vendor cards
 *
 * @package Pizza_Ke
 * @since 1.0.0
 */

$vendor_location = get_post_meta( get_the_ID(), '_vendor_location', true );
$vendor_phone = get_post_meta( get_the_ID(), '_vendor_phone', true );
$vendor_rating = get_post_meta( get_the_ID(), '_vendor_rating', true );
$vendor_reviews = get_post_meta( get_the_ID(), '_vendor_reviews', true );
?>

<div class="vendor-card card">
    <div class="vendor-logo">
        <?php if ( has_post_thumbnail() ) : ?>
            <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail( 'thumbnail', array( 'loading' => 'lazy' ) ); ?>
            </a>
        <?php else : ?>
            <a href="<?php the_permalink(); ?>">
                <img src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" 
                     alt="<?php echo esc_attr( get_the_title() ); ?> Logo" 
                     loading="lazy">
            </a>
        <?php endif; ?>
    </div>
    
    <div class="vendor-content card-content">
        <h3 class="vendor-title">
            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
        </h3>
        
        <p class="vendor-description">
            <?php echo esc_html( wp_trim_words( get_the_excerpt(), 15 ) ); ?>
        </p>
        
        <div class="vendor-meta">
            <?php if ( $vendor_rating && $vendor_reviews ) : ?>
                <div class="rating">
                    <span class="stars"><?php echo str_repeat( '★', intval( $vendor_rating ) ); ?></span>
                    <span class="rating-text"><?php echo esc_html( $vendor_rating ); ?> (<?php echo esc_html( $vendor_reviews ); ?> <?php esc_html_e( 'reviews', 'pizza-ke' ); ?>)</span>
                </div>
            <?php endif; ?>
            
            <?php if ( $vendor_location ) : ?>
                <span class="location"><?php echo esc_html( $vendor_location ); ?></span>
            <?php endif; ?>
        </div>
        
        <div class="vendor-actions">
            <a href="<?php the_permalink(); ?>" class="btn btn-primary btn-small">
                <?php esc_html_e( 'View Menu', 'pizza-ke' ); ?>
            </a>
            <?php if ( $vendor_phone ) : ?>
                <a href="tel:<?php echo esc_attr( $vendor_phone ); ?>" class="btn btn-outline btn-small">
                    <?php esc_html_e( 'Call Now', 'pizza-ke' ); ?>
                </a>
            <?php endif; ?>
        </div>
    </div>
</div>