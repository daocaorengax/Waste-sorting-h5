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
          <div class="lishi--box-item" :class="getClassName(e.drop_count)" v-for="(e,i) in history.list" :key="i" @click="itemClick(e)">
            <div>
              <van-image width="100" height="100" :src="require('../../assets/icon/'+e.rubbish_pic+'.png')"/>
            </div>
            <div class="lishi--box-item-title">
              {{e.rubbish_name}}({{e.drop_count}})
            </div>
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
        <van-col  class="page-conent__box--item" span="6" v-for="type in Object.keys(RUBBISH_TYPE)" :key="type"  @click="getHistory(RUBBISH_TYPE[type])">
          <van-image width="100" :src="require('../../assets/img/0'+RUBBISH_TYPE[type]+'.jpg')"/>
          <span class="item-text">
          </span>
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
      // Messages:new Map([
      //   [/^[0-3]$/,'还要搜几次，我才能进入你的心'],
      //   [4,'你是属老鼠的嘛'],
      //   [8,'搜了好几次都记不住，小心强老师批评你哦']
      // ])
    }
  },
  mixins: [],
  computed: {
    userInfo(){
      return JSON.parse(localStorage.getItem('userInfo'))
    },
    RUBBISH_TYPE(){
      return { RECYCLABLE:1,  KITCHEN:2, OTHER:3,HARMFUL:4 }
    },
    RUBBISH_NAME(){
      return { RECYCLABLE:'可回收垃圾',KITCHEN:'厨余垃圾',OTHER:'其他垃圾',HARMFUL:'有害垃圾', }
    },
    RUBBISH_KEY(){
      return {1:'可回收垃圾',2:'厨余垃圾',3:'其他垃圾', 4:'有害垃圾',}
    },
    Messages(){
      return {
        message_one:'还要搜几次，我才能进入你的心',
        message_two:'你是属老鼠的嘛',
        message_three:'搜了好几次都记不住，小心强老师批评你哦'
      }
    }
  },
  components: {},
  created () {
  },
  methods: {
    getClassName(count){
      if(count>1&&count===2) return 'orange'
      if(count>1&&count>2) return 'red'
    },
    //历史记录点击事件
    itemClick(e){
      console.log(e,'历史记录点击事件');
      this.searchValue=e?.rubbish_name||"米"
      //调用搜索接口
      if (this.searchValue) {
        this.onSearch()
      }
    },
    //查询搜索次数记录
    async getSearchCountLog(rubbish){
      var me = this
      return new Promise((reject,resolve)=>{
        me.$http.post('/api/user/getSearchLog',{userId:me.userInfo.id,rubbishId:rubbish.id}).then(function(response) {
          reject(response)
        }).then(function(error) {
          resolve(error)
        })
      })
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
    async searchTs(e){
      this.searchValue = e.rubbish_name
      //用户选择搜索结果某一项触发记录搜索次数
      // const { data }=await this.getSearchCountLog(e)
      // console.log(data)
      // const type = data.length ? 'update' : 'add'
      // const param = data.length ? { id: data[0].id, count: data[0].count+1 }:{ userId: this.userInfo.id, rubbishId: e.id }
      // await this.createOrUpdateSearchLog(type,param)
      this.litterDate = e
      this.showList = []
    },
    //创建或更新搜索记录次数
    createOrUpdateSearchLog(type,param){
      const me = this
      return new Promise((reject,resolve)=>{
        const REQUEST_URL = `/api/user/${type}SearchLog`
        this.$http.post(REQUEST_URL,param).then(function(response) {
          console.log(response)
          reject(response)
        }).then(function(error) {
          console.log(error);
          resolve(error)
        })
      })
    },
    //调用历史记录接口
    getHistory(v,bool){
      const that = this
      console.log(v,'调用历史记录接口');
      return new Promise((resolve,reject)=>{
       //搜索历史
       this.$http.post('/api/user/searchRubByUser',{userId:that.userInfo.id,type:v})
       .then(function(res) {
         let { data } = res
        // console.log(res,data,status,'--搜索垃圾')
        if(!bool){
          that.showHistory=true
          that.history = {
            typeName:that.RUBBISH_KEY[v],
            list:data
          }
        }
        resolve(data)
        })
        .catch(function(error) {
          console.log(error);
          reject(error)
        })
      })
    },
    // 扔垃圾
    async setLitterClick(){
      let that = this
      var h = this.$refs.jiangluosan.offsetHeight
      var w = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)/4;
      this.jiangluosanHeight = (h-100)+'px';
      this.jiangluosanWidth = w*(this.litterDate.rubbish_type-0.5)+'px'
      console.log(this.jiangluosanWidth ,this.litterDate.rubbish_type,'--this.jiangluosanWidth ');
      //扔垃圾之前先查询记录
      const history = await this.getHistory(that.litterDate.rubbish_type,true)
      //检索是否已存在此记录
      const filterData = history.find(x=>x.user_id===that.userInfo.id&&x.rubbish_id ===this.litterDate.id)
      const type = filterData ? 'update' : 'add'
      const param = filterData ? { id: filterData.id, count:filterData.drop_count+1 }:{userId:that.userInfo.id,rubbishId:this.litterDate.id,count:1}
      if(type=='update'){
        const randomNum = Math.round(Math.random()*10); 
        let message =''
        if([0,1,2,3].includes(randomNum))message = that.Messages['message_one'] 
        if([4,5,6,7].includes(randomNum))message =that.Messages['message_two'] 
        if([8,9,10].includes(randomNum))message =that.Messages['message_three']
        this.$dialog.alert({
          title: "提示",
          message: message
        }).then(()=>{
          // 动画
          this.showAnimation=true
          setTimeout(async () => {
            //生成用户丢弃记录
            that.addOrUpdateByType(type,param)
            that.litterDate={}
            that.searchValue=''
            that.showAnimation = false
          }, 3000);
        })
      }else{
        // 动画
        this.showAnimation=true
        setTimeout(async () => {
          //生成用户丢弃记录
          that.addOrUpdateByType(type,param)
          that.litterDate={}
          that.searchValue=''
          that.showAnimation = false
        }, 3000)
      };
    },
    async addOrUpdateByType(type,param){
      const me = this
      return new Promise((reject,resolve)=>{
        const REQUEST_URL = `/api/user/${type}DiscardLog`
        this.$http.post(REQUEST_URL,param).then(function(response) {
          console.log(response)
          reject(response)
        }).then(function(error) {
          console.log(error);
          resolve(error)
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.orange{
  background: orange !important;
}
.red{
  background: red !important;
}
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
        display: flex;
        flex-direction: column;
        margin:4px 10px;
        padding:4px 10px;
        font-size: 16px;
        background: hsla(30, 1%, 63%, 0.5);
        border-radius: .125rem;
        &-title{
          text-align: center;
          color:#fff;
          // font-weight: bold;
        }
      }
    }
    &__box{
      background: url('../../assets/img/lawn.png') no-repeat top center/100px 68px;
      background-size: 100% auto;
      background-position: 0 100%;
      height: 130px;
      &--item{
        display: flex;
        flex-direction: column;
        justify-content:space-between;
        text-align: center;
        .item-text{
          background:hsla(0, 0%, 96%, 0.5);
          border-radius: .125rem;
          margin:0 10px 10px;
        }
      }
    }
  }
}
</style>
