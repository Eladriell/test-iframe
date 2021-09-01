const demoComponentNoContentTemplate = document.createElement('template');
demoComponentNoContentTemplate.innerHTML = `
<div>
  <div>Web component!</div>
  <div>Current cart ID is: <span id="cart-id"></span></div>
  <div><button id="button">Send event</button></div>
</div>
`;

class DemoComponentNoContent extends HTMLElement {

    cartId;

    contentNode;

    creationTime = Date.now();

    static get observedAttributes() {
        return ['cart-id']
    }

    constructor() {
        super();
        const root = this.attachShadow({ mode: "open" });
        root.appendChild(demoComponentNoContentTemplate.content.cloneNode(true));
        this.contentNode = root.getElementById('cart-id');
        root.getElementById('button').onclick = () => this.onClick();
    }

    connectedCallback() {
        console.log('[DemoComponent] connected!');
        this.render();
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (oldVal === newVal) {
            return;
        }

        switch(name) {
            case 'cart-id':
                this.cartId = newVal;
                break;
        }

        this.render();
        console.log(`[DemoComponent] New value for attribute '${name}': ${oldVal} => ${newVal}`);
    }

    render() {
        this.contentNode.innerText = this.cartId || 'None';
    }

    onClick() {
        this.dispatchEvent(new CustomEvent('someEvent', {
            detail: `I've been alive for ${Math.floor((Date.now() - this.creationTime) / 1000)}s!`
        }));
    }
}

window.customElements.define('demo-component-no-content', DemoComponentNoContent);
