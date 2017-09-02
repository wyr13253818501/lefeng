import React from "react";
import {Link, hashHistory} from "react-router";

import "./../scss/detail.scss"
//
import MyAjax from "./MyAjax.js";
export default class Detail extends React.Component{
	constructor(props){
		super(props)
		this.state={
			deList:[],
			total:0
		}
		
	}
	
	toBackFn(){
		window.history.go(-1)
	}
	
	toCart1Fn(){
		hashHistory.push("/Cart")
	}
	toCartFn(){
		var num1=this.props.location.query.brandId;
		var num2=this.props.location.query.gid;
		if(localStorage.getItem("isLogin") == "1"){
			var that=this
			var open=true
			if(localStorage.getItem("goods")){
				var a=JSON.parse(localStorage.getItem("goods"))
				for(var i in a){
					if(a[i].b==num2){
						a[i].size++;
						open=false
					}
				}
				localStorage.setItem("goods",JSON.stringify(a))
				if(open){
						var obj={
						"a":num1,
						"b":num2,
						size:1
					}
					a.push(obj)
					localStorage.setItem("goods",JSON.stringify(a))
				}
				
			}else{
				var a=[]
				var obj={
					"a":num1,
					"b":num2,
					size:1
				}
				a.push(obj)
				localStorage.setItem("goods",JSON.stringify(a))
			}
			var proNum=JSON.parse(localStorage.getItem("goods"));
			
			var total=0;
			for(var i in proNum){
				total=total+proNum[i].size
				var that=this;
				that.setState({
					total:total
				})
			}
			
			$(".red").css("display","block");
		}else{
			hashHistory.push("/Login")
		}
	}
		
	toTapFn(index){
		var that=this;
		$(".tab-one li").eq(index).addClass("active").siblings().removeClass("active");
		$(".tab-two li").eq(index).addClass("show").siblings().removeClass("show")
	}
	
	toLookFn(){
		var that=this;
		$(".pic").css("display","block")
	}
	
	toHomeFn(){
		hashHistory.push("/")
	}
	componentWillMount(){
		var that=this;
		var total=this.state.total;
		var num1=this.props.location.query.brandId;
		var num2=this.props.location.query.gid;
		var num3=this.props.location.query.vendorProductId
		var url="http://w.lefeng.com/api/neptune/goods/detail_with_stock/v1?needBrandInfo=true&gid="+num2+"&brandId="+num1
		MyAjax.fetchJsonp(url,function(data){
			var result=data.data.goods
			console.log(result)
			that.setState({
				deList:result
			})
			
		},function(err){
			console.log(err)
		})
		
		
		
		var url1="http://w.lefeng.com/api/neptune/goods/detail_with_stock/v1?needBrandInfo=true&gid="+num2
		MyAjax.fetchJsonp(url1,function(data){
			var result=data.data.goods
			that.setState({
				deList:result
			})
			
		},function(err){
			console.log(err)
		})	
		
		
	}
	
	render(){		
		var that=this;
		var result=this.state.deList;
		console.log(result)
		var post=result.pmsList;
		var flower=result.pollenTips;
		var description=result.descriptions;
		var detailImage=result.detailImage
		var arr=[];
		var arr1=[];
		var arr2=[];
		var arr3=[];
		for(var i in post){
			arr1.push(<div className="four" key={i}><a>{post[i].type}</a><a>{post[i].msg}</a></div>)
		}
		
		for(var i in description){
			arr2.push(<div className="msg" key={i}><a>{description[i].name}</a><a>{description[i].value}</a></div> )
		}
		for(var i in detailImage){
			arr3.push(<div className="pic" key={i}><img src={detailImage[i]}/></div>)
		}
		arr.push(<div id="con" key={1}>
						<div id="one">
							<img src={result.middleImage}/>
						</div>
						<div id="two">
							<a>{result.name}</a>
						</div>
						<div id="three">
							<a>￥{result.vipshopPrice}</a>
							<a>￥{result.marketPrice}</a>
						</div>
						
						{arr1}
							
						
					</div>)	
		
		return(
			<div className = "type">
				<header id="cheader">
					<div className="commonHeader">
						<div className="title" ref="back" onClick={this.toBackFn.bind(this)}>
							<i className="iconfont">&#xe602;</i>
						</div>
						<div className="name">
							<p>商品详情</p>
						</div>
						<div className="moreInfo" onClick={this.toHomeFn.bind(this)}>
							<i className="iconfont">&#xe60e;</i>
						</div>
					</div>
				</header>
				<div id="ccontent">
					{arr}
					
					<div id="blank"></div>
					<div id="commont">
						<p>
							<a>商品评价(41)</a>
							<span>80.5%好评</span>
						</p>
						<p>
							<a>很棒,容易上色</a>
							<span>131*****942</span>
						</p>
						<p>
							<a>满意,不错</a>
							<span>131*****942</span>
						</p>
						<p>
							<a>满意产品,出门方便携带</a>
							<span>131*****942</span>
						</p>
					</div>
					<div id="blank"></div>
					<div id="flower">
						<a>花粉</a>
						<a>{flower}</a>
					</div>
					<div id="blank"></div>
					
					<div id="tab">
						<ul className="tab-one">
							<li className="active" onClick={this.toTapFn.bind(this,0)}>商品信息</li>
							<li onClick={this.toTapFn.bind(this,1)}>购物说明</li>
						</ul>
						
						
						<ul className="tab-two">
							<li className="show">
								{arr2}
								<div className="click">
									<p onClick={this.toLookFn.bind(this)}>查看图片详情</p>
								</div>
								{arr3}
							</li>
							<li>
								<h6>商品详情</h6>
								<p>乐蜂展示的中间未划横线价格（显示如¥799）为乐蜂销售价，该价格是交易成交价，是您最终决定是否购买商品的依据。
乐蜂展示的中间划横线价格（显示如￥1399）为参考价，采集自品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价可能会与您购物时展示的不一致。该价格仅供您参考。
折扣比为乐蜂销售价与参考价的对比（该值四舍五入后采用小数点后1位，如¥799/¥2899=0.2756=2.8折），该对比值仅供您参考，不作为结算基数。</p>
<h6>商品详情</h6>
								<p>乐蜂展示的中间未划横线价格（显示如¥799）为乐蜂销售价，该价格是交易成交价，是您最终决定是否购买商品的依据。
乐蜂展示的中间划横线价格（显示如￥1399）为参考价，采集自品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价可能会与您购物时展示的不一致。该价格仅供您参考。
折扣比为乐蜂销售价与参考价的对比（该值四舍五入后采用小数点后1位，如¥799/¥2899=0.2756=2.8折），该对比值仅供您参考，不作为结算基数。</p>
							</li>
						</ul>
					</div>
					
					
					
					
					
					<br/><br/><br/><br/><br/><br/><br/>
					<div id="addCart">
						<div className="add-left" onClick = {this.toCart1Fn.bind(this)}>
							<i className="iconfont">&#xe600;</i>
							<div className="red">
								<p>{this.state.total}</p>
							</div>
						</div>
						
						
						
						<div className="add-right" onClick = {this.toCartFn.bind(this)}>
							<p>加入购物车</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}