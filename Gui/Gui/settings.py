from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-1ew2&ma_uqc+jtn_qp@kl7sv_%=qk9nx+ry0o27ffv0*b4$n%='

DEBUG = True

ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'corsheaders',
    'Api',
]

MIDDLEWARE = [
    # 🔐 Security first
    'django.middleware.security.SecurityMiddleware',

    # 🌐 CORS must be before CommonMiddleware
    'corsheaders.middleware.CorsMiddleware',

    # 🍪 Sessions must be before CSRF
    'django.contrib.sessions.middleware.SessionMiddleware',

    # Common middleware
    'django.middleware.common.CommonMiddleware',

    # CSRF (still required even if views are exempt)
    'django.middleware.csrf.CsrfViewMiddleware',

    # Auth & messages
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',

    # Clickjacking protection
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'Gui.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Gui.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# -------------------------------
# 🔥 CORS CONFIG (IMPORTANT)
# -------------------------------
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]

CORS_ALLOW_CREDENTIALS = True

# -------------------------------
# 🔥 SESSION COOKIE CONFIG
# -------------------------------
SESSION_COOKIE_SAMESITE = "Lax"
SESSION_COOKIE_SECURE = False  # True only when using HTTPS

# Recommended (optional but good)
SESSION_EXPIRE_AT_BROWSER_CLOSE = True
SESSION_COOKIE_AGE = 60 * 60 * 24  # 1 day

# -------------------------------
# 🔥 CSRF COOKIE CONFIG
# -------------------------------
CSRF_COOKIE_SAMESITE = "Lax"
CSRF_COOKIE_SECURE = False
