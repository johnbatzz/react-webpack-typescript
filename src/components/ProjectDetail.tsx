'use client'
import * as React from 'react';
import { Box, Typography, Button, FormControl, OutlinedInput, useTheme, useMediaQuery } from '@mui/material';
import { DataContext } from '../provider/SharedProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { fetchProject, update } from '../api.service';

const ProjectDetail: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { project, updateProject} = React.useContext(DataContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateProject({ ...project, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        update(project);
        navigate('/');
    };

    const handleDateChange = (date: any, name: string) => {
        updateProject({ ...project, [name]: date.$d });
    }

    React.useEffect(() => {
        if (id) {
            fetchProject(id).then(res => {
                updateProject(res);
            })
        }
    }, [id])

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>
                Project Detail
            </Typography>
            <form onSubmit={handleSubmit} className='w-full'>
                <div className='flex md:grid md:grid-cols-[150px_1fr] gap-4 '>
                    <label className='text-end'>Project ID</label>
                    <div className='pl-[8px]'>{project.id}</div>
                </div>
                <div className='md:grid md:grid-cols-[150px_1fr] gap-4 '>
                    <label className='text-end'>Project Name</label>
                    <div className='text-start'>
                        <FormControl sx={{ m: 1, width: isMobile ? '35ch' : '25ch' }} variant="outlined">
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                                value={project.name}
                                onChange={handleInputChange}
                                name='name'
                            />
                        </FormControl>
                    </div>
                </div>
                <div className='md:grid md:grid-cols-[150px_1fr] gap-4 '>
                    <label className='pt-5 text-end'>Description</label>
                    <div className='text-start'>
                        <FormControl sx={{ m: 1, width: isMobile ? '35ch' : '50ch' }} variant="outlined">
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                                multiline
                                value={project.description}
                                onChange={handleInputChange}
                                name='description'
                            />
                        </FormControl>
                    </div>
                </div>
                <div className='md:grid md:grid-cols-[150px_1fr] gap-4 '>
                    <label className='pt-5 text-end'>Start Date</label>
                    <div className='text-start p-[8px]'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker  
                                    defaultValue={dayjs(project.startDate)} 
                                    name='startDate' 
                                    onChange={(e) => handleDateChange(e, 'startDate')}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>

                <div className='md:grid md:grid-cols-[150px_1fr] gap-4 '>
                    <label className='pt-5 text-end'>End Date</label>
                    <div className='text-start p-[8px]'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker 
                                    defaultValue={dayjs(project.endDate)} 
                                    name='endDate' 
                                    onChange={(e) => handleDateChange(e, 'endDate')}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>

                <div className='md:grid md:grid-cols-[150px_1fr] gap-4 '>
                    <label className='text-end'>Project Manager</label>
                    <div className='text-start'>
                        <FormControl sx={{ m: 1, width: isMobile? '35ch' : '25ch' }} variant="outlined">
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                                value={project.manager}
                                onChange={handleInputChange}
                                name='manager'
                            />
                        </FormControl>
                    </div>
                </div>
                
                {/* Add other fields similarly */}
                <div className='md:grid md:grid-cols-[150px_1fr] gap-4 '>
                    <div></div>
                    <div className='ml-[8px]'>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            className='w-full md:w-fit'
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </form>
        </Box>
    );
};

export default ProjectDetail;
