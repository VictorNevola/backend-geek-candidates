import request from 'supertest';
import { server } from '../src/config/server';


describe('Teste para a rota de listar todos os candidatos e trabalhos', () => {

    test('Acessa a rota da / para verificar se o servidor esta ok', async () => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
    });

    test('acessa a rota /api/listAll e espera um objeto contendo as propriedades "candidates" e jobs":', async () => {
        const response = await request(server).get('/api/listAll');
        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('candidates');
        expect(response.body).toHaveProperty('jobs');
    });

    test('Vefirica se o objeto candidates existe as propiedades e seus respectivos tipos / id: number, city: string, experience: string, technologies: [{name: string, is_main_tech: string}]:', async () => {
        const response = await request(server).get('/api/listAll');
        expect(response.status).toEqual(200);

        expect(response.body).toHaveProperty('candidates', expect.arrayContaining([
            expect.objectContaining({
                'id': expect.any(Number),
                "city": expect.any(String),
                "experience": expect.any(String),
                "technologies": expect.arrayContaining([
                    expect.objectContaining({
                        "name": expect.any(String),
                        "is_main_tech": expect.any(Boolean)
                    })
                ])
            })
        ]));
    });

    test('Vefirica se o objeto jobs existe as propiedades e seus respectivos tipos / id: number, city: string, experience: string, technologies: [null]:', async () => {
        const response = await request(server).get('/api/listAll');
        expect(response.status).toEqual(200);

        expect(response.body).toHaveProperty('jobs', expect.arrayContaining([
            expect.objectContaining({
                'id': expect.any(Number),
                "city": expect.any(String),
                "experience": expect.any(String),
                "technologies": expect.arrayContaining([
                    null
                ])
            })
        ]));
    });

});

describe('Teste para a rota de filtrar todos os candidatos de acordo com os filtros contidos no body', () => {

    test('Faz um post para rota /api/filterCandidates e verificar se retona um array com 5 objetos', async () => {
        const response = await request(server).post('/api/filterCandidates').send(
            {
                "filtersTechnologies": [{"name": "React", "is_main_tech": true}, {"name": "Node.js", "is_main_tech": false}],
                "filtersExperienceYears": ["3-4 years", "2-3 years"]
            }
        );
        expect(response.status).toEqual(200);
        expect(response.body).toHaveLength(5);
    });

    test('Verifica se retorna array contendo as propriedade do candidato', async () => {
        const response = await request(server).post('/api/filterCandidates').send(
            {
                "filtersTechnologies": [{"name": "React", "is_main_tech": true}, {"name": "Node.js", "is_main_tech": false}],
                "filtersExperienceYears": ["3-4 years", "2-3 years"]
            }
        );
        expect(response.status).toEqual(200);

        expect(response.body).toEqual(
            expect.arrayContaining([expect.objectContaining({
                'id': expect.any(Number),
                "city": expect.any(String),
                "experience": expect.any(String),
                "technologies": expect.arrayContaining([
                    expect.objectContaining({
                        "name": expect.any(String),
                        "is_main_tech": expect.any(Boolean)
                    })
                ])
            })])
        );
    });

});

describe('Teste para a rota de capturar todas as tecnologias e experiencias disponiveis', () => {

    test('Faz um get para a rota /api/filtersAvailables e verifica se retorna um array de objetos e verificar se existe as propriedade technologics e experiences', async () => {
        const response = await request(server).get('/api/filtersAvailables');
        expect(response.status).toEqual(200);

        expect(response.body).toEqual(expect.objectContaining({
            'technologics': expect.arrayContaining([
                expect.objectContaining({
                    "count": expect.any(Number),
                    "name": expect.any(String)
                })
            ]),
            'experiences': expect.arrayContaining([
                expect.objectContaining({
                    "count": expect.any(Number),
                    "name": expect.any(String)
                })
            ])
        }));
    });

});