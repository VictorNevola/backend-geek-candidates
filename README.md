<h1> Backend geek candidatos </h1>

<p> Esse projeto é uma simples aplicação backend, criado para reforçar conceitos e aprender novas tecnologias. </p>

<p>Link para acessar projeto: <a href="https://backend-geek-candidates.herokuapp.com/" target="_blank"> https://backend-geek-candidates.herokuapp.com/ </a> </p>

Tecnologias utilizadas:

* Nodejs;
* Typescript;
* Express;
* Jest para test (TDD)

Rotas Disponiveis:

* '/' (Metodo GET) => responde somente com um status 200 e uma mensagem "Servidor Rodando";
* '/api/listAll' (Metodo GET) => captura no "banco de dados" todos os jobs disponiveis e candidatos cadastrados na plataforma;
* '/api/filtersAvailables' (Metodo GET) => captura todos os filtros de tecnologias e experiencias disponiveis;
* '/api/filterCandidates' (Metodo POST) => faz um filtro de todos os candidatos conforme filtros passado no body(json), exemplo para filtro: {
                "filtersTechnologies": [{"name": "React", "is_main_tech": true}, {"name": "Node.js", "is_main_tech": false}],
                "filtersExperienceYears": ["3-4 years", "2-3 years"]
            };
            

Para testar Localmente:

* Versão do node utilizada: 14.15.1;
* 1 - Baixe o Codigo;
* 2 - Abra a pasta em seu terminal;
* 3 - rode o comando "yarn install" ou "npm install";
* 4 - Quando finalizar a instalacao das dependecias, rode o comando "yarn dev";
* 5 - O projeto vai rodar um servidor local na porta 5000 - http://localhost:5000/;
* 6 - Para realizar o teste da aplicação, rode o comando "yarn test" sem o servidor de dev esta funcionando;

