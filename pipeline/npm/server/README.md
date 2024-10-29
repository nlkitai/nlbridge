# `nlbridge` Dev Server 🌲💬 🌉

![Free And Open Source](https://img.shields.io/badge/Free%20%26%20Open%20Source-1ccb61)

## About `nlbridge`

`@lbridge` is a Node.js library that provides utilities, middleware, and a development server for **building APIs
powered by large language models**. It's designed to easily integrate with [`nlux`](https://nlux.ai), the conversational
UI React and JS library, but it can also be used independently with any other client.

This package `@nlbridge/server` is the dev server for `nlbridge`. It provides a simple way to launch proxy
server to connect to OpenAI's APIs, using the `nlbridge` Express.js middleware.

If you are looking to build your own server, you can use the `@nlbridge/express` package to integrate `nlbridge` with
your own Express.js server, or use the `@nlbridge/core` package to build your own custom server.

## Launching `@nlbridge/server`

To launch the development server, you can use the `npx` command line tool:

```bash
npx @nlbridge/server --api openai
```

Command line options are available to customize the server configuration. You can use the `--help` option to see the
available options:

```bash
npx @nlbridge/server --help
```

```bash
@nlbridge dev server CLI

Usage:
  @nlbridge/server [params]

Required:
  --api <openai>     The AI backend to use
                      Only OpenAI is supported at the moment

Optional:
  --apiKey <key>      The API key to use for the AI backend
                       Default: Read from environment variable (e.g. OPENAI_API_KEY)

  --port [port]        Port to use for HTTP server - Default: Random value between 8000 and 8999
  --cors <origin>      Enable CORS for the specified origin - Default: "*"
  --endpoint [path]    Endpoint to use for HTTP server - Default: /

  --debug              Show debug information
  --help               Show help
```

## Endpoint API

Once the server is running, you can access the API at the following endpoint:

```
POST http://localhost:<port>/<endpoint>
```

The API expects a JSON payload with the following structure:

```json
{
  "action": "<action>",
  "payload": {
    // Payload data
  }
}
```

The following actions are supported:

| Action        | Payload Format          | Description                                                                              |
|---------------|-------------------------|------------------------------------------------------------------------------------------|
| `chat`        | `{ "message": string }` | Send a message to the AI model and receive a response in one block.                      |
| `chat-stream` | `{ "message": string }` | Send a message to the AI model and receive a response in a stream of server-sent events. |

## Using The Express.js middleware

The `nlbridge` server is built on top of the **`nlbridge` middleware for Express.js**.  
You can use the middleware in your own Express.js server by installing the `@nlbridge/express` package.

To learn more, please refer to the [@nlbridge/express](https://www.npmjs.com/package/@nlbridge/express) package.

## Building Web Apps with `nlux` and `nlbridge`

`nlbridge` is designed to work seamlessly with `nlux`, a feature-rich library for building conversational UIs.
To learn more, please refer to the [nlux documentation](https://nlux.dev).
