<?php
/**
 * The front page template file
 *
 * This template is used for the static front page
 *
 * @package Pizza_Ke
 * @since 1.0.0
 */

get_header(); ?>

<main id="primary" class="site-main">
    
    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <h1><?php esc_html_e( 'Find the Best Pizza in Kenya', 'pizza-ke' ); ?></h1>
            <p><?php esc_html_e( 'Discover amazing pizzas from local vendors across Kenya. Connect directly with restaurants and get the best deals.', 'pizza-ke' ); ?></p>
            
            <!-- Search Form -->
            <div class="hero-search">
                <form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
                    <div class="search-input-wrapper">
                        <input type="search" 
                               class="search-field" 
                               placeholder="<?php echo esc_attr_x( 'Search for pizzas, restaurants...', 'placeholder', 'pizza-ke' ); ?>" 
                               value="<?php echo get_search_query(); ?>" 
                               name="s" />
                        <button type="submit" class="search-submit">
                            <span class="screen-reader-text"><?php echo _x( 'Search', 'submit button', 'pizza-ke' ); ?></span>
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>

            <!-- CTA Buttons -->
            <div class="hero-cta">
                <a href="<?php echo esc_url( home_url( '/browse' ) ); ?>" class="btn btn-primary btn-large">
                    <?php esc_html_e( 'Browse Vendors', 'pizza-ke' ); ?>
                </a>
                <a href="<?php echo esc_url( home_url( '/vendor-register' ) ); ?>" class="btn btn-outline btn-large">
                    <?php esc_html_e( 'List Your Restaurant', 'pizza-ke' ); ?>
                </a>
            </div>
        </div>
    </section>

    <!-- Order Tracking for logged in users -->
    <?php if ( is_user_logged_in() ) : ?>
    <section class="order-tracking content-area">
        <div class="container">
            <h2><?php esc_html_e( 'Track Your Orders', 'pizza-ke' ); ?></h2>
            <div class="order-tracking-widget">
                <!-- Order tracking functionality would go here -->
                <p><?php esc_html_e( 'Your recent orders will appear here.', 'pizza-ke' ); ?></p>
            </div>
        </div>
    </section>
    <?php endif; ?>

    <!-- Trending Pizzas Section -->
    <section class="trending-pizzas content-area">
        <div class="container">
            <h2><?php esc_html_e( 'Trending Pizzas', 'pizza-ke' ); ?></h2>
            <p class="section-description">
                <?php esc_html_e( 'Discover the most popular pizzas across Kenya', 'pizza-ke' ); ?>
            </p>
            
            <div class="pizzas-grid">
                <?php
                // Query for featured pizzas or latest posts
                $trending_pizzas = new WP_Query( array(
                    'post_type' => 'pizza',
                    'posts_per_page' => 8,
                    'meta_query' => array(
                        array(
                            'key' => '_pizza_featured',
                            'value' => 'yes',
                            'compare' => '='
                        )
                    )
                ) );

                if ( $trending_pizzas->have_posts() ) :
                    while ( $trending_pizzas->have_posts() ) :
                        $trending_pizzas->the_post();
                        get_template_part( 'template-parts/content', 'pizza-card' );
                    endwhile;
                    wp_reset_postdata();
                else :
                    // Fallback content if no pizzas found
                    for ( $i = 1; $i <= 8; $i++ ) :
                ?>
                    <div class="pizza-card">
                        <div class="pizza-image">
                            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80" 
                                 alt="<?php echo esc_attr( sprintf( __( 'Pizza %d', 'pizza-ke' ), $i ) ); ?>" 
                                 loading="lazy">
                        </div>
                        <div class="pizza-content">
                            <h3><?php echo esc_html( sprintf( __( 'Delicious Pizza %d', 'pizza-ke' ), $i ) ); ?></h3>
                            <p class="pizza-description"><?php esc_html_e( 'A mouth-watering pizza with fresh ingredients and authentic flavors.', 'pizza-ke' ); ?></p>
                            <div class="pizza-meta">
                                <span class="price">KES <?php echo esc_html( 800 + ( $i * 50 ) ); ?></span>
                                <span class="vendor"><?php echo esc_html( sprintf( __( 'Pizza Place %d', 'pizza-ke' ), $i ) ); ?></span>
                            </div>
                        </div>
                    </div>
                <?php
                    endfor;
                endif;
                ?>
            </div>
            
            <div class="section-cta">
                <a href="<?php echo esc_url( home_url( '/browse' ) ); ?>" class="btn btn-primary">
                    <?php esc_html_e( 'View All Pizzas', 'pizza-ke' ); ?>
                </a>
            </div>
        </div>
    </section>

    <!-- Featured Vendors Section -->
    <section class="featured-vendors content-area bg-light">
        <div class="container">
            <h2><?php esc_html_e( 'Featured Restaurants', 'pizza-ke' ); ?></h2>
            <p class="section-description">
                <?php esc_html_e( 'Top-rated pizza restaurants trusted by thousands of customers', 'pizza-ke' ); ?>
            </p>
            
            <div class="vendors-grid">
                <?php
                // Query for featured vendors
                $featured_vendors = new WP_Query( array(
                    'post_type' => 'vendor',
                    'posts_per_page' => 6,
                    'meta_query' => array(
                        array(
                            'key' => '_vendor_featured',
                            'value' => 'yes',
                            'compare' => '='
                        )
                    )
                ) );

                if ( $featured_vendors->have_posts() ) :
                    while ( $featured_vendors->have_posts() ) :
                        $featured_vendors->the_post();
                        get_template_part( 'template-parts/content', 'vendor-card' );
                    endwhile;
                    wp_reset_postdata();
                else :
                    // Fallback content if no vendors found
                    for ( $i = 1; $i <= 6; $i++ ) :
                ?>
                    <div class="vendor-card">
                        <div class="vendor-logo">
                            <img src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" 
                                 alt="<?php echo esc_attr( sprintf( __( 'Restaurant %d Logo', 'pizza-ke' ), $i ) ); ?>" 
                                 loading="lazy">
                        </div>
                        <div class="vendor-content">
                            <h3><?php echo esc_html( sprintf( __( 'Pizza Restaurant %d', 'pizza-ke' ), $i ) ); ?></h3>
                            <p class="vendor-description"><?php esc_html_e( 'Authentic Italian pizzas made with fresh ingredients and traditional recipes.', 'pizza-ke' ); ?></p>
                            <div class="vendor-meta">
                                <div class="rating">
                                    <span class="stars">★★★★★</span>
                                    <span class="rating-text">4.<?php echo esc_html( $i ); ?> (<?php echo esc_html( 50 + ( $i * 20 ) ); ?> reviews)</span>
                                </div>
                                <span class="location">Nairobi</span>
                            </div>
                        </div>
                    </div>
                <?php
                    endfor;
                endif;
                ?>
            </div>
            
            <div class="section-cta">
                <a href="<?php echo esc_url( home_url( '/vendors' ) ); ?>" class="btn btn-primary">
                    <?php esc_html_e( 'View All Restaurants', 'pizza-ke' ); ?>
                </a>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features content-area">
        <div class="container">
            <h2><?php esc_html_e( 'Why Choose Pizza.ke?', 'pizza-ke' ); ?></h2>
            
            <div class="features-grid">
                <div class="feature">
                    <div class="feature-icon">
                        <svg width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                    </div>
                    <h3><?php esc_html_e( 'Quality Assured', 'pizza-ke' ); ?></h3>
                    <p><?php esc_html_e( 'All restaurants are verified and reviewed to ensure you get the best quality pizzas.', 'pizza-ke' ); ?></p>
                </div>
                
                <div class="feature">
                    <div class="feature-icon">
                        <svg width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                    </div>
                    <h3><?php esc_html_e( 'Local Focus', 'pizza-ke' ); ?></h3>
                    <p><?php esc_html_e( 'Supporting local businesses across Kenya with easy discovery and direct connections.', 'pizza-ke' ); ?></p>
                </div>
                
                <div class="feature">
                    <div class="feature-icon">
                        <svg width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                        </svg>
                    </div>
                    <h3><?php esc_html_e( 'Easy Contact', 'pizza-ke' ); ?></h3>
                    <p><?php esc_html_e( 'Get direct contact information and connect with restaurants instantly.', 'pizza-ke' ); ?></p>
                </div>
            </div>
        </div>
    </section>

</main>

<?php
get_footer();
?>