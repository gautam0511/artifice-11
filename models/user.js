const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    token:[
        {
            type:String
        }
    ],
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product'
                    
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }

        ]
    }

})
userSchema.methods.addToCart = function(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId === product._id;
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
  
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: product._id,
        quantity: newQuantity
      });
    }
    const updatedCart = {
      items: updatedCartItems
    };
    this.cart = updatedCart;
    return this.save();
  };

  userSchema.methods.removeFromCart = function(productId){
      const updatedCartItems = this.cart.items.filter(item=>{
          return item.productId !== productId
      })
      this.cart.items = updatedCartItems;
      return this.save();
  }
// after purchasing all things present in a cart clear cart willb called
  userSchema.methods.clearCart = function(){
    this.cart.items = { items:[] };
    return this.save();
  }
module.exports = mongoose.model('User', userSchema);