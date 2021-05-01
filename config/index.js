const dev = process.env.NODE_ENV !== 'production'

export const serverPath = dev ? 'http://localhost/lipnonet/rekreace' : 'https://www.frymburk.com/rekreace'

export const photoApiScript = 'pdo_read_foto_lucka.php'
export const photoFolder = 'fotogalerie_lucka'
export const photoGalleryLink = `${serverPath}/fotogalerie_lucka.html`

export const blogApiScript = 'pdo_read_blog.php'
export const blogApiScriptExt = ''

export const apiPath = dev ? 'http://localhost:3000' : 'https://olca.cz'