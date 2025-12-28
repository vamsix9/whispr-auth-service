import * as dto from "../dto/getHealth.dto";

export const getHealth = (): dto.getHealthResponseDTO => {
  try {
    return {
      status: "ok"
    }
  }
  catch(err) {
    console.log('Error in getHealth service', err);
    throw err;
  }
};