module.exports = {
  paths: {
    '/api/v1/account/profile': {
      get: {
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: ['Users - CRUD'],
        description: 'GET Logged-In User Profile',
        responses: {
          200: {
            description: 'Data fetched.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    code: {
                      type: 'number',
                      description: 'HTTP Status Code',
                      example: 200,
                    },
                    success: {
                      type: 'boolean',
                      description: 'success/failure',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      description: 'API Message',
                      example: 'Data fetched.',
                    },
                    data: {
                      type: 'object',
                      description: 'data returned from API',
                      example: {
                        _id: '633bbd26dc032fefe03501db',
                        name: 'Franklin Thaker',
                        email: 'Jarvisfranklinthaker@gmail.com',
                        role: 'user',
                        password: 'pwd@123',
                        status: true,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: 'Server error',
          },
          401: {
            description: 'Authentication/Authorization error',
          },
        },
      },
    },
    '/api/v1/account/users': {
      get: {
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: ['Users - CRUD'],
        description: 'GET All Users Profiles',
        responses: {
          200: {
            description: 'Get all users profiles',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    code: {
                      type: 'number',
                      description: 'HTTP Status Code',
                      example: 200,
                    },
                    success: {
                      type: 'boolean',
                      description: 'success/failure',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      description: 'API Message',
                      example: 'Data fetched.',
                    },
                    data: {
                      type: 'array',
                      description: 'data returned from the API',
                      example: [
                        {
                          _id: '633bbd26dc032fefe03501db',
                          name: 'Franklin Thaker',
                          email: 'Jarvisfranklinthaker@gmail.com',
                          role: 'user',
                          password: 'pwd@123',
                          status: true,
                          createdAt: new Date(),
                          updatedAt: new Date(),
                        },
                      ],
                    },

                  },
                },
              },
            },
          },
          500: {
            description: 'Server error',
          },
          401: {
            description: 'Authentication/Authorization error',
          },
        },
      },
    },
    '/api/v1/account/users/{userId}': {
      get: {
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: ['Users - CRUD'],
        description: 'Find User profile By userId',
        parameters: [
          {
            in: 'path',
            name: 'userId',
            schema: {
              type: 'string',
              example: '633bbd26dc032fefe03501db',
            },
            required: true,
            description: '_id of the user',
          },
        ],
        responses: {
          200: {
            description: 'Find user by userId.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    code: {
                      type: 'number',
                      description: 'HTTP Status Code',
                      example: 200,
                    },
                    success: {
                      type: 'boolean',
                      description: 'success/failure',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      description: 'API Message',
                      example: 'Data fetched.',
                    },
                    data: {
                      type: 'object',
                      description: 'data returned from API',
                      example: {
                        _id: '633bbd26dc032fefe03501db',
                        name: 'Franklin Thaker',
                        email: 'Jarvisfranklinthaker@gmail.com',
                        role: 'user',
                        password: 'pwd@123',
                        status: true,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: 'Server error',
          },
          401: {
            description: 'Authentication/Authorization error',
          },
        },
      },
      delete: {
        security: [
          {
            ApiKeyAuth: [],
          },
        ],
        tags: ['Users - CRUD'],
        description: 'Delete User profile By userId',
        parameters: [
          {
            in: 'path',
            name: 'userId',
            schema: {
              type: 'string',
              example: '633bbd26dc032fefe03501db',
            },
            required: true,
            description: '_id of the user',
          },
        ],
        responses: {
          200: {
            description: 'Delete user by _id',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    code: {
                      type: 'number',
                      description: 'HTTP Status Code',
                      example: 200,
                    },
                    success: {
                      type: 'boolean',
                      description: 'success/failure',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      description: 'API Message',
                      example: 'Data deleted.',
                    },
                    data: {
                      type: 'object',
                      description: 'data returned from API',
                      example: {
                        _id: '633bbd26dc032fefe03501db',
                        name: 'Franklin Thaker',
                        email: 'Jarvisfranklinthaker@gmail.com',
                        role: 'user',
                        password: 'pwd@123',
                        status: true,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: 'Server error',
          },
          401: {
            description: 'Authentication/Authorization error',
          },
        },
      },
    },
    '/api/v1/account/register': {
      post: {
        tags: ['Users - CRUD'],
        description: 'Register Users',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Name of the user',
                    example: 'Franklin Thaker',
                  },
                  email: {
                    type: 'string',
                    description: 'Email address of the user',
                    example: 'Jarvisfranklinthaker@gmail.com',
                  },
                  role: {
                    type: 'string',
                    description: 'Role of the user -> user, admin etc.',
                    example: 'user',
                  },
                  password: {
                    type: 'string',
                    description: 'Password of the user',
                    example: 'pwd@123',
                  },
                  status: {
                    type: 'boolean',
                    description: 'Status of the user [enabled/disabled] - bydefault it will be set to true if you do not provide this field!',
                    example: true,
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Register new users',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    code: {
                      type: 'number',
                      description: 'HTTP Status Code',
                      example: 200,
                    },
                    success: {
                      type: 'boolean',
                      description: 'success/failure',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      description: 'API Message',
                      example: 'Registration successfully completed.',
                    },
                    data: {
                      type: 'object',
                      description: 'data returned from API',
                      example: {
                        _id: '633bbd26dc032fefe03501db',
                        name: 'Franklin Thaker',
                        email: 'Jarvisfranklinthaker@gmail.com',
                        role: 'user',
                        password: 'pwd@123',
                        status: true,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: 'Server error',
          },
        },
      },
    },
    '/api/v1/account/login': {
      post: {
        tags: ['Users - CRUD'],
        description: 'Login User',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: {
                    type: 'string',
                    description: 'Email address of the user',
                    example: 'Jarvisfranklinthaker@gmail.com',
                  },
                  password: {
                    type: 'string',
                    description: 'Password of the user',
                    example: 'pwd@123',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Log-In User',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    code: {
                      type: 'number',
                      description: 'HTTP Status Code',
                      example: 200,
                    },
                    success: {
                      type: 'boolean',
                      description: 'success/failure',
                      example: true,
                    },
                    message: {
                      type: 'string',
                      description: 'API Message',
                      example: 'User successfully logged in.',
                    },
                    data: {
                      type: 'object',
                      description: 'data returned from API',
                      example: {
                        user: {
                          _id: '633bbd26dc032fefe03501db',
                          name: 'Franklin Thaker',
                          email: 'Jarvisfranklinthaker@gmail.com',
                          role: 'user',
                          password: 'pwd@123',
                          status: true,
                          createdAt: new Date(),
                          updatedAt: new Date(),
                        },
                        token: 'Token123',
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: 'Server error',
          },
        },
      },
    },
  },
};
