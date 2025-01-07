import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '../api.service';
import { DataContext } from '../provider/SharedProvider';
import { formatDateYMD } from '../helper';
import { Project } from '../model/project';



const ProjectListPage: React.FC = () => {
    const { updateData, updateProject } = React.useContext(DataContext);
    const [rows, setRows] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Project ID', flex: 1  },
        { field: 'name', headerName: 'Project Name', flex: 2 },
        { field: 'startDate', headerName: 'Start Date', flex: 2,
            renderCell: (params: any) => (
                <div className='flex items-center justify-between'>
                    <span>{formatDateYMD(params.row.startDate)}</span>
                </div>

            )
        },
        { field: 'endDate', headerName: 'End Date', flex: 2,
            renderCell: (params: any) => (
                <div className='flex items-center justify-between'>
                    <span>{formatDateYMD(params.row.endDate)}</span>
                </div>
            )
        },
        {
            field: 'manager', headerName: 'Project Manager', flex: 3,
                renderCell: (params: any) => (
                    <div className='flex items-center justify-between'>
                        <span>{params.row.manager}</span>
                        <Button
                            variant="contained"
                            size="small"
                            className='h-[40px] p-2'
                            onClick={() => handleEdit(params.row)}
                        >Edit</Button>
                    </div>
            )
        },
    ];

    const handleEdit = (project: Project) => {
        updateProject(project);
        navigate(`/${project.id}`);
    }
    React.useEffect(() => {
        fetchProjects().then(res => {
            setRows(res);
            setLoading(false);
            updateData(res);
        });
    }, [])
    return (
        <>
            <div className='block md:hidden mt-5'>
                { rows.map((project: Project) => (
                    <div className='p-5 border rounded-md m-2'>
                        <div className='grid grid-cols-[150px_1fr] gap-4 '>
                            <label className='text-end'>Project ID:</label>
                            <div className='pl-[8px]'>{project.id}</div>
                        </div>
                        <div className='grid grid-cols-[150px_1fr] gap-4 '>
                            <label className='text-end'>Project Name:</label>
                            <div className='text-start'>
                               {project.name}
                            </div>
                        </div>
                        <div className='grid grid-cols-[150px_1fr] gap-4 '>
                            <label className='pt-5 text-end'>Start Date:</label>
                            <div className='text-start p-[8px]'>
                                {formatDateYMD(project.startDate || '')}
                            </div>
                        </div>

                        <div className='grid grid-cols-[150px_1fr] gap-4 '>
                            <label className='pt-5 text-end'>End Date:</label>
                            <div className='text-start p-[8px]'>
                                {formatDateYMD(project.endDate || '')}
                            </div>
                        </div>

                        <div className='grid grid-cols-[150px_1fr] gap-4 '>
                            <label className='text-end'>Project Manager:</label>
                            <div className='text-start'>
                                {project.manager}
                            </div>
                        </div>
                        <div className='grid grid-cols-[150px_1fr] gap-4 pt-2'>
                            <label className='text-end'></label>
                            <div className='text-start'>
                                <Button
                                    variant="contained"
                                    size="small"
                                    className='h-[30px] p-2'
                                    onClick={() => handleEdit(project)}
                                >Edit</Button>
                            </div>
                        </div>
                    </div>
                )) }
            </div>
            <div className='hidden md:block w-full'>
                <Box pt={10} height={800} width={'100%'}>
                    <DataGrid 
                        className='overflow-auto'
                        rows={rows} 
                        columns={columns} 
                        pageSizeOptions={[6]} 
                        loading={loading} 
                    />
                </Box>
            </div>
        </>
    );
};

export default ProjectListPage;
