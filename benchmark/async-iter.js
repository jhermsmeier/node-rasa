module.exports = function asyncIter( task, iterations, callback ) {

  var i = 0
  var run = () => {
    i++ < iterations ?
      task( run ) :
      callback()
  }

  run()

}
