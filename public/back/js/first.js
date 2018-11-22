$(function(){
    var currentPage = 1;
    var pageSize = 5;
    render();
    function render(){
        $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
            page: currentPage,
            pageSize: pageSize
        },
        dataType:'json',
        success: function(info){
            console.log(info);
            var htmlStr = template('firstTpl',info);
            $('tbody').html(htmlStr);
            $('#paginator').bootstrapPaginator({

                // 指定版本号
                bootstrapMajorVersion:3,
                currentPage: info.page,
                totalPage: Math.ceil(info.total / info.size),
                onPageClicked: function(a,b,c,page){
                    // console.log(page);
                    currentPage = page;
                    render();


                }

            })

        }
    });

    }
    


})