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
            { value: val.obitos, name: 'Óbitos' },
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
  <div class="wrapper">
    <div v-if="!carregando" class="grafico">
      <div class="tituloGrafico">Taxa de letalidade</div>
      <Grafico :autoresize="true" :options="dados" />
    </div>
    <div v-else class="loadingRectangle1 skeleton"></div>
  </div>
</template>

<style scoped>
.wrapper {
  animation: opacityAnimation 1s ease-in;
}
.grafico {
  text-align: center;
  height: 380px;
  width: calc(25% - 5px);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
}

.tituloGrafico {
  padding-top: 30px;
}

.skeleton {
  border-radius: 6px;
  background-color: #e0e6e9;
  background: linear-gradient(to right, #e0e6e9 2%, #e8edee 5%, #e0e6e9 7%);
  background-size: 2500px;
  animation-name: fullPageAnimate;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  overflow: hidden;
}

.loadingRectangle1 {
  width: calc(25% - 5px);
  margin-top: 10px;
  height: 380px;
}

@keyframes opacityAnimation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fullPageAnimate {
  0% {
    background-position: -600px 0;
  }
  100% {
    background-position: 600px 0;
  }
}

@media screen and (max-width: 768px) {
  .grafico {
    height: 300px;
    width: 100%;
  }

  .loadingRectangle1 {
    width: 100%;
  }
}
</style>

<style scoped>
.echarts {
  margin-top: -30px;
  width: 100% !important;
  height: 100% !important;
}
</style>
