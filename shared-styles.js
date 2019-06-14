// Shared styles of highcharts-chart for polymer 3.0
import {html} from '@polymer/polymer/polymer-element.js';

export const SharedStyles = html`
<style>
    :host {width: 100%;display: inline-block;min-height: var(--highcharts-min-height, 26em)}
    :host[height-responsive] {min-height: initial}
    :host[height-responsive] #Chart {height: 100%}
    #Chart {@apply --highcharts-container}
</style>`;