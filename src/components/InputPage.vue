<script setup lang="ts">
import ChecklistItem from './ChecklistItem.vue'
import { useInputStore } from '../stores/input.js'

const inputStore = useInputStore()

const items = [
  { id: 'study', heading: '📚 studied' },
  { id: 'work', heading: '📊 worked' },
  { id: 'newcomer', heading: '🇨🇦 first year in Canada' },
  { id: 'healthcare', heading: '💊 Spent money on healthcare' },
  { id: 'rent', heading: '🏘 Paid rent' },
  { id: 'children', heading: '👶 Spent money on children' }
]
</script>

<template>
  <form>
    <h1>In 2023, I...</h1>
    <template v-for="item in items" :key="item.id">
      <ChecklistItem
        :id="item.id"
        :onChange="inputStore.checkboxChange"
        :checked="inputStore.selected.includes(item.id)"
      >
        <template #heading>
          {{ item.heading }}
        </template>
      </ChecklistItem>
    </template>
  </form>
</template>
