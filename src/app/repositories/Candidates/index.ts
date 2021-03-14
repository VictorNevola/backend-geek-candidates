import fetch from 'node-fetch';
import { candidates } from '../../../typings/general';
import { CandidateModelSchema } from '../../models/Candidates/';


export default class Candidates {

    async createAllCandidates(candidatesPayload: [candidates]): Promise<[candidates]> {

        const randomUserInfos = await fetch('https://randomuser.me/api/?results=1000').then(result => result.json()).catch(error => error);

        await Promise.all(candidatesPayload.map(async (candidate, index) => {
            const experience = candidate.experience.split('years')[0].split('-');
            const maxExperienceFormated = Number(experience[experience.length - 1].replace('+', ''));
            const minExperienceFormated = Number(experience[0].replace("+", ""));
            const {picture: {medium}} = randomUserInfos.results[index];
            
            candidate.photoUserUrl = medium;
            candidate.maxExperienceNumber = maxExperienceFormated; 
            candidate.minExperienceNumber = minExperienceFormated;

        }));

        return CandidateModelSchema.insertMany(candidatesPayload, { ordered: false })
            .then(result => result)
            .catch(error => error)
    }

    async listAllCandidates(): Promise<[candidates]> {
        return CandidateModelSchema.find({})
            .then(result => result)
            .catch(error => error)
    }

    async filterCandidates(filtersForTechnologic: string[], filterExperiencesMinValue: number, filtersForlocalizations: string[]) {

        const techFilters = filtersForTechnologic.length > 0 ? { "technologies.name": { $in: filtersForTechnologic } } : {};
        const expeFilters = filterExperiencesMinValue ? { maxExperienceNumber: {$gte: filterExperiencesMinValue} } : {};
        const locaFilters = filtersForlocalizations.length > 0 ? { city: { $in: filtersForlocalizations } } : {};

        return CandidateModelSchema.find(
            {
                $and: [techFilters, expeFilters, locaFilters]
            }
        ).sort({ maxExperienceNumber: -1 }).limit(5)
            .then(result => result)
            .catch(error => error)

    }

}