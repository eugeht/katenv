<script setup>
// Vue
import { onMounted, onBeforeUnmount } from 'vue'
// Helpers
import { loadImage, randFloat, sleep, debounce } from '@/utils/helpers'
// Assets
import W1Png from '@/assets/images/wow/W_1.png'
import O1Png from '@/assets/images/wow/O_1.png'
import W2Png from '@/assets/images/wow/W_2.png'


// ..
const letters = []

const speed = 1
const decay = 0.2

let lettersWidth = 0
let letterSizeCoef = 1

let c
let canvasH
let canvasW

const calcLetterSizeCoef = () => {
  if ( ( lettersWidth / canvasW ) >= 1.25 ) {
    letterSizeCoef = canvasW / lettersWidth * 1.5
  } else {
    letterSizeCoef = 1
  }
}

const handleResizeDebounce = debounce( () => handleResize(), 500 )

const handleResize = () => {
  const m = document.querySelector( '.the-navigation' )
  console.log(m.offsetHeight)
  
  canvasW = document.body.offsetWidth
  canvasH = document.body.offsetHeight - m.offsetHeight

  c.width = canvasW * 2
  c.height = canvasH * 2

  c.style.width = `${ canvasW }px`
  c.style.height = `${ canvasH }px`

  calcLetterSizeCoef()
}


//
onMounted( async () => {
  window.addEventListener("resize", handleResizeDebounce);

  c = document.getElementById("canvas-wow");

  handleResize()

  var ctx = c.getContext("2d");


  const resetLetter = ( letterIndex ) => {
    const letter = letters[letterIndex]

    letter.vx = randFloat( 3, 10 ) * ( randFloat( -1, 1) > 0 ? 1 : -1 ) * letterSizeCoef
    if ( letter.vx > 0 ) {
      letter.vx += 1 * letterSizeCoef
    } else {
      letter.vx -= 1 * letterSizeCoef
    }
    letter.vy = 4 * Math.random() * letterSizeCoef * ( randFloat( -1, 1) > 0 ? 1 : -4 );
    letter.cx = getLetterCxPosition( letterIndex );
    letter.cy = getLetterCyPosition();
  }

  const getLetterCxPosition = ( letterIndex ) => {
    const letterPosition = letters
      .filter( ( a, i ) => { 
        return i < letterIndex ? true : false 
      } )
      .reduce( ( a, c ) => {
        return a + c.size[0]
      }, 0 )

    return canvasW - lettersWidth * letterSizeCoef / 2 + letterPosition * letterSizeCoef
  }

  const getLetterCyPosition = () => {
    return canvasH * 0.4
  }


  // ..
  await Promise.all( [
    loadImage( W1Png ),
    loadImage( O1Png ),
    loadImage( W2Png ),
  ] ).then( ( values ) => {
    // Prepare data
    lettersWidth = 0

    // Set sizes
    for ( const [ , img] of values.entries() ) {
      // Calc text width
      lettersWidth += img.width

      // Save to obj
      letters.push( { 
        img: img,
        size: [ 
          img.width, 
          img.height,
        ],
        active: false,
      } )
    }

    calcLetterSizeCoef()

    // Set speed and decay
    for ( const [ letterIndex ] of letters.entries() ) {
      resetLetter( letterIndex )
    }

    // Start animation
    draw()

    animate();

    sleep( 1000 )
    .then( () => {
      letters[ 2 ].active = true
    } )

    sleep( 2000 )
    .then( () => {
      letters[ 1 ].active = true
    } );

    sleep( 3000 )
    .then( () => {
      letters[ 0 ].active = true
    } )
  } )


  function draw() {
    for ( let [letterIndex, letter] of letters.entries() ) {
      let WW = letter.size[ 0 ]
      let WH = letter.size[ 1 ]

      if ( letter.active ) {
        letter.cx += letter.vx * speed
        letter.cy += letter.vy * speed
        letter.vy += decay
  
        //bounce
        if ( letter.cy >= canvasH * 2 - WH * letterSizeCoef ){
          letter.cy = canvasH * 2 - WH * letterSizeCoef
          letter.vy = letter.vy * -1 * 0.7 + ( 1.0 - ( Math.random() * 2.0 ) );
  
          if ( letter.vy > 0.1 ) {
            letter.vy = -1
          }
        }
      }

      // Reset
      if ( letter.cx <= -WW * letterSizeCoef || letter.cx >= canvasW * 2 ){
        resetLetter( letterIndex )
      }

      ctx.drawImage(
        letter.img,
        0,
        0,
        WW,
        WH,
        Math.round( letter.cx + 0.5 ),//on screen X
        Math.round( letter.cy + 0.5 ),//on screen Y
        WW * letterSizeCoef,
        WH * letterSizeCoef
      );
    }
  }


  function animate() {
    requestAnimationFrame( animate );
    draw()
  }
} )

onBeforeUnmount( () => {
  window.removeEventListener("resize", handleResizeDebounce);
} )
</script>



<template>
  <main class="wow">
    <canvas 
      class="wow-canvas" 
      id="canvas-wow" 
      width="100%" 
      height="100%"
    />
    <!-- <div class="wow-word">
      <span>W</span>
      <span>O</span>
      <span>W</span>
    </div> -->
  </main>
</template>



<style lang="scss">
  .wow {
    position: relative;

    width: 100%;
    height: 100%;
    display: flex;
  }

  .wow-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // width: 800px;
    // height: 600px;
  }

  .wow-word {
    position: relative;
    padding-bottom: 12vh;
    margin: auto;
    transform: skew(-2deg, 0);
    font-style: italic;
    color: #fff;
    -webkit-text-fill-color: #fff;
    -webkit-text-stroke: 0.023em #000;

    // animation: zoomInDown 1s linear;

    // text-shadow: 0.04em 0.04em 0 #999;
    text-shadow: 0.04em 0.04em 0 #ffe70b;

    font-size: 27vw;
    line-height: 1;
    font-family: Arial, sans-serif;
    font-weight: 700;

    @media only screen and (min-width: 900px) {
      font-size: 18vw;
    }

    span {
      display: inline-block;
      transition: all 0.3s linear;
    }

    span:hover {
      transform: rotate(180deg);
    }

    span:nth-child(1) {
      color: #f0483f;
      -webkit-text-fill-color: #f0483f;
    }

    span:nth-child(2) {
      color: #05a786;
      -webkit-text-fill-color: #05a786;
    }

    span:nth-child(3) {
      color: #403f98;
      -webkit-text-fill-color: #403f98;
    }
  }
</style>