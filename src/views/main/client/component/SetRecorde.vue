<template>
  <el-dialog title="添加跟进记录" @open="openAddList('ledger')" :before-close = "handlepVisibleClose" v-model="dialogOpen" width="1000px" append-to-body>
      <el-row>
        <el-col :span="6" class="text-align-c">
          <el-button type="primary" size="large" @click="openAddList('ledger')" :disabled="recordType === 'ledger'">台账记录</el-button>
        </el-col>
        <el-col :span="6" class="text-align-c">
          <el-button type="primary" size="large" @click="openAddList('memo')" :disabled="recordType === 'memo'">备忘录记录</el-button>
        </el-col>
        <el-col :span="6" class="text-align-c">
          <el-button type="primary" size="large" @click="openAddList('service')" :disabled="recordType === 'service'">客服记录</el-button>
        </el-col>
        <el-col :span="6" class="text-align-c">
          <el-button type="primary" size="large" @click="openAddList('creditFail')" :disabled="recordType === 'creditFail'">授信失败记录</el-button>
        </el-col>
      </el-row>
      <p class="text-align-c fs-18 mt20">{{recordType == 'ledger'?'添加台账记录':recordType == 'memo'?'添加备忘录记录':recordType == 'service'?'添加客服记录':'添加授信失败记录'}}</p>
      <el-form ref="form" :model="ledgerForm" :rules="rules" label-width="80px" v-show="recordType === 'ledger'" size="default">
        <el-form-item label="跟进内容" prop="traceContent">
          <el-input type="textarea"
            :rows="8" v-model="ledgerForm.traceContent"></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="memoForm" :rules="rules" label-width="80px" v-show="recordType === 'memo'" size="default">
        <el-form-item label="备忘日期">
          <el-date-picker
              v-model="memoForm.memoDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="备忘内容">
          <el-input 
            type="textarea"
            :rows="8" 
            v-model="memoForm.memoContent"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="serviceForm" :rules="rules" label-width="80px" v-show="recordType === 'service'">
        <el-form-item label="咨询类型">
          <el-select v-model="serviceForm.callType" placeholder="请选择">
            <el-option
              v-for="item in addOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="跟进内容">
          <el-input type="textarea"
            :rows="8" v-model="serviceForm.callContent"></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="creditFailForm" :rules="rules" label-width="80px" v-show="recordType === 'creditFail'">
        <el-form-item label="授信类型">
          <el-select v-model="creditFailForm.creditType" placeholder="请选择">
            <el-option
              v-for="item in creditOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="失败原因">
          <el-input type="textarea"
            :rows="8" v-model="creditFailForm.refuseResaon"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" size="large" @click="submitForm" >确 定</el-button>
        </div>
      </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted,watch} from 'vue'
import { addRecord,memoAdd,callAdd,creditAdd } from '@/api/progressIndex'
import useGlobalProperties from "@/utils/common/useGlobalProperties"

export default defineComponent({
  props:['openAddRecord','setParams'],
  setup(props,context){
    const proxy = useGlobalProperties()
    let recordType =ref('ledger')
    let form:any = ref(null)
    let dialogOpen = ref(false)
    let ledgerForm = ref({
      traceContent:''
    })
    let memoForm = ref({
      memoDate:'',
      memoContent:''
    })
    let serviceForm = ref({
      callType:'',
      callContent:''
    })
    let creditFailForm = ref({
      creditType:'',
      refuseResaon:''
    })
    const addOptions = ref([
      { value: 1,label: '咨询' }, 
      { value: 2,label: '投诉' },
    ])
    const creditOptions = ref([
      { value: 1,label: '初贷' }, 
        { value: 2,label: '续贷' }, 
    ])
    const rules = reactive({
      traceContent: [
        { required: true, message: '跟进内容不能为空', trigger: 'blur' },
      ]
    })
    // 对props中的数据进行监听
    watch(() => props.openAddRecord, (newX:boolean) => {
      dialogOpen.value = newX
      console.log(`x is ${newX}`)
    })
    //切换不同的提交窗口
    const openAddList =(type:string)=>{
      recordType.value = type
    }
    /** 提交按钮 */
    const submitForm =()=> {
      form.value.validate((valid:any) => {
        if (valid) {
          if(recordType.value == 'ledger'){
            toAddRecord()
          }else if(recordType.value == 'memo'){
            toMemoAdd()
          }else if(recordType.value == 'service'){
            toServiceAdd()
          }else if(recordType.value == 'creditFail'){
            toCreditFailAdd()
          }
        }
      });
    }
    //添加台账记录
    const toAddRecord = ()=>{
      const params = {
        ...props.setParams,
        ...ledgerForm
      }
      addRecord(params).then(res=>{
        proxy.$message.success('添加成功')
        ledgerForm.value={
          traceContent:''
        };
      })
    }
    //添加备忘录记录
    const toMemoAdd = ()=>{
      const params = {
        ...props.setParams,
        ...memoForm
      }
      memoAdd(params).then(res=>{
        proxy.$message.success('添加成功')
        memoForm.value={
          memoDate:'',
          memoContent:''
        };
      })
    }
     //添加客服记录
    const toServiceAdd = ()=>{
      const params = {
        ...props.setParams,
        ...serviceForm
      }
      callAdd(params).then(res=>{
        proxy.$message.success('添加成功')
        serviceForm.value={
          callType:'',
          callContent:''
        };
      })
    }
    //添加授信失败记录
    const toCreditFailAdd = ()=>{
      const params = {
        ...props.setParams,
        ...creditFailForm
      }
      creditAdd(params).then(res=>{
        proxy.$message.success('添加成功')
        creditFailForm.value={
          creditType:'',
          refuseResaon:''
        };
      })
    }
    //把控制弹窗的参数传回父组件
    const handlepVisibleClose = (done:any)=>{
      context.emit("dialogAddBack", !dialogOpen.value)
      done()
    }
    return{
      proxy,
      recordType,
      memoForm,
      ledgerForm,
      creditFailForm,
      serviceForm,
      creditOptions,
      addOptions,
      rules,
      dialogOpen,
      openAddList,
      submitForm,
      toAddRecord,
      toMemoAdd,
      toServiceAdd,
      toCreditFailAdd,
      handlepVisibleClose
    }
  }
})
</script>

<style lang="scss" scoped>
  
</style>