/**
 * Created by Administrator on 2016/12/22 0022.
 */
(function () {

    //注册按钮绑定事件
    var registerSubmit =$(".in_sub");
    registerSubmit.bind("click",function () {
        registerInf();
    });

    function registerInf() {
        var username = $(".username").val();
        var password = $(".password").val();
        var password2 = $(".password2").val();
        var name = $(".name").val();
        var phoneNumber = $(".phone_number").val();
        var email = $(".email").val();
        //在本地对用户输入进行基础判断
        if(!username){
            swal({
                title: "Error!",
                text: "请输入用户名",
                type: "error",
                confirmButtonText: "SURE"
            });
            return
        }else if(!password){
            swal({
                title: "Error!",
                text: "请输入密码",
                type: "error",
                confirmButtonText: "SURE"
            });
            return
        }else if(password !== password2){
            swal({
                title: "Error!",
                text: "两次输入密码不同",
                type: "error",
                confirmButtonText: "SURE"
            });
            return
        }
        if(email){
            var reg =/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
            var trueEmail =reg.test(email);
            if(!trueEmail){
                swal({
                    title: "Error!",
                    text: "请输入正确邮箱",
                    type: "error",
                    confirmButtonText: "SURE"
                });
                return
            }
        }else{
            swal({
                title: "Error!",
                text: "请输入邮箱",
                type: "error",
                confirmButtonText: "SURE"
            });
            return
        }
        //判断完成 组成数据对象 进行注册请求
        var data ={
            status:"register",
            userID:username,
            password:password
        };
        register(data);
    }

    //注册请求
    function register(thedata) {
        $.post({url:"http://datainfo.duapp.com/shopdata/userinfo.php",
            data:thedata
        }).done(function (data) {
            /**
             * 用户名重名：0
             * 注册成功：1
             * 数据库报错：2
             */
            if(data == 0){
                swal({
                    title: "Error!",
                    text: "用户名重名",
                    type: "error",
                    confirmButtonText: "SURE"
                });
            }else if(data==2){
                swal({
                    title: "Error!",
                    text: "数据库报错",
                    type: "error",
                    confirmButtonText: "SURE"
                });
            }else if(data==1){
                window.location.href="../html/login.html"
            }
        })
    }





})();