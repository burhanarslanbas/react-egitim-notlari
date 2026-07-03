import React from 'react'

function Course({ course }) {
  const { id, title, desc, price, link, image } = course;
  return (
    <div className='course'>
      <h4 className='c-title'>{title}</h4>
      <img className='c-img' src={image} />
      <h5 className='c-desc'>{desc}</h5>
      <h3 className='c-price'>{price}₺</h3>
      <button className='c-link-btn'><a href={link}>Kursu incelemek için tıklayınız.</a></button>
    </div>
  )
}

export default Course