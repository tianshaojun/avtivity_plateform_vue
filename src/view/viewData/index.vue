<template>
	<div class="viewData_app">
		<common-header></common-header>
		<div class="viewData">
			<!--tou-->
					<div class="view_nav_box conter1200">
				<div class="view_nav">
					<p class="view_nav_top">{{activityInfo.activity_name}}</p>
					<p class="view_nav_bott">{{activityInfo.auditStatus}}</p>
				</div>
				<ul class="view_nav_list">
					<li>
						<img src="" />
					</li>
					<li>
						<p class="view_nav_list_num">{{activityInfo.visit_uv_new}}</p>
						<p class="view_nav_list_text">新用户数</p>
					</li>
					<li>
						<p class="view_nav_list_num">{{activityInfo.visit_uv}}</p>
						<p class="view_nav_list_text">访客人数</p>
					</li>
					<li>
						<p class="view_nav_list_num">{{activityInfo.visit_pv}}</p>
						<p class="view_nav_list_text">访问次数</p>
					</li>
					<li>
						<p class="view_nav_list_num">{{activityInfo.session_cnt}}</p>
						<p class="view_nav_list_text">打开次数</p>
					</li>
					<li>
						<p class="view_nav_list_num">{{activityInfo.stay_time_session}}</p>
						<p class="view_nav_list_text">次均停留时长</p>
					</li>
				</ul>
			</div>
			<!--切换-->
			<div class="viewData_teb_data conter1200">
				<ul>
					<li v-for="(item,index) in tabs" :key="index" :class="{active:index == num}" @click="teb_color(index)">{{item}}</li>
				</ul>
				<div class="viewData_teb_time">
					<div class="block">
						<el-date-picker v-model="value1" type="date" placeholder="选择日期">
						</el-date-picker>
					</div>
					<div class="viewData_teb_time_cen"></div>
					<div class="block">
						<el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
						</el-date-picker>
					</div>
				</div>
			</div>
			<!--<div class="tabCon">
	            <div  v-for='(itemCon,index) in tabContents'  v-show=" index == num">{{itemCon}}</div>
	        </div>-->
			<!--图表-->

			<div class="chart_box conter1200">
				<div class="chart_box_select">
					<el-select style="margin:20px 0 0 50px" @change="chooseData"  v-model="value5" :multiple-limit="2" multiple placeholder="请选择">
						<el-option v-for="item in chartsData.yData" :key="item.name" :label="item.name" :value="item.name">
						</el-option>
					</el-select>
				</div>
				<div id="myChart" class="line_box" :style="{width: '100%', height: '330px'}">

				</div>
					<p class="bgEnTime">(显示最近十五天数据)</p>

			</div>
			<!--表格-->
			<div class="table_data conter1200">
				<el-table :data="tableData" :header-cell-style="{background:'#EDF2F7'}" :default-sort="{prop: 'date', order: 'descending'}" stripe style="width: 100%;">
					<el-table-column type="index" label=" " width="30"></el-table-column>
					<el-table-column prop="ref_date" label="日期" sortable></el-table-column>
					<el-table-column prop="visit_uv_new" label="新用户数" sortable></el-table-column>
					<el-table-column prop="visit_uv" label="访问人数" sortable></el-table-column>
					<el-table-column prop="visit_pv" label="访问次数" sortable></el-table-column>
					<el-table-column prop="session_cnt" label="打开次数" sortable></el-table-column>
					<el-table-column prop="stay_time_session" label="次均停留时长" sortable></el-table-column>
				</el-table>

			</div>
		</div>
	</div>
</template>

<script>
	import CommonHeader from '@/components/header';
import {chart} from "@/api/index";
	// 引入基本模板
	let echarts = require('echarts/lib/echarts');
	// 引入折线图
	require('echarts/lib/chart/line');
	// 引入提示框和title组件
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')
	require('echarts/lib/component/legend')

	export default {
		name: 'viewData',
		components: {
			CommonHeader
		},
		data() {
			return {
				pickerOptions1: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}],
				},
				tableData: [],
				value1: '',
				value2: '',
				activityInfo:'',
				tabs: ["今天", "昨天", "近七天", "近30天"],
				num: 0,
				tabPosition: 'right',
				value5: [],
				value11: [],
				charts:{
					title: {
						//						text: 'hah'
					},
					tooltip: {
						backgroundColor: 'white',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						},
						textStyle: {
							color: 'black'
						}
					},
					legend: {
						x: 'center',
						y: 'bottom',
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '10%',
						top: '8%',
						containLabel: true,

					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						splitLine: {
							show: false,
						},
						axisLabel: {
							show: true,
							textStyle: {
								color: '#333',
							}
						},
						//设置轴线的属性
						axisLine: {
							lineStyle: {
								color: '#DBDFE6',
								width: 1, //这里是为了突出显示加上的
							}
						},

						data: []
					}],
					yAxis: [{
						type: 'value',
						splitLine: {
							show: true,
							lineStyle: {
								type: 'dashed'
							}
						},
						axisLabel: {
							formatter: '{value}',
							textStyle: {
								color: '#333'
							}
						},
						axisLine: {
							lineStyle: {
								color: '#DBDFE6',
								width: 1, //这里是为了突出显示加上的
							}
						},
					}],
					series: []
				},
				chartsData: {
					yData:[]
				},
                series: []
			}
		},
		//钩子函数相当于onlong
		mounted() {

			this.viewData()
		},
		//方法
		methods: {
			teb_color(index) {
				this.num = index;
			},
			//多选框chengz方法
			chooseData (e) {
				if(this.value5.length === 0) {
				  //数据变空
				  this.charts.series = []
				  this.myChart.setOption(this.charts)
				  //清空画布
				  this.myChart.clear();
				  this.series = []
				}
			},
			//echarts 实例函数
			drawLine() {
				this.myChart = echarts.init(document.getElementById('myChart'))
				//初次加载的数据
	            this.series = this.chartsData.yData.filter(elem => elem.name === this.value5[0])
				this.charts.series = [{
					name: this.series[0].name,
					type: 'line',
					stack: '总量',
					smooth: true,
					color: "#8ec6ad",
					areaStyle: {
						normal: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: '#8ec6ad'
							}, {
								offset: 1,
								color: '#ffe'
							}])
						}
					},
					data: this.series[0].data
				}]
				//绘制图表
				this.myChart.setOption(this.charts)
				},
				//图表
		viewData() {
			var data = {}
			data.box_id = this.$route.query.box_id;
			data.tmp_id = this.$route.query.tmp_id;
			chart(data).then(res => {
				if(res.code == 200) {
					this.activityInfo = res.data.activityInfo;
					this.value5[0]="访问人数";
					this.charts.xAxis[0].data = res.data.activityUser.ref_date;
					this.chartsData.yData[0]={
						name: '访问人数',
                        data: res.data.activityUser.uv,
                        color:'#0F8BD4'
					}
					this.chartsData.yData[1]={
						name: '新用户数',
                        data: res.data.activityUser.uv_new,
                        color:'#1DCCA3'
					}
					this.tableData = res.data.activityUser.userData;
					this.drawLine()
				}
			}).catch(err => {
				console.log(err)
			})
		}
		},//监听
		watch: {
			value5 (newV, oldV) {
                if (newV) {
					this.series = []
					this.myChart.clear();
	               	newV.forEach(item => {
					   this.chartsData.yData.forEach(elem => {
						   if (item === elem.name) {
							   this.series.push(elem)
						   }
					   })
				   })
			    if (newV.length === 0) {

				    this.myChart.clear();
				    this.series = []

			    }else if(newV.length > 0) {
               		this.charts.series = []
               		this.myChart.clear();
               	 	for(let i = 0; i<newV.length; i++){
				        this.charts.series.push({
				            name: this.series[i].name,
				            type: 'line',
				            stack: '总量',
				            smooth: true,
				            color: this.series[i].color,
				            areaStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: this.series[i].color
								}, {
									offset: 1,
									color: '#ffe'
									}])
								}
							},
				            data: this.series[i].data
				       });
				    }
			    }
				this.myChart.setOption(this.charts)
			  }
			}
		}
	}
</script>
<style>
	.viewData_app {
		width: 100%;
		min-height: 100vh;
		background: #F8F8F8;
	}
	.width100{
		width: 100%;
		background: #fff;
	}
	.viewData {
		/* width: 1200px; */
		margin: 20px auto;
		background-color: #fff;
	}
	.conter1200{
		width: 1200px;
		margin: 0 auto;
	}
	.view_nav_box {
		display: flex;
		align-items: center;
		height: 196px;
	}

	.view_nav {
		margin-right: 5%;
		width: 15%;
	}

	.view_nav_top {
		text-align: center;
		font-size: 20px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: rgba(76, 76, 76, 1);
		margin-bottom: 12px;
	}

	.view_nav_bott {
		width: 60px;
		height: 26px;
		font-size: 14px;
		text-align: center;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(92, 145, 255, 1);
		line-height: 26px;
		margin: 0 auto;
		border-radius: 3px;
		border: 1px solid rgba(92, 145, 255, 1);
	}

	ul li {
		list-style-type: none;
	}

	.view_nav_list {
		width: 80%;
		display: flex;
		padding: 0!important;
		align-items: center;
		justify-content: space-between;
	}

	.view_nav_list img {
		width: 130px;
		height: 130px;
		display: none;
	}

	.view_nav_list_num {
		text-align: center;
		font-size: 34px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		margin-bottom: 10px;
	}

	.view_nav_list_text {
		text-align: center;
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(175, 175, 175, 1);
	}

	.viewData_teb_data {
		display: none;
		/* display: flex; */
		align-items: center;
		padding: 24px 0;
		border-bottom: 1px solid #DBDFE6;
	}

	.viewData_teb_data ul {
		display: flex;
		width: 367px;
		height: 30px;
		border: 1px solid #DBDFE6;
		padding: 0;
		margin: 0 10px 0 0;
	}

	.viewData_teb_data ul li {
		width: 102px;
		height: 30px;
		line-height: 30px;
		color: #606266;
		font-size: 14px;
		text-align: center;
		border-right: 1px solid #DBDFE6;
	}

	.viewData_teb_data ul li:last-child {
		border-right: none;
	}

	.viewData .active {
		background: #5C91FF;
		color: #fff!important;
	}

	.viewData_teb_time {
		display: flex;
	}

	.line_box {
		width: 100%;
		height: 303px;
		/* margin-bottom: 30px; */
	}
	.bgEnTime{
		font-size: 14px;
		text-align: center;
		margin-bottom: 30px;
		margin-top: 10px;
		color: rgba(92, 145, 255, 1);
	}

	.chart_box {
		position: relative;
	}

	.chart_box_select {
		position: relative;
		z-index: 999;
		cursor:pointer;
	}
</style>
<style type="text/css">
	.viewData .el-table thead {
	    color: #333;
	}
	.viewData .el-select__tags{
		max-width: 220px!important;
		width: 220px!important;
	}
	.viewData .el-input{
		max-width: 220px!important;
		width: 220px!important;
	}
	.viewData .chart_box_select .el-input__inner {
		border: none;
	}
	.viewData .el-popper[x-placement^=bottom] {
	    margin-top: 0;
	}
	.viewData .el-input__inner {
		height: 34px;
		line-height: 34px;
	}

	.viewData .el-date-editor.el-input,
	.viewData .el-date-editor.el-input__inner {
		width: 140px;
	}

	.viewData .el-input__icon {
		height: 100%;
		width: 25px;
		text-align: center;
		-webkit-transition: all .3s;
		transition: all .3s;
		line-height: 34px;
	}

	.viewData .viewData_teb_time_cen {
		margin: 16px 6px 0 6px;
		width: 9px;
		height: 2px;
		background: #DBDFE6;
	}
</style>
