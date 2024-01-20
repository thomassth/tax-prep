<script setup lang="ts">
import { useInputStore } from '@/stores/input'
import { useOutputStore } from '@/stores/output'
import ChecklistItem from '@/components/ChecklistItem.vue'
import { computed, ref } from 'vue'

const inputStore = useInputStore()
const outputStore = useOutputStore()

const selected = inputStore.selected

const filteredSet = computed(() => {
  let set = new Set()
  selected.forEach((item) => {
    const tempSet = outputStore.outputGroup.get(item)
    if (tempSet) set = new Set([...set, ...tempSet])
  })
  return set
})

const essentialSet = new Set([
  ...outputStore.outputGroup.get('essential'),
  ...outputStore.outputGroup.get('address')
])

const filteredItems = computed(() => {
  return inputStore.selected.length
    ? outputStore.outputDb.filter((item) => filteredSet.value.has(item.id) === true)
    : outputStore.outputDb.filter((item) => essentialSet.has(item.id) !== true)
})

const items = ref(
  filteredItems.value.map((item) => {
    return {
      id: item.id,
      heading: item.name,
      source: item.source
    }
  })
)
</script>

<template>
  <div class="output">
    <template v-for="item in items" :key="item.id">
      <ChecklistItem :id="item.id">
        <template #heading>
          {{ item.heading }}
        </template>
        <template #hints> usually from: {{ item.source }} </template>
      </ChecklistItem>
    </template>
  </div>
</template>
