let pinyin = require('js-pinyin');

let rubType=[
  {
    type:1,
    list:[
      '报纸','图书','纸盒','塑料袋','餐具','牙刷','杯子','矿泉水瓶','玻璃瓶','镜子',
      '易拉罐','铁钉','铁管','废弃衣服','毛巾','书包','毛绒玩具','珍珠','iPad','冰箱',
      '木制菜板','电话','电脑','安全帽','高跟鞋','电视机','空调','美工刀','泡沫','耳环',
      '风扇','充电线','吸尘器','吹风机','耳机'
      ]
  }
]
let rubbishList=[
]
rubType.forEach(x=>{
  x.list.forEach(l=>{
    rubbishList.push( {name:l,type:x.type,pic:pinyin.getFullChars(l).toLowerCase(),remarks:''})
  })
})
console.log(rubbishList);
export default rubbishList