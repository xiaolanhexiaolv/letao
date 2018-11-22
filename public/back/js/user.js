$(function(){
    // 发送ajax请求，获取数据
    var currentPage = 1;
    var pageSize = 5;
    var currentId ;
    var isDelete;
    render();

    function render(){
        $.ajax({
        type:'get',
        url: '/user/queryUser',
        data: {
            page: currentPage,
            pageSize: pageSize
        },
        dataType: 'json',
        success: function(info){
            console.log(info);
            var htmlStr = template('tmp',info);
            $('tbody').html(htmlStr);
            $('#paginator').bootstrapPaginator({
                bootstrapMajorVersion: 3, // 版本号
                currentPage: info.page, //当前页
                totalPages: Math.ceil(info.total / info.size),//总页数
                onPageClicked: function(a,b,c,page){
                    console.log(page);
                    currentPage = page; //更新当前页
                    render();

                }
            })
      }

    });

    }
    
    //  分页功能
    // var currentpage = 1 //当前页

    //     $("#paginator").bootstrapPaginator({
    //     bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
    //     currentPage:1,//当前页
    //     totalPages: 3,//总页数
    //     size:"small",//设置控件的大小，mini, small, normal,large
    //     onPageClicked:function(event, originalEvent, type,page){
    //         //为按钮绑定点击事件 page:当前点击的按钮值
    //         console.log(page);
    //     }
    //     });

//    2、点击禁用按钮，显示模态框(事件委托)

$('tbody').on('click','.btn',function(){
    // console.log('批量注册事件');
    // 显示模态框
    $('#userModal').modal('show');
    // 获取用户id
    currentId = $(this).parent().data('id');

    //获取需要修改的状态，可以根据按钮的类名来判断具体穿什么

    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;

});

// 点击模态框的确认按钮，完成用户的启用禁用

$('#submitBtn').click(function(){
    $.ajax({
        type: 'post',
        url:'/user/updateUser',
        data:{
             id: currentId,
             isDelete: isDelete
        },

        dataType: 'json',
        success: function(info){
            console.log(info);
            if(info.success){
                $('#userModal').modal('hide');
                render();
            }

        }
        

    })
})

})