# `nlbridge` Express.js 🌲💬 🌉

![Free And Open Source](https://img.shields.io/badge/Free%20%26%20Open%20Source-1ccb61)

## About `nlbridge`

`nlbridge` is a Node.js library that provides utilities, middleware, and a development server for **building APIs
powered by large language models**.

This package `@nlbridge/express` provides an Express.js middleware for `nlbridge`. It can be used to build custom APIs
that connect to large language models, and expose them as HTTP endpoints. It's designed to easily integrate with
[`nlux`](https://nlux.ai) (the conversational UI React and JS library), but it can also be used independently with any
other client.

## Using `@nlbridge/express`

To use the `nlbridge` middleware in your own Express.js server, install the `@nlbridge/express` package:

```sh
npm install @nlbridge/express
```

Then, use the middleware in your Express.js server:

```js
import {middleware} from '@nlbridge/express';

const app = express();

app.use(middleware(
    // The AI backend to use (e.g. 'openai'). Only OpenAI is supported at the moment.
    'openai',
    // Configuration object. Ref below for details.
    actions,
));
```

Config is an object with the following type:

```ts
type MiddlewareConfig = {
    apiKey?: string;
    chatModel?: string;
    chatMode?: 'stream' | 'block';
};
```

## Building UIs with `nlux` and `nlbridge`

`nlbridge` is designed to work seamlessly with `nlux`, the conversational UI library for any large language model.  
To learn more, please refer to the [nlux documentation](https://nlux.dev).