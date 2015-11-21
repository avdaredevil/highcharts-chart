# &lt;highcharts-chart&gt; [![Bower version](https://badge.fury.io/bo/highcharts-chart.svg)](http://badge.fury.io/bo/highcharts-chart)

> Web Component wrapper to the [Highcharts Graphing Library](http://www.highcharts.com/), to create a multitude of graphs (spline, pie, and more) using [Polymer 1.0](http://www.polymer-project.org/1.0/).

## Demo

[Check it live!](http://avdaredevil.github.io/highcharts-chart)

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
    ```

3. Start using it!

    ```html
    <highcharts-chart type="spline"></highcharts-chart>
    <highcharts-chart type="pie"></highcharts-chart>
    <highcharts-chart type="column"></highcharts-chart>
    ```

## &lt;highcharts-chart&gt;

Provides you a simple interface to interact with the HighCharts API, with Data Binding.
The charting is also responsive.

### Options

Attribute  | Options     | Default              | Description
---        | ---         | ---                  | ---
`type`     | `spline`,`pie`,`column` | `NA`           | Pick type of chart
`title`    | *string*    | `Highcharts Chart`   | Title of Chart
`subtitle` | *string*    | `""`                 | Subtitle of Chart
`showAxes` | *array*     | `['bottom','left']`  | Pick the axes to show.
`xAxis`    | *object*    | `{}` OR *`Time based`* | Specifies the configuration for the X-Axis.
`xLabel`   | *string*    | `X-Axis`             | Label for X-Axis
`yLabel`   | *string*    | `Y-Axis`             | Label for Y-Axis
`label`    | *string*    | `Label`*`[for non numeric]`* | Alias for both Axis
`data`     | *array*     | `[]` | Data for chart
`loading`  | *boolean*     | `false` | Toggle loading overlay on chart
`loadingMessage` | *string* | `Loading...` | Loading Text Display
`selected` | *boolean `[readonly]`*     | `false` | Is any element selected on graph
`selectedPoints` | *array `[readonly]`* | `[]` | Which elements are selected
`vsTime`   | *boolean*     | `false` | Set all options appropriate for a time chart
`chartOptions` | *object*  | `{}` | Override/Add Properties for your type of chart
`export`   | *boolean*     | `false` | Enable exporting of chart
`legend`   | *boolean*     | `false` | Display the legend
`colorByPoint` | *boolean* | `false` | Every point treated/colored uniquely
`credits`  | *boolean*     | `false` | Wish to thank/credit HighCharts?
`legendHorizAlign` | *string*     | `right` | Horizontal Alignment of Legend
`legendVertAlign`  | *string*     | `top`   | Vertical Alignment of Legend
`legendPos`  | *object*     | `{x:-40, y: 80}` | Legend Offset
`legendOptions` | *object* | `{}` | Override/Add Options to your legend
`tooltipOptions` | *object* | `{}` | Override/Add Options to your tooltip
`_chart` | *object `[readonly]`* | `{}` | HighCharts exposed object

### Methods

Method       | Parameters           | Description
---          | ---                  | ---
`setData(data,z=0)`  | `Data Array`,`Series Index` | Replaces series data with the passed array
`addData(x,y,z,drill)`  | `x`,`y`,`index`,`drillable?` | Appends to data [*efficient*]
`pushData(x,y,z)` | `x`,`y`,`index` | Shifts and adds to data [*efficient*]
`addSeries(name,data,colorByPoint)` | `String`,`Array`,`boolean`  | Adds a new Series to Data [*`colorByPoint` treats every point uniquely]
`addDrillSeries(point,data,name)` | `point`,`Array`,`String`   | Adds a series that is viewable when an Element is clicked into
`updateSeries(options,z=0)` | `{}`,`0`   | Modifies the options for series [given by `z`]
`showLoading(t)` | `t [Text]` | Sets `Loading-Message` equal to `t` then turns on loading screen
`resizeChart()` | `none`   | Adjust graph to the size of the parent [*for bi-directional responsive design*]
`destroy()` | `none`   | Free's up the memory used by the chart [*prevents __memory leaks__*]

### Events

Event      | Description             | Payload [*`e.detail`*]
---        | ---                     | ---
`chart-click` | Click event on chart | `e` [*original event*], `chart` [*chart object*]
`chart-load` | Fired when chart loaded | `e`, `chart`
`before-print` | Fired before chart print | `e`, `chart`
`after-print` | Fired after chart print | `e`, `chart`
`series-added` | Fired when series added | `e`, `chart`
`drill-down` | Fired when drill down is triggered | `e`, `chart`
`drill-up` | Fired when drill up is triggered | `e`, `chart`
`drill-selection` | Fired when a range of points are selected | `e`, `chart`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License

[MIT License](http://avdaredevil.mit-license.org/) © Apoorv Verma
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/avdaredevil/highcharts-chart/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
