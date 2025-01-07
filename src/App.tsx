import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectListPage from './components/ProjectList';
import ProjectDetailPage from './components/ProjectDetail';
import Sidebar from './components/Sidebar';
import DataContextProvider from './provider/SharedProvider';

const App: React.FC = () => {
    return (
       
            <div className='flex flex-col md:flex-row h-full overflow-auto'>
                <DataContextProvider>
                    <Sidebar/>
                    <Router>
                        <Routes>
                            <Route path="/" element={<ProjectListPage />} />
                            <Route path="/:projectId" element={<ProjectDetailPage />} />
                        </Routes>
                    </Router>
                </DataContextProvider>
            </div>
        
    );
};

export default App;

