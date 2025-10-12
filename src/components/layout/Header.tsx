import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, signOut } = useAuth();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-brand">
            <h1 className="brand-title">{t('common.appName')}</h1>
          </div>

          <nav className="header-nav">
            <a href="/">{t('nav.home')}</a>
            <a href="/galleries">{t('nav.galleries')}</a>
            <a href="/artists">{t('nav.artists')}</a>
            <a href="/events">{t('nav.events')}</a>
            {user && <a href="/dashboard">{t('nav.dashboard')}</a>}
          </nav>

          <div className="header-actions">
            <div className="language-selector">
              <button
                onClick={() => changeLanguage('en')}
                className={i18n.language === 'en' ? 'active' : ''}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage('de')}
                className={i18n.language === 'de' ? 'active' : ''}
              >
                DE
              </button>
              <button
                onClick={() => changeLanguage('nl')}
                className={i18n.language === 'nl' ? 'active' : ''}
              >
                NL
              </button>
              <button
                onClick={() => changeLanguage('sv')}
                className={i18n.language === 'sv' ? 'active' : ''}
              >
                SV
              </button>
            </div>

            {user ? (
              <div className="user-menu">
                <span className="user-email">{user.email}</span>
                <button onClick={signOut} className="btn btn-secondary">
                  {t('common.logout')}
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <a href="/login" className="btn btn-secondary">
                  {t('common.login')}
                </a>
                <a href="/signup" className="btn btn-primary">
                  {t('common.signup')}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
