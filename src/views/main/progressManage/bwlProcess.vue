<template>
  <div class="layout-container">
    <div class="layout-container-form flex space-between">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline" ref="queryForm">
        <el-form-item label="网点名称" prop="networkName">
          <el-input v-model="queryParams.networkName" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="姓名" prop="creditUser">
          <el-input v-model="queryParams.creditUser" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="跟进人" prop="traceUser">
          <el-input v-model="queryParams.traceUser" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="跟进人" prop="memoUser">
          <el-input v-model="queryParams.memoUser" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="备忘内容" prop="memoContent">
          <el-input v-model="queryParams.memoContent" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="备忘时间" prop="repaymentData">
          <el-date-picker
            v-model="queryParams.memoDate"
            type="date"
            placeholder=""
            value-format="YYYY-MM-DD"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTableData(true)" :icon="Search">搜索</el-button>
          <el-button :icon="Refresh" size="small" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="layout-container-form flex space-between">
      <el-button
      type="primary"
      :icon="Plus"
      @click="handleAdd"
    >新增记录</el-button>
    </div>
    <div class="layout-container-table">
      <Table
        ref="table"
        v-model:page="page"
        v-loading="loading"
        :data="tableData"
        @getTableData="getTableData"
      >
        <el-table-column prop="networkName" label="网点名称" align="center" />
        <el-table-column prop="creditUser" label="姓名" align="center">
          <template #default="scope">
            {{scope.row.creditUser ==null?'-':scope.row.creditUser}}
          </template>
        </el-table-column>
        <el-table-column prop="memoContent" label="备忘录内容" align="center" width="500" />
        <el-table-column label="来源" prop="traceSource" align="left">
          <template #default="scope">
              {{scope.row.traceSource ==1?'网点':'个人'}}
          </template>
        </el-table-column>
        <el-table-column label="备忘日期" align="left">
          <template #default="scope">
            {{ proxy.$moment(scope.row.memoDate * 1000).format("YYYY-MM-DD") }}
          </template>
        </el-table-column>
        <el-table-column prop="traceUser" label="跟进人" align="center" />
        <el-table-column label="跟进" prop="addTime" align="left">
          <template #default="scope">
            <el-button type="text" @click="toCon(scope.row)">新增记录</el-button>
          </template>
        </el-table-column>
      </Table>
    </div>
     <!-- 添加或修改标签对话框 -->
   <el-dialog title="新增记录" v-model="open" width="700px" append-to-body>
     <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="120px">
       <el-form-item label="跟进来源" prop="traceSource">
         <el-select v-model="form.traceSource" placeholder="请选择" @change="getNet">
            <el-option
              v-for="item in traceSourceOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
       </el-form-item>
       <el-form-item label="网点选择" prop="sourceId">
        <el-select v-model="sourceId" filterable placeholder="请选择" @change="getPeopleList" :disabled='optionDisabled'>
          <el-option
            v-for="item in netOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
       </el-form-item>
       <el-form-item label="授信人列表(个人)" prop="sourceId" v-if="!peopleDisabled">
        <el-select v-model="form.sourceId" filterable placeholder="请选择">
          <el-option
            v-for="item in peopleOptions"
            :key="item.id"
            :label="item.idName"
            :value="item.id">
          </el-option>
        </el-select>
       </el-form-item>
       <el-form-item label="备忘内容" prop="traceContent">
         <el-input v-model="form.memoContent" placeholder="请输入"  type="textarea" :rows="8" />
       </el-form-item>
       <el-form-item label="备忘日期">
          <el-date-picker
              v-model="form.memoDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
     </el-form>
     <!-- vue2 element中dialog 的插槽的写法是 直接slot="footer" 但是在plus中需要以父级的形式添加 -->
     <template #footer>
        <div class="layout-container-form-search">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <!-- <el-button @click="cancel">取 消</el-button> -->
      </div>
     </template>
   </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive,onMounted } from 'vue'
import Table from '@/components/table/index.vue'
import { Page } from '@/components/table/type'
import { memoRecord,tableList,getPeople,memoAdd } from '@/api/progressIndex'
import { Plus, Search, Delete,Refresh } from '@element-plus/icons'
import useGlobalProperties from "@/utils/common/useGlobalProperties";
export default defineComponent({
  name: 'BwlProcess',
  components: {
    Table,
  },
  setup() {
    const proxy = useGlobalProperties();
    // 存储搜索用的数据
    const queryParams:any  = reactive({
      networkName:null,
      traceUser:null,
      creditUser:null,
      traceContent:null,
      traceSource:null,
      currentUser:'suilu',
      memoDate:null
    })
    const dateParams = reactive({
      repaymentData:[]
  
    })
    // 分页参数, 供table使用
    const page: Page = reactive({
      index: 1,
      size: 10,
      total: 0
    })
    const traceSourceOption = reactive([
      { value: 1,label: '网点' }, 
      { value: 2,label: '个人' }
    ])
    const rules = reactive({
      districtName: [
        { required: true, message: '区域名称不能为空', trigger: 'blur' },
      ]
    })
    let open = ref(false)
    let peopleDisabled = ref(true)
    let netOptions:any = ref([])
    let peopleOptions:any = ref([])
    let optionDisabled = ref(true)
    let form = ref({
      memoContent:null,
      sourceId:'',
      traceSource:null,
      currentUser:'suilu',
      memoDate:null
    })
    let sourceId = ref('')
    const loading = ref(true)
    const tableData = ref([])
    //*表单重置*//
    const resetQuery = () => {
      page.index= 1
      queryParams.networkName = null
      queryParams.traceUser = null
      queryParams.memoUser = null
      queryParams.memoContent = null
      queryParams.traceSource = null
      queryParams.memoDate = null
      getTableData(true)
    }
    // 获取表格数据
    // params <init> Boolean ，默认为false，用于判断是否需要初始化分页
    const getTableData = (init: boolean) => {
      loading.value = true
      if (init) {
        page.index = 1
      }
      let params = {
        ...queryParams,
      }
      memoRecord(params,page)
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
    const getNet = ()=>{
      if(form.value.traceSource ==2){
          peopleDisabled.value = false
      }else{
          peopleDisabled.value = true
      }
      form.value.sourceId = ''
      sourceId.value = ''
      const params={
          networkName:''
      }
      tableList(params).then((res:any)=>{
        if(res.code ==200){
          netOptions.value = res.result
          optionDisabled.value = false
        }else{
          proxy.$message.error(res.message)
        }
      })
    }
    const getPeopleList = ()=>{
      form.value.sourceId = ''
        const params = {
            networkId:sourceId.value
        }
        getPeople(params).then((res:any)=>{
            if(form.value.traceSource ==2){
                peopleOptions.value = res.result
                peopleDisabled.value = false
            }
        })
    }
    //打开新增记录
    const handleAdd =()=>{
      form.value.memoContent = null
      form.value.sourceId = ''
      form.value.traceSource = null
      open.value = true
    }
    //列表新增记录
    const toCon = (i:any)=>{
      form.value.traceSource = i.traceSource
      form.value.sourceId = i.creditUserId
      sourceId.value = i.networkId
      optionDisabled.value = false
      if(i.traceSource ==2){
        peopleDisabled.value = false
        const params={
            networkName:''
        }
        tableList(params).then((res:any)=>{
          if(res.code ==200){
            netOptions.value = res.result
          }else{
            proxy.$message.error(res.message)
          }
        })
        const paramsP = {
          networkId:sourceId.value
        }
        getPeople(paramsP).then((res:any)=>{
          if(form.value.traceSource ==2){
            peopleOptions.value = res.result
          }
        })

      }else{
        peopleDisabled.value = true
        const params={
            networkName:''
        }
        tableList(params).then((res:any)=>{
            if(res.code ==200){
                netOptions.value = res.result
            }else{
                proxy.$message.error(res.message)
            }
        })
      }
      open.value = true
    }
    //提交新增
    const submitForm = ()=>{
      if(form.value.traceSource ==1){
        form.value.sourceId = sourceId.value
      }
      memoAdd(form).then((res:any) => {
        if(res.code ==200){
          proxy.$message.success('增加成功')
          open.value = false
          form.value.memoContent = null
          form.value.sourceId = ''
          form.value.traceSource = null
          sourceId.value=''
          getTableData(true)
        }else{
          proxy.$message.error(res.message)
        }
      });
    }
    onMounted(()=>{
      getTableData(true)
    })
    return {
      Plus,
      Search,
      Delete,
      Refresh,
      queryParams,
      dateParams,
      traceSourceOption,
      tableData,
      loading,
      page,
      proxy,
      open,
      form,
      peopleDisabled,
      rules,
      sourceId,
      netOptions,
      peopleOptions,
      optionDisabled,
      getTableData,
      resetQuery,
      getNet,
      getPeopleList,
      handleAdd,
      toCon,
      submitForm
    }
  }
})
</script>

<style lang="scss" scoped>
  
</style>