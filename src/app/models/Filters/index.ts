import { model, Schema } from 'mongoose';
import { FiltersModelTypesDefault } from './types';

const FiltersTechnologiesSchema: Schema = new Schema({
    name: { type: String, unique: true }

});

const FiltersExperiencesSchema: Schema = new Schema({
    name: { type: String, unique: true }
});

const FiltersLocalizationsSchema: Schema = new Schema({
    name: { type: String, unique: true }
});

export const FilterTechModelSchema = model<FiltersModelTypesDefault>('Filters_Technologies', FiltersTechnologiesSchema);
export const FilterExpeModelSchema = model<FiltersModelTypesDefault>('Filters_Experiences', FiltersExperiencesSchema);
export const FilterLocaModelSchema = model<FiltersModelTypesDefault>('Filters_Localizations', FiltersLocalizationsSchema);