import { ReactNode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import styles from './AddModal.module.css'

export interface IAddModal {
  show: boolean
  onClose: () => void
  title: string
  productName: string
  productPrice: string
  productBrand: string
  children: ReactNode
}

const AddModal: React.FC<IAddModal> = ({
  show,
  onClose,
  title,
  productName,
  productPrice,
  productBrand,
  children,
}) => {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const createProduct = async () => {
    try {
      const res = await fetch(
        'https://6288144910e93797c1564f40.mockapi.io/api/v1/product',
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: productName,
            price: productPrice,
            brand: productBrand,
          }),
        }
      )
      const data = await res.json()
      console.log(data)
    } catch (err) {
      return alert(err)
    }
    return alert('produto criado')
  }

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    createProduct()
    onClose()
  }

  if (isBrowser) {
    return ReactDOM.createPortal(
      show ? (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.content}>{children}</div>
            <button className={styles.btn} onClick={handleConfirm}>
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

export default AddModal
