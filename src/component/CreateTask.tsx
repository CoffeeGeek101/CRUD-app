
import { Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { style } from '@mui/system';
import { useState } from 'react';
import DatePicker from 'react-date-picker'
import '../index.css'


export const CreateTask = () => {
    const [value, onChange] = useState(new Date());
  return (
    <div className='create-task'>
        <div className='task-form'>
            <p className='form-title'>Create Task</p>
            <form className='form'>
            <TextField
                id="outlined-multiline-flexible"
                label="Task"
                multiline
                maxRows={2}
                sx={{minWidth:'400px'}}
                focused={false}
            />
            <TextField
                id="outlined-multiline-static"
                label="Task Description"
                multiline
                rows={4}
                sx={{minWidth:'400px'}}
                placeholder="Task Descripton"
                focused={false}
             />
            <DatePicker onChange={onChange} value={value}/>
            <div>
             <FormLabel id="demo-row-radio-buttons-group-label">Priority</FormLabel>
                <RadioGroup
                    row
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel value="female" control={<Radio />} label="High" />
                    <FormControlLabel value="male" control={<Radio />} label="Medium" />
                    <FormControlLabel value="other" control={<Radio />} label="Low" />
                </RadioGroup>
            </div>  
            <Button variant="contained" sx={{backgroundColor:'black', ":hover":{backgroundColor:'#fff', color:"black"}}}>CREATE</Button>
        </form>
        </div>
    </div>
  )
}
