var rasa = require( '..' )
var inspect = require( '../test/inspect' )
var path = require( 'path' )
var argv = process.argv.slice(2)

var filename = argv.shift() || path.join( __dirname, '..', 'test', 'data', 'pack.asar' )
var archive = new rasa.Archive()

function close( error ) {
  if( error ) console.error( error.stack )
  archive.close(( error ) => {})
}

archive.open( filename, ( error ) => {
  if( error ) return void close( error )
  inspect.log( archive )
  console.log( '' )
  // console.log( 'readdir', inspect( archive.readdir( '/' ) ) )
  // console.log( 'getFileNode', inspect( archive.getFileNode( 'archive.js' ) ) )
  console.log( 'files', inspect( rasa.Archive.listFiles( archive.root ) ) )
  console.log( '' )
  // archive.readFile( 'archive.js', ( error, buffer ) => {
  //   console.log( error || buffer.toString() )
  //   console.log( '' )
  //   // archive.createReadStream( 'archive.js' )
  //   //   .pipe( process.stdout )
  //   //   .once( 'end', close )
  //   close()
  // })
  close()
})
