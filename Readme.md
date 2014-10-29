
# Thunk-Node

  A lazily evaluated virtual DOM node which enables you to avoid the allocation cost of rerendering subtrees and preserve `===` identity

## Installation

With [packin](//github.com/jkroso/packin): `packin add jsiom/thunk-node`

then in your app:

```js
var ThunkNode = require('thunk-node')
```

## API

### `ThunkNode(render::Function, arguments::Array)`

```js
new ThunkNode(function(state){
  return new VirtualNode('h1', {}, [new VirtualText(state.title)])
})
```

`ThunkNode` takes a `render` function which returns a virtual DOM node, possibly created using [jsiom/create][//github.com/jsiom/create], and an `Array` of arguments. If the `ThunkNode` ever ends up needing to call the `render` function it will pass these as arguments

### `ThunkNode#call([previous])`

Evaluates the `ThunkNode` returning a virtual DOM node

### `ThunkNode#equal(previous::ThunkNode)`

Determine if the `ThunkNode` will evaluate to the same DOM as `previous`
