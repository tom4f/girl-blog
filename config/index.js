const dev = process.env.NODE_ENV !== 'production'
//
export const serverPath = dev ? 'http://localhost/lipnonet/rekreace' : 'https://www.frymburk.com/rekreace'
//export const server = dev ? 'http://localhost:3000' : 'http://localhost/lipnonet/rekreace'

export const apiPath = dev ? 'http://localhost:3000' : 'https://olca.cz'