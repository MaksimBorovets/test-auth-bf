import * as argon2 from 'argon2'

export const hashString = async (password: string): Promise<string> => {
	const hash = await argon2.hash(password, {
		type: argon2.argon2id,
		memoryCost: 16384,
		timeCost: 10,
	})

	return hash
}

export const verify = (password, userPassword) => {
	return argon2.verify(password, userPassword)
}