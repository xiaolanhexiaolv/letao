$(function(){

 var echarts_left = echarts.init(document.querySelector('.echarts_left'));

        // 指定图表的配置项和数据
        var option1 = {
            // 大标题
            title: {
                text: '2018年注册人数'
            },
            // 提示框组件
            tooltip: {},
            legend: {
                data:['人数','销量']
            },
            // X轴
            xAxis: {
                data: ["1月","2月","3月","4月","5月","6月"]
            },
            // Y轴
            yAxis: {},
            series: [{
                name: '人数',
                type: 'bar', //表示柱状图
                data: [70, 190, 87, 300, 298, 220]
            },{
                 name: '销量',
                type: 'bar',
                data: [30, 80, 120, 360, 50, 440]

            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        echarts_left.setOption(option1);

        // 右侧饼图
 var echarts_right = echarts.init(document.querySelector('.echarts_right'));

        var option2 = {
        title : {
        text: '热门品牌销售',
        subtext: '2018年11月',
        x:'center'
        },
        tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','Adidas','鸿星尔克','特步','乔丹']
        },
        series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'Adidas'},
                {value:234, name:'鸿星尔克'},
                {value:135, name:'特步'},
                {value:1548, name:'乔丹'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 20,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
        ]
    };
    echarts_right.setOption(option2);


})