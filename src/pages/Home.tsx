import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="container">
      <div className="home-hero">
        <h1 className="hero-title">{t('common.welcome')} to {t('common.appName')}</h1>
        <p className="hero-subtitle text-secondary">
          Discover amazing art galleries, talented artists, and exclusive vernissages
        </p>

        {!user && (
          <div className="hero-actions">
            <a href="/signup" className="btn btn-primary btn-large">
              {t('common.signup')}
            </a>
            <a href="/login" className="btn btn-secondary btn-large">
              {t('common.login')}
            </a>
          </div>
        )}
      </div>

      <div className="home-features">
        <div className="feature-card card">
          <h3>{t('nav.galleries')}</h3>
          <p className="text-secondary">
            Browse through curated art galleries from around the world
          </p>
        </div>

        <div className="feature-card card">
          <h3>{t('nav.artists')}</h3>
          <p className="text-secondary">
            Explore talented artists and their stunning portfolios
          </p>
        </div>

        <div className="feature-card card">
          <h3>{t('nav.events')}</h3>
          <p className="text-secondary">
            Attend exclusive vernissages and art exhibitions
          </p>
        </div>
      </div>
    </div>
  );
};
