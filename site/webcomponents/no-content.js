const demoComponentNoContentTemplate = document.createElement('template');
demoComponentNoContentTemplate.innerHTML = `
<div>
  <span>Web component!</span>
  <span>Current cart ID is: <span id="cart-id"></span></span>
</div>
`;

class DemoComponentNoContent extends HTMLElement {

    cartId;

    contentNode;

    static get observedAttributes() {
        return ['cartId']
    }

    constructor() {
        super();
        const root = this.attachShadow({ mode: "open" });
        root.appendChild(demoComponentNoContentTemplate.content.cloneNode(true));
        this.contentNode = root.getElementById('cart-id');
    }

    connectedCallback() {
        console.log('[DemoComponent] connected!');
        this.render();
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
        console.log(`[DemoComponent] New value for attribute '${name}': ${oldVal} => ${newVal}`);
    }

    render() {
        this.contentNode.innerText = this.cartId || 'None';
    }
}

window.customElements.define('demo-component-no-content', DemoComponentNoContent);
