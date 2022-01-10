function interactWithScript() {
    return 'You have interacted with a 3rd party script';
}

function getDisplayablePiece(cartId) {
    return `<div>
    <h3>Content from partner's script</h3>
    <div>Manipulating the Bridge</div>
    <div>Cart ID is: ${cartId}</div>
</div>`;
}

function registerCartId(cartId) {
    cartId = cartId;
    console.log(`iFrame received cart ID: ${cartId}`);

    setTimeout(() => {
        BRIDGE.sendMessage({action: 'SHOW_TEASER', version: '1.0', data: getDisplayablePiece(cartId)});
    }, 3000)
}


BRIDGE.register((message) => {
    console.log(`[iFrame] received from bridge: ${message.action}`);
    switch (message.action) {
        case 'EXPECT_RESPONSE':
            BRIDGE.sendMessage({action: 'INTERACTION_RESPONSE', version: '1.0', id: message.id, data: interactWithScript()});
            break;
        case 'SHOPPING_CART':
            registerCartId(message.data.id);
            break;
        default:
            console.warn('IFrame received unsupported action ' + message.action);
    }
}, true);
