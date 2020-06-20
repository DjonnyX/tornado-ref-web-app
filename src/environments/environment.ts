export const environment = {
  production: false,
  apiConfig: {
    host: 'http://127.0.0.1:2222',
    routes: {
      api: {
        baseUrl: 'v1',
        login: 'login',
        registration: 'registration',
        tickets: 'tickets',
        tarifs: 'tarifs',
        categories: 'categories',
      }
    }
  }
};
