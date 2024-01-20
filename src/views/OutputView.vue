<script setup lang="ts">
import EssentialItem from '@/components/EssentialItem.vue'
import OutputPage from '../components/OutputPage.vue'
</script>

<template>
  <EssentialItem />
  <OutputPage />
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
