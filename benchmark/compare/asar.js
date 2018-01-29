var bench = require( 'nanobench' )
var path = require( 'path' )
var asyncFor = require( '../async-iter' )
var asar = require( 'asar' )

const ITERATIONS = 100
const filename = path.join( __dirname, '..', '..', 'test', 'data', 'app.asar' )

bench( `something ⨉ ${ITERATIONS}`, function( run ) {
  run.start()
  for( var i = 0; i < ITERATIONS; i++ ) {
    continue
  }
  run.end()
})

bench( `list files ⨉ ${ITERATIONS}`, function( run ) {

  var task = ( next ) => {
    asar.listPackage( filename )
    asar.uncacheAll()
    next()
  }

  run.start()

  asyncFor( task, ITERATIONS, () => {
    run.end()
  })

})
