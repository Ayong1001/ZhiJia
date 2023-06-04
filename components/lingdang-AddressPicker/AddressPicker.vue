<script setup>
import { defineProps, defineEmits, onMounted, ref, getCurrentInstance } from 'vue'
import AllAddress from './AddressData.js'

const value = ref([])
const array = ref([])
let level = 3
const emit = defineEmits(['change'])
const props = defineProps({
  baseCode: String
})
// 初始化地址选项
const init = addressCode => {
  array.value = new Array(level)
  for (let i = 0; i < array.value.length; i++) {
    if (i == 0) {
      if (addressCode || props.baseCode) {
        array.value[i] = [].concat(
          AllAddress.find(e => {
            // return e.id === props.baseCode
            return e.id === (addressCode ? addressCode : props.baseCode)
          })
        )
      } else {
        array.value[i] = AllAddress
      }
    } else {
      array.value[i] = []
      if (array.value[i - 1][0].children != null) {
        array.value[i] = array.value[i - 1][0].children
      }
    }
  }
}
onMounted(() => {
  init()
})
// 地址控件改变控件
const columnchange = e => {
  let aIndex = Number(e.detail.column) + 1 //第几组
  let j = Number(e.detail.value) //索引值
  for (let i = aIndex; i < array.value.length; i++) {
    //选的第几组 和索引值
    //1、选第一组  children 默认第二组的第一个，第三组的值为第二组的第一个children
    //2、选第二组  children 默认第三组的值为第二组的选中的children第一个值
    array.value[i] = []
    if (Number(e.detail.column) === 0 && i === 2) {
      if (array.value[i - 1][0].children != null) {
        array.value[i] = array.value[i - 1][0].children
      }
    } else {
      if (array.value[i - 1][j].children != null) {
        array.value[i] = array.value[i - 1][j].children
      }
    }
  }
}
//点击确定
const pickerChange = e => {
  let result = []
  for (let i = 0; i < array.value.length; i++) {
    result.push({
      name: array.value[i][e.detail.value[i]].name,
      id: array.value[i][e.detail.value[i]].id
    })
  }
  emit('change', result)
}
//基础地址变更
const baseAddressChange = addressCode => {
  init(addressCode)
}

defineExpose({
  baseAddressChange
})
</script>

<template>
  <picker
    @change="pickerChange"
    @columnchange="columnchange"
    :range="array"
    range-key="name"
    :value="value"
    mode="multiSelector"
  >
    <slot></slot>
  </picker>
</template>

<style></style>
