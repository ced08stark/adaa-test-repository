import React, {FC, useState, useEffect} from 'react'


interface Product {
    numero: number;
    image: string;
    title: string;
    price: number;
    description: string;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    images: string[]
}


const ProductComponent: FC<Product> = ({numero, image, title, price, description, discountPercentage, rating, stock, brand, category, images})=>{

    const [currentImage, setCurrentImage] = useState<string>()
    useEffect(()=>{
        setCurrentImage(image)
    }, [image])
  return (
    <tr className=" align-middle">
      <th scope="row">{numero}</th>
      <td>
        <img src={currentImage? currentImage: image} className="w-30" />
      </td>
      <td className=''>{title}</td>
      <td className='text-left'>{description}</td>
      <td>{price}</td>
      <td className='text-center'>{discountPercentage}</td>
      <td>{rating}</td>
      <td>{stock}</td>
      <td>{brand}</td>
      <td>{category}</td>
      <td><div className="flex flex-wrap">
            {images.map((item, index)=>(
                <img src={item} onClick={()=>setCurrentImage(item)} className=" w-8 h-8 border rounded-full cursor-pointer" />
            ))}
        </div></td>
    </tr>
  )
}

export default ProductComponent
