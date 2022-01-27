function interactWithScript() {
    return 'You have interacted with a 3rd party script';
}

function getDisplayablePiece(cart) {
    return `<div>
    <h3>Content from partner's script</h3>
    <div>Manipulating the Bridge</div>
    <div>Cart ID is: ${cart.id}</div>
</div>`;
}

let userCart;
let userEmail;

function registerCart(cart) {
    if (!userCart || userCart.id != cart.id) {
        userCart = cart;
        console.log(`[Bridge][3rt party] register new cart ID: ${userCart.id}`);

        setTimeout(() => {
            BRIDGE.sendMessage({action: 'SHOW_TEASER', version: '1.0', data: getDisplayablePiece(userCart)});
        }, 3000);
    }

    const emailAddress = cart && cart.contacts && cart.contacts.find((contact) => contact.contactType === 'Email');
    if (emailAddress && userEmail != emailAddress.address) {
        userEmail = emailAddress.address;
        console.log(`[Bridge][3rt party] cart now contains an email address: ${userEmail}`);
        // do something with this new data
    }
}

function onLeaveIntent() {
    if (userCart && userEmail) {
        const bounds = userCart.airOffers[0].offerItems[0].air.bounds;
        const origin = bounds[0].originLocation;
        const destination = bounds[0].destinationLocation;

        const content = `<h2>Are your leaving us?</h2>
<p>Don't want to finish your booking from <span class="emphasize">${origin.cityCode} (${origin.airportName})</span> to <span class="emphasize">${destination.cityCode} (${destination.airportName})</span> now?</p>
<p>You will be reminded later by email at <span class="emphasize">${userEmail}</span> so you can resume from where you left!</p>
`;
        BRIDGE.sendMessage({action: 'SHOW_TEASER', version: '1.0', data: content});
    }
}

BRIDGE.register((message) => {
    console.log(`[Bridge][3rd party] received from bridge: ${message.action}`);
    switch (message.action) {
        case 'EXPECT_RESPONSE':
            BRIDGE.sendMessage({action: 'INTERACTION_RESPONSE', version: '1.0', id: message.id, data: interactWithScript()});
            break;
        case 'SHOPPING_CART':
            console.log('[Bridge][3rt party] received Cart: ', message.data);
            registerCart(message.data);
            break;
        case 'LEAVE_INTENT':
            onLeaveIntent();
            break;
        default:
            console.warn('[Bridge][3rt party] received unsupported action ' + message.action);
    }
}, true);
