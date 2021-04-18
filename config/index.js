const dev = process.env.NODE_ENV !== 'production'

export const serverPath = dev ? 'http://localhost/lipnonet/rekreace' : 'https://www.frymburk.com/rekreace'

export const apiPath = dev ? 'http://localhost:3000' : 'https://olca.cz'