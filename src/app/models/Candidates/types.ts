import { Document } from 'mongoose';


export interface CandidateModelInterface extends Document {
    id: Number,
    city: String,
    experience: String,
    technologies: [{
        name: String,
        is_main_tech: Boolean
    }]
}