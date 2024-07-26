import { BASE_API_URI } from "../../config/api";
import { CREATE_NEW_MESSAGE } from "./ActionType";

export const createMessage = (messageData) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URI}/api/messages/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${messageData.token}`,
      },
      body: JSON.stringify(messageData.data),
    });
    const data = await res.json();
    console.log("create new message", data);
    dispatch({ type: CREATE_NEW_MESSAGE, payload: data });
  } catch (error) {
    console.log("catch error", error);
  }
};
