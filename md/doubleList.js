//http://w.lefeng.com/api/neptune/goods/get_thirdcat_size/v1?brandId=800044971

import React from "react";
import {Link, hashHistory} from "react-router";

import MyAjax from "./MyAjax.js";
import "./../scss/doubleList.scss"
export default class DoubleList extends React.Component{
	constructor(props){
		super(props)
		this.state={
			proList:[],
			num1:1
		}
	}
	
	toBackFn(){
		window.history.go(-1)
	}
	
	toDetailFn(brandID,gid){
		var that=this		
		hashHistory.push({
			pathname:"/Detail",
			query:{
				brandId:brandID,
				gid:gid
			}
		})
	}
	
	toCartFn(){
		hashHistory.push("/Cart")
	}
	
	toZeroFn(){
		var that=this;
		that.refs.top.scrollTop=0
	}
	
	toTopFn(){
		var that=this;
		var num=this.props.location.query.url;
		var bId=num.slice(26,35);
		var top=this.refs.top.scrollTop
		var height=this.refs.top.scrollHeight;
		var num1=this.state.num1
		if(top>height-80-this.refs.top.offsetHeight){
			num1++
			that.setState({
				num1:num1
			})
			var url1="http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId="+bId+"&start="+num1;
			MyAjax.fetchJsonp(url1,function(data){
				var result=data.data;
				var arr1=that.state.proList
				for (var i in result) {
					arr1.push(result[i])
				}			
				that.setState({					
					proList:arr1
				})			
			},function(err){
				console.log(err)
			})
		}		
	}
	
	toSortFn(){
		var that=this;
		var num=this.props.location.query.url;	
		var bId=num.slice(26,35);
		var url3="http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId="+bId+"&start=1&sort=%7B%22vipshopPrice%22%3A%22desc%22%7D";
		MyAjax.fetchJsonp(url3,function(data){
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
		var num=this.props.location.query.url;	
		var bId=num.slice(26,35);
		var url4="http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId="+bId+"&start=1&sort=%7B%22sale%22%3A%22desc%22%7D";
		MyAjax.fetchJsonp(url4,function(data){
			var result=data.data
			that.setState({
				proList:result
			})
		},function(err){
			console.log(err)
		})
	}
	
	//筛选
	toSelectFn(){
		$("#select").animate({right:"0"})
		var that=this;
		var num=this.props.location.query.url;	
		var bId=num.slice(26,35);
		var url5="http://w.lefeng.com/api/neptune/goods/get_thirdcat_size/v1?brandId="+bId;
		MyAjax.fetchJsonp(url5,function(data){
			var result=data.data
			console.log(result)
			that.setState({
				aList:result
			})
		},function(err){
			console.log(err)
		})
		
		
	}
	
	//变换a的边框颜色
	toActiveFn(index){
		$(".sc-three a").css("text-decoration","none")
		$(".sc-three a").eq(index).addClass("active").siblings().removeClass("active")
	}
	
	//确认按钮
	toBtnFn(){
		var that=this;
		var num=this.props.location.query.url;	
		var bId=num.slice(26,35);
		var val=$(".active").html();
		var url6="http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId="+bId+"&start=1&catName3="+val;
		MyAjax.fetchJsonp(url6,function(data){
			var result=data.data
			that.setState({
				proList:result
			})
			
		},function(err){
			console.log(err)
		})
		$("#select").animate({right:"-100%"})
	}
	
	
	//取消
	toCancleFn(){
		$("#select").animate({right:"-100%"})
	}
	
	componentWillMount(){
		var that=this;
		var num=this.props.location.query.url;	
		var bId=num.slice(26,35);
		var url="http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId="+bId+"&start=1"
		MyAjax.fetchJsonp(url,function(data){
			var result=data.data
			console.log(result)
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
		var aLi=this.state.aList;
		var liArray=[];
		var arr=[];
		for(var i in result){
			arr.push(<li key={i} onClick={this.toDetailFn.bind(this,result[i].goods.brandId,result[i].goods.gid)}><img src={result[i].goods.image}/><p>{result[i].goods.name}</p><a>￥{result[i].goods.vipshopPrice}</a><a>￥{result[i].goods.marketPrice}</a></li>)
		}
		
		for(var i in aLi){
			liArray.push(<a key={i} onClick={this.toActiveFn.bind(this,i)}>{aLi[i].thirdCatName}</a>)
		}
		
		return(
			<div className = "type">
				<header id="cheader">
					<div className="commonHeader">
						<div className="title" ref="back" onClick={this.toBackFn.bind(this)}>
							<i className="iconfont">&#xe602;</i>
						</div>
						<div className="name">
							<p>列表页</p>
						</div>
						<div className="moreInfo" onClick={this.toBackFn.bind(this)}>
							<i className="iconfont">&#xe60e;</i>
						</div>
					</div>
				</header>
				<div id="ccontent" onScroll={this.toTopFn.bind(this)} ref="top">
					<ul id="third">
						<li onClick={this.toSortFn.bind(this)}>价格</li>
						<li onClick={this.toSaleFn.bind(this)}>销量</li>
						<li onClick={this.toSelectFn.bind(this)}>筛选</li>
					</ul>
					
					<ul id="list">
						{arr}
					</ul>
					
					<div id="shop" onClick = {this.toCartFn.bind(this)}>
						<i className="iconfont">&#xe600;</i>
					</div>
					
					<div id="toTop" onClick={this.toZeroFn.bind(this)}>
						<p>顶部</p>
					</div>
					
				</div>
				
				<div id="select">
					<div id="select-con">
						<div className="sc-one">
							<p><a onClick={this.toCancleFn.bind(this)}>取消</a><span>筛选</span></p>
						</div>
						<div id="blank"></div>
						
						<div className="sc-two">
							<p>分类</p>
							<div className="sc-three">
								
								{liArray}
							</div>
							<input type="button" id="btn" value="确认" onClick={this.toBtnFn.bind(this)}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}