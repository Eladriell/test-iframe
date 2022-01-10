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

let cartId;
let email;

function registerCart(cart) {
    if (cartId != cart.id) {
        cartId = cart.id;
        console.log(`[Bridge][iFrame] register new cart ID: ${cartId}`);

        setTimeout(() => {
            BRIDGE.sendMessage({action: 'SHOW_TEASER', version: '1.0', data: getDisplayablePiece(cartId)});
        }, 3000);
    }

    const emailAddress = cart && cart.contacts && cart.contacts.find((contact) => contact.contactType === 'Email');
    if (emailAddress && email != emailAddress.address) {
        email = emailAddress.address;
        console.log(`[Bridge][iFrame] cart now contains an email address: ${email}`);
        // do something with this new data
    }
}


BRIDGE.register((message) => {
    console.log(`[Bridge][iFrame] received from bridge: ${message.action}`);
    switch (message.action) {
        case 'EXPECT_RESPONSE':
            BRIDGE.sendMessage({action: 'INTERACTION_RESPONSE', version: '1.0', id: message.id, data: interactWithScript()});
            break;
        case 'SHOPPING_CART':
            console.log('[Bridge][iFrame] received Cart: ', message.data);
            registerCart(message.data);
            break;
        default:
            console.warn('[Bridge][iFrame] received unsupported action ' + message.action);
    }
}, true);
