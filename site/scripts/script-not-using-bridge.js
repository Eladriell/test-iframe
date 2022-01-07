function interactWithScript() {
    return 'You have interacted with a 3rd party script';
}

function getDisplayablePiece(cartId) {
    return `<div>
    <h2>Content from partner's script</h2>
    <div>Cart ID is: ${cartId}</div>
</div>`;
}

function registerCartId(cartId) {
    cartId = cartId;
    console.log(`iFrame received cart ID: ${cartId}`);

    setTimeout(() => {
        window.dispatchEvent(new CustomEvent('triggerContent', { detail: getDisplayablePiece(cartId)}));
    }, 3000)
}
