import { Search } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import '../index.css'

export const TaskList = () => {
  return (
    <div className='tasklist-container'>
        <div className='tasklist'>
            <p className='tasklist-title'>TASK-LIST</p>

            <div className='search-wrapper'>
            <TextField
                placeholder='search'
                sx={{ height: '10px', minWidth:'300px'}}
                size='small'
                focused={false}
                InputProps={{
                    endAdornment: <InputAdornment position='end'><Search/></InputAdornment>,
                }}
            /> 
            </div>

            <div className='tasks-wrapper'>
                <div className='task'>
                    <div className='task-title-holder'>
                        <div className='task-title'>test</div>
                        <div className='badge-holder'>
                        <p className='status-badge'>status : </p>
                        <p className='priority-badge'>priority : </p>
                        </div>
                    </div>
                    <div className='task-des'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis, consequatur voluptates eos placeat nobis ab asperiores exercitationem, ipsum possimus magnam ullam omnis sint odio recusandae hic? Itaque accusamus deleniti reprehenderit.
                    </div>
                    <div className='due-date-holder'>
                    <p className='due-date'>Due Date - 8.09.23</p>
                    </div>
                </div>
                <div className='task'>
                    <div className='task-title-holder'>
                        <div className='task-title'>test</div>
                        <div className='badge-holder'>
                        <p className='status-badge'>status : </p>
                        <p className='priority-badge'>priority : </p>
                        </div>
                    </div>
                    <div className='task-des'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis, consequatur voluptates eos placeat nobis ab asperiores exercitationem, ipsum possimus magnam ullam omnis sint odio recusandae hic? Itaque accusamus deleniti reprehenderit.
                    </div>
                    <div className='due-date-holder'>
                    <p className='due-date'>Due Date - 8.09.23</p>
                    </div>
                </div>
                <div className='task'>
                    <div className='task-title-holder'>
                        <div className='task-title'>test</div>
                        <div className='badge-holder'>
                        <p className='status-badge'>status : </p>
                        <p className='priority-badge'>priority : </p>
                        </div>
                    </div>
                    <div className='task-des'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis, consequatur voluptates eos placeat nobis ab asperiores exercitationem, ipsum possimus magnam ullam omnis sint odio recusandae hic? Itaque accusamus deleniti reprehenderit.
                    </div>
                    <div className='due-date-holder'>
                    <p className='due-date'>Due Date - 8.09.23</p>
                    </div>
                </div>
                <div className='task'>
                    <div className='task-title-holder'>
                        <div className='task-title'>test</div>
                        <div className='badge-holder'>
                        <p className='status-badge'>status : </p>
                        <p className='priority-badge'>priority : </p>
                        </div>
                    </div>
                    <div className='task-des'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis, consequatur voluptates eos placeat nobis ab asperiores exercitationem, ipsum possimus magnam ullam omnis sint odio recusandae hic? Itaque accusamus deleniti reprehenderit.
                    </div>
                    <div className='due-date-holder'>
                    <p className='due-date'>Due Date - 8.09.23</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}
