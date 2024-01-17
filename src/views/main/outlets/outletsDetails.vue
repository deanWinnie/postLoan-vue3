<template>
  <div class="layout-container">
    <div  class="p-c mr-20  point-checker-detial p20">
    <div class="h-116 flex a-center mb-20 bg-w">
      <!-- <div class="ml-20 mr-20 w-60">
        <img class="w-60" :src="map[info.expCode]" alt="">
      </div> -->
      <div class="mr-16">
        <div class="fs-20 f-c-b fs-b mb-4">{{ info.pointName }}</div>
        <div class="fs-14 f-c-b1">{{ info.expName }} {{ info.pointCode?`（编号：${info.pointCode}）`:'-' }}</div>
      </div>
    </div>
    <div class="v-line" />
    <div class="pd-20 bg-w">
      <div class="f-c-b fs-b fs-18 mb-30">基本信息</div>
      <div class="flex ml-30">
        <div class="flex1">
          <div class="mb-20 f-c-b1 fs-14"><span class="label">联系人：</span><span class="fs-14 fs-b f-c-b">{{ info.name }}</span></div>
          <div class="mb-20 f-c-b1 fs-14"><span class="label">网点地址：</span><span class="fs-14 fs-b f-c-b">{{ info.address }}</span></div>
        </div>
        <div class="flex1">
          <div class="mb-20 f-c-b1 fs-14"><span class="label">联系电话：</span><span class="fs-14 fs-b f-c-b">{{ info.phone }}</span></div>
          <div class="mb-20 f-c-b1 fs-14"><span class="label">邮箱：</span><span class="fs-14 fs-b f-c-b">{{ info.legalEmail }}</span></div>
        </div>
      </div>
      <div class="v-line" />

      <div class="f-c-b fs-b fs-18 mb-30 mt-20">法人信息</div>
      <div class="flex ml-30">
        <div class="flex1">
          <div class="mb-20 f-c-b1 fs-14"><span class="label">姓名：</span><span class="fs-14 fs-b f-c-b">{{ info.idCardName }}</span></div>
          <div class="mb-20 f-c-b1 fs-14"><span class="label">身份证正面照：</span><el-image  lazy class="w-260" style="vertical-align: text-top;" :src="info.idCardObverseUrl" alt="" @click="showImg(info.idCardObverseUrl)"/></div>
        </div>
        <div class="flex1">
          <div class="mb-20 f-c-b1 fs-14"><span class="label">身份证号：</span><span class="fs-14 fs-b f-c-b">{{ info.idCardNO }}</span></div>
          <div class="mb-20 f-c-b1 fs-14"><span class="label">身份证反面照：</span><img class="w-260" style="vertical-align: text-top;" :src="info.idCardReverseUrl" alt="" @click="showImg(info.idCardReverseUrl)"></div>
        </div>
      </div>
      <div class="v-line" />

      <div class="f-c-b fs-b fs-18 mb-30 mt-20">企业工商信息</div>
      <div class="flex ml-30">
        <div class="flex1">
          <div class="mb-20 f-c-b1 fs-14"><span class="label">企业名称：</span><span class="fs-14 fs-b f-c-b">{{ info.companyName }}</span> <a target="_blank" style="color:blue" :href="'https://www.qixin.com/search?key='+info.companyName+'&page=1'">点我去查看</a> </div>
          <div class="mb-20 f-c-b1 fs-14"><span class="label">营业执照：</span><img class="w-260" style="vertical-align: text-top;" :src="info.licensePicture" alt="" @click="showImg(info.licensePicture)"></div>
        </div>
        <div class="flex1">
          <div class="mb-20 f-c-b1 fs-14"><span class="label">社会信用代码：</span><span class="fs-14 fs-b f-c-b">{{ info.license }}</span></div>
        </div>
      </div>
      <div class="v-line" />

      <div class="f-c-b fs-b fs-18 mb-30 mt-20">经营场所照片</div>
      <div class="flex ml-30">
        <div class="flex1">
          <div class="mb-20 f-c-b1 fs-14"><span class="label">经营许可证号：</span><span class="fs-14 fs-b f-c-b">{{ info.expLicense }}</span></div>
        </div>
        <div class="flex1">
          <div class="mb-20 f-c-b1 fs-14"><span class="label">营业期限：</span><span class="fs-14 fs-b f-c-b">{{ info.expLicenseTerm }}</span></div>
        </div>
      </div>
      <div class="mb-20 f-c-b1 fs-14" style="margin-left:30px">
            <span class="label">经营场所照片：</span>
            <el-image class="w-260" style="vertical-align: text-top;" :src="info.expLicensePicture" alt="" @click="showImg(info.expLicensePicture)" lazy/>
            <img class="w-260" style="vertical-align: text-top;" :src="info.firstCompanyPicture" alt="" @click="showImg(info.firstCompanyPicture)">
            <img class="w-260" style="vertical-align: text-top;" :src="info.secondCompanyPicture" alt="" @click="showImg(info.secondCompanyPicture)">
            <img class="w-260" style="vertical-align: text-top;" :src="info.thirdCompanyPicture" alt="" @click="showImg(info.thirdCompanyPicture)">
            <img class="w-260" style="vertical-align: text-top;" :src="info.fourthCompanyPicture" alt="" @click="showImg(info.fourthCompanyPicture)">

          </div>
      <div class="v-line" />

      <div class="f-c-b fs-b fs-18 mb-30 mt-20">文件信息</div>
      <p class="label">房本信息：</p>
      <div class="mb-20 f-c-b1 fs-14" style="margin-left:30px">
          <img class="w-260 fileImg" style="vertical-align: text-top;" v-for="(item,index) in homeFileList.pic" :key="index" :src="item.uri" alt="" @click="showImg(item.uri)">
      </div>
      <div>
        <ul class="other-file-ul">
          <li class="other-file-list" v-for="(item,index) in homeFileList.file" :key="index" @click="tofile(item.uri)">{{item.fileName}}</li>
        </ul>
      </div>
      <p class="label">车本信息：</p>
      <div class="mb-20 f-c-b1 fs-14" style="margin-left:30px">
          <img class="w-260 fileImg" style="vertical-align: text-top;" v-for="(item,index) in carFileList.pic" :key="index" :src="item.uri" alt="" @click="showImg(item.uri)">
      </div>
      <div>
        <ul class="other-file-ul">
          <li class="other-file-list" v-for="(item,index) in carFileList.file" :key="index" @click="tofile(item.uri)">{{item.fileName}}</li>
        </ul>
      </div>
      <p class="label">流水信息：</p>
      <div class="mb-20 f-c-b1 fs-14" style="margin-left:30px">
          <img class="w-260 fileImg" style="vertical-align: text-top;" v-for="(item,index) in accountFileList.pic" :key="index" :src="item.uri" alt="" @click="showImg(item.uri)">
      </div>
      <div>
        <ul class="other-file-ul">
          <li class="other-file-list" v-for="(item,index) in accountFileList.file" :key="index" @click="tofile(item.uri)">{{item.fileName}}</li>
        </ul>
      </div>
       <p class="label">征信信息：</p>
      <div class="mb-20 f-c-b1 fs-14" style="margin-left:30px">
          <img class="w-260 fileImg" style="vertical-align: text-top;" v-for="(item,index) in creditFileList.pic" :key="index" :src="item.uri" alt="" @click="showImg(item.uri)">
      </div>
      <div>
        <ul class="other-file-ul">
          <li class="other-file-list" v-for="(item,index) in creditFileList.file" :key="index" @click="tofile(item.uri)">{{item.fileName}}</li>
        </ul>
      </div>
       <p class="label">合同信息：</p>
      <div class="mb-20 f-c-b1 fs-14" style="margin-left:30px">
          <img class="w-260 fileImg" style="vertical-align: text-top;" v-for="(item,index) in contractFileList.pic" :key="index" :src="item.uri" alt="" @click="showImg(item.uri)">
      </div>
      <div>
        <ul class="other-file-ul">
          <li class="other-file-list" v-for="(item,index) in contractFileList.file" :key="index" @click="tofile(item.uri)">{{item.fileName}}</li>
        </ul>
      </div>
      <p class="label">其他信息：</p>
      <div class="mb-20 f-c-b1 fs-14" style="margin-left:30px">
          <img class="w-260 fileImg" style="vertical-align: text-top;" v-for="(item,index) in otherFileList.pic" :key="index" :src="item.uri" alt="" @click="showImg(item.uri)">
      </div>
      <div>
        <ul class="other-file-ul">
          <li class="other-file-list" v-for="(item,index) in otherFileList.file" :key="index" @click="tofile(item.uri)">{{item.fileName}}</li>
        </ul>
      </div>
      <div class="v-line" />

      <div class="f-c-b fs-b fs-18 mb-30 mt-20">运费垫付信息</div>
      <div class="flex ml-30">
        <div class="flex1">
          <div class="mb-20 f-c-b1 fs-14"><span class="label">运费垫付状态：</span><span class="fs-14 fs-b f-c-b">{{ ToStatus[info.status] }}</span></div>
          <div class="mb-20 f-c-b1 fs-14"><span class="label">使用状态：</span><span class="fs-14 fs-b f-c-b">{{ info.usageState }}</span></div>
          <div class="mb-20 f-c-b1 fs-14"><span class="label">预授信额度：</span><span class="fs-14 fs-b f-c-b">{{ info.preCreditAmount }}元</span></div>
          <div class="mb-20 f-c-b1 fs-14"><span class="label">复审状态：</span><span class="fs-14 fs-b f-c-b">{{ ToReviewStatus[info.reviewStatus] }}</span></div>
          <div class="mb-20 f-c-b1 fs-14"><span class="label">授信额度：</span><span class="fs-14 fs-b f-c-b">{{ info.creditAmount }}元</span></div>
          <div class="mb-20 f-c-b1 fs-14"><span class="label">每日可垫付额度：</span><span class="fs-14 fs-b f-c-b">{{ info.todayAmount }}元</span></div>
          <div class="mb-20 f-c-b1 fs-14"><span class="label">累积支用额度：</span><span class="fs-14 fs-b f-c-b">{{ info.sumPayAmount }}元</span></div>
        </div>
        <div class="flex1">
          <div class="mb-20 f-c-b1 fs-14"><span class="label">申请时间：</span><span class="fs-14 fs-b f-c-b">{{ info.applyTime }}</span></div>
          <div class="mb-20 f-c-b1 fs-14"><span class="label">客户数量：</span><span class="fs-14 fs-b f-c-b">提交（{{ info.customerCount||0 }}）、推荐（{{ info.recommendCount||0 }}）、授信成功（{{ info.creditCount||0 }}）</span></div>
          <div class="mb-20 f-c-b1 fs-14"><span class="label">最新预授信时间：</span><span class="fs-14 fs-b f-c-b">{{ info.preCreditTime || '-' }}</span></div>
          <div class="mb-20 f-c-b1 fs-14"><span class="label">复审时间：</span><span class="fs-14 fs-b f-c-b">{{ info.reviewTime || '-' }}</span></div>
          <div class="mb-20 f-c-b1 fs-14"><span class="label">剩余额度：</span><span class="fs-14 fs-b f-c-b">{{ info.surplusAmount }}元</span></div>
          <div class="mb-20 f-c-b1 fs-14"><span class="label">当日剩余额度：</span><span class="fs-14 fs-b f-c-b">{{ info.todaySurplusAmount }}元</span></div>
        </div>
      </div>
    </div>
    <el-dialog
      title=""
      v-model="showImgDialog"
      width="50%"
      class="img-dialog"
    >
      <div class="img_box" ref="rotateRef">
        <img width="100%" :src="img" alt="">
      </div>
        <el-button @click="rotate" class="rotatebtn">旋转</el-button>
    </el-dialog>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import Table from '@/components/table/index.vue'
import { Page } from '@/components/table/type'
import { detailByName } from '@/api/outlets'
import { typeData } from './enum'
import { Plus, Search, Delete,Refresh } from '@element-plus/icons'
import {status,reviewStatus} from './status'
import useGlobalProperties from "@/utils/common/useGlobalProperties"
export default defineComponent({
  name: 'OutletsDetails',
  components: {
    Table,
  },
  setup() {
    let info:any = ref({})
    let homeFileList:any = ref({
        pic:[],
        file:[]
      }
    )
    let carFileList:any = ref({
        pic:[],
        file:[]
      }
    )
    let accountFileList:any = ref({
        pic:[],
        file:[]
      }
    )
    let otherFileList:any = ref({
        pic:[],
        file:[]
      }
    )
    let creditFileList:any = ref({
        pic:[],
        file:[]
      }
    )
    let contractFileList:any = ref({
        pic:[],
        file:[]
      }
    )
    let img:any = ref('')
    let showImgDialog = ref(false)
    let ToStatus = status
    let ToReviewStatus = reviewStatus
    let rotateRef = ref<any>(null)
    let deg = ref<number>(0)
    const proxy = useGlobalProperties();
    
    // 存储搜索用的数据
    const queryParams = reactive({
      type:'',
      nickname:''
    })
    // 分页参数, 供table使用
    const page: Page = reactive({
      index: 1,
      size: 10,
      total: 0
    })
    const loading = ref(true)
    const tableData = ref([])
    //*表单重置*//
    const resetQuery = () => {
      page.index= 1
      queryParams.type = ''
      queryParams.nickname = ''
    }
    // 获取表格数据
    // params <init> Boolean ，默认为false，用于判断是否需要初始化分页
    const getTableData = (init: boolean) => {
      loading.value = true
      if (init) {
        page.index = 1
      }
      let params = {
        networkName:proxy.$route.query.networkName,
        currentUser:sessionStorage.getItem('username'),
        ...queryParams
      }
      detailByName(params)
      .then(res => {
        let data = (res as any).result
        info.value = data
        let fileList:any = data.otherFileList
        for(let i =0;i<fileList.length;i++){
          if(fileList[i].type == 1){
            let arr = []
            let format='';
            arr=fileList[i].uri.split('.');
            format=arr[arr.length-1];
            if(format == 'jpg' || format == 'png' || format == 'gif' || format == 'jpeg'){
              carFileList.value.pic.push(fileList[i])
            }else{
              carFileList.value.file.push(fileList[i])
            }
          }else if(fileList[i].type == 2){
            let arr=[]
            let format='';
            arr=fileList[i].uri.split('.');
            format=arr[arr.length-1];
            console.log(homeFileList.value)
            console.log(format)
            if(format == 'jpg' || format == 'png' || format == 'gif' || format == 'jpeg'){
              homeFileList.value.pic.push(fileList[i])
            }else{
              homeFileList.value.file.push(fileList[i])
            }
            console.log(homeFileList.value)
          }else if(fileList[i].type == 0){
            let arr=[]
            let format='';
            arr=fileList[i].uri.split('.');
            format=arr[arr.length-1];
            if(format == 'jpg' || format == 'png' || format == 'gif' || format == 'jpeg'){
              otherFileList.value.pic.push(fileList[i])
            }else{
              otherFileList.value.file.push(fileList[i])
            }
          }else if(fileList[i].type == 3){
            let arr=[]
            let format='';
            arr=fileList[i].uri.split('.');
            format=arr[arr.length-1];
            if(format == 'jpg' || format == 'png' || format == 'gif' || format == 'jpeg'){
              accountFileList.value.pic.push(fileList[i])
            }else{
              accountFileList.value.file.push(fileList[i])
            }
          }else if(fileList[i].type == 4){
            let arr=[]
            let format='';
            arr=fileList[i].uri.split('.');
            format=arr[arr.length-1];
            if(format == 'jpg' || format == 'png' || format == 'gif' || format == 'jpeg'){
              creditFileList.value.pic.push(fileList[i])
            }else{
              creditFileList.value.file.push(fileList[i])
            }
          }else if(fileList[i].type == 5){
            let arr=[]
            let format='';
            arr=fileList[i].uri.split('.');
            format=arr[arr.length-1];
            if(format == 'jpg' || format == 'png' || format == 'gif' || format == 'jpeg'){
              contractFileList.value.pic.push(fileList[i])
            }else{
              contractFileList.value.file.push(fileList[i])
            }
          }
        }
       
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
    //查看文件
    const tofile = (url:string)=>{
      window.location.href = url
    }
    //查看图片  
    const showImg = (imgAddress:any)=> {
      if (!imgAddress) return
      console.log(imgAddress)
      img.value = imgAddress
      console.log(img.value)
      showImgDialog.value = true;
      // this.delStatus = false;
    }
    //旋转按钮
    const rotate = ()=>{
      deg.value += 90
      if (deg.value >= 360) {
        deg.value = 0
      }
      rotateRef.value.style.transform = `rotate(${deg.value}deg)`
    }
    onMounted(()=>{
      getTableData(true)
    })
 
    return {
      Plus,
      Search,
      Delete,
      Refresh,
      proxy,
      info,
      homeFileList,
      carFileList,
      accountFileList,
      otherFileList,
      creditFileList,
      contractFileList,
      ToStatus,
      ToReviewStatus,
      queryParams,
      tableData,
      loading,
      page,
      typeData,
      img,
      showImgDialog,
      rotateRef,
      deg,
      getTableData,
      resetQuery,
      tofile,
      showImg,
      rotate
    }
  }
})
</script>

<style lang="scss" scoped>
.el-main{
  text-align: left;
}
.layout-container{
  text-align: left;
}
  .title{
    margin-top: 50px;
    margin-left: 50px;
    font-size: 24px;
  }
  .label{
        display: inline-block;
        width: 120px;;
        
    }
    .flex{
      justify-content: flex-start;
    }
    .ml10{
      margin-left: 10px;
    }
    .rotatebtn{
      height: 30px;
      position: absolute;
      right: -55px;
      top: 50px;
    }
    .delbtn{
      height: 30px;
      position: absolute;
      right: -55px;
      top: 90px;
    }
    .rotate{
      font-size: 20px;
      color: white;
      text-align: center;
      padding-top: 30px;
      cursor: pointer;
    }
    .other-file-ul{
      text-decoration: none;
      list-style: none;
      display: inline-block;
    }
    .other-file-list{
      height: 20px;
    }
    .other-file-list:hover{
      color: #1890ff;
      cursor: pointer;
      background: #606266 0.5;
      .el-icon-close:before{
        color: #000;
      }
    }
    .el-dialog{
        background: none;
        box-shadow: none;
      }
    .el-icon-close:before {
      color: white;
    }
    .el-dialog__body{
      display: flex;
    }
    .el-dialog__header{
      padding: 0;
    }
    .fileImg{
      margin-right: 10px;
      margin-top: 20px;
    }
    .img-dialog{
      // .img_box{
      //   transform: rotate(90deg);
      // }
      img{
        width: 100%;
      }
      .el-dialog__headerbtn{
        top:10px;
        right: 10px;
      }
    }

</style>