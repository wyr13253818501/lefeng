import React from "react";
import {Link, hashHistory} from "react-router";

import "./../scss/login.scss"
import MyAjax from "./MyAjax.js"
import Toast from "./Toast";
export default class Register extends React.Component{
	constructor(props){
		super(props)
	}
	
	toBackFn(){
		window.history.go(-1)
	}
	
	toRegisterFn(){
		var that=this
		var userID=this.refs.user.value
		var pwd=this.refs.pwd.value
		if(userID==""||pwd==""){
			Toast.makeText("用户信息不完整",2000);
		}else{
			var userObj={
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				data:{
						status:"register",
						userID:userID,
						password:pwd
				},
				dataType:"JSON"
			}
			
			MyAjax.zeptoAjax(userObj,function(data){
				if(data == "0"){					
					Toast.makeText("用户名重名",3000);
				}else if(data == "1"){
					Toast.makeText("注册成功",3000);
					window.history.go(-1)
				}else{
					Toast.makeText("注册失败",3000);
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
						<div className="box">注册</div>
						<div className="moreInfo">
							
						</div>
					</div>
				</header>
				<div id="ccontent">
					<div id="con">
						<input type="text" id="username" placeholder="已验证手机/用户名/邮箱" ref="user"/>
						<input type="password" name="pwd" id="pwd" placeholder="密码" ref="pwd"/>
						<input type="button" id="btn" value="注册" onClick={this.toRegisterFn.bind(this)}/>
					</div>
					<div id="toast"></div>
				</div>
			</div>
		)
	}
}