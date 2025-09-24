<?php
/**
 * Template part for displaying pizza cards
 *
 * @package Pizza_Ke
 * @since 1.0.0
 */

$pizza_price = get_post_meta( get_the_ID(), '_pizza_price', true );
$pizza_vendor = get_post_meta( get_the_ID(), '_pizza_vendor', true );
$pizza_rating = get_post_meta( get_the_ID(), '_pizza_rating', true );
?>

<div class="pizza-card card">
    <div class="pizza-image">
        <?php if ( has_post_thumbnail() ) : ?>
            <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail( 'medium', array( 'loading' => 'lazy' ) ); ?>
            </a>
        <?php else : ?>
            <a href="<?php the_permalink(); ?>">
                <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" 
                     alt="<?php echo esc_attr( get_the_title() ); ?>" 
                     loading="lazy">
            </a>
        <?php endif; ?>
    </div>
    
    <div class="pizza-content card-content">
        <h3 class="pizza-title">
            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
        </h3>
        
        <p class="pizza-description">
            <?php echo esc_html( wp_trim_words( get_the_excerpt(), 15 ) ); ?>
        </p>
        
        <div class="pizza-meta">
            <?php if ( $pizza_price ) : ?>
                <span class="price">KES <?php echo esc_html( $pizza_price ); ?></span>
            <?php endif; ?>
            
            <?php if ( $pizza_vendor ) : ?>
                <span class="vendor"><?php echo esc_html( $pizza_vendor ); ?></span>
            <?php endif; ?>
            
            <?php if ( $pizza_rating ) : ?>
                <div class="rating">
                    <span class="stars"><?php echo str_repeat( '★', intval( $pizza_rating ) ); ?></span>
                    <span class="rating-text"><?php echo esc_html( $pizza_rating ); ?></span>
                </div>
            <?php endif; ?>
        </div>
        
        <div class="pizza-actions">
            <a href="<?php the_permalink(); ?>" class="btn btn-primary btn-small">
                <?php esc_html_e( 'View Details', 'pizza-ke' ); ?>
            </a>
        </div>
    </div>
</div>