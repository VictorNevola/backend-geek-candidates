import { candidates } from '../../../typings/general';
import { FilterTechModelSchema, FilterExpeModelSchema, FilterLocaModelSchema } from '../../models/Filters';


export default class Filters {

    async createAllFiltersTechnologies(candidates: [candidates]): Promise<{ name: string }[]> {

        const filtersTechnologies: { name: string }[] = []

        await Promise.all(
            candidates.map(candidate => {
    
                candidate.technologies.some(technologic => {
    
                    filtersTechnologies.push({
                        name: technologic.name
                    });
    
                });
    
            })
        );

        return FilterTechModelSchema.insertMany(filtersTechnologies, { ordered: false })
            .then(data => data)
            .catch(error => error)

    }

    async createAllFiltersExperiences(candidates: [candidates]): Promise<{ name: string }[]> {
        const filtersExperiences: { name: string }[] = [];

        await Promise.all(
            candidates.map(candidate => {
                return filtersExperiences.push({ name: candidate.experience })
            })    
        );

        return FilterExpeModelSchema.insertMany(filtersExperiences, { ordered: false })
            .then(data => data)
            .catch(error => error)
    }

    async createAllFiltersLocalizations(candidates: [candidates]): Promise<{ name: string }[]> {

        const filtersLocalization: { name: string }[] = [];

        await Promise.all(
            candidates.map(candidate => {
                if (candidate.city) {
                    return filtersLocalization.push({ name: candidate.city })
                }
            })
        );

        return FilterLocaModelSchema.insertMany(filtersLocalization, { ordered: false })
            .then(data => data)
            .catch(error => error)
    }

    async listFiltersTechnologies(){
        return FilterTechModelSchema.find({}).sort({name: 1}).then(data => data).catch(error => error);
    }

    async listFiltersExperiences(){
        return FilterExpeModelSchema.find({}).then(data => {
            data.sort((a,b) => a.name.localeCompare(String(b.name), undefined, {
                numeric: true,
                sensitivity: 'base'
            }));
            return data;
        }).catch(error => error);
    }

    async listFiltersLocalizations(){
        return FilterLocaModelSchema.find({}).sort({name: 1}).then(data => data).catch(error => error);
    }

    async listAllFiltersAvailables() {
        const filtersTechnologies = await this.listFiltersTechnologies();
        const filtersExperiences = await this.listFiltersExperiences();
        const filterLocalizations = await this.listFiltersLocalizations();

        return {
            technologies: filtersTechnologies,
            experiences: filtersExperiences,
            localizations: filterLocalizations
        }
    }
}