import { candidates } from '../../../typings/general';
import { FilterTechModelSchema, FilterExpeModelSchema, FilterLocaModelSchema } from '../../models/Filters';


export default class Filters {

    async createAllFiltersTechnologies(candidates: [candidates]): Promise<{ count: number, name: string }[]> {

        const filtersTechnologies: { count: number, name: string }[] = []

        await Promise.all(
            candidates.map(candidate => {
    
                candidate.technologies.some(technologic => {
    
                    const existInArray = filtersTechnologies.find(technologicInArray => technologicInArray.name === technologic.name)
    
                    if (existInArray) {
                        return existInArray.count += 1;
                    }
    
                    filtersTechnologies.push({
                        count: 1,
                        name: technologic.name
                    });
    
                });
    
            })
        );

        return FilterTechModelSchema.insertMany(filtersTechnologies, { ordered: false })
            .then(data => data)
            .catch(error => error)

    }

    async createAllFiltersExperiences(candidates: [candidates]): Promise<{ count: number, name: string }[]> {
        const filtersExperiences: { count: number, name: string }[] = [];

        await Promise.all(
            candidates.map(candidate => {
                const existInArray = filtersExperiences.find(experience => experience.name === candidate.experience);
                if (existInArray) return existInArray.count += 1
                return filtersExperiences.push({ count: 1, name: candidate.experience })
            })    
        );

        return FilterExpeModelSchema.insertMany(filtersExperiences, { ordered: false })
            .then(data => data)
            .catch(error => error)
    }

    async createAllFiltersLocalizations(candidates: [candidates]): Promise<{ count: number, name: string }[]> {

        const filtersLocalization: { count: number, name: string }[] = [];

        await Promise.all(
            candidates.map(candidate => {
                if (candidate.city) {
                    const existInArray = filtersLocalization.find(location => location.name === candidate.city);
                    if (existInArray) return existInArray.count += 1
                    return filtersLocalization.push({ count: 1, name: candidate.city })
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