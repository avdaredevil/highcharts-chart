import {PolymerElement, html} from '@polymer/polymer/polymer-element.js'
import 'highcharts/modules/map.js'
import 'highcharts/modules/data.js'
import {HighchartsPolymer} from './highcharts-behavior.js'

/**
* @polymer
* @polymerElement
* @memberof Polymer
* @appliesMixin HighchartsPolymer.BaseBehavior
*/
class HighchartsMap extends HighchartsPolymer.BaseBehavior(PolymerElement) {
    static get is() {return "highcharts-map"}
    static get template() {return html`
        <style>
            :host {width: 100%;display: inline-block;min-height: var(--highcharts-min-height, 26em)}
            :host[height-responsive] {min-height: initial}
            :host[height-responsive] #Chart {height: 100%}
            #Chart {@apply --highcharts-container}
        </style>
        <div id="Chart" width="100%"></div>
        <slot></slot>
    `}
    static get properties() {return {
        type: {type: String, value: 'line', observer: '_updateType'}
    }}
    ready() {super.ready();this.__createChart("Map")}
}

window.customElements.define(HighchartsMap.is, HighchartsMap);
