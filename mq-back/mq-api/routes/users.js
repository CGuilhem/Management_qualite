'use strict'
const { getUsers, deleteUser, updateUser, createUser } = require('../controllers/users')

module.exports = async function(fastify, opts) {
    fastify.route({
        url: '/api/v1/users',
        method: ['GET'],
        // request and response schema
        schema: {
            summary: 'Get array of users and associated data',
            description: 'Returns a list of users',
            tags: ['Users'],
            params: {},
            response: {
                200: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'number' },
                        firstName: { type: 'string' },
                        lastName: { type: 'string' },
                        address: { type: 'string' },
                        birthDate: { type: 'string' },
                        zipCode: { type: 'string' },
                        city: { type: 'string' },
                      },
                    },
                },
            }
        },
        // the function that will handle this request
        handler: async (request, reply) => {
            const users = await getUsers()
            reply.send(users)
        }
    })

    fastify.route({
        url: '/api/v1/users/:id',
        method: ['DELETE'],
        // request and response schema
        schema: {
            summary: 'Delete a user',
            description: 'Delete a user and then return a message',
            tags: ['Users'],
            params: {
                type: 'object',
                properties: {
                    id: {
                        type: 'number',
                        description: 'a User id'
                    }
                }
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                    statusCode: { type: 'number' },
                    message: { type: 'string' },
                    },
                },
            }
        },
        // the function that will handle this request
        handler: async (request, reply) => {
            const { id } = request.params
            const users = await deleteUser(id)
            const response = {
                statusCode: 200,
                message: "user deleted"
            }
            reply.send(response)
        }
    })

    fastify.route({
        url: '/api/v1/users/:id',
        method: ['PUT'],
        // request and response schema
        schema: {
            summary: 'Update a user',
            description: 'Update a user and then return a message',
            tags: ['Users'],
            params: {
                type: 'object',
                properties: {
                    id: {
                        type: 'number',
                        description: 'a User id'
                    }
                }
            },
            body: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  firstName: { type: 'string' },
                  lastName: { type: 'string' },
                  address: { type: 'string' },
                  birthDate: { type: 'string' },
                  zipCode: { type: 'string' },
                  city: { type: 'string' },
                },
              },
            response: {
                200: {
                    type: 'object',
                    properties: {
                    statusCode: { type: 'number' },
                    message: { type: 'string' },
                    },
                },
            }
        },
        // the function that will handle this request
        handler: async (request, reply) => {
            const { id } = request.params
            const body = request.body
            const users = await updateUser(id, body)
            const response = {
                statusCode: 200,
                message: "user updated"
            }
            reply.send(response)
        }
    })

    fastify.route({
        url: '/api/v1/users',
        method: ['POST'],
        // request and response schema
        schema: {
            summary: 'Create a user',
            description: 'Create a user and then return a message',
            tags: ['Users'],
            body: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  firstName: { type: 'string' },
                  lastName: { type: 'string' },
                  address: { type: 'string' },
                  birthDate: { type: 'string' },
                  zipCode: { type: 'string' },
                  city: { type: 'string' },
                },
              },
            response: {
                200: {
                    type: 'object',
                    properties: {
                    statusCode: { type: 'number' },
                    message: { type: 'string' },
                    },
                },
            }
        },
        // the function that will handle this request
        handler: async (request, reply) => {
            const body = request.body
            const users = await createUser(body)
            const response = {
                statusCode: 200,
                message: "user created"
            }
            reply.send(response)
        }
    })
}