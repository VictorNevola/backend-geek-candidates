import request from 'supertest';
import { server } from '../src/config/server';


describe('Teste para a rota de listar todos os candidatos e trabalhos', () => {

    test('Acessa a rota da / para verificar se o servidor esta ok', async () => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
    });

    test('acessa a rota _v/api/listAll e espera um objeto contendo as propriedades "candidates" e jobs":', async () => {
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