import React from "react";
import {Link, hashHistory} from "react-router";

import "./../scss/search.scss"

import MyAjax from "./MyAjax.js";
import Home from "./Home.js";
export default class Search extends React.Component{
	constructor(props){
		super(props)
		this.state={
			proList:[],
			val:'',
			searchList:[]
		}
	}
	
	
	componentWillMount(){
		var that=this;
		var url="http://w.lefeng.com/api/neptune/search/hot_keywords/v1?count=10&highlight=1";
		MyAjax.fetchJsonp(url,function(data){
			console.log(data.data)
			var result=data.data
			that.setState({
				proList:result
			})
		},function(err){
			console.log(err)
		})
	}
	
	toIndexFn(){
		window.history.go(-1)
	}
	
	toListFn(val){
		var that=this
		hashHistory.push({
			pathname:"/List",
			query:{
				inp:val
			}
		})
	}
	toList1Fn(Word){
		var that=this
		hashHistory.push({
			pathname:"/List",
			query:{
				word:Word,
			}
		})
	}
	
	
	toChangeFn(){
		var that=this
		var val=this.state.val
		var val=this.refs.sousuo.value
		this.refs.block.style.display="block";
		this.refs.none.style.display="none";
		if(val==''){
			this.refs.none.style.display="block";
		}else{
			this.refs.none.style.display="none";
		}
		that.setState({
			val:val
		})
	
		
	
		
		var url1="http://w.lefeng.com/api/neptune/search/suggestion/v1?keyword="+val+"&count=15";
		MyAjax.fetchJsonp(url1,function(data){
			console.log(data.data)
			var search=data.data
			that.setState({
				searchList:search
			})
		},function(err){
			console.log(err)
		})
			
	}
	
	render(){
		var that=this;
		var result=this.state.proList;
		var search=this.state.searchList		
		var arr=[];
		var arr1=[]
		for(var i in result){
			arr.push(<a className={'color'+result[i].ishighlight} key={i} onClick={this.toList1Fn.bind(this,result[i].word)}>{result[i].word}</a>)
		}
		
		for(var i in search){
			arr1.push(<li key={i} ref="li" onClick={this.toListFn.bind(this,search[i])}><p>{search[i]}</p></li>)
		}
		return(
			<div className = "type">
				<header id="sheader">
					<div className="commonHeader">
						<div className="search">
							<input type="text" id="text"  placeholder="搜索"  ref="sousuo" onInput={this.toChangeFn.bind(this)}/>
						</div>
						<div className="cancle" onClick = {this.toIndexFn.bind(this)}>
							<p>取消</p>
						</div>
						<div className="index" onClick = {this.toIndexFn.bind(this)}>
							<i className="iconfont">&#xe60e;</i>
						</div>
						
						
					</div>
				</header>
				<div id="scontent">
					<div className="none" ref="none">
						<h5>大家都在搜</h5>
						<div className="aList">
							{arr}
						</div>
					</div>
					<ul  className="searchList" ref="block">
						{arr1}
					</ul>
					
				</div>
			</div>
		)
	}
}