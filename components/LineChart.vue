<script lang="ts">
  import { Line, mixins } from 'vue-chartjs'
  import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
  import { ChartData, ChartOptions } from 'chart.js'

  const { reactiveProp } = mixins

  @Component({
    extends: Line,
    mixins: [reactiveProp]
  })
  class LineChart extends Mixins(Line) {
    @Prop({ default: {} })
    chartData!: ChartData;

    @Prop({ default: {} })
    chartOptions!: ChartOptions;

    @Watch('data')
    onPropertyChanged(): void {
      this.$data._chart.destroy()
      this.renderLineChart()
    }

    mounted(): void {
      this.renderLineChart()
    }

    renderLineChart(): void {
      this.renderChart(this.chartData, this.chartOptions)
    }
  }

  export default LineChart
</script>
