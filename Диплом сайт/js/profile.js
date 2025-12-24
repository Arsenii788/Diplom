// Загрузка профиля пользователя
document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const profileContent = document.getElementById('profileContent');

    if (!user) {
        // Если пользователь не авторизован, перенаправляем на главную
        window.location.href = 'index.html';
        return;
    }

    // Отображаем профиль
    profileContent.innerHTML = `
        <div class="profile-header">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
                 alt="Аватар" class="profile-avatar">
            <div class="profile-info">
                <h1>${user.name}</h1>
                <p><i class="fas fa-envelope"></i> ${user.email}</p>
                <p><i class="fas fa-calendar-alt"></i> Зарегистрирован: ${new Date(user.registrationDate).toLocaleDateString('ru-RU')}</p>
                <p><i class="fas fa-trophy"></i> Уровень: ${user.level}</p>

                <div class="profile-stats">
                    <div class="stat">
                        <div class="stat-value">12</div>
                        <div class="stat-label">Тренировок</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">5</div>
                        <div class="stat-label">Достижений</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">42</div>
                        <div class="stat-label">Дней подряд</div>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary" id="editProfileBtn">
                <i class="fas fa-edit"></i> Редактировать
            </button>
        </div>

        <div class="profile-content">
            <div>
                <div class="profile-section">
                    <h2><i class="fas fa-trophy"></i> Достижения</h2>
                    <div class="achievements-grid">
                        <div class="achievement-card">
                            <i class="fas fa-running"></i>
                            <h3>Первая тренировка</h3>
                            <p>Выполнена первая тренировка</p>
                        </div>
                        <div class="achievement-card">
                            <i class="fas fa-fire"></i>
                            <h3>Неделя активности</h3>
                            <p>7 дней подряд тренировок</p>
                        </div>
                        <div class="achievement-card">
                            <i class="fas fa-mountain"></i>
                            <h3>Первые 5 км</h3>
                            <p>Пробежал 5 км без остановки</p>
                        </div>
                    </div>
                </div>

                <div class="profile-section">
                    <h2><i class="fas fa-dumbbell"></i> Активность</h2>
                    <div class="training-plan">
                        <h3>План на эту неделю</h3>
                        <ul>
                            <li>Понедельник: Бег 3 км + растяжка</li>
                            <li>Среда: Интервальный бег 5x400м</li>
                            <li>Пятница: Длительный бег 7 км</li>
                            <li>Суббота: Силовая тренировка</li>
                        </ul>
                        <button class="btn btn-success" style="margin-top: 15px;">
                            <i class="fas fa-robot"></i> Получить новый план у бота
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <div class="profile-section">
                    <h2><i class="fas fa-cog"></i> Настройки</h2>
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button class="btn btn-outline" onclick="window.open('https://t.me/Denisov_Fit_Bot', '_blank')">
                            <i class="fab fa-telegram"></i> Перейти к боту
                        </button>
                        <button class="btn btn-outline" id="changePasswordBtn">
                            <i class="fas fa-key"></i> Сменить пароль
                        </button>
                        <button class="btn btn-outline" id="notificationsBtn">
                            <i class="fas fa-bell"></i> Уведомления
                        </button>
                    </div>
                </div>

                <div class="profile-section">
                    <h2><i class="fas fa-robot"></i> Бот-помощник</h2>
                    <p>Наш телеграм-бот поможет вам с тренировками, отслеживанием прогресса и ответит на вопросы.</p>
                    <a href="https://t.me/Denisov_Fit_Bot" target="_blank" class="btn btn-accent" style="width: 100%; margin-top: 15px;">
                        <i class="fab fa-telegram"></i> Перейти к боту
                    </a>
                </div>
            </div>
        </div>
    `;

    // Добавляем обработчики событий
    document.getElementById('editProfileBtn').addEventListener('click', function() {
        editProfile(user);
    });

    document.getElementById('changePasswordBtn').addEventListener('click', function() {
        changePassword();
    });

    document.getElementById('notificationsBtn').addEventListener('click', function() {
        alert('Настройки уведомлений будут доступны в следующем обновлении!');
    });
});

// Редактирование профиля
function editProfile(user) {
    const profileContent = document.getElementById('profileContent');

    profileContent.innerHTML = `
        <div class="auth-form edit-form">
            <h2><i class="fas fa-edit"></i> Редактирование профиля</h2>

            <form id="editProfileForm">
                <div class="form-row">
                    <div class="form-group">
                        <label for="editName">Имя</label>
                        <input type="text" id="editName" class="form-control" value="${user.name}" required>
                    </div>

                    <div class="form-group">
                        <label for="editEmail">Email</label>
                        <input type="email" id="editEmail" class="form-control" value="${user.email}" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="editLevel">Уровень подготовки</label>
                    <select id="editLevel" class="form-control">
                        <option value="Начинающий" ${user.level === 'Начинающий' ? 'selected' : ''}>Начинающий</option>
                        <option value="Любитель" ${user.level === 'Любитель' ? 'selected' : ''}>Любитель</option>
                        <option value="Продвинутый" ${user.level === 'Продвинутый' ? 'selected' : ''}>Продвинутый</option>
                        <option value="Профессионал" ${user.level === 'Профессионал' ? 'selected' : ''}>Профессионал</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="editBio">О себе</label>
                    <textarea id="editBio" class="form-control" rows="4" placeholder="Расскажите о своих спортивных целях и достижениях">${user.bio || ''}</textarea>
                </div>

                <div class="form-group">
                    <label for="editGoals">Цели</label>
                    <textarea id="editGoals" class="form-control" rows="3" placeholder="Какие у вас цели в легкой атлетике?">${user.goals || ''}</textarea>
                </div>

                <div class="form-buttons" style="display: flex; gap: 15px; margin-top: 25px;">
                    <button type="submit" class="btn btn-success" style="flex: 1;">
                        <i class="fas fa-save"></i> Сохранить
                    </button>
                    <button type="button" class="btn btn-outline" id="cancelEditBtn" style="flex: 1;">
                        <i class="fas fa-times"></i> Отмена
                    </button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('editProfileForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Обновляем данные пользователя
        user.name = document.getElementById('editName').value;
        user.email = document.getElementById('editEmail').value;
        user.level = document.getElementById('editLevel').value;
        user.bio = document.getElementById('editBio').value;
        user.goals = document.getElementById('editGoals').value;

        // Обновляем в localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Обновляем в списке пользователей
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const index = users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            users[index] = user;
            localStorage.setItem('users', JSON.stringify(users));
        }

        alert('Профиль успешно обновлен!');
        location.reload();
    });

    document.getElementById('cancelEditBtn').addEventListener('click', function() {
        location.reload();
    });
}

// Смена пароля
function changePassword() {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    const newPassword = prompt('Введите новый пароль (минимум 6 символов):');
    if (!newPassword || newPassword.length < 6) {
        alert('Пароль должен содержать минимум 6 символов!');
        return;
    }

    const confirmPassword = prompt('Подтвердите новый пароль:');
    if (newPassword !== confirmPassword) {
        alert('Пароли не совпадают!');
        return;
    }

    // Обновляем пароль
    user.password = newPassword;

    // Обновляем в localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Обновляем в списке пользователей
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
        users[index] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }

    alert('Пароль успешно изменен!');
}