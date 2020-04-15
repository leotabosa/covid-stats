# covid

Estatísticas epidemiológicas do Ceará.

## Ambiente de desenvolvimento

O projeto trabalha e depende de algumas ferramentas para rodar. Entre elas podemos citar:

- Git;
- Node.js
- Yarn

## Instalando Git

Git é um **controle de versão distribuído** e um **sistema de gerenciamento de código fonte** com enfase em velocidade. Inicialmente ele foi desenhado e desenvolvido por Linus Torvalds para o desenvolvimento do kernel do Linux, desde então ele tem se popularizado no mundo opensource e é utilizado em milhares de projetos.

Para instalar o Git no Windows, pode se baixar o Git, opcionalmente o Git Bash, terminal do Git.

### Configurando sua identidade no Git

A primeira coisa a se fazer logo após a instalação do Git é configurar seu **nome de usuário** e **endereço de e-mail** do GitHub. Isto é importante pois cada commit no Git usa esta informação e ela é imutável a partir daí.

Se você não fornecer estas informações, o Git utilizará as informações locais da sua máquina - o que normalmente não é o que você quer.

Execute os comandos abaixo para configurar seu usuário e e-mail:

```SHELL
git config --global user.name "Your Name Here"
git config --global user.email "your_email@example.com"
```

### Gerando sua SSH Key

Para se conectar à um servidor Git de forma segura você precisa gerar uma SSH Key (chave pública e privada). Esta chave deverá ser registrada no servidor Git para que seja possível ter acesso aos repositórios dos projetos.

- ATENÇÃO: Caso você já possua uma SSH Key configurada, você não precisa regera-la, mas somente registra-la no servidor Git.

Para registrar sua chave você precisa executar os comandos abaixo

```SHELL
ssh-keygen -t rsa -C "your_email@example.com"
```

- Tecle `<ENTER>` para todas as perguntas do comando acima - são 3 perguntas.

Mais informações sobre como gerar SSH Keys? Veja em ["Generating SSH Keys"](https://help.github.com/articles/generating-ssh-keys).

Caso precise de mais detalhes sobre o Git, como utiliza-lo e seus comandos básicos, por favor, leia este [guia prático e sem complicação](http://rogerdudler.github.io/git-guide/index.pt_BR.html).

Caso tenha 3h sobrando no seu dia, você pode assistir o [screencast gratuito do AkitaOnRails](http://blip.tv/akitaonrails/screencast-come-ando-com-git-6074964).

**ATENÇÃO**: Após gerar sua chave pública e privada, guarde-a em um lugar seguro para uso posterior - ela funciona como seu CPF no mundo unix. Aconselhamos guarda-la nas nuvens, como Dropbox, por exemplo.

### Configurando o projeto

Para configurar o projeto e iniciar o devServer siga os passos:

- Clone o projeto do Git

  ```SHELL
  git clone git@github.com:leotabosa/covid
  ```

- Entre na pasta raiz do projeto e instale as dependências.

```SHELL
  yarn ou npm install
```

- Rode o projeto pelo terminal.

```SHELL
  yarn dev
```
