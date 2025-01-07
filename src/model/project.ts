export interface Project {
    id?: string;
    name?: string;
    manager?: string;
    startDate?: string;
    endDate?: string;
    createdAt?: string;
    favorite?: boolean;
    description?: string;
}

export type Projects = Project[];