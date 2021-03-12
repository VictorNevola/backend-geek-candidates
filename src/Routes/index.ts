import { Router, Request, Response } from 'express';

import attCandidatesAndFiltersBd from '../app/components/AttBd';
import listAllCandidates from '../app/components/Candidates';
import filterCandidates from '../app/components/FilterCandidates';
import filtersAvailables from '../app/components/FiltersAvailables';

const router = Router();
router.get('/', (request: Request, response: Response) => response.status(200).send('Servidor Rodando'));
router.get('/api/attBdCandidatesAndFilters', attCandidatesAndFiltersBd);
router.get('/api/listAll', listAllCandidates);
router.get('/api/filtersAvailables', filtersAvailables);
router.post('/api/filterCandidates', filterCandidates);

export = router