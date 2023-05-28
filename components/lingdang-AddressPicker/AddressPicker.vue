<script setup>
import { defineProps, defineEmits, onMounted, getCurrentInstance } from 'vue'
import AllAddress from './AddressData.js'

let value = [],
  array = [],
  index = 0,
  level = 3
let { ctx: that, proxy } = getCurrentInstance()
const emit = defineEmits(['change'])
const props = defineProps({
  baseCode: String
})
// 初始化地址选项
const init = addressCode => {
  array = new Array(level)
  for (let i = 0; i < array.length; i++) {
    if (i == 0) {
      if (addressCode || props.baseCode) {
        array[i] = [].concat(
          AllAddress.find(e => {
            // return e.id === props.baseCode
            return e.id === (addressCode ? addressCode : props.baseCode)
          })
        )
      } else {
        array[i] = AllAddress
      }
    } else {
      array[i] = []
      if (array[i - 1][0].children != null) {
        array[i] = array[i - 1][0].children
      }
    }
  }
  that.$forceUpdate()
}
onMounted(() => {
  init()
})
// 地址控件改变控件
const columnchange = e => {
  let aIndex = Number(e.detail.column) + 1 //第几组
  let j = Number(e.detail.value) //索引值

  // console.log('e.detail',e.detail)
  // console.log('选择：第'+ aIndex +'组,索引值为第' +j +'个 值为'+array[aIndex-1][j].name);
  for (let i = aIndex; i < array.length; i++) {
    //选的第几组 和索引值
    //1、选第一组  children 默认第二组的第一个，第三组的值为第二组的第一个children
    //2、选第二组  children 默认第三组的值为第二组的选中的children第一个值
    array[i] = []
    // console.log('array[i] ', i, )
    if (Number(e.detail.column) === 0 && i === 2) {
      if (array[i - 1][0].children != null) {
        array[i] = array[i - 1][0].children
      }
    } else {
      if (array[i - 1][j].children != null) {
        array[i] = array[i - 1][j].children
      }
    }
    // console.log('array[i] ',array[i] )
  }
  that.$forceUpdate()
}
//点击确定
const pickerChange = e => {
  let result = []
  for (let i = 0; i < array.length; i++) {
    result.push({
      name: array[i][e.detail.value[i]].name,
      id: array[i][e.detail.value[i]].id
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
