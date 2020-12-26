import { product } from '../../../../models';

export default async (req, res) => {
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
