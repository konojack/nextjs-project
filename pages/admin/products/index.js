import styles from './Products.module.scss';
import useSWR from 'swr';
import { product } from '../../../models';
import { useSession, signOut, getSession } from 'next-auth/client'

export async function getServerSideProps(context) {
    const products = await product.findMany();
    const session = await getSession(context);

    if (!session) {
        const { res } = context;
        res.setHeader("location", "/api/auth/signin");
        res.statusCode = 302;
        res.end();
        return;
    }

    return {
        props: { products }
    }
}

export default function AdminProductsPage({ products }) {
    const [session, loading] = useSession();
    console.log(session);
    const fetcher = url => fetch(url).then(res => res.json());
    const { data, error } = useSWR('/api/admin/products', fetcher, {
        initialData: {
            products
        },
        refreshInterval: 300,
    });

    const handleForm = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        await fetch('/api/admin/products/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });
    }

    return (
        <div>
            <p>You are logged in as {session?.user?.email} (<a href="" onClick={signOut}>Sign Out</a>)</p>
            <h1>Admin Products</h1>

            {data.products.map(product => {
                return (
                    <div className={styles.productItem} key={`product-${product.id}`}>
                        {product.id}. {product.name} ({product.priceCents})<br />
                        {product.category}
                    </div>
                )
            })}

            <form className={styles.newProductForm} onSubmit={handleForm}>
                <input name="name" placeholder="Product Name" />
                <input name="category" placeholder="Category" />
                <input name="priceCents" placeholder="Price" />
                <button type="submit">Create</button>
            </form>
        </div >
    )
}