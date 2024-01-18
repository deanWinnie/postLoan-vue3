<template>
<el-dialog title="逾期账单" v-model="dialogOpen" @open="getList" :before-close = "handlepVisibleClose" width="1500px" append-to-body>
  <el-table :data="billList" class="checkRemarkModal" >
    <el-table-column prop="user.idName" label="账单用户" align="center"/>
    <el-table-column prop="user.phone" label="用户电话" align="center" width="120"/>
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
        <b :class="proxy.$moment(proxy.$moment(scope.row.repaymentDate * 1000).format('YYYY-MM-DD')).diff(proxy.$moment(scope.row.creditUser.loanEndDate * 1000).format('YYYY-MM-DD'), 'day')>-30?'col-red':proxy.$moment(proxy.$moment(scope.row.repaymentDate * 1000).format('YYYY-MM-DD')).diff(proxy.$moment(scope.row.creditUser.loanEndDate * 1000).format('YYYY-MM-DD'), 'day')>-60?'col-yellow':''">
          {{ proxy.$moment(scope.row.repaymentDate * 1000).format("YYYY-MM-DD") }}
        </b>
      </template>
    </el-table-column>
    <el-table-column prop="repaymentRate" label="还款比例" align="center">
      <template #default="scope">
        {{scope.row.repaymentMethod == 'installment'?'—':scope.row.repaymentRate + '%'}}
      </template>
    </el-table-column>
    <el-table-column prop="payAmount" label="账单金额" align="center"/>
    <el-table-column prop="overdueInterest" label="违约金" align="center"/>
    <el-table-column prop="incomeAmount" label="手续费 " align="center"/>
    <el-table-column prop="repayableAmount" label="总还款金额 " align="center" width="100">
      <template #default="scope">
        {{(scope.row.payAmount + scope.row.overdueInterest).toFixed(2)}}
      </template>
    </el-table-column>
    <el-table-column prop="repaymentAmount" label="已还款金额 " align="center" width="100"/>
    <el-table-column  label="授信到期日" align="center" width="95">
      <template #default="scope">
        <p :class="proxy.$moment(proxy.$moment().format('YYYY-MM-DD')).diff(proxy.$moment(scope.row.creditUser.loanEndDate * 1000).format('YYYY-MM-DD'), 'day')>-30 &&scope.row.status !=='已还款'?'red':proxy.$moment(proxy.$moment().format('YYYY-MM-DD')).diff(proxy.$moment(scope.row.creditUser.loanEndDate * 1000).format('YYYY-MM-DD'), 'day')>-60 && scope.row.status !=='已还款'?'yellow':''">{{ proxy.$moment(scope.row.creditUser.loanEndDate * 1000).format("YYYY-MM-DD") }}</p>
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
  </el-table>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted,watch} from 'vue'
import useGlobalProperties from "@/utils/common/useGlobalProperties"
import { getBillList,getDetailByMergeNo,getDetailByBillNo } from '@/api/client'
export default defineComponent({
  props: {
    openBillRecord:{type:Boolean},
    billParams:{type:Object},
    type:{type:Number,default:1}
  },
  setup(props,context){
    const proxy = useGlobalProperties()
    const billList:any = ref([])
    let dialogOpen = ref(false)
    // 对props中的数据进行监听
    watch(() => props.openBillRecord, (newX:boolean) => {
      console.log(newX)
      dialogOpen.value = newX
    })
    //把控制弹窗的参数传回父组件
    const handlepVisibleClose = (done:any)=>{
      context.emit("dialogBillBack", !dialogOpen.value)
      billList.value = []
      done()
    }
    const getList = ()=>{
      if(props.type === 1){
        getBillList({...props.billParams,status:1}).then(res => {
          billList.value = (res as any).page.records;
          }
        )
      }else if(props.type === 2){
        getDetailByBillNo({...props.billParams,status:1}).then(res => {
          billList.value[0] = (res as any).result;
          }
        )
      }else if(props.type === 3){
        getDetailByMergeNo({...props.billParams,status:1}).then(res => {
          billList.value = (res as any).result;
          }
        )
      }
    }
    return{
      proxy,
      billList,
      dialogOpen,
      handlepVisibleClose,
      getList
    }
  }
})
</script>