
const BASE_URL = 'https://api-techfood.onrender.com'


//nome, email, senha, papel
export async function registrarUsuario(data) {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({ data }),
        })
    } catch (error) {
        console.error('Regustrar usuario', error.message)
        throw error
    }
}







export async function registrarUsuario(data) {
    try {
        const response = await fetch(`${BASE_URL}/`)
    } catch (error) {
        console.error('Regustrar usuario', error.message)
        throw error
    }
}