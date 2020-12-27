import { product } from '../../../../models';

export default async (req, res) => {
    const products = await product.findMany();
    res.json({ products });
}
