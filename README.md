<h1> Backend geek candidatos </h1>

<p> Esse projeto é uma simples aplicação backend, criado para reforçar conceitos e aprender novas tecnologias. </p>

<p>Link para acessar projeto: <a href="https://backend-geek-candidates.herokuapp.com/" target="_blank"> https://backend-geek-candidates.herokuapp.com/ </a> </p>

Recursos da aplicação:
* Listar todos os candidatos;
* Listar todos os filtros disponiveis (Tecnologias / Experiencias / Localizacao);
* Filtrar os 5 melhores candidatos com base nos filtros;

Tecnologias utilizadas:

* Nodejs;
* Typescript;
* Express;
* Jest para test (TDD)

Rotas Disponiveis:

* '/' (Metodo GET) => responde somente com um status 200 e uma mensagem "Servidor Rodando";
* '/api/attBdCandidatesAndFilters' (Metodo GET) => atualiza os dados dos candidados no banco de dados com base no endpoint;
* '/api/listAll' (Metodo GET) => captura no "banco de dados" todos os jobs disponiveis os candidatos cadastrados na plataforma;
* '/api/filtersAvailables' (Metodo GET) => captura todos os filtros de tecnologias, experiencias e localizações disponiveis;
* '/api/filterCandidates' (Metodo POST) => faz um filtro dos candidatos conforme filtros passado no body(json), exemplo para filtro: {
                "filtersTechnologies": ["React", "JavaScript"],
                "filtersExperienceYears": ["3-4 years", "2-3 years"],
                "filterLocalizations": ["Fortaleza - CE", "São Paulo - SP", "São José - SC"]
            };
            

Para testar Localmente e necessario ter mongodb Instalado na maquina:

* Versão do node utilizada: 14.15.1;
* 1 - Baixe o Codigo;
* 2 - Abra a pasta em seu terminal;
* 3 - Crie o arquivo .env e coloque a variavel "URL_MONGO=" com a url local do MongoDb;
* 4 - rode o comando "yarn install" ou "npm install";
* 5 - Quando finalizar a instalacao das dependecias, rode o comando "yarn dev";
* 6 - O projeto vai rodar um servidor local na porta 5000 - http://localhost:5000/;
* 7 - Para realizar o teste da aplicação, rode o comando "yarn test" sem o servidor de dev esta funcionando;

