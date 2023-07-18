import React, {FC} from 'react'


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
    category: string
}


const ProductComponent: FC<Product> = ({numero, image, title, price, description, discountPercentage, rating, stock, brand, category})=>{
  return (
    <tr className=" align-middle">
      <th scope="row">{numero}</th>
      <td>
        <img src={image} className=" w-20" />
      </td>
      <td className=''>{title}</td>
      <td className='text-left'>{description}</td>
      <td>{price}</td>
      <td className='text-center'>{discountPercentage}</td>
      <td>{rating}</td>
      <td>{stock}</td>
      <td>{brand}</td>
      <td>{category}</td>
    </tr>
  )
}

export default ProductComponent
