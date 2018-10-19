import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {HighchartsPolymer} from './highcharts-behavior.js';

/**
* @polymer
* @polymerElement
* @memberof Polymer
* @appliesMixin HighchartsPolymer.ChartBehavior
* @appliesMixin HighchartsPolymer.BaseBehavior
*/
class HighchartsStock extends HighchartsPolymer.ChartBehavior(HighchartsPolymer.BaseBehavior(PolymerElement)) {
    static get is() {return "highcharts-stock"}
    static get template() {return html`
        <style>
            :host {width: 100%;display: inline-block;min-height: var(--highcharts-min-height, 26em)}
            :host[height-responsive] {min-height: initial}
            :host[height-responsive] #Chart {height: 100%}
            #Chart {@apply --highcharts-container}
        </style>
        <div id="Chart" width="100%" on-click="_checkSelected"></div>
        <slot></slot>
    `}
    static get properties() {return {
        type: {type: String, value: 'line', observer: '_updateType'}
    }}
    ready() {super.ready();this.__createChart('StockChart')}
}

window.customElements.define(HighchartsStock.is, HighchartsStock);
