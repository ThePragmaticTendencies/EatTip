let deepCopy = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}

export { deepCopy }
