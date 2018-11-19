$(function() {

  /* 需求: 表单校验 */
  /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */

  $('#form').bootstrapValidator({

    // 配置小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置校验字段  (配置之前, 需要先配置 input 的 name )
    fields: {
      // 配置用户名
      username: {
        // 配置校验规则
        validators: {
          // 非空校验
          notEmpty: {
            message: "用户名不能为空"
          },
          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须是2-6位"
          }
        }
      },
      // 配置密码
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须是6-12位"
          }
        }
      }
    },

  });

$('#form').on("success.form.bv",function(e){
    e.preventDefault();

    $.ajax({
        type:'post',
        url: "/employee/employeeLogin",
        data:$('#form').serialize(),
        dataType: 'json',
        success:function(info){
            console.log(info);
            if(info.success){
                location.href ="index.html";
            }
            if(info.error === 1000){
                alert(info.message);
            }

            if(info.error === 1001){
                alert(info.message);
            }

        }
    })
});

$('[type="reset"]').click(function(){
    $('#form').data('bootstrapValidator').resetForm();
})

})