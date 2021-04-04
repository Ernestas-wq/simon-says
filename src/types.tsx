export enum NotificationType {
  success,
  neutral,
  danger,
}

export enum ButtonState {
  start,
  next,
  submit,
}

export type Notification = {
  text: string;
  isOpen: boolean;
  type: NotificationType;
};
