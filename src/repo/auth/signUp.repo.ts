import * as dto from "../../dto/auth/signUp.dto";
import { pool } from "../../config/pg-pool";

export const checkIfUserIsUnique = async (email: string, userName: string) => {
  const result = await pool.query(
    `
    SELECT id, user_name, email
    FROM users
    WHERE user_name = $1
      OR email = $2
    LIMIT 1
    `,
    [userName, email]
  )

  return result.rows[0] || null;
}

export const createUser = async (data: dto.SignUpRequestDTO) => {
  try {
    const newUser = await pool.query(
      `
      INSERT INTO users(email, user_name, password_hash)
      VALUES ($1, $2, $3)
      `,
      [data.email, data.userName, data.password]
    );
    return newUser;
  } catch(err: any) {
  if (err.code === "23505") {
    throw new Error("Email or username already exists");
  }
  throw err;
  }
};
