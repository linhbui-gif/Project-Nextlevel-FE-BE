import { AnyAction } from "redux";

export type TNotification = {
  id: number;
  message: string;
  type: string;
};

export type NotificationState = Array<TNotification>;

const initState: NotificationState = [
  {
    id: +new Date(),
    message: "",
    type: "",
  },
];

const reducer = (
  state: NotificationState = initState,
  action: AnyAction
): NotificationState => {
  switch (action.type) {
    case "notification/add":
      return [
        ...state,
        {
          id: +new Date(),
          message: action.payload,
          type: typeof action.payload,
        },
      ];
    case "notification/remove":
      return state.filter((t) => t.id !== action.payload.id);
    default:
      return state;
  }
};

export default reducer;
