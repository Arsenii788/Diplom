// Обработка форм регистрации и входа
document.addEventListener('DOMContentLoaded', function() {
    // Регистрация
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Простая валидация
            if (password !== confirmPassword) {
                alert('Пароли не совпадают!');
                return;
            }

            if (password.length < 6) {
                alert('Пароль должен содержать минимум 6 символов!');
                return;
            }

            // Сохраняем пользователя
            const user = {
                id: Date.now(),
                name: name,
                email: email,
                password: password, // В реальном приложении пароль должен хешироваться
                registrationDate: new Date().toISOString(),
                level: 'Начинающий',
                achievements: []
            };

            // Получаем существующих пользователей
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Проверяем, нет ли уже пользователя с таким email
            if (users.some(u => u.email === email)) {
                alert('Пользователь с таким email уже зарегистрирован!');
                return;
            }

            // Добавляем нового пользователя
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            // Автоматически входим
            localStorage.setItem('currentUser', JSON.stringify(user));

            alert('Регистрация прошла успешно!');
            window.location.href = 'profile.html';
        });
    }

    // Вход
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Получаем пользователей
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Ищем пользователя
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Сохраняем текущего пользователя
                localStorage.setItem('currentUser', JSON.stringify(user));

                alert('Вход выполнен успешно!');
                window.location.href = 'profile.html';
            } else {
                alert('Неверный email или пароль!');
            }
        });
    }
});