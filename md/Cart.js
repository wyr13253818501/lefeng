import React from "react";
import {Link, hashHistory} from "react-router";

import MyAjax from "./MyAjax.js";
import "./../scss/cart.scss"
export default class Cart extends React.Component{
	constructor(props){
		super(props)
		this.state={
			proList:[],
			many:[],
			name:[],
			arr:[]
		}
	}
	
	toBackFn(){
		window.history.go(-1)
	}
	
	//结算
	toAccountFn(){
		var that=this;
		hashHistory.push("/Account")
	}
	//删除
	toDeleteFn(index){
		var that=this;
		var name1=this.state.name;
		console.log(name1)
	    name1.splice(index, 1)
		that.setState({
			name:name1
		})
		$("li").eq(index).css('display','none');
		localStorage.setItem("goods",JSON.stringify(name1))
		
	}
	//减
	todecreaseFn(index){
		var that=this;
		var value=this.refs.val.innerHTML;
		value--;
		
		
		$('.carListCon').eq(index).find('.pronum').html(value);
		var rq=that.state.proList;
		rq[index].size=value
		that.setState({
			size:rq[index].size
		})
		var name1=this.state.name;
		name1[index].size=value;
		that.setState({
			size:name1[index].size
		})
		localStorage.setItem("goods",JSON.stringify(name1))
	}
	
	//加
	toaddFn(index){
		var that=this;
		var value=this.refs.val.innerHTML;
		value++;
		$('.carListCon').eq(index).find('.pronum').html(value);
		var rq=that.state.proList;
		rq[index].size=value
		that.setState({
			size:rq[index].size
		})
		var name1=this.state.name;
		name1[index].size=value;
		that.setState({
			size:name1[index].size
		})
		localStorage.setItem("goods",JSON.stringify(name1))
	}
	
	
	componentWillMount(){
		var that=this
		var name=JSON.parse(localStorage.getItem("goods"))
		that.setState({
			name:name
		})	
		var many=[];
		for(var i in name){
			var brandId=name[i].a;
			var gid=name[i].b;	
			var url="http://w.lefeng.com/api/neptune/goods/detail_with_stock/v1?needBrandInfo=true&gid="+gid+"&brandId="+brandId
			MyAjax.fetchJsonp(url,function(data){
				var result=data.data.goods			
				var obj={
					verticalImage:result.verticalImage,
					brandStoreName:result.brandStoreName,
					productName:result.productName,
					vipshopPrice:result.vipshopPrice,
					size:name[i].size
				}
				many.push(obj)				
				that.setState({
					proList:many
				})
			
				
			},function(err){
				console.log(err)
			})	
			
		}
		
	}
	
	
	render(){	
		var that=this
		var result=this.state.proList;
		var arr=[];
		var disp=[];
		var total=0;		
		for(var i in result){
			total=total+result[i].vipshopPrice*result[i].size
			arr.push(<li key={i} ref="lis" data-gid={result[i].gid} className="carListCon">
						<div className="left"><img src={result[i].verticalImage}/></div>
						<div className="right">
							<p><a>{result[i].productName}</a></p>
							<p>￥{result[i].vipshopPrice}</p>
							<p><span onClick={this.todecreaseFn.bind(this,i)}>-</span><span ref="val" className="pronum">{result[i].size}</span><span onClick={this.toaddFn.bind(this,i)}>+</span></p>
							<p onClick={this.toDeleteFn.bind(this,i)}>&times;</p>
						</div>
					</li>)
		}
		
		
		localStorage.setItem("num",total)
		
		console.log(localStorage.getItem("num"))
		var cc=localStorage.getItem("num");
		var len=this.state.name.length;
		if(len>=1){
			disp.push(arr)
		}else{
			disp.push(<div id="dis">
						<i></i>
						<p>购物车空空如也!</p>
						<p>赶紧抢点东西犒劳自己吧!</p>
						<div className="backHome">
							<p><a href="#/">去首页逛逛吧</a></p>
						</div>					
					</div>)
			$(".total").css("display","none")
		}
	
	
		return(
			<div className = "type">
				<header id="gcheader">
					<div className="commonHeader">
						<div className="title" ref="back" onClick={this.toBackFn.bind(this)}>
							<i className="iconfont">&#xe602;</i>
						</div>
						<div className="box">
							<p>购物车</p>
						</div>
						<div className="moreInfo"></div>
					</div>
				</header>
				<div id="ccontent">					
						<ul id="pro">
							{disp}							
						</ul>
						<br/><br/><br/><br/>
						<div className="total">
							<div className="total-left">
								<p>待支付:￥{cc}</p>
							</div>
							<div className="total-right" onClick={this.toAccountFn.bind(this)}>
								<p>结算</p>
							</div>
						</div>
				</div>
			</div>
		)
	}
}