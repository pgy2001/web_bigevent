$(function(){
  getUserInfo()
  $("#btnLogout").on('click',function(){
    // var layer = layui.layer;看说明文档，在index.html已经引入了jquery,layui.js所以不用在写这一行也一样的
    layer.confirm('确定要退出吗?', {icon: 3, title:'提示'}, 
    // 此处的函数是点击确定后触发的
    function(index){
      localStorage.removeItem('token');
      location.href ='login.html';
      
      layer.close(index);
    });
  })
})
//$(function(){})入口函数
// 意思是：一旦dom结构渲染完毕即可执行内部代码。jQuery入口函数可以书写多次

var layer = layui.layer
// 为了拿到跟路径，还要在index.html中导入baseAPI.js文件
function getUserInfo(){
  $.ajax(
    {
      method: "GET",
      url: "/my/userinfo",
      //登入成功后获得的token值，已经保存在localStorage中
      //要拿到这个值做验证
      //请求头写在了baseAPI中
      // headers:{
      //   Authorization:localStorage.getItem("token") || ''
      // },
      success:function(res){
        if(res.status !== 0){
          return layer.msg("获取用户信息失败");
        }
        //调用renderAvatar渲染用户的头像
        renderAvatar(res.data);
      },
      //无论成功失败都会调用complete
      // complete: function(res){
      //   if(res.responseJSON.status === 1 && 
      //     res.responseJSON.message === "身份认证失败！"){
      //       localStorage.removeItem('token')
      //       location.href ='login.html'
      //   }
      //}
    }
  )
}

function renderAvatar(user){
  var name = user.nickname || user.username;
 
  // &nbsp 是空格的意思
  $(".text-avatar2").html('欢迎&nbsp;'+ name)
  if(user.user_pic !==null){
    $(".layui-nav-img").attr('src',user.user_pic).show();
    $(".text-avatar").hide();
  }else {
    $(".layui-nav-img").hide();
    // name[0].toUpperCase(),字符串可以用数组的方式获得首个
    //toUpperCase(),将其转换为大写
    var first =name[0].toUpperCase()
    $(".text-avatar").html(first).show()
  }

}