import { Request, Response } from 'express';
import Candidates from '../../repositories/Candidates';

const candidatesMethodsInBd = new Candidates();
const listAllCandidates = async (request: Request, response: Response) => {
    const allCandidates = await candidatesMethodsInBd.listAllCandidates();

    response.status(200).send(allCandidates);
}

export = listAllCandidates;