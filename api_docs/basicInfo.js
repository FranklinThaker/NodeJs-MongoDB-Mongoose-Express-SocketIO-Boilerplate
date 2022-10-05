module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Users CRUD',
    description: 'Users management',
    contact: {
      name: 'Franklin P. Thaker',
      email: 'Jarvisfranklinthaker@gmail.com',
      url: 'https://www.instagram.com/axel_blaze_csgo/',
    },
  },
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
      },
    },
  },
};
