import express from 'express';
import CartsDAO from '../dao/carts.dao.js';

const router = express.Router();

router.get('/', (req, res) => {
    // Lógica para mostrar la página de carritos
    res.render('carritos');
});


// Ruta para eliminar un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    try {
        const updatedCart = await CartsDAO.deleteProduct(cartId, productId);
        res.json(updatedCart);
    } catch (error) {
        console.error('Error al eliminar el producto del carrito:', error);
        res.status(500).send('Error interno del servidor');
    }
});


router.post('/add', async (req, res) => {
    console.log(req.body); // Agrega esta línea para imprimir el cuerpo de la solicitud

    const productId = req.body.productId;
    const quantity = req.body.quantity;

    // Verifica que productId no esté vacío antes de continuar
    if (!productId) {
        return res.status(400).send('Error: productId no válido');
    }

    try {
        // Agrega el producto al carrito utilizando el método de tu DAO
        await CartsDAO.addToCart(productId, quantity);

        // Redirige a la página de carritos o a donde prefieras
        res.redirect('/carts');
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        res.status(500).send('Error interno del servidor');
    }
});







export default router;


