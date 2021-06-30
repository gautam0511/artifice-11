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
    },
    wishlist: {
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
      console.log(cp)
        return cp.productId.toString() === product._id.toString()
    });
  
    
     let newQuantity = 1;
     const updatedCartItems = [...this.cart.items];
     if (cartProductIndex >= 0) {
       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
       updatedCartItems[cartProductIndex].quantity = newQuantity;
     } 
     else {
    
       updatedCartItems.push({
         productId:product._id,
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
          return item.productId.toString() !== productId.toString()
      })

      this.cart.items = updatedCartItems;
    
      return this.save();
  }


userSchema.methods.addToWishlist = function(product){
    const wishlistProductIndex = this.wishlist.items.findIndex(wp=>{
        return wp.productId.toString() === product._id.toString()
    })

    let newQuantity = 1;
    const updatedWishlistItems = [...this.wishlist.items];

    if(wishlistProductIndex >=0){
        newQuantity = this.wishlist.items[wishlistProductIndex].quantity + 1;
        updatedWishlistItems[wishlistProductIndex].quantity = newQuantity;
    }
    else{
        updatedWishlistItems.push({
            productId: product._id,
            quantity:newQuantity
        })
    }
    const updatedWishlist = {
        items:updatedWishlistItems
    }
    this.wishlist = updatedWishlist
    return this.save()
}
userSchema.methods.removeWishlist = function(productId){
    const updatedWishlistItems = this.wishlist.items.filter(item=>{
        return item.productId.toString() !== productId.toString()
    })
  this.wishlist.items = updatedWishlistItems;
  return this.save()
}
module.exports = mongoose.model('User', userSchema);