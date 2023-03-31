<script setup lang="ts">
// Vue
import { computed, type ComputedRef } from 'vue'
// Router
import { RouterLink, useRoute } from 'vue-router'


// Composables
const $route = useRoute()


// State
const className: ComputedRef<string> = computed( () => {
  if ( !$route.matched[ 0 ]?.meta?.menu ) {
    return 'the-navigation--hidden'
  }

  return `the-navigation--${ $route.matched[ 0 ].meta.menu }`
} )


</script>



<template>
  <nav 
    class="the-navigation"
    :class="className"
  >
    <ul class="the-navigation-list">
      <li 
        class="the-navigation-list__item"
        :class="{
          'disabled': $route.name === 'home'
        }"
      >
        <RouterLink 
          class="the-navigation-link"
          :to="{ name: 'home' }"
        >
          wow
        </RouterLink>
      </li>
      <li
        class="the-navigation-list__item"
        :class="{
          'disabled': $route.name === 'chat'
        }"
      >
        <RouterLink 
          class="the-navigation-link"
          :to="{ name: 'chat' }"
        >
          meow chat
        </RouterLink>
      </li>
      <!-- <li
        class="the-navigation-list__item"
        :class="{
          'disabled': $route.name === 'game'
        }"
      >
        <RouterLink 
          class="the-navigation-link"
          :to="{ name: 'game' }"
        >
          play
          <svg 
            class="the-navigation-link__arrow"
            width="109" 
            height="75" 
            viewBox="0 0 109 75" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <use xlink:href="#icon-arrow" />
          </svg>
        </RouterLink>
      </li> -->
      <li
        class="the-navigation-list__item"
        :class="{
          'disabled': $route.name === 'listen'
        }"
      >
        <RouterLink 
          class="the-navigation-link"
          :to="{ name: 'listen' }"
        >
          listen
        </RouterLink>
      </li>
      <li
        class="the-navigation-list__item"
        :class="{
          'disabled': $route.name === 'watch'
        }"
      >
        <RouterLink 
          class="the-navigation-link"
          :to="{ name: 'watch' }"
        >
          watch
        </RouterLink>
      </li>
      <!-- <li
        class="the-navigation-list__item"
        :class="{
          'disabled': $route.name === 'wall'
        }"
      >
        <RouterLink 
          class="the-navigation-link"
          :to="{ name: 'wall' }"
        >
          wall
        </RouterLink>
      </li> -->
      <li
        class="the-navigation-list__item"
        :class="{
          'disabled': $route.name === 'gigs'
        }"
      >
        <RouterLink 
          class="the-navigation-link"
          :to="{ name: 'gigs' }"
        >
          gigs
        </RouterLink>
      </li>
    </ul>
    </nav>
</template>



<style lang="scss">
  .the-navigation {
    position: absolute;
    z-index: 1000;
    bottom: 0;
    left: 0;
    right: 0;

    font-weight: 400;

    transition: all 0.3s ease-in-out;

    &.the-navigation--hidden {
      opacity: 0;
      pointer-events: none;
    }

    &.the-navigation--bottom-spaced {
      transform: translate(0, -100%);
      background: #ffffffc4;
      backdrop-filter: blur(4px);
    }

    &.the-navigation--bottom-white {
      background: #fff;
    }
  }

  .the-navigation-list {
    display: flex;
    padding: 0;
    margin: 1rem 0;

    flex-direction: row;
    justify-content: space-evenly;
    list-style: none;
  }

  .the-navigation-list__item {
    line-height: 1;

    &.disabled {
      pointer-events: none;
    }
  }

  .the-navigation-link {
    position: relative;
    text-decoration: none;
    transition: all 0.3s ease-in-out, text-underline-offset 0.2s ease-in-out;
    
    &:hover {
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-underline-offset: 3px;
    }
    
    .the-navigation-list__item.disabled & {
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-underline-offset: -4px;
      text-decoration-skip-ink: none;
      text-decoration-color: #f00;
      opacity: 0.75;
    }
  }

  .the-navigation-link__arrow {
    position: absolute;
    bottom: 50%;
    left: 90%;

    width: 60px;
    height: 60px;
    color: #FF1212;
    transform: rotate(-45deg);
    pointer-events: none;
  }
</style>
