import React from 'react';
import heading from '../../assets/heading.png'

const Footer: React.FC<{ absoute?: boolean, isShow?: boolean }> = ({ absoute, isShow }) => {
    return (
        isShow && <div className={absoute ? 'absolute bottom-0 w-full' : ''}>
            <div className="bg-main-color text-white pt-3 pl-7 pr-12 pb-4">
                <img src={heading} className='w-64 h-16 object-contain' alt="page-headings" />
                <div className='text-[0.875rem] text-white pl-[4.3rem] flex flex-col gap-2'>
                    <p className='drop-shadow'>Timings: Monday - Friday: 9 AM till 6 PM
                        Sat - Sun 10 AM till 4 PM
                    </p>
                    <div>
                        <p className='drop-shadow'>For Further Details:</p>
                        <p className='drop-shadow'>+44 123 456 789</p>
                    </div>
                    <div className='flex gap-2 text-[1.3rem]'>
                        <div className='bg-high-light-color w-7 h-7 flex items-center justify-center'>
                            <i className="fa-brands fa-instagram text-main-color"></i>
                        </div>
                        <div className='bg-high-light-color w-7 h-7 flex items-center justify-center'>
                            <i className="fa-brands fa-whatsapp text-main-color"></i>
                        </div>
                        <div className='bg-high-light-color w-7 h-7 flex items-center justify-center'>
                            <i className="fa-brands fa-facebook-f text-main-color"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-high-light-color text-center text-[0.875rem] text-white drop-shadow'>All Rights Reserved Ⓒ by Revilo Automotive ®</div>
        </div>
    )
}

export default Footer;