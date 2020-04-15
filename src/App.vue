<template>
  <div class="container">
    <MenuDeTopo />
    <InfosBasicas
      :carregando="carregando"
      :casos="{
        negativos: casosNegativos.length,
        confirmados: casosConfirmados.length,
        emAnalise: casosEmAnalise.length,
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
          confirmados: casosConfirmados.length,
          emAnalise: casosEmAnalise.length,
          obitos: obitos.length,
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
  baseURL:
    'https://indicadores.integrasus.saude.ce.gov.br/api/casos-coronavirus',
})
export default {
  components: {
    GraficoPizza,
    MenuDeTopo,
    InfosBasicas,
  },
  data() {
    return {
      casosConfirmados: [],
      casosEmAnalise: [],
      casosNegativos: [],
      obitos: [],
      dadosNaoFiltrados: [],
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

      // Filtra codigoPaciente duplicados
      const arrayComElementosUnicos = data.filter((item, i) => {
        const itemParaComparar = data.find(
          (obj) => obj.codigoPaciente === item.codigoPaciente
        )

        return data.indexOf(itemParaComparar) === i
      })

      this.dadosNaoFiltrados = arrayComElementosUnicos

      // Filtra para casos confirmados
      this.casosConfirmados = arrayComElementosUnicos.filter((item) => {
        return (
          item.resultadoFinalExame === 'Positivo' &&
          (item.estadoPaciente === 'CE' || !item.estadoPaciente)
        )
      })

      // Filtra para casos em análise
      this.casosEmAnalise = arrayComElementosUnicos.filter((item) => {
        return (
          item.resultadoFinalExame === 'Em Análise' &&
          (item.estadoPaciente === 'CE' || !item.estadoPaciente)
        )
      })

      this.casosNegativos = arrayComElementosUnicos.filter((item) => {
        return (
          item.resultadoFinalExame === 'Negativo' &&
          (item.estadoPaciente === 'CE' || !item.estadoPaciente)
        )
      })

      this.obitos = arrayComElementosUnicos.filter((item) => {
        return (
          item.obitoConfirmado &&
          (item.estadoPaciente === 'CE' || !item.estadoPaciente)
        )
      })

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
