<template>
  <el-dialog title="客户信息" v-model="dialogOpen" :before-close = "handlepVisibleClose" width="1000px" @open="getList" append-to-body> 
    <el-table :data="clientList" class="checkRemarkModal" >
      <el-table-column prop="user.idName" label="客户名称" align="center"/>
      <el-table-column prop="user.phone" label="手机号码" align="center" >
        <template #default="scope">
          <span></span>
          <span class="bor-b">{{scope.row.user.phone}}</span><br>
          <span class="line">{{scope.row.otherPhone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="授信周期" align="center" >
        <template #default="scope">
          <span>{{scope.row.loanStartDate?proxy.$moment(scope.row.loanStartDate*1000).format("YYYY-MM-DD"):'-'}} - </span>
          <span>{{scope.row.loanEndDate?proxy.$moment(scope.row.loanEndDate*1000).format("YYYY-MM-DD"):'-'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="可用金额" align="center" prop="surplusAmount"/>
      <el-table-column label="已使用金额" align="center" prop="disbursedAmount"/>  
    </el-table>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted,watch} from 'vue'
import useGlobalProperties from "@/utils/common/useGlobalProperties"
import { getOverdueBillForNetworkId } from '@/api/outlets'
import { listForLoan } from "@/api/client";
export default defineComponent({
  props:['openClientRecord','clientParams'],
  setup(props,context){
    const proxy = useGlobalProperties()
    const clientList = ref([])
    let dialogOpen = ref(false)
    // 对props中的数据进行监听
    watch(() => props.openClientRecord, (newX:boolean) => {
      console.log(newX)
      dialogOpen.value = newX
    })
    //把控制弹窗的参数传回父组件
    const handlepVisibleClose = (done:any)=>{
      context.emit("dialogClientBack", !dialogOpen.value)
      clientList.value = []
      done()
    }
    const getList = ()=>{
      listForLoan(props.clientParams).then(res => {
          clientList.value = (res as any).page.records;
        }
      )
    }
    return{
      proxy,
      clientList,
      dialogOpen,
      handlepVisibleClose,
      getList
    }
  }
})
</script>