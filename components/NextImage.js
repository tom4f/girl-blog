import Image from 'next/image'

const NextImage = ( { src, imageParams = { text: '' },  width = '100%', maxWidth = '100%', text = true  } ) => {
    //console.log( imageParams )
    return (
        <>
            <div style={{ width: `${width}`, height: 'auto', maxWidth: `${maxWidth}` }} className="next-img-wrapper" >
                <Image
                    src={ src }
                    alt={ imageParams.text }
                    layout="fill"
                    objectFit="contain"
                    quality={100}
                />
                { text ? <div style={{ textAlign: 'center' }}><small><i>{ imageParams.text }</i></small></div> : null }
            </div>

        </>
    )
}

export default NextImage