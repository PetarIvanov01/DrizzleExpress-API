import { Response, Request } from 'express';
import wrapController from '../../helpers/wrapperTryCatch';

import { getProductById } from '../../services/productService/products';

export const getProductByIdController = wrapController(
    async (req: Request, res: Response) => {
        const productId = req.params.productId;

        const result = await getProductById(productId);

        res.status(200).json({ result });
    }
);
