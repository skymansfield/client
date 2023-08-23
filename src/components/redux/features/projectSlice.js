import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/project';

const initialState = {
    projects: [],
    isError: false,
    isSuccess: false,
    isLoading: false,

};


// create project
export const createProject = createAsyncThunk(
    'project/new-project',
    async (projectData, thunkAPI) => {
        try {
            const response = await axios.post(API_URL + '/new-project', projectData);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('create not working');
        }
    }
);

// get projects
export const getProjects = createAsyncThunk(
    'project/getAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(API_URL + '/getAll');

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('get not working');
        }
    }
);

// add Comment
export const commentAdd = createAsyncThunk(
    'project/add-comment',
    async (sentToRedux, thunkAPI) => {
        try {
            const response = await axios.put(API_URL + '/add-comment/' + sentToRedux.projectId,
                { commentSection: sentToRedux.commentsToAdd });
            getProjects()
            return response.data;
        } catch (error) {
            console.log("not Working")
            return thunkAPI.rejectWithValue('add comment not working');
        }
    }
);

// add Milestone
export const milestoneAdd = createAsyncThunk(
    'project/add-milestone',
    async (sentToRedux, thunkAPI) => {
        try {
            const response = await axios.put(API_URL + '/add-milestone/' + sentToRedux.projectId,
                { milestones: sentToRedux.milestonesToAdd });
            getProjects()
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('add milestone not working');
        }
    }
);

// delete project
export const deleteProject = createAsyncThunk(
    'project/delete',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(API_URL + '/delete-project/' + id);
            getProjects()
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('delete not working');
        }
    }
);



// edit book
export const editProject = createAsyncThunk(
    'project/edit',
    async (projectData, thunkAPI) => {
        try {
            const response = await axios.put(API_URL + '/edit/' + projectData._id, projectData);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('create not working');
        }
    }
);

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reset: (state) => initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.projects.push(action.payload);

            })
            .addCase(createProject.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })

            .addCase(getProjects.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.projects = action.payload;
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            })

            .addCase(commentAdd.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(commentAdd.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.projects.findIndex((projectData) => projectData._id === action.payload._id)
                state.projects.splice(index, 1, action.payload);

            })
            .addCase(commentAdd.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;

            })
            .addCase(milestoneAdd.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(milestoneAdd.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;

                const index = state.projects.findIndex((projectData) => projectData._id === action.payload._id)
                state.projects.splice(index, 1, action.payload);

            })
            .addCase(milestoneAdd.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;

            })
            .addCase(deleteProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.projects.findIndex((project) => project._id === action.payload._id)
                state.projects.splice(index, 1)

            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            .addCase(editProject.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editProject.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.projects.findIndex((projectData) => projectData._id === action.payload._id)
                console.log(action.payload, "edit")
                state.projects.splice(index, 1, action.payload);

            })
            .addCase(editProject.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
            });

    }
});

console.log(projectSlice);

export default projectSlice.reducer;
export const { reset } = projectSlice.actions;