import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

// Configuración básica de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Express.js con TypeScript',
      version: '1.0.0',
      description: 'Una API REST completa con gestión de usuarios, autenticación y productos desarrollada con Express.js y TypeScript',
      contact: {
        name: 'API Support',
        email: 'support@api.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
     servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo'
      },
      {
        url: 'http://192.168.1.41',
        description: 'Servidor en la red local de la VM'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token de autenticación obtenido del endpoint /api/auth/login'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único del usuario'
            },
            name: {
              type: 'string',
              description: 'Nombre completo del usuario'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario (único)'
            },
            password: {
              type: 'string',
              description: 'Contraseña del usuario'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación del usuario'
            }
          }
        },
        Product: {
          type: 'object',
          required: ['name', 'description', 'price', 'stock', 'category'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único del producto'
            },
            name: {
              type: 'string',
              description: 'Nombre del producto'
            },
            description: {
              type: 'string',
              description: 'Descripción detallada del producto'
            },
            price: {
              type: 'number',
              format: 'float',
              minimum: 0,
              description: 'Precio del producto'
            },
            stock: {
              type: 'integer',
              minimum: 0,
              description: 'Cantidad en stock'
            },
            category: {
              type: 'string',
              description: 'Categoría del producto',
              enum: ['Tecnología', 'Audio', 'Muebles', 'Electrodomésticos', 'Deportes', 'Hogar', 'Jardín', 'Ropa', 'Libros', 'Juguetes', 'Belleza', 'Mascotas']
            },
            active: {
              type: 'boolean',
              description: 'Estado activo del producto',
              default: true
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación del producto'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario'
            },
            password: {
              type: 'string',
              description: 'Contraseña del usuario'
            }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Indica si la operación fue exitosa'
            },
            message: {
              type: 'string',
              description: 'Mensaje descriptivo de la respuesta'
            },
            user: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer'
                },
                name: {
                  type: 'string'
                },
                email: {
                  type: 'string'
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time'
                }
              }
            },
            token: {
              type: 'string',
              description: 'Token de autenticación para usar en requests protegidos'
            }
          }
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Indica si la operación fue exitosa'
            },
            message: {
              type: 'string',
              description: 'Mensaje descriptivo de la respuesta'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              description: 'Descripción del error ocurrido'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Autenticación',
        description: 'Endpoints para manejo de autenticación de usuarios'
      },
      {
        name: 'Usuarios',
        description: 'Endpoints para gestión de usuarios (requieren autenticación)'
      },
      {
        name: 'Productos',
        description: 'Endpoints para gestión de productos (requieren autenticación)'
      }
    ]
  },
  apis: [
    './src/routes/*.ts',
    './src/app.ts'
  ]
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Application): void => {
  // Endpoint para la documentación JSON
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

  // Endpoint para la interfaz web de Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'API Documentation - Express.js TypeScript',
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true
    }
  }));

  console.log('📚 Swagger UI disponible en: http://localhost:3000/api-docs');
  console.log('📄 Swagger JSON disponible en: http://localhost:3000/api-docs.json');
};

export { specs };
