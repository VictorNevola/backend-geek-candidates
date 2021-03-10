import fetch from "node-fetch";
import { Request, Response } from 'express';
import { allCandidatesAndJobs, candidates } from '../../../typings/general';

const filterCandidates = async (request: Request, response: Response) => {
    const allCandidatesAndJobs: allCandidatesAndJobs = await fetch('https://geekhunter-recruiting.s3.amazonaws.com/code_challenge.json').then(result => result.json());
    const { candidates } = allCandidatesAndJobs;

    const filtersTechnologies: string[] = request.body.filtersTechnologies || [];
    const filtersExperienceYears: string[] = request.body.filtersExperienceYears || [];


    if (filtersTechnologies.length === 0) return response.status(406).send('Filtros não informados');

    if (candidates) {
        //Filtered by technologies
        const candidatesWithTheTechnologiesOfFilterSelected = candidates.filter(candidate => {

            const candidateHasTheTechnology = candidate.technologies.some(technology => {
                return filtersTechnologies.some(filtersTechnologies => filtersTechnologies === technology.name);
            });

            if (candidateHasTheTechnology && candidateHasTheTechnology !== null && candidate !== null) return candidate;

        });

        //Filtered by experience
        const candidateFilteredForExperienceTime = candidatesWithTheTechnologiesOfFilterSelected.filter(candidate => {
            
            const experienceCurrentFilter = filtersExperienceYears.some(experience => experience === candidate.experience);

            if (experienceCurrentFilter) return candidate;

        });

        //Filtered by mainTechnologic
        const filterForMainTechnologic = candidateFilteredForExperienceTime.filter(candidate => {

            const isMainTech = candidate.technologies.some(technologic => {
                return filtersTechnologies.some(filtersTechnologies => filtersTechnologies == technologic.name && technologic.is_main_tech);
            });

            if (isMainTech) return candidate

        });

        const filterFinish = new Set<candidates>();

        //Sort for experience of candidate
        filterForMainTechnologic.sort((candidateA, candidateB) => {
            if (candidateA.experience > candidateB.experience) return -1;
            if (candidateA.experience < candidateB.experience) return 1;
            return 0;
        });

        candidateFilteredForExperienceTime.sort((candidateA, candidateB) => 
        candidateA.experience.localeCompare(candidateB.experience, undefined, {numeric: true, sensitivity: 'base'}));

        //Added in array not duplicated candidate and sorted by experience and main technology
        [...filterForMainTechnologic, ...candidateFilteredForExperienceTime].forEach(candidate => {
            filterFinish.add(candidate)
        });

        console.log('filterFinish', filterFinish)

        return response.status(200).send( Array.from(filterFinish.values()).slice(0, 5) );

    }

    return response.status(500).send("Error interno, tentar novamente mais tarde!")
    //Experience esperada
    //Tecnologias buscadas e se é a principal
}

export = filterCandidates;