var path = require( 'path' )
var pack = require( '../lib/pack' )
var argv = process.argv.slice( 2 )

var src = argv.shift() || process.cwd()
var dst = path.join( process.cwd(), 'rasa.asar' )
var options = {
  ignore: [
    // Exclude hidden files
    '.*',
    // Exclude archives
    '*.asar',
    // Exclude (executable) binaries and supplements
    '*.{node,lib,dylib,lproj,dll,exe}',
    // Exclude readmes & licenses (those should be made available through the UI)
    '{LICENSE,license,README,readme}',
    // Exclude other plaintext files (most likely) not required
    '*.{md,rst,txt,html,css}',
    // Exclude package tests, benchmarks & documentation (we won't be running them in a packaged app)
    '**/{test,benchmark,doc,example,tests,benchmarks,docs,examples}',
    // Exclude native source files
    '**/src', '*.{h,hpp,c,cc,cpp,m,swift,cs}',
    // Exclude TypeScript type definitions
    '*.d.ts',
  ]
}

pack( src, dst, options, function( error ) {
  console.log( error || 'OK' )
})
