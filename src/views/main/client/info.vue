<template>
  <div class="layout-container">
    <div class="layout-container-form flex space-between">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline" ref="queryForm" label-width="80px">
        <el-form-item label="客户名称" prop="idName" >
          <el-input v-model="queryParams.idName" ></el-input>
        </el-form-item>
        <el-form-item label="网点名称" prop="networkName">
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
        <el-form-item label="客户状态" prop="status">
          <el-select v-model="queryParams.status" prop="status">
            <el-option key="1" label="正常" value="1"></el-option>
            <el-option key="2" label="已结清" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结清未还清" prop="clearStatus">
          <el-select v-model="queryParams.clearStatus" prop="clearStatus">
            <el-option key="1" label="是" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="到期未结清" prop="dueStatus" >
          <el-select v-model="queryParams.dueStatus"  prop="dueStatus" >
            <el-option key="1" label="是" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="授信周期" prop="repaymentData" >
          <el-date-picker
            v-model="queryParams.repaymentData"
            type="daterange"
            placeholder=""
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否异常" prop="abnormalStatus">
          <el-select v-model="queryParams.abnormalStatus" >
            <el-option key="0" label="否" value="0"></el-option>
            <el-option key="1" label="是" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属渠道" prop="channelId">
          <el-select v-model="queryParams.channelId" >
            <el-option v-for="(item) in channelData" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="续贷状态" prop="refinanceStatus">
          <el-select v-model="queryParams.refinanceStatus" >
            <el-option key="0" label="成功" value="success"></el-option>
            <el-option key="1" label="失败" value="fail"></el-option>
            <el-option key="2" label="待定" value="waiting"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="网点区域" prop="districtId" v-if="type != 9">
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
        </el-form-item> -->
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
          inactive-text="暂停移交标签">
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
        <el-table-column prop="name" label="客户名称" align="center" >
          <template #default="scope">
            <div></div>
            <el-button @click="toClientDetails(scope.row.creditId,scope.$index)" link >
              {{scope.row.user.idName}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="user.phone" label="手机号码" align="center" >
          <template #default="scope">
            <span></span>
            <span class="bor-b">{{scope.row.user.phone}}</span><br>
            <span class="line">{{scope.row.otherPhone}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="networkName" label="网点名称" align="center">
          <template #default="scope">
            <el-button @click="toDetails(scope.row.networkName)" link>
              {{scope.row.networkName}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column 
          label="法人信息" 
          prop="overdueBillAmount" 
          align="center">
          <template #default="scope">
            <span></span>
            <span class="bor-b">{{scope.row.network.linkMan}}</span><br>
            <span class="line">{{scope.row.network.telephone}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="creditAmount" label="授信金额"  align="center"/>
        <el-table-column label="授信周期" prop="overdueCount"  align="center" >
          <template #default="scope">
            <span>{{scope.row.loanStartDate?proxy.$moment(scope.row.loanStartDate*1000).format("YYYY-MM-DD"):'-'}} -</span>
            <span>{{scope.row.loanEndDate?proxy.$moment(scope.row.loanEndDate*1000).format("YYYY-MM-DD"):'-'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="账单日" prop="compensatoryCount" :show-overflow-tooltip="true" align="center" >
          <template #default="scope">
            <span>{{scope.row.billDay}}号</span>
          </template>
        </el-table-column>
        <el-table-column label="还款日"  align="center">
          <template #default="scope">
            <span>{{scope.row.repaymentDay}}号</span>
          </template>
        </el-table-column>
        <el-table-column label="可用金额"  align="center" >
          <template #default="scope">
            <span>{{scope.row.surplusAmount}}元</span>
          </template>
        </el-table-column>
        <el-table-column label="已使用金额"  align="center" width="175" >
          <template #default="scope">
            <div v-if="scope.row.disbursedAmount == 0">{{scope.row.disbursedAmount}}</div>
            <el-button link v-else  @click="openBill(scope.row.user.idName,scope.row.networkName)">{{scope.row.disbursedAmount}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="districtId" align="center" >
          <template #default="scope">
            <p>{{scope.row.status===1?'正常':'已结清'}}</p>
          </template>
        </el-table-column>
        <el-table-column 
          label="结清日期" 
          prop="districtName" 
          align="center">
          <template  #default="scope">
            {{scope.row.settleDate===null?'':proxy.$moment(scope.row.settleDate*1000).format("YYYY-MM-DD")}}
          </template>
        </el-table-column>
        <el-table-column label="跟进记录" 
          prop="labelName" 
          align="center"
          width="120"
        >
          <template #default="scope">
            <el-button link @click="getRecord(scope.row)">查看</el-button> | <el-button link @click="setRecord(scope.row)">添加</el-button>
          </template>
        </el-table-column>
        <el-table-column label="客户标签" prop="labelName" align="center" v-if="setLabelStatus == false && type!=9"/>
        <el-table-column 
          label="客户标签" 
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
        <el-table-column label="移交渠道" prop="transferChannel" align="center"  v-if="setChannelStatus == false && type!=9"/>
        <el-table-column 
          label="移交渠道" 
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
        <el-table-column label="移交法务" 
      prop="labelName" 
      align="center"
      width="120"
    >
      <template #default="scope">
        <el-button link @click="setLaw(scope.row)" v-if="scope.row.transferLegal == 0">移交</el-button>
        <!-- <el-button link @click="setLaw(scope.row)" v-else>撤回</el-button> -->
        <p v-if="scope.row.transferLegal == 1">待接收</p>
        <p v-if="scope.row.transferLegal == 2">已接收</p>
      </template>
    </el-table-column>
      </Table>
    </div>
  </div>
  <FollowUpRecord :openRecord = 'openRecord' :recordsParams="recordsParams" @dialog-open-back="dialogOpenBack"></FollowUpRecord>
  <SetRecorde :openAddRecord = 'openAddRecord' :setParams = 'setParams' @dialog-add-back="dialogAddBack"></SetRecorde>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import Table from '@/components/table/index.vue'
import FollowUpRecord from './component/FollowUpRecord.vue'
import SetRecorde from './component/SetRecorde.vue'
import { Page } from '@/components/table/type'
import { districtList,labelList,setDistrict,setTransferChannel,setLabel} from '@/api/outlets'
import { listForLoan,getChannelList,setTransferLegal} from '@/api/client'
import { typeData } from './enum'
import { Plus, Search, Delete,Refresh } from '@element-plus/icons'
import useGlobalProperties from "@/utils/common/useGlobalProperties";
export default defineComponent({
  name: 'OutletsInfo',
  components: {
    Table,
    FollowUpRecord,
    SetRecorde
  },
  setup() {
    const proxy = useGlobalProperties();
    // 存储搜索用的数据
    const queryParams:any = reactive({
      type:0,
      networkName:'',
      labelId:null,
      districtId:null,
      refinanceStatus:null,
      channelId:null,
      abnormalStatus:null,
      repaymentData:null,
      dueStatus:null,
      clearStatus:null,
      status:null,
      idName:null
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
    let openRecord = ref(false)
    let openAddRecord = ref(false)
    let openBillRecord = ref(false)
    let openClientRecord = ref(false)
    let recordsParams = ref({})
    let setParams = ref({})
    let billParams = ref({})
    let clientParams = ref({})
    let setChannelStatus = ref(false)
    let setLabelStatus = ref(false)
    let setDistrictStatus = ref(false)
    let districtData:any = ref([])
    let channelData:any = ref([])
    let labelData:any = ref([])
    let currentUser = 'suilu'
    //*表单重置*//
    const resetQuery = () => {
      queryParams.type = 0
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
        ...queryParams,
        ...page
      }
      if(labelData.value.length == 0){
        let res = await labelList({size:1000,type:1})
        labelData.value = (res as any).page.records;
      }
      listForLoan(params).then(res => {
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
    //获取所有渠道
    const getChannelData = ()=>{
      getChannelList({}).then(res=>{
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
    //设置移交法务
    const setLaw = (row:any)=>{
      const params = {
        userId:row.userId,
        transferLegal:row.transferLegal
      }
      let text;
      if(params.transferLegal == 0){
        text = '移交'
      }else{
        text = '撤回'
      }
      proxy.$confirm('是否确认'+text+'?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(params.transferLegal == 0){
          params.transferLegal = 1;
          setTransferLegal(params).then(()=>{
            row.transferLegal = 1
            // this.tableKey++
            proxy.$message.success('移交成功')
          })
        }else{
          params.transferLegal = 0;
          setTransferLegal(params).then(()=>{
            row.transferLegal = 0
            proxy.$message.success('撤回成功')
          })
        }
      }).catch(() => {
        proxy.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    }
    /**查看跟进记录 */
    const getRecord = (row:any)=>{
      openRecord.value = true
      const params = {
        creditUserId:row.userId,
        currentUser:currentUser,
        sourceId:row.userId,
        traceSource:2,//1--网点 2--个人
      }
      recordsParams.value = params
    }
    //添加跟进记录
    const setRecord = (row:any)=>{
      openAddRecord.value = true
      const params = {
        creditUserId:row.userId,
        currentUser:currentUser,
        sourceId:row.userId,
        traceSource:2,//1--网点 2--个人
      }
      setParams.value = params
    }
    const dialogOpenBack =(e:boolean)=>{
      console.log(e)
      openRecord.value = e
    }
    const dialogAddBack =(e:boolean)=>{
      openAddRecord.value = e
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
    //查看客户详情
    const toClientDetails = (id:number,index:number)=>{
      proxy.$router.push({
        path:'/client/clientDetails',
        query:{
          id,
          index,
          currentPage:page.index
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
      setDistrictStatus,
      setChannelStatus,
      setLabelStatus,
      currentUser,
      openRecord,
      openAddRecord,
      openBillRecord,
      recordsParams,
      setParams,
      billParams,
      clientParams,
      getTableData,
      resetQuery,
      getDistrictList,
      setLabelName,
      setDistrictName,
      setChannel,
      toDetails,
      setLaw,
      getRecord,
      dialogOpenBack,
      setRecord,
      dialogAddBack,
      toClientDetails
    }
  }
})
</script>

<style lang="scss" scoped>
  
</style>