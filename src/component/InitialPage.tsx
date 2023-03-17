import '../index.css'
import initialPhoto from '../../public/p3.png'

export const InitialPage:React.FC = () => {
  return (
    <div className='initial-wrapper'>
        <div className='initial-hero'>
            <img className='initial-hero-photo' src={initialPhoto}/>
            <p className='initial-dialog'>Plan your day ahead.</p>
        </div>
    </div>
  )
}
