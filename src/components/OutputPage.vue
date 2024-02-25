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

const filteredSelected = computed(() => {
  const list = filteredItems.value.filter(item => {
    return outputStore.selected.includes(item.id)
  })
  return list.length
})

const optionalSelected = computed(() => {
  const list = optionalItems.value.filter(item => {
    return outputStore.selected.includes(item.id)
  })
  return list.length
})

</script>

<template>
  <div class="output">
    <EssentialItems />
    <fieldset id="selected">
      <legend v-if="optionalItems.length">
        <h1>Selected items ({{ filteredSelected }}/{{ filteredItems.length }} checked)</h1>
        <p>
          These items are selected based on your input, and should help you complete your tax form.
        </p>
      </legend>
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
      <legend>
        <h1>Optional items ({{ optionalSelected }} checked)</h1>
        <p>
          These items are not in the list of things you've selected, but bring them in if you have
          them.
        </p>
      </legend>
      <template v-for="item in optionalItems" :key="item.id">
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
  </div>
</template>

<style scoped>
fieldset {
  border: none;
}

legend {
  background: rgba(128, 128, 128, 0.2);
  padding: 1rem;
  margin: 1rem;
  border-radius: 4px;
}
</style>
