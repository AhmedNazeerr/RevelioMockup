import heading from '../../assets/heading.png'

const Header = () => {
  return (
    <div className='bg-main-color py-2 pl-7'>
      <img src={heading} className='w-48' loading='lazy' alt="page-headings" />
    </div>
  )
}

export default Header