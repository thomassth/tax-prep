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
    <h1>Essential stuff</h1>
    <div class="output">
      <template v-for="item in filteredItems" :key="item.id">
        <ChecklistItem :id="item.id">
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
}
</style>
