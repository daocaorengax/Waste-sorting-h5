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
        <van-search :left-icon="require('../../assets/img/search.png')" v-model="searchValue" placeholder="请输入搜索关键词" @search="onSearch" @blur="onSearch"/>
      </div>
      <div class="page-conent__lishi" v-if="showHistory">
        <div class="lishi--title">历史记录</div>
        <div class="lishi--box">
          <div class="lishi--box-item" v-for="(e,i) in 30" :key="i" @click="itemClick(e)">
            标题{{i}}
          </div>
        </div>
      </div>
      <div ref="jiangluosan" class="page-conent__lishi jiangluosan"  v-else>
        <div class="lishi--img" :class="{'animation':showAnimation}" @click="setLitterClick">
          <van-image :src="require('../../assets/img/jiangluosan.jpg')"/>
          <van-image width="80" :src="require('../../assets/icon/aicao.png')"/>
        </div>
      </div>
      <van-row  class="page-conent__box" type="flex" justify="space-around">
        <van-col  class="page-conent__box--item" span="6" v-for="i in 4" :key="i"  @click="getHistory(i)">
          <van-image width="100" :src="require('../../assets/img/0'+i+'.jpg')"/>
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
      litterDate:{},
      jiangluosanHeight:'',//中间区域高度
      jiangluosanWidth:''//中间区域宽度
    }
  },
  mixins: [],
  computed: {
  },
  components: {},
  created () {
  },
  methods: {
    //历史记录点击事件
    itemClick(e){
      console.log(e,'历史记录点击事件');
      this.searchValue=e?.rubbish_name
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
        console.log(res,'--搜索垃圾')
        that.litterDate = data
      })
      .catch(function(error) {
          console.log(error);
        })

      console.log(this.searchValue,'searchValue');
    },
    //调用历史记录接口
    getHistory(v){
      this.showHistory=true
      console.log(v,'调用历史记录接口');
    },
    // 扔垃圾
    setLitterClick(){
      var h = this.$refs.jiangluosan.offsetHeight
      var w = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)/4;
      //垃圾写入记录
      this.jiangluosanHeight = (h-100)+'px';
      this.jiangluosanWidth = w*(1.5)+'px'
      // 动画
      this.showAnimation=true
      console.log(this.jiangluosanHeight,'--jiangluosanHeight',this.jiangluosanWidth,'--jiangluosanWidth');

      console.log(h,this.$refs.jiangluosan,'元素高');
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
        animation-duration:3s;
        animation-timing-function:linear;
        animation-delay:1s;
        /* Safari and Chrome: */
        -webkit-animation-name:myfirst;
        -webkit-animation-duration:3s;
        -webkit-animation-timing-function:linear;
        -webkit-animation-delay:1s;
      }
      @keyframes myfirst
      {
        from {left:50%; top:0;}
        to {left:var(--jiangluosanWidth); top:var(--jiangluosanHeight);}
      }

      @-webkit-keyframes myfirst /* Safari and Chrome */
      {
        from {left:50%; top:0;}
        to {left:var(--jiangluosanWidth); top:var(--jiangluosanHeight);}
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
