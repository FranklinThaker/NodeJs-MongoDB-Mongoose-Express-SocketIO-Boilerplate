const password = 'pwd@123';
const exampleData = {
  id: '633bbd26dc032fefe03501db',
  type: 'users',
  attributes: {
    name: 'test_user',
    email: 'test@test.com',
    role: 'user',
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};
const security = [{ ApiKeyAuth: [] }];
const tags = ['Users'];

exports.usersApiDocumentation = {
  '/api/v1/users': {
    get: {
      security,
      tags,
      description: 'Get all users',
      responses: {
        200: {
          description: 'Get all users',
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
                    example: [exampleData],
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
    post: {
      tags,
      description: 'Register new user',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Name of the user',
                  example: exampleData.attributes.name,
                },
                email: {
                  type: 'string',
                  description: 'Email address of the user',
                  example: exampleData.attributes.email,
                },
                role: {
                  type: 'string',
                  description: 'Role of the user -> user, admin etc.',
                  example: exampleData.attributes.role,
                },
                password: {
                  type: 'string',
                  description: 'Password of the user',
                  example: password,
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
          description: 'Register new user',
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
                    type: 'array',
                    description: 'data returned from the API',
                    example: [exampleData],
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
  '/api/v1/users/{userId}': {
    get: {
      security,
      tags,
      description: 'Find user by id',
      parameters: [
        {
          in: 'path',
          name: 'userId',
          schema: {
            type: 'string',
            example: exampleData.id,
          },
          required: true,
          description: '_id of the user',
        },
      ],
      responses: {
        200: {
          description: 'Find user by id',
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
                    example: [exampleData],
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
      security,
      tags,
      description: 'Delete user by id',
      parameters: [
        {
          in: 'path',
          name: 'userId',
          schema: {
            type: 'string',
            example: exampleData.id,
          },
          required: true,
          description: '_id of the user',
        },
      ],
      responses: {
        200: {
          description: 'Delete user by id',
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
                    type: 'array',
                    description: 'data returned from the API',
                    example: [exampleData],
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
    put: {
      security,
      tags,
      description: 'Update user by id',
      parameters: [
        {
          in: 'path',
          name: 'userId',
          schema: {
            type: 'string',
            example: exampleData.id,
          },
          required: true,
          description: '_id of the user',
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'new name of the user',
                  example: 'testing_new_name',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Update user by id',
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
                    example: 'Data updated.',
                  },
                  data: {
                    type: 'array',
                    description: 'data returned from the API',
                    example: [exampleData],
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
  '/api/v1/users/login': {
    post: {
      tags,
      description: 'Login with email & password',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  description: 'Email address of the user',
                  example: exampleData.attributes.email,
                },
                password: {
                  type: 'string',
                  description: 'Password of the user',
                  example: password,
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Log-In with email & password',
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
                    type: 'array',
                    description: 'data returned from the API',
                    example: [{ ...exampleData, attributes: { ...exampleData.attributes, token: 'encrypted_login_token' } }],
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
};
