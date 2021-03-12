import { candidates } from '../../../typings/general';
import { CandidateModelSchema } from '../../models/Candidates/';


export default class Candidates {

    async createAllCandidates(candidatesPayload: [candidates]): Promise<[candidates]> {
        return CandidateModelSchema.insertMany(candidatesPayload, { ordered: false })
            .then(result => result)
            .catch(error => error)
    }

    async listAllCandidates(): Promise<[candidates]> {
        return CandidateModelSchema.find({})
            .then(result => result)
            .catch(error => error)
    }

    async filterCandidates(filtersForTechnologic: string[], filterForExperiences: string[], filtersForlocalizations: string[]): Promise<[candidates]> {

        const techFilters = filtersForTechnologic.length > 0 ? { "technologies.name": { $in: filtersForTechnologic } } : {};
        const expeFilters = filterForExperiences.length > 0 ? { experience: { $in: filterForExperiences } } : {};
        const locaFilters = filtersForlocalizations.length > 0 ? { city: { $in: filtersForlocalizations } } : {};

        return CandidateModelSchema.find(
            {
                $and: [techFilters, expeFilters, locaFilters]
            }
        ).sort({ experience: -1 }).collation({ locale: "pt", numericOrdering: true }).limit(5)
            .then(result => result)
            .catch(error => error)

    }

}