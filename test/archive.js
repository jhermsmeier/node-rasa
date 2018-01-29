var fs = require( 'fs' )
var path = require( 'path' )
var assert = require( 'assert' )
var inspect = require( './inspect' )
var rasa = require( '..' )

describe( 'Archive', function() {

  var archive = null

  before( function( done ) {
    var filename = path.join( __dirname, 'data', 'electron.asar' )
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
    archive.readFile( 'worker/init.js', function( error, buffer ) {
      assert.ifError( error )
      done()
    })
  })

})
