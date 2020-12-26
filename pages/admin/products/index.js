import { PrismaClient } from '@prisma/client'
import styles from './Products.module.css';
const prisma = new PrismaClient();

export async function getServerSideProps(context) {
    const products = await prisma.product.findMany();

    return {
        props: { products }
    }
}

export default function AdminProductsPage({ products }) {
    return (
        <div>
            <h1>Admin Products</h1>

            {products.map(product => {
                return (
                    <div className={styles.productItem} key={`product-${product.id}`}>
                        {product.name} ({product.priceCents})<br />
                        {product.category}
                    </div>
                )
            })}
        </div >
    )
}