<template>
  <div class="container"
    >Confirmados -
    {{ carregando ? 'Carregando...' : casosConfirmados.length }} || Registros
    totais - {{ carregando ? 'Carregando...' : dadosNaoFiltrados.length }}

    <GraficoPizza
      :carregando="carregando"
      :dados-grafico="{
        confirmados: casosConfirmados.length,
        emAnalise: casosEmAnalise.length,
      }"
    />
  </div>
</template>
<script>
import Axios from 'axios'
import GraficoPizza from './components/GraficoPizza'

const axios = Axios.create({
  baseURL:
    'https://indicadores.integrasus.saude.ce.gov.br/api/casos-coronavirus',
})
export default {
  components: {
    GraficoPizza,
  },
  data() {
    return {
      casosConfirmados: [],
      casosEmAnalise: [],
      dadosNaoFiltrados: [],
      carregando: true,
      erro: false,
    }
  },
  created() {
    this.carregaDados()
  },
  methods: {
    // get e set iniciais
    solicitaDados() {
      return axios.get().catch((err) => {
        this.carregando = false
        this.erro = err
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

      this.casosEmAnalise = arrayComElementosUnicos.filter((item) => {
        return (
          item.resultadoFinalExame === 'Em Análise' &&
          (item.estadoPaciente === 'CE' || !item.estadoPaciente)
        )
      })

      this.carregando = false
    },
  },
}
</script>

<style scoped>
.wrap {
  height: 100%;
  background-image: linear-gradient(#45f792, #ffffff);
}
</style>
