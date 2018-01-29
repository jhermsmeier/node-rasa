var bench = require( 'nanobench' )
var path = require( 'path' )
var asyncFor = require( '../async-iter' )
var rasa = require( '../../' )

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

  var archive = new rasa.Archive()
  var task = ( next ) => {
    rasa.listPackage( filename )
    next()
    // archive.open( filename, () => {
    //   archive.close( () => {
    //     next()
    //   })
    // })
  }

  run.start()

  asyncFor( task, ITERATIONS, () => {
    run.end()
  })

})
