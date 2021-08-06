import * as async from '@polymer/polymer/lib/utils/async.js'
import 'highcharts/highstock.js'
import 'highcharts/highcharts-more.js'
import 'highcharts/modules/exporting'
import 'highcharts/modules/drilldown'
import 'highcharts/modules/annotations'

// Global options and settings added
Highcharts.setOptions({global: {useUTC: false}})
const _extends = (...a) => Object.assign({}, ...a)

export const HighchartsPolymer = {
    Highcharts,
    /* @polymerMixin */
    BaseBehavior: superClass => {
        const newObj = _ => ({}), newArr = _ => []
        return class extends superClass {
            constructor() {
                super()
                this.__lateBindCallbacks = _extends({}, this.__lateBindCallbacks, {_updateType:1,_loadingUpdate:1})
            }
            static get properties() {return {
                type: {type: String, observer: "_updateType"},
                title: {type: String, value: "", observer: "_titleUpdate"},
                subtitle: {type: String, observer: "_subtitleUpdate"},
                colorByPoint: {type: Boolean, value: false, reflectToAttribute:true, observer: "_cbpUpdate"},
                credits: {type: Boolean, value: false, reflectToAttribute:true, observer: "_creditsUpdate"},
                legend: {type: Boolean, value: false, reflectToAttribute:true, observer: "_legendUpdate"},
                chartOptions: {type: Object, value: newObj, observer: "_chartUpdate"},
                plotOptions: {type: Object, value: newObj, observer: "_plotUpdate"},
                xAxis: {type: Object, value: newObj, observer: "_xAxisUpdate"},
                yAxis: {type: Object, value: newObj, observer: "_yAxisUpdate"},
                xLabel: {type: String, value: "", observer: "_xAxisTitleUpdate"},
                yLabel: {type: String, value: "", observer: "_yAxisTitleUpdate"},
                label: {type: String, value: "", observer: "_labelUpdate"},
                data: {type: Array, value: newArr, observer:"_dataUpdate"},
                export: {type: Boolean, value: false, reflectToAttribute: true, observer: "_exportingUpdate"},
                xZoom: {type: Boolean, value: false, reflectToAttribute: true, observer: "_zoomUpdate"},
                yZoom: {type: Boolean, value: false, reflectToAttribute: true, observer: "_zoomUpdate"},
                loading: {type: Boolean, value: false, observer: "_loadingUpdate", reflectToAttribute:true},
                loadingMessage: {type: String, value: ""},
                renderer: {type: Object, computed: "_getRenderer(_chart.renderer)"},
                //Custom Chart Declarations
                legendOptions: {type: Object, value: newObj, observer: "_legendOptionsUpdate"},
                tooltipOptions: {type: Object, value: newObj, observer: "_tooltipOptionsUpdate"},
                annotations: {type: Object, value: newArr, observer: "_annotationsUpdate"},
                highchartOptions: {type: Object, value: newObj, observer: "_hcUpdate"},
                _chart: {type: Object, readOnly: true},
                __microTaskDelaySetData: {type: Number, value: 25},
            }}
            __createChart(namespace) {
                const getFirstOrAxisConfig = axis => axis instanceof Array
                    ? axis[0] || (axis.push({}), axis[0])
                    : axis
                let tempX_Axis = _extends(this.vsTime ? {type: 'datetime', tickPixelInterval: 150} : {}, getFirstOrAxisConfig(this.xAxis));
                if (this.xAxis instanceof Array) {
                    this.xAxis[0] = tempX_Axis
                } else {
                    this.xAxis = tempX_Axis
                }
                ;(titleConfig => {titleConfig.text = titleConfig.text || this._getAxisLabel('X')})(getFirstOrAxisConfig(this.xAxis).title||{});
                ;(titleConfig => {titleConfig.text = titleConfig.text || this._getAxisLabel('Y')})(getFirstOrAxisConfig(this.yAxis).title||{});
                var Series = this.data.length && this.data[0].data instanceof Array?this.data:[{name: (this.label||this.yLabel||this.xLabel),colorByPoint: this.colorByPoint, data: this.data}];
                var __app = this;
                this._set_chart(new Highcharts[namespace||"Chart"](_extends(true,{},{
                    chart: _extends({
                        renderTo: __app.$.Chart,
                        defaultSeriesType: this.type,
                        animation: Highcharts.svg, // don't animate in old IE
                        marginRight: 10,
                        events: {
                            click: function(e){__app._fire("chart-click",{e: e,chart: this,component:__app})},
                            load: function(e){__app._fire("chart-load",{e: e,chart: this,component:__app})},
                            beforePrint: function(e){__app._fire("before-print",{e: e,chart: this,component:__app})},
                            afterPrint: function(e){__app._fire("after-print",{e: e,chart: this,component:__app})},
                            addSeries: function(e){__app._fire("series-added",{e: e,chart: this,component:__app})},
                            drilldown: function(e){__app._fire("drill-down",{e: e,chart: this,component:__app})},
                            drillup: function(e){__app._fire("drill-up",{e: e,chart: this,component:__app})},
                            drillupall: function(e){__app._fire("drill-up-all",{e: e,chart: this,component:__app})},
                            selection: function(e){__app._fire("selection",{e: e,chart: this,component:__app})},
                            redraw: function(e){__app._fire("redraw",{e: e,chart: this,component:__app})},
                            render: function(e){__app._fire("render",{e: e,chart: this,component:__app})},
                        }
                    },this.xZoom||this.yZoom?{zoomType: (this.xZoom&&"x")+(this.yZoom&&"y")}:{},this.chartOptions),
                    //Properties
                    title: {text: this.title},
                    subtitle: {text: this.subtitle},
                    xAxis: this.xAxis,
                    yAxis: this.yAxis,
                    credits: {enabled: this.credits},
                    plotOptions: _extends({
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {color: (Highcharts.theme||[]).contrastTextColor||'black'},
                            }
                        }
                    }, this.plotOptions),
                    annotations: this.annotations,
                    tooltip: _extends(this.vsTime?{formatter: function(_) {
                        return [
                            `<b>${this.points ? this.points[0].series.name : this.series.name}</b>`,
                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x),
                            Highcharts.numberFormat(this.y, 2),
                        ].join('<br>')
                    }}:{},this.tooltipOptions),
                    legend: _extends({enabled: this.legend},this.legendOptions),
                    exporting: {enabled: this.export},
                    series: Series,
                    drilldown: {series: []}
                },this.highchartOptions)))
                setTimeout(_ => this.resizeChart(), 50)
                setTimeout(_ => this.__lateBinders(), 50)
            }
            setData(x,z) {
                const __app = this, isArr = x instanceof Array
                if (!isArr) {x = _extends({name: (this.label||this.yLabel||this.xLabel),colorByPoint: this.colorByPoint},x)}
                if (x && x.length && x[0].data instanceof Array) {
                    async.microTask.run(_ => {
                        while (__app._chart.series.length) {
                            __app.removeSeries(0,false)
                        }
                        x.forEach(d => __app._chart.addSeries(d))
                    }, __app.__microTaskDelaySetData);
                } else {__app._getSeries(z)[isArr?"setData":"update"](x)}
            }
            addData(x,y,z,drillable) {this.pushData(x,y,z,true,drillable)}
            pushData(x,y,z,append,drillable) {
                if (typeof z=="boolean") {drillable = z;z=0}
                this._getSeries(z).addPoint(drillable?{name:x,y:y,drilldown:true}:[x,y],true,!append)
            }
            addSeries(name,data,colorByPoint,otherOptions) {this._chart.addSeries(_extends({name: name, data: (data||[]), colorByPoint: typeof colorByPoint=="undefined"?this.colorByPoint:colorByPoint},typeof otherOptions == "object"?otherOptions:{}),true)}
            addDrillSeries(point,data,name) {this._chart.addSeriesAsDrilldown(point, {name: name, data: data})}
            removeSeries(z,redraw) {const s = this._getSeries(z);s.remove(redraw);return s}
            updateSeries(k,v,z) {let NewEl = {};if(typeof k=="object"){NewEl = k;z=v||z}else{NewEl[k]=v};this._getSeries(z).update(NewEl)}
            resizeChart() {if(!this._chart){return}this._chart.reflow()}
            resizeChartFixed() {if(!this._chart){return}this._chart.setSize(this.$.Chart.offsetWidth,this.offsetHeight)}
            reRender() {if(!this._chart){return}this._set_chart(new Highcharts.Chart(this._chart.options));this.setData(this.data);this.__lateBinders()}
            downloadAs(name,otherOptions) {if(!this._chart){return}this._chart.exportChart(_extends({filename: name},otherOptions))}
            destroy() {if(!this._chart){return}this._chart.destroy()}
            showLoading(d) {this.loadingMessage=d;this.loading=true}
            zoomOut() {if(!this._chart){return};this._chart.zoomOut()}
            getSeries(z) {return this._getSeries(z)}
            _getSeries(z) {if(!this._chart){return this._returnDummySeries()};z=typeof z != "number"?0:z;const s=this._chart.series;if(!s.length){this._warn("Chart is empty [no series]");return this._returnDummySeries()};if (z<s.length){return s[(z||0)]}else{this._warn("Index z out of bounds");return this._returnDummySeries()}}
            _dataUpdate(d) {this.setData(d.slice?d.slice(0):d)}
            _warn(err,c) {console.warn("%c[highcharts-chart"+(c?"::"+c:'')+"]","font-weight:bold;background-color:yellow",err)}
            _creditsUpdate(c) {if(!this._chart){return};this._chart.update({credits: {enabled: c}})}
            _legendUpdate(s) {if(!this._chart){return};this._chart.legend.update({enabled: s})}
            _legendOptionsUpdate(o) {if(!this._chart){return};this._chart.legend.update(o)}
            _tooltipOptionsUpdate(o) {if(!this._chart){return};this._chart.tooltip.update(o)}
            _annotationsUpdate(o) {if(!this._chart){return};this._chart.annotations.update(o)}
            _plotUpdate(o) {if(!this._chart){return};this._chart.update({plotOptions: o})}
            _chartUpdate(o) {if(!this._chart){return};Object.keys(o||{}).length && this._warn("Not doing what you wanted, maybe you meant plotOptions?","chartOptions");this._chart.update({chart: o})}
            _exportingUpdate(x) {if(!this._chart){return};this._chart.update({exporting: {enabled: x}})}
            _updateType() {if(!this.type){return};this.updateSeries("type",this.type)}
            _cbpUpdate() {this.updateSeries("colorByPoint",this.colorByPoint)}
            _xAxisUpdate() {if(!this._chart){return};this._chart.xAxis[0].update(this.xAxis)}
            _yAxisUpdate() {if(!this._chart){return};this._chart.yAxis[0].update(this.yAxis)}
            _zoomUpdate() {if(!this._chart){return};this._chart.update({chart: {zoomType: ""+(this.xZoom?"x":'')+(this.yZoom?"y":'')}})}
            _xAxisTitleUpdate() {if(!this._chart){return};this._chart.xAxis[0].update({title: {text: this._getAxisLabel('X')}})}
            _yAxisTitleUpdate() {if(!this._chart){return};this._chart.yAxis[0].update({title: {text: this._getAxisLabel('Y')}})}
            _labelUpdate() {if(!this._chart){return};this._xAxisTitleUpdate();this._yAxisTitleUpdate()}
            _titleUpdate() {if(!this._chart){return};this._chart.setTitle({text: this.title})}
            _loadingUpdate() {if(!this._chart){return};this._chart[(this.loading?"show":"hide")+"Loading"](this.loadingMessage)}
            _subtitleUpdate() {if(!this._chart){return};this._chart.setTitle(null,{text: this.subtitle})}
            _hcUpdate(o) {if(!this._chart){return};this._chart.update(o)}
            _getRenderer() {if(!this._chart){return};return this._chart.renderer}
            //Other Bindings
            _getAxisLabel(dim) {let l = dim.toLowerCase(),u = dim.toUpperCase(),lab = this[l+"Label"]||this.label;if(lab==u+"-Axis"){lab=this.label||lab};return lab.trim()}
            _returnDummySeries(){const f=function(){};return {isDummy: true, setData: f, addPoint: f, update: f,remove: f}}
            __lateBinders(){const me = this;Object.keys(this.__lateBindCallbacks||{}).forEach(function(cb){me[cb]()})}
            __addLateBinder(cb){if (!(cb instanceof Array)){cb = [cb]};if(!this.__lateBindCallbacks){this.__lateBindCallbacks={}};const me = this;cb.forEach(function(c){me.__lateBindCallbacks[c]=1})}
            /* Need to define a local fire method here as it is not present in Polymer 2 */
            _fire(eventName, detail) {this.dispatchEvent(new CustomEvent(eventName, {bubbles: true,composed: true, detail: detail}))}
        }
    },
    /* @polymerMixin */
    ChartBehavior: superClass => {
        return class extends superClass {
            constructor() {super();this.__addLateBinder("_vsTimeUpdate")}
            static get properties() {return {
                vsTime: {type: Boolean, value: false, reflectToAttribute: true, observer: "_vsTimeUpdate"},
                selected: {type: Boolean, value: false, readOnly: true, notify: true, reflectToAttribute: true},
                selectedPoints: {type: Array, readOnly: true, notify: true},
            }}

            _vsTimeUpdate(a) {if(!this._chart || typeof a == "undefined"){return};this.destroy();this.ready()}
            _checkSelected() {if(!this._chart){return};var points = this._chart.getSelectedPoints();this._setSelected(!!points.length);this._setSelectedPoints(points)}
        }
    }
}
