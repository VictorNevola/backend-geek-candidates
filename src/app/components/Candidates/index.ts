import fetch from "node-fetch";
import { Request, Response } from 'express';
import { allCandidatesAndJobs } from '../../../typings/general';

export const listAllCandidates = async (request: Request, response: Response) => {
    const allCandidatesAndJobs: [allCandidatesAndJobs] = await fetch('https://geekhunter-recruiting.s3.amazonaws.com/code_challenge.json').then(result => result.json());

    response.status(200).send(allCandidatesAndJobs);
}