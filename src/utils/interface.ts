export interface IMessage {
  chatId?: number;
  sender: number;
  receiver: number;
  content: string;
  time?: number;
}