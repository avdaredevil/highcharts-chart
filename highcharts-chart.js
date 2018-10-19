import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import { HighchartsPolymer } from './highcharts-behavior.js';

/**
* @polymer
* @polymerElement
* @memberof Polymer
* @polymerMixin
* @appliesMixin HighchartsPolymer.ChartBehavior
* @appliesMixin HighchartsPolymer.BaseBehavior
*/
class HighchartsChart extends HighchartsPolymer.ChartBehavior(HighchartsPolymer.BaseBehavior(PolymerElement)) {
	static get is() {return "highcharts-chart"}
	static get template() {
		return html`
	<style>
	:host {width: 100%;display: inline-block;min-height: var(--highcharts-min-height, 26em)}
	:host[height-responsive] {min-height: initial}
	:host[height-responsive] #Chart {height: 100%}
	#Chart {@apply --highcharts-container}
	</style><div id="Chart" width="100%" on-click="_checkSelected"></div>
		`
	}
	static get properties() {
		return {
		   type: {type: String, value: 'line', observer: '_updateType'}
		}
	}
	ready() {super.ready();this.__createChart()}
}

window.customElements.define(HighchartsChart.is, HighchartsChart);