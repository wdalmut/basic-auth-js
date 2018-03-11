# Basic Authentication layer for @wdalmut/mini-auth

A simple authentication layer for `basic auth`

```
npm install --save @wdalmut/basic-auth
```

## Usage

```js
basic((username, password) => {
  return Promise.resolve({id: 1, ...})
})(res)
```

### Usage with `@wdalmut/mini-auth`

```js
// just an example
const fromDB = (username, password) => {
  return User.find(/*...*/),
};

auth(basic(fromDb))
```

