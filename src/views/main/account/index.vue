<template>
  <div class="layout-container">
    <div class="layout-container-form flex space-between">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline" ref="queryForm">
        <el-form-item label="姓名" prop="nickname">
          <el-input v-model="queryParams.nickname" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="角色" prop="type">
          <el-select
            v-model="queryParams.type"
            placeholder="请选择"
            clearable
          >
            <el-option v-for="item in typeData" :label="item.label" :value="item.value" :key="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTableData(true)" :icon="Search">搜索</el-button>
          <el-button :icon="Refresh" size="small" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="layout-container-table">
      <Table
        ref="table"
        v-model:page="page"
        v-loading="loading"
        :data="tableData"
        @getTableData="getTableData"
      >
        <el-table-column prop="username" label="账号名称" align="center" />
        <el-table-column prop="nickname" label="姓名" align="center" />
        <el-table-column prop="type" label="角色" align="center">
          <template #default="scope">
            {{scope.row.type==1?'快鑫':scope.row.type==2?'大树':scope.row.type==3?'运营':scope.row.type==4?'代偿':scope.row.type==5?'一级渠道':scope.row.type==6?'二级渠道':'贷后'}}
          </template>
        </el-table-column>
        <el-table-column prop="radioName" label="是否停用" align="center">
          <template #default="scope">
            {{scope.row.isCease==0?'否':'是'}}
          </template>
      </el-table-column>
      </Table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import Table from '@/components/table/index.vue'
import { Page } from '@/components/table/type'
import { getList } from '@/api/account'
import { typeData } from './enum'
import { Plus, Search, Delete,Refresh } from '@element-plus/icons'
export default defineComponent({
  name: 'crudTable',
  components: {
    Table,
  },
  setup() {
    // 存储搜索用的数据
    const queryParams = reactive({
      type:'',
      nickname:''
    })
    // 分页参数, 供table使用
    const page: Page = reactive({
      index: 1,
      size: 10,
      total: 0
    })
    const loading = ref(true)
    const tableData = ref([])
    //*表单重置*//
    const resetQuery = () => {
      page.index= 1
      queryParams.type = ''
      queryParams.nickname = ''
    }
    // 获取表格数据
    // params <init> Boolean ，默认为false，用于判断是否需要初始化分页
    const getTableData = (init: boolean) => {
      loading.value = true
      if (init) {
        page.index = 1
      }
      let params = {
        currentUser:sessionStorage.getItem('username'),
        ...queryParams
      }
      getList(params,page)
      .then(res => {
        let data = (res as any).page.records
        tableData.value = data
        page.total = Number((res as any).page.total)
      })
      .catch(error => {
        tableData.value = []
        page.index = 1
        page.total = 0
      })
      .finally(() => {
        loading.value = false
      })
    }
 
    getTableData(true)
    return {
      Plus,
      Search,
      Delete,
      Refresh,
      queryParams,
      tableData,
      loading,
      page,
      typeData,
      getTableData,
      resetQuery
    }
  }
})
</script>

<style lang="scss" scoped>
  
</style>