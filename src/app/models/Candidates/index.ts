import { model, Schema} from 'mongoose';
import { CandidateModelInterface } from './types';

const CandidateSchema: Schema = new Schema({
    id: {type:Number, unique: true},
    city: String,
    experience: String,
    maxExperienceNumber: Number,
    minExperienceNumber: Number,
    photoUserUrl: String,
    technologies: [{
        name: String,
        is_main_tech: Boolean
    }]
});

export const CandidateModelSchema = model<CandidateModelInterface>('Candidate', CandidateSchema);