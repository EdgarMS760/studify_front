import React from 'react'

const AtomCardSideBarGroup = ({ imageSrc, name }) => {
  return (
  <div>
      <img src={imageSrc} alt={name} />
      <p>{name}</p>
    </div>
  )
}

export default AtomCardSideBarGroup