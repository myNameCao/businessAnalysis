function forEach(obj, fn) {
  // Iterate over object keys
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      fn.call(null, obj[key], key, obj)
    }
  }
}

function extend(a, b, thisArg) {
  let fn = function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg)
    } else {
      a[key] = val
    }
  }
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      fn.call(null, obj[key], key, obj)
    }
  }
  return a
}
