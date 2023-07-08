<script setup>
import Form from '@/components/common/service/form'
import countryData from '@/utils/country.js'

const pickerList = ['123', '456'] //工种选择
//身份类型选择
const IdentityTypeList = [
  {
    value: 0,
    text: '居民身份证'
  },
  {
    value: 1,
    text: '护照'
  },
  {
    value: 2,
    text: '台胞证'
  },
  {
    value: 3,
    text: '港澳通行证'
  },
  {
    value: 4,
    text: '其它证件'
  }
]
// 传入表单数据
const list = [
  {
    type: 'input',
    text: '工人姓名',
    code: 'w_name',
    data: '高先生'
  },
  {
    type: 'picker',
    text: '工种',
    code: 'w_typeWork',
    data: '小工',
    dataConfig: {
      dataList: pickerList
    }
  },
  {
    type: 'datePicker',
    text: '出生日期',
    code: 'w_birthday',
    data: null
  },
  {
    type: 'input',
    text: '工龄',
    code: 'w_seniority',
    data: null,
    disabled: true
  },
  {
    type: 'picker',
    text: '师傅等级',
    code: 'w_garde',
    data: 0,
    dataConfig: {
      dataList: [
        {
          value: 0,
          text: '铜牌师傅'
        },
        {
          value: 1,
          text: '金牌师傅'
        },
        {
          value: 2,
          text: '银牌师傅'
        }
      ],
      dataListText: 'text'
    }
  },
  {
    type: 'input',
    text: '完工件数',
    code: 'w_completedQuantity',
    data: null
  },
  {
    type: 'input',
    text: '施工单价',
    code: 'w_price',
    data: null
  },
  {
    type: 'addressPicker',
    text: '所在地区',
    code: 'w_habitualResidenceCity',
    data: null
  },
  {
    type: 'picker',
    text: '身份类型',
    code: 'w_idType',
    data: 0,
    dataConfig: {
      dataList: IdentityTypeList,
      dataListText: 'text'
    }
  },
  {
    type: 'picker',
    text: '国籍选择',
    code: 'w_nationality',
    data: '中国',
    dataConfig: {
      dataList: countryData,
      dataListText: 'country_name_cn',
      dataType: 'country_name_cn' //form的数据类型
    }
  },
  {
    type: 'checkbox',
    text: '性别',
    code: 'w_sex',
    data: null,
    dataConfig: {
      dataList: [
        {
          text: '男',
          value: 1
        },
        {
          text: '女',
          value: 0
        }
      ]
    }
  }
]
// 校验规则
const formRules = {
  // 对name字段进行必填验证
  w_name: {
    rules: [
      {
        required: true,
        errorMessage: '请输入姓名'
      },
      {
        minLength: 2,
        maxLength: 8,
        errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符'
      }
    ]
  },
  // 对性别进行验证
  w_sex: {
    rules: [
      {
        required: true,
        errorMessage: '请选择性别'
      }
    ]
  },
  // 对手机号码进行验证
  w_phone: {
    rules: [
      {
        required: true,
        errorMessage: '请输入手机号码'
      },
      {
        pattern: '^1[3-9]\\d{9}$',
        errorMessage: '请输入正确的手机号码'
      }
    ]
  },
  // 对常住地进行验证
  w_habitualResidenceCity: {
    rules: [
      {
        required: true,
        errorMessage: '请填写常住地'
      }
    ]
  }
}
//请求配置
const request = {
  url: '123',
  methods: 'POST'
}
</script>

<template>
  <view class="main">
    <Form :list="list" :formRules="formRules" :request="request"></Form>
  </view>
</template>

<style lang="less" scoped>
.main {
  width: 100%;
}
</style>
