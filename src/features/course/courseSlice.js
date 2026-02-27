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
  async (__, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("routine_classes")
      .select("*")
      .order("start_time", { ascending: true });

    if (error) return rejectWithValue(error.message);
    return groupRows(data ?? []);
  },
);

export const updateRoutine = createAsyncThunk(
  "course/updateRoutine",
  async (payload, { rejectWithValue }) => {
    const { id, ...updates } = payload;
    const { data, error } = await supabase
      .from("routine_classes")
      .update(updates)
      .eq("id", id)
      .select("id");

    if (error) return rejectWithValue(error.message);
    if (!data || data.length === 0) {
      return rejectWithValue(
        "No row updated. Check RLS policy or selected id.",
      );
    }
    return { id, ...updates };
  },
);

export const addNewCourse = createAsyncThunk(
  "course/addNewCourse",
  async (payload, { rejectWithValue }) => {
    const { id, ...updates } = payload;
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError) return rejectWithValue(authError.message);
    if (!authData.user) return rejectWithValue("You mus be logged in");
    const { data, error } = await supabase
      .from("routine_classes")
      .insert({ ...updates, user_id: authData.user.id })
      .select("*");

    if (error) return rejectWithValue(error.message);
    if (!data || data.length === 0) {
      return rejectWithValue(
        "No row updated. Check RLS policy or selected id.",
      );
    }
    return data;
  },
);

export const removeCourse = createAsyncThunk(
  "course/removeCourse",
  async ({ id }, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("routine_classes")
      .delete()
      .eq("id", id)
      .select();

    if (error) return rejectWithValue(error.message);
    if (!data || data.length === 0) {
      return rejectWithValue("No row deleted. check if the ID exists");
    }
    return { id };
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
      .addCase(updateRoutine.fulfilled, (state, action) => {
        const updated = action.payload;

        for (const day of state.scheduleDetails) {
          const cls = day.classes.find((item) => item.id === updated.id);
          if (!cls) continue;

          cls.startTime = formatTime(updated.start_time);
          cls.endTime = formatTime(updated.end_time);
          cls.courseName = updated.course_name;
          cls.courseCode = updated.course_code;
          cls.facultyName = updated.faculty_name;
          cls.sec = updated.sec;
          cls.room = updated.room;
          break;
        }
      })
      .addCase(addNewCourse.fulfilled, (state, action) => {
        console.log("course added succesfully", action.payload);
      })
      .addCase(removeCourse.fulfilled, (state, action) => {
        const deletedId = action.payload.id;

        for (const day of state.scheduleDetails) {
          const index = day.classes.findIndex((item) => item.id === deletedId);
          if (index !== -1) {
            day.classes.splice(index, 1);
            break;
          }
        }

        state.scheduleDetails = state.scheduleDetails.filter(
          (day) => day.classes.length > 0,
        );
      });
  },
});

export const selectScheduleDetails = (state) => state.course.scheduleDetails;
export const selectCourseStatus = (state) => state.course.status;
export const selectCourseError = (state) => state.course.error;

export default courseSlice.reducer;
