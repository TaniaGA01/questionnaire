FROM php:8.2-fpm

# Instalar dependencias
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl

# Instalar extensiones de PHP necesarias
RUN docker-php-ext-install intl pdo pdo_mysql zip

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
