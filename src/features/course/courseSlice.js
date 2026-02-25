import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../lib/supabase";
const DAY_ORDER = ["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"];
function formatTime(value) {
  return value?.slice(0, 5) ?? "";
}

function groupRows(rows) {
  const groupped = DAY_ORDER.map((day) => ({ day: day, classes: [] }));
  const byDay = Object.fromEntries(groupped.map((item) => [item.day, item]));

  for (const row of rows) {
    if (!byDay[row.day]) continue;

    byDay[row.day].classes.push({
      id: row.id,
      startTime: formatTime(row.start_time),
      endTime: formatTime(row.end_time),
      courseName: row.course_name,
      courseCode: row.course_code,
      room: row.room,
      facultyName: row.faculty_name,
      sec: row.sec,
    });
  }

  return groupped.filter((item) => item.classes.length > 0);
}

export const fetchRoutine = createAsyncThunk(
  "course/fetchRoutine",
  async (__, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("routine_classes")
      .select("*")
      .order("start_time", { ascending: true });

    if (error) return rejectWithValue(error.message);
    return groupRows(data ?? []);
  },
);

const initialState = {
  scheduleDetails: [],
  status: "idle",
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutine.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRoutine.fulfilled, (state, action) => {
        state.status = "succeded";
        state.scheduleDetails = action.payload;
      })
      .addCase(fetchRoutine.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const selectScheduleDetails = (state) => state.course.scheduleDetails;
export const selectCourseStatus = (state) => state.course.status;
export const selectCourseError = (state) => state.course.error;

export default courseSlice.reducer;
