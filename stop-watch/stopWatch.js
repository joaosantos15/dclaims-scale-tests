exports = module.exports

exports.init = function () {
  global.timerRegistry = {}
  global.performanceRegistry = {}
}

exports.mark = function (tag) {
  let currTime = new Date()
  global.timerRegistry[tag] = currTime
}

exports.measure = function (measureTag, initTag, endTag) {
  let elapsed = global.timerRegistry[endTag] - global.timerRegistry[initTag]
  global.performanceRegistry[measureTag] = elapsed
  console.log(':: ' + global.performanceRegistry[measureTag])
}

exports.dump = function () {
  let retValue = global.performanceRegistry
  return retValue
}

exports.clear = function () {
  global.performanceRegistry = {}
  global.timerRegistry = {}
  return true
}
