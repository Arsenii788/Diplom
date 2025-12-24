// Загрузка header на все страницы
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем header
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;

            // После загрузки header инициализируем меню
            initializeMenu();
            updateAuthButtons();
            setActiveNavLink();
        })
        .catch(error => {
            console.error('Error loading header:', error);
            document.getElementById('header-container').innerHTML = '<header><div class="container">Error loading header</div></header>';
        });

    // Проверяем авторизацию
    checkAuth();

    // Инициализируем анимации
    initAnimations();
});

// Инициализация мобильного меню
function initializeMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        // Создаем кнопку мобильного меню, если её нет
        if (!menuToggle.innerHTML.trim()) {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }

        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Закрываем меню при клике на ссылку
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                if (menuToggle.querySelector('i')) {
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }
}

// Устанавливаем активную ссылку в навигации
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage ||
            (currentPage === '' && linkHref === 'index.html') ||
            (linkHref === 'index.html' && currentPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Проверка авторизации пользователя
function checkAuth() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Обновление кнопок авторизации в header
function updateAuthButtons() {
    const authButtons = document.getElementById('auth-buttons');
    if (!authButtons) return;

    const user = checkAuth();

    if (user) {
        authButtons.innerHTML = `
            <span class="welcome-message">${user.name}</span>
            <a href="profile.html" class="btn btn-gradient">
                <i class="fas fa-user"></i> Профиль
            </a>
            <button class="btn btn-outline" id="logout-btn">
                <i class="fas fa-sign-out-alt"></i>
            </button>
        `;

        // Добавляем обработчик выхода
        document.getElementById('logout-btn').addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    } else {
        authButtons.innerHTML = `
            <a href="login.html" class="btn btn-outline">
                <i class="fas fa-sign-in-alt"></i> Войти
            </a>
            <a href="register.html" class="btn btn-gradient">
                <i class="fas fa-user-plus"></i> Регистрация
            </a>
        `;
    }
}

// Показываем/скрываем пароль
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = document.querySelector(`[onclick="togglePassword('${inputId}')"] i`);

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Инициализация анимаций
function initAnimations() {
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами с анимацией
    document.querySelectorAll('.feature-card, .tech-card, .bot-feature').forEach(el => {
        observer.observe(el);
    });
}

// Плавная прокрутка
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]') || e.target.closest('a[href^="#"]')) {
        e.preventDefault();

        const targetId = e.target.getAttribute('href') || e.target.closest('a[href^="#"]').getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });

            // Закрываем мобильное меню если оно открыто
            const nav = document.querySelector('nav');
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                const menuToggle = document.querySelector('.menu-toggle');
                if (menuToggle && menuToggle.querySelector('i')) {
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            }
        }
    }
});

// Добавляем CSS для анимаций
const style = document.createElement('style');
style.textContent = `
    .feature-card, .tech-card, .bot-feature {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .feature-card.animate-in, .tech-card.animate-in, .bot-feature.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);