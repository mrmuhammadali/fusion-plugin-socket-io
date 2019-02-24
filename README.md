# fusion-plugin-socket-io

Socket.io implementation for fusion apps.

You are welcome to contribute in following:
1. Unit Testing
2. Integration Testing
3. Flow Types
4. Opening issues
5. Any other improvements

---

### Table of contents

- [Installation](#installation)
- [Setup](#setup)
- [API](#api)
  - [Registration API](#registration-api)
  - [Dependencies](#dependencies)
- [withSocket (HOC)](#with-socket)

---

### Installation

```
yarn add fusion-plugin-socket-io
```

---

### Setup

```js
// Compiler configuration is required to use this plugin 
// .fusionrc.js
module.exports = {
  nodeBuiltins: {
    process: true,
    Buffer: true,
  },
}


// src/main.js
import React from 'react';
import App from 'fusion-core';
import SocketIO, {
  SocketIOConfigToken,
  SocketIOHandlersToken
} from 'fusion-plugin-socket-io';

// Define your socket listeners and methods server side
const handlers = __NODE__ && {
  chat: (data, socket) => {
    socket.emit('some-event', {some: 'data' + data})
  },
  something: (data, socket) => {
    doSomething()
    ...
  },
};

export default () => {
  const app = new App(<div />);

  app.register(SocketIO);
  app.register(SocketIOConfigToken, { port: 4500 });
  __NODE__ && app.register(SocketIOHandlersToken, handlers)

  return app;
};
```

---

### API

#### Registration API

##### `SocketIO`

```js
import SocketIO from 'fusion-plugin-socket-io'
```

The Socket.io plugin. Registers socket.io on both client and server.

#### Dependencies

##### `SocketIOHandlersToken`

```js
import { SocketIOHandlersToken } from 'fusion-plugin-socket-io'
```

Configures what Socket.io listeners handlers exist. Required. Server-only.

###### Types

```flow
type SocketIOHandlers = Object<string, (data: any, socket: Socket) => void>
```

You can register a value of type `SocketIOHandlers` or a Plugin that provides a value
of type `SocketIOHandlers`.

##### `SocketIOConfigToken`

```js
import { SocketIOConfigToken } from 'fusion-plugin-socket-io'
```

Configures Socket.io port and origins. Optional.

###### Types

```flow
type SocketIOConfig = { port: number, origin: string | Array<string> }
```

---

### withSocket (HOC)

A higher order component to configure socket.io on client.

#### Usage

```js
import { withSocket } from 'fusion-plugin-socket-io'

const SomeComponent = ({ listenerPayload, emitter, socketClient }) => (
  <div>
    <button onClick={() => emitter('Hello World!')}>Click to emit</button>
    <p>{listenerPayload}</p>
    <p>{socketClient.id}</p>
  </div>
)
const options = { listener: 'listenerPayload', emitter: 'emitter' }

withSocket(options)(SomeComponent)
```

withSocket injects:

1. an emitter function as given key in socketOptions.
2. listener payload as given key in socketOptions.
3. socket client instance as socketClient.

###### Types

```flow
type SocketIOOptions = { listener: string, emitter: string }
```
