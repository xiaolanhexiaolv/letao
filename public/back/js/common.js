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
   


})



})