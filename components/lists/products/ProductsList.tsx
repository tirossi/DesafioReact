import { useFetch } from '../../../hooks/useFetch'
import ProductCard from '../../cards/product-card/ProductCard'

interface IProductsList {}

type Data = {
  createdAt: string
  name: string
  price: string
  brand: string
  image: string
  id: string
}

const ProductsList: React.FC<IProductsList> = () => {
  const { data } = useFetch(
    'https://6288144910e93797c1564f40.mockapi.io/api/v1/product'
  )

  if (!data) {
    return <p>Carregando...</p>
  }

  return (
    <>
      {data.map((item: Data) => (
        <ProductCard
          imageSrc={item.image}
          name={item.name}
          brand={item.brand}
          price={item.price}
          id={item.id}
        />
      ))}
    </>
  )
}

export default ProductsList
