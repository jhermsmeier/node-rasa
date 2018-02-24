var fs = require( 'fs' )
var path = require( 'path' )
var assert = require( 'assert' )
var inspect = require( './inspect' )
var rasa = require( '..' )

describe( 'Archive', function() {

  var archive = null

  before( function( done ) {
    var filename = path.join( __dirname, 'data', 'pack.asar' )
    archive = new rasa.Archive()
    archive.open( filename, done )
  })

  after( function( done ) {
    archive.close( done )
  })

  specify( 'readdir', function() {
    var ls = archive.readdir( '/' )
    assert.ok( ls.length > 0 )
  })

  specify( 'readFile', function( done ) {
    var expected = fs.readFileSync( path.join( __dirname, '..', 'lib', 'archive.js' ) )
    archive.readFile( 'archive.js', function( error, buffer ) {
      assert.ifError( error )
      assert.deepEqual( expected, buffer )
      done()
    })
  })

  specify( 'createReadStream', function( done ) {
    var expected = fs.readFileSync( path.join( __dirname, '..', 'lib', 'archive.js' ), 'utf8' )
    var actual = ''
    archive.createReadStream( 'archive.js' )
      .on( 'error', done )
      .on( 'data', (chunk) => { actual += chunk })
      .on( 'end', () => {
        assert.deepEqual( expected, actual )
        done()
      })
  })

})
