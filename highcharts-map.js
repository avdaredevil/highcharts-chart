import {PolymerElement, html} from '@polymer/polymer/polymer-element.js'
import 'highcharts/modules/map.js'
import 'highcharts/modules/data.js'
import {HighchartsPolymer} from './highcharts-behavior.js'
import {SharedStyles} from './shared-styles.js';

/**
* @polymer
* @polymerElement
* @memberof Polymer
* @appliesMixin HighchartsPolymer.BaseBehavior
*/
class HighchartsMap extends HighchartsPolymer.BaseBehavior(PolymerElement) {
    static get is() {return "highcharts-map"}
    static get template() {return html`
        ${SharedStyles}
        <div id="Chart" width="100%"></div>
        <slot></slot>
    `}
    static get properties() {return {
        type: {type: String, value: 'line', observer: '_updateType'}
    }}
    ready() {super.ready();this.__createChart("Map")}
}

window.customElements.define(HighchartsMap.is, HighchartsMap);
