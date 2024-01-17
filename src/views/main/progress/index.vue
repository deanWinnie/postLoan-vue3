<template>
  <div class="dashboard-container clearfix">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="stat-box">
          <span class=" fs1">台帐统计</span>
            <el-form :model="ledgerParams" ref="queryForm" v-show="show.showLedger" :inline="true" label-width="85px">
              <el-form-item label="创建时间" prop="repaymentData">
                <el-date-picker
                  v-model="ledgerParams.repaymentData"
                  type="daterange"
                  style="width: 235px"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :icon="search" size="small" @click="GetTraceRecord">搜索</el-button>
              </el-form-item>
          </el-form>
          <div>
            <p class="tl">当日：{{ledgerData.today}}</p>
            <p class="tl">当月：{{ledgerData.theMonth}}</p>
            <p class="tl">总计：{{ledgerData.total}}</p>
          </div>
          <el-button class="search-btn" size="small" circle :icon="search" @click="transfer('showLedger')" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="stat-box">
          <span class=" fs1">备忘录统计</span>
            <el-form :model="memoParams" ref="queryForm" v-show="show.showMemo" :inline="true" label-width="85px">
              <el-form-item label="备忘时间" prop="repaymentData">
                <el-date-picker
                  v-model="memoParams.repaymentData"
                  type="daterange"
                  style="width: 235px"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :icon="search" size="small" @click="GetMemoRecord">搜索</el-button>
              </el-form-item>
          </el-form>
          <div>
            <p class="tl">当日：{{memoData.today}}</p>
            <p class="tl">当月：{{memoData.theMonth}}</p>
            <p class="tl">总计：{{memoData.total}}</p>
          </div>
          <el-button class="search-btn" size="small" circle :icon="search" @click="transfer('showMemo')" />
        </div>

      </el-col>
      <el-col :span="12">
        <div class="stat-box">
          <span class=" fs1">客服统计</span>
            <el-form :model="serviceParams" ref="queryForm" v-show="show.showService" :inline="true" label-width="85px">
              <el-form-item label="创建时间" prop="repaymentData">
                <el-date-picker
                  v-model="serviceParams.repaymentData"
                  type="daterange"
                  style="width: 235px"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :icon="search" size="small" @click="GetCallRecord">搜索</el-button>
              </el-form-item>
          </el-form>
          <div>
            <p class="tl">当日：{{serviceData.today}}</p>
            <p class="tl">当月：{{serviceData.theMonth}}</p>
            <p class="tl">总计：{{serviceData.total}}</p>
          </div>
          <el-button class="search-btn" size="small" circle :icon="search" @click="transfer('showService')" />
        </div>

      </el-col>
      <el-col :span="12">
        <div class="stat-box">
          <span class=" fs1">授信失败统计</span>
            <el-form :model="creditFailParams" ref="queryForm" v-show="show.showCreditFail" :inline="true" label-width="85px">
              <el-form-item label="创建时间" prop="repaymentData">
                <el-date-picker
                  v-model="creditFailParams.repaymentData"
                  type="daterange"
                  style="width: 235px"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :icon="search" size="small" @click="GetCreditRefuseRecord">搜索</el-button>
              </el-form-item>
          </el-form>
          <div>
            <p class="tl">当日：{{creditFailData.today}}</p>
            <p class="tl">当月：{{creditFailData.theMonth}}</p>
            <p class="tl">总计：{{creditFailData.total}}</p>
          </div>
          <el-button class="search-btn" size="small" circle :icon="search" @click="transfer('showCreditFail')" />
        </div>

      </el-col>
      <el-col :span="12">
        <div class="stat-box">
          <span class=" fs1">法务统计</span>
            <el-form :model="lawParams" ref="queryForm" v-show="show.showLaw" :inline="true" label-width="85px">
              <el-form-item label="创建时间" prop="repaymentData">
                <el-date-picker
                  v-model="lawParams.repaymentData"
                  type="daterange"
                  style="width: 235px"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :icon="search" size="small" @click="GetLawsuitRecord">搜索</el-button>
              </el-form-item>
          </el-form>
          <div>
            <p class="tl">当日：{{lawData.today}}</p>
            <p class="tl">当月：{{lawData.theMonth}}</p>
            <p class="tl">总计：{{lawData.total}}</p>
          </div>
          <el-button class="search-btn" size="small" circle :icon="search" @click="transfer('showLaw')" />
        </div>

      </el-col>
    </el-row>

  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { traceRecord, lawsuitRecord,creditRefuseRecord,callRecord,memoRecord } from '@/api/progress'
import useGlobalProperties from "@/utils/common/useGlobalProperties";
import { Search } from '@element-plus/icons';
export default defineComponent({
  name:'ProgressIndex',
  components: {
    Search
  },
  setup() {
    const search = Search
    const proxy = useGlobalProperties();
    const currentUser = sessionStorage.getItem('username')
   /**接口对应的返回信息 */
    let ledgerData = reactive({
      today:'',
      theMonth:'',
      total:''
    })
    let memoData = reactive({
      today:'',
      theMonth:'',
      total:''
    })
    let serviceData = reactive({
      today:'',
      theMonth:'',
      total:''
    })
    let creditFailData = reactive({
      today:'',
      theMonth:'',
      total:''
    })
    let lawData = reactive({
      today:'',
      theMonth:'',
      total:''
    })
    /**搜索条件 */
    let ledgerParams = reactive({
      repaymentData:[]
    })
    let memoParams = reactive({
      repaymentData:[]
    })
    let serviceParams = reactive({
      repaymentData:[]
    })
    let creditFailParams = reactive({
      repaymentData:[]
    })
    let lawParams = reactive({
      repaymentData:[]
    })
    /** 是否显示搜索框 */
    let show = reactive<{[key: string]: any}>({
      showLedger:false,
      showMemo: false,
      showService:false,
      showCreditFail:false,
      showLaw:false,
    })
    console.log(proxy);
    const GetTraceRecord = ()=>{
      const params = {
        dateStart:null,
        dateEnd:null,
        currentUser
      }
      if (ledgerParams.repaymentData && ledgerParams.repaymentData.length == 2) {
        params.dateStart = proxy.$moment(ledgerParams.repaymentData[0]).format(
          "YYYY-MM-DD"
        );
        params.dateEnd = proxy.$moment(ledgerParams.repaymentData[1]).format("YYYY-MM-DD");
      }
      traceRecord(params).then(res=>{
        ledgerData.total  = (res as any).result.total
        ledgerData.theMonth  = (res as any).result.theMonth
        ledgerData.today  = (res as any).result.today
      })
    }
    const GetLawsuitRecord = ()=>{
      const params = {
        dateStart:null,
        dateEnd:null,
        currentUser
      }
      if (lawParams.repaymentData && lawParams.repaymentData.length == 2) {
        params.dateStart = proxy.$moment(lawParams.repaymentData[0]).format(
          "YYYY-MM-DD"
        );
        params.dateEnd = proxy.$moment(lawParams.repaymentData[1]).format("YYYY-MM-DD");
      }
      lawsuitRecord(params).then(res=>{
        lawData.total  = (res as any).result.total
        lawData.theMonth  = (res as any).result.theMonth
        lawData.today  = (res as any).result.today
      })
    }
    const GetCreditRefuseRecord = ()=>{
      const params = {
        dateStart:null,
        dateEnd:null,
        currentUser
      }
      if (creditFailParams.repaymentData && creditFailParams.repaymentData.length == 2) {
        params.dateStart = proxy.$moment(creditFailParams.repaymentData[0]).format(
          "YYYY-MM-DD"
        );
        params.dateEnd = proxy.$moment(creditFailParams.repaymentData[1]).format("YYYY-MM-DD");
      }
      creditRefuseRecord(params).then(res=>{
        creditFailData.total  = (res as any).result.total
        creditFailData.theMonth  = (res as any).result.theMonth
        creditFailData.today  = (res as any).result.today
      })
    }
    const GetCallRecord = ()=>{
      const params = {
        dateStart:null,
        dateEnd:null,
        currentUser
      }
      if (serviceParams.repaymentData && serviceParams.repaymentData.length == 2) {
        params.dateStart = proxy.$moment(serviceParams.repaymentData[0]).format(
          "YYYY-MM-DD"
        );
        params.dateEnd = proxy.$moment(serviceParams.repaymentData[1]).format("YYYY-MM-DD");
      }
      callRecord(params).then(res=>{
        serviceData.total  = (res as any).result.total
        serviceData.theMonth  = (res as any).result.theMonth
        serviceData.today  = (res as any).result.today
      })
    }
    const GetMemoRecord = ()=>{
      const params = {
        dateStart:null,
        dateEnd:null,
        currentUser
      }
      if (memoParams.repaymentData && memoParams.repaymentData.length == 2) {
        params.dateStart = proxy.$moment(memoParams.repaymentData[0]).format(
          "YYYY-MM-DD"
        );
        params.dateEnd = proxy.$moment(memoParams.repaymentData[1]).format("YYYY-MM-DD");
      }
      memoRecord(params).then(res=>{
        memoData.total  = (res as any).result.total
        memoData.theMonth  = (res as any).result.theMonth
        memoData.today  = (res as any).result.today
      })
    }
    const transfer = (attr:string)=>{
      show[attr] = !(show[attr])
    }
    onMounted(()=>{
      GetMemoRecord()
      GetCallRecord()
      GetCreditRefuseRecord()
      GetTraceRecord()
      GetLawsuitRecord()
    })
    return{
      currentUser,
      ledgerParams,
      memoParams,
      serviceParams,
      creditFailParams,
      lawParams,
      ledgerData,
      memoData,
      serviceData,
      creditFailData,
      lawData,
      show,
      search,
      GetTraceRecord,
      GetLawsuitRecord,
      GetCreditRefuseRecord,
      GetCallRecord,
      GetMemoRecord,
      transfer
    }
  }
})
</script>

<style lang="scss" scoped>
    .tl{
    text-align: left;
  }
  
  .dashboard-container{
    // margin-top: 120px;
    padding: 30px;
    text-align: center;
    font-size: 25px;
    p{
      margin-top: 20px;
      margin-bottom: 0px;
      padding-left: 30px;
      font-size: 30px;
    }
    .stat-box{
      position: relative;
      background: white;
      box-shadow: 0 1px 4px rgba(0,21,41,.08);
      // margin-top: 20px;
      // margin-left: 10px;
      border: 1px solid rgb(191, 203, 217);
      width: 100%;
      height: 300px;
      border-radius: 20px;
      margin-bottom: 30px;
    }
    .search-btn{
      position: absolute;
      bottom: 10px;
      right:10px;
    }
    .fs1{
      font-size: 24px;
      display: block;
      margin-left: 10px;
      margin-top: 20px;
      margin-bottom: 10px;
    }
  }
  // ::v-deep{
  //   .el-form {
  //     display: inline-block;
  //   }
  //   .el-form-item{
  //     margin-bottom: 0px;
  //   }
  // }
</style>