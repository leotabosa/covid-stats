<script>
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'

const Grafico = () => import('vue-echarts')

export default {
  components: {
    Grafico,
  },
  props: {
    dadosGrafico: {
      type: Object,
      default: () => {},
    },
    carregando: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dados: {
        title: {
          text: 'Customized Pie',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc',
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 10],
          },
        },
        series: [],
      },
    }
  },
  watch: {
    dadosGrafico(val) {
      this.dados.series = [
        {
          name: 'Ceará',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [
            { value: val.confirmados, name: 'Confirmados' },
            { value: val.emAnalise, name: 'Em análise' },
          ].sort(function(a, b) {
            return a.value - b.value
          }),
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function(idx) {
            return Math.random() * 200
          },
        },
      ]
    },
  },
}
</script>

<template>
  <Grafico v-if="!carregando" :autoresize="true" :options="dados" />
  <div v-else>Carregando ok</div>
</template>
