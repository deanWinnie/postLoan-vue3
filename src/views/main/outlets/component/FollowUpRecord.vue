<template>
 <el-dialog title="跟进记录" v-model="dialogOpen" @open="openList('ledger')" :before-close = "handlepVisibleClose" width="1500px" append-to-body  >
  <el-row>
    <el-col :span="8" class="text-align-c">
      <el-button type="primary" @click="openList('ledger')" :disabled="listType === 'ledger'">台账记录</el-button>
    </el-col>
    <el-col :span="8" class="text-align-c">
      <el-button type="primary" @click="openList('memo')" :disabled="listType === 'memo'">备忘录记录</el-button>
    </el-col>
    <el-col :span="8" class="text-align-c">
      <el-button type="primary" @click="openList('law')" :disabled="listType === 'law'">法务记录</el-button>
    </el-col>
  </el-row>
  <p class="tc fs-1 mt20">{{listType == 'ledger'?'台账记录':listType == 'memo'?'备忘录记录':'法务记录'}}</p>
  <el-row :gutter="20">
      <el-table :data="ledgerList"  v-show="listType === 'ledger'">
        <el-table-column prop="networkName" label="网点名称" align="left"/>
        <el-table-column prop="traceContent" label="跟进内容" align="left" width="120"/>
        <el-table-column prop="traceUser" label="	跟进人" align="left"/>
        <el-table-column prop="addTime" label="跟进时间" align="left"
        >
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
  </el-row>
</el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted,watch} from 'vue'
import useGlobalProperties from "@/utils/common/useGlobalProperties"
import { lawsuitRecord,callRecord,memoRecord,listRecord } from '@/api/progressIndex'
export default defineComponent({
  props:['openRecord','recordsParams'],
  setup(props,context){
    const proxy = useGlobalProperties()
    let listType = ref('ledger')
    const ledgerList = ref([])
    const lawList:any = ref([])
    const memoList = ref([])
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
      }else if(type == 'law'){
        getlawList(props.recordsParams)
      }
    }
    //
    const getLedgerList = (params:any)=>{
      listRecord(params,{page:1,size:2000}).then(res => {
          ledgerList.value = (res as any).page.records;
        }
      )
    }
    const getMemoList = (params:any)=>{
      memoRecord(params,{page:1,size:2000}).then(res => {
          memoList.value = (res as any).page.records;
        }
      )
    }
    const getlawList = (params:any)=>{
      lawsuitRecord(params,{page:1,size:2000}).then(res => {
          const dataList = (res as any).page.records
          const finallyList = []
          console.log(dataList)
          for(let i=0;i<dataList.length;i++){
            if(dataList[i].contentList.length == 0){
              finallyList.push({
                networkName:dataList[i].networkName,
                networkId:dataList[i].networkId,
                lawsuitUser:dataList[i].lawsuitUser,
                lawsuitContent:'',
                payment:'',
                traceUser:dataList[i].traceUser,
                addTime:dataList[i].addTime,
                contentAddtime:undefined,
                id:dataList[i].id
              })
            }else{
              for(let j=0;j<dataList[i].contentList.length;j++){
                finallyList.push({
                  networkName:dataList[i].networkName,
                  networkId:dataList[i].networkId,
                  lawsuitUser:dataList[i].lawsuitUser,
                  lawsuitContent:dataList[i].contentList[j].content,
                  traceUser:dataList[i].traceUser,
                  addTime:dataList[i].addTime,
                  contentAddtime:dataList[i].contentList[j].addTime,
                  id:dataList[i].id,
                  payment:dataList[i].contentList[j].payment,
                })
              }
            }
          }
          (lawList as any).value = finallyList
          flitterData()
        }
      )
    }
    //合并数据处理
    const flitterData =  ()=> { 
      let contactDot = 0;
      let arr:any = [];
      lawList.value.forEach((item:any, index:any) => {
        if (index === 0) { 
          arr.push(1)
        } else {
          if (item.networkName === lawList.value[index - 1].networkName &&item.lawsuitUser === lawList.value[index - 1].lawsuitUser) {
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
      dialogOpen,
      spanArr,
      openList,
      handlepVisibleClose,
      objectSpanMethod
    }
  }
})
  

</script>

<style lang="scss" scoped>
  
</style>