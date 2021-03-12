import fetch from "node-fetch";
import { Request, Response } from 'express';
import Candidates from '../../repositories/Candidates';
import Filters from '../../repositories/Filters';
import { allCandidatesAndJobs } from '../../../typings/general';

const candidatesMethodsInBd = new Candidates();
const filtersMethodsInBd = new Filters();

const attCandidatesAndFiltersBd = async (request: Request, response: Response) => {
    const allCandidatesAndJobs: allCandidatesAndJobs = await fetch('https://geekhunter-recruiting.s3.amazonaws.com/code_challenge.json').then(result => result.json());

    if (allCandidatesAndJobs && allCandidatesAndJobs.candidates) {

        const { candidates } = allCandidatesAndJobs;

        await candidatesMethodsInBd.createAllCandidates(candidates);
        await filtersMethodsInBd.createAllFiltersTechnologies(candidates);
        await filtersMethodsInBd.createAllFiltersExperiences(candidates);
        await filtersMethodsInBd.createAllFiltersLocalizations(candidates);

        return response.status(200).send(`Registros atualizados com sucesso`);

    }

    return response.status(500).send('Error interno, tentar novamente mais tarde.')
}

export = attCandidatesAndFiltersBd;