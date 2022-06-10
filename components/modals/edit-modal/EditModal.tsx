import { ReactNode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import styles from './EditModal.module.css'

export interface IEditModal {
  show: boolean
  onClose: () => void
  title: string
  children: ReactNode
  productId: string
  productName: string
  productPrice: string
  productBrand: string
}

const EditModal: React.FC<IEditModal> = ({
  show,
  onClose,
  title,
  productId,
  productName,
  productPrice,
  productBrand,
  children,
}) => {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const editProduct = async () => {
    try {
      const res = await fetch(
        `https://6288144910e93797c1564f40.mockapi.io/api/v1/product/${productId}`,
        {
          method: 'PATCH',
          mode: 'cors',
          body: JSON.stringify({
            name: productName,
            price: productPrice,
            brand: productBrand,
          }),
        }
      )
      const data = res.json()
    } catch (err) {
      return alert(err)
    }
    return alert('Produto Editado')
  }

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    editProduct()
    onClose()
  }

  if (isBrowser) {
    return ReactDOM.createPortal(
      show ? (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.content}>{children}</div>
            <button className={styles.btn} onClick={handleClose}>
              Confirmar
            </button>
          </div>
        </div>
      ) : null,
      document.getElementById('modal-root')!
    )
  } else {
    return null
  }
}

export default EditModal
