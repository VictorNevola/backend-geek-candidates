import fetch from "node-fetch";
import { Request, Response } from 'express';
import { allCandidatesAndJobs } from '../../../typings/general';

const filtersAvailables = async (request: Request, response: Response) => {
    const allCandidatesAndJobs: allCandidatesAndJobs = await fetch('https://geekhunter-recruiting.s3.amazonaws.com/code_challenge.json').then(result => result.json());
    const filtersTechnologies: {count: number, name: string}[] = [];
    const filtersExperiences:{count: number, name: string}[] = []

    allCandidatesAndJobs.candidates.forEach(candidate => {

        candidate.technologies.some(technologic => {

            const existInArray = filtersTechnologies.find(technologicInArray => technologicInArray.name === technologic.name)

            if(existInArray) {
               return existInArray.count += 1;
            }

            filtersTechnologies.push({
                count: 1,
                name: technologic.name
            });
             
        });

        const experienceExistInArray = filtersExperiences.find(experiencesInArray => experiencesInArray.name === candidate.experience);

        if(experienceExistInArray){
            return experienceExistInArray.count += 1;
        };

        filtersExperiences.push({
            count: 1,
            name: candidate.experience
        });

    });

    
    filtersExperiences.sort((a,b) => a.name.localeCompare(b.name, undefined, {
        numeric: true,
        sensitivity: 'base'
    }));

    filtersTechnologies.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return - 1;
        return 0;
    });
    
    const result = {
        technologics: filtersTechnologies,
        experiences: filtersExperiences
    };

    return response.status(200).send(result);

};

export = filtersAvailables;