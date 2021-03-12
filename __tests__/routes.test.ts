import request from 'supertest';
import { server } from '../src/config/server';


describe('Teste para a rota de listar todos os candidatos e filtros', () => {

    test('Acessa a rota da / para verificar se o servidor esta ok', async () => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
    });

    test('Acessa a rota /api/listAll e espera um array de objetos contendo as propiedades e seus respectivos tipos / id: number, city: string, experience: string, technologies: [{name: string, is_main_tech: string}]:', async () => {
        const response = await request(server).get('/api/listAll');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(expect.arrayContaining([
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
        ]))
    });

    test('Acessa a rota /api/filtersAvailables e espera um objeto contendo as propriedade technologies / experiences / localizations', async () => {
        const response = await request(server).get('/api/filtersAvailables');
        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('technologies');
        expect(response.body).toHaveProperty('experiences');
        expect(response.body).toHaveProperty('localizations');
    });

    test('Teste para a rota de filtrar todos os candidatos de acordo com os filtros contidos no body e verificar se retorna 5 objetos com as propriedades dos candidatos', async () =>{
        const response = await request(server).post('/api/filterCandidates').send(
            {
                "filtersTechnologies": ["React", "JavaScript"],
                "filtersExperienceYears": ["3-4 years", "2-3 years"],
                "filterLocalizations": ["Fortaleza - CE", "São Paulo - SP", "São José - SC"]
            }
        );

        expect(response.status).toEqual(200);
        expect(response.body).toHaveLength(5);
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