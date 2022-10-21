import { IAlert } from '~/models/data';

export interface IAlertStore {
  alert: IAlert;

  setProperties(alert: IAlert): void;

  showSuccessAlert(message: string): void;
  showErrorAlert(message: string): void;
  showWarningAlert(message: string): void;
}
