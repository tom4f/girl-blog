import Image from 'next/image'

const NextImage = ( { src, imageParams = { text: '' },  width = '100%', maxWidth = '100%'  } ) => {
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
                <div style={{ textAlign: 'center' }}>{ imageParams.text }</div>
            </div>

        </>
    )
}

export default NextImage