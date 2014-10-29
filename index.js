var equal = require('equals')

/**
 * Defers the evaluation of a subtree until the last
 * possible moment
 *
 * @param {Function} render
 * @param {Array} args
 */

function ThunkNode(render, args) {
  this.fn = render
  this.arguments = args
  this.cache = undefined
}

ThunkNode.prototype.type = 'Thunk'

/**
 * Evaluate the thunk lazily
 *
 * @param {ThunkNode} previous
 * @return {VirtualNode}
 */

ThunkNode.prototype.call = function(previous) {
  if (this.cache) return this.cache
  return this.cache = !previous || !this.equal(previous)
    ? this.render()
    : previous.cache
}

/**
 * Evaluate the thunk eagerly
 *
 * @return {VirtualNode}
 */

ThunkNode.prototype.render = function(){
  return this.fn.apply(this, this.arguments)
}

/**
 * Decide if `this` will render the same DOM as `previous`
 *
 * @param {ThunkNode} previous
 * @return {Boolean}
 */

ThunkNode.prototype.equal = function(previous) {
  if (this.fn !== previous.fn) return false
  var a = this.arguments
  var b = previous.arguments
  if (a.length !== b.length) return false

  for (var i = 0, len = a.length; i < len; i++) {
    if (!equal(a[i],  b[i])) return false
  }

  return true
}

module.exports = ThunkNode
