import { notification } from "ant-design-vue";

export default class PopUpMessage {
  type: NotificationType;
  message: string;
  title: string;

  constructor({ title, message, type = NotificationType.Success }: PopUpData) {
    this.title = title;
    this.type = type;
    this.message = message;
  }

  show(): void {
    const placement = "bottomRight";
    notification[this.type]({
      message: this.title,
      description: this.message,
      placement,
    });
  }
}

export enum NotificationType {
  Success = "success",
  Warning = "warning",
  Error = "error",
}

export interface PopUpData {
  title: string;
  message: string;
  type?: NotificationType;
}
