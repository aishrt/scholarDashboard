import React from 'react';
import { env, isDevelopment } from './env';

// Example API Service
export class ApiService {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = env.apiUrl;
    this.timeout = env.apiTimeout;
  }

  async fetchData() {
    if (env.enableLogging) {
      console.log(`Fetching data from ${this.baseUrl}`);
    }

    // Your API call logic here
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(this.baseUrl, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (isDevelopment) {
        console.error('API Error:', error);
      }
      throw error;
    }
  }
}

// Example Analytics Component
export const AnalyticsComponent: React.FC = () => {
  if (!env.enableAnalytics) return null;

  return <div>Analytics Component</div>;
};

// Example usage in a component
export const AppHeader: React.FC = () => {
  return (
    <header>
      <h1>{env.appName}</h1>
      <p>Version: {env.appVersion}</p>
      {isDevelopment && <p>Development Mode</p>}
    </header>
  );
};
