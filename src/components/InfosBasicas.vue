<script>
import formataDataRelativa from '../utils/formata-data-relativa'
export default {
  props: {
    casos: {
      type: Object,
      default: () => {},
    },
    carregando: {
      type: Boolean,
      default: false,
    },
    ultimaAtualizacao: {
      type: [Date],
      default: () => new Date(),
    },
  },
  data() {
    return {
      atualizadoEm: formataDataRelativa(this.ultimaAtualizacao),
      intervalo: '',
    }
  },
  computed: {
    permiteAtualizar() {
      const ultimaAtualizacao = Number(this.atualizadoEm.split(' ').shift())
      // Atualização automática quando chega aos 10 minutos
      if (ultimaAtualizacao > 0) {
        this.$emit('atualizar')
      }
      return ultimaAtualizacao >= 1
    },
  },
  watch: {
    ultimaAtualizacao(val) {
      // Atualiza data relativa caso o dashboard tenha sido atualizado
      this.atualizadoEm = formataDataRelativa(val)
    },
  },
  mounted() {
    this.atualizaDataRelativa()
  },
  methods: {
    formataDataRelativa,
    atualizaDataRelativa() {
      // Atualiza data relativa a cada minuto
      const atualiza = () =>
        (this.atualizadoEm = formataDataRelativa(this.ultimaAtualizacao))

      this.intervalo = setInterval(() => atualiza(), 60000)
    },
  },
}
</script>

<template>
  <div v-if="!carregando" class="containerInfos">
    <section class="containerCasos">
      <span class="casos">{{ casos.confirmados }} confirmados</span>
      <div class="separador" />
      <span class="casos">{{ casos.emAnalise }} em análise</span>
      <div class="separador" />
      <span class="casos">{{ casos.obitos }} óbitos</span>
    </section>
    <div class="separadorHorizontal" />
    <section class="footerInfos">
      <span class="ultimaAtualizacao"> Atualizado há {{ atualizadoEm }} </span>
    </section>
  </div>
  <div v-else class="containerInfos">
    <section class="containerCasos">
      <div class="loadingRectangle1 skeleton" />
      <div class="loadingRectangle1 skeleton" />
      <div class="loadingRectangle1 skeleton" />
    </section>
    <div class="separadorHorizontal" />
    <section class="footerInfos">
      <div class="loadingRectangle2 skeleton" />
    </section>
  </div>
</template>

<style scoped>
.containerInfos {
  animation: opacityAnimation 1s ease-in;
  width: 100%;
}

.containerCasos {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 150px;
  animation: opacityAnimation 1s ease-in;
}

.separador {
  height: 80%;
  width: 2px;
  background-color: black;
  opacity: 0.1;
}

.casos {
  color: black;
  font-size: 1.5rem;
}

.footerInfos {
  display: flex;
  padding: 10px;
  margin-left: 10px;
  color: black;
  opacity: 0.4;
  user-select: none;
  width: calc(100% - 30px);
}

.separadorHorizontal {
  width: calc(100% - 40px);
  margin-left: 20px;
  height: 2px;
  background-color: black;
  opacity: 0.1;
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
  width: calc(33% - 20px);
  height: 130px;
}

.loadingRectangle2 {
  width: 45ch;
  height: 30px;
  margin: 10px 0 0 0;
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
  .containerCasos {
    flex-direction: column;
  }

  .loadingRectangle1 {
    width: calc(100% - 20px);
    margin-top: 10px;
  }

  .loadingRectangle1:last-child {
    margin-bottom: 10px;
  }

  .loadingRectangle2 {
    width: calc(100% + 10px) !important;
    margin-left: -10px;
  }

  .footerInfos {
    display: flex;
    justify-content: center;
  }

  .separador {
    width: calc(100% - 20px);
    height: 2px;
    background-color: black;
    opacity: 0.1;
  }
}
</style>
