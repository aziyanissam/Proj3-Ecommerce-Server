const router = require("express").Router();
const User = require("../models/User.model");
const Cart = require("../models/Cart.model");


// Route to create new user
router.get("/", async (req, res, next) => {
  try {
    const newUser = await User.find();
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
});

// Get one piece of art

router.get("/:artObjectId", async (req, res) => {
  try {
    const pieceOfArt = await PieceOfArt.findById(req.params.artObjectId);
    res.status(200).json(pieceOfArt);
  } catch (error) {
    console.log(error);
  }
});

// Create one piece a new piece art

router.post("/details", async (req, res) => {
  const payload = /*req.body*/ trySomething;
  try {
    const newPieceOfArt = await NewPieceOfArt.create(payload);
    res.status(201).json(newPieceOfArt);
  } catch (error) {
    console.log(error);
  }
});

// Edit a piece of art

router.put("/:artObjectId", async (req, res) => {
  const { artObjectId } = req.params;
  const payload = req.body;
  try {
    const updateArt = await PieceOfArt.findByIdAndUpdate(recipeId, payload, {
      new: true,
    }); //update to model
    res.status(200).json(updateArt);
  } catch (error) {
    console.log(error);
  }
});

// Delete a piece
router.delete("/:artObjectId", async (req, res) => {
  try {
    await PieceOfArt.findByIdAndDelete(req.params.artObjectId);
    res.status(200).json({ message: "Artwork succesfully deleted" });
  } catch (error) {
    console.log(error);
  }
});

//To add a piece to cart
router.post("/cart/:artObjectId", async (req, res) => {
  try {
    const { artObjectId } = req.params;

    // // Get the current user (you may need to implement user authentication)
    // const userId = /* obtain the user ID */;

    // Find the cart for the user
    const cart = await Cart.findOne({ user: userId });

    if (cart) {
      // If the cart already exists, find the item in the cart
      const item = cart.items.find((item) => item.product.toString() === artObjectId);

      if (item) {
        // If the item already exists in the cart, increment the quantity
        item.quantity += 1;
      } else {
        // If the item doesn't exist in the cart, add it to the items array
        cart.items.push({ product: artObjectId });
      }

      await cart.save();
    } else {
      // If the cart doesn't exist, create a new cart and add the item
      const newCart = new Cart({
        user: userId,
        items: [{ product: artObjectId }]
      });

      await newCart.save();
    }

    res.status(201).json({ message: "Item added to cart successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});



module.exports = router;