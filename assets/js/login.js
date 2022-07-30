$(function(){
  $(".login a").click(function(){
    $(".login").hide();
    $(".register").show();
  });

  $(".register a").click(function(){
    $(".register").hide();
    $(".login").show();
  })

  

  // 从layui中获取dorm对象
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] ,

    repwd: function(value){
      var pwd = $('.register [name=password]').val()
      if(value != pwd ){
        return'两次密码不一致'
      }
    }
  });     
  
 
  $("#form_reg").on('submit',function(e){
    // 阻止默认的提交行为
    e.preventDefault();
    var data = {username:$('.register [name=username]').val(),
    password:$('.register [name=password]').val()}
    // 注意这里并不是完整地址，完整地址在baseAPI.js中进行拼接，用到了jqury内置方法，详见baseAPI.js
    $.post("/api/reguser", data,
    function(res){
      if(res.status !== 0){
        return layer.msg(res.message);
      }
      layer.msg('注册成功');
      // 模拟点击事件，跳转到登入页面
      $("#a_log").click()
    })
  })

  $("#form_log").on('submit',function(e){
    // 阻止默认的提交行为
    e.preventDefault();
    data = $(this).serialize()

    $.ajax(
      {
        method: "post",
        url:"/api/login",
        data: data,
        success: function(res){
          if(res.status !== 0){
            return layer.msg(res.message);
          }
          layer.msg('登入成功');
          //将登入成功获得的token值，保存在localStorage中
          localStorage.setItem('token',res.token)
          console.log(res.token)
          // 跳转到主页
          // location.href = '/index.html'
        }
      }
    )

    // $.post("/api/login", 
    // // 快速获取表单数据
    // data,
    // function(res){
    //   if(res.status !== 0){
    //     return layer.msg(res.message);
    //   }
    //   layer.msg('登入成功');
    //   //将登入成功获得的token值，保存在localStorage中
    //   localStorage.setItem('token',res.token)
    //   console.log(res.token)
    //   // 跳转到主页
    //   location.href = '/index.html'
    // })
  })


})