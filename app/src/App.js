import React, { useState, useEffect } from 'react';
import './App.css';

// Основной компонент приложения
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Компоненты страниц
  const pages = {
    home: <HomePage />,
    appointments: <AppointmentsPage user={user} />,
    user: <UserPage user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
  };

  return (
    <div className="app">
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isLoggedIn={isLoggedIn} 
        user={user}
      />
      <main className="main-content">
        {pages[currentPage]}
      </main>
      <Footer />
    </div>
  );
}

// Шапка сайта с навигацией
function Header({ currentPage, setCurrentPage, isLoggedIn, user }) {
  return (
    <header className="header">
      <div className="logo">
        <span className="neon-text">NEON</span>
        <span className="logo-ink">INK</span>
      </div>
      <nav className="nav">
        <button 
          className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentPage('home')}
        >
          Главная
        </button>
        <button 
          className={`nav-btn ${currentPage === 'appointments' ? 'active' : ''}`}
          onClick={() => setCurrentPage('appointments')}
        >
          Мои записи
        </button>
        <button 
          className={`nav-btn ${currentPage === 'user' ? 'active' : ''}`}
          onClick={() => setCurrentPage('user')}
        >
          {isLoggedIn ? (user?.name || 'Профиль') : 'Войти'}
        </button>
      </nav>
    </header>
  );
}

// Главная страница
function HomePage() {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [tattooComplexity, setTattooComplexity] = useState('medium');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentName, setAppointmentName] = useState('');
  
  // Массив работ для галереи
  const tattooWorks = [
    { id: 1, title: "Неоновый дракон", style: "Трайбл", image: "dragon.jpg" },
    { id: 2, title: "Геометрия космоса", style: "Геометрический", image: "geometry.jpg" },
    { id: 3, title: "Цветочный мандала", style: "Орнаментальный", image: "mandala.jpg" },
    { id: 4, title: "Абстрактный волк", style: "Акварель", image: "wolf.jpg" },
    { id: 5, title: "Киберпанк череп", style: "Киберпанк", image: "skull.jpg" },
    { id: 6, title: "Минимализм луны", style: "Минимализм", image: "moon.jpg" },
  ];

  // Временные слоты для записи
  const timeSlots = [
    '10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00'
  ];

  // Функция для отправки заявки в Telegram
  const sendToTelegram = (e) => {
    e.preventDefault();
    
    // Здесь должен быть реальный бот токен и chat ID
    const botToken = '8226368419:AAE12JgvGBBZeoTCAi8r9wGvRI8yN9KVx8w';
    const chatID = '5122781064';
    
    const message = `Новая заявка на татуировку!
Имя: ${appointmentName}
Дата: ${selectedDate}
Время: ${selectedTime}
Сложность: ${getComplexityText(tattooComplexity)}`;
    
    // В реальном приложении здесь будет fetch запрос к API Telegram
    // Для демонстрации просто показываем alert
    alert(`Заявка отправлена в Telegram!\n\n${message}`);
    
    // Сброс формы
    setShowBookingForm(false);
    setAppointmentName('');
    setSelectedDate('');
    setSelectedTime('');
  };

  const getComplexityText = (level) => {
    switch(level) {
      case 'simple': return 'Простая (1-2 часа)';
      case 'medium': return 'Средняя (3-4 часа)';
      case 'complex': return 'Сложная (5+ часов)';
      default: return 'Средняя';
    }
  };

  return (
    <div className="home-page">
      <section className="hero">
        <h1 className="hero-title neon-text">Создай свою <span className="highlight">уникальную</span> татуировку</h1>
        <p className="hero-subtitle">Мастера мирового уровня в стильном неоновом пространстве</p>
        <button 
          className="cta-button"
          onClick={() => setShowBookingForm(true)}
        >
          Записаться на сеанс
        </button>
      </section>

      {showBookingForm && (
        <div className="booking-modal">
          <div className="booking-form">
            <div className="form-header">
              <h2 className="neon-text">Запись на сеанс</h2>
              <button className="close-btn" onClick={() => setShowBookingForm(false)}>×</button>
            </div>
            <form onSubmit={sendToTelegram}>
              <div className="form-group">
                <label>Ваше имя</label>
                <input 
                  type="text" 
                  value={appointmentName}
                  onChange={(e) => setAppointmentName(e.target.value)}
                  required 
                  className="neon-input"
                />
              </div>
              
              <div className="form-group">
                <label>Сложность татуировки</label>
                <div className="complexity-selector">
                  <button 
                    type="button"
                    className={`complexity-btn ${tattooComplexity === 'simple' ? 'active' : ''}`}
                    onClick={() => setTattooComplexity('simple')}
                  >
                    Простая
                  </button>
                  <button 
                    type="button"
                    className={`complexity-btn ${tattooComplexity === 'medium' ? 'active' : ''}`}
                    onClick={() => setTattooComplexity('medium')}
                  >
                    Средняя
                  </button>
                  <button 
                    type="button"
                    className={`complexity-btn ${tattooComplexity === 'complex' ? 'active' : ''}`}
                    onClick={() => setTattooComplexity('complex')}
                  >
                    Сложная
                  </button>
                </div>
                <p className="complexity-hint">{getComplexityText(tattooComplexity)}</p>
              </div>
              
              <div className="form-group">
                <label>Выберите дату</label>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required 
                  className="neon-input"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="form-group">
                <label>Выберите время</label>
                <div className="time-slots">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      type="button"
                      className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              
              <button type="submit" className="submit-btn">
                Отправить заявку в Telegram
              </button>
            </form>
          </div>
        </div>
      )}

      <section className="gallery-section">
        <h2 className="section-title neon-text">Наши работы</h2>
        <div className="gallery">
          {tattooWorks.map(work => (
            <div key={work.id} className="tattoo-card">
              <div className="tattoo-image-placeholder">
                <div className="image-overlay">
                  <span className="view-work">Просмотр</span>
                </div>
              </div>
              <div className="tattoo-info">
                <h3>{work.title}</h3>
                <p className="tattoo-style">{work.style}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="custom-tattoo-section">
        <h2 className="section-title neon-text">Татуировка на заказ</h2>
        <p className="section-description">
          У вас есть собственная идея для татуировки? Наши мастера создадут уникальный эскиз, 
          который точно отразит вашу индивидуальность. Расскажите нам о своей задумке!
        </p>
        <div className="custom-options">
          <div className="custom-option">
            <div className="option-icon">✏️</div>
            <h3>Разработка эскиза</h3>
            <p>Создание индивидуального дизайна по вашему описанию</p>
          </div>
          <div className="custom-option">
            <div className="option-icon">🔍</div>
            <h3>Консультация</h3>
            <p>Обсуждение деталей, размера, расположения и стиля</p>
          </div>
          <div className="custom-option">
            <div className="option-icon">🎨</div>
            <h3>Реализация</h3>
            <p>Профессиональное нанесение татуировки с гарантией качества</p>
          </div>
        </div>
        <button className="cta-button secondary">
          Заказать индивидуальный эскиз
        </button>
      </section>
    </div>
  );
}

// Страница с записями пользователя
function AppointmentsPage({ user }) {
  // Пример данных о записях
  const appointments = user ? [
    { id: 1, date: '2023-10-15', time: '14:30', complexity: 'Средняя', status: 'Подтверждена' },
    { id: 2, date: '2023-11-02', time: '11:00', complexity: 'Простая', status: 'Ожидание' },
  ] : [];

  return (
    <div className="appointments-page">
      <h1 className="page-title neon-text">Мои записи</h1>
      
      {!user ? (
        <div className="no-user-message">
          <p>Пожалуйста, войдите в систему, чтобы просмотреть свои записи.</p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="no-appointments">
          <p>У вас пока нет записей на сеансы.</p>
          <p>Запишитесь на главной странице!</p>
        </div>
      ) : (
        <div className="appointments-list">
          {appointments.map(app => (
            <div key={app.id} className="appointment-card">
              <div className="appointment-date">
                <span className="date-day">{new Date(app.date).getDate()}</span>
                <span className="date-month">
                  {new Date(app.date).toLocaleString('ru-RU', { month: 'short' })}
                </span>
              </div>
              <div className="appointment-details">
                <h3>Тату-сеанс</h3>
                <p><strong>Время:</strong> {app.time}</p>
                <p><strong>Сложность:</strong> {app.complexity}</p>
                <p><strong>Статус:</strong> <span className={`status ${app.status === 'Подтверждена' ? 'confirmed' : 'pending'}`}>{app.status}</span></p>
              </div>
              <button className="edit-btn">Изменить</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Страница пользователя (регистрация/авторизация)
function UserPage({ user, setUser, setIsLoggedIn }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLoginMode) {
      // Вход в систему
      const mockUser = { 
        name: name || 'Пользователь', 
        email: email || 'user@example.com',
        joinDate: new Date().toISOString().split('T')[0]
      };
      setUser(mockUser);
      setIsLoggedIn(true);
      alert(`Добро пожаловать, ${mockUser.name}!`);
    } else {
      // Регистрация
      if (!name || !email || !password) {
        alert('Пожалуйста, заполните все поля');
        return;
      }
      
      const newUser = { 
        name, 
        email,
        joinDate: new Date().toISOString().split('T')[0]
      };
      setUser(newUser);
      setIsLoggedIn(true);
      alert(`Регистрация успешна! Добро пожаловать, ${name}!`);
    }
    
    // Очистка формы
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    alert('Вы вышли из системы');
  };

  return (
    <div className="user-page">
      {user ? (
        <div className="user-profile">
          <h1 className="page-title neon-text">Мой профиль</h1>
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="profile-info">
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <p className="join-date">С нами с {user.joinDate}</p>
              </div>
            </div>
            
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-value">2</span>
                <span className="stat-label">Записи</span>
              </div>
              <div className="stat">
                <span className="stat-value">1</span>
                <span className="stat-label">Эскизы</span>
              </div>
              <div className="stat">
                <span className="stat-value">5</span>
                <span className="stat-label">В избранном</span>
              </div>
            </div>
            
            <button className="logout-btn" onClick={handleLogout}>
              Выйти из системы
            </button>
          </div>
        </div>
      ) : (
        <div className="auth-form-container">
          <h1 className="page-title neon-text">{isLoginMode ? 'Вход в систему' : 'Регистрация'}</h1>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLoginMode && (
              <div className="form-group">
                <label>Имя</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="neon-input"
                />
              </div>
            )}
            
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="neon-input"
              />
            </div>
            
            <div className="form-group">
              <label>Пароль</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="neon-input"
              />
            </div>
            
            <button type="submit" className="auth-submit-btn">
              {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </form>
          
          <div className="auth-switch">
            <p>
              {isLoginMode ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
              <button 
                className="switch-btn"
                onClick={() => setIsLoginMode(!isLoginMode)}
              >
                {isLoginMode ? 'Зарегистрироваться' : 'Войти'}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Подвал сайта
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title neon-text">NEON INK</h3>
          <p>Тату-салон премиум класса в неоновом стиле</p>
        </div>
        
        <div className="footer-section">
          <h4>Контакты</h4>
          <p>г. Москва, ул. Неоновая, 13</p>
          <p>+7 (999) 123-45-67</p>
          <p>info@neon-ink.ru</p>
        </div>
        
        <div className="footer-section">
          <h4>Часы работы</h4>
          <p>Пн-Пт: 10:00 - 21:00</p>
          <p>Сб-Вс: 11:00 - 20:00</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2023 NEON INK. Все права защищены.</p>
      </div>
    </footer>
  );
}

export default App;