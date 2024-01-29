<template>
  <div class="layout-container">
    <div class="layout-container-form flex space-between">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline" ref="queryForm">
        <el-form-item label="网点名称" prop="networkName">
          <el-input v-model="queryParams.networkName" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="涉诉人" prop="lawsuitUser">
          <el-input v-model="queryParams.lawsuitUser" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="跟进人" prop="traceUser">
          <el-input v-model="queryParams.traceUser" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="跟进内容" prop="lawsuitContent">
          <el-input v-model="queryParams.lawsuitContent" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="queryParams.status"  style="width: 240px">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否终止" prop="isTermination">
          <el-select v-model="queryParams.isTermination">
            <el-option label="是" :value=1></el-option>
            <el-option label="否" :value=0></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建周期" prop="repaymentData">
          <el-date-picker
            v-model="dateParams.repaymentData"
            type="daterange"
            placeholder=""
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTableData(true)" :icon="Search">搜索</el-button>
          <el-button :icon="Refresh" size="small" @click="resetQuery">重置</el-button>
        </el-form-item>
        <el-form-item>
        <el-switch
          v-model="statusSign"
          active-text="启用设置状态"
          inactive-text="暂停设置状态">
        </el-switch>
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
      <el-table :data="tableData"  ref="table" class="system-table" border  height="100%"  :span-method="objectSpanMethod">
        <el-table-column prop="networkName" label="网点名称" align="left"/>
        <el-table-column prop="lawsuitUser" label="涉诉人" align="left"/>
        <el-table-column prop="lawsuitContent" label="诉讼内容" align="left"/>
        <el-table-column label="付款" prop="payment" align="left"/>
        <el-table-column label="跟进时间" prop="contentAddtime" align="left" width="170">
          <template #default="scope">
            {{ scope.row.contentAddtime?proxy.$moment(scope.row.contentAddtime * 1000).format("YYYY-MM-DD HH:mm:ss"):''}}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status" align="left" width="120" :formatter="labelFormat" v-if="statusSign == false"/>
        <el-table-column label="状态" prop="c" align="left" width="120" v-if="statusSign == true">
          <template #default="scope">
            <el-select v-model="scope.row.status" @change="setStatusOption(scope.row)" >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="traceUser" label="跟进人" align="left"/>
        <el-table-column prop="addTime" label="创建时间" align="left">
          <template #default="scope">
            {{ proxy.$moment(scope.row.addTime*1000).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column label="跟进" prop="aaa" align="center" width="80">
          <template #default="scope">
            <el-button type="text" @click="toCon(scope.row)" >新增记录</el-button>
          </template>
        </el-table-column>
        <el-table-column label="终止" prop="b" align="center" width="80">
          <template #default="scope">
            <el-button type="text" @click="openRemark(scope.row)"  v-if="scope.row.isTermination == 0">终止</el-button>
            <p v-else>{{scope.row.remark}}</p>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="page.index"
        class="mt-20"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        :page-size="page.size"
        :page-sizes="[10, 20, 50, 100]"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </div>
     <!-- 添加或修改标签对话框 -->
   <el-dialog title="新增记录" v-model="open" width="800px" append-to-body>
     <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="80px">
       <el-form-item label="网点选择" prop="sourceId">
        <el-select v-model="form.networkId" filterable placeholder="请选择"  >
          <el-option
            v-for="item in netOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
       </el-form-item>
       <el-form-item label="涉诉人">
        <el-input v-model="form.lawsuitUser" ></el-input>
        <div class="tips">
          (多人可用逗号隔开)
        </div>
      </el-form-item>
      <el-form-item label="付款">
        <el-input v-model="form.payment"></el-input>
      </el-form-item>
      <el-form-item label="跟进内容" prop="lawsuitContent">
        <el-input v-model="form.lawsuitContent"  type="textarea" :rows="8"  placeholder="请输入" />
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

   <el-dialog title="添加终止备注" v-model="remarkDialog" width="800px" append-to-body>
     <el-form ref="ruleFormRef" :model="remarkForm" :rules="rules" label-width="80px">
      <el-form-item label="备注">
        <el-input v-model="remarkForm.remark"></el-input>
      </el-form-item>
     </el-form>
     <!-- vue2 element中dialog 的插槽的写法是 直接slot="footer" 但是在plus中需要以父级的形式添加 -->
     <template #footer>
        <div class="layout-container-form-search">
          <el-button type="primary" @click="submitRemark">确 定</el-button>
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
import { lawsuitRecord,tableList,lawsuitAdd,setStatus,setTermination } from '@/api/progressIndex'
import { Plus, Search, Delete,Refresh } from '@element-plus/icons'
import useGlobalProperties from "@/utils/common/useGlobalProperties";
export default defineComponent({
  name: 'FwProcess',
  components: {
    Table,
  },
  setup() {
    const proxy = useGlobalProperties();
    // 存储搜索用的数据
    const queryParams:any  = reactive({
      networkName:null,
      traceUser:null,
      lawsuitUser:null,
      lawsuitContent:null,
      status:null,
      isTermination:null,
      currentUser:'suilu'
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
    let timer: any = null
    let spanArr:any = ref([])
    const statusOptions =reactive([
      { value: 0, label: '未提交' },
      { value: 1, label: '已提交' },
      { value: 2, label: '已受理' },
      { value: 3, label: '已裁决/已诉讼' },
      { value: 4, label: '待立案' },
      { value: 5, label: '待执行' },
      { value: 6, label: '执行中' },
      { value: 7, label: '执行完毕' },
    ])
    const rules = reactive({
      districtName: [
        { required: true, message: '区域名称不能为空', trigger: 'blur' },
      ]
    })
    let remarkDialog = ref(false)
    let remarkForm = ref({
      remark:'',
      isTermination:1,
      id:null
    })
    let open = ref(false)
    let peopleDisabled = ref(true)
    let statusSign = ref(false)
    let netOptions:any = ref([])
    let peopleOptions:any = ref([])
    let optionDisabled = ref(true)
    let form = ref({
      lawsuitContent:null,
      payment:null,
      lawsuitUser:null,
      networkId:'',
      traceSource:null,
      currentUser:'suilu',
      id:null
    })
    let sourceId = ref('')
    const loading = ref(true)
    const tableData:any = ref([])
    //*表单重置*//
    const resetQuery = () => {
      page.index= 1
      queryParams.networkName = null
      queryParams.traceUser = null
      queryParams.lawsuitUser = null
      queryParams.lawsuitContent = null
      queryParams.status = null
      queryParams.isTermination = null
      queryParams.addDateStart = null
      queryParams.addDateEnd = null
      dateParams.repaymentData = []
      getTableData(true)
    }
    // 获取表格数据
    // params <init> Boolean ，默认为false，用于判断是否需要初始化分页
    const getTableData = (init: boolean) => {
      loading.value = true
      if (init) {
        page.index = 1
      }
      if (dateParams.repaymentData && dateParams.repaymentData.length == 2) {
        queryParams.addDateStart = proxy.$moment(dateParams.repaymentData[0]).format(
          "YYYY-MM-DD"
        );
        queryParams.addDateEnd = proxy.$moment(dateParams.repaymentData[1]).format("YYYY-MM-DD");
      }
      let params = {
        ...queryParams,
      }
      lawsuitRecord(params,page)
      .then(res => {
        let data = (res as any).page.records
        const finallyList = []
        for(let i=0;i<data.length;i++){
          if(data[i].contentList.length == 0){
            finallyList.push({
              networkName:data[i].networkName,
              networkId:data[i].networkId,
              lawsuitUser:data[i].lawsuitUser,
              lawsuitContent:'',
              payment:'',
              traceUser:data[i].traceUser,
              addTime:data[i].addTime,
              contentAddtime:undefined,
              id:data[i].id,
              status:data[i].status,
              remark:data[i].remark,
              isTermination:data[i].isTermination,
              prompt:data[i].prompt
            })
          }else{
            for(let j=0;j<data[i].contentList.length;j++){
              finallyList.push({
                networkName:data[i].networkName,
                networkId:data[i].networkId,
                lawsuitUser:data[i].lawsuitUser,
                lawsuitContent:data[i].contentList[j].content,
                traceUser:data[i].traceUser,
                addTime:data[i].addTime,
                contentAddtime:data[i].contentList[j].addTime,
                id:data[i].id,
                payment:data[i].contentList[j].payment,
                status:data[i].status,
                remark:data[i].remark,
                isTermination:data[i].isTermination,
                prompt:data[i].prompt
              })
            }
          }
        }
        tableData.value = finallyList
        page.total = Number((res as any).page.total)
        flitterData()
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
     //合并数据处理
     const flitterData =  ()=> { 
      let contactDot = 0;
      let arr:any = [];
      tableData.value.forEach((item:any, index:any) => {
        if (index === 0) { 
          arr.push(1)
        } else {
          if (item.networkName === tableData.value[index - 1].networkName &&item.lawsuitUser === tableData.value[index - 1].lawsuitUser) {
            arr[contactDot] += 1;
            arr.push(0)
          } else {
            contactDot = index
            arr.push(1)
          }
        }
      })
      spanArr = arr;
    }
    const getNet = ()=>{
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
    const  setStatusOption = (row:any)=>{
      setStatus({status:row.status,id:row.id}).then((res:any)=>{
        proxy.$message.success('设置成功')
      })
    }
    //状态筛选
    const labelFormat = (row:any)=>{
      console.log(row)
      if(row.status){
        for(let i =0; i<statusOptions.length;i++){
          if(row.status == statusOptions[i].value){
            return statusOptions[i].label
          }
        }
      }
    }
    //打开新增记录
    const handleAdd =()=>{
      form.value.lawsuitContent = null
      form.value.networkId = ''
      form.value.lawsuitUser = null
      form.value.payment = null
      open.value = true
    }
    //合并单元格方法  标签每次调整以后 都需要更改一下
    const  objectSpanMethod=({ row, column, rowIndex, columnIndex }:any)=> {
        if (columnIndex === 0 ||columnIndex === 1 || columnIndex === 5 || columnIndex === 6) {
          if(spanArr[rowIndex]){
            return {
              rowspan:spanArr[rowIndex],
              colspan:1
            }
          }else{
            return {
              rowspan: 0,
              colspan: 0,
            }
          }
        }
      }
    //列表新增记录
    const toCon = (i:any)=>{
      form.value.networkId = i.networkId
      form.value.lawsuitUser = i.lawsuitUser
      form.value.id = i.id
      open.value = true
    }
    //提交新增
    const submitForm = ()=>{
      lawsuitAdd(form).then((res:any) => {
        if(res.code ==200){
          proxy.$message.success('增加成功')
          open.value = false
          form.value.lawsuitUser = null
          form.value.payment = null
          form.value.networkId = ''
          form.value.lawsuitContent = null
          getTableData(true)
        }else{
          proxy.$message.error(res.message)
        }
      });
    }
    const openRemark = (row:any)=>{
      remarkForm.value = {
        remark:'',
        isTermination:1,
        id:row.id
      }
      remarkDialog.value = true
    }
    const submitRemark = ()=>{
      setTermination(remarkForm).then(res=>{
        remarkDialog.value = false
        getTableData(true)
        proxy.$message.success('设置成功')
      })
    }
    // 分页相关：监听页码切换事件
    const handleCurrentChange = (val: number) => {
      if (timer) {
        page.index = 1
      } else {
        page.index = val
        getTableData(false)
      }
    }
    // 分页相关：监听单页显示数量切换事件
    const handleSizeChange = (val: number) => {
      timer = 'work'
      setTimeout(() => {
        timer = null
      }, 100)
      page.size = val
      getTableData(true)
    }
    onMounted(()=>{
      getTableData(true)
      getNet()
    })
    return {
      Plus,
      Search,
      Delete,
      Refresh,
      queryParams,
      timer,
      dateParams,
      statusOptions,
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
      statusSign,
      remarkForm,
      remarkDialog,
      openRemark,
      getTableData,
      resetQuery,
      getNet,
      handleAdd,
      toCon,
      submitForm,
      handleCurrentChange,
      handleSizeChange,
      objectSpanMethod,
      flitterData,
      labelFormat,
      setStatusOption,
      submitRemark
    }
  }
})
</script>

<style lang="scss" scoped>
  
</style>