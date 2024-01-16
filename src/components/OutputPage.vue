<script setup lang="ts">
import { useInputStore } from '@/stores/input'
import { useOutputStore } from '@/stores/output'
import ChecklistItem from '@/components/ChecklistItem.vue'
import { computed, ref } from 'vue'

const inputStore = useInputStore()
const outputStore = useOutputStore()

const selected = inputStore.selected

const filteredSet = computed(() => {
  let set = new Set(outputStore.outputGroup.get('essential'))
  set = new Set([...set, ...outputStore.outputGroup.get('address')])
  selected.forEach((item) => {
    set = new Set([...set, ...outputStore.outputGroup.get(item)])
  })
  return set
})

const filteredItems = computed(() =>
 filteredSet.value ?  outputStore.outputDb.filter((item) => filteredSet.value.has(item.id) === true):outputStore.outputDb
)

const items = ref(
  filteredItems.value.map((item) => {
    return {
      id: item.id,
      heading: item.name
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
      </ChecklistItem>
    </template>
  </div>
</template>
