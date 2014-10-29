
var Thunk = require('..')

it('Thunk#equal', function(){
  assert( new Thunk(it, []).equal(new Thunk(it, [])))
  assert( new Thunk(it, [1]).equal(new Thunk(it, [1])))
  assert(!new Thunk(it, [1]).equal(new Thunk(it, [])))
  assert( new Thunk(it, [{}]).equal(new Thunk(it, [{}])))
  assert(!new Thunk(describe, [{}]).equal(new Thunk(it, [{}])))
})

it('Thunk#call', function(){
  function one(){ return 1 }
  var thunk = new Thunk(one, [])
  thunk.cache = 2
  assert(new Thunk(one, []).call() == 1)
  assert(new Thunk(one, []).call(thunk) == 2)
  assert(thunk.call(new Thunk(it, [])) == 2)
  assert(new Thunk(one, []).call(new Thunk(it, [])) == 1)
})
