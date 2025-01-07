import * as React from 'react';
import { DataContext } from '../provider/SharedProvider';

const Sidebar: React.FC = () => {
    const {data} = React.useContext(DataContext);
    const favorites = data.filter((data) => data.favorite)
    return (
        <div className='flex flex-col gap-2 w-full md:w-[300px] p-[80px_15px_0px] md:h-[100vh] border-r'>
            <h2 className='text-lg font-bold'>Favorite Projects</h2>
            <ul className='list-disc pl-8 leading-6'>
                {
                    favorites.map((data) => (
                        <li key={data.id} className='font-semibold'>{data.name}</li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Sidebar;
