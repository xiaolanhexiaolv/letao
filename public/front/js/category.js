$(function(){
    // 发送ajax请求，获取数据，动态渲染一级分类
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        dataType: 'json',
        success: function(info){
            console.log(info);
            var htmlStr = template('leftTpl',info);
            $('.lt_category_left ul').html(htmlStr);
            //默认渲染第一条，对应二级分类
            renderId(info.rows[0].id);
        }  
    });

    // 给左侧所有的a添加点击事件，事件委托

    $('.lt_category_left').on('click','a',function(){
        // 高亮
        $('.lt_category_left a').removeClass('current');
        $(this).addClass('current');
        // 获取id，调用方法，渲染右侧二级分类
        var id = $(this).data('id');
        renderId(id);

    })
  //根据一级分类id，动态渲染右侧二级分类
    function renderId(id){
        // 根据id发送ajax请求
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data: {
                id:id,
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                var htmlStr = template('rightTpl',info);
                $('.lt_category_right ul').html(htmlStr);
               
            }
        })

    }




})