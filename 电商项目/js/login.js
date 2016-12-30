/**
 * Created by Administrator on 2016/12/22 0022.
 */
(function () {


    //登录按钮绑定事件
    var loginSubmit =$(".in_sub");
    loginSubmit.bind("click",function () {
        loginInf();
    });


    function loginInf() {
        var username = $(".username").val();
        var password = $(".password").val();
        //在本地对用户输入进行基础判断
        if(!username){
            swal({
                title: "Error!",
                text: "请输入用户名",
                type: "error",
                confirmButtonText: "SURE"
            });
            return
        }else if(!password) {
            swal({
                title: "Error!",
                text: "请输入密码",
                type: "error",
                confirmButtonText: "SURE"
            });
            return
        }
        //判断完成 组成数据对象 进行登录请求
        var data ={
            status:"login",
            userID:username,
            password:password
        };
        login(data);
    }
    //登录请求
    function login(thedata) {
        $.post({url:"http://datainfo.duapp.com/shopdata/userinfo.php",
            data:thedata
        }).done(function (data) {
            /**
             * 用户名不存在：0
             * 用户名密码不符：2
             * 登陆成功：返回json对象
             */
            if(data == 0){
                swal({
                    title: "Error!",
                    text: "用户名不存在",
                    type: "error",
                    confirmButtonText: "SURE"
                });
            }else if(data==2){
                swal({
                    title: "Error!",
                    text: "用户名密码不符",
                    type: "error",
                    confirmButtonText: "SURE"
                });
            }else{
                window.location.href="../html/index.html";
                //本地储存用户名
                localStorage.setItem("userID", $(".username").val());
            }
        })
    }





})();