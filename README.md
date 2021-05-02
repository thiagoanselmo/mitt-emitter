# mitt-emitter
This is a redesigned package to add the concept of topics like RabbitMQ. You can now use the special characters "*" and "#" to get a topic.

The original package you can find at: https://github.com/developit/mitt - © [Jason Miller]

-   **Familiar:** same names & ideas as [Node's EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)
-   **Functional:** methods don't rely on `this`
-   **Great Name:** somehow [mitt-emitter](https://npm.im/mitt-emitter) wasn't taken

## Table of Contents

-   [Install](#install)
-   [Usage](#usage)

## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

```sh
$ npm install --save mitt-emitter
```

Then with a module bundler like [rollup](http://rollupjs.org/) or [webpack](https://webpack.js.org/), use as you would anything else:

```javascript
// using ES6 modules
import MittEmitter from 'mitt-emitter'

// using CommonJS modules
var MittEmitter = require('mitt-emitter')
```

The [UMD](https://github.com/umdjs/umd) build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/mitt-emitter/dist/mitt-emitter.umd.js"></script>
```

## Usage

```js
import MittEmitter from 'mitt-emitter'

const emitter = new MittEmitter();

// listen to an event
emitter.on('foo', e => console.log('foo', e) )

// listen topic event
emitter.on('organization.*.device.1', (type, e) => console.log(type, e) )
emitter.emit('organization.1.device.1', { a: 'b' })

// listen topic event
emitter.on('organization.*.device.*', (type, e) => console.log(type, e) )
emitter.emit('organization.2.device.2', { a: 'b' })

// listen topic event
emitter.on('organization.*.device.#', (type, e) => console.log(type, e) )
emitter.emit('organization.1.device.1.apple.linux', { a: 'b' })

// listen topic event
emitter.on('organization.#', (type, e) => console.log(type, e) )
emitter.emit('organization.1.device.1.apple.linux', { a: 'b' })

// working with handler references:
function onFoo() {}
emitter.on('foo', onFoo)   // listen
emitter.off('foo', onFoo)  // unlisten
```
## License

[MIT License](https://opensource.org/licenses/MIT) © [Thiago Anselmo](https://jasonformat.com/)