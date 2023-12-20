import React from 'react';
import heading from '../../assets/heading.png'

const Footer:React.FC<{absoute?: boolean}> = ({absoute}) => {
    return (
        <div className={absoute ? 'mt-8 absolute bottom-0 w-full': 'mt-8'}>
            <div className="bg-main-color text-white pt-2 pl-7 pb-4">
                <img src={heading} className='w-40' alt="page-headings" />
                <div className='text-[0.385rem] text-white pl-10 flex flex-col gap-0.5'>
                    <p className='drop-shadow'>Timings: Monday - Friday: 9 AM till 6 PM
                        Sat - Sun 10 AM till 4 PM
                    </p>
                    <div>
                        <p className='drop-shadow'>For Further Details:</p>
                        <p className='drop-shadow'>+44 123 456 789</p>
                    </div>
                    <div className='flex gap-1'>
                        <div className='bg-high-light-color w-2.5 h-2.5 flex items-center justify-center'>
                            <i className="fa-brands fa-whatsapp text-main-color"></i>
                        </div>
                        <div className='bg-high-light-color w-2.5 h-2.5 flex items-center justify-center'>
                            <i className="fa-brands fa-instagram text-main-color"></i>
                        </div>
                        <div className='bg-high-light-color w-2.5 h-2.5 flex items-center justify-center'>
                            <i className="fa-brands fa-facebook-f text-main-color"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-high-light-color text-center text-[0.35rem] text-white drop-shadow'>All Rights Reserved Ⓒ by Revilo Automotive ®</div>
        </div>
    )
}

export default Footer;