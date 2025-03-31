import React from 'react'
interface CardProps {
    title: string;
    description: string;
}
import Image from 'next/image'
const Card = ({title, description}: CardProps) => {
  return (
    <div className="feature-card">
        <article className="flex flex-col">
            <div className="icon-container w-12 h-12 flex items-center justify-center mb-4">
                <Image src={'/assets/Vector.png'} alt={title} width={24} height={24} className="object-contain"></Image>
            </div>
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 text-sm">{description}</p>
        </article>
    </div>
  )
}

export default Card