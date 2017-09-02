import React from "react";
import {Link, hashHistory} from "react-router";

import MyAjax from "./MyAjax.js"
import Toast from "./Toast";
import "./../scss/login.scss"
export default class Login extends React.Component{
	constructor(props){
		super(props)
	}
	
	toBackFn(){
		window.history.go(-1)
	}
	
	toHomeFn(){
		window.history.go(-2)
	}
	
	toRegisterFn(){
		hashHistory.push("/Register")
	}
	
	toLoginFn(){
		var that=this;
		var userName=this.refs.userName.value
		var pwd=this.refs.pwd.value
		console.log(userName,pwd)
		if(userName==""||pwd==""){
			Toast.makeText("用户信息不完整",2000);
		}else{
			var userObj= {
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				data:{
					status:"login",
					userID:userName,
					password:pwd
				},
				dataType:"JSON"
			}
			MyAjax.zeptoAjax(userObj,function(data){
				if(data=="0"){
					Toast.makeText("用户不存在，请先注册",3000);
				}else if(data=='2'){
					Toast.makeText("密码错误",3000);
				}else{
					window.history.go(-2)
					localStorage.setItem('isLogin','1')
					
				}
			})
			
		}
	}
	render(){
		return(
			<div className = "type">
				<header id="cheader">
					<div className="commonHeader">
						<div className="title" ref="back" onClick={this.toBackFn.bind(this)}>
							<i className="iconfont">&#xe602;</i>
						</div>
						<div className="box">登录</div>
						<div className="moreInfo" onClick={this.toHomeFn.bind(this)}>
							<i className="iconfont">&#xe60e;</i>
						</div>
					</div>
				</header>
				<div id="ccontent">
					<div id="con">
						<input type="text" id="username" placeholder="已验证手机/用户名/邮箱" ref="userName"/>
						<input type="password" name="pwd" id="pwd" placeholder="密码" ref="pwd"/>
						<input type="button" id="btn" value="登录" onClick={this.toLoginFn.bind(this)}/>
						<div className="right">
							<a onClick={this.toRegisterFn.bind(this)}>立即注册</a>
							<a>忘记密码</a>
						</div>
					</div>
					
					
					<div id="toast"></div>
				</div>
			</div>
		)
	}
}