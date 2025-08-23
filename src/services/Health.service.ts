import * as dto from "../dto/getHealth.dto";

export const getHealth = (): dto.getHealthResponseDTO => {
  try {
    return {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    }
  }
  catch(err) {
    console.log('Error in getHealth service', err);
    throw err;
  }
};