const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal= document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address-input")
const addressWarn = document.getElementById("address-warn")

let cart = [];

//ABRIR O MODAL DO CARRINHO
cartBtn.addEventListener("click", function() {
    updateCartModal();
    cartModal.style.display = "flex"
})

//FECHAR O MODAL QUANDO CLICAR FORA 
cartModal.addEventListener("click", function(event){
    if(event. target === cartModal){
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})


menu.addEventListener("click", function(event){
    // console.log(event.target)

    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addTocart(name, price)
    }

})

//Função para adicionar no carrinho
function addTocart(name, price){
    const existingItem = cart.find(item => item.name === name)
    
    if(existingItem){
        //Se o tem já existe, aumenta apenas a quantidade +1
        existingItem.quantity += 1
        return;
    
    }else{
        
        cart.push({
            name,
            price,
            quantity: 1,
        })

        updateCartModal()

    }


}

//Atualiza o carrinho
function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item =>{
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between" , "mb-4", "flex-col")

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between"> 
                <div> 
                 <p class="font-medium">${item.name}</p>
                 <p>Qtd: ${item.quantity}</p>
                 <p class= "font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>

                <button class="remove-from-cart-btn" data-name="${item.name}"> 
                    Remover
                </button    >
    
            </div>
        `

        total += item.price * item.quantity;

    cartItemsContainer.appendChild(cartItemElement)

    })

    cartTotal.textContent = total.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;

}

//Função para remover items do carrinho 

cartItemsContainer.addEventListener("click", function (event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];

        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}


addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})


// Finalizar pedido
checkoutBtn.addEventListener("click", function(){
    if(cart.length === 0) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }

//Enviar pedido para api whats
    const cartItems =cart.map((item) =>{
        return (
            ` ${item.name} Quantidade: (${item.quantity}) Preço:R$ ${(item.price)} |`
        )
    }).join("")

    const message = encodeURIComponent(cartItems) 
    const phone = "5581999085154"

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")

    cart = [];
    updateCartModal();
})

// Verificar a hora e manipular o card do horário
function checkRestaurantOpen() {
    const data = new Date();
    const hora = data.getHours();
    return (hora >= 18 && hora < 24) || (hora >= 0 && hora < 2); // Aberto das 18:00 às 02:00
}

const spanItem = document.getElementById("date-span");
const isOpen = checkRestaurantOpen();

if (isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-500");
} else {
    spanItem.classList.remove("bg-green-500");
    spanItem.classList.add("bg-red-500");
}

const spanItemMessage = document.getElementById("span-d");
if (isOpen) {
    spanItemMessage.innerHTML = "Aberto até as 02:00";
} else {
    spanItemMessage.innerHTML = "Fechado - Abriremos às 18:00";
}
