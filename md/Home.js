import "./../scss/main.scss"


import React from "react";
import {Link, hashHistory} from "react-router";

import MyAjax from "./MyAjax.js";
export default class Home extends React.Component{
	constructor(props){
		super(props)
		this.state={
			proList:[],
			moreList:[],
			num:1,
			cloudList:[],
			particulList:[]
		}
	}
	
	componentWillMount(){
		var that=this;
		var url="http://w.lefeng.com/api/neptune/brand/ad/v3?zoneId=943%2C478%2C496%2C693%2C724%2C725%2C726%2C727%2C728&resolution=375x667&appName=lefeng_android&version=4.1.1";
		MyAjax.fetchJsonp(url,function(data){
			console.log(data)
			var result=data.data['478']
			var may=data.data['496']
			var liMei=data.data['724']
			var cloud=data.data['728']
			that.setState({
				proList:result,
				mayList:may,
				limeiList:liMei,
				cloudList:cloud,
			})
		},function(err){
			console.log(err)
		})
		
		
		var url1="http://w.lefeng.com/api/neptune/special_brands/v3?page=1&labelType=1";
		MyAjax.fetchJsonp(url1,function(data){
			var jiaMeiLe=data.data[0].starProductList;
			var more=data.data;
			console.log(more)
			that.setState({
				jmlList:jiaMeiLe,
				moreList:more
			})
			
		},function(err){
			console.log(err)
		})
		
		
		
		
		var url3="http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId=800043639&start=1";
		MyAjax.fetchJsonp(url3,function(data){			
		},function(err){
			console.log(err)
		})
		
		var url4="http://w.lefeng.com/api/neptune/handpick_list/v1?start=1"
		MyAjax.fetchJsonp(url4,function(data){	
			var particul=data.data
			that.setState({
				particulList:particul
			})
		},function(err){
			console.log(err)
		})
	
	
	
	}
	
	
	
	
	toSearchFn(){
		hashHistory.push('/Search')
	}
	
	toUserFn(){
		hashHistory.push("/User")
	}
	
	toCartFn(){
		hashHistory.push("/Cart")
	}
	
	toTopFn(){
		var that=this
		that.refs.top.scrollTop=0;
	}
	tomoreFn(event){
		var that=this
		var top=this.refs.top.scrollTop
		var height=this.refs.top.scrollHeight
		var num=this.state.num
		if(top>height-100-this.refs.top.offsetHeight){
			num++
			that.setState({
				num:num
			})
			var url1="http://w.lefeng.com/api/neptune/special_brands/v3?page="+num+"&labelType=1";
			MyAjax.fetchJsonp(url1,function(data){
				var more=data.data;
				
				var arr=that.state.moreList
				for (var i in more) {
					arr.push(more[i])
				}
			
				that.setState({					
					moreList:arr
				})			
			},function(err){
				console.log(err)
			})
		}		
	}
	
	toDetailFn(GID){
		var that=this
		hashHistory.push({
			pathname:"/Detail",
			query:{
				gid:GID
			}
		})
	}
	
	
	
	toDoubleFn(url,i){
		var that=this
			hashHistory.push({
				pathname:"/DoubleList",
				query:{
					url:url
				}
			})
		
	}
	
	
	
	
	render(){
		var that=this;
		var result=this.state.proList;
		var may=this.state.mayList;
		var liMei=this.state.limeiList;
		var cloud=this.state.cloudList;
		var jiaMeiLe=this.state.jmlList;
		var more=this.state.moreList;
		var particul=this.state.particulList
		
		var arr1=[];
		var arr2=[];
		var arr3=[];
		var arr4a=[];
		var arr4b=[];
		var arr4c=[];
		var arr5=[];
		var arr6=[];
		var arr7=[];
		for(var i in result){
			arr1.push(<div className="swiper-slide" key={i} onClick={this.toDoubleFn.bind(this,result[i].url)}><img src={result[i].imgFullPath}/></div>)
		}
		for(var i in may){
			arr2.push(<div className="mayLi" key={i} onClick={this.toDoubleFn.bind(this,may[i].url,i)}><img src={may[i].imgFullPath}/></div>)
		}
		
		for(var i in liMei){
			arr3.push(<div className="swiper-slide" key={i}><img src={liMei[i].imgFullPath}/></div>)
		}
		
//		for(var i=0;i<cloud.length;i++){
//			if(i<5){
//				arr4a.push(<img src={cloud[i].imgFullPath} key={i}/>)
//			}else if(i>=5&&i<10){
//				arr4b.push(<img src={cloud[i].imgFullPath} key={i}/>)
//			}else {
//				arr4c.push(<img src={cloud[i].imgFullPath} key={i}/>)
//			}
//		}
		
		for(var i in jiaMeiLe){
			arr5.push(<div className="swiper-slide" key={i}><img src={jiaMeiLe[i].image}/><p>￥{jiaMeiLe[i].vipshopPrice}</p>
			</div>)
		}
		
		
//		for(var j=2;j<more.length;j++){
//			arr6.push(<div className="moreLi" key={j}><img src={more[j].brandImage}/><p>{more[j].agio}</p></div>)
//		}
		
		for(var i in particul){
			arr7.push(<li key={i} onClick={this.toDetailFn.bind(this,particul[i].goods.gid)}><img src={particul[i].goods.image}/><p>{particul[i].goods.name}</p><a>￥{particul[i].goods.vipshopPrice}</a><a>￥{particul[i].goods.marketPrice}</a></li>)
		}
		
		return(
		
			<div className = "type">
				<header id="header">
					<div className="commonHeader">
						<div className="title">乐蜂</div>
						<div className="box">
							<div className="search-box" onClick = {this.toSearchFn.bind(this)}>
								<i className="iconfont">&#xe6ae;</i>
								<p>静佳集团</p>
							</div>
						</div>
						<div className="moreInfo" onClick = {this.toUserFn.bind(this)}>
							<i className="iconfont">&#xe606;</i>
						</div>
					</div>
				</header>
				<div id="content" ref="top" onScroll={this.tomoreFn.bind(this)}>

					<div className="swiper-container" id="banner">
				        <div className="swiper-wrapper">
				           	{arr1}	        
				        </div>
				        <div className="swiper-pagination"></div>
				    </div>
				    
				    
				    <div id="may">
				    	{arr2}
				    </div>
				    
				    <div id="money"><img src="https://b.appsimg.com/2017/07/24/2212/02ca1977901017cf58e883938bd94474.jpg"/></div>
				    <div id="load"><img src="https://b.appsimg.com/2017/08/02/3487/fad1e5da78d7ab6f038e080cb6214970.jpg"/></div>
				    <div id="red"><img src="https://b.appsimg.com/2017/08/03/6798/aeb3ea79ed9d1c7d4ef3ce2928786c5e.jpg"/></div>
					<div id="one"><img src="https://b.appsimg.com/2017/08/02/3453/15949f9df0149eee8cb89c2666c1acd5.jpg"/></div>
				    <div id="two"><img src="https://b.appsimg.com/2017/08/02/4514/15949f9df0149eee8cb89c2666c1acd5.jpg"/></div>
				    <div id="three"><img src="https://b.appsimg.com/2017/08/02/376/15949f9df0149eee8cb89c2666c1acd5.jpg"/></div>							
				    <div id="four"><img src="https://b.appsimg.com/2017/08/02/3553/15949f9df0149eee8cb89c2666c1acd5.jpg"/></div>							
					
					
					<div className="swiper-container" id="limei-banner">
				        <div className="swiper-wrapper">
				           	{arr3}	        
				        </div>
				    </div>
				    
				    
				    <div id="five"><img src="http://b.appsimg.com/2017/07/29/5410/15013408740_710x260_70.jpg"/></div>							
				    <div id="global">
				    	<p>蜂购全球</p>
				    	<img src="http://b.appsimg.com/2016/07/18/7676/146882918395.jpg"/>
				    </div>
					
					
					
					<div className="swiper-container" id="cloudBanner">
				        <div className="swiper-wrapper">
				           	<div className="swiper-slide"></div>
				           	<div className="swiper-slide"></div>
				           	<div className="swiper-slide"></div>
				        </div>
				    </div>
				
					


					<div id="particular">
				    	<p>品牌专场</p>
				    	<img src="http://b.appsimg.com/2017/08/03/3868/1501751268631_750x330_70.jpg"/>
				    </div>
					
					
					<div className="swiper-container" id="jiaMeiLe-banner">
				        <div className="swiper-wrapper">
				           	{arr5}	        
				        </div>
				        
				    </div>
					
					
					
					<div id="more"></div>
					
					
					
					<ul id="list">{arr7}</ul>
					
					
					
					
					<div id="shop" onClick = {this.toCartFn.bind(this)}>
						<i className="iconfont">&#xe600;</i>
					</div>					
					<div id="toTop" onClick = {this.toTopFn.bind(this)}>
						<p>顶部</p>
					</div>
					
				</div>
			</div>
		)
	}

	componentDidUpdate(){
		var mySwiper = new Swiper("#banner", {
			pagination: ".swiper-pagination",
			paginationClickable: true,
			autoplay: 2000,
			loop: true,
			autoplayDisableOnInteraction: false		
		})
		
		var swiper = new Swiper('#limei-banner', {
	        slidesPerView: 3,
	        spaceBetween: 30,
	        freeMode: true
	    })
		
		var mySwiper = new Swiper("#cloudBanner", {
			loop: true,
			autoplayDisableOnInteraction: false		
		})
		
		var mySwiper = new Swiper("#jiaMeiLe-banner", {
	        slidesPerView: 3,	        
	        spaceBetween: 30,
	        freeMode: true	
		})
	}
}







