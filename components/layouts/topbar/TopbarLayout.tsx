import styles from './TopbarLayout.module.css'

export interface ITopbarLayout {}

const SidebarLayout: React.FC<ITopbarLayout> = () => {
  return (
    <nav className={styles.nav}>
      <h1>Produtos</h1>
    </nav>
  )
}

export default SidebarLayout
