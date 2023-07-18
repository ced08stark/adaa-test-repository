import React, {useState, useEffect, FC} from 'react'
import { instance } from '../constants/products';
import ProductComponent from '../components/ProductComponent';


interface Product {
    numero: number;
    thumbnail: string;
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

interface Select{
    total: number,
    setLimit: React.Dispatch<React.SetStateAction<number>>
}

const SelectLimit: FC<Select> = ({total, setLimit}) =>{
    const components = [];

    for (let i = 1; i < total+1; i++) {
        components.push(<option key={i}>{i}</option>);
    }

    return(
        <select className='form-select' onChange={(e)=> setLimit(parseInt(e.target.value))}>
            <option>select item number</option>
            {
                components
            }
        </select>
    )
}


function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [limit, setLimit] = useState<number>(5);
    const [search, setSearch] = useState<string>("");
    const [skip, setSkip] = useState<number>(0);
    const [total, setTotal] = useState<number>(100);

    const handleSearch  = async(search: string) =>{
        setSearch(search)
        const data = await instance.get(`/products/search?q=${search}`).catch((err)=>console.log(err))
        if(data){
            setProducts(data.data.products)
        }
    }
    const handleSkip = () =>{
        setSkip(skip+5)
    }
    const handlePrec = () =>{
        setSkip(skip-5)
    }
    const getAllProduct = async() =>{
       const data = await instance.get(`/products?limit=${limit}&skip=${skip}`).catch((err)=>console.log(err))
        if(data){
            console.log(data)
            setProducts(data.data.products)
            setTotal(data.data.total)
        }

    }
    useEffect(()=>{
        getAllProduct();
        console.log(skip)
    }, [limit, skip])
  
  return (
    <main className=" container">
      <div className="flex items-center mt-4 justify-end">
            <div className="search-bar">
                <div className="search-form d-flex align-items-center">
                    <input
                        type="text"
                        name="query"
                        placeholder="Search"
                        title="Enter search keyword"
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <button type="submit" title="Search">
                        <i className="bi bi-filter"></i>
                    </button>
                </div>
            </div>
            <div className="search-bar">
                <div className="search-form d-flex align-items-center">
                    <SelectLimit total={total} setLimit={setLimit} />
                </div>
            </div>
      </div>
      <section className="section dashboard">
        <div className="row">
          <div className="card">
            <div className="card-body">
              <table className="table datatable">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">title</th>
                    <th scope="col">description</th>
                    <th scope="col">price</th>
                    <th scope="col">Percentage</th>
                    <th scope="col">rating</th>
                    <th scope="col">stock</th>
                    <th scope="col">brand</th>
                    <th scope="col">category</th>
                    <th scope="col">other picture</th>
                  </tr>
                </thead>
                <tbody className="h-[100px]">
                    {
                        products?.map((item, index) =>(
                            <ProductComponent
                                key={index}
                                numero={item.numero}
                                rating={item.rating}
                                stock={item.stock}
                                image={item.thumbnail}
                                title={item.title}
                                price={item.price}
                                discountPercentage={item.discountPercentage}
                                category={item.category}
                                brand={item.brand}
                                description={item.description}
                                images={item.images}
                            />
                        ))
                    }
                </tbody>
              </table>
              <div className='flex items-center space-x-4 justify-center'>
                    {skip<5 ?  <button className='btn btn-dark' disabled>prev</button> : <button className='btn btn-dark' onClick={()=> handlePrec()}>prev</button> }
                    {skip> total-10 ?  <button className='btn btn-primary ' disabled>next</button> : <button className='btn btn-primary' onClick={()=> handleSkip()}>next</button> }  
                </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Products
