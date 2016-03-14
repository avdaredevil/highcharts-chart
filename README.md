# &lt;highcharts-chart&gt; [![Bower version](https://badge.fury.io/bo/highcharts-chart.svg)](http://badge.fury.io/bo/highcharts-chart)

> Web Component wrapper to the [Highcharts Graphing Library](http://www.highcharts.com/), to create a multitude of graphs/maps (spline, pie, and more) using [Polymer 1.0](http://www.polymer-project.org/1.0/).

## Demo

You can see a [Realtime/Resonsive demo live](http://avdaredevil.github.io/highcharts-chart)! With a Tutorial Icon in the top right.

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install highcharts-chart --save
```

Or [download as ZIP](https://github.com/avdaredevil/highcharts-chart/archive/master.zip).

## Usage

1. Import Web Components' polyfill, on older browsers:

    ```html
    <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="bower_components/highcharts-chart/highcharts-chart.html">
        OR
    <link rel="import" href="bower_components/highcharts-chart/highcharts-map.html">
        OR
    <link rel="import" href="bower_components/highcharts-chart/highcharts-stock.html">
    ```

3. Start using it!

    ```html
    <highcharts-chart type="spline"></highcharts-chart>
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
`legendHorizAlign` | *string*     | `right` | Horizontal Alignment of Legend
`legendVertAlign`  | *string*     | `top`   | Vertical Alignment of Legend
`legendPos`  | *object*     | `{x:-40, y: 80}` | Legend Offset
`legendOptions` | *object* | `{}` | Override/Add Options to your legend
`tooltipOptions` | *object* | `{}` | Override/Add Options to your tooltip
`highchartOptions` | *object* | `{}` | Override/Add Options to the chart initalization code [useful for custom charts]
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
`updateSeries(k,v,z)` | `String`,`Mixed`,`0`   | Modifies an option by Key Value for series [given by `z`]
`updateSeries(options,z)` | `{}`,`0`   | Modifies the options for series [given by `z`]
`removeSeries(z,redraw)` | `index`,`true`  | Removes Series denoted by index [should redraw after remove]
`showLoading(t)`__\*__ | `t [Text]` | Sets `Loading-Message` equal to `t` then turns on loading screen
`resizeChart()` | `none`   | Efficient reflow of the chart to parent [*can be attached to a parent resize*]
`resizeChartFixed()` | `none`   | Fixed Adjustment of chart [*use if chart should not fluctuate over minor size changes*]
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
`drill-selection` | Fired when a range of points are selected | `e`, `chart`, `component`

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

## License

[MIT License](http://avdaredevil.mit-license.org/) © Apoorv Verma
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/avdaredevil/highcharts-chart/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
