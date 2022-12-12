window.onload = function () {

  

  
  const url = `./products.json`

  var isMobile = false
  if (screen.width <= 430) {
    var isMobile = true
  }


  fetch(url)
    .then(response => response.json())
    .then(product => {

      for (let i = 0; i < product.length; i = i + 1) {
        //render productCards

        var productImage = product[i].image 
        var productName = product[i].name
        var productid = product[i].id
        var productPrice = product[i].price
        var productPriceDiscount = product[i].priceDiscount       
        var productCard = 
          `<div class='productCard mgr-5 mgl-5 flex itens content center column cubicBezier-2'> 
                 
                  <div class="thumbContainer"> 
                  <img class="productImage" src="${productImage}" width="${(!isMobile) ? "216px" : "150px"}" height="100%" alt="${productName}" loading="lazy">
                 
                  <div class="buttonsCardContainer flex column"> 
                     <button class="wishListBtn_${productid} circularIconBtn mgb-5 pointer cubicBezier-1"><img src="./assets/header/wish.png" width="25px" height="24px" alt="Lista de desejos"></button>
                     <button class="product_${productid} circularIconBtn pointer cubicBezier-1"><img src="./assets/header/cart.png" width="25px" height="23px" alt="Adicionar no carrinho"></button>
                  </div>
      
                  </div>
                  
                  <p class="productName textColor mgt-15">${productName}</p> 
                   <img class="rating mgt-15" width="59px" alt="rating product" height="11px" src="./assets/product/rate.webp">
                   
                   <div class="infoPrice flex row mgt-15">
                      <span class="Price mgr-10" > R$${productPriceDiscount.toFixed(2).replace('.', ',')}</span>
                      <span class="currentPrice textColor"> R$${productPrice.toFixed(2).replace('.', ',')}</span>
                  
          
                    </div>
                  
                  
                  
                  <button class='product_${product[i].id} buttonComprar mgt-15 mgb-10 pointer bg-hovered cubicBezier-2' > COMPRAR </a>
            
                  </div>`



        function refreshCart() {
          document.querySelector(".cartContent").innerHTML = ""
        }

        
        //show topSellers
        if (product[i].topSellers) {
          
          
          $('.topSeller').append(productCard)

        }

        //show productGroups
        if (product[i].group == true && product[i].groupId !== null) {

          $('.productGroup').append(productCard)

        }

        var cart = localStorage.getItem("cart")
        cart = JSON.parse(cart) // convert string to obj

        if (cart == null) {
          cart = []
        }

        var wishlist = localStorage.getItem("wishlist")
        wishlist = JSON.parse(wishlist)

        if (wishlist == null) {
          wishlist = []
        }

        
        $(".product_" + product[i].id).click(function () {
          cart.push(product[i])

          localStorage.setItem("cart", JSON.stringify(cart))



          loadCart()
          refreshCart()


        })

        // minicart Controller and update
        function loadCart() {
          var subTotal = 0


          for (let i = 0; i < cart.length; i = i + 1) {

            var result = cart.find(cartItem => cartItem.id === cart[i].id)


            var cartItemPosition = cart.indexOf(result)

        
            setTimeout(() => {

              token = Math.floor(Math.random() * 65536)

              subTotal += cart[i].priceDiscount

              // render minicart
              $("#carrinho").append(`
              <div class="productInCart flex row mgl-40 mgt-15">
                  <img src="${cart[i].image}">
                  <div class="productCartInfo flex column mgl-20">
                      <span class=" productName font-600">${cart[i].name}</span>
                      <span class="atribute color textColor">Cor: ${cart[i].attribute[0].color}</span>
                      <span class="atribute size textColor">Tamanho: ${cart[i].attribute[0].size}</span>
      
                      <Span class="productPrice font-600">R$ ${cart[i].priceDiscount.toFixed(2).replace('.', ',')}</Span>
                  </div>        
                  <button id='cart_${token}' class="removeProduct mgl-10 x10  mgr-10 pointer"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z"/></svg> </button>
              </div>`)

              $("#subTotal").html(`<h2>SUBTOTAL: R$ ${subTotal.toFixed(2).replace('.', ',')}</h2>`)

              function removeItem() {
                $("#cart_" + token).click(function () {

                  cart.splice(cartItemPosition, 1)
                  localStorage.setItem("cart", JSON.stringify(cart))
                  refreshCart()
                  loadCart()


                  if (cart.length < 1) {
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

          $(".minicartContainer").addClass("active")

          if (cart.length > 0) {
            setTimeout(() => {
              $("#subTotal").removeClass("visibility hidden")

            })
          }

        }

        //clean cart
        $("#clearCart").click(function () {
          cart.splice(0, cart.length)
          localStorage.setItem("cart", JSON.stringify(cart))
          refreshCart()
        })

      function addWishProduct() {

          localStorage.setItem("wishlist", JSON.stringify(wishlist))

        }
                
      function removeWishProduct() {
        wishlist.splice(wishlist[i])
        localStorage.setItem("wishlist", JSON.stringify(wishlist))
        }

        //add or remove a wishlist product 
      $(".wishListBtn_" + product[i].id).click(function() {

        // remove product wishlist if it has added
        if ($(".wishListBtn_" + product[i].id).hasClass("added")) {

          removeWishProduct()
          $(".wishListBtn_" + product[i].id).removeClass("added")
        }
        else {
          // else add product
          wishlist.push(product[i])
          addWishProduct()
          $(".wishListBtn_" + product[i].id).addClass("added")

        }

      })


      }

      function search() {
            var searchValue = $("#searchInput").val().toLowerCase()
            var filteredProduct = product.filter(obj => obj.name.includes(searchValue))
            for( let i = 0; i < filteredProduct.length; i = i + 1) {
      
      
              $("#searchResult").addClass("active")
      
              $("#searchList").append(`<li class="flex itens center pdl-10 cubicBezier-1"><img class="resultThumb" src="`+ filteredProduct[i].image + `">  <span class="resultProductName font-600 mgl-20">` + filteredProduct[i].name +  ` </span> <span class="resultPrice mgl-20">  R$` +filteredProduct[i].priceDiscount.toFixed(2).replace('.' , ',') + ` </span></li>`)
              }
          }
      
          //close Search Result
      
      $("#closeResult").click(function() {
        $("#searchResult").removeClass("active")
      })
      
          //detect Character
      $("#searchInput").keypress(function() {

        const characterQTD = 2

        if($("#searchInput").val().length >= characterQTD)
  
  
        setTimeout(() => {
          $("#searchList").html("")
          search()      
        }, 500)
  
  
  
  
      })
          // submit form search
      $("#buttonSearch").click(function(evt){
  
        evt.preventDefault()
        $("#searchList").html("")
        search()
  
      })   


      $("#minicartBtn").click(function () {
        loadCart() 
        refreshCart()

      })

    })


    
  //setBanners
  
  const screenWidth = window.screen.width;
  
  const logo = `<img class="headerLogo" width="${(!isMobile) ? "211px" : "135px"}" height="100%" src="./assets/header/logo.webp" alt="AuAu Petshop Logo">`
  const fullBanner = `<img class="fullBanner" width="${screenWidth}" height="100%" alt="Beauty Special Looks, your pet is always warm, shop now" src="./assets/banner/full-banner.webp">`
  const sideBanner = `<img class="sideBanner" alt="Banner com cachorro da raça pug vestindo um traje" width="${(!isMobile) ? "450px" : "325px"}" height='100%' src="./assets/banner/side-banner-1.webp">`
  const footerBrands = `<img src="./assets/footer/brands.webp" width="${(!isMobile) ? "450px" : "310px"}" height='100%'   alt="cartões aceitos">`  
 
 
  $(".logoContent").append(logo)
  $(".bannerContainer").append(fullBanner)
  $(".sideBannerContainer").append(sideBanner)
  $(".brands").append(footerBrands)


  $('.slideshow').append(`<div class="slideControllers">
    <button class="arrowLeft pointer cubicBezier-1" aria-label="Deslizar para a esquerda"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"/></svg></button>
    <button class="arrowRight pointer cubicBezier-1" aria-label="Deslizar para a direita"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"/></svg></button></div>
    
    `)


  //slider controler


  $(".arrowRight").click(function () {

    $(".carousel").scrollLeft($(".carousel").scrollLeft() + 225);

    if (isMobile) {
      $(".carousel").scrollLeft($(".carousel").scrollLeft() + 160);
    }
  }
  )
  $(".arrowLeft").click(function () {

    $(".carousel").scrollLeft($(".carousel").scrollLeft() - 225);
    if (isMobile) {
      $(".carousel").scrollLeft($(".carousel").scrollLeft() - 160);
    }
  }
  )




  var customerNewsLetter = sessionStorage.getItem("customer")

  if (customerNewsLetter == null) {
    setTimeout(() => {
      $(".newsletterModalContainer").addClass("active")
    }, 1000)
  }

  // Close minicart function

  $("#closeCart, .keepBuying").click(function () {
    $(".minicartContainer").removeClass("active")
  })

  // open & close menuMobile function

  $("#menuMobileBtn, #closeMenuMobile").click(function () {
    $("#menuMobile").toggleClass("active")
  })


  // submit form newsletter function 

  $(".newsletterBtn").on("click", function (e) {

    e.preventDefault() // prevent reload


    sessionStorage.setItem("customer", $("#newsletterInput").val()) // store on sessionStorage

    setTimeout(() => {
      $(".newsletterModalContainer").removeClass("active")
    }, 500)

  })

  // end submit form newsletter function


  // close modal newsletter function

  $("#closeModal").click(function () {
    $(".newsletterModalContainer").removeClass("active")
  })


  // show & close searchBox 
  $("#searchBtn").click(function () {
    $(".searchBox").toggleClass("searchActive")
  })

  $(".footerBanners img").attr("width", `${(!isMobile) ? '447px' : '350px'}'`);

}
