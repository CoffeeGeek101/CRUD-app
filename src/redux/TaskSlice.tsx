import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
    _id : number;
    title : string;
    des : string;
    date ?: string;
    priority : string;
    status : string;
}

interface TaskList {
    tasklist : Task[],
}

const initialState : TaskList = {
    tasklist : [],
}

const taskSlice = createSlice({
    name: "taskSlice",
    initialState,
    reducers :{
        addTask : (state:TaskList, action:PayloadAction<{title:string, des:string,date?:string,priority:string, status : string}>) =>{
            state.tasklist.push({
                _id : state.tasklist.length,
                title : action.payload.title,
                des : action.payload.des,
                date : action.payload.date,
                priority : action.payload.priority,
                status : action.payload.status,
            }
            )
        },

        deleteTask : (state:TaskList, action:PayloadAction<{_id:number}>) =>{
            state.tasklist = state.tasklist.filter((task)=> task._id !== action.payload._id)
        },

        updateTask : (state:TaskList, action:PayloadAction<{ _id:any, title:string, des:string, date?:string, priority:string,}>) =>{
            state.tasklist.map((task)=>{
                if(task._id === action.payload._id){
                    task.title = action.payload.title,
                    task.des = action.payload.des,
                    task.date = action.payload.date,
                    task.priority = action.payload.priority
                }
            }
            );
        },
        toggleStatus : (state:TaskList, action:PayloadAction<{_id:number}>) =>{
            const task = state.tasklist.find((task) => task._id === action.payload._id);
            if (task) {
                task.status = task.status === 'in-progress' ? 'done' : 'in-progress';
              }
        }
    }
})

export const {addTask, deleteTask, updateTask,toggleStatus} = taskSlice.actions;
export default taskSlice.reducer;