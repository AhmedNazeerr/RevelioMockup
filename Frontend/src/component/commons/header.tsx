import heading from '../../assets/heading.png'

const Header = () => {
  return (
    <div className='bg-main-color py-3 pl-7'>
      <img src={heading} className='w-64 h-16 object-contain' loading='lazy' alt="page-headings" />
    </div>
  )
}

export default Header