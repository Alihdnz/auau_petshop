window.onload = function() {

  
            

  var customerNewsLetter = sessionStorage.getItem("customer")

  if (customerNewsLetter == null) {
    
  setTimeout(() => {
    $(".newsletterModalContainer").addClass("active")
  }, 1000)
  }

  
    
// Close minicart function

  $("#closeCart").click( function() {
    $(".minicartContainer").removeClass("active")
  })

  $(".keepBuying").click(function() {
    $(".minicartContainer").removeClass("active")
  } )

// end close minicart function

// open & close menuMobile function

  $("#menuMobileBtn").click(function() {
    $("#menuMobile").addClass("active")
  })

  $("#closeMenuMobile").click(function() {
    $("#menuMobile").removeClass("active")
  })

// submit form newsletter function 

$(".newsletterBtn").on("click", function(e) {
  
  e.preventDefault() // prevent reload
  
  
  sessionStorage.setItem("customer", $("#newsletterInput").val() ) // store on sessionStorage
  
  setTimeout(() => {
    $(".newsletterModalContainer").removeClass("active")
  }, 500)
  

 
})

// end submit form newsletter function


// close modal newsletter function

$("#closeModal").click(function(){
  $(".newsletterModalContainer").removeClass("active")
})

    async function loadProducts() {
      const response = await fetch("./products.json")
      const product = await response.json();
    
      function refreshCart() {
        $(".cartContent").html("")
      }  

    function openCart() {
        addProduct()
        showCart()
        
        refreshCart()
        
    }
    
    $("#minicartBtn").click(function() {
      
        openCart() 
    })

    
   
  
    // coletar dados de uma lista  
    for( let i = 0; i < product.length; i = i + 1) {
      //exibir produtos
      $("#buttonSearch").click(function(evt){

        evt.preventDefault()
        
        var searchValue = $("#searchInput").val()
       
          console.log(product[i].name.includes(searchValue))
          console.log(product[i].name.indexOf(searchValue))
        
       //incluir o resultado da busca do val 0 de indexOF
      
          if (product.includes(searchValue) == true) {
            console.log("entrei o produto")
          }
       
        
        
  
      })
        
          var productCard = 
            `<div class='productCard mgr-5 mgl-5 flex itens content center column cubicBezier-2'> 
           
            <div class="thumbContainer"> 
            <img class="productImage" src="`+ product[i].image +`">
           
            <div class="buttonsCardContainer flex column"> 
               <button class="wishListAdd_`+ product[i].id +` circularIconBtn mgb-5 pointer cubicBezier-1"><img src="./assets/header/wish.png" alt="Lista de desejos"></button>
               <button class="product_`+ product[i].id + ` circularIconBtn pointer cubicBezier-1"><img src="./assets/header/cart.png" alt="Carrinho"></button>
            </div>

            </div>
            
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
    
             
                var wishlist = localStorage.getItem("wishlist")
                    wishlist = JSON.parse(wishlist)

                    if (wishlist == null) {
                      wishlist = []
                    }

                function addWishProduct() {
                  
                  localStorage.setItem("wishlist", JSON.stringify(wishlist))

                }

          
// criar uma função de retirar produto
                function removeWishProduct() {
                  wishlist.splice(wishlist[i])
                  localStorage.setItem("wishlist", JSON.stringify(wishlist))
                  
                    
                  }

                  $(".wishListAdd_" + product[i].id).click(function() {
                    if ($(".wishListAdd_" + product[i].id).hasClass("added")) {
                      // se o produto ja esta na lista
                      
                    // retirar
                      removeWishProduct()
                      $(".wishListAdd_" + product[i].id).removeClass("added")
                    }
                    else {
                      wishlist.push(product[i])
                      addWishProduct()
                      // console.log(wishlist[i])
                      $(".wishListAdd_" + product[i].id).addClass("added")// ao adicionar deixar o campo na cor vermelha
    
                    }
                    
                    
                  })

                  
                  
               
      
                var cart = localStorage.getItem("cart")
                    cart = JSON.parse(cart) // converte string para objeto
    
                  if(cart == null) { // caso nao haja um conteudo.
                    cart = [] // inicie um vetor em cart 
                  }
      

                function addProduct() {
                    // adiciona no array cart o produto selecionado
    
                    localStorage.setItem("cart", JSON.stringify(cart))
                  
                    
              

                    
               


                   // $("#carrinho").addClass("active")

                    $(".minicartContainer").addClass("active")

                    if(cart.length > 0) {
                      setTimeout(() => {
                        $("#subTotal").removeClass("visibility hidden")
                    
                      })
                      }

                   
                
                   
                } // adicionar produto no carrinho             
                  

                
    
                function showCart() {
                 
               
    
                  
                
                var subTotal = 0

               // console.log(cart.length)

                for(let i = 0; i < cart.length; i = i + 1) {
                   
                

                var result = cart.find( cartItem => cartItem.id === cart[i].id)

    
                var cartItemPosition = cart.indexOf(result)

                
                $(".buttonComprar").addClass("inactive")
                $(".circularIconBtn").addClass("inactive")
                
                
                setTimeout(() => {
                        
                  token = Math.floor(Math.random() * 65536)
                  
                  subTotal += cart[i].priceDiscount

                  
                  $("#carrinho").append(`
                  <div class="productInCart flex row mgl-40 mgt-15">
                      <img src="`+ cart[i].image +`">
                      
                      <button class="wishListBtnProduct></button>

                      <button class="cartBtnProduct"></button>

                      <div class="productCartInfo flex column mgl-20">
                          <span class=" productName font-600">`+ cart[i].name +`</span>
                          <span class="atribute color textColor">Cor: `+ cart[i].attribute[0].color + `</span>
                          <span class="atribute size textColor">Tamanho: `+ cart[i].attribute[0].size + `</span>
          
                          <Span class="productPrice font-600">R$ `+ cart[i].priceDiscount.toFixed(2).replace('.' , ',') +`</Span>
                      </div>        

                      <button id='cart_`+ token +`' class="removeProduct mgl-10 x10  mgr-10 pointer"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg> </button>
                  </div>`)

                  $("#subTotal").html(`<h2>SUBTOTAL: R$ ` + subTotal.toFixed(2).replace('.' , ',') + `</h2>`)    

                  function removeItem() {
                    $("#cart_" + token).click(function() {
                 
                      
    
                      cart.splice(cartItemPosition, 1)
                      localStorage.setItem("cart", JSON.stringify(cart))
                      refreshCart()
                      showCart()

                      
                      if (cart.length < 1 ) {
                       // console.log(cart.length)
                        $("#subTotal").addClass("visibility hidden")

                        $(".minicartContainer").removeClass("active")
                      }
                        })
                
                      
                   }
                  

                   if ($(".minicartContainer").hasClass("active")) {
                    removeItem()
                  
                  }

                  $(".buttonComprar").removeClass("inactive")
                  $(".circularIconBtn").removeClass("inactive")

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
            cart.push(product[i]) 
                
                addProduct()
               
                

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

//slide
    $('.slideshow').append(`<div class="slideControllers">
    <button class="arrowLeft pointer cubicBezier-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"/></svg></button>
    <button class="arrowRight pointer cubicBezier-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"/></svg></button></div>
    
    `)

    // mobile Validation
    var isMobile = false
    if( screen.width <= 410 ) {    
       var isMobile = true
    }




//slider controler



$(".arrowRight").click( function() {
 
  $(".carousel").scrollLeft($(".carousel").scrollLeft() +225) ;

  if (isMobile) {
    $(".carousel").scrollLeft( $(".carousel").scrollLeft()+ 160) ;
  }
}
)
$(".arrowLeft").click( function() {
 
  $(".carousel").scrollLeft($(".carousel").scrollLeft() - 225) ;
  if (isMobile) {
    $(".carousel").scrollLeft($(".carousel").scrollLeft() - 160) ;
  }
 }
)
    }
    
    
    
    


  