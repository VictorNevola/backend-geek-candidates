import { Document } from 'mongoose';

export interface FiltersModelTypesDefault extends Document {
    count: Number,
    name: String
}
