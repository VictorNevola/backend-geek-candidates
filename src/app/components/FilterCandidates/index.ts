import fetch from "node-fetch";
import { Request, Response } from 'express';
import { allCandidatesAndJobs, candidates } from '../../../typings/general';

const filterCandidates = async (request: Request, response: Response) => {
    const allCandidatesAndJobs: allCandidatesAndJobs = await fetch('https://geekhunter-recruiting.s3.amazonaws.com/code_challenge.json').then(result => result.json());
    const { candidates } = allCandidatesAndJobs;

    const filtersTecnologics: { name: string, is_main_tech: boolean }[] = request.body.filtersTecnologics || [];
    const filtersExperienceYears: string[] = request.body.filtersExperienceYears || [];

    if (filtersTecnologics.length === 0 || filtersExperienceYears.length === 0) return response.status(406).send('Filtros não informados');

    if (candidates) {
        //Filtered by tecnologics
        const candidatesWithTheTecnologiesOfFilterSelected = candidates.filter(candidate => {

            const candidateHasTheTechnology = candidate.technologies.some(technologic => {
                return filtersTecnologics.some(filterTecnologic => filterTecnologic.name === technologic.name);
            });

            if (candidateHasTheTechnology && candidateHasTheTechnology !== null && candidate !== null) return candidate;

        });

        //Filtered by experience
        const candidateFilteredForExperienceTime = candidatesWithTheTecnologiesOfFilterSelected.filter(candidate => {
            
            const experienceCurrentFilter = filtersExperienceYears.some(experience => experience === candidate.experience);

            if (experienceCurrentFilter) return candidate;

        });

        //Filtered by mainTecnologic
        const filterForMainTecnologic = candidateFilteredForExperienceTime.filter(candidate => {

            const isMainTech = candidate.technologies.some(technologic => {
                return filtersTecnologics.some(filterTecnologic => filterTecnologic.name == technologic.name && filterTecnologic.is_main_tech && technologic.is_main_tech);
            });

            if (isMainTech) return candidate

        });

        const filterFinish = new Set<candidates>();

        //Sort for experience of candidate
        filterForMainTecnologic.sort((candidateA, candidateB) => {
            if (candidateA.experience > candidateB.experience) return -1;
            if (candidateA.experience < candidateB.experience) return 1;
            return 0;
        });

        candidateFilteredForExperienceTime.sort((candidateA, candidateB) => {
            if (candidateA.experience > candidateB.experience) return -1;
            if (candidateA.experience < candidateB.experience) return 1;
            return 0;
        });

        //Added in array not duplicated candidate and sorted by experience and main technology
        [...filterForMainTecnologic, ...candidateFilteredForExperienceTime].forEach(candidate => {
            filterFinish.add(candidate)
        });

        return response.status(200).send( Array.from(filterFinish.values()).slice(0, 5) );

    }

    return response.status(500).send("Error interno, tentar novamente mais tarde!")
    //Experience esperada
    //Tecnologias buscadas e se é a principal
}

export = filterCandidates;