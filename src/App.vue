<script setup lang="ts">
// Router
import { RouterView } from 'vue-router'
// Components
import TheSvgSpritemap from '@/components/TheSvgSpritemap.vue'
import TheNavigation from '@/components/TheNavigation.vue'
</script>



<template>
  <!-- spritemap -->
  <TheSvgSpritemap />


  <!-- main navigation -->
  <TheNavigation />

  <!-- router page -->
  <RouterView v-slot="{ Component }">
    <transition
      name="component-fade"
      mode="out-in"
    >
      <component :is="Component" />
    </transition>
  </RouterView>
</template>
