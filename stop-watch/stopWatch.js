exports = module.exports

exports.init = function () {
  global.timerRegistry = {}
  global.performanceRegistry = {}
}

exports.mark = function (tag) {
  let currTime = new Date()
  timerRegistry[tag] = currTime
}

exports.measure = function (measureTag, initTag, endTag) {
  let elapsed = timerRegistry[endTag] - timerRegistry[initTag]
  performanceRegistry[measureTag] = elapsed
  console.log(':: ' + performanceRegistry[measureTag])
}

exports.dump = function () {
  let retValue = performanceRegistry
  performanceRegistry = {}
  return retValue
}
