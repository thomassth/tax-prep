<script setup lang="ts">
import { useInputStore } from '@/stores/input.js'
import { useOutputStore } from '@/stores/output.js'
import ChecklistItem from '@/components/ChecklistItem.vue'
import { computed } from 'vue'
import BaseBadge from '@/components/BaseBadge.vue'
import EssentialItems from './EssentialItems.vue'

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
    ? outputStore.outputDb.filter((item) => filteredSet.value.has(item.id))
    : outputStore.outputDb.filter((item) => !essentialSet.has(item.id))
})

const optionalItems = computed(() => {
  return inputStore.selected.length
    ? outputStore.outputDb.filter(
      (item) => !filteredSet.value.has(item.id) && !essentialSet.has(item.id)
    )
    : []
})
</script>

<template>
  <div class="output">
    <EssentialItems />
    <fieldset>
      <template v-for="item in filteredItems" :key="item.id">
        <ChecklistItem :id="item.id" :onChange="outputStore.checkboxChange"
          :checked="outputStore.selected.includes(item.id)">
          <template #heading>
            <div class="checkbox-desc">
              <template v-if="Array.isArray(item.formId)">
                <BaseBadge v-for="id in item.formId" :key="id">{{ id }} </BaseBadge>
              </template>
              <BaseBadge v-else-if="item.formId">{{ item.formId }}</BaseBadge>
              {{ item.name }}
            </div>
          </template>
          <template #hints v-if="item.source"> usually from: {{ item.source }} </template>
        </ChecklistItem>
      </template>
    </fieldset>
    <fieldset v-if="optionalItems.length">
      <h1>Optional items</h1>
      <p>
        These items are not in the list of things you've selected, but bring them in if you have
        them.
      </p>
      <template v-for="item in optionalItems" :key="item.id">
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
          <template #hints v-if="item.source"> usually from: {{ item.source }} </template>
        </ChecklistItem>
      </template>
    </fieldset>
  </div>
</template>

<style scoped>
fieldset {
  border: none;
}
</style>
