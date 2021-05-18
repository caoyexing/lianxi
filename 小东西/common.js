/**
 * 事件监听功能;
 * @param {元素} ele 
 * @param {事件名} event_type 
 * @param {事件处理函数} event_callback 
 */

function on( ele , event_type , event_callback ){
      if(typeof ele.addEventListener === "function"){
            ele.addEventListener(event_type , event_callback)
      }else{
            ele.attachEvent("on" + event_type , event_callback);
      }
}

/**
 * 移除元素事件监听
 * @param {元素} ele 
 * @param {事件名} event_type 
 * @param {事件处理函数} event_callback 
 */

function off( ele , event_type , event_callback){
      if(typeof ele.removeEventListener === "function"){
            ele.removeEventListener(event_type , event_callback)
      }else{
            ele.detachEvent("on" + event_type , event_callback);
      }
}
/**
 * 
 * @param {元素} ele 
 * @param {属性} attr 
 * @param {目标} target 
 * move( wrapper , "left" , -1130 * index)
 */

function move( ele , attr , target){
      // 1. 关闭开启定时器;
      clearInterval( ele.timer );
      ele.timer = setInterval( function(){
            // 2. 计算速度;
            // var speed = (target - ele["offsetHeight"]) / 10;
            // var iNow = getComputedStyle(ele)[attr]; 100px;
            // 单独分辨一下此事取值的是 opaicty 还是其他属性;
            if(attr === "opacity"){
                var iNow = parseInt(getComputedStyle(ele)[attr] * 100); //0 ~ 100
            }else{
                var iNow = parseInt(getComputedStyle(ele)[attr]); //100
            }
            var speed = (target - iNow) / 10;
            // 3. 速度取整;
            if(speed > 0){
                  speed = Math.ceil(speed);
            }else{
                  speed = Math.floor(speed);
            }
            if(attr === "opacity"){
                  ele.style[attr] = (iNow + speed) / 100 ;
            }else{
                  ele.style[attr] = iNow + speed + "px";
            }
            // 4. 终止条件;
            if(iNow === target){
                  clearInterval(ele.timer);
            }
      } , 50)
}
/**
 * 
 * @param {cookie 名} name 
 * @param {cookie 值} value 
 * @param { 配置参数 } options 
 * 配置参数实例 :{
 *    path    : string,
 *    domain  : string,
 *    expires : number
 * }
 */

function setCookie( name , value , options ){
      // options = {};
      var cookie_string = name + "=" + value;
      // 特殊处理 : 如果options为undefined 我就给options赋值为一个空对象，防止类型错误;
      if(typeof options === "undefined"){
            options = {};
      }
      if(typeof options.path === "string"){
            cookie_string += ";path=" + options.path
      }
      if(typeof options.domain === "string"){
            cookie_string += ";domain=" + options.domain;
      }
      if(typeof options.expires === "number"){
            var d = new Date();
            d.setDate(d.getDate() + options.expires);
            cookie_string += ";expires=" + d;
      }
      document.cookie = cookie_string;
}
/**
 * 
 * @param {cookie名} name 
 * @param { 配置参数(选填,默认值 {expires : -1}) } options 
 */

function removeCookie( name , options ){
      // 两种情况一种是options传递值是一个对象;
      // options 没有对应的实参 options就是undefined;
      // 参数判断, 默认值合并;
      if(typeof options === "object"){
            options = Object.assign(options , {
                  expires : -1
            })
      } 
      if(typeof options === "undefined"){
            options = {
                  expires : -1
            }
      }
      setCookie( name , "" , options);
}

/**
 * 
 * @param { cookie名 } name 
 */

function getCookie( name ){
      var cookie_string = document.cookie;
      // 按照拆分规则拆成n条cookie; => ;空格 
      var cookie_array = cookie_string.split("; ");
      var res = "";
      // cookie_array.forEach( function( cookie_item ){
      // 因为forEach在得到结果还会继续执行，所以替换成some方便优化执行次数;
      cookie_array.some( function( cookie_item ){
            // 拆分每一条cookie , 拆分成第一部分为key值，第二部分为value值;
            if( cookie_item.split("=")[0] === name){ 
                  res =  cookie_item.split("=")[1]
                  return true;
            }
      })
      return res;
}
/**
 * 阻止默认事件;
 * @param {元素} ele 
 * @param {事件名} event_type 
 * @param {事件处理函数} event_callback 
 * 或者直接是 return false 不建议
 */
function zuzhi(evt){
  var e= evt || event;
  if(typeof e.preventDefault === "function"){
        e.preventDefault();
  }else{
        e.returnValue = false;
  } 
}
