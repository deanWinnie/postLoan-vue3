<template>
 <el-dialog title="跟进记录" v-model="dialogOpen" @open="openList('ledger')" :before-close = "handlepVisibleClose" width="1500px" append-to-body custom-class="record-dialog" >
  <el-row>
    <el-col :span="6" class="text-align-c">
      <el-button type="primary" @click="openList('ledger')" :disabled="listType === 'ledger'">台账记录</el-button>
    </el-col>
    <el-col :span="6" class="text-align-c">
      <el-button type="primary" @click="openList('memo')" :disabled="listType === 'memo'">备忘录记录</el-button>
    </el-col>
    <el-col :span="6" class="text-align-c">
      <el-button type="primary" @click="openList('service')" :disabled="listType === 'law'">客服记录</el-button>
    </el-col>
    <el-col :span="6" class="text-align-c">
      <el-button type="primary" @click="openList('creditFail')" :disabled="listType === 'creditFail'">授信失败记录</el-button>
    </el-col>
  </el-row>
  <p class="tc fs-1 mt20">{{listType == 'ledger'?'台账记录':listType == 'memo'?'备忘录记录':listType == 'service'?'客服记录':'授信失败记录'}}</p>
  <el-row :gutter="20">
      <el-table :data="ledgerList"  v-show="listType === 'ledger'">
        <el-table-column prop="networkName" label="网点名称" align="left"/>
        <el-table-column prop="traceContent" label="跟进内容" align="left" width="120"/>
        <el-table-column prop="traceUser" label="	跟进人" align="left"/>
        <el-table-column prop="addTime" label="跟进时间" align="left">
          <template #default="scope">
            {{ proxy.$moment(scope.row.addTime*1000).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="memoList"  v-show="listType === 'memo'">
        <el-table-column prop="networkName" label="网点名称" align="left"/>
        <el-table-column prop="memoContent" label="备忘内容" align="left"/>
        <el-table-column prop="memoDate" label="备忘日期" align="left"
        >
          <template #default="scope">
            {{ proxy.$moment(scope.row.memoDate*1000).format("YYYY-MM-DD") }}
          </template>
        </el-table-column>
        <el-table-column prop="traceUser" label="备忘人" align="left"/>
        <el-table-column prop="addTime" label="跟进时间" align="left"
        >
          <template #default="scope">
            {{ proxy.$moment(scope.row.addTime*1000).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="lawList" v-show="listType === 'law'"  :span-method="objectSpanMethod">
        <el-table-column prop="networkName" label="网点名称" align="left"/>
        <el-table-column prop="lawsuitUser" label="涉诉人" align="left"/>
        <el-table-column prop="lawsuitContent" label="诉讼内容" align="left"/>
        <el-table-column label="付款" prop="payment" align="left"/>
        <el-table-column label="跟进时间" prop="contentAddtime" align="left" width="170">
          <template #default="scope">
            {{ scope.row.contentAddtime?proxy.$moment(scope.row.contentAddtime * 1000).format("YYYY-MM-DD HH:mm:ss"):''}}
          </template>
        </el-table-column>
        <el-table-column prop="traceUser" label="跟进人" align="left"/>
        <el-table-column prop="addTime" label="跟进时间" align="left"
        >
          <template #default="scope">
            {{ proxy.$moment(scope.row.addTime*1000).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="serviceList" v-show="listType === 'service'">
        <el-table-column prop="networkName" label="网点名称" align="left"/>
        <el-table-column prop="creditUser" label="授信人" align="left"/>
        <el-table-column 
          prop="callType" 
          label="咨询类型" 
          align="left"
        >
          <template #default="scope">
            {{scope.row.callType == 1?'咨询':'投诉'}}
          </template>
        </el-table-column>
        <el-table-column prop="callContent" label="客服内容" align="left"/>
        <el-table-column prop="traceUser" label="跟进人" align="left"/>
        <el-table-column prop="addTime" label="跟进时间" align="left">
          <template #default="scope">
            {{ proxy.$moment(scope.row.addTime*1000).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="creditFailList" v-show="listType === 'creditFail'">
        <el-table-column prop="networkName" label="网点名称" align="left"/>
        <el-table-column prop="creditUser" label="授信客户" align="left"/>
        <el-table-column 
          prop="callType" 
          label="授信类型" 
          align="left"
        >
          <template #default="scope">
            {{scope.row.creditType == 1?'初贷':'续贷'}}
          </template>
        </el-table-column>
        <el-table-column prop="refuseResaon" label="失败原因" align="left"/>
        <el-table-column prop="traceUser" label="跟进人" align="left"/>
        <el-table-column prop="addTime" label="跟进时间" align="left"
        >
          <template #default="scope">
            {{ proxy.$moment(scope.row.addTime*1000).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
      </el-table>
  </el-row>
</el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted,watch} from 'vue'
import useGlobalProperties from "@/utils/common/useGlobalProperties"
import { lawsuitRecord,callRecord,memoRecord,listRecord,creditRecord } from '@/api/progressIndex'
export default defineComponent({
  props:['openRecord','recordsParams'],
  setup(props,context){
    const proxy = useGlobalProperties()
    let listType = ref('ledger')
    const ledgerList = ref([])
    const lawList:any = ref([])
    const memoList = ref([])
    const serviceList = ref([])
    let spanArr:any = ref([])
    let dialogOpen = ref(false)
    // 对props中的数据进行监听
    watch(() => props.openRecord, (newX:boolean) => {
      dialogOpen.value = newX
      console.log(`x is ${newX}`)
    })
    //打开对应的记录列表
    const openList = (type:string)=>{
      listType.value = type
      if(type == 'ledger'){
        getLedgerList(props.recordsParams)
      }else if(type == 'memo'){
        getMemoList(props.recordsParams)
      }else if(type == 'service'){
        getServiceList(props.recordsParams)
      }else if(type == 'creditFail'){
        getCreditFailList(props.recordsParams)
      }
    }
    //获取台账记录
    const getLedgerList = (params:any)=>{
      listRecord(params,{page:1,size:2000}).then(res => {
          ledgerList.value = (res as any).page.records;
        }
      )
    }
    //获取备忘录记录
    const getMemoList = (params:any)=>{
      memoRecord(params,{page:1,size:2000}).then(res => {
          memoList.value = (res as any).page.records;
        }
      )
    }
    //获取客服记录
    const getServiceList = (params:any) =>{
      callRecord(params,{page:1,size:2000}).then(res=>{
        serviceList.value = (res as any).page.records;
      })
    }
    //获取授信失败记录
    const getCreditFailList = (params:any) =>{
      creditRecord(params,{page:1,size:2000}).then(res=>{
        serviceList.value = (res as any).page.records;
      })
    }
    //把控制弹窗的参数传回父组件
    const handlepVisibleClose = (done:any)=>{
      context.emit("dialogOpenBack", !dialogOpen.value)
      done()
    }
    return {
      proxy,
      listType,
      ledgerList,
      lawList,
      memoList,
      serviceList,
      dialogOpen,
      spanArr,
      openList,
      handlepVisibleClose,
      getServiceList,
      getCreditFailList
    }
  }
})
  

</script>

<style lang="scss" scoped>
  
</style>