export interface IAlert {
  variant: 'success' | 'error' | 'warning';
  message: string;
  isShow: boolean;
}
