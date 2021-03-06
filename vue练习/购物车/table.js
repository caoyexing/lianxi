
const app = new Vue({
  el:'#app',
  data:{
    list:[
      {
        id: 1,
        name: '《算法导论》',
        date: '2006-9',
        price: 85.00,
        count: 1
      },
      {
        id: 2,
        name: '《UNIX编程艺术》',
        date: '2006-2',
        price: 59.00,
        count: 1
      },
      {
        id: 3,
        name: '《编程珠玑》',
        date: '2008-10',
        price: 39.00,
        count: 1
      },
      {
        id: 4,
        name: '《代码大全》',
        date: '2006-3',
        price: 128.00,
        count: 1
      },
    ]
  },
  methods:{
    add(index){
      console.log(index)
      this.list[index].count ++
      
    },
    cut(index){
      this.list[index].count --
    },
    dele(index){
      this.list.splice(index,1)
    }
  },
  computed:{
    sum(){
      var total = 0
      this.list.forEach((item)=>{
        total += item.price * item.count
      })
      return total
    }
  },
  filters:{
    getPrice(price){
    return '￥' + price.toFixed(2)
    }
  }
})