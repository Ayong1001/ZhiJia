<script setup>
import { reactive, ref, onMounted } from 'vue'
import 'vant/lib/index.css'
import workTypeList from '@/utils/workTypeList.js'
import { Form, Field, Cell, CellGroup, Button, Popup } from 'vant'

const pickerIndex = ref(0)
const list = reactive([
  {
    type: 'field',
    text: '工人姓名',
    name: 'w_name',
    data: '高先生',
    disable: true
  },
  {
    type: 'picker',
    text: '工种',
    name: 'w_typeWork',
    data: 0,
    dataList: workTypeList,
    disable: true
  }
])
const from = {}

const onSubmit = () => {
  console.log('onSubmit')
}
const pickerChoose = e => {
  list[pickerIndex.value].data = e.detail.value
}
// 选择器index设置
const pickerClick = index => {
  pickerIndex.value = index
}
// 初始化表单
const initializationFrom = () => {
  list.forEach(item => {
    from[item.name] = item.data
  })
}
onMounted(() => {
  initializationFrom()
})
</script>

<template>
  <form>
    <cell-group inset>
      <cell v-for="(item, index) in list" :key="index" style="padding: 0">
        <field v-if="item.type === 'field'" v-model="item.data" :label="item.text" />
        <field
          v-if="item.type === 'picker'"
          v-model="item.dataList[item.data].text"
          is-link
          readonly
          :label="item.text"
        >
          <template #input>
            <picker
              style="width: 100%"
              @click="pickerClick(index)"
              @change="pickerChoose"
              :value="item.data"
              :range="item.dataList"
              range-key="text"
            >
              <view>{{ item.dataList[item.data].text }}</view>
            </picker>
          </template>
        </field>
      </cell>
    </cell-group>
    <div style="margin: 16px">
      <u-button type="primary" text="提交"></u-button>
    </div>
  </form>
</template>

<style lang="less" scoped></style>
