import { useState } from 'react'

import PrimaryLayout from '../components/layouts/primary/PrimaryLayout'
import TopbarLayout from '../components/layouts/topbar/TopbarLayout'
import ProductsList from '../components/lists/products/ProductsList'
import AddModal from '../components/modals/add-modal/AddModal'
import styles from '../styles/Home.module.css'
import { NextPageWithLayout } from './page'

const Home: NextPageWithLayout = () => {
  const [showModal, setShowModal] = useState(false)
  const [inputName, setInputName] = useState('')
  const [inputPrice, setInputPrice] = useState('')
  const [inputBrand, setInputBrand] = useState('')

  const btnClick = () => {
    window.scrollTo(0, 0)
    setShowModal(true)
  }

  return (
    <>
      <h2>
        <button onClick={btnClick} className={styles.addProduct}>
          adicionar produto
        </button>
      </h2>

      <section className={styles.main}>
        <ProductsList />
      </section>

      <AddModal
        title="Criar Produto"
        show={showModal}
        productName={inputName}
        productPrice={inputPrice}
        productBrand={inputBrand}
        onClose={() => setShowModal(false)}
      >
        <input
          className={styles.modalInput}
          placeholder="Nome"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <input
          className={styles.modalInput}
          placeholder="Preço"
          value={inputPrice}
          onChange={(e) => setInputPrice(e.target.value)}
        />
        <input
          className={styles.modalInput}
          placeholder="Marca"
          value={inputBrand}
          onChange={(e) => setInputBrand(e.target.value)}
        />
      </AddModal>
    </>
  )
}

export default Home

Home.getLayout = (page) => {
  return (
    <PrimaryLayout>
      <TopbarLayout />
      {page}
    </PrimaryLayout>
  )
}
