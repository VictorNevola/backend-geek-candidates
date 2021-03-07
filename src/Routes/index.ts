import { Router, Request, Response } from 'express';

import listAllCandidates from '../app/components/Candidates';
import filterCandidates from '../app/components/FilterCandidates';

const router = Router();
router.get('/', (request: Request, response: Response) => response.status(200).send('Servidor Rodando'));
router.get('/api/listAll', listAllCandidates);
router.post('/api/filterCandidates', filterCandidates);

export = router