<template>
  <div class="layout-container">
    <div class="layout-container-form flex space-between">
      <el-form :inline="true" :model="queryParams" class="demo-form-inline" ref="queryForm">
        <el-form-item label="区域名称" prop="districtName">
          <el-input v-model="queryParams.districtName" placeholder="请输入" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTableData(true)" :icon="Search">搜索</el-button>
          <el-button :icon="Refresh" size="small" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="layout-container-form flex space-between">
      <el-button
         type="primary"
         :icon="Plus"
         size="small"
         @click="handleAdd"
       >新增</el-button>
    </div>
    <div class="layout-container-table">
      <Table
        ref="table"
        v-model:page="page"
        v-loading="loading"
        :data="tableData"
        @getTableData="getTableData"
      >
        <el-table-column prop="districtName" label="区域名称" align="center" />
        <el-table-column prop="creator" label="创建人" align="center" />
        <el-table-column prop="addTime" label="创建时间" align="center">
          <template #default="scope">
            <div>{{ proxy.$moment(scope.row.addTime * 1000).format("YYYY-MM-DD hh:mm:ss") }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
          </template>
        </el-table-column>
      </Table>
    </div>
  </div>
   <!-- 添加或修改标签对话框 -->
   <el-dialog :title="title" v-model="open" width="500px" append-to-body>
     <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="80px">
       <el-form-item label="区域名称" prop="districtName">
         <el-input v-model="form.districtName" placeholder="请输入区域名称" />
       </el-form-item>
     </el-form>
     <!-- vue2 element中dialog 的插槽的写法是 直接slot="footer" 但是在plus中需要以父级的形式添加 -->
     <template #footer>
        <div class="layout-container-form-search">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
      </div>
     </template>
   </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import Table from '@/components/table/index.vue'
import { Page } from '@/components/table/type'
import { addDistrict,editDistrict,deleteDistrict, districtList} from '@/api/outlets'
import { typeData } from './enum'
import { Plus, Search, Delete,Refresh } from '@element-plus/icons'
import useGlobalProperties from "@/utils/common/useGlobalProperties"
export default defineComponent({
  name: 'OutletsDistrict',
  components: {
    Table,
  },
  setup() {
    const proxy = useGlobalProperties();
    // 存储搜索用的数据
    const queryParams = reactive({
      type:1, //1--网点，2--客户
      districtName:'',
      status:''
    })
    // 分页参数, 供table使用
    const page: Page = reactive({
      index: 1,
      size: 10,
      total: 0
    })
    const loading = ref(true)
    const tableData = ref([])
    let form = ref({
      type:1,
      districtName:'',
      creator:sessionStorage.getItem('username')
    })
    const ruleFormRef:any =ref(null)
    let title = ref('')
    let open = ref(false)
    const rules = reactive({
      districtName: [
        { required: true, message: '区域名称不能为空', trigger: 'blur' },
      ]
    })
    //*搜索栏重置*//
    const resetQuery = () => {
      page.index= 1
      queryParams.districtName = ''
      queryParams.status = ''
      getTableData(true)
    }
    // 获取表格数据
    // params <init> Boolean ，默认为false，用于判断是否需要初始化分页
    const  getTableData =  (init: boolean) => {
      loading.value = true
      if (init) {
        page.index = 1
      }
      let params = {
        ...queryParams,
        ...page
      }
      
      districtList(params).then(res => {
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
    //提交表单
    const submitForm = async ()  => {
      await ruleFormRef.value.validate((valid:any, fields:any) => {
        if (valid) {
          if((form.value as any).id != undefined){
            editDistrict(form.value).then(res=>{
              proxy.$message.success('修改成功')
              open.value = false
              getTableData(true)
            })
          }else{
            console.log(form.value)
            addDistrict(form.value).then(res => {
              proxy.$message.success("新增成功");
              open.value = false;
              getTableData(true)
            });
          }
        } else {
          console.log('error submit!', fields)
        }
      })
    }
    //新增按钮操作
    const handleAdd = ()=>{
      reset()
      title.value = '新增区域'
      open.value = true
    }
    /** 修改按钮操作 */
    const handleUpdate=(row:any)=>{
      reset();
      console.log(row.districtName);
      (form.value as any).id = row.id
      form.value.districtName = row.districtName
      title.value = '修改区域'
      open.value = true;
    }
    /** 删除按钮操作 */
    const handleDelete=(row:any)=> {
      proxy.$confirm('是否确认区域名称为"' + row.districtName + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          (form.value as any).districtId = row.id
          console.log(form)
          return deleteDistrict(form.value);
        }).then(() => {
          getTableData(true)
          proxy.$message.success("删除成功");
        })
    }
    //表单重置
    const reset = ()=>{
      form.value = {
        type:1,
        districtName:'',
        creator:sessionStorage.getItem('username')
      }
    }
    // 取消按钮
    const cancel=()=>{
      open.value = false;
      reset();
    }
    onMounted(() =>{
      getTableData(true)
    })
 
    return {
      Plus,
      Search,
      Delete,
      Refresh,
      proxy,
      form,
      queryParams,
      tableData,
      loading,
      page,
      typeData,
      title,
      open,
      rules,
      ruleFormRef,
      getTableData,
      resetQuery,
      submitForm,
      reset,
      handleAdd,
      handleUpdate,
      cancel,
      handleDelete
    }
  }
})
</script>

<style lang="scss" scoped>
  
</style>