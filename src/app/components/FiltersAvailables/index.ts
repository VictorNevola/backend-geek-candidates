import { Request, Response } from 'express';
import Filters from '../../repositories/Filters';

const filtersMethodsInBd = new Filters();
const filtersAvailables = async (request: Request, response: Response) => {
    const listAllFilters = await filtersMethodsInBd.listAllFiltersAvailables();

    return response.status(200).send(listAllFilters);

};

export = filtersAvailables;