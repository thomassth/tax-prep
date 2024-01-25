<script setup lang="ts">
import ChecklistItem from './ChecklistItem.vue'
import { useInputStore } from '../stores/input.js'

const inputStore = useInputStore()

const items = inputStore.categories
</script>

<template>
  <form>
    <h1>In 2023, I...</h1>
    <fieldset>
      <template v-for="item in items" :key="item.id">
        <ChecklistItem
          :id="item.id"
          :onChange="inputStore.checkboxChange"
          :class="[
            { nested: item.under },
            { 'show-subcat': inputStore.selected.includes(item.under) }
          ]"
          :checked="inputStore.selected.includes(item.id)"
        >
          <template #heading>
            {{ item.heading }}
          </template>
        </ChecklistItem>
      </template>
    </fieldset>
  </form>
</template>

<style scoped>
fieldset {
  border: none;
}

.nested {
  margin-left: 2em;

  &:not(.show-subcat) {
    display: none;
  }
}
</style>
