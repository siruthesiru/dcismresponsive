import axios from "axios";
import {
  applyJob,
  deleteApplyJob,
  deleteApplyJobError,
  editProfile,
  editProfileError,
  getAlumniProfile,
  getAlumniProfileError,
  getAnnouncements,
  getAnnouncementsError,
  getApplyJobs,
  getEvents,
  getEventsError,
  getJob,
  getJobError,
  getJobs,
  getNotification,
  getNotifications,
  setErrorMessage,
} from "../app/alumniUserSlice";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/Alumni`,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers = { authorization: "Bearer " + localStorage.getItem("token") };
  return config;
});

export const GetAlumniProfile = async (dispatch) => {
  try {
    const response = await axiosInstance.get("/Profile");
    dispatch(getAlumniProfile(response.data));
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    dispatch(getAlumniProfileError());
  }
};

export const GetAllAnnouncements = async (dispatch) => {
  try {
    const response = await axiosInstance.get("/Announcements");
    const announcements = response.data.filter((announcement) => {
      return (
        announcement.audience === "Alumni" || announcement.audience === "All"
      );
    });
    dispatch(getAnnouncements(announcements));
  } catch (error) {
    console.error("Error:", error);
    dispatch(getAnnouncementsError());
  }
};

export const GetAllJobs = async (dispatch) => {
  try {
    const response = await axiosInstance.get("/Jobs");
    dispatch(getJobs(response.data));
  } catch (error) {
    console.error("Error:", error);
    dispatch(getAnnouncementsError());
  }
};

export const GetAllEvents = async (dispatch) => {
  try {
    const response = await axiosInstance.get("/Events");
    const events = response.data.filter((event) => {
      return event.audience === "Alumni" || event.audience === "All";
    });
    dispatch(getEvents(events));
  } catch (error) {
    console.error("Error:", error);
    dispatch(getEventsError());
  }
};

export const EditProfile = async (dispatch, credentials) => {
  try {
    const formData = new FormData();
    for (const key in credentials) {
      if (key === "file" && credentials[key]) {
        formData.append(key, credentials[key]);
      } else if (key === "skills") {
        for (const skillKey in credentials[key]) {
          formData.append(
            `skills[${skillKey}][skill]`,
            credentials[key][skillKey].skill,
          );
        }
      } else {
        formData.append(key, credentials[key]);
      }
    }
    const response = await axiosInstance.put("/Profile-Edit", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.isEditSucceed) {
      dispatch(editProfile(response.data));
      toast.success(response.data.message);
    } else {
      dispatch(setErrorMessage(response.data.message));
      toast.error(response.data.message);
    }
    return response.data.isEditSucceed;
  } catch (error) {
    console.error("Error:", error);
    dispatch(
      setErrorMessage(
        error.response.data || "An error occurred on the server.",
      ),
    );
    dispatch(editProfileError(error.response.data));
  }
};

export const GetJob = async (dispatch, id) => {
  try {
    const response = await axiosInstance.get(`/Jobs/Get-Job/${id}`, id);
    dispatch(getJob(response.data));
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    dispatch(getJobError(error.response.data));
  }
};

export const GetAppliedJob = async (dispatch, id) => {
  try {
    const response = await axiosInstance.get(
      `/Jobs/Get-Job/${id}/View-JobFrom-Application`,
      id,
    );
    dispatch(getJob(response.data));
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    dispatch(getJobError(error.response.data));
  }
};

export const GetAllAppliedJobs = async (dispatch) => {
  try {
    const response = await axiosInstance.get("/Jobs/Get-All-Applied-Jobs");
    dispatch(getApplyJobs(response.data));
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    dispatch(getJobError(error.response.data));
  }
};

export const ApplyJob = async (dispatch, job) => {
  try {
    const response = await axiosInstance.post("/Jobs/Apply-Job", job);
    if (response.data.isPostSucceed) {
      dispatch(applyJob(response.data));
    } else {
      dispatch(setErrorMessage(response.data.message));
      toast.error(response.data.message);
    }
    return response.data.isPostSucceed;
  } catch (error) {
    console.error("Error:", error);
    dispatch(getJobError(error.response.data));
  }
};

export const DeleteAppliedJob = async (dispatch, id) => {
  try {
    await axiosInstance.delete(`/Jobs/Delete-Applied-Jobs/${id}`);
    dispatch(deleteApplyJob(id));
    toast.success("Application deleted successfully");
  } catch {
    dispatch(deleteApplyJobError());
    toast.error("An error occurred while deleting the application");
  }
};

export const GetAllNotifications = async (dispatch) => {
  try {
    const response = await axiosInstance.get("/Notifications");
    dispatch(getNotifications(response.data));
  } catch (error) {
    console.error("Error:", error);
    dispatch(getJobError(error.response.data));
  }
};

export const GetAllNotificationByID = async (dispatch, userId, id) => {
  try {
    const response = await axiosInstance.get(
      `/Notifications/${id}/Get-Notification/${userId}`,
      id,
      userId,
    );
    dispatch(getNotification(response.data));
  } catch (error) {
    console.error("Error:", error);
    dispatch(getJobError(error.response.data));
  }
};
