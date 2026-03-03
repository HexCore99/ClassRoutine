import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const DAY_ORDER = ["SAT", "SUN", "MON", "TUE", "WED", "THU", "FRI"];
function formatTime(value) {
  return value?.slice(0, 5) ?? "";
}
const localhost = "http://localhost:5000/api";
function groupRows(rows) {
  const groupped = DAY_ORDER.map((day) => ({ day: day, classes: [] }));
  const byDay = Object.fromEntries(groupped.map((item) => [item.day, item]));

  for (const row of rows) {
    if (!byDay[row.day]) continue;

    byDay[row.day].classes.push({
      id: row.id,
      day: row.day,
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
  async (_, { rejectWithValue }) => {
    const rows = await fetch(`${localhost}/routine`, {
      method: "GET",
      credentials: "include",
    });
    const data = await rows.json();
    console.log(data);
    if (!rows.ok)
      return rejectWithValue(data.message || "Failed to load routine");

    return groupRows(data.rows);
  },
);

export const updateRoutine = createAsyncThunk(
  "course/updateRoutine",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await fetch(`${localhost}/routine/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await result.json();
      if (!result.ok) return rejectWithValue(data.message);
      return data.row;
    } catch (err) {
      return rejectWithValue("Failed to update course");
    }
  },
);

export const addNewCourse = createAsyncThunk(
  "course/addNewCourse",
  async (payload, { rejectWithValue }) => {
    const result = await fetch(`${localhost}/routine/addnew`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const data = await result.json();
    if (!result.ok) return rejectWithValue(data.message);
    return data.row;
  },
);

export const removeCourse = createAsyncThunk(
  "course/removeCourse",
  async ({ id }, { rejectWithValue }) => {
    const result = await fetch(`${localhost}/routine/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await result.json();
    if (!result.ok) return rejectWithValue(data.message);
    return data.id;
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
      })
      .addCase(updateRoutine.fulfilled, (state, action) => {})
      .addCase(addNewCourse.fulfilled, (state, action) => {
        console.log("course added succesfully", action.payload);
      })
      .addCase(removeCourse.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.scheduleDetails = state.scheduleDetails
          .map((dayItem) => ({
            ...dayItem,
            classes: dayItem.classes.filter((cls) => cls.id !== deletedId),
          }))
          .filter((dayItem) => dayItem.classes.length > 0);
      });
  },
});

export const selectScheduleDetails = (state) => state.course.scheduleDetails;
export const selectCourseStatus = (state) => state.course.status;
export const selectCourseError = (state) => state.course.error;

export default courseSlice.reducer;
