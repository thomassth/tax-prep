<script setup lang="ts">
const props = defineProps<{
  id: string
  onChange?: Function
  checked?: boolean
}>()

const onCheckboxChange = (e: Event) => {
  const { value = '' } = e.target as HTMLInputElement

  if (props.onChange) props.onChange(value)
  console.log(value)
}
</script>

<template>
  <div class="checklist-item">
    <input
      type="checkbox"
      :id="id"
      :name="id"
      :value="id"
      @change="onCheckboxChange"
      :checked="checked"
    />
    <label :for="id">
      <slot name="heading"></slot>
    </label>
  </div>
</template>

<style scoped>
.checklist-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
}

input {
  position: relative;
  z-index: 1;
  width: 44px;
  height: 44px;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  border-color: #736b5e;
  color: #e8e6e3;
}

label {
  display: inline-block;
  margin-bottom: 0;
  padding: 8px 15px 5px;
  cursor: pointer;
  touch-action: manipulation;
  font-size: 19px;
}

label:before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 2px solid;
}

label:after {
  position: absolute;
  content: '';
  top: 11px;
  left: 9px;
  width: 23px;
  height: 12px;
  transform: rotate(-45deg);
  border: solid;
  border-width: 0 0 5px 5px;
  opacity: 0;
}

input:checked + label:after {
  opacity: 1;
}

input:focus + label:before {
  border-width: 4px;
  outline-offset: 1px;
  box-shadow: 0 0 0 3px #fd0;
}
</style>
