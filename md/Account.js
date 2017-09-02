import React from "react";
import {Link, hashHistory} from "react-router";

import MyAjax from "./MyAjax.js"
import Toast from "./Toast";
import "./../scss/account.scss"
export default class Account extends React.Component{
	constructor(props){
		super(props)
	}
	
	toBackFn(){
		window.history.go(-1)
	}
	
	componentWillMount(){
		if(localStorage.getItem("adress")){
			$(".total").css("display","block")
		}else{
			Toast.makeText("新增地址",1000)
			setTimeout(function(){				
				hashHistory.push("/Adress")
			},2000)
			$(".total").css("display","none")
		}
	}
	
//<p><a>{adress[0].name}</a><span>{adress[0].phone}</span></p>
//<p><a>{adress[0].province1}</a><a>{adress[0].city1}</a><a>{adress[0].district1}</a><a>{adress[0].sadd}</a></p>	
	render(){		
		var num=localStorage.getItem("num")
		var adress=JSON.parse(localStorage.getItem("adress"))
		return(
			<div className = "type">
				<header id="acheader">
					<div className="commonHeader">
						<div className="title" ref="back" onClick={this.toBackFn.bind(this)}>
							<i className="iconfont">&#xe602;</i>
						</div>
						<div className="box">
							<p>结算</p>
						</div>
						<div className="moreInfo"></div>
					</div>
				</header>
				
				
				<div id="ccontent">
					
					
					<div id="con-one">
						<p>费用详情</p>
						<p><a>订单总价:</a><a>￥{num}</a></p>
						<p><a>乐蜂发货运费:</a><a>￥0.00</a></p>
					</div>
					<div id="blank"></div>
					<div id="con-two">
						<p><a>开具发票</a><a>不开发票></a></p>
					</div>
					
					<div id="con-adress">
											
					</div>
					
					<div className="total">
						<div className="total-left">
							<p>总金额:￥{num}</p>
						</div>
						<div className="total-right">
							<p>支付</p>
						</div>
					</div>
					
					<div id="toast"></div>
				</div>
			</div>
		)
	}
}
