import { Responses, TypedRequest, TypedResponse } from "../types/express";
import * as service from "../service/Health.service";

export const getHealth = (
  req: TypedRequest['getHealth'],
  res: TypedResponse<Responses['getHealth']>
) => {
  try {
    const health = service.getHealth();
    return res.status(200).json(health);
  } catch (err) {
    console.log('Error in getHealth controller', err);
    throw err;
  }
};
