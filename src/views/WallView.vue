<script setup lang="ts">
// Vue
import { ref, type Ref, onMounted } from 'vue'
// Helpers
import { loadImage } from '@/utils/helpers'
// Assets
import Face1 from '@/assets/images/faces/face_1@2x.png'
import Face2 from '@/assets/images/faces/face_2@2x.png'
import Face3 from '@/assets/images/faces/face_3@2x.png'
import Face4 from '@/assets/images/faces/face_4@2x.png'
import Face5 from '@/assets/images/faces/face_5@2x.png'
import Face6 from '@/assets/images/faces/face_6@2x.png'
import Face7 from '@/assets/images/faces/face_7@2x.png'
import Faces from '@/assets/images/faces/faces@2x.png'



// Variables
const isDrag = ref( false )
const lastPosition: Ref<{
  x: null | number
  y: null | number
}> = ref( {
  x: null,
  y: null,
} )

const colors: string[] = [ '#322e2f', '#FFE70A', '#EF483E', '#00A886', '#403F97' ]
const currentColor: Ref<string> = ref( colors[ 0 ] )

const lineWidth = ref(20)

const nurieCanvas: Ref<HTMLCanvasElement | null> = ref(null)
const nurieCtx: Ref<CanvasRenderingContext2D | null> = ref(null)
const canvas: Ref<HTMLCanvasElement | undefined> = ref()
const ctx: Ref<CanvasRenderingContext2D | null> = ref( null )
const canvasFrame: Ref<HTMLCanvasElement | undefined> = ref()
const canvasFrameCtx: Ref<CanvasRenderingContext2D | null> = ref( null )


// const noPicture = ref(null)
const overlay = ref( true )
const isErase = ref( false )
const image: Ref<HTMLImageElement | undefined> = ref()


let activeImageIndex = 0

let imagesConfig = [ {
  image  : Face1,
  mobile : true,
}, {
  image  : Face2,
  mobile : true,
}, {
  image  : Face3,
  mobile : true,
}, {
  image  : Face4,
  mobile : true,
}, {
  image  : Face5,
  mobile : true,
}, {
  image  : Face6,
  mobile : true,
}, {
  image  : Face7,
  mobile : true,
}, {
  image  : Faces,
  mobile : false,
} ]

if ( window.innerWidth < 800 ) {
  imagesConfig = imagesConfig.filter( img => !!img.mobile )
}




const initImage = async ( img: string ) => {
  await loadImage( img ).then((res: unknown) => {
    if ( !canvas.value || !ctx.value || !nurieCanvas.value || !canvasFrame.value || !canvasFrameCtx.value ) {
      return
    }

    const loadedImage = res as HTMLImageElement


    canvasFrame.value.width = canvas.value.width = nurieCanvas.value.width = document.body.clientWidth * 2
    canvasFrame.value.height = canvas.value.height = nurieCanvas.value.height = document.body.clientHeight * 2

    canvasFrame.value.style.width = canvas.value.style.width = nurieCanvas.value.style.width = canvas.value.width / 2 + 'px'
    canvasFrame.value.style.height = canvas.value.style.height = nurieCanvas.value.style.height = canvas.value.height / 2 + 'px'

    const WW = loadedImage.naturalWidth
    const HH = loadedImage.naturalHeight

    canvasFrameCtx.value.drawImage(
      loadedImage, 
      0, 
      0, 
      WW, 
      HH,
      canvas.value.width / 2 - WW / 2, 
      canvas.value.height / 2 * 0.9 - HH / 2,
      WW, 
      HH
    )

    image.value = loadedImage
  })
}




const init = async () => {
  if ( canvas.value ) {
    ctx.value = canvas.value.getContext('2d')
  }
  if ( canvasFrame.value ) {
    canvasFrameCtx.value = canvasFrame.value.getContext('2d')
  }


  nurieCanvas.value = document.createElement('canvas')
  nurieCtx.value = nurieCanvas.value.getContext('2d')


  await initImage( imagesConfig[ 0 ].image );

  overlay.value = false
}


const dragStart = () => {
  nurieCtx.value?.beginPath()
  isDrag.value = true
}


const draw = (e: MouseEvent) => {
  if ( !canvas.value || !ctx.value || !nurieCtx.value || !nurieCanvas.value ) {
    return
  }

  const x = (e.clientX - canvas.value.getBoundingClientRect().left) * 2
  const y = (e.clientY - canvas.value.getBoundingClientRect().top) * 2
  if (!isDrag.value) {
    return
  }

  nurieCtx.value.lineCap = 'round'
  nurieCtx.value.lineJoin = 'round'
  nurieCtx.value.lineWidth = lineWidth.value
  nurieCtx.value.strokeStyle = currentColor.value

  if (lastPosition.value.x === null || lastPosition.value.y === null) {
    nurieCtx.value.moveTo(x, y)
  } else {
    nurieCtx.value.moveTo(lastPosition.value.x, lastPosition.value.y)
  }

  nurieCtx.value.lineTo(x, y)
  nurieCtx.value.stroke()

  lastPosition.value.x = x
  lastPosition.value.y = y

  ctx.value.drawImage(
    nurieCanvas.value,
    0,
    0,
    canvas.value.width,
    canvas.value.height
  )
}


const spDraw = (e: TouchEvent ) => {
  console.log( e.changedTouches )

  if (e.changedTouches.length == 1) {
    draw( e.changedTouches[0] as unknown as MouseEvent )
  }
}


const dragEnd = () => {
  if ( !nurieCtx.value ) {
    return
  }

  nurieCtx.value.closePath()
  isDrag.value = false
  lastPosition.value.x = null
  lastPosition.value.y = null
  isErase.value = false
}



onMounted( async () => {
  await init()
} )



const setColor = ( color: string ) => {
  currentColor.value = color
}

const nextImage = async () => {
  activeImageIndex = imagesConfig[ activeImageIndex + 1 ] ? activeImageIndex + 1 : 0

  await initImage( imagesConfig[ activeImageIndex ].image )
}

const saveImage = () => {
  if ( !canvas.value || !ctx.value || !nurieCtx.value || !nurieCanvas.value || !canvasFrame.value ) {
    return
  }

  ctx.value.fillStyle = '#ffffff';
  ctx.value.fillRect(0, 0, canvas.value.width, canvas.value.height);

  ctx.value.drawImage(
    nurieCanvas.value,
    0,
    0,
    canvas.value.width,
    canvas.value.height
  )
  ctx.value.drawImage(
    canvasFrame.value,
    0,
    0,
    canvas.value.width,
    canvas.value.height
  )

  let link = document.createElement('a')
  link.href = canvas.value.toDataURL('image/jpeg')
  link.download = 'kate-nv-' + new Date().getTime() + '.jpg'
  link.click()
}


// const deleteNurie = () =>  {
//   if ( !canvas.value || !ctx.value ) {
//     return
//   }

//   ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
//   init()
// }
</script>

<template>
  <main class="wall">
    <canvas
      ref="canvas"
      class="wall-canvas"
      height="300"
      width="300"
      @mousemove.prevent="draw"
      @mousedown.prevent="dragStart"
      @mouseup.prevent="dragEnd"
      @mouseout.prevent="dragEnd"
      @touchmove.prevent="spDraw" 
      @touchstart.prevent="dragStart"
      @touchend.prevent="dragEnd"
    />
    <canvas
      ref="canvasFrame"
      class="wall-canvas wall-canvas--frame"
      height="300"
      width="300"
    />
    <div class="wall-pallette">
      <button 
        v-for="c, i in colors"
        :key="`color_${ i }`"
        class="wall-pallette-color"
        :class="{
          'wall-pallette-color--active': c === currentColor
        }"
        @click="setColor( c )"
        :style="`background-color: ${ c };`"
      />
      <input 
        class="wall-brush-size"
        type="range" 
        min="2"
        max="100"
        step="1"
        v-model="lineWidth"
      />
      <button
        class="wall-save"
        @click="saveImage"
      >
        🎨 save
      </button>
      <button
        class="wall-save"
        @click="nextImage"
      >
        next 🗿
      </button>
    </div>
  </main>
</template>



<style lang="scss">

.wall {
  position: relative;
  width: 100%;
  height: 100%;
}

.wall-canvas {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  &.wall-canvas--frame {
    pointer-events: none;
  }
}

.wall-pallette {
  position: absolute;
  top: 32px;
  left: 0;
  right: 0;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.wall-pallette-color {
  width: 32px;
  height: 32px;
  position: relative;
  z-index: 10000;
  transition: all 0.2s linear;
  border: none;

  &.wall-pallette-color--active {
    transform: translate(-5px, -5px);
    box-shadow: 5px 5px 0 #d9d9d9;
  }
}

.wall-brush-size {
  background: none;
  margin: 0;
  border: none;
  margin: 0;
  background-image: linear-gradient(to left top, #d9d9d9 50%, #fff 50%);

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 30px;
    width: 10px;
    border-radius: 4px;
    background: #ffffff;
    border: 1px solid #a1a1a1;
  }
}


.wall-save {
  font-family: "Space Grotesk", sans-serif;
  background: none;
  border: none;
  cursor: pointer;
  font-size: rem(16px);
}

</style>
