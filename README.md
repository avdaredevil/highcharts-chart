# &lt;highcharts-chart&gt; [![npm version](https://badge.fury.io/js/highcharts-chart.svg)](https://badge.fury.io/js/highcharts-chart) [![Bower version](https://badge.fury.io/bo/highcharts-chart.svg)](http://badge.fury.io/bo/highcharts-chart) [![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://beta.webcomponents.org/element/avdaredevil/highcharts-chart)

> Web Component wrapper to the [Highcharts Graphing Library](http://www.highcharts.com/), to create a multitude of graphs/maps (spline, pie, and more) using [Polymer 3.0](http://www.polymer-project.org/3.0/).

## Demo

You can see a [Realtime/Resonsive demo live](http://avdaredevil.github.io/highcharts-chart)! With a Tutorial Icon in the top right.

## Install

Install the component using [npm](https://www.npmjs.com/):

```sh
$ npm install highcharts-chart --save
```

Or [download as ZIP](https://github.com/avdaredevil/highcharts-chart/archive/master.zip).

## Usage

1. Import Web Components' polyfill, on older browsers:

    ```html
    <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
    ```

2. Import Custom Element:

    ```html
    <script type="module" src="node_modules/highcharts-chart/highcharts-chart.js"></script>
        OR
    <script type="module">
        import 'node_modules/highcharts-chart/highcharts-chart.js';
    </script>
        OR
    <script>
        import('node_modules/highcharts-chart/highcharts-chart.js');
    </script>
    ```

3. Start using it!
    <!--
    ```
    <custom-element-demo>
      <template>
        <script type="module" src="highcharts-chart.js"></script>
        <next-code-block></next-code-block>
      </template>
    </custom-element-demo>
    ```
    -->

    ```html
    <highcharts-chart x-zoom type="spline"
                      title="Test-Spline Chart"
                      data='[[0,0],[1,7],[2,1],[3,6],[4,8],[5,6]]'
                      x-label="Iterations" y-label="Awesomeness Index"></highcharts-chart>
    ```

    #### Other Examples
    ```html
    <highcharts-chart type="pie"></highcharts-chart>
    <highcharts-chart type="column"></highcharts-chart>
    <highcharts-map></highcharts-map>
    <highcharts-stock></highcharts-stock>
    ```

## &lt;highcharts-chart&gt;

Provides you a simple interface to interact with the HighCharts API, with extensive Data Binding.
The charting is also responsive.

### Options

Attribute  | Options     | Default              | Description
---        | ---         | ---                  | ---
`type`     | `spline`,`pie`,`column` | `spline` | Pick type of chart
`title`    | *string*    | `Highcharts Chart`   | Title of Chart
`subtitle` | *string*    | `""`                 | Subtitle of Chart
`xAxis`    | *object*    | `{}` OR *`Time based`* | Specifies the configuration for the X-Axis.
`yAxis`    | *object*    | `{}` | Specifies the configuration for the Y-Axis.
`xLabel`   | *string*    | `X-Axis`             | Label for X-Axis
`yLabel`   | *string*    | `Y-Axis`             | Label for Y-Axis
`xZoom`   | *boolean*    | `false`             | Zooming Allowed On X-Axis
`yZoom`   | *boolean*    | `false`             | Zooming Allowed On Y-Axis
`label`    | *string*    | `Label`*`[for non numeric]`* | Alias for both Axis
`data`     | *array*     | `[]` | Data for chart [*data for Series 1* OR *array of series*]
`loading`  | *boolean*     | `false` | Toggle loading overlay on chart
`loadingMessage` | *string* | `Loading...` | Loading Text Display
`selected` | *boolean `[readonly]`*     | `false` | Is any element selected on graph
`selectedPoints` | *array `[readonly]`* | `[]` | Which elements are selected
`vsTime`   | *boolean*     | `false` | Set all options appropriate for a time chart
`chartOptions` | *object*  | `{}` | Override/Add Properties for your type of chart
`export`   | *boolean*     | `false` | Enable exporting of chart
`legend`   | *boolean*     | `false` | Display the legend
`colorByPoint`__\*__ | *boolean* | `false` | Every point treated/colored uniquely
`credits`  | *boolean*     | `false` | Wish to thank/credit HighCharts?
`legendOptions` | *object* | `{}` | Override/Add Options to your legend
`tooltipOptions` | *object* | `{}` | Override/Add Options to your tooltip
`highchartOptions` | *object* | `{}` | Override/Add Options to the chart initalization code [useful for custom charts]
`height-responsive` | *Attribute* | `NA` | Make chart height responsive [*define container height for this to work*]
`renderer` | *object `[readonly]`* | `{}` | Allows direct access to the Highcharts rendering layer in order to draw primitive shapes like circles, rectangles,paths or text directly on a chart, or independent from any chart.
`_chart` | *object `[readonly]`* | `{}` | HighCharts exposed object

**Note:** 
- The __\*__ annotated properties above are not available in the `highcharts-map` element
- If you bind a bunch of series objects to the `data` _property_ instead of data for a _single series_, it will perform series level binding

### Methods

Method       | Parameters           | Description
---          | ---                  | ---
`setData(data,z=0)`  | `Data Array`,`Series Index` | Replaces series data with the passed array
`addData(x,y,z,drill)`  | `x`,`y`,`index`,`drillable?` | Appends to data [*efficient*]
`pushData(x,y,z)` | `x`,`y`,`index` | Shifts and adds to data [*efficient*]
`addSeries(name,data,colorByPoint,otherOptions)` | `String`,`Array`,`boolean`,`{}`  | Adds a new Series to Plot
`addDrillSeries(point,data,name)` | `point`,`Array`,`String`   | Adds a series that is viewable when an Element is clicked into
`getSeries(z=0)` | `index`   | Fetch a series [given by `z`], else return a dummy object
`updateSeries(k,v,z)` | `String`,`Mixed`,`0`   | Modifies an option by Key Value for series [given by `z`]
`updateSeries(options,z)` | `{}`,`0`   | Modifies the options for series [given by `z`]
`removeSeries(z,redraw)` | `index`,`true`  | Removes Series denoted by index [should redraw after remove]
`showLoading(t)`__\*__ | `t [Text]` | Sets `Loading-Message` equal to `t` then turns on loading screen
`resizeChart()` | `none`   | Efficient reflow of the chart to parent [*can be attached to a parent resize*]
`resizeChartFixed()` | `none`   | Fixed Adjustment of chart [*use if chart should not fluctuate over minor size changes*]
`zoomOut()` | `none`   | Zoom out the chart
`reRender()` | `none`   | Will force a complete re-render of the Highchart [*use it when binding is not possible*]
`downloadAs(name,options)` | `chart`,`{}` | Download/Export the chart as a file
`destroy()` | `none`   | Free's up the memory used by the chart [*prevents __memory leaks__*]

**Note:** The __\*__ annotated methods above are not available in the `highcharts-map` element

### Events

Event      | Description             | Payload [*`e.detail`*]
---        | ---                     | ---
`chart-click` | Click event on chart | `e` [*original event*], `chart` [*chart object*], `component` [*self*]
`chart-load` | Fired when chart loaded | `e`, `chart`, `component`
`before-print` | Fired before chart print | `e`, `chart`, `component`
`after-print` | Fired after chart print | `e`, `chart`, `component`
`series-added` | Fired when series added | `e`, `chart`, `component`
`drill-down` | Fired when drill down is triggered | `e`, `chart`, `component`
`drill-up` | Fired when drill up is triggered | `e`, `chart`, `component`
`drill-up-all` | In a chart with multiple drilldown series, this event fires after all the series have been drilled up | `e`, `chart`, `component`
`selection` | Fired when a range of points are selected | `e`, `chart`, `component`
`redraw` | Fires when the chart is redrawn | `e`, `chart`, `component`
`render` | Fires after initial load of the chart, and after each redraw | `e`, `chart`, `component`

### Styling

Mixin       | Description
---         | ---
`--highcharts-min-height` | Min Height for Highcharts-Chart container [default: *26em*]
`--highcharts-container` | The container that directly contains the Chart SVG

## Contributing/Suggestions

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request


## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (_packaged with [Node.js](https://nodejs.org)_) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.


***Note:** Polymer 3 docs and migration done by: @mindon 2018-10-19*

## License

[MIT License](http://avdaredevil.mit-license.org/) © Apoorv Verma

[![LinkedIn](https://cloud.githubusercontent.com/assets/5303018/22671513/a17b9946-ec9c-11e6-8700-5d6b709c4aee.png)](https://www.linkedin.com/in/apoorvverma)

<!--- Was: https://img.shields.io/badge/Linked-In-blue.svg -->
