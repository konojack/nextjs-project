import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
const options = {
    providers: [
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // Tutaj pobieramy użytkownika z bazy lub weryfikujemy go w inny sposób
                if (credentials.username === "admin" && credentials.password === "asd") {
                    // Any user object returned here will be saved in the JSON Web Token
                    return Promise.resolve(user)
                } else {
                    return Promise.resolve(null)
                }
            }
        })
    ]
}

export default (req, res) => NextAuth(req, res, options)