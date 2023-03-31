const fs = require('fs-extra');
const path = require('path');
const glob = require("glob");
const sharp = require('sharp');



// fetch command line arguments
const arg = (argList => {

  let arg = {}, a, opt, thisOpt, curOpt;
  for (a = 0; a < argList.length; a++) {

    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^\-+/, '');

    if (opt === thisOpt) {

      // argument value
      if (curOpt) arg[curOpt] = opt;
      curOpt = null;

    }
    else {

      // argument name
      curOpt = opt;
      arg[curOpt] = true;

    }

  }

  return arg;

})( process.argv )



const BUILD_CDN_PATH = path.join( __dirname, 'src' )
const BUILD_ASSETS_PATH = path.join( BUILD_CDN_PATH, 'assets' )
const BUILD_IMAGES_PATH = path.join( BUILD_ASSETS_PATH, 'images' )



//  FUNCS ----------------------------------------------------------------------

// Copy Move and generate nextgen formats
const generateImages = async ( input_path ) => {
  glob( input_path, function ( err, files ) {
    if (err != null) { 
      throw err; 
    }
  
    files.forEach( async function( inputFile ) {
      console.log('File added to queue:', inputFile )

      sharp( inputFile )
        .webp( { 
          quality: 85, 
          alphaQuality: 95,
          force: true 
        } )
        .toFile( path.join( path.dirname( inputFile ), path.basename( inputFile, path.extname(inputFile))+'.webp' ), ( err, info ) => {
          console.log( 'Done WEBP: ', inputFile )
        } )
  
      sharp( inputFile )
        .avif( {
          quality: 85, 
          force: true 
        } )
        .toFile( path.join( path.dirname( inputFile ), path.basename( inputFile, path.extname(inputFile))+'.avif' ), ( err, info ) => {
          console.log( 'Done AVIF: ', inputFile )
        } )
    });
  });
}
// /FUNCS



// BUILD
const buildImages = async () => {
  const input_path = path.join( BUILD_IMAGES_PATH, '**', '*.{png,jpg,jpeg}' );

  await generateImages( input_path )
}



// Process images
buildImages()
