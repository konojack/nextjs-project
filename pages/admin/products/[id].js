import { product } from '../../../models';

export async function getStaticPaths(context) {
    const products = await product.findMany();

    const paths = products.map((product) => ({
        params: { id: product.id.toString() },
    }))

    return { paths, fallback: true };
}

export async function getStaticProps(context) {
    const productRecord = await product.findOne({
        where: { id: parseInt(context.params.id) }
    })

    return {
        props: {
            product: productRecord
        },
        revalidate: 10
    };
}

export default function AdminProductPage({ product }) {
    return (
        <div>
            <h1>Admin Product - {product.name}</h1>
            {product.priceCents}
        </div >
    )
}