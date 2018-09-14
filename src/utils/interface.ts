export interface IMessage {
  chatId?: any;
  sender: number | string;
  receiver: number | string;
  content: string;
  time?: number;
}