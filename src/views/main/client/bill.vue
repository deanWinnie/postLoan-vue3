<template>
  <div class="layout-container">
    <div class="layout-container-form flex space-between">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline" ref="queryForm" label-width="80px">
        <el-form-item label="账单周期" prop="billDate" >
          <el-date-picker
            v-model="dateParams.billDate"
            type="daterange"
            placeholder=""
            style="width: 235px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="还款日" prop="repaymentDate">
          <el-date-picker
            v-model="queryParams.repaymentDate"
            type="date"
            style="width: 235px"
            value-format="YYYY-MM-DD"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="还款形式" prop="repaymentMode">
          <el-select
            v-model="queryParams.repaymentMode"
            style="width: 235px"
          >
            <el-option
              v-for="item in repayList"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逾期天数" prop="overDaysStatus">
          <el-select
            v-model="queryParams.overDaysStatus"
            style="width: 235px"
          >
            <el-option
              v-for="item in overdueDay"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逾期年份" prop="overYear">
          <el-select
            v-model="queryParams.overYear"
            style="width: 235px"
          >
            <el-option
              v-for="item in overdueYear"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="逾期月份" prop="overMoth">
          <el-select
            v-model="queryParams.overMoth"
            style="width: 235px"
          >
            <el-option
              v-for="item in overdueMonth"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户名称" prop="idName" >
          <el-input v-model="queryParams.idName" ></el-input>
        </el-form-item>
        <el-form-item label="网点名称" prop="siteName">
          <el-input v-model="queryParams.siteName" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item label="还款周期" prop="repaymentData">
          <el-date-picker
            v-model="dateParams.repaymentData"
            type="daterange"
            style="width: 235px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="授信到期日" prop="loanEndDate">
          <el-date-picker
            v-model="dateParams.loanEndDate"
            type="daterange"
            style="width: 235px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="还款日期" prop="timeData">
          <el-date-picker
            v-model="dateParams.timeData"
            type="daterange"
            style="width: 235px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="所属渠道" prop="channelId">
          <el-select v-model="queryParams.channelId" >
            <el-option v-for="(item) in channelData" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否子账单" prop="isSonBill">
          <el-select
            v-model="queryParams.isSonBill"
            style="width: 235px"
          >
            <el-option
              v-for="item in fatherList"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否空账单" prop="nullBillShow">
          <el-select
            v-model="queryParams.nullBillShow"
            style="width: 235px"
          >
            <el-option
              v-for="item in billShowList"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
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
        :showTableRowClassName = 'true'
        @getTableData="getTableData"
      >
        <el-table-column
          prop="user.idName"
          label="账单用户"
          align="center"
          width="120"
        >
          <template #default="scope">
              <p>{{ scope.row.user.idName }}</p>
              <p>{{ scope.row.user.phone }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="站点名称"
          align="center"
          width="140"
        >
        <template #default="scope">
          <p class="normalText">
            {{ scope.row.network.name }}
          </p>
        </template>
        </el-table-column>
        <el-table-column
          prop="idNo"
          label="账单周期丨还款日"
          align="center"
          width="200"
        >
          <template #default="scope">
            <div>
              {{ proxy.$moment(scope.row.startDate * 1000).format("YYYY-MM-DD") }} -
              {{ proxy.$moment(scope.row.endDate * 1000).format("YYYY-MM-DD") }}
            </div>
            <b :class="proxy.$moment(proxy.$moment(scope.row.repaymentDate * 1000).format('YYYY-MM-DD')).diff(proxy.$moment(scope.row.creditUser.loanEndDate * 1000).format('YYYY-MM-DD'), 'day')>-30?'red':proxy.$moment(proxy.$moment(scope.row.repaymentDate * 1000).format('YYYY-MM-DD')).diff(proxy.$moment(scope.row.creditUser.loanEndDate * 1000).format('YYYY-MM-DD'), 'day')>-60?'yellow':''">
              {{ proxy.$moment(scope.row.repaymentDate * 1000).format("YYYY-MM-DD") }}
            </b>
          </template>
        </el-table-column>
        <el-table-column prop="payAmount" label="账单金额" align="center">
        </el-table-column>
        <el-table-column prop="overdueInterest" label="违约金" align="center">
        </el-table-column>
        <el-table-column prop="handInterest" label="终值" align="center">
        </el-table-column>
        <el-table-column prop="incomeAmount" label="手续费 " align="center">
        </el-table-column>
        <el-table-column prop="repayableAmount" label="总还款金额 " align="center" width="100">
          <template #default="scope">
            {{(scope.row.payAmount + scope.row.overdueInterest).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="repaymentAmount" label="已还款金额 " align="center" width="100"></el-table-column>
        <el-table-column  label="授信到期日" align="center" width="95">
          <template #default="scope">
            <p :class="proxy.$moment(proxy.$moment().format('YYYY-MM-DD')).diff(proxy.$moment(scope.row.creditUser.loanEndDate * 1000).format('YYYY-MM-DD'), 'day')>-30 &&scope.row.status !=='已还款'?'col-red':proxy.$moment(proxy.$moment().format('YYYY-MM-DD')).diff(proxy.$moment(scope.row.creditUser.loanEndDate * 1000).format('YYYY-MM-DD'), 'day')>-60 && scope.row.status !=='已还款'?'col-yellow':''">{{ proxy.$moment(scope.row.creditUser.loanEndDate * 1000).format("YYYY-MM-DD") }}</p>
            <p>{{scope.row.creditUser.status == 1?'正常':scope.row.creditUser.status == 2?'已结清':''}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="isOverdue" label="是否逾期" align="center" >
          <template #default="scope">
            <p :class="scope.row.isOverdue == 1 && scope.row.status !=='已还款'?'delayText':'normalText'">
              {{ scope.row.isOverdue == 1 ? "是" : "否" }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="applyAmt" label="逾期天数" align="center">
          <template #default="scope">
            <p>{{ scope.row.isOverdue == 1 ? scope.row.overdueDays : 0 }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="repayMethodText" label="账单状态" align="center">
          <template #default="scope">
            <p class="normalText">
              {{ scope.row.status ==1?'待还款':scope.row.status ==2?'已还款':scope.row.status ==3?'分期中':""}}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="父账单"
          align="center"
          width="100"
          >
          <template #default="scope" >
            <div class="toDetail"><el-button type="text" :disabled='scope.row.parentBillNo ==null' @click="openParentBill(scope.row.parentBillNo)">{{scope.row.parentBillNo ==null?'-':'查看详情'}}</el-button></div>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="合并账单"
          align="center"
          width="100"
          >
          <template #default="scope" >
            <div class="toDetail"><el-button type="text" :disabled='scope.row.isMergeBill ==0' @click="openMergeBill(scope.row.billNo)">{{scope.row.isMergeBill ==0?'-':'查看详情'}}</el-button></div>
          </template>
        </el-table-column>
      </Table>
    </div>
  </div>
  <FollowUpRecord :openRecord = 'openRecord' :recordsParams="recordsParams" @dialog-open-back="dialogOpenBack"></FollowUpRecord>
  <SetRecorde :openAddRecord = 'openAddRecord' :setParams = 'setParams' @dialog-add-back="dialogAddBack"></SetRecorde>
  <Bill :type="billType" :openBillRecord = 'openBillRecord' :billParams = 'billParams' @dialog-bill-back="dialogBillBack"></Bill>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import Table from '@/components/table/index.vue'
import FollowUpRecord from './component/FollowUpRecord.vue'
import SetRecorde from './component/SetRecorde.vue'
import Bill from './component/Bill.vue'
import { Page } from '@/components/table/type'
import { districtList,labelList,setLabel} from '@/api/outlets'
import { getChannelList,getBillList} from '@/api/client'
import { typeData } from './enum'
import { Plus, Search, Delete,Refresh } from '@element-plus/icons'
import useGlobalProperties from "@/utils/common/useGlobalProperties";
export default defineComponent({
  name: 'ClientBill',
  components: {
    Table,
    FollowUpRecord,
    SetRecorde,
    Bill
  },
  setup() {
    const proxy = useGlobalProperties();
    // 存储搜索用的数据
    const queryParams:any = reactive({
      siteName:null,
      repaymentDate:null,
      repaymentMode:null,
      overDaysStatus:null,
      overYear:null,
      overMoth:null,
      idName:null,
      channelId:null,
      isSonBill:null,
      nullBillShow:null
    })
    const dateParams:any = reactive({
      repaymentData:[],
      timeData:[],
      billDate:[],
      loanEndDate:[]
    })
    const repayList = ref([
      { value: "", label: "全部" },
      { value: 'PRINCIPAL_INTEREST', label: "全额还款" },
      { value: 'ONLY_INTEREST', label: "仅手续费" },
    ])
    const fatherList = ref([
      { value: "", label: "全部" },
      { value: '1', label: "是" },
      { value: '0', label: "否" },
    ])
    const billShowList = ref([
      { value: "", label: "全部" },
      { value: true, label: "是" },
      { value: false, label: "否" },
    ])
    const overdueYear = ref([
      { value: "", label: "全部" },
      { value: 2019, label: "2019年" },
      { value: 2020, label: "2020年" },
      { value: 2021, label: "2021年" },
    ])
    const overdueMonth = ref([
      { value: "", label: "全部" },
      { value: "01", label: "1月" },
      { value: "02", label: "2月" },
      { value: "03", label: "3月" },
      { value: "04", label: "4月" },
      { value: "05", label: "5月" },
      { value: "06", label: "6月" },
      { value: "07", label: "7月" },
      { value: "08", label: "8月" },
      { value: "09", label: "9月" },
      { value: "10", label: "10月" },
      { value: "11", label: "11月" },
      { value: "12", label: "12月" }
    ])
    const overdueDay = ref([
      { value: "", label: "全部" },
      { value: 1, label: "1天" },
      { value: 2, label: "2-5天" },
      { value: 3, label: "6-30天" },
      { value: 4, label: "30天以上" },
      { value: 5, label: "30-90天" },
      { value: 6, label: "90天以上" },
      { value: 7, label: "90-365天" },
      { value: 8, label: "365天以上" },
    ])
    const stateList = ref([
      { value: -1, label: "全部" },
      { value: 1, label: "待还款" },
      { value: 2, label: "已还款" },
      { value: 3, label: "分期中" }
    ])
    // 分页参数, 供table使用
    const page: Page = reactive({
      index: 1,
      size: 10,
      total: 0
    })
    const loading = ref(true)
    const tableData = ref([])
    const type = ref(1)
    let billType = ref(1)
    let openRecord = ref(false)
    let openAddRecord = ref(false)
    let openBillRecord = ref(false)
    let recordsParams = ref({})
    let setParams = ref({})
    let billParams = ref({})
    let clientParams = ref({})
    let setChannelStatus = ref(false)
    let setLabelStatus = ref(false)
    let districtData:any = ref([])
    let channelData:any = ref([])
    let labelData:any = ref([])
    let currentUser = 'suilu'
    //*表单重置*//
    const resetQuery = () => {
      queryParams.siteName=null
      queryParams.repaymentDate=null
      queryParams.repaymentMode=null
      queryParams.overDaysStatus=null
      queryParams.overYear=null
      queryParams.overMoth=null
      queryParams.idName=null
      queryParams.channelId=null
      queryParams.isSonBill=null
      queryParams.nullBillShow=null
      dateParams.billDate = []
      dateParams.repaymentData = []
      dateParams.timeData = []
      dateParams.loanEndDate = []
      delete queryParams.repaymentStartDate
      delete queryParams.repaymentEndDate
      delete queryParams.startDate
      delete queryParams.endDate
      delete queryParams.repaymentTimeStart
      delete queryParams.repaymentTimeEnd
      delete queryParams.loanEndDate1
      delete queryParams.loanEndDate2
      getTableData(false)
    }
    // 获取表格数据
    // params <init> Boolean ，默认为false，用于判断是否需要初始化分页
    const  getTableData = async (init: boolean) => {
      loading.value = true
      if (init) {
        page.index = 1
      }
      if (dateParams.repaymentData && dateParams.repaymentData.length == 2) {
        queryParams.repaymentStartDate = proxy.$moment(dateParams.repaymentData[0]).format(
          "YYYY-MM-DD"
        );
        queryParams.repaymentEndDate = proxy.$moment(dateParams.repaymentData[1]).format("YYYY-MM-DD");
      }
      if (dateParams.billDate && dateParams.billDate.length == 2) {
        queryParams.startDate = proxy.$moment(dateParams.billDate[0]).format(
          "YYYY-MM-DD"
        );
        queryParams.endDate = proxy.$moment(dateParams.billDate[1]).format("YYYY-MM-DD");
      }
      if (dateParams.timeData && dateParams.timeData.length == 2) {
        queryParams.repaymentTimeStart = proxy.$moment(dateParams.timeData[0]).format(
          "YYYY-MM-DD"
        );
        queryParams.repaymentTimeEnd = proxy.$moment(dateParams.timeData[1]).format("YYYY-MM-DD");
      }
      if (dateParams.loanEndDate && dateParams.loanEndDate.length == 2) {
        queryParams.loanEndDate1 = proxy.$moment(dateParams.loanEndDate[0]).format(
          "YYYY-MM-DD"
        );
        queryParams.loanEndDate2 = proxy.$moment(dateParams.loanEndDate[1]).format("YYYY-MM-DD");
      }
      
      let params = {
        ...queryParams,
        ...page
      }
      getBillList(params).then(res => {
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
   /**查看父账单 */
    const openParentBill = (parentBillNo:string)=>{
      billType.value = 2
      openBillRecord.value = true
      billParams.value =  {
        billNo:parentBillNo,
      }
    }
    /**查看合并账单 */
    const openMergeBill = (id:string)=>{
      billType.value = 3
      openBillRecord.value = true
      billParams.value =  {
        billNo:id,
      }
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
    const dialogBillBack =(e:boolean)=>{
      openBillRecord.value = e
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
      stateList,
      overdueDay,
      overdueMonth,
      overdueYear,
      repayList,
      fatherList,
      billShowList,
      dateParams,
      billType,
      getTableData,
      resetQuery,
      getDistrictList,
      toDetails,
      dialogOpenBack,
      setRecord,
      dialogAddBack,
      dialogBillBack,
      toClientDetails,
      openParentBill,
      channelFormat,
      openMergeBill,
    }
  }
})
</script>

<style lang="scss" scoped>
.col-red{
  color: red !important;
}
.col-yellow{
  color: chocolate !important;
}
</style>