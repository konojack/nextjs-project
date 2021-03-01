import { getSession } from 'next-auth/client'
import { product } from '../../../../models';

export default async (req, res) => {
    const session = getSession({ req });
    if (!session) {
        res.statusCode = 401;
        res.json({ error: "go away" })
    }

    if (req.method == "POST") {
        const { name, category, priceCents } = req.body;
        const newProduct = await product.create({
            data: {
                name,
                category,
                priceCents: parseInt(priceCents)
            }
        })
        res.json({ product: newProduct });
    }
}
