import type { Request, Response, NextFunction } from "express";
import type { Order } from "../types/types.js";
import { processOrder } from "../services/processOrder";

export const createOrder = (req: Request<{}, {}, Order>, res: Response) => {
  try {
    const order = processOrder(req.body);
    return res.status(201).json(order);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
