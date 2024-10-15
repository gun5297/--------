import { createSlice } from '@reduxjs/toolkit';

// 초기 상태
const initialState = {
    teamLeaders: [],
    remainingMembers: [],
    teams: {
        teamA: [],
        teamB: [],
    },
};

// Redux Slice 생성
const teamSlice = createSlice({
    name: 'teams',
    initialState,
    reducers: {
        setTeamLeaders: (state, action) => {
            state.teamLeaders = action.payload;
        },
        setRemainingMembers: (state, action) => {
            state.remainingMembers = action.payload;
        },
        assignTeams: (state) => {
            // 남은 멤버들을 랜덤하게 섞음
            const shuffledMembers = [...state.remainingMembers].sort(() => Math.random() - 0.5);
            state.teams.teamA = shuffledMembers.filter((_, idx) => idx % 2 === 0);
            state.teams.teamB = shuffledMembers.filter((_, idx) => idx % 2 !== 0);
        },
    },
});

export const { setTeamLeaders, setRemainingMembers, assignTeams } = teamSlice.actions;
export default teamSlice.reducer;
