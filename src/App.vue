<template>
  <div class="container">
    <MenuDeTopo />
    <InfosBasicas
      :carregando="carregando"
      :casos="{
        confirmados: casosConfirmados,
        emAnalise: casosSuspeitos,
        obitos: obitos,
      }"
      :ultima-atualizacao="ultimaAtualizacao"
      @atualizar="
        atualizandoGraficos = true
        carregaDados
      "
    />
    <div class="graficos">
      <GraficoPizza
        :carregando="carregando || atualizandoGraficos"
        :dados-grafico="{
          confirmados: casosConfirmados,
          emAnalise: casosSuspeitos,
          obitos: obitos,
        }"
      />
    </div>
  </div>
</template>
<script>
import Axios from 'axios'
import GraficoPizza from './components/GraficoPizza'
import MenuDeTopo from './components/MenuDeTopo'
import InfosBasicas from './components/InfosBasicas'

const axios = Axios.create({
  baseURL: 'https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/ce',
})
export default {
  components: {
    GraficoPizza,
    MenuDeTopo,
    InfosBasicas,
  },
  data() {
    return {
      casosConfirmados: 0,
      casosSuspeitos: 0,
      casosNegativos: 0,
      obitos: 0,
      ultimaAtualizacao: new Date(),
      carregando: true,
      erro: false,
      atualizandoGraficos: false,
    }
  },
  created() {
    this.carregaDados()
  },
  methods: {
    solicitaDados() {
      return axios.get().catch((err) => {
        this.carregando = false
        this.erro = err
        alert(err)
      })
    },
    async carregaDados() {
      const { data } = await this.solicitaDados()

      this.obitos = data.deaths
      this.casosSuspeitos = data.suspects
      this.casosConfirmados = data.cases

      this.ultimaAtualizacao = new Date()
      this.atualizandoGraficos = false
      this.carregando = false
    },
  },
}
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Raleway', 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.graficos {
  padding: 20px;
}

@media screen and (max-width: 768px) {
  .graficos {
    width: calc(100vw - 20px);
    padding: 10px;
  }
}
</style>
