import React from "react";
import {Link, hashHistory} from "react-router";

import MyAjax from "./MyAjax.js";
import "./../scss/List.scss"


//确认后的接口
//http://w.lefeng.com/api/neptune/search/search_by_keyword/v1?keyword=%E6%8A%A4%E8%82%A4%E5%A5%97%E8%A3%85&catName3=%E6%8A%A4%E8%82%A4%E7%A4%BC%E7%9B%92%2F%E5%A5%97%E8%A3%85&page=1
//a的接口
//http://w.lefeng.com/api/neptune/goods/get_thirdcat_size/v1?keyword=%E6%8A%A4%E8%82%A4%E5%A5%97%E8%A3%85
export default class List extends React.Component{
	constructor(props){
		super(props)
		this.state={
			proList:[],
			pro:[]
		}
	}
	
	toIndexFn(){
		window.history.go(-2)
	}
	
	
	toCartFn(){
		hashHistory.push("/Cart")
	}
	
	toSearchFn(){
		window.history.go(-1)
	}
	toDetailFn(brandID,gid,vendorProductId){
		var that=this		
		hashHistory.push({
			pathname:"/Detail",
			query:{
				brandId:brandID,
				gid:gid,
				vendorProductId:vendorProductId
			}
		})
	}
	
	toTop(){
		var that=this;
		var sc=that.refs.top.scrollTop
	}
	
	toZeroFn(){
		var that=this;
		that.refs.top.scrollTop=0
	}
	
	toSortFn(){
		var that=this;
		var result=this.state.proList;	
		var num=this.props.location.query.inp 
		var url3="http://w.lefeng.com/api/neptune/search/search_by_keyword/v1?keyword="+num+"&sort=%7B%22vipshopPrice%22%3A%22asc%22%7D&page=1";
		MyAjax.fetchJsonp(url3,function(data){
			console.log(data.data)
			var result=data.data
			that.setState({
				proList:result
			})
		},function(err){
			console.log(err)
		})
	}
	toSaleFn(){
		var that=this;
		var result=this.state.proList;	
		var num=this.props.location.query.inp 
		var url4="http://w.lefeng.com/api/neptune/search/search_by_keyword/v1?keyword="+num+"&sort=%7B%22sale%22%3A%22desc%22%7D&page=1";
		MyAjax.fetchJsonp(url4,function(data){
			console.log(data.data)
			var result=data.data
			that.setState({
				proList:result
			})
		},function(err){
			console.log(err)
		})
	}
	
	componentWillMount(){
		var that=this
		var num=this.props.location.query.inp 
		var url="http://w.lefeng.com/api/neptune/search/search_by_keyword/v1?keyword="+num+""
		MyAjax.fetchJsonp(url,function(data){
			console.log(data.data)
			var result=data.data
			that.setState({
				proList:result
			})
		},function(err){
			console.log(err)
		})
		
		var word=this.props.location.query.word
		var url1="http://w.lefeng.com/api/neptune/search/search_by_keyword/v1?keyword="+word
		MyAjax.fetchJsonp(url1,function(data){
			console.log(data.data)
			var result=data.data
			that.setState({
				proList:result
			})
		},function(err){
			console.log(err)
		})
	}
	
	
	
	
	render(){
		var that=this;
		var result=this.state.proList;
		var arr=[]
		for(var i in result){
			arr.push(<li key={i}  onClick={this.toDetailFn.bind(this,result[i].goods.brandId,result[i].goods.gid,result[i].goods.vendorProductId)} ref="goods">
				<div className="left"><img src={result[i].goods.image}/></div>
				<div className="right">
					<p>{result[i].goods.brandStoreName}</p>
					<p>{result[i].goods.productName}</p>
					<p>销量{result[i].goodsStock.saled}</p>
					<p>￥{result[i].goods.vipshopPrice}</p>
				</div>
			</li>)
		}
		
		return(
			<div className = "type">
				<header id="lheader">
					<div className="commonHeader">
						<div className="search">
							<input type="text" id="text"  placeholder="搜索"/>
						</div>
						<div className="cancle" onClick={this.toSearchFn.bind(this)}>
							<p>取消</p>
						</div>
						<div className="index" onClick = {this.toIndexFn.bind(this)}>
							<i className="iconfont">&#xe60e;</i>
						</div>						
					</div>
				</header>
				<div id="lcontent" onScroll={this.toTop.bind(this)} ref="top">
					<ul id="third">
						<li onClick={this.toSortFn.bind(this)}>价格</li>
						<li onClick={this.toSaleFn.bind(this)}>销量</li>
						<li>筛选</li>
					</ul>
					
					<ul id="product">
						{arr}
					</ul>
					
					<div id="footer">
						<p><a>首页</a><a>购物车</a><a>客户端</a><a>登录</a><a>注册</a></p>
						<p>联系客服 400-000-1818</p>
						<p>skdjihfuewhduiswjkdsmkdbdn</p>
					</div>
					
						
										
					<div id="shop" onClick = {this.toCartFn.bind(this)}>
						<i className="iconfont">&#xe600;</i>
					</div>
					
					<div id="toTop" onClick={this.toZeroFn.bind(this)}>
						<p>顶部</p>
					</div>
				</div>
			</div>
		)
	}
}



