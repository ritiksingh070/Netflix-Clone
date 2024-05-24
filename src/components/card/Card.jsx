import './Card.scss'

const Card = ({videoImg}) => {
  return (
    <img  className="card" src={videoImg} alt="cover" />
  )
}

export default Card