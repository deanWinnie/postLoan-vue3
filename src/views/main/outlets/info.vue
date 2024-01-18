<template>
  <div class="layout-container">
    <div class="layout-container-form flex space-between">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline" ref="queryForm">
        <el-form-item label="网点名称" prop="networkName" >
          <el-input v-model="queryParams.networkName" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="网点标签" prop="labelId">
          <el-select
            v-model="queryParams.labelId"
            placeholder="请选择"
            clearable
          >
          <el-option
            v-for="dict in labelData"
            :key="dict.id"
            :label="dict.labelName"
            :value="dict.id "
          />
          </el-select>
        </el-form-item>
        <el-form-item label="网点区域" prop="districtId" v-if="type != 9">
          <el-select
            v-model="queryParams.districtId "
            clearable
            size="small"
          >
            <el-option
              v-for="dict in districtData"
              :key="dict.id"
              :label="dict.districtName"
              :value="dict.id "
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTableData(true)" :icon="Search">搜索</el-button>
          <el-button :icon="Refresh" size="small" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="layout-container-form flex space-between">
      <el-form  :inline="true">
        <el-form-item v-if="type != 9">
        <el-switch
          v-model="setLabelStatus"
          active-text="启用设置标签"
          inactive-text="暂停设置标签">
        </el-switch>
      </el-form-item>
      <el-form-item v-if="type != 9">
        <el-switch
          v-model="setDistrictStatus"
          active-text="启用设置区域"
          inactive-text="暂停设置区域">
        </el-switch>
      </el-form-item>
      <el-form-item v-if="type != 9">
        <el-switch
          v-model="setChannelStatus"
          active-text="启用移交渠道"
          inactive-text="暂停移交渠道">
        </el-switch>
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
        <el-table-column prop="name" label="网点名称" align="center" >
          <template #default="scope">
            <div></div>
            <el-button @click="toDetails(scope.row.name)" link>
              {{scope.row.name}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="linkMan" label="联系人" align="center" />
        <el-table-column prop="telephone" label="电话" align="center"/>
        <el-table-column 
          label="逾期本金" 
          prop="overdueBillAmount" 
          align="center">
          <template #default="scope">
            <div v-if="scope.row.overdueBillAmount == 0">{{scope.row.overdueBillAmount}}</div>
            <el-button text v-else class="col-red" @click="openOverdueBill(scope.row)">{{scope.row.overdueBillAmount}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="billTotalAmount" label="待还款总金额"  align="center"/>
        <el-table-column label="银行逾期人数" prop="overdueCount" :show-overflow-tooltip="true" align="center" >
          <template #default="scope">
            <div v-if="scope.row.overdueCount == 0">{{scope.row.overdueCount}}</div>
            <el-button text v-else class="col-red" @click="openClientList(scope.row,'overdueCount')">{{scope.row.overdueCount}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="代偿人数" prop="compensatoryCount" :show-overflow-tooltip="true" align="center" >
          <template #default="scope">
            <div v-if="scope.row.compensatoryCount == 0">{{scope.row.compensatoryCount}}</div>
            <el-button text v-else class="col-red" @click="openClientList(scope.row,'compensatoryCount')">{{scope.row.compensatoryCount}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="跟进人" prop="traceRecordVO.traceUser" align="center" v-if="type != 9"/>
        <el-table-column label="跟进内容" prop="traceRecordVO.traceContent"  align="center" :show-overflow-tooltip="true" v-if="type != 9"/>
        <el-table-column label="跟进时间" prop="traceRecordVO.addTime" align="center" width="175">
          <template #default="scope">
            {{ scope.row.traceRecordVO.addTime?proxy.$moment(scope.row.traceRecordVO.addTime * 1000).format("YYYY-MM-DD HH:mm:ss"):''}}
          </template>
        </el-table-column>
        <el-table-column label="跟进记录" 
          prop="labelName" 
          align="center"
          width="100"
        >
          <template #default="scope">
            <el-button link @click="getRecord(scope.row)">查看</el-button> | <el-button link @click="setRecord(scope.row)">添加</el-button>
          </template>
        </el-table-column>
        <el-table-column label="网点区域" prop="districtId" align="center"  v-if="setDistrictStatus == false && type!=9"/>
        <el-table-column 
          label="网点区域" 
          prop="districtName" 
          v-if="setDistrictStatus == true && type!=9"
          align="center">
          <template  #default="scope">
            <el-select
              v-model="scope.row.districtId "
              @change="setDistrictName(scope.row)"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in districtData"
                :key="dict.id"
                :label="dict.districtName"
                :value="dict.id"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="网点标签" prop="labelName" align="center" v-if="setLabelStatus == false && type!=9"/>
        <el-table-column 
          label="网点标签" 
          prop="labelName" 
          v-if="setLabelStatus == true && type!=9"
          align="center">
          <template  #default="scope">
            <el-select
              v-model="scope.row.labelId "
              @change="setLabelName(scope.row)"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in labelData"
                :key="dict.id"
                :label="dict.labelName"
                :value="dict.id"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="移交渠道" prop="transferChannel" align="center" :formatter="channelFormat" v-if="setChannelStatus == false && type!=9"/>
        <el-table-column 
          label="移交渠道" 
          prop="districtName" 
          v-if="setChannelStatus == true && type!=9"
          align="center">
          <template  #default="scope">
            <el-select
              v-model="scope.row.transferChannel "
              @change="setChannel(scope.row)"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in channelData"
                :key="dict.id"
                :label="dict.name"
                :value="dict.id"
              />
            </el-select>
          </template>
        </el-table-column>
      </Table>
    </div>
  </div>
  <FollowUpRecord :openRecord = 'openRecord' :recordsParams="recordsParams" @dialog-open-back="dialogOpenBack"></FollowUpRecord>
  <SetRecorde :openAddRecord = 'openAddRecord' :setParams = 'setParams' @dialog-add-back="dialogAddBack"></SetRecorde>
  <Bill :openBillRecord = 'openBillRecord' :billParams = 'billParams' @dialog-bill-back="dialogBillBack"></Bill>
  <Client :openClientRecord = 'openClientRecord' :clientParams = 'clientParams' @dialog-client-back="dialogClientBack"></Client>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import Table from '@/components/table/index.vue'
import FollowUpRecord from './component/FollowUpRecord.vue'
import SetRecorde from './component/SetRecorde.vue'
import Bill from './component/Bill.vue'
import Client from './component/Client.vue'
import { Page } from '@/components/table/type'
import { networkList,districtList,getChannelList, labelList,setDistrict,setTransferChannel,setLabel} from '@/api/outlets'
import { typeData } from './enum'
import { Plus, Search, Delete,Refresh } from '@element-plus/icons'
import useGlobalProperties from "@/utils/common/useGlobalProperties";
export default defineComponent({
  name: 'OutletsInfo',
  components: {
    Table,
    FollowUpRecord,
    SetRecorde,
    Bill,
    Client
  },
  setup() {
    const proxy = useGlobalProperties();
    // 存储搜索用的数据
    const queryParams = reactive({
      type:'',
      networkName:'',
      labelId:null,
      districtId:null
    })
    // 分页参数, 供table使用
    const page: Page = reactive({
      index: 1,
      size: 10,
      total: 0
    })
    const loading = ref(true)
    const tableData = ref([])
    const type = ref(1)
    let setChannelStatus = ref(false)
    let setLabelStatus = ref(false)
    let setDistrictStatus = ref(false)
    let districtData:any = ref([])
    let channelData:any = ref([])
    let labelData:any = ref([])
    let openRecord = ref(false)
    let openAddRecord = ref(false)
    let openBillRecord = ref(false)
    let openClientRecord = ref(false)
    let recordsParams = ref({})
    let setParams = ref({})
    let billParams = ref({})
    let clientParams = ref({})
    //let currentUser = sessionStorage.getItem('username')
    let currentUser = 'suilu'
    //*表单重置*//
    const resetQuery = () => {
      queryParams.type = ''
      queryParams.networkName=''
      queryParams.labelId=null
      queryParams.districtId=null
      getTableData(false)
    }
    // 获取表格数据
    // params <init> Boolean ，默认为false，用于判断是否需要初始化分页
    const  getTableData = async (init: boolean) => {
      loading.value = true
      if (init) {
        page.index = 1
      }
      let params = {
        currentUser:sessionStorage.getItem('username'),
        ...queryParams,
        ...page
      }
      if(labelData.value.length == 0){
        let res = await labelList({size:1000,type:1})
        labelData.value = (res as any).page.records;
      }
      networkList(params).then(res => {
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
    //获取所有区域
    const getDistrictList = ()=>{
      districtList({size:1000}).then(res=>{
        districtData.value = (res as any).page.records;
      })
    }
    //格式化渠道
    const channelFormat = (row:any)=>{
      for(let i = 0; i<channelData.value.length;i++){
        if(channelData.value[i].id == 0){
          return ''
        }
        if(channelData.value[i].id == row.transferChannel){
          return channelData.value[i].name
        }
      }
    }
    //获取所有渠道
    const getChannelData = ()=>{
      getChannelList({size:1000,type:3}).then(res=>{
        channelData.value = (res as any).result
        channelData.value.push(
          {
            name:'无',
            id:0,
            type:''
          }
        )
      })
    }
    /**查看跟进记录 */
    const getRecord = (row:any)=>{
      openRecord.value = true
      const params = {
        networkId:row.id,
        currentUser:currentUser,
        sourceId:row.id,
        traceSource:1,//1--网点 2--个人
      }
      recordsParams.value = params
    }
    //设置跟进记录
    const setRecord = (row:any)=>{
      openAddRecord.value = true
      const params = {
        networkId:row.id,
        currentUser:currentUser,
        sourceId:row.id,
        traceSource:1,//1--网点 2--个人
      }
      setParams.value = params
    }
    //打开逾期账单
    const openOverdueBill = (row:any)=>{
      openBillRecord.value = true
      billParams.value =  {
        networkId:row.id
      }
    }
    //打开客户信息
    const openClientList = (row:any,type:string)=>{
      openClientRecord.value = true
      const params={
        size:1000,
        networkName:row.name,
        type:2
      }
      if(type == 'overdueCount'){
        params.type = 2
      }else if(type == 'compensatoryCount'){
        params.type = 3
      }
      openClientRecord.value = true
      clientParams.value =  params
    }
    const dialogOpenBack =(e:boolean)=>{
      console.log(e)
      openRecord.value = e
    } 
    const dialogAddBack =(e:boolean)=>{
      console.log(e)
      openAddRecord.value = e
    } 
    const dialogBillBack =(e:boolean)=>{
      openBillRecord.value = e
    }
    const dialogClientBack =(e:boolean)=>{
      openClientRecord.value = e
    }
    //设置标签
    const setLabelName = (row:{labelId:string,id:string})=>{
      const params = {
        labelId :row.labelId,
        networkId:row.id
      }
      setLabel(params).then(res=>{
        proxy.$message.success('设置成功')
      })
    }
    //设置区域
    const setDistrictName = (row:{districtId:string,id:string})=>{
      const params = {
        districtId :row.districtId,
        networkId:row.id
      }
      setDistrict(params).then(res=>{
        proxy.$message.success('设置成功')
      })
    }
    //设置移交渠道
    const setChannel = (row:{transferChannel:string,id:string})=>{
      const params = {
        transferChannel :row.transferChannel,
        networkId:row.id
      }
      setTransferChannel(params).then(res=>{
        proxy.$message.success('设置成功')
      })
    }
    //查看详情
    const toDetails = (name:any)=>{
      proxy.$router.push({
        path:'/outlets/outletsDetails',
        query:{
          networkName:name
        }
      })
    }
    onMounted(()=>{
      getTableData(true)
      getDistrictList()
      getChannelData()
    })
    return {
      Plus,
      Search,
      Delete,
      Refresh,
      proxy,
      type,
      queryParams,
      tableData,
      loading,
      page,
      typeData,
      districtData,
      channelData,
      labelData,
      openRecord,
      openAddRecord,
      openBillRecord,
      recordsParams,
      setParams,
      billParams,
      currentUser,
      setDistrictStatus,
      setChannelStatus,
      setLabelStatus,
      clientParams,
      openClientRecord,
      getTableData,
      resetQuery,
      getDistrictList,
      setLabelName,
      setDistrictName,
      setChannel,
      toDetails,
      getRecord,
      dialogOpenBack,
      dialogAddBack,
      dialogBillBack,
      setRecord,
      openOverdueBill,
      openClientList,
      dialogClientBack,
      channelFormat
    }
  }
})
</script>

<style lang="scss" scoped>
.col-red{
  color: red;
}
</style>