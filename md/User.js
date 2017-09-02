import React from "react";
import {Link, hashHistory} from "react-router";

import "./../scss/user.scss"
export default class User extends React.Component{
	constructor(props){
		super(props)
	}
	
	toHomeFn(){
		window.history.go(-1)
	}
	
	toLoginFn(){
		hashHistory.push("/Login")
	}
	
	toRegisterFn(){
		hashHistory.push("/Register")
	}
	render(){
		return(
			<div className = "type">
				<header id="uheader">
					<div className="commonHeader">
						<div className="title" onClick={this.toHomeFn.bind(this)}>
							<i className="iconfont">&#xe602;</i>
						</div>
						<div className="box">
							<p>我的蜂巢</p>
						</div>
						<div className="moreInfo" onClick={this.toHomeFn.bind(this)}>
							<i className="iconfont">&#xe60e;</i>
						</div>
					</div>
				</header>
				<div id="content">
					<div id="loginOrregister">
						<img src="../img/2.png"/>
						<a onClick={this.toLoginFn.bind(this)}>登录</a>
						<a onClick={this.toRegisterFn.bind(this)}>注册</a>
					</div>
					
					
					
					<div id="orders">
						<i className="iconfont">&#xe60c;</i>
						<p>我的订单</p>
					</div>
					<div id="adress">
						<i className="iconfont">&#xe6ab;</i>
						<p>收货地址</p>
					</div>
					<div id="discount">
						<i className="iconfont">&#xe680;</i>
						<p>我的优惠券</p>
					</div>
					<div id="flower">
						<i className="iconfont">&#xe7d9;</i>
						<p>我的花粉</p>
					</div>
					<div id="hide">
						<i className="iconfont">&#xe617;</i>
						<p>我的收藏</p>
					</div>
					<div id="look">
						<i className="iconfont">&#xe62d;</i>
						<p>浏览记录</p>
					</div>
					<div id="opinion">
						<i className="iconfont">&#xe60b;</i>
						<p>意见反馈</p>
					</div>
					<div id="service">
						<i className="iconfont">&#xe8a1;</i>
						<p>在线客服</p>
					</div>
					<div id="about">
						<i className="iconfont">&#xe634;</i>
						<p>关于乐峰</p>
					</div>
					
					<div id="footer">
						<p><a>首页</a><a>购物车</a><a>客户端</a><a>登录</a><a>注册</a></p>
						<p>联系客服 400-000-1818</p>
						<p>skdjihfuewhduiswjkdsmkdbdn</p>
					</div>
					
				</div>
			</div>
		)
	}
}