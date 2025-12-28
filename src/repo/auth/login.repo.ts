import {pool} from '../../config/pg-pool';

export const checkIfUserExist = async (email: string) => {
    try {
        if (!email) return null;
        const result = await pool.query(
            `
            SELECT email, password_hash
            FROM users
            WHERE email = Lower($1)
            LIMIT 1
            `,
            [email]
        )
        return result.rows[0] || null;
    } catch (err) {
        throw err;
    }
};
