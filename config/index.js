const dev = process.env.NODE_ENV !== 'production'

export const server = dev ? 'http://localhost/lipnonet/rekreace' : 'https://www.frymburk.com/rekreace'