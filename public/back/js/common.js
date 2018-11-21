$(function(){
// 开启进度条
//  NProgress.start();

//  setTimeout(function() {
//     //  进度条结束
//   NProgress.done();
     
//  },1000);

// .ajaxComplete()在每个ajax完成时调用(成功或失败都调用)
// .ajaxSend()

// $(document).ajaxStart(function() {
//   $( ".log" ).text( "Triggered ajaxStart handler." );
// });

$(document).ajaxStart(function(){
    NProgress.start();  
})

$(document).ajaxStop(function(){
    // 关闭进度条
    // 模拟网络延迟
    setTimeout(function(){
      NProgress.done();  
    },500)
   
});

// 公用的功能
// 左侧二级切换菜单
$('#category').click(function(){
    $(this).next().stop().slideToggle();
});

// 左侧菜单栏切换

$('.icon_left').click(function(){
    $('.lt_aside').toggleClass("hidemenu");
    $('.lt_topbar').toggleClass("hidemenu");
    $('.lt_main').toggleClass("hidemenu");
});

// 3、公共退出功能

$('.icon_right').click(function(){
    $('#myModal').modal('show');

});

$('#logoutBtn').click(function(){
   $.ajax({
       type:'get',
       url: '/employee/employeeLogout',
       datatype:'json',
       success: function(info){
        //    console.log(info);
        if(info.success){
            location.href ="login.html";
        }

       }

   })

})

})