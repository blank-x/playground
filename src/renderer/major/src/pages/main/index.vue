<template>
  <div class="w-32 h-32 bg-blue-500">
    <C1 :model-value="da" @update:modelValue="update" />
    <div>{{updateString}}</div>

  </div>
</template>

<script setup lang="ts">
import {defineProps, defineEmits, defineComponent, ref} from 'vue'
const { onUpdate } = (window as unknown as MainWindow).electron;
import C1 from '../../components/C1.vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: []
  }
})

const updateString = ref('')


onUpdate(function (v) {
  updateString.value = v
})

const da = ref([1,2,3])
const value2 = ref('')

const update = (v) => {
  console.log(v)
}
</script>

