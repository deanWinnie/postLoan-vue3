<template>
  <!-- 授信审核详情 -->
  <div id="SXdetail">
    <div class="page">
      <div class="pageTitle">
        <div class="time"><img src="../../../assets/images/detailIcon_1.png" alt=""> 序号：{{( Number(currentPage)-1)*10+Number(currentIndex)+1}}</div>
        <span class="titleIcon">|</span>
        <div class="time"><img src="../../../assets/images/detailIcon_2.png" alt=""> 申请日期：{{baseInfo.addTime?proxy.$moment(baseInfo.addTime*1000).format("YYYY-MM-DD HH:mm"):"-"}}</div>
        <span class="titleIcon">|</span>
        <div class="time">
          <img src="../../../assets/images/detailIcon_1.png" alt=""> 
          发货宝审核状态：
          <span v-if="!baseInfo.kxExamine"> - </span>
          <span v-else class="modalNum" :style="{'color':baseInfo.kxExamine.status == 1?'#57BFB6':baseInfo.kxExamine.status == 2?'#EC5B56':'#0C25FF'}">{{baseInfo.kxExamine.status == 1?"审核成功":baseInfo.kxExamine.status ==2?"审核失败":"待审核"}}</span>
        </div>
        <span class="titleIcon">|</span>
        <div class="time">
          <img src="../../../assets/images/detailIcon_1.png" alt=""> 
          大树审核状态：
          <span v-if="baseInfo.kxExamine?baseInfo.kxExamine.status!==1:true||!baseInfo.dsExamine"> - </span>
          <span v-else class="modalNum" :style="{'color':baseInfo.dsExamine.status == 1?'#57BFB6':baseInfo.dsExamine.status == 2?'#EC5B56':'#0C25FF'}">{{baseInfo.dsExamine.status == 1?"审核成功":baseInfo.dsExamine.status ==2?"审核失败":"待审核"}}</span>
        </div>
        <span class="titleIcon">|</span>
        <div class="time">
          <img src="../../../assets/images/detailIcon_1.png" alt=""> 
          华夏审核状态：
          <span
            :style="{'color':
                      baseInfo.creditResultVO && 
                      (baseInfo.creditResultVO.approveStatus === 'E1'|| baseInfo.creditResultVO.approveStatus === 'S')?'#57BFB6'
                      :baseInfo.creditResultVO && 
                      (baseInfo.creditResultVO.approveStatus === 'W'|| baseInfo.creditResultVO.approveStatus === 'E7')?'#0C25FF':'#EC5B56'}"  
          >{{baseInfo.creditResultVO?(baseInfo.creditResultVO.approveStatusTxet || "-"):""}}</span>
        </div>
      </div>
      <div class="page_con">
        <div class="con_title"><span class="num">01</span> <span class="line">|</span> 基本信息</div>
         <el-form class="JB" :inline="true" :label-position="'right'" label-width="35%" :show-message="false" style="margin-left: -2%;">
          <el-form-item label="客户姓名：" prop="name" class="">
            <div class="formInfo ">{{baseInfo.custName}}</div>
          </el-form-item>
          <el-form-item label="授信类型：">
            <div class="formInfo">{{baseInfo.creditType==1?"主动授信":"预授信"}}</div>
          </el-form-item>
          <el-form-item label="客户类型：" class="">
            <div class="formInfo ">
              {{baseInfo.mfindType==1?"个体工商户":baseInfo.mfindType==2?"小微企业主":'个人客户'}}
            </div>
          </el-form-item>

          <div class="formRow">
            <el-form-item label="证件类型：" class="idDate">
              <div class="formInfo">{{baseInfo.idType==110?"身份证":"-"}}</div>
            </el-form-item>
            <el-form-item label="证件号码：" class="">
              <div class="formInfo ">{{baseInfo.idNo}}</div>
            </el-form-item>
            <el-form-item label="证件有效期：" class=" idValidItem">
              <div class="formInfo  lineBlock">{{proxy.$moment(baseInfo.idValidStart).format("YYYY-MM-DD")}} 至 {{proxy.$moment(baseInfo.idValidEnd).format("YYYY-MM-DD")}}</div>
            </el-form-item>
          </div>

          <div class="formRow">
            <el-form-item label="性别：" class="idDate ">
              <div class="formInfo ">{{baseInfo.sex==1?"男":baseInfo.sex==2?"女":"-"}}</div>
            </el-form-item>
            <el-form-item label="出生日期：" class="">
              <div class="formInfo ">{{proxy.$moment(baseInfo.birth).format("YYYY-MM-DD")}}</div>
            </el-form-item>
            <el-form-item label="婚姻状况：">
              <div class="formInfo">{{baseInfo.maritalStatus}}</div>
            </el-form-item>
          </div>
          
          <div class="formRow">
            <el-form-item label="学历：" class="idDate">
              <div class="formInfo">{{baseInfo.educationLevel}}</div>
            </el-form-item>
            <el-form-item label="个人月收入：">
              <div class="formInfo">{{baseInfo.monthlyIncome}}</div>
            </el-form-item>
            <el-form-item label="个人收入标识：">
              <div class="formInfo">{{baseInfo.monthlyIncomeFlag}}</div>
            </el-form-item>
          </div>
          
          <div class="formRow">
            <el-form-item label="居住状况：" class="idDate">
              <div class="formInfo">{{baseInfo.familyStatus}}</div>
            </el-form-item>
            <el-form-item label="居住年限：">
              <div class="formInfo">{{baseInfo.familyYear}}</div>
            </el-form-item>
            <el-form-item label="居住地址：" class=" idValidItem">
              <div class="formInfo  address">{{baseInfo.homeAddr}} </div>
            </el-form-item>
          </div>
          
          <div class="formRow">
            <el-form-item label="家庭邮编：" class="idDate">
              <div class="formInfo">{{baseInfo.homeZIPCode}}</div>
            </el-form-item>
            <el-form-item label="手机号：" class="">
              <div class="formInfo ">{{baseInfo.mobPhoneNo}}</div>
            </el-form-item>
            <el-form-item label="邮箱：">
              <div class="formInfo">{{baseInfo.email}}</div>
            </el-form-item>
          </div>
          
          <div class="formRow">
            <el-form-item label="住宅电话：" class="idDate ">
              <div class="formInfo ">{{baseInfo.homePhoneNo}}</div>
            </el-form-item>
            <el-form-item label="住宅行政区划代码：">
              <div class="formInfo">{{baseInfo.regionalCode}}</div>
            </el-form-item>
            <el-form-item label="健康状况：">
              <div class="formInfo">{{baseInfo.healthStatus}}</div>
            </el-form-item>
          </div>
          
          <div class="formRow">
            <el-form-item label="家庭薪资月收入：" class="idDate">
              <div class="formInfo">{{baseInfo.familyMonthIncome}}</div>
            </el-form-item>
            <el-form-item label="供养人口：">
              <div class="formInfo">{{baseInfo.population}}</div>
            </el-form-item>
            <el-form-item label="家庭月花费：">
              <div class="formInfo">{{baseInfo.selfMonthCost}}</div>
            </el-form-item>
          </div>
         </el-form>

        <!-- 单位信息 -->
        <div class="con_title"><span class="num">02</span> <span class="line">|</span> 单位信息</div>
        <el-form class="DW" :inline="true" :label-position="'right'" label-width="30%" :show-message="false" style="margin-left: -2%;">
          <el-form-item label="单位类型：" prop="name">
            <div class="formInfo">{{baseInfo.employerProp}}</div>
          </el-form-item>
          <el-form-item label="单位行业类型：">
            <div class="formInfo">{{baseInfo.industry}}</div>
          </el-form-item>
          <el-form-item label="工作单位：" class="">
            <div class="formInfo">
              {{baseInfo.employer}}
            </div>
          </el-form-item>

          <div class="formRow">
            <el-form-item label="职务：" class="idDate">
              <div class="formInfo">{{baseInfo.position}}</div>
            </el-form-item>
            <el-form-item label="职业：">
              <div class="formInfo">{{baseInfo.job}}</div>
            </el-form-item>
            <el-form-item label="关联关系：" class="">
              <div class="formInfo">
                {{baseInfo.incidenceRelation}}
              </div>
            </el-form-item>
          </div>

          <div class="formRow">
            <el-form-item label="单位地址：" class="">
              <div class="formInfo ">{{baseInfo.employerAddr}}</div>
            </el-form-item>
            <el-form-item label="公司邮编：" class="idDate">
              <div class="formInfo">{{baseInfo.companyZIP}}</div>
            </el-form-item>
            <el-form-item label="单位电话区号：">
              <div class="formInfo">{{baseInfo.workPhoneArea}}</div>
            </el-form-item>
            
          </div>
          
          <div class="formRow">
            <el-form-item label="单位电话：">
              <div class="formInfo">{{baseInfo.workPhoneNo}}</div>
            </el-form-item>
            <el-form-item label="联系地址：" class="idDate ">
              <div class="formInfo ">{{baseInfo.addr}}</div>
            </el-form-item>
            <el-form-item label="联系电话：">
              <div class="formInfo">{{baseInfo.phoneNo}}</div>
            </el-form-item>
          </div>
        </el-form>

        <!-- 授信信息 -->
        <div class="con_title"><span class="num">03</span> <span class="line">|</span> 授信信息</div>
        <el-form class="SX" :inline="true" :label-position="'right'" label-width="35%" :show-message="false" style="margin-left: -2%;">
          <el-form-item label="授信行业投向：" prop="name">
            <div class="formInfo">{{baseInfo.applicableIndustry}}</div>
          </el-form-item>
          <el-form-item label="申请币种：">
            <div class="formInfo">{{baseInfo.currency==="CNY"?"人民币":"-"}}</div>
          </el-form-item>
          <el-form-item label="申请金额：" class="">
            <div class="formInfo ">{{baseInfo.applyAmt}}</div>
          </el-form-item>

          <div class="formRow">
            <el-form-item label="申请期限类型：" class="idDate">
              <div class="formInfo">{{baseInfo.tenureTimeCode==="Y"?"年":baseInfo.tenureTimeCode==="M"?"月":"日"}}</div>
            </el-form-item>
            <el-form-item label="申请期数：">
              <div class="formInfo">{{baseInfo.applTerms}}</div>
            </el-form-item>
            <el-form-item label="申请日期：">
              <div class="formInfo">{{baseInfo.addTime?proxy.$moment(baseInfo.addTime*1000).format("YYYY-MM-DD HH:mm"):"-"}}</div>
            </el-form-item>
          </div>

          <div class="formRow">
            <el-form-item label="申请地点：" class="idDate ">
              <div class="formInfo ">{{baseInfo.applAddr}}</div>
            </el-form-item>
            <el-form-item label="还款方式：">
              <div class="formInfo">{{baseInfo.repayMethod}}</div>
            </el-form-item>
            <el-form-item label="利率模式：">
              <div class="formInfo">{{baseInfo.rateMode==="01"?"固定利率":baseInfo.rateMode==="02"?"浮动利率":"上海银行间拆"}}</div>
            </el-form-item>
          </div>
          
          <div class="formRow">
            <el-form-item label="申请用途：" class="idDate">
              <div class="formInfo">{{baseInfo.loanPurpose}}</div>
            </el-form-item>
            <el-form-item label="产品代码：">
              <div class="formInfo">{{baseInfo.productCode==="600019"?"快金":"-"}}</div>
            </el-form-item>
            <el-form-item label="是否使用华夏卡：">
              <div class="formInfo">{{baseInfo.isHxCard?baseInfo.isHxCard==1?"是":"否":"-"}}</div>
            </el-form-item>
          </div>

          <div class="formRow">
            <el-form-item label="绑定的卡号：" class="idDate ">
              <div class="formInfo">
                {{baseInfo.binCardNo+"("}}{{baseInfo.openBank+")"}}
              </div>
            </el-form-item>
            <el-form-item label="电子账户：" class="idDate">
              <div class="formInfo">{{baseInfo.creditResultVO.accountNo}}</div>
            </el-form-item>
            <el-form-item label="商户名称：" class="idDate ">
              <div class="formInfo">{{baseInfo.tlBussnissname}}</div>
            </el-form-item>
          </div>
          <div class="formRow">
            <el-form-item label="企业设立时间：">
              <div class="formInfo">{{proxy.$moment(baseInfo.tlBussnissStartDate).format("YYYY-MM-DD")}}</div>
            </el-form-item>
            <el-form-item label="可贷额度测算标识：">
              <div class="formInfo">{{baseInfo.isEnableCal==="Y"?"启动测试功能":baseInfo.isEnableCal==="N"?"不测算，直接发生实际业务":""}}</div>
            </el-form-item>
            
          </div>
        </el-form>

        <!-- 附件信息 -->
        <div class="con_title"><span class="num">04</span> <span class="line">|</span> 附件信息</div>
        <el-form :inline="true" :label-position="'right'" label-width="32%" :show-message="false" style="margin-left: -2%;">
          <el-form-item label="身份证" class="">
            <div class="uploadBox">
              <div class="formInfo uploadItem">
                <img :src="baseInfo.idFrontImg.url" alt="" @click="bindShowIdCard(baseInfo.idFrontImg.url)">
              </div>
              <div class="formInfo uploadItem">
                <img :src="baseInfo.idBackImg.url" alt="" @click="bindShowIdCard(baseInfo.idBackImg.url)">
              </div>
            </div>
          </el-form-item>
        </el-form>

        <!-- 风控信息 -->
        <div class="con_title"><span class="num">05</span> <span class="line">|</span> 风控信息</div>
        <el-form class="FK" :inline="true" :label-position="'right'" label-width="35%" :show-message="false" style="margin-left: -2%;">
          
          <el-form-item label="网点快递经营许可证：" class="urls">
            <div class="formInfo uploadItem" @click="bindShowIdCard(baseInfo.creditWaybillVO.expLicensePicture)">
              <img :src="baseInfo.creditWaybillVO.expLicensePicture" alt="" class="formImg">
            </div>
          </el-form-item>
          <el-form-item label="网点营业执照：" class="urls">
            <div class="formInfo uploadItem" @click="bindShowIdCard(baseInfo.creditWaybillVO.licensePicture)">
              <img :src="baseInfo.creditWaybillVO.licensePicture" alt="" class="formImg">
            </div>
          </el-form-item>
          
          <div class="formRow">
            <el-form-item label="用户ID：" class="idDate">
              <div class="formInfo">{{baseInfo.creditWaybillVO.userId}}</div>
            </el-form-item>
            <el-form-item label="运单数量：" class="idDate">
              <div class="formInfo">{{baseInfo.creditWaybillVO.waybillNum}}</div>
            </el-form-item>
            <el-form-item label="发货人合作时长：" prop="name">
              <div class="formInfo ">{{baseInfo.creditWaybillVO.duration}}</div>
            </el-form-item>
            
          </div>
          <div class="formRow">
            <el-form-item label="发货稳定比：" class="idDate">
              <div class="formInfo">{{baseInfo.creditWaybillVO.stabilityRatio}}</div>
            </el-form-item>
            <el-form-item label="近三个月的月均发货额：" class="idDate">
              <div class="formInfo">{{baseInfo.creditWaybillVO.tl3mDeliverAmtAvg}}</div>
            </el-form-item>
            <el-form-item label="近三个月月均发货量：" class="idDate">
              <div class="formInfo">{{baseInfo.creditWaybillVO.tl3mDeliverNumAvg}}</div>
            </el-form-item>
          </div>
          <div class="formRow">
            <el-form-item label="近50天运费总额：" class="idDate">
              <div class="formInfo">{{baseInfo.creditWaybillVO.tlFreightAmt}}</div>
            </el-form-item>
            <el-form-item label="客户数：" class="idDate">
              <div class="formInfo">大于100</div>
            </el-form-item>
            <el-form-item label="合作的物流/快递品牌：" class="idDate">
              <div class="formInfo">{{baseInfo.networkVO.name}}</div>
            </el-form-item>
          </div>
          <div class="formRow">
            <el-form-item label="收件地址重复记录：" class="idDate">
              <div class="formInfo">小于千分之一</div>
            </el-form-item>
            <el-form-item label="整体退货率：" class="idDate">
              <div class="formInfo">小于5%</div>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>

    <!-- 身份证展示弹窗 -->
    <div class="spc-dialog">
      <el-dialog
      v-model="showIdCard"
      width="50%"
    >
      <div class="img_box" ref="rotate">
        <img class="idCardImg" :src="idCardUrl" alt="">
      </div>
      <el-button @click="getRotate" class="rotate">旋转</el-button>
    </el-dialog>
    </div>
    
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import useGlobalProperties from "@/utils/common/useGlobalProperties";
import dataInfo from "@/utils/common/common";
import {getExamineDetail} from "@/api/client"
export default {
  name: 'ClientDetails',
  setup() {
    const proxy = useGlobalProperties();
    let showModal = ref(false)
    let showDelModal = ref(false)
    let showIdCard = ref(false)
    const baseInfo:any = ref({
      creditWaybillVO:{},
      networkVO:{},
      idFrontImg:{},
      idBackImg:{},
      creditResultVO:{}
    })
    const wayBillInfo = ref({})
    let state = ref('')
    let currentPage = proxy.$route.query.currentPage
    let currentIndex = proxy.$route.query.index
    let modalText = ref('')
    let pageText = ref('')
    let idCardUrl = ref('')
    let deg = ref(0)
    let rotate:any =ref()
    let longTermStatus = ref(false)  //标识是否为长期
    let updateIdValidTitle = ref('修改')
    let updateHomeTitle = ref('修改')
    const getDetail = ()=>{
      getExamineDetail({id:proxy.$route.query.id}).then((res:any)=>{        
        baseInfo.value = res.result;
        let arr = [];
        // 筛选婚姻状况
        arr = dataInfo.maritalStatusList.filter((item:any)=>{
          return item.value == baseInfo.value.maritalStatus
        })
        baseInfo.value.maritalStatus = arr.length?arr[0].label: "-";
        // 教育程度
        arr = dataInfo.educationLevelList.filter((item:any)=>{
          return item.value == baseInfo.value.educationLevel
        })
        baseInfo.value.educationLevel = arr.length?arr[0].label: "-";
        // 个人收入标识
        arr = dataInfo.monthlyIncomeFlagList.filter((item:any)=>{
          return item.value == baseInfo.value.monthlyIncomeFlag
        })
        baseInfo.monthlyIncomeFlag = arr.length?arr[0].label: "-";
        // 居住状况
        arr = dataInfo.familyStatusList.filter((item:any)=>{
          return item.value == baseInfo.value.familyStatus
        })
        baseInfo.value.familyStatus = arr.length?arr[0].label: "-";
        //健康情况
        arr = dataInfo.healthStatusList.filter((item:any)=>{
          return item.value == baseInfo.value.healthStatus
        })
        baseInfo.value.healthStatus = arr.length?arr[0].label: "-";
        // 单位类型
        arr = dataInfo.employerPropList.filter((item:any)=>{
          // console.log(baseInfo.value.employerProp)
          return item.value == baseInfo.value.employerProp
        })

        baseInfo.value.employerProp = arr.length?arr[0].label: "-";
        
        //单位行业类型
        arr = dataInfo.industryList.filter((item:any)=>{
          return item.value == baseInfo.value.industry
        })
        baseInfo.value.industry = arr.length?arr[0].label: "-";
        // 职务
        arr = dataInfo.positionList.filter((item:any)=>{
          return item.value == baseInfo.value.position
        })
        baseInfo.value.position = arr.length?arr[0].label: "-";
        // 职业
        arr = dataInfo.jobList.filter((item:any)=>{
          return item.value == baseInfo.value.job
        })
        baseInfo.value.job = arr.length?arr[0].label: "-";
        //授信行业投向
        arr = dataInfo.industryList.filter((item:any)=>{
          return item.value == baseInfo.value.applicableIndustry
        })
        baseInfo.value.applicableIndustry = arr.length?arr[0].label: "-";
        //还款方式
        arr = dataInfo.RepayMethodList.filter((item:any)=>{
          return item.value == baseInfo.value.repayMethod
        })
        baseInfo.value.repayMethod = arr.length?arr[0].label: "-";
        //授信用途
        arr = dataInfo.loanPurposeList.filter((item:any)=>{
          return item.value == baseInfo.value.loanPurpose
        })
        baseInfo.value.loanPurpose = arr.length?arr[0].label: "-";
        baseInfo.value.creditResultVO = baseInfo.value.creditResultVO?baseInfo.value.creditResultVO:{approveStatusTxet:"-"}
          if(baseInfo.value.creditResultVO.approveStatus){
            switch (baseInfo.value.creditResultVO.approveStatus) {
            case "E1":
              baseInfo.value.creditResultVO.approveStatusTxet = "额度审批银行额度启用成功"
              break;
            case "E2":
              baseInfo.value.creditResultVO.approveStatusTxet = "额度审批银行额度启用否决"
              break;
            case "E3":
              baseInfo.value.creditResultVO.approveStatusTxet = "开立二类户失败"
              break;
            case "E4":
              baseInfo.value.creditResultVO.approveStatusTxet = "人脸识别失败"
              break;
            case "E5":
              baseInfo.value.creditResultVO.approveStatusTxet = "放款失败"
              break;
            case "E6":
              baseInfo.value.creditResultVO.approveStatusTxet = "放款成功转账失败"
              break;
            case "E7":
              baseInfo.value.creditResultVO.approveStatusTxet = "进入人工审批"
              break;
            case "P":
              baseInfo.value.creditResultVO.approveStatusTxet = "审批回退(额度申请，影像重传)"
              break;
            case "W":
              baseInfo.value.creditResultVO.approveStatusTxet = "您的申请已受理，稍候通知结果"
              break;
            case "S":
              baseInfo.value.creditResultVO.approveStatusTxet = "放款成功"
              break;
            }
          }
      })
    }
    const bindShowIdCard = (url:string)=>{
      idCardUrl.value = url
      showIdCard.value = true;
    }
    const getRotate = ()=>{
      deg.value += 90
      if (deg.value >= 360) {
        deg.value = 0
      }
      rotate.value.style.transform = `rotate(${deg.value}deg)`
    }
    onMounted(()=>{
      getDetail()
    })
    return{
      proxy,
      showModal,
      showDelModal,
      baseInfo,
      showIdCard,
      state,
      modalText,
      pageText,
      wayBillInfo,
      updateHomeTitle,
      updateIdValidTitle,
      longTermStatus,
      deg,
      idCardUrl,
      rotate,
      currentIndex,
      currentPage,
      getDetail,
      bindShowIdCard,
      getRotate
    }
  }
}
</script>
<style lang="scss" scoped>
  #SXdetail{
    // margin-top: 10px;
    .lineBlock{
      display: inline-block;
    }
    .homeAddrWapper{
      position: relative;
    }
    .btn{
      width: 80px;
      height: 40px;
      border: 1px solid #0C25FF;
      border-radius: 20px;
      font-family: NotoSansHans-Medium;
      font-size: 16px;
      color: #0C25FF;
      letter-spacing: -0.39px;
      text-align: center;
      padding: 0;
    }
    
    .rebuildBtn{
      border: 1px solid #EC5B56;
      color: #EC5B56;
    }
    .agreeBtn{
      border: 1px solid #57BFB6;
      color: #57BFB6;
    } 
     
    .page{
      // margin-top: 10px;
      padding: 0 30px;
      box-sizing: border-box;
      background: #fff;

      .titleIcon{
        font-family: NotoSansSChineseRegular;
        font-size: 14px;
        color: #333333;
        letter-spacing: -0.34px;
        margin: 0 40px;
      }
      @media screen and (max-width: 1600px){
          .titleIcon{
              margin: 0 20px;
          }
      }
      .pageTitle{
        display: flex;
        align-items: center;
      }
      .time{
        height: 70px;
        background: #fff;
        line-height: 70px;
        font-family: NotoSansHans-Medium;
        font-size: 14px;
        color: #333333;
        letter-spacing: -0.34px;
        display: flex;
        align-items: center;
        img{
          margin-right: 10px;
        }
        .modalNum{
          color: #0C25FF;
        }
      }
      .page_con{
        width: 100%;
        overflow: hidden;
        
        .con_title{
          width: 100%;
          height: 60px;
          line-height: 60px;
          font-family: NotoSansHans-Medium;
          font-size: 14px;
          color: #333333;
          letter-spacing: -0.34px;
          border-top: 1px solid #E4E8F1;
          display: flex;
          align-items: center;
          .num{
            font-family: DINAlternate-Bold;
            font-size: 24px;
            letter-spacing: -0.58px;
          }
          .line{
            font-family: PingFangSC-Ultralight;
            font-size: 24px;
            color: #cccccc;
            letter-spacing: -0.58px;
            margin: 0 10px;
          }
          
        }
        .formInfo{
          font-family: NotoSansHans-Medium;
          font-size: 14px;
          color: #999999;
          letter-spacing: -0.34px;
        }
 
        .uploadBox{
          width: 550px;
          display: flex;
          .uploadItem:nth-of-type(1){
            margin-right: 20px;
          }
        }
        .urls .uploadItem{
          width: 260px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .uploadItem{
          width: 120%;
          height: 200px;
          background: #F8F7F7;
          line-height: 32px;
          padding:0 4px;
          box-sizing: border-box;
          margin-top:4px;
          cursor: pointer;
          overflow: hidden;
          display: flex;
          
        }
        .uploadItem img{
          width: 100%;
          object-fit: cover;
        }
        
        .t_pending{
          color: #0C25FF;
          margin-right: 60px;
          width: 100px;
        }
        .t_success{
          color: #57BFB6;
          margin-right: 60px;
          width: 100px;
        }
        .t_fail{
          color: #EC5B56;
          margin-right: 60px;
          width: 100px;
        }

        .reviewTitle{
          width: 32%;
          text-align: right;
        }
        .reviewText{
          display: flex;
          width: 73vw;
        }
        .review_sugg{
          width: 70%;
          color: #999999;
          margin-left: 10px;
        }
        

      }
    }
    .idCardImg{
      width: 100%;
    }
    .table{
      margin: 0 60px;
    }
    .delayText{
      color: #EC5B56;
    }
    .pagination{
      width: 100%;
      height: 75px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .paginationText{
        font-family: NotoSansHans-Regular;
        font-size: 14px;
        color: #333333;
        letter-spacing: -0.34px;
      }
    }
    // .rotate{
    //   font-size: 20px;
    //   color: white;
    //   text-align: center;
    //   padding-top: 30px;
    // }

  }
  ::v-deep{
    .idValidItem{
      .el-input{
        width: 95px;
        .el-input__inner{
          margin-right: 5px;
        }
      }
      .zhi{
        display: inline-block;
        margin: 0 5px;
      }
      .el-checkbox{
        margin-left: 5px;
      }
      .el-button{
        padding: 3px 5px;
        margin-left: 8px;
        background-color: #409EFF;
        color: #fff;
      }
    }
    .homeAddrWapper{
      .el-input{
        width: 100%;
        display: inline-block;
        .el-input__inner{
          margin-right: 5px;
        }
      }
      .el-button{
        padding: 3px 5px;
        margin-left: 8px;
        background-color: #409EFF;
        color: #fff;
        position: absolute;
        right: -43px;
        top: 10px;
      }
    }
    .el-form-item__content{
      width: 60%;
    }
    .JB .el-form-item__content{
      width: 60%;
    }
    .DW .el-form-item__content{
      width: 70%;
    }
    @media screen and (max-width: 1600px){
      .FK .el-form-item__content{
        width: 40%;
      }
      .SX .el-form-item__content{
        width: 50%;
      }
      .SX .el-form-item__label{
        width: 42% !important;
      }
      .FK .el-form-item__label{
        width: 45% !important;
      }
      .YD .el-form-item__label{
        width: 42% !important;
      }
      
      .YD .el-form-item__content{
        width: 40%;
      }
    }
   
    .el-form-item{
      width:33%;
      margin-right: 0;
    }
   
    .el-form-item__label{
      font-family: NotoSansHans-Medium;
      font-size: 14px;
      color: #333333;
      letter-spacing: -0.34px;
    }

    .el-upload--text{
      width: 100%;
      text-align: left;
    }
    .el-table .bgColor {
      background: #F8F7F7;
    }
    .el-table th {
      background: #F8F7F7;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active{
      background: #387BFF;
    }
    .el-input__inner{
      // width: 200px;
      // border: 1px red solid;
      // padding: 0;
      font-family: NotoSansHans-Medium;
      font-size: 14px;
      color: red;
    }

    .spc-dialog{
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
    }
    .el-dropdown{
      color: red;
      cursor: pointer;
    }
    
    
  }
  .formImg{
    width: 100%;
    object-fit: cover;
  }
</style>
