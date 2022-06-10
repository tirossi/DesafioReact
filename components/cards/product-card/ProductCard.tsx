import Image from 'next/image'
import { useState } from 'react'

import EditModal from '../../modals/edit-modal/EditModal'
import styles from './ProductCard.module.css'

export interface IProductCard {
  imageSrc: string
  name: string
  brand: string
  price: string
  id: string
}

const ProductCard: React.FC<IProductCard> = ({
  imageSrc,
  name,
  brand,
  price,
  id,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [inputName, setInputName] = useState('')
  const [inputPrice, setInputPrice] = useState('')
  const [inputBrand, setInputBrand] = useState('')

  const btnEditClick = () => {
    window.scroll(0, 0)
    setShowModal(true)
  }

  const deleteProduct = async () => {
    try {
      const res = await fetch(
        `https://6288144910e93797c1564f40.mockapi.io/api/v1/product/${id}`,
        {
          method: 'DELETE',
        }
      )
      const data = await res.json()
    } catch (err) {
      return alert(err)
    }
    return alert('Produto Excluido')
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <Image src={imageSrc} alt={name} width="200px" height="123px" />
        </div>
        <p className={styles.productText}>{name}</p>
        <p className={styles.productText}>{brand}</p>
        <p className={styles.productPrice}>R$ {price}</p>
        <div className={styles.linksContainer}>
          <button className={styles.updateLink} onClick={btnEditClick}>
            Editar
          </button>
          <button className={styles.deleteLink} onClick={deleteProduct}>
            X Remover
          </button>
        </div>
      </div>

      <EditModal
        title={`Editar ${name}`}
        show={showModal}
        productId={id}
        productName={inputName}
        productPrice={inputPrice}
        productBrand={inputBrand}
        onClose={() => setShowModal(false)}
      >
        <input
          className={styles.modalInput}
          placeholder="Nome"
          value={inputName}
          onChange={(e) => {
            setInputName(e.target.value)
          }}
        />
        <input
          className={styles.modalInput}
          placeholder="Preço"
          value={inputPrice}
          onChange={(e) => {
            setInputPrice(e.target.value)
          }}
        />
        <input
          className={styles.modalInput}
          placeholder="Marca"
          value={inputBrand}
          onChange={(e) => {
            setInputBrand(e.target.value)
          }}
        />
      </EditModal>
    </>
  )
}

export default ProductCard
