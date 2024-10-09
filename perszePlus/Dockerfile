# Use the official PHP image with Apache
FROM php:8.2-apache

# Install necessary PHP extensions and tools
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zlib1g-dev \
    git \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && docker-php-ext-install pdo pdo_mysql \
    && a2enmod rewrite

# Set the working directory
WORKDIR /var/www/html

RUN chown -R www-data:www-data /var/www

# Copy the application files
COPY . .

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Install PHP dependencies
RUN composer install

# Set permissions for storage and cache directories
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Overwrite the default configuration with custom settings
COPY .apache/apache-custom.conf /etc/apache2/sites-available/000-default.conf

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
