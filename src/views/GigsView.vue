<script setup lang="ts">
// Vue
import { ref, type Ref, onMounted } from 'vue'
// Assets
import Photo1Jpg from '@/assets/images/photo/photo_1.jpg'
import Photo1Avif from '@/assets/images/photo/photo_1.avif'
import Photo1Webp from '@/assets/images/photo/photo_1.webp'
import Photo2Jpg from '@/assets/images/photo/photo_2.jpg'
import Photo2Avif from '@/assets/images/photo/photo_2.avif'
import Photo2Webp from '@/assets/images/photo/photo_2.webp'



const gigs: Ref<{
  [ propName: string ] : string
} | undefined> = ref()

const activePhoto: Ref<number> = ref( 1 )


onMounted(async () => {
  const response = await fetch("/gigs.json");
  const file = await response.json();

  gigs.value = file
});
</script>



<template>
  <main class="gigs">
    <div class="gigs-photo">
      <Transition name="fade">
        <picture 
          v-if="activePhoto === 1"
          class="gigs-photo-picture"
          @click="activePhoto = 2"
        >
          <source :srcset="Photo1Webp" type="image/webp" />
          <source :srcset="Photo1Avif" type="image/avif" />
          <img 
            class="gigs-photo-picture__img" 
            :src="Photo1Jpg" 
            width="2006"
            height="2234"
            alt="Kate nv photo"
          />
        </picture>
      </Transition>
      <Transition name="fade">
        <picture 
          v-if="activePhoto === 2"
          class="gigs-photo-picture"
          @click="activePhoto = 1"
        >
          <source :srcset="Photo2Webp" type="image/webp" />
          <source :srcset="Photo2Avif" type="image/avif" />
          <img 
            class="gigs-photo-picture__img" 
            :src="Photo2Jpg" 
            width="2004"
            height="2234"
            alt="Kate nv photo"
          />
        </picture>
      </Transition>
    </div>
    <div class="gigs-events">
      <h1>gigs:</h1>

      <ul v-if="gigs">
        <li 
          v-for="gig, i in gigs"
          :key="`gig_${ i }`"
        >
          {{ i }} — {{ gig }}
        </li>
      </ul>
    </div>
  </main>
</template>



<style lang="scss">
  .gigs {
    position: relative;

    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;
    overflow: auto;
    padding-bottom: 3rem;
    
    @media only screen and (min-width: 650px) {
      padding-bottom: 0;
      flex-direction: row;
    }
  }

  .gigs-photo {
    position: relative;
    width: 100%;
    
    @media only screen and (min-width: 650px) {
      height: 100%;
      width: 40%;
    }

    @media only screen and (min-width: 900px) {
      width: 60%;
    }
  }

  .gigs-photo-picture {
    position: relative;

    @media only screen and (min-width: 650px) {
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  
  .gigs-photo-picture__img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
  
  .gigs-events {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      margin-bottom: 2.5rem;
      transform: rotate(-10deg);
    }

    ul {
      margin: 0 0 1rem 0;
      padding: 0;

      li {
        list-style: none;
        margin-bottom: 1rem;
      }
    }
  }

</style>