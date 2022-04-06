<!--首页 搜索-->
<template>
  <div class="page" :style="{
    '--jiangluosanHeight':jiangluosanHeight,
    '--jiangluosanWidth':jiangluosanWidth,
  }">
    <div class="page-head">
      <div class="page-head__left">
        <van-image width="110" :src="require('../../assets/img/sun.png')"/>
      </div>
      <div class="page-head__rigth">
        <van-image width="110" :src="require('../../assets/img/rainbow.png')"/>
      </div>
    </div>
    <div class="page-conent">
      <div class="page-conent__search">
        <van-search :left-icon="require('../../assets/img/search.png')" v-model="searchValue" placeholder="请输入搜索关键词" @search="onSearch"/>
        <!-- 搜索提示 -->
        <van-cell-group class="page-conent__list" v-if="showList.length>0">
          <van-cell v-for="(item,index) in showList" 
              :title="item.rubbish_name" 
              @click="searchTs(item)"/>
        </van-cell-group>
      </div>
      <div class="page-conent__lishi" v-if="showHistory">
        <div class="lishi--title">{{history.typeName}}历史记录</div>
        <div class="lishi--box">
          <div class="lishi--box-item" v-for="(e,i) in history.list" :key="i" @click="itemClick(e)">
            <van-image width="80" :src="require('../../assets/icon/'+e.rubbish_pic+'.png')"/>
           {{e.rubbish_name}}
          </div>
        </div>
      </div>
      <div ref="jiangluosan" class="page-conent__lishi jiangluosan"  v-else-if="litterDate.rubbish_pic">
        <div class="lishi--img" :class="{'animation':showAnimation}" @click="setLitterClick">
          <van-image :src="require('../../assets/img/jiangluosan.jpg')"/>
          <van-image width="80" :src="require('../../assets/icon/'+litterDate.rubbish_pic+'.png')"/>
        </div>
      </div>
      <van-row  class="page-conent__box" type="flex" justify="space-around">
        <van-col  class="page-conent__box--item" span="6" v-for="type in Object.keys(RUBBISH_TYPE)" :key="type"  @click="getHistory(type)">
          <van-image width="100" :src="require('../../assets/img/0'+RUBBISH_TYPE[type]+'.jpg')"/>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data () {
    return {
      searchValue:'',//搜索内容
      showHistory:false,//是否显示搜索历史
      showAnimation:false,//是否显示动画
      litterDate:{},//
      jiangluosanHeight:'',//中间区域高度
      jiangluosanWidth:'',//中间区域宽度
      history:{},
      showList:[],//搜索提示数据

    }
  },
  mixins: [],
  computed: {
    userInfo(){
      return JSON.parse(localStorage.getItem('userInfo'))
    },
    RUBBISH_TYPE(){
      return {
        RECYCLABLE:1,
        KITCHEN:2,
        OTHER:3,
        HARMFUL:4
      }
    },
    RUBBISH_NAME(){
      return {
        RECYCLABLE:'可回收垃圾',
        KITCHEN:'厨余垃圾',
        OTHER:'其他垃圾',
        HARMFUL:'有害垃圾',
      }
    }
  },
  components: {},
  created () {
  },
  methods: {
    //历史记录点击事件
    itemClick(e){
      console.log(e,'历史记录点击事件');
      this.searchValue=e?.rubbish_name||"米"
      //调用搜索接口
      if (this.searchValue) {
        this.onSearch()
      }
    },
    //搜索
    onSearch(){
      var that = this
      this.showHistory=false
      //搜索垃圾
       this.$http.post('/api/user/searchRub',{name:this.searchValue})
       .then(function(res) {
         let {data,status} = res
        console.log(res,data,status,'--搜索垃圾')
        that.showList = data
      })
      .catch(function(error) {
          console.log(error);
        })

      console.log(this.searchValue,'searchValue');
    },
    // 展示搜索
    searchTs(e){
      this.searchValue = e.rubbish_name
      this.litterDate = e
      this.showList = []
    },
    //调用历史记录接口
    getHistory(v){
      const that = this
      this.showHistory=true
      console.log(v,'调用历史记录接口');
      //搜索历史
       this.$http.post('/api/user/searchRubByUser',{userId:that.userInfo.id,type:that.RUBBISH_TYPE[v]})
       .then(function(res) {
         let {data,status} = res
        // console.log(res,data,status,'--搜索垃圾')
        that.history = {
          typeName:that.RUBBISH_NAME[v],
          list:data
        }
      })
      .catch(function(error) {
          console.log(error);
        })
    },
    // 扔垃圾
    setLitterClick(){
      let that = this
      var h = this.$refs.jiangluosan.offsetHeight
      var w = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)/4;
      this.jiangluosanHeight = (h-100)+'px';
      this.jiangluosanWidth = w*(this.litterDate.rubbish_type-0.5)+'px'
      console.log(this.jiangluosanWidth ,this.litterDate.rubbish_type,'--this.jiangluosanWidth ');
      // 动画
      this.showAnimation=true
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      setTimeout(() => {
        // that.litterDate={}
        that.searchValue=''
        that.showAnimation = false
        //生成用户丢弃记录
        that.$http.post('/api/user/userDiscardLog',{userId:userInfo.id,rubbishId:that.litterDate.id})
        .then(function(res) {
          console.log(res,'--生成用户丢弃记录')
        })
        .catch((err)=>{
          console.log(err,'--err');
        })
        console.log(that.litterDate,'定时器');
      }, 3000);
    }
  }
}
</script>

<style scoped lang="scss">
.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  background-color:#fde9dd;
  &-head{
    display: flex;
    justify-content:space-between;
    align-items: center;
  }
  &-conent{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    &__list{
      max-height: 200px;
      margin: 0 12px;
      overflow: auto;
    }
    /deep/ .van-search{
      background:none;
    }
    &__lishi{
      padding: .3125rem;
      flex: 1;
      .lishi--title{
        font-size: 16px;
        font-weight: bold;
        color: #413b38;

      }
      .lishi--img{
        width: 120px;
        text-align: center;
        position:absolute;
        left: 50%;
        transform: translateX(-50%);

      }
      .animation{
        animation-name:myfirst;
        animation-duration:2s;
        animation-timing-function:linear;
        animation-delay:1s;
        /* Safari and Chrome: */
        -webkit-animation-name:myfirst;
        -webkit-animation-duration:2s;
        -webkit-animation-timing-function:linear;
        -webkit-animation-delay:1s;
      }
      @keyframes myfirst
      {
        from {left:50%; top:0;display: block;}
        to {left:var(--jiangluosanWidth); top:var(--jiangluosanHeight);display: none;}
      }

      @-webkit-keyframes myfirst /* Safari and Chrome */
      {
        from {left:50%; top:0;display: block;}
        to {left:var(--jiangluosanWidth); top:var(--jiangluosanHeight);display: none;}
      }
    }
    .jiangluosan{
      width: 100%;
      margin: 0 auto;
      position: relative;
    }
    .lishi--box{
      display: flex;
      flex-wrap:wrap;
      align-content: flex-start;
      height: 300px;
      overflow: auto;
      padding:.3125rem 0;
      &-item{
        margin:4px 10px;
        padding:4px 10px;
        font-size: 16px;
        background: rgba(161, 160, 159, 0.5);
        border-radius: .125rem;
      }
    }
    &__box{
      background: url('../../assets/img/lawn.png') no-repeat top center/100px 68px;
      background-size: 100% auto;
      background-position: 0 100%;
      height: 120px;
    }
  }
}
</style>
