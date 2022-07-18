function closeCart() {
    $("#minicart").addClass("hidden")
}


// open minicart function




window.onload = function() {

    
    // close minicart function

 

    async function loadProducts() {
      const response = await fetch("./products.json")
      const product = await response.json();
    
      function refreshCart() {
        $(".cartContent").html("")
      }  

    function openCart() {
        $("#minicart").removeClass("hidden")
        refreshCart()
        showCart()
    }
    
    $("#minicartBtn").click(function() {
        openCart()
    })

    
   
  
    // coletar dados de uma lista  
    for( let i = 0; i < product.length; i = i + 1) {
      //exibir produtos
           
  
          var productCard = 
            `<div class='productCard mgr-5 mgl-5 flex itens content center column cubicBezier-2'> 
            <img class="productImage" src="`+ product[i].image +`">
             <p class="productName textColor mgt-15">` + product[i].name +`</p> 
             <img class="rating mgt-15" src="./assets/product/rate.png">
             <div class="infoPrice flex row mgt-15">
                <span class="Price mgr-10" > R$`+ product[i].priceDiscount.toFixed(2).replace('.' , ',') +`</span>
                <span class="currentPrice textColor"> R$` + product[i].price.toFixed(2).replace('.' , ',') + `</span>
            
    
              </div>
            
            
            
            <button class='product_`+ product[i].id +` buttonComprar mgt-15 mgb-10 pointer bg-hovered cubicBezier-2' > COMPRAR </a>
      
       </div>`
        
    
          if (product[i].topSellers == true) {
            $('.topSeller').append(productCard)
    
          }
    
    
          if (product[i].group == true && product[i].groupId !== null) {
           
            $('.productGroup').append(productCard)
          }
    
             
      
      
                var cart = localStorage.getItem("cart")
                    cart = JSON.parse(cart) // converte string para objeto
    
                  if(cart == null) { // caso nao haja um conteudo.
                    cart = [] // inicie um vetor em cart 
                  }
      
                function addProduct() {
                    cart.push(product[i]) // adiciona no array cart o produto selecionado
    
                    localStorage.setItem("cart", JSON.stringify(cart))
                    
                    console.log("produto adicionado")


                    $("#carrinho").addClass("active")
                
                   
                } // adicionar produto no carrinho             
                  
    
                function showCart() {
                 
                //   $("#carrinho").addClass("active")
    
                  
                
                

                  for(let i = 0; i < cart.length; i = i + 1) {
                   
                    
    
                    var result = cart.find( cartItem => cartItem.id === cart[i].id)
    
                    var cartItemPosition = cart.indexOf(result)
                  
                    
                    
                  
                    
                setTimeout(() => {
                        console.log("Delayed for 1 second.");
                    
                        var token = Math.floor(Math.random() * 65536)
                  $("#carrinho").append(`
                  <div class="productInCart flex row mgl-40 mgt-15">
                      <img src="`+ cart[i].image +`">
                  
                      <div class="productCartInfo flex column mgl-20">
                          <span class=" productName font-600">`+ cart[i].name +`</span>
                          <span class="atribute color textColor">Cor: `+ cart[i].attribute[0].color + `</span>
                          <span class="atribute size textColor">Tamanho: `+ cart[i].attribute[0].size + `</span>
          
                          <Span class="productPrice font-600">R$ `+ cart[i].priceDiscount.toFixed(2).replace('.' , ',') +`</Span>
                      </div>        

                      <button id='cart_`+ token +`' class="removeProduct"> X </button>
                  </div>`) 
    
                  function removeItem() {
                    $("#cart_" + token).click(function() {
                 
                      
    
                      cart.splice(cartItemPosition, 1)
                      localStorage.setItem("cart", JSON.stringify(cart))
                      refreshCart()
                      showCart()
                        })
                
                      
                   }
    
                   if ($("#carrinho").hasClass("active")) {
                    removeItem()
                  
                  }

                }, 1000)
            } 
    
            
           
    
    
            
             
                  
                  
            } // exibir produtos no carrinho
            
              
      
                function clearCart() {
                  
                    cart.splice(0 , cart.length)
                 
                }
    
      //Limpar carrinho
                $("#clearCart").click(function() {
                    clearCart()
                    localStorage.setItem("cart", JSON.stringify(cart))
                    refreshCart()
                   })

           
           
    
          $(".product_"+ product[i].id).click(function insertItemInCart() {
            //adicionar no carrrinho
                
                
                addProduct()
                $("#minicart").removeClass("hidden")
                

                showCart()
                refreshCart()
    
                 //exibir carrinho
                })
           
    
          $("#openMiniCart").click( function() {
            
            refreshCart()
            showCart()
             
          }
    
    
            
            
            
            )
            
         
    }
    
    
    
    }
    loadProducts()
    }
    
    
    


  