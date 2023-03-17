
import { Button, Chip, FormControlLabel, FormLabel, Modal, Radio, RadioGroup, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import '../index.css'
import { useAppDispatch, useAppSelector } from '../redux/store';
import { updateTask } from '../redux/TaskSlice';



interface UpdateTaskProps {
    targetTask: number;
    onClose: () => void;
  }
  
export const UpdateTask: React.FC<UpdateTaskProps> = ({targetTask, onClose}) => {
    
    const [open, setOpen] = useState(true)
    

    const taskUpdate = useAppSelector((state)=>state.task.tasklist.find((item)=>item._id === targetTask));
    console.log(taskUpdate)

    const dispatch = useAppDispatch();

    useEffect(()=>{
        if (taskUpdate) {
            setUpdateTaskTitle(taskUpdate.title);
            setUpdateTaskDes(taskUpdate.des);
            setUpdateTaskPriority(taskUpdate.priority)
        }
    },[taskUpdate])


    const [updateDueDate, setUpdateValue] = useState<Dayjs | null>(null);
    const UPADTE_date : string | undefined = updateDueDate?.format('DD.MM.YYYY');
    // console.log(date)

    const[updateTaskTitle, setUpdateTaskTitle] = useState<string>('');
    // console.log(taskTitle)

    const [updateTaskDes, setUpdateTaskDes] = useState<string>('');
    // console.log(taskDes)

    const [updateTaskPriority, setUpdateTaskPriority] = useState<string>('');
    // console.log(taskPriority)
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setUpdateTaskPriority((event.target as HTMLInputElement).value);
    }

    if (!taskUpdate) {
        return null; 
      }

    

    // console.log(updatedData._id)

    const handleUpdate:React.MouseEventHandler<HTMLButtonElement> = (e) =>{
        e.preventDefault();

        const updatedData = {
            _id : taskUpdate._id,
            title : updateTaskTitle,
            des : updateTaskDes,
            date : UPADTE_date,
            priority : updateTaskPriority,
        }

        dispatch(updateTask(updatedData));
        onClose();
    }
    
    const handleCancel = () => {
        onClose();
      };

    // console.log(updateTaskTitle)

    return (
        <div>
            <Modal
                open={open}
                onClose={handleCancel}
            >
                <>
                    {/* <div className='update-task-wrapper'> */}

                    <form className='form update-form'>
                        <p className='update-header'>Update Task</p>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Task"
                            multiline
                            maxRows={2}
                            value={updateTaskTitle}
                            sx={{ minWidth: '100%' }}
                            focused={false}
                            inputProps={{
                                onChange: (e) => setUpdateTaskTitle(e.currentTarget.value)
                            }}
                        />

                        <TextField
                            id="outlined-multiline-static"
                            label="Task Description"
                            multiline
                            rows={4}
                            sx={{ minWidth:'400px',
                            '@media (max-width: 1090px)':{
                                minWidth: '100%',
                            } }}
                            placeholder="Task Descripton"
                            focused={false}
                            value={updateTaskDes}
                            inputProps={{
                                onChange: (e) => setUpdateTaskDes(e.currentTarget.value)
                            }}
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <label style={{ marginBottom: '-25px' }}>Set Due Date</label>
                            <DatePicker
                                value={updateDueDate}
                                // defaultValue={item.date}
                                onChange={(newValue) => setUpdateValue(newValue)}
                            />
                        </LocalizationProvider>

                        <div>
                            <FormLabel id="demo-row-radio-buttons-group-label">Priority</FormLabel>
                            <RadioGroup
                                row
                                name="row-radio-buttons-group"
                            value={updateTaskPriority}
                            onChange={handleRadioChange}
                            >
                                <FormControlLabel value="High" control={<Radio />} label="High" />
                                <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                                <FormControlLabel value="Low" control={<Radio />} label="Low" />
                            </RadioGroup>
                        </div>

                        <Button
                            onClick={handleUpdate}
                            variant="contained" sx={{ backgroundColor: 'black', ":hover": { backgroundColor: '#fff', color: "black" } }}>UPDATE</Button>
                    </form>
                </>
            </Modal>
        </div>
    )
}
