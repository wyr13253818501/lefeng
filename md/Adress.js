import React from "react";
import {Link, hashHistory} from "react-router";

import MyAjax from "./MyAjax.js"
import Toast from "./Toast";
import "./../scss/adress.scss"
export default class Adress extends React.Component{
	constructor(props){
		super(props)
	}
	
	toBackFn(){
		window.history.go(-1)
	}
	
	toSaveFn(){
		var that=this;		
		
		var name=document.getElementById("name").value;
		var IdCart=document.getElementById("IdCart").value;
		var phone=document.getElementById("phone").value;
		var province1=document.getElementById("province1").value;
		var city1=document.getElementById("city1").value;
		var district1=document.getElementById("district1").value;
		var sadd=document.getElementById("sadd").value;
		if(name==""||IdCart==""||phone==""||province1==""||city1==""||district1==""||sadd==""){
			Toast.makeText("信息不完善",2000)
		}else{
			var open=true;
			if(localStorage.getItem("adress")){
				var adress=JSON.parse(localStorage.getItem("adress"))
				if(open){
					var obj={
						name:name,
						Idcard:IdCart,
						phone:phone,
						province1:province1,
						city1:city1,
						district1:district1,
						sadd:sadd
					}
					adress.push(obj)
					localStorage.setItem("adress",JSON.stringify(obj))
				}
			}else{
				var adress=[];
				var obj={
					name:name,
					Idcard:IdCart,
					phone:phone,
					province1:province1,
					city1:city1,
					district1:district1,
					sadd:sadd
				}
				adress.push(obj)
				localStorage.setItem("adress",JSON.stringify(obj))
			}
			hashHistory.push("/Account");
		}
	
		
		
		
		
		
	}
	
	
	
	
	
	
	
	
	componentWillMount(){
		
	}
	
	render(){
		
		
		
		return(
			<div className = "type">
				<header id="acheader">
					<div className="commonHeader">
						<div className="title" ref="back" onClick={this.toBackFn.bind(this)}>
							<i className="iconfont">&#xe602;</i>
						</div>
						<div className="box">
							<p>新增地址</p>
						</div>
						<div className="moreInfo"></div>
					</div>
				</header>
				
				
				<div id="ccontent">
					<div id="blank"></div>
					<div id="add-one">
						<p><a>收货人</a><input type="text" id="name"/></p>
						<p><a>身份证</a><input type="text" id="IdCart"/></p>
						<p><a>手机号</a><input type="text" id="phone"/></p>
						<p><a>收货时间</a></p>
					</div>
					<div id="blank"></div>
					
					
					<form className="form-inline" >
                        <div data-toggle="distpicker" id='distpicker'>
                            <ul>
                                <li>
                                    <div className="form-group">
                                        <span>省份</span>
                                        <select className="form-control" id="province1"></select>
                                    </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <span>城市</span>
                                        <select className="form-control" id="city1"></select>
                                    </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <span>地区</span>
                                        <select className="form-control" id="district1"></select>
                                    </div>
                                </li>
                                <li>
                                    <span>详细地址</span>
                                    <input className='detailDistrict' type="text" id="sadd"/>
                                </li>
                            </ul>
                        </div>
                    </form>
					
					<input type="button" id="btn" value="保存" onClick={this.toSaveFn.bind(this)}/>
					
					<div id="toast"></div>
				</div>
			</div>
		)
	}
	
	
	
	
	
	
	componentDidMount() {
        var $distpicker = $('#distpicker');
        $distpicker.distpicker({
            province: '河南省',
            city: '郑州市',
            district: '金水区'
        });

        $('#reset').click(function () {
            $distpicker.distpicker('reset');
        });

        $('#reset-deep').click(function () {
            $distpicker.distpicker('reset', true);
        });

        $('#destroy').click(function () {
            $distpicker.distpicker('destroy');
        });

        $('#distpicker1').distpicker();
    }
	
	
}
