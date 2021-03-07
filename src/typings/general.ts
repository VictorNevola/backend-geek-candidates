export interface candidates {
    "id": number,
    "city": string,
    "experience": string,
    "technologies": [{
        "name": 'string',
        "is_main_tech": boolean
    }];
}

export interface jobs {
    "id": number,
    "city": string,
    "experience": string,
    "technologies": [null];
}

export interface allCandidatesAndJobs {
    candidates: [candidates],
    jobs: [jobs]
}