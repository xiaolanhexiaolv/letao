// 发送ajax获取数据，动态渲染

$(function(){

    var picArr = [];
    var currentPage = 1;
    var pageSize = 3;
    render();
    function render(){
        $.ajax({
        type:'get',
        url:'/product/queryProductDetailList',
        data:{
            page: currentPage,
            pageSize: pageSize
        },
        dataType: 'json',
        success: function(info){
            console.log(info);
            var htmlStr = template('productTpl',info);
            $('tbody').html(htmlStr);
            // 分页功能
            $('#paginator').bootstrapPaginator({
               bootstrapMajorVersion:3,
               currentPage: info.page,
               totalPages: Math.ceil(info.total / info.size),
               onPageClicked: function(a,b,c,page){
                   currentPage = page;
                   render();
               }

            })
        }
    })

}

// 点击添加分类按钮显示模态框
$('#addBtn').click(function(){
    $('#addModal').modal('show');
    // 获取数据，渲染二级分类下拉列表
    $.ajax({
        type:'get',
        url:'/category/querySecondCategoryPaging',
        data:{
            page: 1,
            pageSize: 100
        },
        dataType:'json',
        success: function(info){
            console.log(info);
            var htmlStr = template('dropdownTpl',info);

            $('.dropdown-menu').html(htmlStr);

            
        }
    })
});

// 给下拉框的a添加点击事件
// 事件委托
$('.dropdown-menu').on('click','a',function(){
    var txt = $(this).text();
    $('#dropdowntxt').text(txt);
    // 获取id,赋值给隐藏域
    var id = $(this).data('id');
    $('[name="brandId"]').val(id);

    // 将隐藏域的校验状态改成成功状态
    $('#form').data('bootstrapValidator').updateStatus('brandId','VALID')


});
// 配置fileupload,实现文件上传
$('#fileupload').fileupload({
    dataType: 'json',
    done: function(e,data){
        // console.log(data);
        // console.log(data.result);
        var picObj = data.result;
        picArr.unshift(picObj);
        var picUrl = picObj.picAddr;
        $('#imgBox').prepend('<img src="'+ picUrl +'" style="width: 100px;">')
        // console.log( picArr);
        // 如果长度大于3，说明超出长度范围，需要将最后的图片移除
        if(picArr.length > 3){
            picArr.pop();
            // 删除结构最后一张图
            $('#imgBox img:last-of-type').remove();
        }

        if(picArr.length === 3){
            $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID');
        }
    }
});

// 配置表单校验
$('#form').bootstrapValidator({
    excluded:[],

    feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

    //   校验字段

        fields:{
        brandId:{
            validators:{
                notEmpty:{
                    message: '请选择二级分类'
                }
            }
        },

            proName:{
                validators:{
                    notEmpty:{
                        message: '请输入商品名称'
                    }
                }


        },


            proDesc:{
                validators:{
                    notEmpty:{
                        message: '请输入商品描述'
                    }
                }
        },

            num:{
            validators:{
                notEmpty:{
                    message: '请输入商品库存'
                },

                //    正则校验
                    regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存必须是非零开头的数字'
        }
        }
            },

                size:{
                    validators:{
                    notEmpty:{
                        message: '请输入商品描述'
                    },
                regexp: {
                regexp: /^\d{2}-\d{2}$/,
                message: '必须是XX-XX的格式,XX是两位数字,例如:36-44'
                    
                }

                }

            },
    
                oldPrice:{

                    validators:{
                        notEmpty:{
                            message: '请输入商品原价'
                        }

                    }

                },


                price:{

                    validators:{
                        notEmpty:{
                            message: '请输入商品现价'
                        }

                    }

                },

                    picStatus:{

                        validators:{
                            notEmpty:{
                                message: '请上传三张图片'
                            }

                        }


                    }

   }

});

// 表单验证成功事件

$('#form').on('success.form.bv',function(e){
    e.preventDefault();
    var paramsStr = $('#form').serialize();//所有表单内容数据
    //还需要拼接上图片地址和名称
    paramsStr += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    paramsStr += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    paramsStr += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;
    $.ajax({
        type: 'post',
        url:'/product/addProduct',
        data: paramsStr,
        dataType:'json',
        success: function(info){
            console.log(info);
            if(info.success){
                $('#addModal').modal('hide');
                currentPage = 1;
                render();

                // 重置表单

                $('#form').data('bootstrapValidator').resetForm(true);
                // 由于下拉菜单和图片不是表单元素，需要手动重置
                $('#dropdowntxt').text('请选择两级分类');
                $('#imgBox img').remove();
                picArr = [];


            }
        }
       
    })
})
    
})