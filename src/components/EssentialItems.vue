<script setup lang="ts">
import { useOutputStore } from '@/stores/output.js'
import ChecklistItem from '@/components/ChecklistItem.vue'
import { computed } from 'vue'

const outputStore = useOutputStore()

const essentialSet = new Set([
  ...outputStore.outputGroup.get('essential'),
  ...outputStore.outputGroup.get('address')
])

const filteredItems = computed(() =>
  outputStore.outputDb.filter((item) => essentialSet.has(item.id) === true)
)
</script>

<template>
  <fieldset class="essentials">
    <legend>
      <h1>Essential information</h1>
      <p>These are used to fill in basic details of the tax return.</p>
    </legend>
    <div class="output">
      <template v-for="item in filteredItems" :key="item.id">
        <ChecklistItem :id="item.id" :onChange="outputStore.checkboxChange"
          :checked="outputStore.selected.includes(item.id)">
          <template #heading>
            {{ item.name }}
          </template>
          <template #hints v-if="item.source"> usually from: {{ item.source }} </template>
        </ChecklistItem>
      </template>
    </div>
  </fieldset>
</template>

<style scoped>
.essentials {
  border: 1px solid yellow;
  margin-bottom: 1rem;
}

legend {
  background: rgba(128, 128, 128, 0.2);
  padding: 1rem;
  margin: 1rem;
  border-radius: 4px;
}
</style>
