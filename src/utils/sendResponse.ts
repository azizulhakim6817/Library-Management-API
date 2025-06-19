import { Response } from "express";

interface IApiResponse<T> {
  success: boolean;
  message: string;
  data?: T | null;
  error?: any;
}

export const sendResponse = <T>(
  res: Response,
  { success, message, data = null, error = null }: IApiResponse<T>
): void => {
  res.status(success ? 200 : 400).json({
    success,
    message,
    data,
    error,
  });
};
