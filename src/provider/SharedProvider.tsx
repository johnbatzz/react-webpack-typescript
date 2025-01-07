import React, { createContext, useState } from "react";
import { Project, Projects } from "../model/project";

interface contextObject {
    project: Project
    data: Projects
    updateData: Function
    updateProject: Function
}
const obj: contextObject = {
    project: {},
    data: [],
    updateData: () => {},
    updateProject: () => {}
}
export const DataContext = createContext(obj);

export default function DataContextProvider({ children }: { children: React.ReactNode }) {
    const [project, setProject] = useState<Project>({});
    const [data, setData] = useState<Projects>([]);
    const updateData = (newData: Projects) => setData(newData);
    const updateProject = (newData: Project) => setProject(newData);

    return (
        <DataContext.Provider value={{ data, updateData, project, updateProject }}>
            {children}
        </DataContext.Provider>
    );
}
