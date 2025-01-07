import { Project } from "./model/project";

const API_ENDPOINT = 'https://677b89b920824100c079eac2.mockapi.io/test/api/v1/Project';

export const fetchProjects = async () => {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json =  await response.json();
        return json;
    } catch (error) {
        throw new Error(`Failed to fetch projects: ${error}`);
    }
}

export const fetchProject = async (id: string) => {
    try {
        const response = await fetch(`${API_ENDPOINT}/${id}`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json =  await response.json();
        return json;
    } catch (error) {
        throw new Error(`Failed to fetch projects: ${error}`);
    }
}

export const update = async (project: Project) => {
    try {
        const response = await fetch(`${API_ENDPOINT}/${project.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        body: JSON.stringify(project),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json =  await response.json();
        return json;
    } catch (error) {
        throw new Error(`Failed to update project: ${error}`);
    }
}