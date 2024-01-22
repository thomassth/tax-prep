<script setup lang="ts">
import { useInputStore } from '@/stores/input.js'
import { useOutputStore } from '@/stores/output.js'
import ChecklistItem from '@/components/ChecklistItem.vue'
import { computed } from 'vue'
import BaseBadge from '@/components/BaseBadge.vue'
import EssentialItem from './EssentialItem.vue'

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
</script>

<template>
  <div class="output">
    <EssentialItem />
    <template v-for="item in filteredItems" :key="item.id">
      <ChecklistItem :id="item.id">
        <template #heading>
          <div class="checkbox-desc">
            <template v-if="Array.isArray(item.formId)">
              <BaseBadge v-for="id in item.formId" :key="id">{{ id }} </BaseBadge>
            </template>
            <BaseBadge v-else-if="item.formId">{{ item.formId }}</BaseBadge>
            {{ item.name }}
          </div>
        </template>
        <template #hints> usually from: {{ item.source }} </template>
      </ChecklistItem>
    </template>
  </div>
</template>
