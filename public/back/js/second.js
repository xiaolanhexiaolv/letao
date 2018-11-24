$(function(){
    var currentPage = 1;
    var pageSize = 5;
    // 一进入页面根据carrentPage先渲染页面
    render();

function render(){
        $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data:{
          page: currentPage,
          pageSize: pageSize
      },
      dataType: 'json',
      success: function(info){
          console.log(info);
          var htmlStr = template('secondTpl',info);
          $('tbody').html(htmlStr);

          $('#paginator').bootstrapPaginator({
              bootstrapMajorVersion:3,
              currentPage: info.page,
              totalPages: Math.ceil(info.total / info.size),
              onPageClicked: function(a,b,c,page){
                //   console.log(page);

                currentPage = page;
                render();
              }

          })
      }
     });

       };


// 点击添加分类按钮，显示模态框

$('#addBtn').click(function(){
    $('#addModal').modal('show');
    // 发送ajax请求，请求所有的一级列表，进行渲染

    $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
            page: 1,
            pageSize: 100
        },
        dataType: 'json',
        success:function(info){
            console.log(info);
            var htmlStr = template('dropdown',info);
            $('.dropdown-menu').html(htmlStr);
        }

    })
});

// 给下拉菜单添加选中功能
$('.dropdown-menu').on('click','a', function(){
    // 获取a的文本
    var txt = $(this).text();
    // console.log(txt);
    $('#dropdowntxt').text(txt);
    var id = $(this).data('id');
    $('[name = "categoryId"]').val(id);

    //手动将隐藏域的校验状态，改成成功
    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');

});
// 调用fileUpload方法，发送文件

$('#fileupload').fileupload({
    dataType:'json',
    done:function (e, data) {
        console.log(data);
        var result = data.result;
        var picUrl = result.picAddr;
        $('#imgBox').attr('src',picUrl);
        $('[name = "brandLogo"]').val(picUrl);
         $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
      },
      //获取图片地址给隐藏域
      

});

// 添加表单校验

$('#form').bootstrapValidator({
    // 配置排除项，需要对隐藏域进行校验
        excluded:[],
        // 配置小图标
        feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    // 配置校验字段
        fields:{
        categoryId:{
            validators:{
                notEmpty:{
                    message: '请选择一级分类'
                }
            }
        },

        brandName:{
            validators:{
                notEmpty:{
                    message:'请输入二级分类'
                }
            }
        },

        brandLogo:{
            validators:{
                notEmpty:{
                    message:'请上传图片'
                }
            }
        }

    },

});


// 表单验证成功事件，阻止默认提交，发送ajax提交

$('#form').on('success.form.bv',function(e){

    // 阻止默认提交

    e.preventDefault();

    $.ajax({
        type:'post',
        url: '/category/addSecondCategory',
        data: $('#form').serialize(),
        dataType: 'json',
        success:function(info){
         console.log(info);
         if(info.success){
             $('#addModal').modal('hide');
             currentPage = 1;
             render();
         }
        }
    })

});

})
