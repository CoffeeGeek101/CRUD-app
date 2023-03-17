
import { Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import {useState} from 'react';
import '../index.css'
import { useAppDispatch } from '../redux/store';
import { addTask } from '../redux/TaskSlice';
import formhero from '../../public/p2.png';

export const CreateTask = () => {
    const [dueDate, setValue] = useState<Dayjs | null>(null);
    const date : string | undefined = dueDate?.format('DD.MM.YYYY');
    // console.log(date)

    const[taskTitle, setTaskTitle] = useState<string>('');
    // console.log(taskTitle)

    const [taskDes, setTaskDes] = useState<string>('');
    // console.log(taskDes)

    const [taskPriority, setTaskPriority] = useState<string>('');
    // console.log(taskPriority)
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setTaskPriority((event.target as HTMLInputElement).value);
    }

    const dispatch = useAppDispatch();

    const handleCreate : React.MouseEventHandler<HTMLButtonElement> = (e) =>{
        e.preventDefault();
        dispatch(addTask({title:taskTitle, des:taskDes, date:date, priority:taskPriority, status:'in-progress'}));
    }


  return (
    <div className='create-task'>
        <div className='task-form'>
            <p className='form-title'>Create Task.</p>
            <form className='form'>
            
            <TextField
                id="outlined-multiline-flexible"
                label="Task"
                multiline
                maxRows={2}
                sx={{minWidth:'100%'}}
                focused={false}
                inputProps={{
                    onChange : (e) => setTaskTitle(e.currentTarget.value)
                }}
            />
            
            <TextField
                id="outlined-multiline-static"
                label="Task Description"
                multiline
                rows={4}
                sx={{
                    minWidth:'400px',
                    '@media (max-width: 1090px)':{
                        minWidth: '300px',
                    },
                    '@media (max-width: 835px)':{
                        minWidth: '400px',
                    },
                    '@media (max-width: 526px)':{
                        minWidth: '300px',
                    },
                    '@media (max-width: 390px)':{
                        minWidth: '100%',
                    },
                }}
                placeholder="Task Descripton"
                focused={false}
                inputProps={{
                    onChange : (e) => setTaskDes(e.currentTarget.value)
                }}
             />

             <LocalizationProvider dateAdapter={AdapterDayjs}>
                <label style={{marginBottom:'-25px', fontFamily:'Poppins', fontSize:'13px'}}>Set Due Date</label>
                <DatePicker value={dueDate} onChange={(newValue) => setValue(newValue)} />
             </LocalizationProvider>

            <div>
             <FormLabel sx={{fontFamily:'Poppins', fontSize:'13px'}}>Priority</FormLabel>
                <RadioGroup
                    row
                    name="row-radio-buttons-group"
                    value={taskPriority}
                    onChange={handleRadioChange}
                >
                    <FormControlLabel value="High" control={<Radio />} label="High" />
                    <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                    <FormControlLabel value="Low" control={<Radio />} label="Low" />
                </RadioGroup>
            </div>  

            <Button 
            onClick={handleCreate}
            variant="contained" sx={{backgroundColor:'black', ":hover":{backgroundColor:'#fff', color:"black"}}}>CREATE</Button>
            <img className='form-hero' src={formhero}/>
        </form>
        </div>
    </div>
  )
}
