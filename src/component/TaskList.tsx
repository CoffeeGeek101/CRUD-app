import { Search } from '@mui/icons-material'
import { Chip, InputAdornment, TextField, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'
import '../index.css'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { deleteTask, toggleStatus } from '../redux/TaskSlice';
import { UpdateTask } from './UpdateTask';
import PriorityQueue from 'ts-priority-queue';
import { InitialPage } from './InitialPage'

export const TaskList = () => {

    // essential states and component event listeners---------------------

    const { task } = useAppSelector((state) => state);

    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);

    const [updatingTask, setUpdatingTask] = useState<number | null>(null);

    const handleOpen = (taskId: number, event: React.MouseEvent<HTMLDivElement>) => {
        const ignoredChildren = ['task-status', 'delete-task', 'MuiChip-label'];
        if (ignoredChildren.some(selector => event.target instanceof Element && event.target.classList.contains(selector))) {
            return;
        }
        setUpdatingTask(taskId);
        setOpen(true);
    }

    const handleClose = () => {
        setUpdatingTask(null);
        setOpen(false);
    };

    //sorting algorithm-----------------------

    interface Task {
        _id: number;
        title: string;
        des: string;
        date?: string;
        priority: string;
        status: string
    }
    const priorityLevel: Record<string, number> = {
        High: 3,
        Medium: 2,
        Low: 1,
    };

    const getPriorityValue = (priority: string): number => {
        return priorityLevel[priority] || 0;
    }

    const [sortedTasks, setSortedTasks] = useState<Task[]>([]);

    const priorityQueue = new PriorityQueue<Task>({
        comparator: (a, b) => {
            const priorityDecision = getPriorityValue(b.priority) - getPriorityValue(a.priority);
            if (priorityDecision !== 0) {
                return priorityDecision;
            }
            const dateA:any = a.date ? new Date(a.date).getTime() : 0;
            const dateB = b.date ? new Date(b.date).getTime() : 0;
            return dateA - dateB;
        }
    });

    useEffect(() => {
        priorityQueue.clear();
        task.tasklist.forEach((task) => {
            priorityQueue.queue(task);
        });
        const sorted = [];
        while (priorityQueue.length) {
            sorted.push(priorityQueue.dequeue());
        }
        setSortedTasks(sorted);
    }, [task]);


    //Search Algorithm ------------------------

    const [searchedTask, setSearchedTask] = useState('');

    const searchResult = task.tasklist.filter((task: Task) => {
        return task.title.toLowerCase().includes(searchedTask.toLowerCase());
    });


    // Conditionl colors, utility objects --------------------------

    type PriorityColors = Record<string, string>;

    const priorityColors: PriorityColors = {
        High: 'red',
        Medium: 'orange',
        Low: 'green',
    };

    type StatusColors = Record<string, string>;

    const statusColors:StatusColors = {
        'in-progress': '#ae9e28',
        done: '#00d400'
    }

    return (
        <div className='tasklist-container'>
            <div className='tasklist'>
                <p className='tasklist-title'>Your Tasks.</p>

                <div className='search-wrapper'>
                    <TextField
                        placeholder='search by task'
                        sx={{ height: '10px', minWidth: '300px',
                        '@media (max-width: 1090px)' : {
                            minWidth: '180px',
                            fontSize: '10px',
                        },
                        '@media (max-width: 835px)':{
                            minWidth: '300px',
                        },    
                        '@media (max-width: 340px)':{
                            minWidth: '100px',
                        },    
                        }}
                        size='small'
                        focused={false}
                        InputProps={{
                            endAdornment: <InputAdornment position='end'><Search /></InputAdornment>,
                            onChange: (e) => setSearchedTask(e.target.value)
                        }}
                    />
                </div>

                <div className='tasks-wrapper'>
                    {
                        searchedTask ?

                           ( searchResult.map((item) => (
                                <div key={item._id}>
                                    <div onClick={(e) => handleOpen(item._id, e)} className='task'>
                                        <div className='task-title-holder'>
                                            <Tooltip title={item.title}>
                                            <div className='task-title'>{item.title}</div>
                                            </Tooltip>
                                            <div className='badge-holder'>
                                                <Chip
                                                    className='task-status'
                                                    label={item.status}
                                                    sx={{ backgroundColor: statusColors[item.status], color:'#fff', minWidth: '80px', maxHeight: '25px', fontSize: '12px' }}
                                                    onClick={() => dispatch(toggleStatus({ _id: item._id }))}
                                                />

                                                <Chip className='status'
                                                    label={`Priority : ${item.priority}`}
                                                    sx={{ backgroundColor: priorityColors[item.priority],color:'#fff', minWidth: '80px', maxHeight: '25px', fontSize: '12px' }} />
                                                {/* <p className='priority-badge'>priority : {item.priority}</p> */}
                                            </div>
                                        </div>
                                        <div className='task-des'>
                                            {item.des}
                                        </div>
                                        <div className='due-date-holder'>

                                            <Chip
                                                className='delete-task'
                                                label="Remove this task"
                                                variant="outlined"
                                                sx={{ minWidth: '80px', maxHeight: '25px', fontSize: '12px' }}
                                                onClick={() => dispatch(deleteTask({ _id: item._id }))}
                                            />
                                            <Tooltip title={item.date}>
                                            <Chip label={`Due Date - ${item.date}`} color="info" sx={{ minWidth: '80px', maxHeight: '25px', fontSize: '12px' }} />
                                            </Tooltip>
                                        </div>
                                    </div>
                                    {
                                        updatingTask === item._id && (
                                            <UpdateTask targetTask={item._id} onClose={handleClose} />
                                        )
                                    }
                                </div>
                            ))

                            ) : (

                               sortedTasks.length ? (

                            sortedTasks.map((item) => (
                                <div key={item._id}>
                                    <div onClick={(e) => handleOpen(item._id, e)} className='task'>
                                        <div className='task-title-holder'>
                                            <Tooltip title={item.title}>
                                            <div className='task-title'>{item.title}</div>
                                            </Tooltip>
                                            <div className='badge-holder'>
                                                <Chip
                                                    className='task-status'
                                                    label={item.status}
                                                    sx={{backgroundColor: statusColors[item.status], 
                                                        color:'#fff', minWidth: '80px', maxHeight: '25px',
                                                        fontSize: '12px',
                                                        '@media (max-width: 1090px)' : {
                                                            minWidth: '60px',
                                                            fontSize: '10px',
                                                        }
                                                        }}
                                                    onClick={() => dispatch(toggleStatus({ _id: item._id }))}
                                                />

                                                <Chip 
                                                className='status' 
                                                label={`Priority : ${item.priority}`} 
                                                sx={{backgroundColor: priorityColors[item.priority], 
                                                color:'#fff', minWidth: '80px', maxHeight: '25px',
                                                fontSize: '12px',
                                                '@media (max-width: 1090px)' : {
                                                    minWidth: '60px',
                                                    fontSize: '10px',
                                                }
                                                }} />
                                            </div>
                                        </div>
                                        <div className='task-des'>
                                            {item.des}
                                        </div>
                                        <div className='due-date-holder'>

                                            <Chip
                                                className='delete-task'
                                                label="Remove this task"
                                                variant="outlined"
                                                sx={{ 
                                                    minWidth: '80px', maxHeight: '25px', fontSize: '12px',
                                                    '@media (max-width: 1090px)' : {
                                                        minWidth: '60px',
                                                        fontSize: '10px',
                                                    }
                                                }}
                                                onClick={() => dispatch(deleteTask({ _id: item._id }))}
                                            />
                                            <Tooltip title={item.date}>
                                            <Chip 
                                            label={`Due Date - ${item.date}`} 
                                            color="info" 
                                            sx={{ 
                                                minWidth: '80px', maxHeight: '25px', fontSize: '12px',
                                                '@media (max-width: 1090px)' : {
                                                    minWidth: '60px',
                                                    fontSize: '10px',
                                                }
                                                 }} />
                                            </Tooltip>
                                        </div>
                                    </div>
                                    {
                                        updatingTask === item._id && (
                                            <UpdateTask targetTask={item._id} onClose={handleClose} />
                                        )
                                    }
                                </div>
                            ))
                        ) : (
                            <InitialPage/>
                        )
                    )}  
                </div>

            </div>
        </div>
    )
}
