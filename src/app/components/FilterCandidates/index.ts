import { Request, Response } from 'express';
import Candidates from '../../repositories/Candidates';

const candidatesMethodsInBd = new Candidates();

const filterCandidates = async (request: Request, response: Response) => {
    const filtersTechnologies: string[] = request.body.filtersTechnologies || [];
    const filtersLocalizations: string[] = request.body.filterLocalizations || [];
    const filtersExperienceYears: number = request.body.filtersExperienceMinNumber || 0;

    if (filtersTechnologies.length === 0) return response.status(406).send('Filtros não informados');

    const candidatesFiltered = await candidatesMethodsInBd.filterCandidates(filtersTechnologies, filtersExperienceYears, filtersLocalizations);

    return response.status(200).send(candidatesFiltered);

}

export = filterCandidates;