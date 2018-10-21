import {PolymerElement, html} from '@polymer/polymer/polymer-element.js'
import {HighchartsPolymer} from './highcharts-behavior.js'
import {SharedStyles} from './shared-styles.js';

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
    static get template() {return html`
        ${SharedStyles}
        <div id="Chart" width="100%" on-click="_checkSelected"></div>
        <slot></slot>
    `}
    static get properties() {return {
        type: {type: String, value: 'line', observer: '_updateType'}
    }}
    ready() {super.ready();this.__createChart()}
}

window.customElements.define(HighchartsChart.is, HighchartsChart);
